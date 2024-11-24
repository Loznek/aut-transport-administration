import { useMutation, useQueryClient } from '@tanstack/react-query';
import cargosClient from '../services/cargos-client.ts';
import { CARGO_LIST_KEY } from './use-get-cargo-list';
import { ALL_CARGO_LIST_KEY } from './use-get-all-cargo-list';

const useDeleteCargoItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cargosClient.deleteCargoItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [CARGO_LIST_KEY] });
      await queryClient.invalidateQueries({ queryKey: [ALL_CARGO_LIST_KEY] });
    },
  });
};

export default useDeleteCargoItem;
