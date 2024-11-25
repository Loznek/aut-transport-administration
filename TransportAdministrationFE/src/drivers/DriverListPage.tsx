import { Box, Button, Divider, IconButton, List, ListItem, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import useDeleteDriverItem from './queries/use-delete-driver-item.ts';
import LoadingSection from '../components/loading-section/LoadingSection.tsx';
import ErrorSection from '../components/error-section/ErrorSection.tsx';
import DeleteIconButtonWithDialog from '../components/delete-icon-button-with-dialog/DeleteIconButtonWithDialog.tsx';
import { ROUTES } from '../Routes.ts';
import useGetAllDriverList from './queries/use-get-all-driver-list.ts';

const DriverListPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isFetching, isError } = useGetAllDriverList();
  const { mutateAsync: deleteDriverItem, isPending: isDeleteDriverItemPending } = useDeleteDriverItem();

  const handleAddNew = () => {
    navigate(ROUTES.DRIVER_ITEM('new'));
  };

  const handleEdit = (id: number) => () => {
    navigate(ROUTES.DRIVER_ITEM(id.toString()));
  };

  const handleDeleteDriverItem = (id: number) => async () => {
    await deleteDriverItem(id.toString());
  };

  if (isFetching) {
    return <LoadingSection />;
  }

  if (isError) {
    return <ErrorSection />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
        <Button variant="contained" onClick={handleAddNew}>
          {t('addNew')}
        </Button>
      </Box>

      {data?.length ? (
        <List>
          {data.map((driver, index) => (
            <Fragment key={driver.id}>
              {index !== 0 && <Divider />}
              <ListItem
                secondaryAction={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton onClick={handleEdit(driver.id)}>
                      <EditIcon />
                    </IconButton>
                    <DeleteIconButtonWithDialog
                      onDelete={handleDeleteDriverItem(driver.id)}
                      dialogTitle={t('drivers.confirmDeleteTitle')}
                      dialogDescription={driver.name}
                      isLoading={isDeleteDriverItemPending}
                    />
                  </Box>
                }
              >
                {driver.id} - {driver.name} - {driver.dayOfInTheWeek} - {driver.dateOfBirth}
              </ListItem>
            </Fragment>
          ))}
        </List>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
          <Typography sx={{ textAlign: 'center' }}>{t('drivers.noSites')}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default DriverListPage;
