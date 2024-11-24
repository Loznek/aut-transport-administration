import DriverDto from './DriverDto';

interface DriverWithArrivalTimeDto {
  driver: DriverDto;
  /** Date format string */
  arrivalTime: string;
}

export default DriverWithArrivalTimeDto;
