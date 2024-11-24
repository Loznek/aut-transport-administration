import LoadingSection from '../components/loading-section/LoadingSection.tsx';
import ErrorSection from '../components/error-section/ErrorSection.tsx';
import { Box } from '@mui/material';
import TransportItemForm from './TransportItemForm.tsx';
import useGetTransportItem from './queries/use-get-transport-item.ts';
import useGetSiteList from '../sites/queries/use-get-site-list';
import useGetStoreList from '../store/queries/use-get-store-list';

const TransportItemPage = () => {
  const {
    data: transportItem,
    isFetching: isTransportItemFetching,
    isError: isTransportItemError,
  } = useGetTransportItem();
  const { data: siteList, isFetching: isSiteListFetching, isError: isSiteListError } = useGetSiteList();
  const { data: storeList, isFetching: isStoreListFetching, isError: isStoreListError } = useGetStoreList();

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
