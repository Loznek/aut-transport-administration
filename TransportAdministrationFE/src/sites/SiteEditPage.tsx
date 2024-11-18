import useIdParam from '../core/hooks/use-id-param.ts';
import useGetSite from './queries/use-get-site.ts';
import LoadingSection from '../components/loading-section/LoadingSection.tsx';
import ErrorSection from '../components/error-section/ErrorSection.tsx';
import { Box } from '@mui/material';
import SiteForm from './components/site-form/SiteForm.tsx';

const SiteEditPage = () => {
  const idParam = useIdParam();
  const { data, isLoading, isError } = useGetSite(idParam);

  if (isLoading) {
    return <LoadingSection />;
  }

  if (isError) {
    return <ErrorSection />;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <SiteForm data={data?.site} />
    </Box>
  );
};

export default SiteEditPage;
