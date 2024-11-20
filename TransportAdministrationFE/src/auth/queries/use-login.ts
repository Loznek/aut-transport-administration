import { useMutation } from '@tanstack/react-query';
import authClient from '../services/auth-client.ts';
import useAuth from '../useAuth.ts';

const useLogin = () => {
  const { setAuthData } = useAuth();
  return useMutation({
    mutationFn: authClient.login,
    onSuccess: ({ data }) => {
      setAuthData(data);
    },
  });
};

export default useLogin;
