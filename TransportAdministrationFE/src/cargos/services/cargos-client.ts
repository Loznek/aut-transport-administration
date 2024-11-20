import { apiClient } from '../../core/services/api-client.ts';
import { AxiosPromise } from 'axios';
import GetCargoListResponse from '../dto/GetCargoListResponse.ts';
import GetCargoItemResponse from '../dto/GetCargoItemResponse.ts';
import PutCargoItemRequest from '../dto/PutCargoItemRequest.ts';

const getCargoList = (): AxiosPromise<GetCargoListResponse> => {
  return apiClient.private.get('/cargos');
};

const getCargoItem = (id: string): AxiosPromise<GetCargoItemResponse> => {
  return apiClient.private.get(`/cargos/${id}`);
};

const putCargoItem = (body: PutCargoItemRequest): AxiosPromise<void> => {
  return apiClient.private.put(`/cargos/${body.cargo.id}`, body);
};

const deleteCargoItem = (id: string): AxiosPromise<void> => {
  return apiClient.private.delete(`/cargos/${id}`);
};

const cargosClient = {
  getCargoList,
  getCargoItem,
  putCargoItem,
  deleteCargoItem,
};

export default cargosClient;
