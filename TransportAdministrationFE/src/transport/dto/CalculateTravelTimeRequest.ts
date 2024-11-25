interface CalculateTravelTimeRequest {
  startSiteId: number;
  destinationSiteId: number;
  startTime: string;
  stopPoints: {
    storeId: number;
    orderInSection: number;
    id: number | null;
    transportSectionId: number | null;
    arrivalTime: number | null;
  }[];
}

export default CalculateTravelTimeRequest;
