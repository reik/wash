import { signInSchema } from './schemas';

describe('signInSchema', () => {
  it('should_accept_credentials_when_email_and_password_are_valid', () => {
    const result = signInSchema.safeParse({ email: 'plant@example.com', password: 'long-enough-pass' });
    expect(result.success).toBe(true);
  });

  it('should_reject_email_when_format_is_invalid', () => {
    const result = signInSchema.safeParse({ email: 'not-an-email', password: 'long-enough-pass' });
    expect(result.error?.issues.find((issue) => issue.path[0] === 'email')?.message).toBe(
      'validation.emailInvalid',
    );
  });

  it('should_reject_password_when_shorter_than_8_characters', () => {
    const result = signInSchema.safeParse({ email: 'plant@example.com', password: 'short' });
    expect(result.error?.issues.find((issue) => issue.path[0] === 'password')?.message).toBe(
      'validation.passwordTooShort',
    );
  });
});
