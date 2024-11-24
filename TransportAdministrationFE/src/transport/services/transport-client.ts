import { apiClient } from '../../core/services/api-client.ts';
import { AxiosPromise } from 'axios';
import PostTransportItemRequest from '../dto/PostTransportItemRequest.ts';
import CalculateTravelTimeRequest from '../dto/CalculateTravelTimeRequest';
import CalculateTravelTimeResponse from '../dto/CalculateTravelTimeResponse';
import TransportCreationDto from '../dto/TransportCreationDto';
import TransportDto from '../../core/dto/TransportDto';

const getTransportList = (): AxiosPromise<TransportDto[]> => {
  return apiClient.private.get('/transport/all-transports');
};

const getTransportItem = (id: string): AxiosPromise<TransportCreationDto> => {
  return apiClient.private.get(`/transport/${id}`);
};

const postTransportItem = (body: PostTransportItemRequest): AxiosPromise<void> => {
  return apiClient.private.post(`/transport`, body);
};

const putTransportItem = ({ id, body }: { id: string; body: TransportCreationDto }): AxiosPromise<void> => {
  return apiClient.private.put(`/transport/${id}`, body);
};

const deleteTransportItem = (id: string): AxiosPromise<void> => {
  return apiClient.private.delete(`/transport/${id}`);
};

const calculateTravelTime = (body: CalculateTravelTimeRequest): AxiosPromise<CalculateTravelTimeResponse> => {
  return apiClient.private.post('/calculate-travel-time', body);
};

const transportClient = {
  getTransportList,
  getTransportItem,
  postTransportItem,
  deleteTransportItem,
  calculateTravelTime,
  putTransportItem,
};

export default transportClient;
