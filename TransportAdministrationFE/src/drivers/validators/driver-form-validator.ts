import * as yup from 'yup';
import DriverFormModel from '../models/DriverFormModel.ts';

const driverFormValidator = (): yup.ObjectSchema<DriverFormModel> =>
  yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required(),
    dateOfBirth: yup.string().required(),
    dayOfInTheWeek: yup.string().required(),
  });

export default driverFormValidator;
