import type { ImageInput, MediaType } from './moderation.ts';

/** About 5 MB of image bytes once base64-encoded. */
export const MAX_BASE64_LENGTH = 7_000_000;

const SUPPORTED_MEDIA_TYPES: readonly string[] = ['image/jpeg', 'image/png', 'image/webp'];

function isMediaType(value: unknown): value is MediaType {
  return typeof value === 'string' && SUPPORTED_MEDIA_TYPES.includes(value);
}

export type ImageParseResult =
  | { ok: true; image: ImageInput }
  | { ok: false; status: 400 | 413; error: 'image_required' | 'image_too_large' };

export function readImage(body: unknown): ImageParseResult {
  if (typeof body !== 'object' || body === null) {
    return { ok: false, status: 400, error: 'image_required' };
  }
  const { mediaType, data } = body as { mediaType?: unknown; data?: unknown };
  if (!isMediaType(mediaType) || typeof data !== 'string' || data.length === 0) {
    return { ok: false, status: 400, error: 'image_required' };
  }
  if (data.length > MAX_BASE64_LENGTH) {
    return { ok: false, status: 413, error: 'image_too_large' };
  }
  return { ok: true, image: { mediaType, data } };
}
