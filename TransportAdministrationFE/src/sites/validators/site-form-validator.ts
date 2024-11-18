import * as yup from 'yup';
import SiteFormModel from '../models/SiteFormModel.ts';

const siteFormValidator = (): yup.ObjectSchema<SiteFormModel> =>
  yup.object().shape({
    address: yup.string().required(),
  });

export default siteFormValidator;
