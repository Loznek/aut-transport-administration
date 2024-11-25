import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFieldWithController from '../components/text-field-with-controller/TextFieldWithController.tsx';
import { useTranslation } from 'react-i18next';
import { Box, Button, InputAdornment, MenuItem } from '@mui/material';
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
      destinationStoreId: data?.destinationStoreId || ('' as unknown as number),
    },
    resolver: yupResolver(cargoFormValidator(t)),
  });

  const handleFormSubmit: SubmitHandler<CargoFormModel> = (formData) => {
    putCargoItem({
      cargoName: formData.name,
      cargoVolume: formData.volume,
      cargoWeight: formData.weight,
      destinationStoreId: formData.destinationStoreId,
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
          InputProps={{
            endAdornment: <InputAdornment position="end">{t('common.tons')}</InputAdornment>,
          }}
          label={t('cargos.weight')}
          disabled={!!data}
        />
        <TextFieldWithController
          controllerProps={{ control, name: 'volume' }}
          InputProps={{
            endAdornment: <InputAdornment position="end">{t('common.meter3')}</InputAdornment>,
          }}
          label={t('cargos.volume')}
          disabled={!!data}
        />
        {!data && (
          <TextFieldWithController controllerProps={{ control, name: 'startSiteId' }} label={t('cargos.site')} select>
            {sites?.map((site) => (
              <MenuItem value={site.id} key={site.id}>
                {`${site.name} - ${site.address}`}
              </MenuItem>
            ))}
          </TextFieldWithController>
        )}
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
