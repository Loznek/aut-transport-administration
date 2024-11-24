import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TRANSPORT_LIST_KEY } from './use-get-transport-list.ts';
import transportClient from '../services/transport-client.ts';

const useDeleteTransportItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: transportClient.deleteTransportItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [TRANSPORT_LIST_KEY] });
    },
  });
};

export default useDeleteTransportItem;
