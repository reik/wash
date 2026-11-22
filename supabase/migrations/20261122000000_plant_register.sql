-- Plant register (vault/features/plant-register.md, F9).
-- An owner reads, creates and updates only their own plant and profile. The
-- database generates the short code. Plants are never deleted through the app:
-- memorial and archive are status changes (F14, later). Species are readable by
-- signed-in users for the picker; the app never writes them.

create or replace function public.generate_short_code()
returns text
language sql
volatile
set search_path = ''
as $$
  select string_agg(
    substr('abcdefghjkmnpqrstuvwxyz23456789', floor(random() * 30)::int + 1, 1),
    ''
  )
  from generate_series(1, 8);
$$;

alter table public.plants alter column short_code set default public.generate_short_code();

-- Profiles: owner-only.
create policy profiles_owner_select on public.profiles
  for select to authenticated
  using (id = auth.uid());

create policy profiles_owner_insert on public.profiles
  for insert to authenticated
  with check (id = auth.uid());

create policy profiles_owner_update on public.profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- Plants: owner-only, no delete.
create policy plants_owner_select on public.plants
  for select to authenticated
  using (owner_id = auth.uid());

create policy plants_owner_insert on public.plants
  for insert to authenticated
  with check (owner_id = auth.uid());

create policy plants_owner_update on public.plants
  for update to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

-- Species: read-only for signed-in users.
create policy species_read on public.species
  for select to authenticated
  using (true);

grant select, insert, update on public.profiles to authenticated;
grant select, insert, update on public.plants to authenticated;
grant select on public.species to authenticated;
