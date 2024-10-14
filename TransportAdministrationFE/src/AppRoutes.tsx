import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './Routes.ts';
import HomePage from './home/HomePage.tsx';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
