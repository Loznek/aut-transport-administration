interface TransportSectionDto {
  id?: number;
  startSiteId: number;
  destinationSiteId: number;
  /** Date format string */
  startTime?: string;
  /** Date format string */
  arrivalTime?: string;
  driverId: number;
  transportId?: number;
}

export default TransportSectionDto;
