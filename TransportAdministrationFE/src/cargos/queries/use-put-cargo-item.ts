import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Routes.ts';
import { CARGO_LIST_KEY } from './use-get-cargo-list.ts';
import { ALL_CARGO_LIST_KEY } from './use-get-all-cargo-list';
import cargosClient from '../services/cargos-client.ts';

const usePutCargoItem = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cargosClient.putCargoItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [CARGO_LIST_KEY] });
      await queryClient.invalidateQueries({ queryKey: [ALL_CARGO_LIST_KEY] });
      navigate(ROUTES.CARGOS());
    },
  });
};

export default usePutCargoItem;
