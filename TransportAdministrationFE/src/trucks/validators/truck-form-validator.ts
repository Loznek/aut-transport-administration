import * as yup from 'yup';
import { TFunction } from 'i18next';
import TruckFormModel from '../models/TruckFormModel.ts';

const truckFormValidator = (t: TFunction): yup.ObjectSchema<TruckFormModel> =>
  yup.object().shape({
    type: yup.string().required(),
    weightCapacity: yup.number().typeError(t('validation.required')).required(),
    volumeCapacity: yup.number().typeError(t('validation.required')).required(),
  });

export default truckFormValidator;
