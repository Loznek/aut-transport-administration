import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ErrorSection = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '10rem' }}>
      <Typography>{t('exception')}</Typography>
    </Box>
  );
};

export default ErrorSection;
