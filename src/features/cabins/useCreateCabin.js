import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { createEditCabin } from '../../services/apiCabins';

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('Cabin has been created');
      queryClient.invalidateQueries('cabins');
    },
    onError: () => {
      toast.error('Cabin could not be created');
    },
  });

  return {
    createCabin,
    isCreating,
  };
}
