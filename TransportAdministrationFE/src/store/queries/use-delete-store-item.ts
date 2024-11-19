import { useMutation, useQueryClient } from '@tanstack/react-query';
import storesClient from '../services/stores-client.ts';
import { STORE_LIST_KEY } from './use-get-store-list.ts';

const useDeleteStoreItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: storesClient.deleteStoreItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [STORE_LIST_KEY] });
    },
  });
};

export default useDeleteStoreItem;
