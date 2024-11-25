import useAuth from '../useAuth';
import UserType from '../dto/UserType';

const useIsAdmin = () => {
  const { user } = useAuth();

  return user?.type === UserType.ADMINISTRATOR;
};

export default useIsAdmin;
