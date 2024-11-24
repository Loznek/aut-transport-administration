import { AxiosPromise } from 'axios';
import { apiClient } from '../../core/services/api-client.ts';
import LoginResponse from '../dto/LoginResponse.ts';
import LoginRequest from '../dto/LoginRequest.ts';
import UserDataDto from '../dto/UserDataDto';

const login = (body: LoginRequest): AxiosPromise<LoginResponse> => {
  return apiClient.private.post('/login', body);
};

const getMe = (): AxiosPromise<UserDataDto> => {
  return apiClient.private.get('/me');
};

const authClient = {
  login,
  getMe,
};

export default authClient;
