import * as yup from 'yup';
import StoreFormModel from '../models/StoreFormModel.ts';

const storeFormValidator = (): yup.ObjectSchema<StoreFormModel> =>
  yup.object().shape({
    address: yup.string().required(),
    name: yup.string().required(),
  });

export default storeFormValidator;
