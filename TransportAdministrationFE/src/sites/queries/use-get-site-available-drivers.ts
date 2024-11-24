import { useMutation } from '@tanstack/react-query';
import sitesClient from '../services/sites-client';

const useGetSiteAvailableDrivers = () => {
  return useMutation({
    mutationFn: (id: number) => sitesClient.getSiteAvailableDrivers(id).then((res) => res.data),
  });
};

export default useGetSiteAvailableDrivers;
