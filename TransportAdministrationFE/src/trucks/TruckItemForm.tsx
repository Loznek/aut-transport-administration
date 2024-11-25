import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFieldWithController from '../components/text-field-with-controller/TextFieldWithController.tsx';
import { useTranslation } from 'react-i18next';
import { Box, Button, InputAdornment, MenuItem } from '@mui/material';
import usePutTruckItem from './queries/use-put-truck-item.ts';
import { LoadingButton } from '@mui/lab';
import TruckDto from '../core/dto/TruckDto.ts';
import TruckFormModel from './models/TruckFormModel.ts';
import truckFormValidator from './validators/truck-form-validator.ts';
import SiteDto from '../core/dto/SiteDto';
import { ROUTES } from '../Routes';
import { useNavigate } from 'react-router-dom';

interface TruckItemFormProps {
  data?: TruckDto;
  sites?: SiteDto[];
}

const TruckItemForm = ({ data, sites = [] }: TruckItemFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: putTruckItem, isPending: isPutTruckItemPending } = usePutTruckItem();
  const { control, handleSubmit } = useForm<TruckFormModel>({
    defaultValues: {
      type: data?.type ?? '',
      licencePlate: data?.licensePlate ?? '',
      volumeCapacity: data?.volumeCapacity ?? 0,
      weightCapacity: data?.weightCapacity ?? 0,
      startSiteId: '' as unknown as number,
    },
    resolver: yupResolver(truckFormValidator(t)),
  });

  const handleFormSubmit: SubmitHandler<TruckFormModel> = (formData) => {
    putTruckItem({
      type: formData.type,
      licensePlate: formData.licencePlate,
      volumeCapacity: formData.volumeCapacity,
      weightCapacity: formData.weightCapacity,
      startSiteId: formData.startSiteId,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextFieldWithController
          controllerProps={{ control, name: 'type' }}
          label={t('trucks.type')}
          disabled={!!data}
        />
        <TextFieldWithController
          controllerProps={{ control, name: 'licencePlate' }}
          label={t('trucks.licencePlate')}
          disabled={!!data}
        />
        <TextFieldWithController
          controllerProps={{ control, name: 'weightCapacity' }}
          InputProps={{
            endAdornment: <InputAdornment position="end">{t('common.tons')}</InputAdornment>,
          }}
          label={t('trucks.weightCapacity')}
          disabled={!!data}
        />
        <TextFieldWithController
          controllerProps={{ control, name: 'volumeCapacity' }}
          InputProps={{
            endAdornment: <InputAdornment position="end">{t('common.meter3')}</InputAdornment>,
          }}
          label={t('trucks.volumeCapacity')}
          disabled={!!data}
        />
        {!data && (
          <TextFieldWithController
            controllerProps={{ control, name: 'startSiteId' }}
            label={t('trucks.site')}
            disabled={!!data}
            select
          >
            {sites.map((site) => (
              <MenuItem key={site.id} value={site.id}>{`${site.address}`}</MenuItem>
            ))}
          </TextFieldWithController>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {data ? (
            <Button variant="contained" type="button" onClick={() => navigate(ROUTES.TRUCKS())}>
              {t('common.back')}
            </Button>
          ) : (
            <LoadingButton variant="contained" type="submit" loading={isPutTruckItemPending}>
              {t('common.save')}
            </LoadingButton>
          )}
        </Box>
      </Box>
    </form>
  );
};
export default TruckItemForm;
