import { assertEquals } from '@std/assert';

import { createImageHandler } from './handler.ts';

function post(body: unknown): Request {
  return new Request('http://localhost/moderate-image', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

Deno.test('should_return_200_allowed_when_image_is_safe', async () => {
  const handler = createImageHandler(() => Promise.resolve('safe'));

  const response = await handler(post({ mediaType: 'image/jpeg', data: 'AAAA' }));

  assertEquals(response.status, 200);
  assertEquals(await response.json(), { allowed: true });
});

Deno.test('should_return_200_flagged_when_image_is_unsafe', async () => {
  const handler = createImageHandler(() => Promise.resolve('unsafe'));

  const response = await handler(post({ mediaType: 'image/jpeg', data: 'AAAA' }));

  assertEquals(response.status, 200);
  assertEquals(await response.json(), { allowed: false, reason: 'flagged' });
});

Deno.test('should_return_503_unavailable_when_classifier_fails', async () => {
  const handler = createImageHandler(() => Promise.reject(new Error('timeout')));

  const response = await handler(post({ mediaType: 'image/jpeg', data: 'AAAA' }));

  assertEquals(response.status, 503);
  assertEquals(await response.json(), { allowed: false, reason: 'unavailable' });
});

Deno.test('should_return_400_when_media_type_is_not_supported', async () => {
  const handler = createImageHandler(() => Promise.resolve('safe'));

  const response = await handler(post({ mediaType: 'image/gif', data: 'AAAA' }));

  assertEquals(response.status, 400);
});

Deno.test('should_return_413_when_image_exceeds_size_limit', async () => {
  const handler = createImageHandler(() => Promise.resolve('safe'));
  const oversized = 'A'.repeat(7_000_001);

  const response = await handler(post({ mediaType: 'image/jpeg', data: oversized }));

  assertEquals(response.status, 413);
});

Deno.test('should_return_400_when_image_data_is_missing', async () => {
  const handler = createImageHandler(() => Promise.resolve('safe'));

  const response = await handler(post({ mediaType: 'image/jpeg' }));

  assertEquals(response.status, 400);
});
