import LoadingSection from '../components/loading-section/LoadingSection.tsx';
import ErrorSection from '../components/error-section/ErrorSection.tsx';
import { Box } from '@mui/material';
import CargoItemForm from './CargoItemForm.tsx';
import useGetCargoItem from './queries/use-get-cargo-item.ts';

const CargoItemPage = () => {
  const { data, isFetching, isError } = useGetCargoItem();

  if (isFetching) {
    return <LoadingSection />;
  }

  if (isError) {
    return <ErrorSection />;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <CargoItemForm data={data?.cargo} />
    </Box>
  );
};

export default CargoItemPage;
