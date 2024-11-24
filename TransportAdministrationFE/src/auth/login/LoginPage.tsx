import { Box, Paper, Typography } from '@mui/material';
import LoginForm from './LoginForm.tsx';
import { useTranslation } from 'react-i18next';
import useAuth from '../useAuth.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Routes.ts';

const LoginPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      navigate(ROUTES.HOME());
    }
  }, [auth, navigate]);

  if (auth.user) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        paddingTop: { xs: 2, md: 6 },
      }}
    >
      <Paper elevation={2} sx={{ width: '30rem' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: { xs: 2, md: 3 }, gap: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            {t('login.title')}
          </Typography>
          <LoginForm />
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
