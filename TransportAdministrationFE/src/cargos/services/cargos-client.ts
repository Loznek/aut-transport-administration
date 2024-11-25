import { apiClient } from '../../core/services/api-client.ts';
import { AxiosPromise } from 'axios';
import CargoDto from '../../core/dto/CargoDto';
import CargoCreationDto from '../dto/CargoCreationDto';

const getCargoList = (): AxiosPromise<CargoDto[]> => {
  return apiClient.private.get('/cargos/active-cargos');
};

const getAllCargoList = (): AxiosPromise<CargoDto[]> => {
  return apiClient.private.get('/cargos/all-cargos');
};

const getCargoItem = (id: string): AxiosPromise<CargoDto> => {
  return apiClient.private.get(`/cargos/${id}`);
};

const putCargoItem = (body: CargoCreationDto): AxiosPromise<void> => {
  return apiClient.private.post('/cargos', body);
};

const deleteCargoItem = (id: string): AxiosPromise<void> => {
  return apiClient.private.delete(`/cargos/${id}`);
};

const cargosClient = {
  getCargoList,
  getAllCargoList,
  getCargoItem,
  putCargoItem,
  deleteCargoItem,
};

export default cargosClient;
