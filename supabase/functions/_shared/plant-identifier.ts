import type { ImageInput } from './moderation.ts';

/** Most capable model: identification is knowledge plus vision, and it runs once per plant. */
export const IDENTIFICATION_MODEL = 'claude-opus-5-5';

/** Below this confidence nothing is stored, and the owner chooses the species by hand. */
export const MIN_CONFIDENCE = 0.5;

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

export const PLANT_CATEGORIES = [
  'foliage',
  'flowering',
  'succulent',
  'cactus',
  'fern',
  'herb',
  'tree',
  'other',
] as const;

export type PlantCategory = (typeof PLANT_CATEGORIES)[number];

export interface PlantIdentity {
  commonName: string;
  scientificName: string;
  family: string;
  order: string;
  className: string;
  category: PlantCategory;
  confidence: number;
}

export type PlantIdentifier = (image: ImageInput) => Promise<PlantIdentity | null>;

const PROMPT = [
  'Identify the houseplant in this photo.',
  'Reply with only a JSON object with these keys:',
  'common_name, scientific_name, family, order, class,',
  `category (one of: ${PLANT_CATEGORIES.join(', ')}),`,
  'confidence (a number from 0 to 1).',
  'If the photo does not show a plant, use confidence 0.',
].join(' ');

function stripCodeFence(text: string): string {
  return text.replace(/^\s*```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
}

function isCategory(value: unknown): value is PlantCategory {
  return typeof value === 'string' && (PLANT_CATEGORIES as readonly string[]).includes(value);
}

/**
 * Turns the model's answer into an identity. Anything unexpected, or a confidence
 * below MIN_CONFIDENCE, returns null: identification never stores a guess.
 */
export function parseIdentity(text: string): PlantIdentity | null {
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(stripCodeFence(text)) as Record<string, unknown>;
  } catch {
    return null;
  }

  const { common_name, scientific_name, family, order, class: className, category, confidence } = body;
  const strings = [common_name, scientific_name, family, order, className];
  if (!strings.every((value) => typeof value === 'string' && value.trim() !== '')) {
    return null;
  }
  if (!isCategory(category) || typeof confidence !== 'number' || confidence < MIN_CONFIDENCE || confidence > 1) {
    return null;
  }

  return {
    commonName: common_name as string,
    scientificName: scientific_name as string,
    family: family as string,
    order: order as string,
    className: className as string,
    category,
    confidence,
  };
}

interface PlantIdentifierOptions {
  apiKey: string;
  fetchImpl: typeof fetch;
}

interface MessagesResponse {
  content: { type: string; text?: string }[];
}

export function createClaudePlantIdentifier({ apiKey, fetchImpl }: PlantIdentifierOptions): PlantIdentifier {
  return async (image: ImageInput) => {
    try {
      const response = await fetchImpl(ANTHROPIC_URL, {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: IDENTIFICATION_MODEL,
          max_tokens: 300,
          messages: [
            {
              role: 'user',
              content: [
                { type: 'image', source: { type: 'base64', media_type: image.mediaType, data: image.data } },
                { type: 'text', text: PROMPT },
              ],
            },
          ],
        }),
      });
      if (!response.ok) {
        return null;
      }
      const body = (await response.json()) as MessagesResponse;
      const text = body.content.find((part) => part.type === 'text')?.text;
      return text === undefined ? null : parseIdentity(text);
    } catch {
      return null;
    }
  };
}
