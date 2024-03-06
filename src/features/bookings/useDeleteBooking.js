import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const useDeleteBooking = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success('Booking deleted');
      queryClient.invalidateQueries('bookings');
      navigate(-1);
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteBooking };
};
