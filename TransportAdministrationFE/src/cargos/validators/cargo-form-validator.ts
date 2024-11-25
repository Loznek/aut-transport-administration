import * as yup from 'yup';
import CargoFormModel from '../models/CargoFormModel.ts';
import { TFunction } from 'i18next';

const cargoFormValidator = (t: TFunction): yup.ObjectSchema<CargoFormModel> =>
  yup.object().shape({
    name: yup.string().required(),
    weight: yup.number().typeError(t('validation.required')).required(),
    volume: yup.number().typeError(t('validation.required')).required(),
    destinationStoreId: yup.number().typeError(t('validation.required')).required(),
    startSiteId: yup.number().typeError(t('validation.required')).required(),
  });

export default cargoFormValidator;
