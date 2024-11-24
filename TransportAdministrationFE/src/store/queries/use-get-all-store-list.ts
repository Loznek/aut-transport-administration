import { useQuery } from '@tanstack/react-query';
import storesClient from '../services/stores-client.ts';

export const ALL_STORE_LIST_KEY = 'ALL_STORE_LIST';

const useGetAllStoreList = () => {
  return useQuery({
    queryKey: [ALL_STORE_LIST_KEY],
    queryFn: () => storesClient.getAllStoreList().then((res) => res.data),
  });
};

export default useGetAllStoreList;
