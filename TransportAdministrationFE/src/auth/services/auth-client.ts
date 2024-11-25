import LoginResponse from '../dto/LoginResponse.ts';
import LoginRequest from '../dto/LoginRequest.ts';
import UserDataDto from '../dto/UserDataDto';
import { apiClient } from '../../core/services/api-client';
import { AxiosPromise } from 'axios';

const login = (body: LoginRequest): AxiosPromise<LoginResponse> => {
  return apiClient.private.post('/login', body);
};

/*const loginMock = (body: LoginRequest): Promise<LoginResponse> =>
  new Promise((resolve) => {
    return resolve({
      token: 'mockAdminToken',
      user: {
        name: 'Administrator',
        type: UserType.ADMINISTRATOR,
      },
    });
  });*/

const getMe = (): AxiosPromise<UserDataDto> => {
  return apiClient.private.get('/me');
};

/*const getMeMock = (): Promise<UserDataDto> =>
  new Promise((resolve) => {
    return resolve({
      name: 'Administrator',
      type: UserType.ADMINISTRATOR,
    });
  });*/

const authClient = {
  login,
  getMe,
};

export default authClient;
