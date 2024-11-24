import LoadingSection from '../components/loading-section/LoadingSection.tsx';
import ErrorSection from '../components/error-section/ErrorSection.tsx';
import { Box } from '@mui/material';
import TransportItemForm from './TransportItemForm.tsx';
import useGetTransportItem from './queries/use-get-transport-item.ts';
import useGetAllSiteList from '../sites/queries/use-get-all-site-list';
import useGetAllStoreList from '../store/queries/use-get-all-store-list';

const TransportItemPage = () => {
  const {
    data: transportItem,
    isFetching: isTransportItemFetching,
    isError: isTransportItemError,
  } = useGetTransportItem();
  const { data: siteList, isFetching: isSiteListFetching, isError: isSiteListError } = useGetAllSiteList();
  const { data: storeList, isFetching: isStoreListFetching, isError: isStoreListError } = useGetAllStoreList();

  if (isTransportItemFetching || isSiteListFetching || isStoreListFetching) {
    return <LoadingSection />;
  }

  if (isTransportItemError || isSiteListError || isStoreListError) {
    return <ErrorSection />;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <TransportItemForm data={transportItem} sites={siteList} stores={storeList} />
    </Box>
  );
};

export default TransportItemPage;
