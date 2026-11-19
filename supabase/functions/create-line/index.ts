import { createClient } from '@supabase/supabase-js';

import { createClaudeClassifier } from '../_shared/claude-classifier.ts';
import { createLineHandler, type LineDeps } from './handler.ts';

const url = Deno.env.get('SUPABASE_URL') ?? '';
const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const anon = createClient(url, anonKey, { auth: { persistSession: false } });
const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

const deps: LineDeps = {
  async userIdFromRequest(request) {
    const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ?? '';
    if (token === '') {
      return null;
    }
    const { data, error } = await anon.auth.getUser(token);
    return error || !data.user ? null : data.user.id;
  },

  async ownsPlant(userId, plantId) {
    const { data, error } = await admin
      .from('plants')
      .select('id')
      .eq('id', plantId)
      .eq('owner_id', userId)
      .maybeSingle();
    return !error && data !== null;
  },

  checkText: createClaudeClassifier({
    apiKey: Deno.env.get('ANTHROPIC_API_KEY') ?? '',
    fetchImpl: fetch,
  }),

  async recordLine(row) {
    const { data, error } = await admin
      .from('lines')
      .insert({
        plant_id: row.plantId,
        author_id: row.authorId,
        body: row.body,
        locale: row.locale,
        moderation_status: row.moderationStatus,
        moderation_checked_at: new Date().toISOString(),
      })
      .select('id')
      .single();
    if (error) {
      throw error;
    }
    return { id: data.id };
  },
};

Deno.serve(createLineHandler(deps));
