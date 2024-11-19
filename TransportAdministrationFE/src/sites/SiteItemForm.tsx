import SiteDto from '../core/dto/SiteDto.ts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import siteFormValidator from './validators/site-form-validator.ts';
import SiteFormModel from './models/SiteFormModel.ts';
import TextFieldWithController from '../components/text-field-with-controller/TextFieldWithController.tsx';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import usePutSiteItem from './queries/use-put-site-item.ts';
import { LoadingButton } from '@mui/lab';

interface SiteItemFormProps {
  data?: SiteDto;
}

const SiteItemForm = ({ data }: SiteItemFormProps) => {
  const { t } = useTranslation();
  const { mutate: putSiteItem, isPending: isPutSiteItemPending } = usePutSiteItem();
  const { control, handleSubmit } = useForm<SiteFormModel>({
    defaultValues: {
      address: data?.address ?? '',
    },
    resolver: yupResolver(siteFormValidator()),
  });

  const handleFormSubmit: SubmitHandler<SiteFormModel> = (formData) => {
    putSiteItem({
      site: {
        id: data?.id ?? 'new',
        address: formData.address,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextFieldWithController controllerProps={{ control, name: 'address' }} label={t('sites.address')} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton variant="contained" type="submit" loading={isPutSiteItemPending}>
            {t('common.save')}
          </LoadingButton>
        </Box>
      </Box>
    </form>
  );
};

export default SiteItemForm;
