import { createContext } from 'react';
import { LoginFormModel } from './login/LoginForm.schema.ts';

export interface UserData {
  name: string;
}

export interface AuthContextData {
  user: UserData | null;
  logout: () => void;
  login: (data: LoginFormModel) => void;
}

const defaultAuthContextData: AuthContextData = {
  user: null,
  logout: () => {},
  login: () => {},
};

const AuthContext = createContext<AuthContextData>(defaultAuthContextData);

export default AuthContext;
