import { apiClient } from '../../core/services/api-client.ts';
import { AxiosPromise } from 'axios';
import DriverDto from '../../core/dto/DriverDto';

const getAllDriverList = (): AxiosPromise<DriverDto[]> => {
  return apiClient.private.get('/drivers/all-drivers');
};

const getDriverItem = (id: string): AxiosPromise<DriverDto> => {
  return apiClient.private.get(`/drivers/${id}`);
};

const putDriverItem = (body: DriverDto): AxiosPromise<void> => {
  return apiClient.private.post(`/drivers`, body);
};

const deleteDriverItem = (id: string): AxiosPromise<void> => {
  return apiClient.private.delete(`/drivers/${id}`);
};

const driversClient = {
  getAllDriverList,
  getDriverItem,
  putDriverItem,
  deleteDriverItem,
};

export default driversClient;
