import DriverDto from './DriverDto.ts';

interface DaysOffDto {
  id: string;
  driver: DriverDto;
  startTime: string;
  endTime: string;
}

export default DaysOffDto;
