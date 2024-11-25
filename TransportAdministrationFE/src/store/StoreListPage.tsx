import useGetStoreList from './queries/use-get-store-list.ts';
import LoadingSection from '../components/loading-section/LoadingSection.tsx';
import ErrorSection from '../components/error-section/ErrorSection.tsx';
import { Box, List, ListItem, Button, Typography, Divider, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import useGetStoreList from './queries/use-get-store-list.ts';
import useDeleteStoreItem from './queries/use-delete-store-item.ts';
import LoadingSection from '../components/loading-section/LoadingSection.tsx';
import ErrorSection from '../components/error-section/ErrorSection.tsx';
import DeleteIconButtonWithDialog from '../components/delete-icon-button-with-dialog/DeleteIconButtonWithDialog.tsx';
import useIsAdmin from '../auth/hooks/use-is-admin';
import { ROUTES } from '../Routes.ts';

const StoreListPage = () => {
  const { t } = useTranslation();
  const isAdmin = useIsAdmin();
  const navigate = useNavigate();
  const { data, isFetching, isError } = useGetStoreList();
  const { mutateAsync: deleteStoreItem, isPending: isDeleteStoreItemPending } = useDeleteStoreItem();

  const googleMapsAPIKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsAPIKey,
  });

  const handleAddNew = () => {
    navigate(ROUTES.STORE_ITEM('new'));
  };

  const handleEdit = (id: number) => () => {
    navigate(ROUTES.STORE_ITEM(id.toString()));
  };

  const handleDeleteStoreItem = (id: number) => async () => {
    await deleteStoreItem(id.toString());
  };

  if (isFetching || !isLoaded) {
    return <LoadingSection />;
  }

  if (isError) {
    return <ErrorSection />;
  }

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: Number(data?.[0]?.lan) || 47.4979,
    lng: Number(data?.[0]?.lon) || 19.0402,
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    {isAdmin && (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
        <Button variant="contained" onClick={handleAddNew}>
          {t('addNew')}
        </Button>
      </Box>
    )}

      <Box sx={{ padding: 2 }}>
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={6} center={center}>
          {data
            ?.filter((store) => store.lan !== null && store.lon !== null)
            .map((store) => (
              <MarkerF
                position={{
                  lat: Number(store.lan),
                  lng: Number(store.lon),
                }}
                key={store.id}
                label={store.id.toString()}
                onClick={handleEdit(store.id)}
              />
            ))}
        </GoogleMap>
      </Box>

      {data?.length ? (
        <List>
          {data.map((store, index) => (
            <Fragment key={store.id}>
              {index !== 0 && <Divider />}
              <ListItem
                secondaryAction={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton onClick={handleEdit(store.id)}>
                      <VisibilityIcon />
                    </IconButton>
                    <DeleteIconButtonWithDialog
                      onDelete={handleDeleteStoreItem(store.id)}
                      dialogTitle={t('stores.confirmDeleteTitle')}
                      dialogDescription={store.address}
                      isLoading={isDeleteStoreItemPending}
                    />
                  </Box>
                }
              >
                {store.id} - {store.address}
              </ListItem>
            </Fragment>
          ))}
        </List>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
          <Typography sx={{ textAlign: 'center' }}>{t('stores.noStores')}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default StoreListPage;
