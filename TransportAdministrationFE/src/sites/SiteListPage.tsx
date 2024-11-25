import useGetSiteList from './queries/use-get-site-list.ts';
import LoadingSection from '../components/loading-section/LoadingSection.tsx';
import ErrorSection from '../components/error-section/ErrorSection.tsx';
import { Box, Button, Divider, IconButton, List, ListItem, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../Routes.ts';
import { Fragment } from 'react';
import useDeleteSiteItem from './queries/use-delete-site-item.ts';
import DeleteIconButtonWithDialog from '../components/delete-icon-button-with-dialog/DeleteIconButtonWithDialog.tsx';
import useIsAdmin from '../auth/hooks/use-is-admin';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';

const SiteListPage = () => {
  const isAdmin = useIsAdmin();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isFetching, isError } = useGetSiteList();
  const { mutateAsync: deleteSiteItem, isPending: isDeleteSiteItemPending } = useDeleteSiteItem();
  const googleMapsAPIKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsAPIKey,
  });

  const handleAddNew = () => {
    navigate(ROUTES.SITE_ITEM('new'));
  };

  const handleEdit = (id: number) => () => {
    navigate(ROUTES.SITE_ITEM(id.toString()));
  };

  const handleDeleteSiteItem = (id: number) => async () => {
    await deleteSiteItem(id.toString());
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
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
            ?.filter((site) => site.lan !== null && site.lon !== null)
            .map((site) => (
              <MarkerF
                position={{
                  lat: Number(site.lan),
                  lng: Number(site.lon),
                }}
                key={site.id}
                label={site.id.toString()}
                onClick={handleEdit(site.id)}
              />
            ))}
        </GoogleMap>
      </Box>

      {data?.length ? (
        <List>
          {data?.map((site, index) => (
            <Fragment key={site.id}>
              {index !== 0 && <Divider />}
              <ListItem
                secondaryAction={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton onClick={handleEdit(site.id)}>
                      <VisibilityIcon />
                    </IconButton>
                    <DeleteIconButtonWithDialog
                      onDelete={handleDeleteSiteItem(site.id)}
                      dialogTitle={t('sites.confirmDeleteTitle')}
                      dialogDescription={site.address}
                      isLoading={isDeleteSiteItemPending}
                    />
                  </Box>
                }
              >
                {`${site.id} - ${site.name} - ${site.address}`}
              </ListItem>
            </Fragment>
          ))}
        </List>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
          <Typography sx={{ textAlign: 'center' }}>{t('sites.noSites')}</Typography>
        </Box>
      )}
    </Box>
  );
};
export default SiteListPage;
