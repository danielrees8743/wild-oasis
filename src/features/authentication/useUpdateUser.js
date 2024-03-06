import { useMutation, QueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = new QueryClient();
  // todo: figure out this part
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success('User account successfully updated');
      queryClient.setQueryData(['user'], user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
