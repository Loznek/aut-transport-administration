import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './Routes.ts';
import HomePage from './home/HomePage.tsx';
import Layout from './layout/app-layout/Layout.tsx';
import LoginPage from './auth/login/LoginPage.tsx';
import AdministrationLayout from './layout/administration-layout/AdministrationLayout.tsx';
import AuthGuard from './auth/AuthGuard.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.LOGIN()} element={<LoginPage />} />
        <Route element={<AuthGuard />}>
          <Route path={ROUTES.HOME()} element={<HomePage />} />
          <Route element={<AdministrationLayout />}>
            <Route path={ROUTES.VEHICLES()} />
            <Route path={ROUTES.TRIPS()} />
            <Route path={ROUTES.PRODUCTS()} />
            <Route path={ROUTES.SHOPS()} />
            <Route path={ROUTES.SITES()} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
