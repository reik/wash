import { assertEquals, assertRejects } from '@std/assert';

import { createClaudeImageClassifier } from './claude-image-classifier.ts';

function anthropicResponse(text: string, status = 200): Response {
  return new Response(JSON.stringify({ content: [{ type: 'text', text }] }), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

Deno.test('should_send_image_block_with_media_type_and_data', async () => {
  let sentBody: { messages?: { content?: { type: string; source?: unknown }[] }[] } | undefined;
  const fetchImpl = (_url: string | URL | Request, init?: RequestInit) => {
    sentBody = JSON.parse(String(init?.body));
    return Promise.resolve(anthropicResponse('safe'));
  };
  const classify = createClaudeImageClassifier({ apiKey: 'test-key', fetchImpl });

  await classify({ mediaType: 'image/png', data: 'iVBORw0KGgo=' });

  const imagePart = sentBody?.messages?.[0]?.content?.find((part) => part.type === 'image');
  assertEquals(imagePart?.source, { type: 'base64', media_type: 'image/png', data: 'iVBORw0KGgo=' });
});

Deno.test('should_return_normalized_label_when_model_answers', async () => {
  const classify = createClaudeImageClassifier({
    apiKey: 'test-key',
    fetchImpl: () => Promise.resolve(anthropicResponse(' Unsafe ')),
  });

  assertEquals(await classify({ mediaType: 'image/jpeg', data: 'AAAA' }), 'unsafe');
});

Deno.test('should_throw_when_api_responds_with_error_status', async () => {
  const classify = createClaudeImageClassifier({
    apiKey: 'test-key',
    fetchImpl: () => Promise.resolve(anthropicResponse('overloaded', 529)),
  });

  await assertRejects(() => classify({ mediaType: 'image/jpeg', data: 'AAAA' }));
});
