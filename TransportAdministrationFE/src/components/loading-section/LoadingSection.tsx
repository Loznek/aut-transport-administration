import { Box, CircularProgress } from '@mui/material';

const LoadingSection = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '10rem' }}>
      <CircularProgress />
    </Box>
  );
};

export default LoadingSection;
