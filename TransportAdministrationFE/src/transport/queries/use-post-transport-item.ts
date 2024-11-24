import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Routes.ts';
import { TRANSPORT_LIST_KEY } from './use-get-transport-list.ts';
import transportClient from '../services/transport-client.ts';

const usePostTransportItem = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: transportClient.postTransportItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [TRANSPORT_LIST_KEY] });
      navigate(ROUTES.TRANSPORTS());
    },
  });
};

export default usePostTransportItem;
