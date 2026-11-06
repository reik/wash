import { http, HttpResponse } from 'msw';

import { server } from '../test/server';
import { signInWithPassword } from './auth';
import { SUPABASE_URL } from './config';

describe('signInWithPassword', () => {
  it('should_return_user_id_when_credentials_are_correct', async () => {
    server.use(
      http.post(`${SUPABASE_URL}/auth/v1/token`, () =>
        HttpResponse.json({
          access_token: 'token',
          token_type: 'bearer',
          expires_in: 3600,
          expires_at: 9999999999,
          refresh_token: 'refresh',
          user: { id: 'user-123', aud: 'authenticated', email: 'plant@example.com' },
        }),
      ),
    );

    const user = await signInWithPassword({ email: 'plant@example.com', password: 'long-enough-pass' });

    expect(user.id).toBe('user-123');
  });

  it('should_throw_invalid_credentials_when_server_rejects_password', async () => {
    server.use(
      http.post(`${SUPABASE_URL}/auth/v1/token`, () =>
        HttpResponse.json(
          { error: 'invalid_grant', error_description: 'Invalid login credentials' },
          { status: 400 },
        ),
      ),
    );

    await expect(
      signInWithPassword({ email: 'plant@example.com', password: 'wrong-password' }),
    ).rejects.toThrow('auth.invalidCredentials');
  });
});
