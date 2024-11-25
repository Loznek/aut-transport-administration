import UserType from '../dto/UserType';
import FunctionType from '../../core/constants/functionType.ts';

const availableFunctionsByRoleMap: Record<UserType, FunctionType[]> = {
  [UserType.ADMINISTRATOR]: [
    FunctionType.TRANSPORTS,
    FunctionType.STORES,
    FunctionType.SITES,
    FunctionType.CARGOS,
    FunctionType.TRUCKS,
    FunctionType.DRIVERS,
  ],
  [UserType.DRIVER]: [FunctionType.TRANSPORTS, FunctionType.STORES, FunctionType.SITES],
};

export default availableFunctionsByRoleMap;
