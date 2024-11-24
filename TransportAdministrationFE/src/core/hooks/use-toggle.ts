import { Dispatch, SetStateAction, useCallback, useState } from 'react';

const useToggle = (defaultValue?: boolean): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [value, setValue] = useState<boolean>(!!defaultValue);

  const toggleValue = useCallback(() => {
    setValue((state) => !state);
  }, []);

  return [value, toggleValue, setValue];
};

export default useToggle;
