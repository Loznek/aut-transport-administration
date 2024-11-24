import { useQuery } from '@tanstack/react-query';
import sitesClient from '../services/sites-client.ts';

export const SITE_LIST_KEY = 'SITE_LIST';

const useGetSiteList = () => {
  return useQuery({
    queryKey: [SITE_LIST_KEY],
    queryFn: () => sitesClient.getSiteList().then((res) => res.data),
  });
};

export default useGetSiteList;
