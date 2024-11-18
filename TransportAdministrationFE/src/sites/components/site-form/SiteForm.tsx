import SiteDto from '../../../core/dto/SiteDto.ts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import siteFormValidator from '../../validators/site-form-validator.ts';
import SiteFormModel from '../../models/SiteFormModel.ts';
import TextFieldWithController from '../../../components/text-field-with-controller/TextFieldWithController.tsx';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';

interface SiteFormProps {
  data?: SiteDto;
}

const SiteForm = ({ data }: SiteFormProps) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<SiteFormModel>({
    defaultValues: {
      address: data?.address || '',
    },
    resolver: yupResolver(siteFormValidator()),
  });

  const handleFormSubmit: SubmitHandler<SiteFormModel> = (formData) => {};

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextFieldWithController controllerProps={{ control, name: 'address' }} label={t('sites.address')} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            {t('common.save')}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default SiteForm;
