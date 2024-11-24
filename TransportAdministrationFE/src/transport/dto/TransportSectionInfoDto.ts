import TransportSectionDto from '../../core/dto/TransportSectionDto';
import StoreStopPointDto from './StoreStopPointDto';

interface TransportSectionInfoDto {
  transportSection: TransportSectionDto;
  storeStops: StoreStopPointDto[];
}

export default TransportSectionInfoDto;
