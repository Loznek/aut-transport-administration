interface TransportSectionDto {
  id: number | null;
  startSiteId: number;
  destinationSiteId: number;
  /** Date format string */
  startTime?: string;
  /** Date format string */
  arrivalTime?: string;
  driverId: number;
  transportId: number | null;
}

export default TransportSectionDto;
