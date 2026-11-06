import { useMutation } from '@tanstack/react-query';

import { signInWithPassword } from '../../../api/auth';

export function useSignIn() {
  return useMutation({ mutationFn: signInWithPassword });
}
