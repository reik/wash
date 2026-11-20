import { z } from 'zod';

import { SUPABASE_URL } from './config';

export const PhotoUploadResponseSchema = z.object({
  id: z.uuid(),
  moderation_status: z.literal('pass'),
});

export type PhotoUploadResponse = z.infer<typeof PhotoUploadResponseSchema>;

export type MediaType = 'image/jpeg' | 'image/png' | 'image/webp';

export interface UploadPhotoInput {
  accessToken: string;
  plantId: string;
  mediaType: MediaType;
  /** Base64 image bytes, without a data: prefix. */
  base64: string;
}

export interface UploadedPhoto {
  id: string;
  moderationStatus: 'pass';
}

export async function uploadPhoto({ accessToken, plantId, mediaType, base64 }: UploadPhotoInput): Promise<UploadedPhoto> {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/create-photo`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ plantId, mediaType, data: base64 }),
  });

  if (response.status === 401) {
    throw new Error('auth.required');
  }
  if (response.status === 422) {
    throw new Error('photo.flagged');
  }
  if (response.status === 503) {
    throw new Error('photo.unavailable');
  }
  if (!response.ok) {
    throw new Error('photo.failed');
  }

  const body = PhotoUploadResponseSchema.parse(await response.json());
  return { id: body.id, moderationStatus: body.moderation_status };
}
