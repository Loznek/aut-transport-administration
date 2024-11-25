import { Box, Chip, MenuItem, Paper } from '@mui/material';
import { Control, FieldPath, useWatch } from 'react-hook-form';
import TransportFormModel from './models/TransportFormModel';
import TransportCreationStep from './constants/TransportCreationStep';
import AutocompleteWithController from '../components/autocomplete-with-controller/AutocompleteWithController';
import StoreDto from '../core/dto/StoreDto';
import { useTranslation } from 'react-i18next';
import TextFieldWithController from '../components/text-field-with-controller/TextFieldWithController';
import SiteDto from '../core/dto/SiteDto';
import TruckDto from '../core/dto/TruckDto';
import CargoDto from '../core/dto/CargoDto';
import useGetSiteAvailableDrivers from '../sites/queries/use-get-site-available-drivers';
import { useEffect } from 'react';
import DriverWithArrivalTimeDto from '../core/dto/DriverWithArrivalTimeDto';
import DriverDto from '../core/dto/DriverDto';

interface TransportItemSectionFormProps {
  index: number;
  control: Control<TransportFormModel>;
  currentStep: TransportCreationStep;
  stores: StoreDto[];
  sites: SiteDto[];
  trucks: TruckDto[] | null;
  cargos: CargoDto[] | null;
  drivers: DriverDto[] | null;
  setDrivers: (drivers: DriverWithArrivalTimeDto[], index: number) => void;
  sectionsAmount: number;
  multiple: boolean;
  disabled?: boolean;
}

const TransportItemSectionForm = ({
  index,
  control,
  currentStep,
  stores,
  sites,
  trucks,
  cargos,
  drivers,
  sectionsAmount,
  setDrivers,
  multiple,
  disabled,
}: TransportItemSectionFormProps) => {
  const { t } = useTranslation();
  const { mutateAsync: getAvailableDrivers } = useGetSiteAvailableDrivers();
  const startSiteFormName: FieldPath<TransportFormModel> =
    index === 0 ? `sections.${index}.startSite` : `sections.${index - 1}.destinationSite`;

  const startSiteId = useWatch({
    control,
    name: startSiteFormName,
  });

  useEffect(() => {
    if (Number.isInteger(startSiteId)) {
      getAvailableDrivers(startSiteId).then((data) => setDrivers(data || [], index));
    }
  }, [getAvailableDrivers, index, setDrivers, startSiteId]);

  return (
    <Paper elevation={2}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 1 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextFieldWithController
            controllerProps={{
              control,
              name: startSiteFormName,
            }}
            label={t('transports.startSite')}
            sx={{ flex: 1 }}
            disabled={currentStep !== TransportCreationStep.DEFINE_SITES || disabled}
            select
          >
            {sites?.map((site) => (
              <MenuItem key={site.id} value={site.id}>
                {site.address}
              </MenuItem>
            ))}
          </TextFieldWithController>
          <TextFieldWithController
            controllerProps={{ control, name: `sections.${index}.destinationSite` }}
            label={t('transports.destinationSite')}
            sx={{ flex: 1 }}
            disabled={(currentStep !== TransportCreationStep.DEFINE_SITES && sectionsAmount - 1 === index) || disabled}
            select
          >
            {sites?.map((site) => (
              <MenuItem key={site.id} value={site.id}>
                {site.address}
              </MenuItem>
            ))}
          </TextFieldWithController>
        </Box>
        <AutocompleteWithController
          controllerProps={{ control, name: `sections.${index}.stops` }}
          textFieldProps={{ label: t('transports.stops') }}
          options={stores}
          disabled={(currentStep !== TransportCreationStep.DEFINE_SITES && !multiple) || disabled}
          getOptionKey={(option) => option.id}
          getOptionLabel={(option) => option.address}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return <Chip variant="filled" label={`${index + 1}. ${option.address}`} key={key} {...tagProps} />;
            })
          }
          filterSelectedOptions
          multiple
        />
        {index === 0 && !!trucks && (
          <TextFieldWithController
            controllerProps={{ control, name: 'truck' }}
            label={t('transports.truck')}
            disabled={disabled}
            select
          >
            {trucks.map((truck) => (
              <MenuItem key={truck.id} value={truck.id}>
                {`${truck.licensePlate} - ${truck.type} - ${truck.volumeCapacity}m³ - ${truck.weightCapacity} tonna`}
              </MenuItem>
            ))}
          </TextFieldWithController>
        )}
        {index === 0 && !!cargos && (
          <AutocompleteWithController
            controllerProps={{ control, name: 'cargos' }}
            textFieldProps={{ label: t('transports.cargos') }}
            options={cargos}
            disabled={disabled}
            getOptionKey={(option) => option.id}
            getOptionLabel={(option) => `${option.name} - ${option.volume}m³ - ${option.weight} tonna`}
            noOptionsText={t('cargos.noCargos')}
            filterSelectedOptions
            multiple
          />
        )}
        {!!drivers && (
          <TextFieldWithController
            controllerProps={{ control, name: `sections.${index}.driver` }}
            label={t('transports.driver')}
            disabled={disabled}
            select
          >
            {drivers.map((driver) => (
              <MenuItem key={driver.id} value={driver.id}>
                {driver.name}
              </MenuItem>
            ))}
          </TextFieldWithController>
        )}
      </Box>
    </Paper>
  );
};

export default TransportItemSectionForm;
