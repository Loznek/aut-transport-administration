import TruckDto from '../../core/dto/TruckDto.ts';

interface GetTransportListResponse {
  trucks: TruckDto[];
}

export default GetTransportListResponse;
