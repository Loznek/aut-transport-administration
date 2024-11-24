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
import CargoListPage from './cargos/CargoListPage.tsx';
import CargoItemPage from './cargos/CargoItemPage.tsx';
import TransportListPage from './transport/TransportListPage';
import TransportItemPage from './transport/TransportItemPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.LOGIN()} element={<LoginPage />} />
        <Route element={<AuthGuard />}>
          <Route path={ROUTES.HOME()} element={<HomePage />} />
          <Route element={<AdministrationLayout />}>
            <Route path={ROUTES.TRUCKS()} element={<TruckListPage />} />
            <Route path={ROUTES.TRUCK_ITEM(':id')} element={<TruckItemPage />} />
            <Route path={ROUTES.TRANSPORTS()} element={<TransportListPage />} />
            <Route path={ROUTES.TRANSPORT_ITEM(':id')} element={<TransportItemPage />} />
            <Route path={ROUTES.CARGOS()} element={<CargoListPage />} />
            <Route path={ROUTES.CARGO_ITEM(':id')} element={<CargoItemPage />} />
            <Route path={ROUTES.STORES()} element={<StoreListPage />} />
            <Route path={ROUTES.STORE_ITEM(':id')} element={<StoreItemPage />} />
            <Route path={ROUTES.SITES()} element={<SiteListPage />} />
            <Route path={ROUTES.SITE_ITEM(':id')} element={<SiteItemPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
