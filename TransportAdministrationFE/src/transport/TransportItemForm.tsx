import { SubmitErrorHandler, SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import TransportFormModel from './models/TransportFormModel.ts';
import { Alert, Box, Button } from '@mui/material';
import SiteDto from '../core/dto/SiteDto';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import TransportCreationStep from './constants/TransportCreationStep';
import StoreDto from '../core/dto/StoreDto';
import { LoadingButton } from '@mui/lab';
import { yupResolver } from '@hookform/resolvers/yup';
import transportFormValidator from './validators/transport-form-validator';
import TransportItemSectionForm from './TransportItemSectionForm';
import CargoWithArrivalTimeDto from '../core/dto/CargoWithArrivalTimeDto';
import TruckWithArrivalTimeDto from '../core/dto/TruckWithArrivalTimeDto';
import useGetSiteAvailableTrucks from '../sites/queries/use-get-site-available-trucks';
import useGetSiteTransportableCargos from '../sites/queries/use-get-site-transportable-cargos';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DriverWithArrivalTimeDto from '../core/dto/DriverWithArrivalTimeDto';
import usePostTransportItem from './queries/use-post-transport-item';
import {
  mapTransportFormDataToPostTransportItemRequest,
  mapTransportResponseToTransportFormData,
} from './transport-form-helpers';
import TransportCreationDto from './dto/TransportCreationDto';
import usePutTransportItem from './queries/use-put-transport-item';
import useIdParam from '../core/hooks/use-id-param';

interface TruckItemFormProps {
  data?: TransportCreationDto;
  sites?: SiteDto[];
  stores?: StoreDto[];
}

const TransportItemForm = ({ data, sites = [], stores = [] }: TruckItemFormProps) => {
  const { t } = useTranslation();
  const idParam = useIdParam();
  const [currentStep, setCurrentStep] = useState(TransportCreationStep.DEFINE_SITES);
  const [transportableCargos, setTransportableCargos] = useState<CargoWithArrivalTimeDto[]>([]);
  const [availableTrucks, setAvailableTrucks] = useState<TruckWithArrivalTimeDto[]>([]);
  const [availableSectionDrivers, setAvailableSectionDrivers] = useState<DriverWithArrivalTimeDto[][]>([]);
  const [shouldUniqueDriverMessage, setShouldUniqueDriverMessage] = useState(false);
  const [shouldMultipleSections, setShouldMultipleSections] = useState(false);
  const { mutateAsync: getAvailableTrucks, isPending: isGetAvailableTrucksPending } = useGetSiteAvailableTrucks();
  const { mutateAsync: getTransportableCargos, isPending: isGetTransportableCargosPending } =
    useGetSiteTransportableCargos();
  const { mutateAsync: createTransport } = usePostTransportItem();
  const { mutateAsync: updateTransport } = usePutTransportItem();
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, isValidating },
  } = useForm<TransportFormModel>({
    defaultValues: mapTransportResponseToTransportFormData({ data, stores }),
    resolver: data
      ? undefined
      : yupResolver(
          transportFormValidator({ t, transportableCargos, availableTrucks, availableDrivers: availableSectionDrivers })
        ),
    reValidateMode: 'onSubmit',
  });

  const { fields, append, insert } = useFieldArray({ control, name: 'sections' });

  const startSiteId = useWatch({ control, name: 'sections.0.startSite' });

  useEffect(() => {
    if (Number.isInteger(startSiteId)) {
      getAvailableTrucks(startSiteId).then((resData) => {
        setAvailableTrucks(resData || []);
      });
      getTransportableCargos(startSiteId).then((resData) => {
        setTransportableCargos(resData || []);
        if (data) {
          setValue(
            'cargos',
            resData.filter((cargo) => data.cargoIds.includes(cargo.cargo.id)).map((cargo) => cargo.cargo)
          );
        }
      });
    }
  }, [data, getAvailableTrucks, getTransportableCargos, setValue, startSiteId]);

  const handleFormSubmit: SubmitHandler<TransportFormModel> = async (formData) => {
    if (data && idParam) {
      await updateTransport({ body: data, id: idParam });
    } else {
      await createTransport(mapTransportFormDataToPostTransportItemRequest(formData));
    }
  };

  const handleFormSubmitError: SubmitErrorHandler<TransportFormModel> = (formError) => {
    console.log(formError);
    if (formError.sections?.root?.type === 'uniqueDriver') {
      setShouldUniqueDriverMessage(true);
    } else {
      setShouldUniqueDriverMessage(false);
    }
    if (formError.sections?.root?.type === 'moreThen9Hour' && !shouldMultipleSections) {
      setShouldMultipleSections(true);
      setCurrentStep(TransportCreationStep.DEFINE_DETAILS);
      const firstSection = watch().sections[0];
      append({
        startSite: '' as unknown as number,
        destinationSite: firstSection.destinationSite,
        stops: [],
        driver: '' as unknown as number,
      });
      setValue('sections.0', {
        startSite: firstSection.startSite,
        destinationSite: '' as unknown as number,
        stops: [...firstSection.stops],
        driver: firstSection.driver,
      });
    }
  };

  const handleBackFromDefineDetails = useCallback(() => {
    setShouldMultipleSections(false);
    setCurrentStep(TransportCreationStep.DEFINE_SITES);
    setAvailableTrucks([]);
    setTransportableCargos([]);
    reset();
  }, [reset]);

  const handleAddNewSection = useCallback(() => {
    insert(fields.length - 1, {
      startSite: '' as unknown as number,
      destinationSite: '' as unknown as number,
      stops: [],
      driver: '' as unknown as number,
    });
  }, [insert, fields]);

  const handleSetDriverForSection = useCallback((drivers: DriverWithArrivalTimeDto[], index: number) => {
    setAvailableSectionDrivers((prev) => {
      const newArray = [...prev];
      newArray[index] = drivers;
      return newArray;
    });
  }, []);

  const controlledFields = useMemo(
    () => fields.map((field, index) => ({ ...field, ...watch('sections')[index] })),
    [fields, watch]
  );

  const disableForm = isGetAvailableTrucksPending || isGetTransportableCargosPending || !!data;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit, handleFormSubmitError)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {shouldMultipleSections && <Alert severity="warning">{t('transports.multipleWarning')}</Alert>}
        {shouldUniqueDriverMessage && <Alert severity="warning">{t('transports.uniqueDriverWarning')}</Alert>}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {controlledFields.map(({ id }, index) => (
            <Fragment key={id}>
              {index !== 0 && (
                <Box sx={{ padding: 1, display: 'flex', justifyContent: 'center' }}>
                  <ArrowDownwardIcon />
                </Box>
              )}
              <TransportItemSectionForm
                index={index}
                control={control}
                currentStep={currentStep}
                sites={sites}
                stores={stores}
                trucks={availableTrucks.map((at) => at.truck)}
                cargos={transportableCargos.map((tc) => tc.cargo)}
                drivers={availableSectionDrivers[index]?.map((asd) => asd.driver) || []}
                multiple={shouldMultipleSections}
                sectionsAmount={fields.length}
                setDrivers={handleSetDriverForSection}
                disabled={disableForm}
              />
            </Fragment>
          ))}
          {shouldMultipleSections && (
            <Box>
              <Button onClick={handleAddNewSection} disabled={disableForm}>
                {t('transports.addMore')}
              </Button>
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {shouldMultipleSections ? (
            <Button
              variant="outlined"
              onClick={handleBackFromDefineDetails}
              disabled={isSubmitting || isValidating || disableForm}
            >
              {t('common.back')}
            </Button>
          ) : (
            <Box />
          )}
          <LoadingButton variant="contained" type="submit" loading={isSubmitting || isValidating}>
            {t('common.next')}
          </LoadingButton>
        </Box>
      </Box>
    </form>
  );
};

export default TransportItemForm;
