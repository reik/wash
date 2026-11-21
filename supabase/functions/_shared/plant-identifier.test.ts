import { assertEquals } from '@std/assert';

import { createClaudePlantIdentifier, IDENTIFICATION_MODEL, parseIdentity } from './plant-identifier.ts';

const VALID = {
  common_name: 'Golden pothos',
  scientific_name: 'Epipremnum aureum',
  family: 'Araceae',
  order: 'Alismatales',
  class: 'Liliopsida',
  category: 'foliage',
  confidence: 0.92,
};

Deno.test('should_return_identity_when_model_is_confident', () => {
  const identity = parseIdentity(JSON.stringify(VALID));

  assertEquals(identity?.scientificName, 'Epipremnum aureum');
});

Deno.test('should_return_null_when_confidence_is_below_threshold', () => {
  assertEquals(parseIdentity(JSON.stringify({ ...VALID, confidence: 0.3 })), null);
});

Deno.test('should_return_null_when_answer_is_not_json', () => {
  assertEquals(parseIdentity('I think it might be a pothos'), null);
});

Deno.test('should_return_null_when_category_is_unknown', () => {
  assertEquals(parseIdentity(JSON.stringify({ ...VALID, category: 'mushroom' })), null);
});

Deno.test('should_accept_answer_wrapped_in_code_fence', () => {
  const fenced = '```json\n' + JSON.stringify(VALID) + '\n```';

  assertEquals(parseIdentity(fenced)?.commonName, 'Golden pothos');
});

Deno.test('should_send_opus_model_and_image_when_identifying', async () => {
  let sentBody: { model?: string; messages?: { content?: { type: string }[] }[] } | undefined;
  const identify = createClaudePlantIdentifier({
    apiKey: 'test-key',
    fetchImpl: (_url, init) => {
      sentBody = JSON.parse(String(init?.body));
      return Promise.resolve(new Response(JSON.stringify({ content: [{ type: 'text', text: JSON.stringify(VALID) }] })));
    },
  });

  await identify({ mediaType: 'image/jpeg', data: 'AAAA' });

  assertEquals(sentBody?.model, IDENTIFICATION_MODEL);
  assertEquals(sentBody?.messages?.[0]?.content?.some((part) => part.type === 'image'), true);
});

Deno.test('should_return_null_instead_of_throwing_when_api_fails', async () => {
  const identify = createClaudePlantIdentifier({
    apiKey: 'test-key',
    fetchImpl: () => Promise.resolve(new Response('overloaded', { status: 529 })),
  });

  assertEquals(await identify({ mediaType: 'image/jpeg', data: 'AAAA' }), null);
});
