-- Owner corrections to a plant's identity (vault/features/plant-register.md).
-- The model's identification can be corrected by the plant's owner at any time.
-- Corrections go through correct_plant_identity, which records them as the
-- owner's (owner_pick or owner_correction) and clears the model's confidence.
-- Owners can no longer write identity columns directly, so a correction can't
-- be disguised as a model guess.

-- Owners update basic plant details directly; identity fields go through the function.
revoke update on public.plants from authenticated;
grant update (name, stage, city, country_code, climate_class) on public.plants to authenticated;

create function public.correct_plant_identity(
  p_plant_id uuid,
  p_common_name text,
  p_species_id uuid,
  p_family text,
  p_order text,
  p_class text,
  p_category text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not exists (
    select 1 from public.plants where id = p_plant_id and owner_id = auth.uid()
  ) then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  if p_species_id is null and (p_common_name is null or btrim(p_common_name) = '') then
    raise exception 'a common name or a species is required' using errcode = '22023';
  end if;

  update public.plants set
    species_id = p_species_id,
    species_free_text = nullif(btrim(p_common_name), ''),
    taxon_family = p_family,
    taxon_order = p_order,
    taxon_class = p_class,
    category = p_category,
    id_source = case when p_species_id is null then 'owner_correction' else 'owner_pick' end,
    id_confidence = null
  where id = p_plant_id;
end;
$$;

grant execute on function public.correct_plant_identity(uuid, text, uuid, text, text, text, text) to authenticated;
