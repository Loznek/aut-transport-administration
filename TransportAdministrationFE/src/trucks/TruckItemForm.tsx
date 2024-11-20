import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFieldWithController from '../components/text-field-with-controller/TextFieldWithController.tsx';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import usePutTruckItem from './queries/use-put-truck-item.ts';
import { LoadingButton } from '@mui/lab';
import TruckDto from '../core/dto/TruckDto.ts';
import TruckFormModel from './models/TruckFormModel.ts';
import truckFormValidator from './validators/truck-form-validator.ts';

interface TruckItemFormProps {
  data?: TruckDto;
}

const TruckItemForm = ({ data }: TruckItemFormProps) => {
  const { t } = useTranslation();
  const { mutate: putTruckItem, isPending: isPutTruckItemPending } = usePutTruckItem();
  const { control, handleSubmit } = useForm<TruckFormModel>({
    defaultValues: {
      type: data?.type ?? '',
      volumeCapacity: data?.volumeCapacity ?? 0,
      weightCapacity: data?.weightCapacity ?? 0,
    },
    resolver: yupResolver(truckFormValidator(t)),
  });

  const handleFormSubmit: SubmitHandler<TruckFormModel> = (formData) => {
    putTruckItem({
      truck: {
        id: data?.id ?? 'new',
        type: formData.type,
        volumeCapacity: formData.volumeCapacity,
        weightCapacity: formData.weightCapacity,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextFieldWithController controllerProps={{ control, name: 'type' }} label={t('trucks.type')} />
        <TextFieldWithController
          controllerProps={{ control, name: 'weightCapacity' }}
          label={t('trucks.weightCapacity')}
        />
        <TextFieldWithController
          controllerProps={{ control, name: 'volumeCapacity' }}
          label={t('trucks.volumeCapacity')}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton variant="contained" type="submit" loading={isPutTruckItemPending}>
            {t('common.save')}
          </LoadingButton>
        </Box>
      </Box>
    </form>
  );
};

export default TruckItemForm;
