import { readImage } from '../_shared/image-input.ts';
import { moderateImage, type ImageClassifier } from '../_shared/moderation.ts';

export interface PhotoRow {
  plantId: string;
  uploaderId: string;
  moderationStatus: 'pass';
}

export interface PhotoDeps {
  /** Returns the signed-in user's id, or null when the token is missing or invalid. */
  userIdFromRequest(request: Request): Promise<string | null>;
  ownsPlant(userId: string, plantId: string): Promise<boolean>;
  classify: ImageClassifier;
  recordPhoto(row: PhotoRow): Promise<{ id: string }>;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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

/**
 * Photo gate: nothing is saved unless the owner is signed in, owns the plant,
 * and the image passes the check. A failed or unavailable check saves nothing.
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

    if (!(await deps.ownsPlant(userId, plantId))) {
      return json({ error: 'forbidden' }, 403);
    }

    const verdict = await moderateImage(parsed.image, deps.classify);
    if (!verdict.allowed) {
      return verdict.reason === 'unavailable'
        ? json({ error: 'moderation_unavailable' }, 503)
        : json({ error: 'image_flagged' }, 422);
    }

    const saved = await deps.recordPhoto({ plantId, uploaderId: userId, moderationStatus: 'pass' });
    return json({ id: saved.id, moderation_status: 'pass' }, 201);
  };
}
