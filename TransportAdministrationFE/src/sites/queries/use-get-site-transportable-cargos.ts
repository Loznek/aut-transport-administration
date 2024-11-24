import { useMutation } from '@tanstack/react-query';
import sitesClient from '../services/sites-client';

const useGetSiteTransportableCargos = () => {
  return useMutation({
    mutationFn: (id: number) => sitesClient.getSiteTransportableCargos(id).then((res) => res.data),
  });
};

export default useGetSiteTransportableCargos;
