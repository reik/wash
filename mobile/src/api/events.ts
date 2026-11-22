import { z } from 'zod';

import { supabase } from './supabase';

/** Event types an owner can log by hand (vault/features/care-log.md). */
export const OWNER_EVENT_TYPES = [
  'watered',
  'repotted',
  'moved',
  'new_leaf',
  'flower',
  'droop',
  'leaning',
  'owner_away',
] as const;

export type OwnerEventType = (typeof OWNER_EVENT_TYPES)[number];

const CreatedEventSchema = z.object({ id: z.uuid() });

export interface LogPlantEventInput {
  plantId: string;
  type: OwnerEventType;
}

/**
 * Logs a care or life event for the signed-in owner's plant. Events are
 * immutable, so there is no edit or delete here.
 */
export async function logPlantEvent({ plantId, type }: LogPlantEventInput): Promise<{ id: string }> {
  const { data, error } = await supabase
    .from('plant_events')
    .insert({ plant_id: plantId, type, source: 'owner_log' })
    .select('id')
    .single();

  if (error) {
    throw new Error('event.failed');
  }

  return { id: CreatedEventSchema.parse(data).id };
}
