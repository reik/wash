import { assertEquals } from '@std/assert';

import { createPhotoHandler, type PhotoDeps } from './handler.ts';

const PLANT_ID = '11111111-1111-4111-8111-111111111111';
const USER_ID = '22222222-2222-4222-8222-222222222222';
const PHOTO_ID = '33333333-3333-4333-8333-333333333333';

/** Minimal JPEG: start and end markers only. */
const CLEAN_JPEG = btoa(String.fromCharCode(0xff, 0xd8, 0xff, 0xd9));
/** Same JPEG with an APP1 (EXIF) segment in front. The stored copy must not contain it. */
const DIRTY_JPEG = btoa(String.fromCharCode(0xff, 0xd8, 0xff, 0xe1, 0x00, 0x04, 0x00, 0x00, 0xff, 0xd9));

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
  rows: { id: string; plantId: string; uploaderId: string; storagePath: string; moderationStatus: string }[];
  uploads: { path: string; mediaType: string; bytes: number[] }[];
  identified: string[];
}

function fakeDeps(overrides: Partial<PhotoDeps> = {}): { deps: PhotoDeps; recorded: Recorded } {
  const recorded: Recorded = { rows: [], uploads: [], identified: [] };
  const deps: PhotoDeps = {
    userIdFromRequest: () => Promise.resolve(USER_ID),
    ownsPlant: () => Promise.resolve(true),
    classify: () => Promise.resolve('safe'),
    newId: () => PHOTO_ID,
    storeImage: (path, bytes, mediaType) => {
      recorded.uploads.push({ path, mediaType, bytes: Array.from(bytes) });
      return Promise.resolve();
    },
    recordPhoto: (row) => {
      recorded.rows.push(row);
      return Promise.resolve();
    },
    identifyPlant: (plantId) => {
      recorded.identified.push(plantId);
      return Promise.resolve();
    },
    ...overrides,
  };
  return { deps, recorded };
}

const validBody = { plantId: PLANT_ID, mediaType: 'image/jpeg', data: DIRTY_JPEG };

Deno.test('should_return_401_when_request_has_no_user', async () => {
  const { deps } = fakeDeps({ userIdFromRequest: () => Promise.resolve(null) });

  const response = await createPhotoHandler(deps)(post(validBody, null));

  assertEquals(response.status, 401);
});

Deno.test('should_return_400_when_plant_id_is_missing', async () => {
  const { deps } = fakeDeps();

  const response = await createPhotoHandler(deps)(post({ mediaType: 'image/jpeg', data: CLEAN_JPEG }));

  assertEquals(response.status, 400);
});

Deno.test('should_return_400_when_bytes_do_not_match_declared_format', async () => {
  const { deps, recorded } = fakeDeps();

  const response = await createPhotoHandler(deps)(
    post({ plantId: PLANT_ID, mediaType: 'image/jpeg', data: btoa('not really a jpeg') }),
  );

  assertEquals(response.status, 400);
  assertEquals(recorded.uploads.length, 0);
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
  assertEquals(recorded.uploads.length, 0);
  assertEquals(recorded.rows.length, 0);
});

Deno.test('should_return_422_and_save_nothing_when_image_is_flagged', async () => {
  const { deps, recorded } = fakeDeps({ classify: () => Promise.resolve('unsafe') });

  const response = await createPhotoHandler(deps)(post(validBody));

  assertEquals(response.status, 422);
  assertEquals(recorded.uploads.length, 0);
  assertEquals(recorded.rows.length, 0);
});

Deno.test('should_return_503_and_record_nothing_when_storage_upload_fails', async () => {
  const { deps, recorded } = fakeDeps({ storeImage: () => Promise.reject(new Error('bucket down')) });

  const response = await createPhotoHandler(deps)(post(validBody));

  assertEquals(response.status, 503);
  assertEquals(recorded.rows.length, 0);
});

Deno.test('should_store_stripped_copy_at_plant_path_when_image_is_safe', async () => {
  const { deps, recorded } = fakeDeps();

  await createPhotoHandler(deps)(post(validBody));

  assertEquals(recorded.uploads, [
    { path: `${PLANT_ID}/${PHOTO_ID}.jpg`, mediaType: 'image/jpeg', bytes: [0xff, 0xd8, 0xff, 0xd9] },
  ]);
});

Deno.test('should_return_201_and_record_photo_as_passed_when_image_is_safe', async () => {
  const { deps, recorded } = fakeDeps();

  const response = await createPhotoHandler(deps)(post(validBody));

  assertEquals(response.status, 201);
  assertEquals(await response.json(), { id: PHOTO_ID, moderation_status: 'pass' });
  assertEquals(recorded.rows, [
    {
      id: PHOTO_ID,
      plantId: PLANT_ID,
      uploaderId: USER_ID,
      storagePath: `${PLANT_ID}/${PHOTO_ID}.jpg`,
      moderationStatus: 'pass',
    },
  ]);
});

Deno.test('should_identify_plant_after_photo_is_saved', async () => {
  const { deps, recorded } = fakeDeps();

  await createPhotoHandler(deps)(post(validBody));

  assertEquals(recorded.identified, [PLANT_ID]);
});

Deno.test('should_still_return_201_when_identification_fails', async () => {
  const { deps } = fakeDeps({ identifyPlant: () => Promise.reject(new Error('model down')) });

  const response = await createPhotoHandler(deps)(post(validBody));

  assertEquals(response.status, 201);
});

Deno.test('should_not_identify_plant_when_image_is_flagged', async () => {
  const { deps, recorded } = fakeDeps({ classify: () => Promise.resolve('unsafe') });

  await createPhotoHandler(deps)(post(validBody));

  assertEquals(recorded.identified, []);
});
