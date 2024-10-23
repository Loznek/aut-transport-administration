import { AppBar, Box, Container, Drawer, IconButton, Theme, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import useAuth from '../../auth/useAuth.ts';
import NavigatorMenu from '../../components/navigator-menu/NavigatorMenu.tsx';
import { useCallback, useState } from 'react';

const Header = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleIsDrawerOpen = useCallback(() => {
    setIsDrawerOpen((prevState) => !prevState);
  }, []);

  return (
    <>
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} disableGutters>
            <Box>
              {isMobile && (
                <IconButton onClick={toggleIsDrawerOpen}>
                  <MenuIcon sx={{ color: 'common.white' }} />
                </IconButton>
              )}
              <Typography variant="h6" sx={{ display: 'inline-block' }}>
                {t('header.appName')}
              </Typography>
            </Box>
            {!!auth.user && (
              <IconButton onClick={auth.logout}>
                <LogoutIcon sx={{ color: 'common.white' }} />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {isMobile && (
        <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <Box sx={{ width: '14.25rem' }}>
            <NavigatorMenu onNavigate={() => setIsDrawerOpen(false)} />
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default Header;
