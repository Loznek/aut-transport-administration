import PostTransportItemRequest from './dto/PostTransportItemRequest';
import TransportFormModel from './models/TransportFormModel';
import TransportCreationDto from './dto/TransportCreationDto';
import SiteDto from '../core/dto/SiteDto';
import DriverWithArrivalTimeDto from '../core/dto/DriverWithArrivalTimeDto';
import TruckWithArrivalTimeDto from '../core/dto/TruckWithArrivalTimeDto';
import CargoWithArrivalTimeDto from '../core/dto/CargoWithArrivalTimeDto';

interface MapTransportResponseToTransportFormDataArgs {
  data?: TransportCreationDto;
  stores?: SiteDto[];
}

interface MapTransportFormDataToPostTransportItemRequestArgs {
  formData: TransportFormModel;
  startTime: Date;
  sectionsStartArrivalTimes: { startTime: Date; arrivalTime: Date }[];
}

interface GetFirstSectionStartTimeArgs {
  formData: TransportFormModel;
  availableDrivers: DriverWithArrivalTimeDto[];
  availableTrucks: TruckWithArrivalTimeDto[];
  transportableCargos: CargoWithArrivalTimeDto[];
}

export const getFirstSectionStartTime = ({
  formData,
  availableTrucks,
  availableDrivers,
  transportableCargos,
}: GetFirstSectionStartTimeArgs): Date => {
  const sectionFormData = formData.sections[0];
  const driverArrivalTime = availableDrivers.find((ad) => ad.driver.id === sectionFormData.driver)?.arrivalTime;
  const truckArrivalTime = availableTrucks.find((at) => at.truck.id === formData.truck)?.arrivalTime;
  const cargosArrivalTime = transportableCargos
    .filter((tc) => formData.cargos?.map((cargo) => cargo.id)?.includes(tc.cargo.id))
    .map((cargo) => cargo.arrivalTime);

  return new Date(
    Math.max(
      ...[driverArrivalTime, truckArrivalTime, ...cargosArrivalTime]
        .filter(Boolean)
        .map((time) => new Date(time!).getTime()),
      new Date().getTime()
    )
  );
};

export const mapTransportResponseToTransportFormData = ({
  data,
  stores = [],
}: MapTransportResponseToTransportFormDataArgs): TransportFormModel => {
  if (!data) {
    return {
      sections: [
        {
          startSite: '' as unknown as number,
          destinationSite: '' as unknown as number,
          stops: [],
          driver: '' as unknown as number,
        },
      ],
      cargos: [],
      truck: '' as unknown as number,
    };
  }

  return {
    sections: data.transportSections.map((ts) => {
      const storeIds = [...ts.storeStops]
        .sort((val1, val2) => val1.orderInSection - val2.orderInSection)
        .map((ss) => ss.storeId);

      return {
        startSite: ts.transportSection.startSiteId,
        destinationSite: ts.transportSection.destinationSiteId,
        stops: stores?.filter((store) => storeIds.includes(store.id)),
        driver: ts.transportSection.driverId,
      };
    }),
    truck: data.truckId,
    cargos: [],
  };
};

export const mapTransportFormDataToPostTransportItemRequest = ({
  formData,
  startTime,
  sectionsStartArrivalTimes,
}: MapTransportFormDataToPostTransportItemRequestArgs): PostTransportItemRequest => {
  return {
    startSiteId: formData.sections[0].startSite,
    destinationSiteId: formData.sections[formData.sections.length - 1].destinationSite,
    startTime: sectionsStartArrivalTimes[0]?.startTime || startTime || new Date(),
    truckId: formData.truck!,
    cargoIds: formData.cargos?.map((cargo) => cargo.id) || [],
    transportSections: formData.sections.map((section, index) => ({
      transportSection: {
        startTime: sectionsStartArrivalTimes[index]?.startTime?.toLocaleString(),
        arrivalTime: sectionsStartArrivalTimes[index]?.arrivalTime?.toLocaleString(),
        startSiteId: section.startSite,
        destinationSiteId: section.destinationSite,
        driverId: section.driver!,
      },
      storeStops: section.stops.map((stop, index) => ({
        storeId: stop.id,
        orderInSection: index,
      })),
    })),
  };
};
