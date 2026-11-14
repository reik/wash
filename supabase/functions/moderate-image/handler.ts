import { readImage } from '../_shared/image-input.ts';
import { moderateImage, type ImageClassifier } from '../_shared/moderation.ts';

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export function createImageHandler(classify: ImageClassifier) {
  return async (request: Request): Promise<Response> => {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'invalid_json' }, 400);
    }

    const parsed = readImage(body);
    if (!parsed.ok) {
      return json({ error: parsed.error }, parsed.status);
    }

    const verdict = await moderateImage(parsed.image, classify);
    if (verdict.allowed) {
      return json({ allowed: true }, 200);
    }
    if (verdict.reason === 'unavailable') {
      return json(verdict, 503);
    }
    return json(verdict, 200);
  };
}
