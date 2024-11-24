interface CalculateTravelTimeRequest {
  startSite: number;
  destinationSite: number;
  startTime: Date;
  stops: number[];
}

export default CalculateTravelTimeRequest;
