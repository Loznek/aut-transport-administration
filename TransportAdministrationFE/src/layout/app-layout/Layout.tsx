import Header from '../header/Header.tsx';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Box sx={{ width: '100%', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="xl" sx={{ paddingY: { xs: 7, sm: 8 } }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
