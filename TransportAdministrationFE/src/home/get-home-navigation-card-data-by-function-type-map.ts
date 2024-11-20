import FunctionType from '../core/constants/functionType.ts';
import { TFunction } from 'i18next';
import { ROUTES } from '../Routes.ts';

interface HomeNavigationCardData {
  title: string;
  details?: string[];
  to: string;
}

const getHomeNavigationCardDataByFunctionTypeMap: Record<FunctionType, (t: TFunction) => HomeNavigationCardData> = {
  [FunctionType.CARGOS]: (t) => ({
    title: t('administrations.cargos.manage'),
    details: [t('administrations.cargos.detail1'), t('administrations.cargos.detail2')],
    to: ROUTES.CARGOS(),
  }),
  [FunctionType.SITES]: (t) => ({
    title: t('administrations.sites.manage'),
    details: [t('administrations.sites.detail1'), t('administrations.sites.detail2')],
    to: ROUTES.SITES(),
  }),
  [FunctionType.TRUCKS]: (t) => ({
    title: t('administrations.trucks.manage'),
    details: [t('administrations.trucks.detail1'), t('administrations.trucks.detail2')],
    to: ROUTES.TRUCKS(),
  }),
  [FunctionType.TRANSPORTS]: (t) => ({
    title: t('administrations.transports.manage'),
    details: [
      t('administrations.transports.detail1'),
      t('administrations.transports.detail2'),
      t('administrations.transports.detail3'),
    ],
    to: ROUTES.TRANSPORTS(),
  }),
  [FunctionType.STORES]: (t) => ({
    title: t('administrations.stores.manage'),
    details: [t('administrations.stores.detail1'), t('administrations.stores.detail2')],
    to: ROUTES.STORES(),
  }),
};

export default getHomeNavigationCardDataByFunctionTypeMap;
