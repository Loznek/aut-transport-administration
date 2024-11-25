import { useQuery } from '@tanstack/react-query';
import driversClient from '../services/drivers-client.ts';

export const ALL_DRIVER_LIST_KEY = 'ALL_DRIVER_LIST';

const useGetDriverList = () => {
  return useQuery({
    queryKey: [ALL_DRIVER_LIST_KEY],
    queryFn: () => driversClient.getAllDriverList().then((res) => res.data),
  });
};

export default useGetDriverList;
