import type { User } from '@supabase/supabase-js';

import type { SignInInput } from '../features/auth/schemas';
import { supabase } from './supabase';

export const INVALID_CREDENTIALS_ERROR = 'auth.invalidCredentials';

export async function signInWithPassword({ email, password }: SignInInput): Promise<User> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error(INVALID_CREDENTIALS_ERROR);
  }

  return data.user;
}
