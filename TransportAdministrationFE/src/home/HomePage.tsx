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
          title={t('administrations.trucks.manage')}
          details={[t('administrations.trucks.detail1'), t('administrations.trucks.detail2')]}
          to={ROUTES.TRUCKS()}
        />
        <HomeNavigationCard
          title={t('administrations.transports.manage')}
          details={[
            t('administrations.transports.detail1'),
            t('administrations.transports.detail2'),
            t('administrations.transports.detail3'),
          ]}
          to={ROUTES.TRANSPORTS()}
        />
        <HomeNavigationCard
          title={t('administrations.cargos.manage')}
          details={[t('administrations.cargos.detail1'), t('administrations.cargos.detail2')]}
          to={ROUTES.CARGOS()}
        />
        <HomeNavigationCard
          title={t('administrations.stores.manage')}
          details={[t('administrations.stores.detail1'), t('administrations.stores.detail2')]}
          to={ROUTES.STORES()}
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
