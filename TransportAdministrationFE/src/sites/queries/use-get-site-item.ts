import { useQuery } from '@tanstack/react-query';
import sitesClient from '../services/sites-client.ts';
import useIdParam from '../../core/hooks/use-id-param.ts';

export const SITE_ITEM_KEY = 'SITE_ITEM';

const useGetSiteItem = () => {
  const idParam = useIdParam();

  return useQuery({
    queryKey: [SITE_ITEM_KEY, idParam],
    queryFn: () => sitesClient.getSiteItem(idParam).then((res) => res.data),
    enabled: !!idParam && idParam !== 'new',
  });
};

export default useGetSiteItem;
