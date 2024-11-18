import { useQuery } from '@tanstack/react-query';
import sitesClient from '../services/sites-client.ts';

export const SITE_KEY = 'SITE';

const useGetSite = (id: string) => {
  return useQuery({
    queryKey: [SITE_KEY, id],
    queryFn: () => sitesClient.getSite(id).then((res) => res.data),
    enabled: id !== 'new',
  });
};

export default useGetSite;
