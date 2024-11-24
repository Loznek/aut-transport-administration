import useAuth from './useAuth.ts';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../Routes.ts';
import UseGetMe from './queries/use-get-me';
import LoadingSection from '../components/loading-section/LoadingSection';

const AuthGuard = () => {
  const auth = useAuth();
  const location = useLocation();
  const { isLoading } = UseGetMe();

  if (!auth.user && !auth.authToken) {
    return <Navigate to={ROUTES.LOGIN()} state={{ returnPath: location.pathname }} />;
  }

  if (isLoading) {
    return <LoadingSection />;
  }

  return <Outlet />;
};

export default AuthGuard;
