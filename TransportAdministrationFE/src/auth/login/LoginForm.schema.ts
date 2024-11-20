import * as yup from 'yup';
import LoginFormModel from '../models/LoginFormModel';

const LoginFormSchema = (): yup.ObjectSchema<LoginFormModel> =>
  yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

export default LoginFormSchema;
