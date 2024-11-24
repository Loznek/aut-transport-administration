import { ReactNode } from 'react';
import { TFunction } from 'i18next';
import FunctionType from '../../core/constants/functionType.ts';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { ROUTES } from '../../Routes.ts';
import RouteIcon from '@mui/icons-material/Route';
import CategoryIcon from '@mui/icons-material/Category';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import FactoryIcon from '@mui/icons-material/Factory';

interface NavigationMenuItemData {
  icon: ReactNode;
  route: string;
  text: string;
}

const getNavigatorMenuItemByFunctionMap: Record<FunctionType, (t: TFunction) => NavigationMenuItemData> = {
  [FunctionType.TRUCKS]: (t) => ({
    icon: <LocalShippingIcon />,
    route: ROUTES.TRUCKS(),
    text: t('administrations.trucks.manage'),
  }),
  [FunctionType.CARGOS]: (t) => ({
    icon: <CategoryIcon />,
    route: ROUTES.CARGOS(),
    text: t('administrations.cargos.manage'),
  }),
  [FunctionType.STORES]: (t) => ({
    icon: <LocalGroceryStoreIcon />,
    route: ROUTES.STORES(),
    text: t('administrations.stores.manage'),
  }),
  [FunctionType.TRANSPORTS]: (t) => ({
    icon: <RouteIcon />,
    route: ROUTES.TRANSPORTS(),
    text: t('administrations.transports.manage'),
  }),
  [FunctionType.SITES]: (t) => ({
    icon: <FactoryIcon />,
    route: ROUTES.SITES(),
    text: t('administrations.sites.manage'),
  }),
};

export default getNavigatorMenuItemByFunctionMap;
