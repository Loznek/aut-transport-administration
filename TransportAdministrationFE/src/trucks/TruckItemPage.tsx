import LoadingSection from '../components/loading-section/LoadingSection.tsx';
import ErrorSection from '../components/error-section/ErrorSection.tsx';
import { Box } from '@mui/material';
import TruckItemForm from './TruckItemForm.tsx';
import useGetTruckItem from './queries/use-get-truck-item.ts';
import useGetSiteList from '../sites/queries/use-get-site-list';

const TruckItemPage = () => {
  const { data: truckItem, isFetching: isTruckItemFetching, isError: isTruckItemError } = useGetTruckItem();
  const { data: siteList, isFetching: isSiteListFetching, isError: isSiteListError } = useGetSiteList();

  if (isTruckItemFetching || isSiteListFetching) {
    return <LoadingSection />;
  }

  if (isTruckItemError || isSiteListError) {
    return <ErrorSection />;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <TruckItemForm data={truckItem} sites={siteList} />
    </Box>
  );
};

export default TruckItemPage;
