import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import storeFormValidator from './validators/store-form-validator.ts';
import StoreFormModel from './models/StoreFormModel.ts';
import TextFieldWithController from '../components/text-field-with-controller/TextFieldWithController.tsx';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import usePutStoreItem from './queries/use-put-store-item.ts';
import { LoadingButton } from '@mui/lab';
import StoreDto from '../core/dto/StoreDto.ts';
import { ROUTES } from '../Routes';
import { useNavigate } from 'react-router-dom';

interface StoreItemFormProps {
  data?: StoreDto;
}

const StoreItemForm = ({ data }: StoreItemFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: putStoreItem, isPending: isPutStoreItemPending } = usePutStoreItem();
  const { control, handleSubmit } = useForm<StoreFormModel>({
    defaultValues: {
      address: data?.address ?? '',
      name: data?.name ?? '',
    },
    resolver: yupResolver(storeFormValidator()),
  });

  const handleFormSubmit: SubmitHandler<StoreFormModel> = (formData) => {
    putStoreItem({
      address: formData.address,
      name: formData.name,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextFieldWithController
          controllerProps={{ control, name: 'name' }}
          label={t('stores.name')}
          disabled={!!data}
        />
        <TextFieldWithController
          controllerProps={{ control, name: 'address' }}
          label={t('stores.address')}
          disabled={!!data}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {data ? (
            <Button variant="contained" type="button" onClick={() => navigate(ROUTES.SITES())}>
              {t('common.back')}
            </Button>
          ) : (
            <LoadingButton variant="contained" type="submit" loading={isPutStoreItemPending}>
              {t('common.save')}
            </LoadingButton>
          )}
        </Box>
      </Box>
    </form>
  );
};

export default StoreItemForm;
