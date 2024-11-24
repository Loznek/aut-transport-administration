import { useMutation, useQueryClient } from '@tanstack/react-query';
import sitesClient from '../services/sites-client.ts';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Routes.ts';
import { SITE_LIST_KEY } from './use-get-site-list.ts';

const usePutSiteItem = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sitesClient.putSiteItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SITE_LIST_KEY] });
      await queryClient.invalidateQueries({ queryKey: [SITE_LIST_KEY] });
      navigate(ROUTES.SITES());
    },
  });
};

export default usePutSiteItem;
