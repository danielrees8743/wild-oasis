import { useMutation } from '@tanstack/react-query';
import { signUp as signUpApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (data) => {
      console.log(data);
      toast.success(
        'Account created. Please verify your new account from the user&apod;s email.'
      );
    },
  });

  return { signUp, isLoading };
}
