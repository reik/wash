const LOCAL_SUPABASE_URL = 'http://127.0.0.1:56321';

export const SUPABASE_URL: string = process.env.EXPO_PUBLIC_SUPABASE_URL ?? LOCAL_SUPABASE_URL;

export const SUPABASE_ANON_KEY: string = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';
