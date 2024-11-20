import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFieldWithController from '../components/text-field-with-controller/TextFieldWithController.tsx';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import usePutCargoItem from './queries/use-put-cargo-item.ts';
import { LoadingButton } from '@mui/lab';
import CargoFormModel from './models/CargoFormModel.ts';
import cargoFormValidator from './validators/cargo-form-validator.ts';
import CargoDto from '../core/dto/CargoDto.ts';

interface CargoItemFormProps {
  data?: CargoDto;
}

const CargoItemForm = ({ data }: CargoItemFormProps) => {
  const { t } = useTranslation();
  const { mutate: putCargoItem, isPending: isPutCargoItemPending } = usePutCargoItem();
  const { control, handleSubmit } = useForm<CargoFormModel>({
    defaultValues: {
      name: data?.name ?? '',
      volume: data?.volume ?? 0,
      weight: data?.weight ?? 0,
    },
    resolver: yupResolver(cargoFormValidator(t)),
  });

  const handleFormSubmit: SubmitHandler<CargoFormModel> = (formData) => {
    putCargoItem({
      cargo: {
        id: data?.id ?? 'new',
        name: formData.name,
        volume: formData.volume,
        weight: formData.weight,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextFieldWithController controllerProps={{ control, name: 'name' }} label={t('cargos.name')} />
        <TextFieldWithController controllerProps={{ control, name: 'weight' }} label={t('cargos.weight')} />
        <TextFieldWithController controllerProps={{ control, name: 'volume' }} label={t('cargos.volume')} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton variant="contained" type="submit" loading={isPutCargoItemPending}>
            {t('common.save')}
          </LoadingButton>
        </Box>
      </Box>
    </form>
  );
};

export default CargoItemForm;
