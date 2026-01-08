// i18n configuration with lazy loading
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

export const SUPPORTED_LOCALES = ['en', 'pl', 'cs'] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];
export const LOCALE_REGEX = SUPPORTED_LOCALES.join('|'); // 'en|pl|cs'

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: [...SUPPORTED_LOCALES],
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
