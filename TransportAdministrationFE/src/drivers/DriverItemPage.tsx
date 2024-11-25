import LoadingSection from '../components/loading-section/LoadingSection.tsx';
import ErrorSection from '../components/error-section/ErrorSection.tsx';
import { Box } from '@mui/material';
import DriverItemForm from './DriverItemForm.tsx';
import useGetDriverItem from './queries/use-get-driver-item.ts';

const DriverItemPage = () => {
  const { data: driverItem, isFetching: isDriverItemFetching, isError: isDriverItemError } = useGetDriverItem();

  if (isDriverItemFetching || isDriverItemFetching) {
    return <LoadingSection />;
  }

  if (isDriverItemError || isDriverItemError) {
    return <ErrorSection />;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <DriverItemForm data={driverItem} />
    </Box>
  );
};

export default DriverItemPage;
