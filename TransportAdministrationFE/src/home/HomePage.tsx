import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HomeNavigationCard from './home-navigation-card/HomeNavigationCard.tsx';
import { ROUTES } from '../Routes.ts';
import useAuth from '../auth/useAuth.ts';

const HomePage = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 10 }}>
      <Typography variant="h4" sx={{ color: 'common.white' }}>
        {t('home.welcome', { name: auth.user?.name })}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <HomeNavigationCard
          title={t('administrations.vehicles.manage')}
          details={[t('administrations.vehicles.detail1'), t('administrations.vehicles.detail2')]}
          to={ROUTES.VEHICLES()}
        />
        <HomeNavigationCard
          title={t('administrations.trips.manage')}
          details={[
            t('administrations.trips.detail1'),
            t('administrations.trips.detail2'),
            t('administrations.trips.detail3'),
          ]}
          to={ROUTES.TRIPS()}
        />
        <HomeNavigationCard
          title={t('administrations.products.manage')}
          details={[t('administrations.products.detail1'), t('administrations.products.detail2')]}
          to={ROUTES.PRODUCTS()}
        />
        <HomeNavigationCard
          title={t('administrations.shops.manage')}
          details={[t('administrations.shops.detail1'), t('administrations.shops.detail2')]}
          to={ROUTES.SHOPS()}
        />
        <HomeNavigationCard
          title={t('administrations.sites.manage')}
          details={[t('administrations.sites.detail1'), t('administrations.sites.detail2')]}
          to={ROUTES.SITES()}
        />
      </Box>
    </Box>
  );
};

export default HomePage;
