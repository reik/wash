import { http, HttpResponse } from 'msw';

import { server } from '../test/server';
import { SUPABASE_URL } from './config';
import { ensureProfile } from './profiles';

const ENDPOINT = `${SUPABASE_URL}/rest/v1/profiles`;
const input = {
  id: '22222222-2222-4222-8222-222222222222',
  nickname: 'owner-222222',
  locale: 'en' as const,
  tz: 'Asia/Tokyo',
  tzBand: 'apac' as const,
};

describe('ensureProfile', () => {
  it('should_resolve_when_profile_exists_or_is_created', async () => {
    server.use(http.post(ENDPOINT, () => new HttpResponse(null, { status: 201 })));

    await expect(ensureProfile(input)).resolves.toBeUndefined();
  });

  it('should_throw_when_database_rejects_the_upsert', async () => {
    server.use(http.post(ENDPOINT, () => HttpResponse.json({ message: 'denied' }, { status: 403 })));

    await expect(ensureProfile(input)).rejects.toThrow('plant.failed');
  });
});
