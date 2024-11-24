import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import LoadingSection from '../components/loading-section/LoadingSection';
import { InternalAxiosRequestConfig } from 'axios';
import { apiClient } from '../core/services/api-client';
import { AUTH_TOKEN_STORAGE_KEY } from './hooks/use-auth-token';

const AuthTokenInterceptorSetter = ({ children }: PropsWithChildren) => {
  const [isInterceptorAdded, setIsInterceptorAdded] = useState(false);

  const authTokenInterceptor = useCallback(async (config: InternalAxiosRequestConfig) => {
    const authToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    if (authToken) {
      config.headers.set('authorization', `Bearer ${authToken}`);
    }

    return config;
  }, []);

  useEffect(() => {
    const addedInterceptorId = apiClient.private.interceptors.request.use(authTokenInterceptor);
    setIsInterceptorAdded(true);
    return () => {
      apiClient.private.interceptors.request.eject(addedInterceptorId);
    };
  }, [authTokenInterceptor]);

  if (isInterceptorAdded) {
    return children;
  }

  return <LoadingSection />;
};

export default AuthTokenInterceptorSetter;
