import { z } from 'zod';

export const signInSchema = z.object({
  email: z.email({ error: 'validation.emailInvalid' }),
  password: z.string().min(8, { error: 'validation.passwordTooShort' }),
});

export type SignInInput = z.infer<typeof signInSchema>;
