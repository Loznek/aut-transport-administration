import useIdParam from '../../core/hooks/use-id-param.ts';
import { useQuery } from '@tanstack/react-query';
import trucksClient from '../services/trucks-client.ts';

export const TRUCK_ITEM_KEY = 'TRUCK_ITEM';

const useGetTruckItem = () => {
  const idParam = useIdParam();

  return useQuery({
    queryKey: [TRUCK_ITEM_KEY, idParam],
    queryFn: () => trucksClient.getTruckItem(idParam).then((res) => res.data),
    enabled: !!idParam && idParam != 'new',
    gcTime: 0,
  });
};

export default useGetTruckItem;
