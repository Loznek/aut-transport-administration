import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFieldWithController from '../components/text-field-with-controller/TextFieldWithController.tsx';
import { useTranslation } from 'react-i18next';
import { Box, Button, MenuItem } from '@mui/material';
import usePutCargoItem from './queries/use-put-cargo-item.ts';
import { LoadingButton } from '@mui/lab';
import CargoFormModel from './models/CargoFormModel.ts';
import cargoFormValidator from './validators/cargo-form-validator.ts';
import CargoDto from '../core/dto/CargoDto.ts';
import SiteDto from '../core/dto/SiteDto';
import { ROUTES } from '../Routes';
import { useNavigate } from 'react-router-dom';
import StoreDto from '../core/dto/StoreDto';

interface CargoItemFormProps {
  data?: CargoDto;
  sites?: SiteDto[];
  stores?: StoreDto[];
}

const CargoItemForm = ({ data, sites = [], stores = [] }: CargoItemFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
        name: formData.name,
        volume: formData.volume,
        weight: formData.weight,
        destinationStoreId: formData.destinationStoreId,
      },
      startSiteId: formData.startSiteId,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextFieldWithController
          controllerProps={{ control, name: 'name' }}
          label={t('cargos.name')}
          disabled={!!data}
        />
        <TextFieldWithController
          controllerProps={{ control, name: 'weight' }}
          label={t('cargos.weight')}
          disabled={!!data}
        />
        <TextFieldWithController
          controllerProps={{ control, name: 'volume' }}
          label={t('cargos.volume')}
          disabled={!!data}
        />
        <TextFieldWithController
          controllerProps={{ control, name: 'startSiteId' }}
          label={t('cargos.site')}
          disabled={!!data}
          select
        >
          {sites?.map((site) => (
            <MenuItem value={site.id} key={site.id}>
              {`${site.name} - ${site.address}`}
            </MenuItem>
          ))}
        </TextFieldWithController>
        <TextFieldWithController
          controllerProps={{ control, name: 'destinationStoreId' }}
          label={t('cargos.destinationStore')}
          disabled={!!data}
          select
        >
          {stores?.map((store) => (
            <MenuItem value={store.id} key={store.id}>
              {`${store.name} - ${store.address}`}
            </MenuItem>
          ))}
        </TextFieldWithController>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {data ? (
            <Button variant="contained" type="button" onClick={() => navigate(ROUTES.CARGOS())}>
              {t('common.back')}
            </Button>
          ) : (
            <LoadingButton variant="contained" type="submit" loading={isPutCargoItemPending}>
              {t('common.save')}
            </LoadingButton>
          )}
        </Box>
      </Box>
    </form>
  );
};

export default CargoItemForm;
