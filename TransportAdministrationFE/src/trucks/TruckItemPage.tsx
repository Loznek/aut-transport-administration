import LoadingSection from '../components/loading-section/LoadingSection.tsx';
import ErrorSection from '../components/error-section/ErrorSection.tsx';
import { Box } from '@mui/material';
import TruckItemForm from './TruckItemForm.tsx';
import useGetTruckItem from './queries/use-get-truck-item.ts';

const TruckItemPage = () => {
  const { data, isFetching, isError } = useGetTruckItem();

  if (isFetching) {
    return <LoadingSection />;
  }

  if (isError) {
    return <ErrorSection />;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <TruckItemForm data={data?.truck} />
    </Box>
  );
};

export default TruckItemPage;
