import CargoDto from './CargoDto';

interface CargoWithArrivalTimeDto {
  cargo: CargoDto;
  /** Date format string  */
  arrivalTime: string;
}

export default CargoWithArrivalTimeDto;
