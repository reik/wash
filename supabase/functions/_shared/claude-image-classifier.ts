import { MODERATION_MODEL } from './claude-classifier.ts';
import type { ImageClassifier, ImageInput } from './moderation.ts';

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

const PROMPT = [
  'You are an image safety classifier for a plant-themed social app for all ages.',
  'Reply with exactly one word: "unsafe" if the photo shows nudity or sexual content, graphic violence or gore, hate symbols, or anything hurtful toward a person or group; otherwise reply "safe".',
].join('\n');

interface ClaudeImageClassifierOptions {
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

export function createClaudeImageClassifier({ apiKey, fetchImpl }: ClaudeImageClassifierOptions): ImageClassifier {
  return async (image: ImageInput) => {
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
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: { type: 'base64', media_type: image.mediaType, data: image.data },
              },
              { type: 'text', text: PROMPT },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`moderation request failed with status ${response.status}`);
    }

    const answer = firstText((await response.json()) as MessagesResponse);
    return answer.trim().toLowerCase();
  };
}
