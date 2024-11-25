import useIdParam from '../../core/hooks/use-id-param.ts';
import { useQuery } from '@tanstack/react-query';
import driversClient from '../services/drivers-client.ts';

export const DRIVER_ITEM_KEY = 'DRIVER_ITEM';

const useGetDriverItem = () => {
  const idParam = useIdParam();

  return useQuery({
    queryKey: [DRIVER_ITEM_KEY, idParam],
    queryFn: () => driversClient.getDriverItem(idParam!).then((res) => res.data),
    enabled: !!idParam && idParam != 'new',
    gcTime: 0,
  });
};

export default useGetDriverItem;
