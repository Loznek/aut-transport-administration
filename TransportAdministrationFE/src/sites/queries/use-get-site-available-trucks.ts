import { useMutation } from '@tanstack/react-query';
import sitesClient from '../services/sites-client';

const useGetSiteAvailableTrucks = () => {
  return useMutation({
    mutationFn: (id: number) => sitesClient.getSiteAvailableTrucks(id).then((res) => res.data),
  });
};

export default useGetSiteAvailableTrucks;
