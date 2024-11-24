import PostTransportItemRequest from './dto/PostTransportItemRequest';
import TransportFormModel from './models/TransportFormModel';
import TransportCreationDto from './dto/TransportCreationDto';

export const mapTransportResponseToTransportFormData = (data?: TransportCreationDto): TransportFormModel => {
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
    sections: data.transportSections.map((ts) => ({
      startSite: ts.transportSection.startSiteId,
      destinationSite: ts.transportSection.destinationSiteId,
      stops: [],
      driver: ts.transportSection.driverId,
    })),
    truck: data.truckId,
    cargos: [],
  };
};

export const mapTransportFormDataToPostTransportItemRequest = (
  formData: TransportFormModel
): PostTransportItemRequest => {
  return {
    startSiteId: formData.sections[0].startSite,
    destinationSiteId: formData.sections[formData.sections.length - 1].destinationSite,
    startTime: new Date(),
    truckId: formData.truck!,
    cargoIds: formData.cargos?.map((cargo) => cargo.id) || [],
    transportSections: formData.sections.map((section) => ({
      transportSection: {
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
