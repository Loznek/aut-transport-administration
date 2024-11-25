import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Routes.ts';
import driversClient from '../services/drivers-client.ts';
import { ALL_DRIVER_LIST_KEY } from './use-get-all-driver-list.ts';

const usePutDriverItem = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: driversClient.putDriverItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [ALL_DRIVER_LIST_KEY] });
      navigate(ROUTES.DRIVERS());
    },
  });
};

export default usePutDriverItem;
