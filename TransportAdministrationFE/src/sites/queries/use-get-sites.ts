import { useQuery } from '@tanstack/react-query';
import sitesClient from '../services/sites-client.ts';

export const SITES_KEY = 'SITES';

const useGetSites = () => {
  return useQuery({
    queryKey: [SITES_KEY],
    queryFn: () => sitesClient.getSites().then((res) => res.data),
  });
};

export default useGetSites;
