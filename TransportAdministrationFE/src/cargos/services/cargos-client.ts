import { apiClient } from '../../core/services/api-client.ts';
import { AxiosPromise } from 'axios';
import PutCargoItemRequest from '../dto/PutCargoItemRequest.ts';
import CargoDto from '../../core/dto/CargoDto';

const getCargoList = (): AxiosPromise<CargoDto[]> => {
  return apiClient.private.get('/cargos');
};

const getCargoItem = (id: string): AxiosPromise<CargoDto> => {
  return apiClient.private.get(`/cargos/${id}`);
};

const putCargoItem = (body: PutCargoItemRequest): AxiosPromise<void> => {
  return apiClient.private.post('/cargos', body);
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
