import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { createEditCabin } from '../../services/apiCabins';

export const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: editingCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin has been updated');
      queryClient.invalidateQueries('cabins');
    },
    onError: () => {
      toast.error('Cabin could not be created');
    },
  });

  return {
    isEditing,
    editingCabin,
  };
};
