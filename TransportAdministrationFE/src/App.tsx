import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './core/queries/query-client.ts';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { muiTheme } from './core/theme/mui-theme.ts';
import AppRoutes from './AppRoutes.tsx';
import AuthProvider from './auth/AuthProvider.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import LoadingSection from './components/loading-section/LoadingSection.tsx';
import ValidatorTranslationSetter from './i18n/ValidatorTranslationSetter.tsx';

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <AuthProvider>
            <Suspense fallback={<LoadingSection />}>
              <ValidatorTranslationSetter>
                <AppRoutes />
              </ValidatorTranslationSetter>
            </Suspense>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
