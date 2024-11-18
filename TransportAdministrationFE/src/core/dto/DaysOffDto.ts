import DriverDto from './DriverDto.ts';

interface DaysOffDto {
  id: number;
  driver: DriverDto;
  startTime: string;
  endTime: string;
}

export default DaysOffDto;
