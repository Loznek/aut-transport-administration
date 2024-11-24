import TransportSectionInfoDto from './TransportSectionInfoDto';

interface TransportCreationDto {
  startSiteId: number;
  startTime: string;
  destinationSiteId: number;
  transportSections: TransportSectionInfoDto[];
  truckId: number;
  cargoIds: number[];
}

export default TransportCreationDto;
