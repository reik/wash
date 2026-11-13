import { moderateImage, type ImageClassifier, type MediaType } from '../_shared/moderation.ts';

/** About 5 MB of image bytes once base64-encoded. */
const MAX_BASE64_LENGTH = 7_000_000;

const SUPPORTED_MEDIA_TYPES: readonly string[] = ['image/jpeg', 'image/png', 'image/webp'];

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function isMediaType(value: unknown): value is MediaType {
  return typeof value === 'string' && SUPPORTED_MEDIA_TYPES.includes(value);
}

type ParsedImage = { mediaType: MediaType; data: string };

function readImage(body: unknown): ParsedImage | 'bad_request' | 'too_large' {
  if (typeof body !== 'object' || body === null) {
    return 'bad_request';
  }
  const { mediaType, data } = body as { mediaType?: unknown; data?: unknown };
  if (!isMediaType(mediaType) || typeof data !== 'string' || data.length === 0) {
    return 'bad_request';
  }
  if (data.length > MAX_BASE64_LENGTH) {
    return 'too_large';
  }
  return { mediaType, data };
}

export function createImageHandler(classify: ImageClassifier) {
  return async (request: Request): Promise<Response> => {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'invalid_json' }, 400);
    }

    const image = readImage(body);
    if (image === 'bad_request') {
      return json({ error: 'image_required' }, 400);
    }
    if (image === 'too_large') {
      return json({ error: 'image_too_large' }, 413);
    }

    const verdict = await moderateImage(image, classify);
    if (verdict.allowed) {
      return json({ allowed: true }, 200);
    }
    if (verdict.reason === 'unavailable') {
      return json(verdict, 503);
    }
    return json(verdict, 200);
  };
}
