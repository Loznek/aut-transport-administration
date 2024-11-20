import { ListItemIcon, ListItemText, MenuItem, MenuList, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { memo } from 'react';
import getNavigatorMenuItemByFunctionMap from './get-navigator-menu-item-by-function-map.tsx';
import useAvailableFunctionTypes from '../../auth/hooks/use-available-function-types.ts';

interface NavigatorMenuProps {
  onNavigate?: () => void;
}

const NavigatorMenu = ({ onNavigate }: NavigatorMenuProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const availableFunctionTypes = useAvailableFunctionTypes();

  const handleNavigate = (to: string) => () => {
    navigate(to);
    if (typeof onNavigate === 'function') {
      onNavigate();
    }
  };

  const getIsSelectedRoute = (route: string) => {
    return location.pathname.startsWith(route);
  };

  const navigatorMenuItems = availableFunctionTypes.map((functionType) =>
    getNavigatorMenuItemByFunctionMap[functionType](t)
  );

  return (
    <MenuList>
      {navigatorMenuItems.map(({ route, icon, text }) => (
        <MenuItem onClick={handleNavigate(route)} selected={getIsSelectedRoute(route)}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText>
            <Typography>{text}</Typography>
          </ListItemText>
        </MenuItem>
      ))}
    </MenuList>
  );
};

export default memo(NavigatorMenu);
