import { useContext } from 'react';
import AuthContext from './AuthContext.ts';

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
