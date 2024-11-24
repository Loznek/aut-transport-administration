import useAuth from '../useAuth.ts';
import { useMemo } from 'react';
import availableFunctionsByRoleMap from '../constants/availableFunctionsByRoleMap.ts';

const useAvailableFunctionTypes = () => {
  const { user } = useAuth();

  return useMemo(() => (user?.type ? availableFunctionsByRoleMap[user.type] : []), [user]);
};

export default useAvailableFunctionTypes;
