import TruckCreationDto from './TruckCreationDto';

interface PutTruckItemRequest {
  truck: TruckCreationDto;
  startSiteId: number;
}

export default PutTruckItemRequest;
