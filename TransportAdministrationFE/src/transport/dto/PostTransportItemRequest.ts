import TransportSectionInfoDto from './TransportSectionInfoDto';

interface PostTransportItemRequest {
  startSiteId: number;
  startTime: string;
  destinationSiteId: number;
  transportSections: TransportSectionInfoDto[];
  truckId: number;
  cargoIds: number[];
}

export default PostTransportItemRequest;
