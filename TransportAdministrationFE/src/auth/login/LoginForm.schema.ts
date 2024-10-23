import * as yup from 'yup';

export interface LoginFormModel {
  username: string;
  password: string;
}

const LoginFormSchema = (): yup.ObjectSchema<LoginFormModel> =>
  yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

export default LoginFormSchema;
