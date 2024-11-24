import CargoDto from '../../core/dto/CargoDto';
import StoreDto from '../../core/dto/StoreDto';

export interface TransportSectionFormModel {
  startSite: number;
  destinationSite: number;
  stops: StoreDto[];
  driver?: number;
}

interface TransportFormModel {
  sections: TransportSectionFormModel[];
  truck?: number;
  cargos?: CargoDto[];
}

export default TransportFormModel;
