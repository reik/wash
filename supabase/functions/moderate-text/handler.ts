import { moderateText, type Classifier } from '../_shared/moderation.ts';

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function readText(body: unknown): string | null {
  if (typeof body !== 'object' || body === null || !('text' in body)) {
    return null;
  }
  return typeof body.text === 'string' ? body.text : null;
}

export function createHandler(classify: Classifier) {
  return async (request: Request): Promise<Response> => {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'invalid_json' }, 400);
    }

    const text = readText(body);
    if (text === null) {
      return json({ error: 'text_required' }, 400);
    }

    const verdict = await moderateText(text, classify);
    if (verdict.allowed) {
      return json({ allowed: true }, 200);
    }
    if (verdict.reason === 'unavailable') {
      return json(verdict, 503);
    }
    return json(verdict, 200);
  };
}
