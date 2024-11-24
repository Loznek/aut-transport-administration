import TruckDto from './TruckDto';

interface TruckWithArrivalTimeDto {
  truck: TruckDto;
  /** Date format string */
  arrivalTime: string;
}

export default TruckWithArrivalTimeDto;
