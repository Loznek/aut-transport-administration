import { createContext } from 'react';
import UserDataDto from './dto/UserDataDto.ts';
import LoginResponse from './dto/LoginResponse.ts';

export interface AuthContextData {
  user: UserDataDto | null;
  authToken: string | null;
  logout: () => void;
  setAuthData: (authData: LoginResponse) => void;
}

const defaultAuthContextData: AuthContextData = {
  user: null,
  authToken: null,
  logout: () => {},
  setAuthData: () => {},
};

const AuthContext = createContext<AuthContextData>(defaultAuthContextData);

export default AuthContext;
