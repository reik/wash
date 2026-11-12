import { assertEquals } from '@std/assert';

import { createHandler } from './handler.ts';

function post(body: unknown): Request {
  return new Request('http://localhost/moderate-text', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

Deno.test('should_return_200_allowed_when_text_is_safe', async () => {
  const handler = createHandler(() => Promise.resolve('safe'));

  const response = await handler(post({ text: 'a sunny windowsill' }));

  assertEquals(response.status, 200);
  assertEquals(await response.json(), { allowed: true });
});

Deno.test('should_return_200_flagged_when_text_is_unsafe', async () => {
  const handler = createHandler(() => Promise.resolve('unsafe'));

  const response = await handler(post({ text: 'something hurtful' }));

  assertEquals(response.status, 200);
  assertEquals(await response.json(), { allowed: false, reason: 'flagged' });
});

Deno.test('should_return_503_unavailable_when_classifier_fails', async () => {
  const handler = createHandler(() => Promise.reject(new Error('timeout')));

  const response = await handler(post({ text: 'a sunny windowsill' }));

  assertEquals(response.status, 503);
  assertEquals(await response.json(), { allowed: false, reason: 'unavailable' });
});

Deno.test('should_return_400_when_text_is_missing', async () => {
  const handler = createHandler(() => Promise.resolve('safe'));

  const response = await handler(post({}));

  assertEquals(response.status, 400);
});
