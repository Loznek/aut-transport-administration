import { Box, Paper, Theme, useMediaQuery } from '@mui/material';
import NavigatorMenu from '../../components/navigator-menu/NavigatorMenu.tsx';
import { Outlet } from 'react-router-dom';

const AdministrationLayout = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        paddingTop: 7,
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'flex-start',
      }}
    >
      {!isMobile && (
        <Paper sx={{ width: '14.25rem' }}>
          <NavigatorMenu />
        </Paper>
      )}
      <Paper sx={{ flex: 1 }}>
        <Outlet />
      </Paper>
    </Box>
  );
};

export default AdministrationLayout;
