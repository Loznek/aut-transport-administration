import SiteDto from './SiteDto.ts';
import TruckDto from './TruckDto.ts';

interface TransportDto {
  id: string;
  startSite: SiteDto;
  destinationSite: SiteDto;
  truck: TruckDto;
}

export default TransportDto;
