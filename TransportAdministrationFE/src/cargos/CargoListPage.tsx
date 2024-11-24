import useGetCargoList from './queries/use-get-cargo-list.ts';
import LoadingSection from '../components/loading-section/LoadingSection.tsx';
import ErrorSection from '../components/error-section/ErrorSection.tsx';
import { Box, Button, Divider, IconButton, List, ListItem, Typography } from '@mui/material';
import { Fragment, useCallback } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { ROUTES } from '../Routes.ts';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DeleteIconButtonWithDialog from '../components/delete-icon-button-with-dialog/DeleteIconButtonWithDialog.tsx';
import useDeleteCargoItem from './queries/use-delete-cargo-item.ts';
import CargoDto from '../core/dto/CargoDto.ts';

const CargoListPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isFetching, isError } = useGetCargoList();
  const { mutateAsync: deleteCargoItem, isPending: isDeleteCargoItemPending } = useDeleteCargoItem();

  const handleAddNew = () => {
    navigate(ROUTES.CARGO_ITEM('new'));
  };

  const handleEdit = (id: number) => () => {
    navigate(ROUTES.CARGO_ITEM(id.toString()));
  };

  const handleDelete = (id: number) => async () => {
    await deleteCargoItem(id.toString());
  };

  const concatenateCargoData = useCallback((cargo: CargoDto) => {
    return `${cargo.name} - ${cargo.volume} - ${cargo.weight}`;
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
          {data?.map((cargo, index) => (
            <Fragment key={cargo.id}>
              {index !== 0 && <Divider />}
              <ListItem
                secondaryAction={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton onClick={handleEdit(cargo.id)}>
                      <EditIcon />
                    </IconButton>
                    <DeleteIconButtonWithDialog
                      onDelete={handleDelete(cargo.id)}
                      dialogTitle={t('cargos.confirmDeleteTitle')}
                      isLoading={isDeleteCargoItemPending}
                      dialogDescription={concatenateCargoData(cargo)}
                    />
                  </Box>
                }
              >
                {concatenateCargoData(cargo)}
              </ListItem>
            </Fragment>
          ))}
        </List>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
          <Typography sx={{ textAlign: 'center' }}>{t('cargos.noSites')}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default CargoListPage;
