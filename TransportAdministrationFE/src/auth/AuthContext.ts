import { createContext } from 'react';
import UserDataDto from './dto/UserDataDto.ts';

export interface AuthContextData {
  user?: UserDataDto | null;
  authToken: string | null;
  logout: () => void;
}

const defaultAuthContextData: AuthContextData = {
  user: null,
  authToken: null,
  logout: () => {},
};

const AuthContext = createContext<AuthContextData>(defaultAuthContextData);

export default AuthContext;
