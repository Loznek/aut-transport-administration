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
      <MenuItem onClick={handleNavigate(ROUTES.TRUCKS())} selected={getIsSelectedRoute(ROUTES.TRUCKS())}>
        <ListItemIcon>
          <LocalShippingIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography>{t('administrations.trucks.manage')}</Typography>
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={handleNavigate(ROUTES.TRANSPORTS())} selected={getIsSelectedRoute(ROUTES.TRANSPORTS())}>
        <ListItemIcon>
          <RouteIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography>{t('administrations.transports.manage')}</Typography>
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={handleNavigate(ROUTES.CARGOS())} selected={getIsSelectedRoute(ROUTES.CARGOS())}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography>{t('administrations.cargos.manage')}</Typography>
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={handleNavigate(ROUTES.STORES())} selected={getIsSelectedRoute(ROUTES.STORES())}>
        <ListItemIcon>
          <LocalGroceryStoreIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography>{t('administrations.stores.manage')}</Typography>
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
