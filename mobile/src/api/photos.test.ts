import { http, HttpResponse } from 'msw';

import { server } from '../test/server';
import { uploadPhoto } from './photos';
import { SUPABASE_URL } from './config';

const PLANT_ID = '11111111-1111-4111-8111-111111111111';
const PHOTO_ID = '33333333-3333-4333-8333-333333333333';
const ENDPOINT = `${SUPABASE_URL}/functions/v1/create-photo`;

const input = {
  accessToken: 'user-token',
  plantId: PLANT_ID,
  mediaType: 'image/jpeg' as const,
  base64: '/9j/2Q==',
};

describe('uploadPhoto', () => {
  it('should_return_photo_id_when_upload_passes', async () => {
    server.use(
      http.post(ENDPOINT, () =>
        HttpResponse.json({ id: PHOTO_ID, moderation_status: 'pass' }, { status: 201 }),
      ),
    );

    const photo = await uploadPhoto(input);

    expect(photo).toEqual({ id: PHOTO_ID, moderationStatus: 'pass' });
  });

  it('should_send_bearer_token_and_plant_id_in_request', async () => {
    let authorization: string | null = null;
    let sentBody: unknown = null;
    server.use(
      http.post(ENDPOINT, async ({ request }) => {
        authorization = request.headers.get('authorization');
        sentBody = await request.json();
        return HttpResponse.json({ id: PHOTO_ID, moderation_status: 'pass' }, { status: 201 });
      }),
    );

    await uploadPhoto(input);

    expect(authorization).toBe('Bearer user-token');
    expect(sentBody).toEqual({ plantId: PLANT_ID, mediaType: 'image/jpeg', data: '/9j/2Q==' });
  });

  it('should_throw_flagged_when_image_is_flagged', async () => {
    server.use(http.post(ENDPOINT, () => HttpResponse.json({ error: 'image_flagged' }, { status: 422 })));

    await expect(uploadPhoto(input)).rejects.toThrow('photo.flagged');
  });

  it('should_throw_unavailable_when_check_cannot_run', async () => {
    server.use(http.post(ENDPOINT, () => HttpResponse.json({ error: 'moderation_unavailable' }, { status: 503 })));

    await expect(uploadPhoto(input)).rejects.toThrow('photo.unavailable');
  });

  it('should_throw_unauthorized_when_token_is_rejected', async () => {
    server.use(http.post(ENDPOINT, () => HttpResponse.json({ error: 'unauthorized' }, { status: 401 })));

    await expect(uploadPhoto(input)).rejects.toThrow('auth.required');
  });
});
