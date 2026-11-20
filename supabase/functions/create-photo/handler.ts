import { readImage } from '../_shared/image-input.ts';
import { moderateImage, type ImageClassifier, type MediaType } from '../_shared/moderation.ts';
import { stripMetadata, type StrippableMediaType } from '../_shared/metadata-strip.ts';

export interface PhotoRow {
  id: string;
  plantId: string;
  uploaderId: string;
  storagePath: string;
  moderationStatus: 'pass';
}

export interface PhotoDeps {
  /** Returns the signed-in user's id, or null when the token is missing or invalid. */
  userIdFromRequest(request: Request): Promise<string | null>;
  ownsPlant(userId: string, plantId: string): Promise<boolean>;
  classify: ImageClassifier;
  newId(): string;
  /** Stores the metadata-free bytes in the private photo bucket. */
  storeImage(path: string, bytes: Uint8Array, mediaType: StrippableMediaType): Promise<void>;
  recordPhoto(row: PhotoRow): Promise<void>;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const EXTENSIONS: Record<MediaType, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function readPlantId(body: unknown): string | null {
  if (typeof body !== 'object' || body === null || !('plantId' in body)) {
    return null;
  }
  const plantId = body.plantId;
  return typeof plantId === 'string' && UUID.test(plantId) ? plantId : null;
}

function decodeBase64(data: string): Uint8Array {
  return Uint8Array.from(atob(data), (char) => char.charCodeAt(0));
}

/**
 * Photo gate: nothing is saved unless the owner is signed in, owns the plant,
 * the bytes match the declared format, and the image passes the check.
 * Only the metadata-free copy is stored. A failed or unavailable check or
 * upload stores nothing.
 */
export function createPhotoHandler(deps: PhotoDeps) {
  return async (request: Request): Promise<Response> => {
    const userId = await deps.userIdFromRequest(request);
    if (userId === null) {
      return json({ error: 'unauthorized' }, 401);
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'invalid_json' }, 400);
    }

    const plantId = readPlantId(body);
    if (plantId === null) {
      return json({ error: 'plant_id_required' }, 400);
    }

    const parsed = readImage(body);
    if (!parsed.ok) {
      return json({ error: parsed.error }, parsed.status);
    }

    let stripped: Uint8Array;
    try {
      stripped = stripMetadata(parsed.image.mediaType, decodeBase64(parsed.image.data));
    } catch {
      return json({ error: 'image_format_mismatch' }, 400);
    }

    if (!(await deps.ownsPlant(userId, plantId))) {
      return json({ error: 'forbidden' }, 403);
    }

    const verdict = await moderateImage(parsed.image, deps.classify);
    if (!verdict.allowed) {
      return verdict.reason === 'unavailable'
        ? json({ error: 'moderation_unavailable' }, 503)
        : json({ error: 'image_flagged' }, 422);
    }

    const id = deps.newId();
    const storagePath = `${plantId}/${id}.${EXTENSIONS[parsed.image.mediaType]}`;
    try {
      await deps.storeImage(storagePath, stripped, parsed.image.mediaType);
    } catch {
      return json({ error: 'storage_unavailable' }, 503);
    }

    await deps.recordPhoto({ id, plantId, uploaderId: userId, storagePath, moderationStatus: 'pass' });
    return json({ id, moderation_status: 'pass' }, 201);
  };
}
