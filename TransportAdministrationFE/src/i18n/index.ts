import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18nBackend from 'i18next-http-backend';
import { LANGUAGES } from '../core/constants/languages';

i18n
  .use(I18nBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: LANGUAGES.HU,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    backend: {
      loadPath: () => {
        if (import.meta.env.BASE_URL) {
          return `${import.meta.env.BASE_URL}i18n/{{lng}}.json`;
        }
        return '/i18n/{{lng}}.json';
      },
    },
  });
