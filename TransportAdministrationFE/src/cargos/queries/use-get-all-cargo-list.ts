import { useQuery } from '@tanstack/react-query';
import cargosClient from '../services/cargos-client.ts';

export const ALL_CARGO_LIST_KEY = 'ALL_CARGO_LIST';

const useGetCargoList = () => {
  return useQuery({
    queryKey: [ALL_CARGO_LIST_KEY],
    queryFn: () => cargosClient.getAllCargoList().then((res) => res.data),
  });
};

export default useGetCargoList;
