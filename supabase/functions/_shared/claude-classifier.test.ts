import { assertEquals, assertRejects } from '@std/assert';

import { createClaudeClassifier } from './claude-classifier.ts';

function anthropicResponse(text: string, status = 200): Response {
  return new Response(JSON.stringify({ content: [{ type: 'text', text }] }), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

Deno.test('should_send_haiku_model_and_api_key_when_classifying', async () => {
  let sentHeaders: Headers | undefined;
  let sentBody: { model?: string } | undefined;
  const fetchImpl = (_url: string | URL | Request, init?: RequestInit) => {
    sentHeaders = new Headers(init?.headers);
    sentBody = JSON.parse(String(init?.body));
    return Promise.resolve(anthropicResponse('safe'));
  };
  const classify = createClaudeClassifier({ apiKey: 'test-key', fetchImpl });

  await classify('a sunny windowsill');

  assertEquals(sentHeaders?.get('x-api-key'), 'test-key');
  assertEquals(sentBody?.model, 'claude-haiku-5-5');
});

Deno.test('should_return_safe_label_when_model_answers_safe', async () => {
  const classify = createClaudeClassifier({
    apiKey: 'test-key',
    fetchImpl: () => Promise.resolve(anthropicResponse(' Safe \n')),
  });

  assertEquals(await classify('a sunny windowsill'), 'safe');
});

Deno.test('should_throw_when_api_responds_with_error_status', async () => {
  const classify = createClaudeClassifier({
    apiKey: 'test-key',
    fetchImpl: () => Promise.resolve(anthropicResponse('overloaded', 529)),
  });

  await assertRejects(() => classify('a sunny windowsill'));
});
