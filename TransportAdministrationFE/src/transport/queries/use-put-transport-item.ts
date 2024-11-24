import { useMutation, useQueryClient } from '@tanstack/react-query';
import transportClient from '../services/transport-client';
import { TRANSPORT_LIST_KEY } from './use-get-transport-list';
import { ROUTES } from '../../Routes';
import { useNavigate } from 'react-router-dom';

const usePutTransportItem = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: transportClient.putTransportItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [TRANSPORT_LIST_KEY] });
      navigate(ROUTES.TRANSPORTS());
    },
  });
};

export default usePutTransportItem;
