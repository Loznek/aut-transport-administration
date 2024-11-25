import { useMutation, useQueryClient } from '@tanstack/react-query';
import storesClient from '../services/stores-client.ts';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Routes.ts';
import { STORE_LIST_KEY } from './use-get-store-list.ts';
import { ALL_STORE_LIST_KEY } from './use-get-all-store-list';

const usePutStoreItem = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: storesClient.putStoreItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [STORE_LIST_KEY] });
      await queryClient.invalidateQueries({ queryKey: [ALL_STORE_LIST_KEY] });
      navigate(ROUTES.STORES());
    },
  });
};

export default usePutStoreItem;
