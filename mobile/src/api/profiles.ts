import { supabase } from './supabase';

export interface EnsureProfileInput {
  /** The auth user id; profiles.id references it. */
  id: string;
  nickname: string;
  locale: 'en' | 'ja';
  tz: string;
  tzBand: 'apac' | 'emea' | 'americas';
}

/**
 * Creates the owner's profile if it doesn't exist yet. Existing profiles are
 * left as they are, so the owner's own choices are never overwritten.
 */
export async function ensureProfile({ id, nickname, locale, tz, tzBand }: EnsureProfileInput): Promise<void> {
  const { error } = await supabase
    .from('profiles')
    .upsert(
      { id, nickname, locale, tz, tz_band: tzBand },
      { onConflict: 'id', ignoreDuplicates: true },
    );

  if (error) {
    throw new Error('plant.failed');
  }
}
