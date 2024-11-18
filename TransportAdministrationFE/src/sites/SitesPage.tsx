import useGetSites from './queries/use-get-sites.ts';
import LoadingSection from '../components/loading-section/LoadingSection.tsx';
import ErrorSection from '../components/error-section/ErrorSection.tsx';
import { Box, List, ListItem, Button, Typography, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../Routes.ts';
import { Fragment } from 'react';

const SitesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetSites();

  const handleAddNew = () => {
    navigate(ROUTES.SITES_EDIT('new'));
  };

  const handleEdit = (id: number) => () => {
    navigate(ROUTES.SITES_EDIT(id));
  };

  if (isLoading) {
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
                  <IconButton edge="end" onClick={handleEdit(site.id)}>
                    <EditIcon />
                  </IconButton>
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

export default SitesPage;
