import { useQuery } from '@tanstack/react-query';
import storesClient from '../services/stores-client.ts';

export const STORE_LIST_KEY = 'STORE_LIST';

const useGetStoreList = () => {
  return useQuery({
    queryKey: [STORE_LIST_KEY],
    queryFn: () => storesClient.getStoreList().then((res) => res.data),
  });
};

export default useGetStoreList;
