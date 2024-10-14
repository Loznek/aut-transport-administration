import 'i18next';
import hu from 'i18n/hu.json';

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    defaultNS: 'hu';
    resources: {
      hu: typeof hu;
    };
  }
}
