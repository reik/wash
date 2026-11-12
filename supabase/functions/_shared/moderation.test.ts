import { assertEquals } from '@std/assert';

import { moderateText } from './moderation.ts';

Deno.test('should_allow_text_when_classifier_says_safe', async () => {
  const verdict = await moderateText('a sunny windowsill', () => Promise.resolve('safe'));

  assertEquals(verdict, { allowed: true });
});

Deno.test('should_flag_text_when_classifier_says_unsafe', async () => {
  const verdict = await moderateText('something hurtful', () => Promise.resolve('unsafe'));

  assertEquals(verdict, { allowed: false, reason: 'flagged' });
});

Deno.test('should_block_as_unavailable_when_classifier_throws', async () => {
  const verdict = await moderateText('a sunny windowsill', () => Promise.reject(new Error('timeout')));

  assertEquals(verdict, { allowed: false, reason: 'unavailable' });
});

Deno.test('should_block_as_unavailable_when_classifier_returns_unknown_label', async () => {
  const verdict = await moderateText('a sunny windowsill', () => Promise.resolve('maybe'));

  assertEquals(verdict, { allowed: false, reason: 'unavailable' });
});
