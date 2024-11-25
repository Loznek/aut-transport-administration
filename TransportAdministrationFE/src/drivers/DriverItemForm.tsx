import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFieldWithController from '../components/text-field-with-controller/TextFieldWithController.tsx';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import usePutDriverItem from './queries/use-put-driver-item.ts';
import { LoadingButton } from '@mui/lab';
import DriverDto from '../core/dto/DriverDto.ts';
import DriverFormModel from './models/DriverFormModel.ts';
import driverFormValidator from './validators/driver-form-validator.ts';

interface DriverItemFormProps {
  data?: DriverDto;
}

const DriverItemForm = ({ data }: DriverItemFormProps) => {
  const { t } = useTranslation();
  const { mutate: putDriverItem, isPending: isPutDriverItemPending } = usePutDriverItem();
  const { control, handleSubmit } = useForm<DriverFormModel>({
    defaultValues: {
      name: data?.name ?? '',
      dateOfBirth: data?.dateOfBirth ?? '',
    },
    resolver: yupResolver(driverFormValidator()),
  });

  const handleFormSubmit: SubmitHandler<DriverFormModel> = (formData) => {
    putDriverItem({
      id: data!.id,
      name: formData.name,
      dateOfBirth: formData.dateOfBirth,
      dayOfInTheWeek: data!.dayOfInTheWeek,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextFieldWithController
          controllerProps={{ control, name: 'name' }}
          label={t('administrations.drivers.name')}
        />
        <TextFieldWithController
          controllerProps={{ control, name: 'dateOfBirth' }}
          label={t('administrations.drivers.dateOfBirth')}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton variant="contained" type="submit" loading={isPutDriverItemPending}>
            {t('common.save')}
          </LoadingButton>
        </Box>
      </Box>
    </form>
  );
};

export default DriverItemForm;
