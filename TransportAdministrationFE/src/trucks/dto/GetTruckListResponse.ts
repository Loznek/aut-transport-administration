import TruckDto from '../../core/dto/TruckDto.ts';

interface GetTruckListResponse {
  trucks: TruckDto[];
}

export default GetTruckListResponse;
