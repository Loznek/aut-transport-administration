import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Routes.ts';
import { TRUCK_LIST_KEY } from './use-get-truck-list.ts';
import trucksClient from '../services/trucks-client.ts';

const usePutTruckItem = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: trucksClient.putTruckItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [TRUCK_LIST_KEY] });
      navigate(ROUTES.TRUCKS());
    },
  });
};

export default usePutTruckItem;
