import LoadingSection from '../components/loading-section/LoadingSection.tsx';
import ErrorSection from '../components/error-section/ErrorSection.tsx';
import { Box } from '@mui/material';
import TransportItemForm from './TransportItemForm.tsx';
import useGetTransportItem from './queries/use-get-transport-item.ts';
import useGetAllSiteList from '../sites/queries/use-get-all-site-list';
import useGetAllStoreList from '../store/queries/use-get-all-store-list';
import useGetAllCargoList from '../cargos/queries/use-get-all-cargo-list';
import useGetAllDrivers from '../sites/queries/use-get-all-drivers';
import useGetAllTruckList from '../trucks/queries/use-get-all-truck-list';

const TransportItemPage = () => {
  const {
    data: transportItem,
    isFetching: isTransportItemFetching,
    isError: isTransportItemError,
  } = useGetTransportItem();
  const { data: siteList, isFetching: isSiteListFetching, isError: isSiteListError } = useGetAllSiteList();
  const { data: storeList, isFetching: isStoreListFetching, isError: isStoreListError } = useGetAllStoreList();
  const { data: allCargoList, isFetching: isAllCargoListFetching, isError: isAllCargoListError } = useGetAllCargoList();
  const {
    data: allDriverList,
    isFetching: isAllDriverListFetching,
    isError: isAllDriverListError,
  } = useGetAllDrivers();
  const { data: allTruckList, isFetching: isAllTruckListFetching, isError: isAllTruckListError } = useGetAllTruckList();

  if (
    isTransportItemFetching ||
    isSiteListFetching ||
    isStoreListFetching ||
    isAllCargoListFetching ||
    isAllDriverListFetching ||
    isAllTruckListFetching
  ) {
    return <LoadingSection />;
  }

  if (
    isTransportItemError ||
    isSiteListError ||
    isStoreListError ||
    isAllCargoListError ||
    isAllDriverListError ||
    isAllTruckListError
  ) {
    return <ErrorSection />;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <TransportItemForm
        data={transportItem}
        sites={siteList}
        stores={storeList}
        allCargos={allCargoList}
        allDrivers={allDriverList}
        allTrucks={allTruckList}
      />
    </Box>
  );
};

export default TransportItemPage;
