import { assertEquals } from '@std/assert';

import { createPhotoHandler, type PhotoDeps } from './handler.ts';

const PLANT_ID = '11111111-1111-4111-8111-111111111111';
const USER_ID = '22222222-2222-4222-8222-222222222222';

function post(body: unknown, token: string | null = 'user-token'): Request {
  const headers: Record<string, string> = { 'content-type': 'application/json' };
  if (token !== null) {
    headers.authorization = `Bearer ${token}`;
  }
  return new Request('http://localhost/create-photo', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
}

interface Recorded {
  rows: { plantId: string; uploaderId: string; moderationStatus: string }[];
}

function fakeDeps(overrides: Partial<PhotoDeps> = {}): { deps: PhotoDeps; recorded: Recorded } {
  const recorded: Recorded = { rows: [] };
  const deps: PhotoDeps = {
    userIdFromRequest: () => Promise.resolve(USER_ID),
    ownsPlant: () => Promise.resolve(true),
    classify: () => Promise.resolve('safe'),
    recordPhoto: (row) => {
      recorded.rows.push(row);
      return Promise.resolve({ id: 'photo-1' });
    },
    ...overrides,
  };
  return { deps, recorded };
}

const validBody = { plantId: PLANT_ID, mediaType: 'image/jpeg', data: 'AAAA' };

Deno.test('should_return_401_when_request_has_no_user', async () => {
  const { deps } = fakeDeps({ userIdFromRequest: () => Promise.resolve(null) });

  const response = await createPhotoHandler(deps)(post(validBody, null));

  assertEquals(response.status, 401);
});

Deno.test('should_return_400_when_plant_id_is_missing', async () => {
  const { deps } = fakeDeps();

  const response = await createPhotoHandler(deps)(post({ mediaType: 'image/jpeg', data: 'AAAA' }));

  assertEquals(response.status, 400);
});

Deno.test('should_return_403_when_user_does_not_own_plant', async () => {
  const { deps, recorded } = fakeDeps({ ownsPlant: () => Promise.resolve(false) });

  const response = await createPhotoHandler(deps)(post(validBody));

  assertEquals(response.status, 403);
  assertEquals(recorded.rows.length, 0);
});

Deno.test('should_return_503_and_save_nothing_when_check_is_unavailable', async () => {
  const { deps, recorded } = fakeDeps({ classify: () => Promise.reject(new Error('timeout')) });

  const response = await createPhotoHandler(deps)(post(validBody));

  assertEquals(response.status, 503);
  assertEquals(recorded.rows.length, 0);
});

Deno.test('should_return_422_and_save_nothing_when_image_is_flagged', async () => {
  const { deps, recorded } = fakeDeps({ classify: () => Promise.resolve('unsafe') });

  const response = await createPhotoHandler(deps)(post(validBody));

  assertEquals(response.status, 422);
  assertEquals(recorded.rows.length, 0);
});

Deno.test('should_save_photo_as_passed_when_image_is_safe', async () => {
  const { deps, recorded } = fakeDeps();

  const response = await createPhotoHandler(deps)(post(validBody));

  assertEquals(response.status, 201);
  assertEquals(await response.json(), { id: 'photo-1', moderation_status: 'pass' });
  assertEquals(recorded.rows, [{ plantId: PLANT_ID, uploaderId: USER_ID, moderationStatus: 'pass' }]);
});
