import SiteDto from './SiteDto.ts';
import DriverDto from './DriverDto.ts';
import TransportDto from './TransportDto.ts';

interface TransportSectionDto {
  id: string;
  startSite: SiteDto;
  destinationSite: SiteDto;
  startTime: string;
  arrivalTime: string;
  driver: DriverDto;
  transport: TransportDto;
}

export default TransportSectionDto;
