import useGetTransportList from './queries/use-get-transport-list.ts';
import LoadingSection from '../components/loading-section/LoadingSection.tsx';
import ErrorSection from '../components/error-section/ErrorSection.tsx';
import { Box, Button, Divider, IconButton, List, ListItem, Typography } from '@mui/material';
import { Fragment } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { ROUTES } from '../Routes.ts';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DeleteIconButtonWithDialog from '../components/delete-icon-button-with-dialog/DeleteIconButtonWithDialog.tsx';
import useDeleteTransportItem from './queries/use-delete-transport-item.ts';
import useGetSiteList from '../sites/queries/use-get-site-list';
import useGetTruckList from '../trucks/queries/use-get-truck-list';

const TransportListPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    data: transportList,
    isFetching: isTransportListFetching,
    isError: isTransportListError,
  } = useGetTransportList();
  const { data: siteList, isFetching: isSiteListFetching, isError: isSiteListError } = useGetSiteList();
  const { data: truckList, isFetching: isTruckListFetching, isError: isTruckListError } = useGetTruckList();
  const { mutateAsync: deleteTransportItem, isPending: isDeleteTransportItemPending } = useDeleteTransportItem();

  const handleAddNew = () => {
    navigate(ROUTES.TRANSPORT_ITEM('new'));
  };

  const handleEdit = (id: number) => () => {
    navigate(ROUTES.TRANSPORT_ITEM(id.toString()));
  };

  const handleDelete = (id: number) => async () => {
    await deleteTransportItem(id.toString());
  };

  if (isTransportListFetching || isSiteListFetching || isTruckListFetching) {
    return <LoadingSection />;
  }

  if (isTransportListError || isSiteListError || isTruckListError) {
    return <ErrorSection />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
        <Button variant="contained" onClick={handleAddNew}>
          {t('addNew')}
        </Button>
      </Box>
      {transportList?.length ? (
        <List>
          {transportList?.map((transport, index) => {
            const startSiteAddress = siteList?.find((site) => site.id === transport.startSiteId)?.address;
            const destinationSiteAddress = siteList?.find((site) => site.id === transport.destinationSiteId)?.address;
            const truckLicencePlate = truckList?.find((truck) => truck.id === transport.truckId)?.licencePlate;
            return (
              <Fragment key={transport.id}>
                {index !== 0 && <Divider />}
                <ListItem
                  secondaryAction={
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton onClick={handleEdit(transport.id)}>
                        <EditIcon />
                      </IconButton>
                      <DeleteIconButtonWithDialog
                        onDelete={handleDelete(transport.id)}
                        dialogTitle={t('trucks.confirmDeleteTitle')}
                        isLoading={isDeleteTransportItemPending}
                        dialogDescription=""
                      />
                    </Box>
                  }
                >
                  {`${startSiteAddress}  - ${destinationSiteAddress} - ${truckLicencePlate}`}
                </ListItem>
              </Fragment>
            );
          })}
        </List>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
          <Typography sx={{ textAlign: 'center' }}>{t('transports.noTransports')}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default TransportListPage;
