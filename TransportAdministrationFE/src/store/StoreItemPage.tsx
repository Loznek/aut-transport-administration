import useGetStoreItem from './queries/use-get-store-item.ts';
import LoadingSection from '../components/loading-section/LoadingSection.tsx';
import ErrorSection from '../components/error-section/ErrorSection.tsx';
import { Box, Typography } from '@mui/material';
import StoreItemForm from './StoreItemForm.tsx';
import { useTranslation } from 'react-i18next';

const StoreItemPage = () => {
  const { data, isFetching, isError } = useGetStoreItem();
  const { t } = useTranslation();

  if (isFetching) {
    return <LoadingSection />;
  }

  if (isError) {
    return <ErrorSection />;
  }

  const googleMapsAPIKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

  const latitude = data?.lan || 0;
  const longitude = data?.lon || 0;
  const zoom = 14;
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=600x300&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=${googleMapsAPIKey}`;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">{t('administrations.stores.storeLocation')}</Typography>
      <img
        src={mapUrl}
        alt="Store Location Map"
        style={{ width: '100%', maxWidth: '600px', marginTop: '16px', borderRadius: '8px' }}
      />
      <StoreItemForm data={data} />
    </Box>
  );
};

export default StoreItemPage;
