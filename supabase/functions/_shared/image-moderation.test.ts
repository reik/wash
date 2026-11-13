import { assertEquals } from '@std/assert';

import { moderateImage } from './moderation.ts';

const image = { mediaType: 'image/jpeg' as const, data: 'AAAA' };

Deno.test('should_allow_image_when_classifier_says_safe', async () => {
  const verdict = await moderateImage(image, () => Promise.resolve('safe'));

  assertEquals(verdict, { allowed: true });
});

Deno.test('should_flag_image_when_classifier_says_unsafe', async () => {
  const verdict = await moderateImage(image, () => Promise.resolve('unsafe'));

  assertEquals(verdict, { allowed: false, reason: 'flagged' });
});

Deno.test('should_block_as_unavailable_when_image_classifier_throws', async () => {
  const verdict = await moderateImage(image, () => Promise.reject(new Error('timeout')));

  assertEquals(verdict, { allowed: false, reason: 'unavailable' });
});
