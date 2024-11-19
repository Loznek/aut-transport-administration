import { AxiosPromise } from 'axios';
import { apiClient } from '../../core/services/api-client.ts';
import GetSiteListResponse from '../dto/GetSiteListResponse.ts';
import GetSiteItemResponse from '../dto/GetSiteItemResponse.ts';
import PutSiteItemRequest from '../dto/PutSiteItemRequest.ts';

const getSiteList = (): AxiosPromise<GetSiteListResponse> => {
  return apiClient.private.get('/sites');
};

const getSiteItem = (id: string): AxiosPromise<GetSiteItemResponse> => {
  return apiClient.private.get(`/sites/${id}`);
};

const putSiteItem = (body: PutSiteItemRequest): AxiosPromise<void> => {
  return apiClient.private.put(`/sites/${body.site.id}`, body);
};

const deleteSiteItem = (id: string): AxiosPromise<void> => {
  return apiClient.private.delete(`/sites/${id}`);
};

const sitesClient = {
  getSiteList,
  getSiteItem,
  putSiteItem,
  deleteSiteItem,
};

export default sitesClient;
