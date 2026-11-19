-- Plant lines gated by moderation (vault/data-model.md "lines", vault/features/plant-voice.md).
-- Rows arrive only through the create-line Edge Function, which runs the text
-- check first and writes with the service role. Clients get no insert or update
-- rights. Reads are limited to the author until the chat design (circle, family,
-- page) defines who else can see a line.

create table public.lines (
  id uuid primary key default gen_random_uuid(),
  plant_id uuid not null references public.plants (id) on delete cascade,
  author_id uuid not null references public.profiles (id),
  body text not null check (char_length(body) between 1 and 280),
  locale text not null check (locale in ('en', 'ja')),
  moderation_status text not null default 'pending'
    check (moderation_status in ('pending', 'pass', 'fail', 'review')),
  moderation_checked_at timestamptz,
  created_at timestamptz not null default now()
);

create index lines_plant_id_idx on public.lines (plant_id);

alter table public.lines enable row level security;

create policy lines_author_select on public.lines
  for select to authenticated
  using (author_id = auth.uid());

grant select on public.lines to authenticated;
grant select, insert, update, delete on public.lines to service_role;
