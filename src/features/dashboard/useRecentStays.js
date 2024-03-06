import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getStaysAfterDate } from '../../services/apiBookings';

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get('last') ? 7 : searchParams.get('last');

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: staysData } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['staysData', `last-${numDays}`],
  });

  const confirmedStays = staysData?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out'
  );

  return { isLoading, staysData, confirmedStays, numDays };
}
