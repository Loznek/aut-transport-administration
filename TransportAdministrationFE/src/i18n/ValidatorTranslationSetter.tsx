import { PropsWithChildren, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

const ValidatorTranslationSetter = ({ children }: PropsWithChildren) => {
  const { t, ready } = useTranslation();
  const isYupLocaleSet = useRef(false);

  useEffect(() => {
    if (!isYupLocaleSet.current && ready) {
      const yupLocale: yup.LocaleObject = {
        mixed: {
          required: t('validation.required'),
        },
      };
      yup.setLocale(yupLocale);
      isYupLocaleSet.current = true;
    }
  }, [t, ready]);

  return children;
};

export default ValidatorTranslationSetter;
