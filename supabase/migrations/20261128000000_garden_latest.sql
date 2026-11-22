-- Garden home, follow-up (vault/features/garden-home.md, F16).
-- Adds each plant's avatar path and latest event to garden_for_owner. Same owner
-- filter as before: only the caller's own plants are returned.

drop function public.garden_for_owner();

create function public.garden_for_owner()
returns table (
  plant_id uuid,
  name text,
  stage text,
  city text,
  country_code char(2),
  photo_count bigint,
  last_photo_at timestamptz,
  avatar_path text,
  latest_event_type text,
  latest_event_at timestamptz
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
    max(ph.created_at) as last_photo_at,
    (
      select a.storage_path from public.photos a
      where a.plant_id = p.id and a.is_avatar
      limit 1
    ) as avatar_path,
    le.type as latest_event_type,
    le.occurred_at as latest_event_at
  from public.plants p
  left join public.photos ph on ph.plant_id = p.id
  left join lateral (
    select e.type, e.occurred_at
    from public.plant_events e
    where e.plant_id = p.id
    order by e.occurred_at desc
    limit 1
  ) le on true
  where p.owner_id = auth.uid()
  group by p.id, p.name, p.stage, p.city, p.country_code, le.type, le.occurred_at
  order by p.name;
$$;

grant execute on function public.garden_for_owner() to authenticated;
