import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import storeFormValidator from './validators/store-form-validator.ts';
import StoreFormModel from './models/StoreFormModel.ts';
import TextFieldWithController from '../components/text-field-with-controller/TextFieldWithController.tsx';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import usePutStoreItem from './queries/use-put-store-item.ts';
import { LoadingButton } from '@mui/lab';
import StoreDto from '../core/dto/StoreDto.ts';

interface StoreItemFormProps {
  data?: StoreDto;
}

const StoreItemForm = ({ data }: StoreItemFormProps) => {
  const { t } = useTranslation();
  const { mutate: putStoreItem, isPending: isPutStoreItemPending } = usePutStoreItem();
  const { control, handleSubmit } = useForm<StoreFormModel>({
    defaultValues: {
      address: data?.address ?? '',
    },
    resolver: yupResolver(storeFormValidator()),
  });

  const handleFormSubmit: SubmitHandler<StoreFormModel> = (formData) => {
    putStoreItem({
      store: {
        id: data?.id ?? 'new',
        address: formData.address,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextFieldWithController controllerProps={{ control, name: 'address' }} label={t('stores.address')} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton variant="contained" type="submit" loading={isPutStoreItemPending}>
            {t('common.save')}
          </LoadingButton>
        </Box>
      </Box>
    </form>
  );
};

export default StoreItemForm;
