-- Garden home (vault/features/garden-home.md, F16).
-- One call returns the signed-in owner's plants for the home screen. The
-- function filters on auth.uid(), so an owner sees only their own plants, and it
-- does not depend on the plant read policies. This first version covers plant
-- details and photo counts. Latest event and avatar join when plant_events and
-- the avatar column land (follow-up migration).

create function public.garden_for_owner()
returns table (
  plant_id uuid,
  name text,
  stage text,
  city text,
  country_code char(2),
  photo_count bigint,
  last_photo_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    p.id,
    p.name,
    p.stage,
    p.city,
    p.country_code,
    count(ph.id) as photo_count,
    max(ph.created_at) as last_photo_at
  from public.plants p
  left join public.photos ph on ph.plant_id = p.id
  where p.owner_id = auth.uid()
  group by p.id, p.name, p.stage, p.city, p.country_code
  order by p.name;
$$;

grant execute on function public.garden_for_owner() to authenticated;
