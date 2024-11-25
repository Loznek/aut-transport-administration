import { useQuery } from '@tanstack/react-query';
import sitesClient from '../services/sites-client';

export const ALL_DRIVERS_KEY = 'ALL_DRIVERS';

const useGetAllDrivers = () => {
  return useQuery({
    queryKey: [ALL_DRIVERS_KEY],
    queryFn: () => sitesClient.getAllDrivers().then((res) => res.data),
  });
};

export default useGetAllDrivers;
