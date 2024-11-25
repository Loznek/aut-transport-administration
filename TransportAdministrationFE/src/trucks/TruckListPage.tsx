import useGetTruckList from './queries/use-get-truck-list.ts';
import LoadingSection from '../components/loading-section/LoadingSection.tsx';
import ErrorSection from '../components/error-section/ErrorSection.tsx';
import { Box, Button, Divider, IconButton, List, ListItem, Typography } from '@mui/material';
import { Fragment, useCallback } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ROUTES } from '../Routes.ts';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TruckDto from '../core/dto/TruckDto.ts';
import DeleteIconButtonWithDialog from '../components/delete-icon-button-with-dialog/DeleteIconButtonWithDialog.tsx';
import useDeleteTruckItem from './queries/use-delete-truck-item.ts';
import useIsAdmin from '../auth/hooks/use-is-admin';

const TruckListPage = () => {
  const { t } = useTranslation();
  const isAdmin = useIsAdmin();
  const navigate = useNavigate();
  const { data, isFetching, isError } = useGetTruckList();
  const { mutateAsync: deleteTruckItem, isPending: isDeleteTruckItemPending } = useDeleteTruckItem();

  const handleAddNew = () => {
    navigate(ROUTES.TRUCK_ITEM('new'));
  };

  const handleEdit = (id: number) => () => {
    navigate(ROUTES.TRUCK_ITEM(id.toString()));
  };

  const handleDelete = (id: number) => async () => {
    await deleteTruckItem(id.toString());
  };

  const concatenateTruckData = useCallback((truck: TruckDto) => {
    return `${truck.licensePlate} - ${truck.type} - ${truck.volumeCapacity}m³ - ${truck.weightCapacity} tonna`;
  }, []);

  if (isFetching) {
    return <LoadingSection />;
  }

  if (isError) {
    return <ErrorSection />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {isAdmin && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
          <Button variant="contained" onClick={handleAddNew}>
            {t('addNew')}
          </Button>
        </Box>
      )}
      {data?.length ? (
        <List>
          {data?.map((truck, index) => (
            <Fragment key={truck.id}>
              {index !== 0 && <Divider />}
              <ListItem
                secondaryAction={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton onClick={handleEdit(truck.id)}>
                      <VisibilityIcon />
                    </IconButton>
                    <DeleteIconButtonWithDialog
                      onDelete={handleDelete(truck.id)}
                      dialogTitle={t('trucks.confirmDeleteTitle')}
                      isLoading={isDeleteTruckItemPending}
                      dialogDescription={concatenateTruckData(truck)}
                    />
                  </Box>
                }
              >
                {concatenateTruckData(truck)}
              </ListItem>
            </Fragment>
          ))}
        </List>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
          <Typography sx={{ textAlign: 'center' }}>{t('trucks.noTrucks')}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default TruckListPage;
