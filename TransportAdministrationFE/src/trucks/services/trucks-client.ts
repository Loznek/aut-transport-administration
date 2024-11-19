import { apiClient } from '../../core/services/api-client.ts';
import { AxiosPromise } from 'axios';
import GetTruckListResponse from '../dto/GetTruckListResponse.ts';
import GetTruckItemResponse from '../dto/GetTruckItemResponse.ts';
import PutTruckItemRequest from '../dto/PutTruckItemRequest.ts';

const getTruckList = (): AxiosPromise<GetTruckListResponse> => {
  return apiClient.private.get('/trucks');
};

const getTruckItem = (id: string): AxiosPromise<GetTruckItemResponse> => {
  return apiClient.private.get(`/trucks/${id}`);
};

const putTruckItem = (body: PutTruckItemRequest): AxiosPromise<void> => {
  return apiClient.private.put(`/trucks/${body.truck.id}`, body);
};

const deleteTruckItem = (id: string): AxiosPromise<void> => {
  return apiClient.private.delete(`/trucks/${id}`);
};

const trucksClient = {
  getTruckList,
  getTruckItem,
  putTruckItem,
  deleteTruckItem,
};

export default trucksClient;
