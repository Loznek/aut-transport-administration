import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TRUCK_LIST_KEY } from './use-get-truck-list.ts';
import { ALL_TRUCK_LIST_KEY } from './use-get-all-truck-list';
import trucksClient from '../services/trucks-client.ts';

const useDeleteTruckItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: trucksClient.deleteTruckItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [TRUCK_LIST_KEY] });
      await queryClient.invalidateQueries({ queryKey: [ALL_TRUCK_LIST_KEY] });
    },
  });
};

export default useDeleteTruckItem;
