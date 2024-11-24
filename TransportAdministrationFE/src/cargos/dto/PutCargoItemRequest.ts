import CreateCargoDto from './CreateCargoDto';

interface PutCargoItemRequest {
  cargo: CreateCargoDto;
  startSiteId: number;
}

export default PutCargoItemRequest;
