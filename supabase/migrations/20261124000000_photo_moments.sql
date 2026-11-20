-- Photo moments and same-angle guide (vault/features/photo-moments.md, F11).
-- A photo can join an angle group and can be set as the plant's avatar. Only the
-- plant's owner changes these, and only on their own photos. set_plant_avatar
-- clears the old avatar and sets the new one in one step, so a plant never has two.

alter table public.photos
  add column angle_group_id uuid,
  add column is_avatar boolean not null default false;

create index photos_angle_group_idx on public.photos (plant_id, angle_group_id);

-- At most one avatar per plant.
create unique index photos_one_avatar_per_plant on public.photos (plant_id) where is_avatar;

-- Ownership check that does not depend on the plant read policies.
create function public.is_plant_owner(p_plant_id uuid)
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

-- Owners update only the two moment columns, on photos of plants they own.
create policy photos_owner_moments_update on public.photos
  for update to authenticated
  using (public.is_plant_owner(plant_id))
  with check (public.is_plant_owner(plant_id));

grant update (angle_group_id) on public.photos to authenticated;

create function public.set_plant_avatar(p_photo_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_plant uuid;
  v_status text;
begin
  select plant_id, moderation_status into v_plant, v_status
  from public.photos where id = p_photo_id;

  if v_plant is null or not public.is_plant_owner(v_plant) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if v_status <> 'pass' then
    raise exception 'photo has not passed moderation' using errcode = '42501';
  end if;

  update public.photos set is_avatar = false where plant_id = v_plant and is_avatar;
  update public.photos set is_avatar = true where id = p_photo_id;
end;
$$;

grant execute on function public.set_plant_avatar(uuid) to authenticated;
