import { AxiosPromise } from 'axios';
import { apiClient } from '../../core/services/api-client.ts';
import GetSitesResponse from '../dto/GetSitesResponse.ts';
import GetSiteResponse from '../dto/GetSiteResponse.ts';

const getSites = (): AxiosPromise<GetSitesResponse> => {
  return apiClient.private.get('/sites');
};

const getSite = (id: string): AxiosPromise<GetSiteResponse> => {
  return apiClient.private.get(`/sites/${id}`);
};

const sitesClient = {
  getSites,
  getSite,
};

export default sitesClient;
