import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './Routes.ts';
import HomePage from './home/HomePage.tsx';
import Layout from './layout/app-layout/Layout.tsx';
import LoginPage from './auth/login/LoginPage.tsx';
import AdministrationLayout from './layout/administration-layout/AdministrationLayout.tsx';
import AuthGuard from './auth/AuthGuard.tsx';
import SitesPage from './sites/SitesPage.tsx';
import SiteEditPage from './sites/SiteEditPage.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.LOGIN()} element={<LoginPage />} />
        <Route element={<AuthGuard />}>
          <Route path={ROUTES.HOME()} element={<HomePage />} />
          <Route element={<AdministrationLayout />}>
            <Route path={ROUTES.TRUCKS()} />
            <Route path={ROUTES.TRANSPORTS()} />
            <Route path={ROUTES.CARGOS()} />
            <Route path={ROUTES.STORES()} />
            <Route path={ROUTES.SITES()} element={<SitesPage />} />
            <Route path={ROUTES.SITES_EDIT(':id')} element={<SiteEditPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
