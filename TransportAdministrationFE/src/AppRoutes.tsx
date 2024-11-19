import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './Routes.ts';
import HomePage from './home/HomePage.tsx';
import Layout from './layout/app-layout/Layout.tsx';
import LoginPage from './auth/login/LoginPage.tsx';
import AdministrationLayout from './layout/administration-layout/AdministrationLayout.tsx';
import AuthGuard from './auth/AuthGuard.tsx';
import SiteListPage from './sites/SiteListPage.tsx';
import SiteItemPage from './sites/SiteItemPage.tsx';
import TruckListPage from './trucks/TruckListPage.tsx';
import TruckItemPage from './trucks/TruckItemPage.tsx';
import StoreListPage from './store/StoreListPage.tsx';
import StoreItemPage from './store/StoreItemPage.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.LOGIN()} element={<LoginPage />} />
        <Route element={<AuthGuard />}>
          <Route path={ROUTES.HOME()} element={<HomePage />} />
          <Route element={<AdministrationLayout />}>
            <Route path={ROUTES.TRUCKS()} element={<TruckListPage />} />
            <Route path={ROUTES.TRUCKS_EDIT(':id')} element={<TruckItemPage />} />
            <Route path={ROUTES.TRANSPORTS()} />
            <Route path={ROUTES.CARGOS()} />
            <Route path={ROUTES.STORES()} element={<StoreListPage />} />
            <Route path={ROUTES.STORES_EDIT(':id')} element={<StoreItemPage />} />
            <Route path={ROUTES.SITES()} element={<SiteListPage />} />
            <Route path={ROUTES.SITES_EDIT(':id')} element={<SiteItemPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
