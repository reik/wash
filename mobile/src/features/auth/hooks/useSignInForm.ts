import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { signInSchema, type SignInInput } from '../schemas';
import { useSignIn } from './useSignIn';

export function useSignInForm() {
  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });
  const signIn = useSignIn();
  const submit = form.handleSubmit((values) => signIn.mutate(values));

  return { form, submit, signIn };
}
