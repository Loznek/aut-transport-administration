import { apiClient } from '../../core/services/api-client.ts';
import { AxiosPromise } from 'axios';
import TruckDto from '../../core/dto/TruckDto';
import PutTruckItemRequest from '../dto/PutTruckItemRequest';

const getTruckList = (): AxiosPromise<TruckDto[]> => {
  return apiClient.private.get('/trucks/active-trucks');
};

const getAllTruckList = (): AxiosPromise<TruckDto[]> => {
  return apiClient.private.get('/trucks/all-trucks');
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
  getAllTruckList,
  getTruckItem,
  putTruckItem,
  deleteTruckItem,
};

export default trucksClient;
