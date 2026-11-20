import { supabase } from './supabase';

/** The signed-in user's id, or null when no one is signed in. */
export async function getSessionUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id ?? null;
}
