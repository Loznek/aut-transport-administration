import { apiClient } from '../../core/services/api-client.ts';
import { AxiosPromise } from 'axios';
import PutTruckItemRequest from '../dto/PutTruckItemRequest.ts';
import TruckDto from '../../core/dto/TruckDto';

const getTruckList = (): AxiosPromise<TruckDto[]> => {
  return apiClient.private.get('/trucks');
};

const getTruckItem = (id: string): AxiosPromise<TruckDto> => {
  return apiClient.private.get(`/trucks/${id}`);
};

const putTruckItem = (body: PutTruckItemRequest): AxiosPromise<void> => {
  return apiClient.private.post(`/trucks`, body);
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
