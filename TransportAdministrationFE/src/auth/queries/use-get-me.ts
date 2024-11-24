import { useQuery } from '@tanstack/react-query';
import authClient from '../services/auth-client';
import useAuth from '../useAuth';

export const ME_KEY = 'ME';

const useGetMe = () => {
  const auth = useAuth();

  return useQuery({
    queryKey: [ME_KEY],
    queryFn: () => authClient.getMe().then((res) => res.data),
    enabled: !!auth.authToken,
  });
};

export default useGetMe;
