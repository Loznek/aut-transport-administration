import useGetTruckList from './queries/use-get-truck-list.ts';
import LoadingSection from '../components/loading-section/LoadingSection.tsx';
import ErrorSection from '../components/error-section/ErrorSection.tsx';
import { Box, Button, Divider, IconButton, List, ListItem, Typography } from '@mui/material';
import { Fragment, useCallback } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { ROUTES } from '../Routes.ts';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TruckDto from '../core/dto/TruckDto.ts';
import DeleteIconButtonWithDialog from '../components/delete-icon-button-with-dialog/DeleteIconButtonWithDialog.tsx';
import useDeleteTruckItem from './queries/use-delete-truck-item.ts';

const TruckListPage = () => {
  const { t } = useTranslation();
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
    return `${truck.licencePlate} - ${truck.type} - ${truck.volumeCapacity} - ${truck.weightCapacity}`;
  }, []);

  if (isFetching) {
    return <LoadingSection />;
  }

  if (isError) {
    return <ErrorSection />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
        <Button variant="contained" onClick={handleAddNew}>
          {t('addNew')}
        </Button>
      </Box>
      {data?.length ? (
        <List>
          {data?.map((truck, index) => (
            <Fragment key={truck.id}>
              {index !== 0 && <Divider />}
              <ListItem
                secondaryAction={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton onClick={handleEdit(truck.id)}>
                      <EditIcon />
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
