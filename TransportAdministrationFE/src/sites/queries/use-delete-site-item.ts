import { useMutation, useQueryClient } from '@tanstack/react-query';
import sitesClient from '../services/sites-client.ts';
import { SITE_LIST_KEY } from './use-get-site-list.ts';

const useDeleteSiteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sitesClient.deleteSiteItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SITE_LIST_KEY] });
    },
  });
};

export default useDeleteSiteItem;
