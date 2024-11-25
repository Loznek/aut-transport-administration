import { PropsWithChildren, useCallback } from 'react';
import AuthContext, { AuthContextData } from './AuthContext.ts';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../Routes.ts';
import useGetMe from './queries/use-get-me';
import { useQueryClient } from '@tanstack/react-query';
import useAuthToken from './hooks/use-auth-token';
import AuthTokenInterceptorSetter from './AuthTokenInterceptorSetter';

const AuthProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const { authToken, removeAuthToken } = useAuthToken();
  const { data: user } = useGetMe();
  const navigate = useNavigate();

  const logout = useCallback<AuthContextData['logout']>(() => {
    removeAuthToken();
    queryClient.clear();
    navigate(ROUTES.LOGIN());
  }, [navigate, queryClient, removeAuthToken]);

  return (
    <AuthContext.Provider
      value={{
        user: user?.data,
        logout,
        authToken: authToken,
      }}
    >
      <AuthTokenInterceptorSetter>{children}</AuthTokenInterceptorSetter>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
