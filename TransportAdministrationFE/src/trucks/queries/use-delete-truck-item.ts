import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TRUCK_LIST_KEY } from './use-get-truck-list.ts';
import trucksClient from '../services/trucks-client.ts';

const useDeleteTruckItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: trucksClient.deleteTruckItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [TRUCK_LIST_KEY] });
    },
  });
};

export default useDeleteTruckItem;
