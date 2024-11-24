import { useLocalStorage } from 'usehooks-ts';
import { AuthContextData } from '../AuthContext';
import { Dispatch } from 'react';

export const AUTH_TOKEN_STORAGE_KEY = 'authToken';

interface UseAuthTokenReturn {
  authToken: string | null;
  setAuthToken: Dispatch<string>;
  removeAuthToken: () => void;
}

const useAuthToken = (): UseAuthTokenReturn => {
  const [authToken, setAuthToken, removeAuthToken] = useLocalStorage<AuthContextData['authToken']>(
    AUTH_TOKEN_STORAGE_KEY,
    null
  );

  return {
    authToken,
    setAuthToken,
    removeAuthToken,
  };
};

export default useAuthToken;
