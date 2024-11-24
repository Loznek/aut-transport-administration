import { useQuery } from '@tanstack/react-query';
import storesClient from '../services/stores-client.ts';
import useIdParam from '../../core/hooks/use-id-param.ts';

export const STORE_ITEM_KEY = 'STORE_ITEM';

const useGetStoreItem = () => {
  const idParam = useIdParam();

  return useQuery({
    queryKey: [STORE_ITEM_KEY, idParam],
    queryFn: () => storesClient.getStoreItem(idParam!).then((res) => res.data),
    enabled: !!idParam && idParam !== 'new',
  });
};

export default useGetStoreItem;
