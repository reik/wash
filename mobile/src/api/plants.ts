import { z } from 'zod';

import { supabase } from './supabase';

export const PlantStageSchema = z.enum(['newborn', 'growing', 'elder']);
export const ClimateClassSchema = z.enum(['temperate', 'tropical', 'arid', 'cold']);
export const TzBandSchema = z.enum(['apac', 'emea', 'americas']);

const CreatedPlantSchema = z.object({
  id: z.uuid(),
  short_code: z.string().length(8),
});

export interface RegisterPlantInput {
  /** The signed-in owner's profile id, which is also their auth user id. */
  ownerId: string;
  name: string;
  stage: z.infer<typeof PlantStageSchema>;
  city: string;
  countryCode: string;
  tzBand: z.infer<typeof TzBandSchema>;
  climateClass: z.infer<typeof ClimateClassSchema>;
}

export interface CreatedPlant {
  id: string;
  shortCode: string;
}

/**
 * Inserts a plant for the signed-in owner. Row-level security makes the owner
 * the only person who can create it; the database generates the short code.
 */
export async function createPlant(input: RegisterPlantInput): Promise<CreatedPlant> {
  const { data, error } = await supabase
    .from('plants')
    .insert({
      owner_id: input.ownerId,
      name: input.name,
      stage: input.stage,
      city: input.city,
      country_code: input.countryCode,
      tz_band: input.tzBand,
      climate_class: input.climateClass,
    })
    .select('id, short_code')
    .single();

  if (error) {
    throw new Error('plant.failed');
  }

  const created = CreatedPlantSchema.parse(data);
  return { id: created.id, shortCode: created.short_code };
}
