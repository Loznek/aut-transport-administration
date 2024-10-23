import { PropsWithChildren, useCallback, useState } from 'react';
import AuthContext, { AuthContextData } from './AuthContext.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../Routes.ts';

const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<AuthContextData['user']>(null);

  const logout = useCallback<AuthContextData['logout']>(() => {
    setUser(null);
    navigate(ROUTES.LOGIN());
  }, [navigate]);

  const login = useCallback<AuthContextData['login']>(
    (data) => {
      setUser({ name: data.username });
      navigate(location.state?.returnPath ?? ROUTES.HOME());
    },
    [navigate, location]
  );

  return <AuthContext.Provider value={{ user, logout, login }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
