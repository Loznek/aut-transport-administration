import TruckDto from '../../core/dto/TruckDto';

interface PutTruckItemRequest {
  truck: Omit<TruckDto, 'id'>;
  startSiteId: number;
}

export default PutTruckItemRequest;
