import { AxiosPromise } from 'axios';
import { apiClient } from '../../core/services/api-client.ts';
import GetStoreListResponse from '../dto/GetStoreListResponse.ts';
import GetStoreItemResponse from '../dto/GetStoreItemResponse.ts';
import PutStoreItemRequest from '../dto/PutStoreItemRequest.ts';

const getStoreList = (): AxiosPromise<GetStoreListResponse> => {
  return apiClient.private.get('/stores');
};

const getStoreItem = (id: string): AxiosPromise<GetStoreItemResponse> => {
  return apiClient.private.get(`/stores/${id}`);
};

const putStoreItem = (body: PutStoreItemRequest): AxiosPromise<void> => {
  return apiClient.private.put(`/stores/${body.store.id}`, body);
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
