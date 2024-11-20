import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CARGO_LIST_KEY } from './use-get-cargo-list.ts';
import cargosClient from '../services/cargos-client.ts';

const useDeleteCargoItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cargosClient.deleteCargoItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [CARGO_LIST_KEY] });
    },
  });
};

export default useDeleteCargoItem;
