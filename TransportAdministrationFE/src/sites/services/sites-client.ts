import { AxiosPromise } from 'axios';
import { apiClient } from '../../core/services/api-client.ts';
import CargoWithArrivalTimeDto from '../../core/dto/CargoWithArrivalTimeDto';
import TruckWithArrivalTimeDto from '../../core/dto/TruckWithArrivalTimeDto';
import DriverWithArrivalTimeDto from '../../core/dto/DriverWithArrivalTimeDto';
import SiteDto from '../../core/dto/SiteDto';
import DriverDto from '../../core/dto/DriverDto';

const getSiteList = (): AxiosPromise<SiteDto[]> => {
  return apiClient.private.get('/sites/active-sites');
};

const getAllSiteList = (): AxiosPromise<SiteDto[]> => {
  return apiClient.private.get('/sites/all-sites');
};

const getSiteItem = (id: string): AxiosPromise<SiteDto> => {
  return apiClient.private.get(`/sites/${id}`);
};

const putSiteItem = (body: Omit<SiteDto, 'id'>): AxiosPromise<void> => {
  return apiClient.private.post(`/sites`, body);
};

const deleteSiteItem = (id: string): AxiosPromise<void> => {
  return apiClient.private.delete(`/sites/${id}`);
};

const getSiteTransportableCargos = (id: number): AxiosPromise<CargoWithArrivalTimeDto[]> => {
  return apiClient.private.get(`/sites/transportable-cargo/${id}`);
};

const getSiteAvailableTrucks = (id: number): AxiosPromise<TruckWithArrivalTimeDto[]> => {
  return apiClient.private.get(`/sites/available-trucks/${id}`);
};

const getSiteAvailableDrivers = (id: number): AxiosPromise<DriverWithArrivalTimeDto[]> => {
  return apiClient.private.get(`/sites/available-drivers/${id}`);
};

const getAllDrivers = (): AxiosPromise<DriverDto[]> => {
  return apiClient.private.get('/drivers/all-drivers');
};

const sitesClient = {
  getSiteList,
  getAllSiteList,
  getSiteItem,
  putSiteItem,
  deleteSiteItem,
  getSiteAvailableTrucks,
  getSiteTransportableCargos,
  getSiteAvailableDrivers,
  getAllDrivers,
};

export default sitesClient;
