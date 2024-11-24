import { Box, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from '@mui/icons-material';

interface HomeNavigationCardProps {
  title: string;
  details?: string[];
  to: string;
}

const HomeNavigationCard = ({ title, details, to }: HomeNavigationCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(to);
  };

  return (
    <Paper elevation={2} sx={{ width: '22.125rem', minHeight: '13rem' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          justifyContent: 'space-between',
          padding: 2,
          height: '100%',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6">{title}</Typography>
          {!!details?.length && (
            <Box component="ul" sx={{ margin: 0, paddingLeft: 3 }}>
              {details.map((detail) => (
                <Typography component="li" key={detail}>
                  {detail}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={handleNavigate} endIcon={<ChevronRight />}>
            {t('common.next')}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default HomeNavigationCard;
