import * as yup from 'yup';
import { TFunction } from 'i18next';
import TransportFormModel, { TransportSectionFormModel } from '../models/TransportFormModel.ts';
import DriverWithArrivalTimeDto from '../../core/dto/DriverWithArrivalTimeDto';
import TruckWithArrivalTimeDto from '../../core/dto/TruckWithArrivalTimeDto';
import CargoWithArrivalTimeDto from '../../core/dto/CargoWithArrivalTimeDto';
import transportClient from '../services/transport-client';
import CargoDto from '../../core/dto/CargoDto';
import StoreDto from '../../core/dto/StoreDto';
import { getFirstSectionStartTime } from '../transport-form-helpers';

interface TransportSectionFormValidatorArgs {
  t: TFunction;
  availableDrivers: DriverWithArrivalTimeDto[][];
  availableTrucks: TruckWithArrivalTimeDto[];
  transportableCargos: CargoWithArrivalTimeDto[];
}

interface CalculateSectionTravelTimeInHoursArgs {
  sectionIndex: number;
  formData: TransportFormModel;
  availableDrivers: DriverWithArrivalTimeDto[];
  availableTrucks: TruckWithArrivalTimeDto[];
  transportableCargos: CargoWithArrivalTimeDto[];
  previousSectionArrivalTime: Date | null;
  sectionFormData: TransportSectionFormModel;
}

export let sectionsStartArrivalTime: { startTime: Date; arrivalTime: Date }[] = [];

const calculateSectionTravelDestinationArrivalTime = async ({
  sectionIndex,
  formData,
  availableTrucks,
  availableDrivers,
  transportableCargos,
  previousSectionArrivalTime,
  sectionFormData,
}: CalculateSectionTravelTimeInHoursArgs): Promise<{
  startTime: Date;
  destinationArrivalTime: Date;
  travelTimeInHour: number;
}> => {
  let maxSectionStartTime: Date;
  const driverArrivalTime = availableDrivers.find((ad) => ad.driver.id === sectionFormData.driver)?.arrivalTime;

  if (sectionIndex === 0) {
    maxSectionStartTime = getFirstSectionStartTime({
      formData,
      availableDrivers,
      availableTrucks,
      transportableCargos,
    });
  } else {
    maxSectionStartTime = new Date(
      Math.max(
        ...[previousSectionArrivalTime, driverArrivalTime].filter(Boolean).map((time) => new Date(time!).getTime())
      )
    );
  }
  if ((sectionIndex !== 0 || sectionFormData.startSite) && sectionFormData.destinationSite && driverArrivalTime) {
    const data = await transportClient
      .calculateTravelTime({
        startSite: sectionFormData.startSite,
        destinationSite: sectionFormData.destinationSite,
        stops: sectionFormData.stops.map((stop) => stop.id),
        startTime: maxSectionStartTime,
      })
      .then((res) => res.data);

    const destinationDate = new Date(data.destinationArrivalTime).getTime();

    const diffInMs = Math.abs(maxSectionStartTime.getTime() - destinationDate);
    const travelTimeInHour = diffInMs / (1000 * 60 * 60);

    return {
      startTime: maxSectionStartTime,
      destinationArrivalTime: new Date(data.destinationArrivalTime),
      travelTimeInHour,
    };
  }

  return { startTime: new Date(), destinationArrivalTime: new Date(), travelTimeInHour: 0 };
};

const transportSectionFormValidator = ({
  t,
}: TransportSectionFormValidatorArgs): yup.ObjectSchema<TransportSectionFormModel> =>
  yup.object().shape({
    startSite: yup.number().typeError(t('validation.required')).required(),
    destinationSite: yup.number().typeError(t('validation.required')).required(),
    stops: yup.array().of(yup.mixed<StoreDto>().required()).required(),
    driver: yup.number().typeError(t('validation.required')).required(),
  });

const transportFormValidator = ({
  t,
  transportableCargos,
  availableTrucks,
  availableDrivers,
}: TransportSectionFormValidatorArgs): yup.ObjectSchema<TransportFormModel> =>
  yup.object().shape({
    truck: yup.number().typeError(t('validation.required')).required(),
    cargos: yup
      .array()
      .of(yup.mixed<CargoDto>().required())
      .test('tooMuchVolume', t('transports.volumeTooMuch'), (value = [], context) => {
        const truckId = (context.parent as TransportFormModel).truck;
        const selectedTruck = availableTrucks.find((truck) => truck.truck.id === truckId)?.truck;
        if (selectedTruck) {
          const sumVolume = value.reduce((acc, value) => {
            return acc + value.volume;
          }, 0);

          return selectedTruck.volumeCapacity >= sumVolume;
        }

        return true;
      })
      .test('tooMuchWeight', t('transports.weightTooMuch'), (value = [], context) => {
        const truckId = (context.parent as TransportFormModel).truck;
        const selectedTruck = availableTrucks.find((truck) => truck.truck.id === truckId)?.truck;
        if (selectedTruck) {
          const sumWeight = value.reduce((acc, value) => {
            return acc + value.weight;
          }, 0);

          return selectedTruck.weightCapacity >= sumWeight;
        }

        return true;
      })
      .required(),
    sections: yup
      .array()
      .of(
        transportSectionFormValidator({
          t,
          transportableCargos,
          availableDrivers,
          availableTrucks,
        })
      )
      .test('uniqueDriver', '', (value = []) => {
        const driverIds = value.map((section) => section.driver).filter(Boolean);
        return driverIds.length === new Set(driverIds).size;
      })
      .test('moreThen9Hour', '', async (value = [], context): Promise<boolean> => {
        let isValid = true;
        sectionsStartArrivalTime = [];
        const formData = context.parent as TransportFormModel;
        let previousSectionArrivalTime: Date | null = null;
        let previousSectionDestinationSiteId: number | null = null;

        for (let i = 0; i < value.length; i++) {
          const sectionFormData = value[i];
          if (previousSectionDestinationSiteId) {
            sectionFormData.startSite = previousSectionDestinationSiteId;
          }
          const { startTime, destinationArrivalTime, travelTimeInHour } =
            await calculateSectionTravelDestinationArrivalTime({
              sectionIndex: i,
              formData,
              availableDrivers: availableDrivers[i] || [],
              availableTrucks,
              transportableCargos,
              previousSectionArrivalTime,
              sectionFormData,
            });

          previousSectionArrivalTime = destinationArrivalTime;
          previousSectionDestinationSiteId = sectionFormData.destinationSite;
          sectionsStartArrivalTime[i] = { startTime, arrivalTime: destinationArrivalTime };

          if (travelTimeInHour > 9) {
            isValid = false;
            break;
          }
        }

        return isValid;
      })
      .required(),
  });

export default transportFormValidator;
