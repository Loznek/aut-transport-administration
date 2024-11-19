import * as yup from 'yup';
import TruckFormModel from '../models/TruckFormModel.ts';

const truckFormValidator = (): yup.ObjectSchema<TruckFormModel> =>
  yup.object().shape({
    type: yup.string().required(),
    weightCapacity: yup.number().required(),
    volumeCapacity: yup.number().required(),
  });

export default truckFormValidator;
