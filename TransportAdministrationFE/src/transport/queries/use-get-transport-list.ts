import { useQuery } from '@tanstack/react-query';
import transportClient from '../services/transport-client.ts';

export const TRANSPORT_LIST_KEY = 'TRANSPORT_LIST';

const useGetTransportList = () => {
  return useQuery({
    queryKey: [TRANSPORT_LIST_KEY],
    queryFn: () => transportClient.getTransportList().then((res) => res.data),
  });
};

export default useGetTransportList;
