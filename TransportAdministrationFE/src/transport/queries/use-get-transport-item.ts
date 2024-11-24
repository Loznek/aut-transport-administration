import useIdParam from '../../core/hooks/use-id-param.ts';
import { useQuery } from '@tanstack/react-query';
import transportClient from '../services/transport-client.ts';

export const TRANSPORT_ITEM_KEY = 'TRANSPORT_ITEM';

const useGetTransportItem = () => {
  const idParam = useIdParam();

  return useQuery({
    queryKey: [TRANSPORT_ITEM_KEY, idParam],
    queryFn: () => transportClient.getTransportItem(idParam || '').then((res) => res.data),
    enabled: !!idParam && idParam != 'new',
    gcTime: 0,
  });
};

export default useGetTransportItem;
