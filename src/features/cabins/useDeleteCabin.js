import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success('Cabin deleted');

      queryClient.invalidateQueries('cabins');
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteCabin };
};
