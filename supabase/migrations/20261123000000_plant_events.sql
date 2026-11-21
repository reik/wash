-- Care and life-event log (vault/features/care-log.md, F12).
-- The owner of a plant logs events for it. Events are immutable: there is no
-- update or delete for anyone through the app, so a wrong entry is corrected by
-- a new event. voice_consumed is set only by the voice pipeline.

create function public.owns_plant(p_plant_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.plants
    where id = p_plant_id and owner_id = auth.uid()
  );
$$;

create table public.plant_events (
  id uuid primary key default gen_random_uuid(),
  plant_id uuid not null references public.plants (id) on delete cascade,
  type text not null check (type in (
    'watered', 'repotted', 'moved', 'new_leaf', 'flower', 'droop', 'leaning',
    'owner_away', 'photo_added', 'birthday', 'half_birthday',
    'weather_heatwave', 'weather_cold_snap', 'first_snow', 'joined_circle',
    'trait_earned', 'cutting_created', 'handover_started', 'handover_completed',
    'parent_milestone', 'memorial'
  )),
  source text not null default 'owner_log' check (source in ('owner_log', 'photo_ai', 'weather', 'system')),
  payload jsonb,
  occurred_at timestamptz not null default now(),
  voice_consumed boolean not null default false,
  created_at timestamptz not null default now(),
  check (voice_consumed = false)
);

create index plant_events_plant_occurred_idx on public.plant_events (plant_id, occurred_at desc);

alter table public.plant_events enable row level security;

-- Owners log for their own plants only, from the owner log.
create policy plant_events_owner_insert on public.plant_events
  for insert to authenticated
  with check (public.owns_plant(plant_id) and source = 'owner_log');

-- Owners read their plants' events.
create policy plant_events_owner_select on public.plant_events
  for select to authenticated
  using (public.owns_plant(plant_id));

grant execute on function public.owns_plant(uuid) to authenticated;
grant select, insert on public.plant_events to authenticated;
grant select, insert, update, delete on public.plant_events to service_role;
