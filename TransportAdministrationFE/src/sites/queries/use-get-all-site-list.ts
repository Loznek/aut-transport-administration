import { useQuery } from '@tanstack/react-query';
import sitesClient from '../services/sites-client.ts';

export const ALL_SITE_LIST_KEY = 'ALL_SITE_LIST';

const useGetSiteList = () => {
  return useQuery({
    queryKey: [ALL_SITE_LIST_KEY],
    queryFn: () => sitesClient.getAllSiteList().then((res) => res.data),
  });
};

export default useGetSiteList;
