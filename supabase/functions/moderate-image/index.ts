import { createClaudeImageClassifier } from '../_shared/claude-image-classifier.ts';
import { createImageHandler } from './handler.ts';

const handler = createImageHandler(
  createClaudeImageClassifier({
    apiKey: Deno.env.get('ANTHROPIC_API_KEY') ?? '',
    fetchImpl: fetch,
  }),
);

Deno.serve(handler);
