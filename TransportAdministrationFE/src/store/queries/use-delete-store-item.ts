import { useMutation, useQueryClient } from '@tanstack/react-query';
import storesClient from '../services/stores-client.ts';
import { STORE_LIST_KEY } from './use-get-store-list.ts';
import { ALL_STORE_LIST_KEY } from './use-get-all-store-list';

const useDeleteStoreItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: storesClient.deleteStoreItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [STORE_LIST_KEY] });
      await queryClient.invalidateQueries({ queryKey: [ALL_STORE_LIST_KEY] });
    },
  });
};

export default useDeleteStoreItem;
