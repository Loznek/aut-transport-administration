import { AxiosPromise } from 'axios';
import { apiClient } from '../../core/services/api-client.ts';
import LoginResponse from '../dto/LoginResponse.ts';
import LoginRequest from '../dto/LoginRequest.ts';

const login = (body: LoginRequest): AxiosPromise<LoginResponse> => {
  return apiClient.private.post('/login', body);
};

const authClient = {
  login,
};

export default authClient;
