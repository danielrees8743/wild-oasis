import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has been checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },
    onError: () => {
      toast.error('There was an error while check-in the booking');
    },
  });

  return {
    checkin,
    isCheckingIn,
  };
}
