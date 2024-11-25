import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ALL_DRIVER_LIST_KEY } from './use-get-all-driver-list';
import driversClient from '../services/drivers-client.ts';

const useDeleteDriverItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: driversClient.deleteDriverItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [ALL_DRIVER_LIST_KEY] });
    },
  });
};

export default useDeleteDriverItem;
