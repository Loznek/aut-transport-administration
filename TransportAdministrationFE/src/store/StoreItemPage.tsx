import useGetStoreItem from './queries/use-get-store-item.ts';
import LoadingSection from '../components/loading-section/LoadingSection.tsx';
import ErrorSection from '../components/error-section/ErrorSection.tsx';
import { Box } from '@mui/material';
import StoreItemForm from './StoreItemForm.tsx';

const StoreItemPage = () => {
  const { data, isFetching, isError } = useGetStoreItem();

  if (isFetching) {
    return <LoadingSection />;
  }

  if (isError) {
    return <ErrorSection />;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <StoreItemForm data={data} />
    </Box>
  );
};

export default StoreItemPage;
