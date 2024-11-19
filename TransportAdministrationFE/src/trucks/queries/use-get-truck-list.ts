import { useQuery } from '@tanstack/react-query';
import trucksClient from '../services/trucks-client.ts';

export const TRUCK_LIST_KEY = 'TRUCK_LIST';

const useGetTruckList = () => {
  return useQuery({
    queryKey: [TRUCK_LIST_KEY],
    queryFn: () => trucksClient.getTruckList().then((res) => res.data),
  });
};

export default useGetTruckList;
