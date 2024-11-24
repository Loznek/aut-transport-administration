import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HomeNavigationCard from './home-navigation-card/HomeNavigationCard.tsx';
import useAuth from '../auth/useAuth.ts';
import { memo } from 'react';
import useAvailableFunctionTypes from '../auth/hooks/use-available-function-types.ts';
import getHomeNavigationCardDataByFunctionTypeMap from './get-home-navigation-card-data-by-function-type-map.ts';

const HomePage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const availableFunctionTypes = useAvailableFunctionTypes();

  const homeNavigationCards = availableFunctionTypes.map((functionType) =>
    getHomeNavigationCardDataByFunctionTypeMap[functionType](t)
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 10 }}>
      <Typography variant="h4" sx={{ color: 'common.white' }}>
        {t('home.welcome', { name: auth.user?.name })}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {homeNavigationCards.map(({ title, details, to }) => (
          <HomeNavigationCard title={title} details={details} to={to} key={to} />
        ))}
      </Box>
    </Box>
  );
};

export default memo(HomePage);
