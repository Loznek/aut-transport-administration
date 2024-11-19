import useGetSiteItem from './queries/use-get-site-item.ts';
import LoadingSection from '../components/loading-section/LoadingSection.tsx';
import ErrorSection from '../components/error-section/ErrorSection.tsx';
import { Box } from '@mui/material';
import SiteItemForm from './SiteItemForm.tsx';

const SiteItemPage = () => {
  const { data, isFetching, isError } = useGetSiteItem();

  if (isFetching) {
    return <LoadingSection />;
  }

  if (isError) {
    return <ErrorSection />;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <SiteItemForm data={data?.site} />
    </Box>
  );
};

export default SiteItemPage;
