import LoadingSection from '../components/loading-section/LoadingSection';
import ErrorSection from '../components/error-section/ErrorSection';
import { Box } from '@mui/material';
import CargoItemForm from './CargoItemForm';
import useGetCargoItem from './queries/use-get-cargo-item';
import useGetSiteList from '../sites/queries/use-get-site-list';

const CargoItemPage = () => {
  const { data: cargoItemData, isFetching: isCargoItemFetching, isError: isCargoItemError } = useGetCargoItem();
  const { data: siteListData, isFetching: isSiteListFetching, isError: isSiteListError } = useGetSiteList();

  if (isCargoItemFetching || isSiteListFetching) {
    return <LoadingSection />;
  }

  if (isCargoItemError || isSiteListError) {
    return <ErrorSection />;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <CargoItemForm data={cargoItemData} sites={siteListData} />
    </Box>
  );
};

export default CargoItemPage;
