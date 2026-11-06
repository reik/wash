-- Core tables for the dev seed (db/seed/dev). Shape follows vault/data-model.md.
-- Only the tables the seed touches. circles and families are plain uuid columns
-- until their tables exist. RLS is on with no policies: only the service role
-- reads or writes these tables until the access rules are written.

create table public.species (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_en text,
  name_ja text,
  scientific_name text,
  temperament text check (temperament in ('expressive', 'stoic', 'habitual', 'easygoing', 'dramatic')),
  climate_class text not null check (climate_class in ('temperate', 'tropical', 'arid', 'cold')),
  gbif_key bigint unique,
  "class" text,
  "order" text,
  family text,
  genus text,
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'owner' check (role in ('owner', 'moderator', 'admin')),
  nickname text not null,
  icon_photo_id uuid,
  locale text not null check (locale in ('en', 'ja')),
  tz text not null,
  tz_band text not null check (tz_band in ('apac', 'emea', 'americas')),
  quiet_hours jsonb,
  notif_prefs jsonb not null default '{}'::jsonb,
  strikes int not null default 0,
  status text not null default 'active' check (status in ('active', 'posting_frozen', 'suspended', 'banned')),
  terms_accepted_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.plants (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id),
  species_id uuid references public.species (id),
  species_free_text text,
  taxon_family text,
  taxon_order text,
  taxon_class text,
  id_source text check (id_source in ('photo_api', 'owner_pick', 'owner_correction')),
  id_confidence numeric,
  name text not null,
  stage text not null check (stage in ('newborn', 'growing', 'elder')),
  estimated_birth_year int,
  city text not null,
  country_code char(2) not null,
  tz_band text not null check (tz_band in ('apac', 'emea', 'americas')),
  climate_class text not null check (climate_class in ('temperate', 'tropical', 'arid', 'cold')),
  status text not null default 'active' check (status in ('active', 'memorial', 'archived')),
  looking_for_friends boolean not null default false,
  circle_id uuid,
  family_id uuid,
  parent_plant_id uuid references public.plants (id),
  allow_previous_owner_updates boolean not null default true,
  last_photo_at timestamptz,
  last_spoke_at timestamptz,
  short_code text not null unique,
  created_at timestamptz not null default now(),
  check ((id_source = 'photo_api') = (id_confidence is not null))
);

alter table public.species enable row level security;
alter table public.profiles enable row level security;
alter table public.plants enable row level security;

-- The seed loader and the backend work through the service role only.
grant select, insert, update, delete on public.species, public.profiles, public.plants to service_role;
