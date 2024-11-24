import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFieldWithController from '../components/text-field-with-controller/TextFieldWithController.tsx';
import { useTranslation } from 'react-i18next';
import { Box, MenuItem } from '@mui/material';
import usePutCargoItem from './queries/use-put-cargo-item.ts';
import { LoadingButton } from '@mui/lab';
import CargoFormModel from './models/CargoFormModel.ts';
import cargoFormValidator from './validators/cargo-form-validator.ts';
import CargoDto from '../core/dto/CargoDto.ts';
import SiteDto from '../core/dto/SiteDto';

interface CargoItemFormProps {
  data?: CargoDto;
  sites?: SiteDto[];
}

const CargoItemForm = ({ data, sites = [] }: CargoItemFormProps) => {
  const { t } = useTranslation();
  const { mutate: putCargoItem, isPending: isPutCargoItemPending } = usePutCargoItem();
  const { control, handleSubmit } = useForm<CargoFormModel>({
    defaultValues: {
      name: data?.name ?? '',
      volume: data?.volume ?? 0,
      weight: data?.weight ?? 0,
      startSiteId: data?.destinationStoreId || ('' as unknown as number),
    },
    resolver: yupResolver(cargoFormValidator(t)),
  });

  const handleFormSubmit: SubmitHandler<CargoFormModel> = (formData) => {
    putCargoItem({
      cargo: {
        id: data?.id ?? null,
        name: formData.name,
        volume: formData.volume,
        weight: formData.weight,
      },
      startSiteId: formData.startSiteId,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextFieldWithController controllerProps={{ control, name: 'name' }} label={t('cargos.name')} />
        <TextFieldWithController controllerProps={{ control, name: 'weight' }} label={t('cargos.weight')} />
        <TextFieldWithController controllerProps={{ control, name: 'volume' }} label={t('cargos.volume')} />
        <TextFieldWithController
          controllerProps={{ control, name: 'startSiteId' }}
          label={t('cargos.site')}
          disabled={!!data}
          select
        >
          {sites?.map((site) => (
            <MenuItem value={site.id} key={site.id}>
              {site.address}
            </MenuItem>
          ))}
        </TextFieldWithController>
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
