import { createClaudeClassifier } from '../_shared/claude-classifier.ts';
import { createHandler } from './handler.ts';

const handler = createHandler(
  createClaudeClassifier({
    apiKey: Deno.env.get('ANTHROPIC_API_KEY') ?? '',
    fetchImpl: fetch,
  }),
);

Deno.serve(handler);
