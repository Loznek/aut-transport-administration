import { ListItemIcon, ListItemText, MenuItem, MenuList, Typography } from '@mui/material';
import { ROUTES } from '../../Routes.ts';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RouteIcon from '@mui/icons-material/Route';
import CategoryIcon from '@mui/icons-material/Category';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import FactoryIcon from '@mui/icons-material/Factory';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

interface NavigatorMenuProps {
  onNavigate?: () => void;
}

const NavigatorMenu = ({ onNavigate }: NavigatorMenuProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = useCallback(
    (to: string) => () => {
      navigate(to);
      if (typeof onNavigate === 'function') {
        onNavigate();
      }
    },
    [navigate, onNavigate]
  );

  const getIsSelectedRoute = useCallback(
    (route: string) => {
      return location.pathname.startsWith(route);
    },
    [location]
  );

  return (
    <MenuList>
      <MenuItem onClick={handleNavigate(ROUTES.VEHICLES())} selected={getIsSelectedRoute(ROUTES.VEHICLES())}>
        <ListItemIcon>
          <LocalShippingIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography>{t('administrations.vehicles.manage')}</Typography>
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={handleNavigate(ROUTES.TRIPS())} selected={getIsSelectedRoute(ROUTES.TRIPS())}>
        <ListItemIcon>
          <RouteIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography>{t('administrations.trips.manage')}</Typography>
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={handleNavigate(ROUTES.PRODUCTS())} selected={getIsSelectedRoute(ROUTES.PRODUCTS())}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography>{t('administrations.products.manage')}</Typography>
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={handleNavigate(ROUTES.SHOPS())} selected={getIsSelectedRoute(ROUTES.SHOPS())}>
        <ListItemIcon>
          <LocalGroceryStoreIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography>{t('administrations.shops.manage')}</Typography>
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={handleNavigate(ROUTES.SITES())} selected={getIsSelectedRoute(ROUTES.SITES())}>
        <ListItemIcon>
          <FactoryIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography>{t('administrations.sites.manage')}</Typography>
        </ListItemText>
      </MenuItem>
    </MenuList>
  );
};

export default NavigatorMenu;
