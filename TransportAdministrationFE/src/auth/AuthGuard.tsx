import useAuth from './useAuth.ts';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../Routes.ts';

const AuthGuard = () => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to={ROUTES.LOGIN()} state={{ returnPath: location.pathname }} />;
  }

  return <Outlet />;
};

export default AuthGuard;
