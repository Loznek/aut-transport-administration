import { useMutation, useQueryClient } from '@tanstack/react-query';
import authClient from '../services/auth-client.ts';
import { ROUTES } from '../../Routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { ME_KEY } from './use-get-me';
import useAuthToken from '../hooks/use-auth-token';

const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { setAuthToken } = useAuthToken();

  return useMutation({
    mutationFn: authClient.login,
    onSuccess: ({ data }) => {
      setAuthToken(data.token);
      queryClient.setQueryData([ME_KEY], () => data.user);
      navigate(location.state?.returnPath ?? ROUTES.HOME());
    },
  });
};

export default useLogin;
