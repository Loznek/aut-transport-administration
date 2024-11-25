import SiteDto from '../core/dto/SiteDto.ts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import siteFormValidator from './validators/site-form-validator.ts';
import SiteFormModel from './models/SiteFormModel.ts';
import TextFieldWithController from '../components/text-field-with-controller/TextFieldWithController.tsx';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import usePutSiteItem from './queries/use-put-site-item.ts';
import { LoadingButton } from '@mui/lab';
import { ROUTES } from '../Routes';
import { useNavigate } from 'react-router-dom';

interface SiteItemFormProps {
  data?: SiteDto;
}

const SiteItemForm = ({ data }: SiteItemFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: putSiteItem, isPending: isPutSiteItemPending } = usePutSiteItem();
  const { control, handleSubmit } = useForm<SiteFormModel>({
    defaultValues: {
      address: data?.address ?? '',
      name: data?.name ?? '',
    },
    resolver: yupResolver(siteFormValidator()),
  });

  const handleFormSubmit: SubmitHandler<SiteFormModel> = (formData) => {
    putSiteItem({
      address: formData.address,
      name: formData.name,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextFieldWithController
          controllerProps={{ control, name: 'name' }}
          label={t('sites.name')}
          disabled={!!data}
        />
        <TextFieldWithController
          controllerProps={{ control, name: 'address' }}
          label={t('sites.address')}
          disabled={!!data}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {data ? (
            <Button variant="contained" type="button" onClick={() => navigate(ROUTES.SITES())}>
              {t('common.back')}
            </Button>
          ) : (
            <LoadingButton variant="contained" type="submit" loading={isPutSiteItemPending}>
              {t('common.save')}
            </LoadingButton>
          )}
        </Box>
      </Box>
    </form>
  );
};

export default SiteItemForm;
