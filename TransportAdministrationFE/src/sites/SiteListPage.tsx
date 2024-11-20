import useGetSiteList from './queries/use-get-site-list.ts';
import LoadingSection from '../components/loading-section/LoadingSection.tsx';
import ErrorSection from '../components/error-section/ErrorSection.tsx';
import { Box, List, ListItem, Button, Typography, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../Routes.ts';
import { Fragment } from 'react';
import useDeleteSiteItem from './queries/use-delete-site-item.ts';
import DeleteIconButtonWithDialog from '../components/delete-icon-button-with-dialog/DeleteIconButtonWithDialog.tsx';

const SiteListPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isFetching, isError } = useGetSiteList();
  const { mutateAsync: deleteSiteItem, isPending: isDeleteSiteItemPending } = useDeleteSiteItem();

  const handleAddNew = () => {
    navigate(ROUTES.SITE_ITEM('new'));
  };

  const handleEdit = (id: string) => () => {
    navigate(ROUTES.SITE_ITEM(id));
  };

  const handleDeleteSiteItem = (id: string) => async () => {
    await deleteSiteItem(id);
  };

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
      {data?.sites?.length ? (
        <List>
          {data?.sites.map((site, index) => (
            <Fragment key={site.id}>
              {index !== 0 && <Divider />}
              <ListItem
                secondaryAction={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton onClick={handleEdit(site.id)}>
                      <EditIcon />
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
                {site.address}
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
