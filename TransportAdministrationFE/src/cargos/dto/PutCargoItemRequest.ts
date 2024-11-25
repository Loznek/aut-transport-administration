import CargoDto from '../../core/dto/CargoDto';

interface PutCargoItemRequest {
  cargo: Omit<CargoDto, 'id'>;
  startSiteId: number;
}

export default PutCargoItemRequest;
