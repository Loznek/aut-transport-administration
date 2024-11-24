import TruckDto from '../../core/dto/TruckDto';

interface TruckCreationDto extends Omit<TruckDto, 'id'> {
  id: number | null;
}

export default TruckCreationDto;
