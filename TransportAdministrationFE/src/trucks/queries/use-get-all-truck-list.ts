import { useQuery } from '@tanstack/react-query';
import trucksClient from '../services/trucks-client.ts';

export const ALL_TRUCK_LIST_KEY = 'ALL_TRUCK_LIST';

const useGetTruckList = () => {
  return useQuery({
    queryKey: [ALL_TRUCK_LIST_KEY],
    queryFn: () => trucksClient.getAllTruckList().then((res) => res.data),
  });
};

export default useGetTruckList;
