-- Photos gated by moderation (vault/data-model.md, vault/features/content-moderation.md).
-- Rows arrive only through the create-photo Edge Function, which runs the image
-- check first and writes with the service role. Clients get no insert or update
-- rights, so they cannot mark their own photo as passed.

create table public.photos (
  id uuid primary key default gen_random_uuid(),
  plant_id uuid not null references public.plants (id) on delete cascade,
  uploader_id uuid not null references public.profiles (id),
  moderation_status text not null default 'pending'
    check (moderation_status in ('pending', 'pass', 'fail', 'review')),
  moderation_checked_at timestamptz,
  visibility text not null default 'private'
    check (visibility in ('private', 'circle', 'public')),
  created_at timestamptz not null default now()
);

create index photos_plant_id_idx on public.photos (plant_id);

alter table public.photos enable row level security;

-- Owners can see their own photos at every stage.
create policy photos_uploader_select on public.photos
  for select to authenticated
  using (uploader_id = auth.uid());

-- Everyone can see a photo only after it passes and is public.
create policy photos_public_select on public.photos
  for select to anon, authenticated
  using (moderation_status = 'pass' and visibility = 'public');

grant select on public.photos to anon, authenticated;
grant select, insert, update, delete on public.photos to service_role;
