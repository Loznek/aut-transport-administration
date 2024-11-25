interface StoreStopPointDto {
  storeId: number;
  orderInSection: number;
  arrivalTime: string | null;
  id: number | null;
  transportSectionId: number | null;
}

export default StoreStopPointDto;
