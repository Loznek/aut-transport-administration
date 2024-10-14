import './App.css';
import './i18n/index';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './core/queries/query-client.ts';
import { ThemeProvider } from '@mui/material';
import { muiTheme } from './core/theme/mui-theme.ts';
import AppRoutes from './AppRoutes.tsx';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={muiTheme}>
        <AppRoutes />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
