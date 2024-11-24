import { AxiosPromise } from 'axios';
import { apiClient } from '../../core/services/api-client.ts';
import PutStoreItemRequest from '../dto/PutStoreItemRequest.ts';
import StoreDto from '../../core/dto/StoreDto';

const getStoreList = (): AxiosPromise<StoreDto[]> => {
  return apiClient.private.get('/stores');
};

const getStoreItem = (id: string): AxiosPromise<StoreDto> => {
  return apiClient.private.get(`/stores/${id}`);
};

const putStoreItem = (body: PutStoreItemRequest): AxiosPromise<void> => {
  return apiClient.private.post(`/stores`, body);
};

const deleteStoreItem = (id: string): AxiosPromise<void> => {
  return apiClient.private.delete(`/stores/${id}`);
};

const storesClient = {
  getStoreList,
  getStoreItem,
  putStoreItem,
  deleteStoreItem,
};

export default storesClient;
