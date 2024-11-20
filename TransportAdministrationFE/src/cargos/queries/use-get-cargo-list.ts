import { useQuery } from '@tanstack/react-query';
import cargosClient from '../services/cargos-client.ts';

export const CARGO_LIST_KEY = 'CARGO_LIST';

const useGetCargoList = () => {
  return useQuery({
    queryKey: [CARGO_LIST_KEY],
    queryFn: () => cargosClient.getCargoList().then((res) => res.data),
  });
};

export default useGetCargoList;
