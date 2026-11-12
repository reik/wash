import type { Classifier } from './moderation.ts';

export const MODERATION_MODEL = 'claude-haiku-5-5';

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

const PROMPT = [
  'You are a content safety classifier for a plant-themed social app for all ages.',
  'Reply with exactly one word: "unsafe" if the text is sexual, violent, discriminatory, or hurtful toward a person or group; otherwise reply "safe".',
  'Text to classify follows.',
].join('\n');

interface ClaudeClassifierOptions {
  apiKey: string;
  fetchImpl: typeof fetch;
}

interface MessagesResponse {
  content: { type: string; text?: string }[];
}

function firstText(body: MessagesResponse): string {
  const block = body.content.find((part) => part.type === 'text');
  if (block?.text === undefined) {
    throw new Error('moderation response has no text block');
  }
  return block.text;
}

export function createClaudeClassifier({ apiKey, fetchImpl }: ClaudeClassifierOptions): Classifier {
  return async (text: string) => {
    const response = await fetchImpl(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: MODERATION_MODEL,
        max_tokens: 5,
        messages: [{ role: 'user', content: `${PROMPT}\n\n${text}` }],
      }),
    });

    if (!response.ok) {
      throw new Error(`moderation request failed with status ${response.status}`);
    }

    const answer = firstText((await response.json()) as MessagesResponse);
    return answer.trim().toLowerCase();
  };
}
