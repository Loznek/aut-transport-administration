import UserDataDto from './UserDataDto.ts';

interface LoginResponse {
  user: UserDataDto;
  token: string;
}

export default LoginResponse;
