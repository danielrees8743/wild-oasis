import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../services/apiBookings';

export const useTodayActivity = () => {
  const { data: activities, isLoading } = useQuery({
    queryKey: ['todayActivity'],
    queryFn: getStaysTodayActivity,
  });

  return { activities, isLoading };
};
