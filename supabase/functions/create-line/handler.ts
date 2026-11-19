import { moderateText, type Classifier } from '../_shared/moderation.ts';

export type Locale = 'en' | 'ja';

export interface LineRow {
  plantId: string;
  authorId: string;
  body: string;
  locale: Locale;
  moderationStatus: 'pass';
}

export interface LineDeps {
  /** Returns the signed-in user's id, or null when the token is missing or invalid. */
  userIdFromRequest(request: Request): Promise<string | null>;
  ownsPlant(userId: string, plantId: string): Promise<boolean>;
  checkText: Classifier;
  recordLine(row: LineRow): Promise<{ id: string }>;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_BODY_LENGTH = 280;
const LOCALES: readonly string[] = ['en', 'ja'];

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

type LineInput = { plantId: string; body: string; locale: Locale };

function readLine(body: unknown): LineInput | 'plant_id_required' | 'body_required' | 'locale_required' {
  if (typeof body !== 'object' || body === null) {
    return 'plant_id_required';
  }
  const { plantId, body: text, locale } = body as { plantId?: unknown; body?: unknown; locale?: unknown };
  if (typeof plantId !== 'string' || !UUID.test(plantId)) {
    return 'plant_id_required';
  }
  if (typeof text !== 'string' || text.trim() === '' || text.length > MAX_BODY_LENGTH) {
    return 'body_required';
  }
  if (typeof locale !== 'string' || !LOCALES.includes(locale)) {
    return 'locale_required';
  }
  return { plantId, body: text, locale: locale as Locale };
}

/**
 * Line gate: a plant line is saved only when the owner is signed in, owns the
 * plant, and the text passes the check. A failed or unavailable check saves nothing.
 */
export function createLineHandler(deps: LineDeps) {
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

    const line = readLine(body);
    if (typeof line === 'string') {
      return json({ error: line }, 400);
    }

    if (!(await deps.ownsPlant(userId, line.plantId))) {
      return json({ error: 'forbidden' }, 403);
    }

    const verdict = await moderateText(line.body, deps.checkText);
    if (!verdict.allowed) {
      return verdict.reason === 'unavailable'
        ? json({ error: 'moderation_unavailable' }, 503)
        : json({ error: 'text_flagged' }, 422);
    }

    const saved = await deps.recordLine({
      plantId: line.plantId,
      authorId: userId,
      body: line.body,
      locale: line.locale,
      moderationStatus: 'pass',
    });
    return json({ id: saved.id, moderation_status: 'pass' }, 201);
  };
}
