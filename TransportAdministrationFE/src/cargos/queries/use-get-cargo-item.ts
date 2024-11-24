import useIdParam from '../../core/hooks/use-id-param.ts';
import { useQuery } from '@tanstack/react-query';
import cargosClient from '../services/cargos-client.ts';

export const CARGO_ITEM_KEY = 'CARGO_ITEM';

const useGetCargoItem = () => {
  const idParam = useIdParam();

  return useQuery({
    queryKey: [CARGO_ITEM_KEY, idParam],
    queryFn: () => cargosClient.getCargoItem(idParam!).then((res) => res.data),
    enabled: !!idParam && idParam != 'new',
    gcTime: 0,
  });
};

export default useGetCargoItem;
