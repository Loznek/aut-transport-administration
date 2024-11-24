import CargoDto from '../../core/dto/CargoDto';

interface CreateCargoDto extends Omit<CargoDto, 'id' | 'destinationStoreId'> {
  id: number | null;
}

export default CreateCargoDto;
