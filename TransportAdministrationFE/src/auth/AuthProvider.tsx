import { PropsWithChildren, useCallback, useState } from 'react';
import AuthContext, { AuthContextData } from './AuthContext.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../Routes.ts';
import { useLocalStorage } from 'usehooks-ts';

const AUTH_TOKEN_STORAGE_KEY = 'authToken';

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authToken, setAuthToken, removeAuthToken] = useLocalStorage<AuthContextData['authToken']>(
    AUTH_TOKEN_STORAGE_KEY,
    null
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<AuthContextData['user']>(null);

  const logout = useCallback<AuthContextData['logout']>(() => {
    setUser(null);
    removeAuthToken();
    navigate(ROUTES.LOGIN());
  }, [navigate, removeAuthToken]);

  const setAuthData = useCallback<AuthContextData['setAuthData']>(
    ({ user, token }) => {
      setUser(user);
      setAuthToken(token);
      navigate(location.state?.returnPath ?? ROUTES.HOME());
    },
    [setAuthToken, navigate, location]
  );

  return <AuthContext.Provider value={{ user, logout, setAuthData, authToken }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
