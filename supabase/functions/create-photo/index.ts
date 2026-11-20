import { createClient } from '@supabase/supabase-js';

import { createClaudeImageClassifier } from '../_shared/claude-image-classifier.ts';
import { createClaudePlantIdentifier } from '../_shared/plant-identifier.ts';
import { createPhotoHandler, type PhotoDeps } from './handler.ts';

const PHOTO_BUCKET = 'plant-photos';

const url = Deno.env.get('SUPABASE_URL') ?? '';
const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const anon = createClient(url, anonKey, { auth: { persistSession: false } });
const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

const identifyFromPhoto = createClaudePlantIdentifier({
  apiKey: Deno.env.get('ANTHROPIC_API_KEY') ?? '',
  fetchImpl: fetch,
});

const deps: PhotoDeps = {
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

  classify: createClaudeImageClassifier({
    apiKey: Deno.env.get('ANTHROPIC_API_KEY') ?? '',
    fetchImpl: fetch,
  }),

  newId: () => crypto.randomUUID(),

  async storeImage(path, bytes, mediaType) {
    const { error } = await admin.storage.from(PHOTO_BUCKET).upload(path, bytes, {
      contentType: mediaType,
      upsert: false,
    });
    if (error) {
      throw error;
    }
  },

  async recordPhoto(row) {
    const { error } = await admin.from('photos').insert({
      id: row.id,
      plant_id: row.plantId,
      uploader_id: row.uploaderId,
      storage_path: row.storagePath,
      moderation_status: row.moderationStatus,
      moderation_checked_at: new Date().toISOString(),
    });
    if (error) {
      throw error;
    }
  },

  async identifyPlant(plantId, image) {
    const { data: plant } = await admin.from('plants').select('id_source').eq('id', plantId).maybeSingle();
    if (!plant || plant.id_source !== null) {
      return;
    }

    const identity = await identifyFromPhoto(image);
    if (identity === null) {
      return;
    }

    const { data: species } = await admin
      .from('species')
      .select('id')
      .eq('scientific_name', identity.scientificName)
      .maybeSingle();

    // Only fills a plant that is still unidentified, so a later photo can't overwrite it.
    await admin
      .from('plants')
      .update({
        species_id: species?.id ?? null,
        species_free_text: identity.commonName,
        taxon_family: identity.family,
        taxon_order: identity.order,
        taxon_class: identity.className,
        category: identity.category,
        id_source: 'photo_api',
        id_confidence: identity.confidence,
      })
      .eq('id', plantId)
      .is('id_source', null);
  },
};

Deno.serve(createPhotoHandler(deps));
