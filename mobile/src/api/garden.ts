import { z } from 'zod';

import { supabase } from './supabase';

const GardenRowSchema = z.object({
  plant_id: z.uuid(),
  name: z.string(),
  stage: z.enum(['newborn', 'growing', 'elder']),
  city: z.string(),
  country_code: z.string(),
  photo_count: z.number().int().nonnegative(),
  last_photo_at: z.string().nullable(),
  avatar_path: z.string().nullable(),
  latest_event_type: z.string().nullable(),
  latest_event_at: z.string().nullable(),
});

const GardenSchema = z.array(GardenRowSchema);

export interface GardenPlant {
  plantId: string;
  name: string;
  stage: 'newborn' | 'growing' | 'elder';
  city: string;
  countryCode: string;
  photoCount: number;
  lastPhotoAt: string | null;
  avatarPath: string | null;
  latestEventType: string | null;
  latestEventAt: string | null;
}

/** The signed-in owner's plants for the garden home, one call. */
export async function fetchGarden(): Promise<GardenPlant[]> {
  const { data, error } = await supabase.rpc('garden_for_owner');

  if (error) {
    throw new Error('garden.failed');
  }

  return GardenSchema.parse(data).map((row) => ({
    plantId: row.plant_id,
    name: row.name,
    stage: row.stage,
    city: row.city,
    countryCode: row.country_code,
    photoCount: row.photo_count,
    lastPhotoAt: row.last_photo_at,
    avatarPath: row.avatar_path,
    latestEventType: row.latest_event_type,
    latestEventAt: row.latest_event_at,
  }));
}
