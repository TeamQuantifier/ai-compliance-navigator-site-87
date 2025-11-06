import { Navigate } from 'react-router-dom';
import { SUPPORTED_LOCALES, Locale } from '@/i18n/config';

const getPreferredLanguage = (): Locale => {
  // 1. Check localStorage
  const stored = localStorage.getItem('preferred-language');
  if (stored && SUPPORTED_LOCALES.includes(stored as Locale)) {
    return stored as Locale;
  }
  
  // 2. Check browser language
  const browserLang = navigator.language.split('-')[0];
  if (SUPPORTED_LOCALES.includes(browserLang as Locale)) {
    return browserLang as Locale;
  }
  
  // 3. Default to 'en'
  return 'en';
};

export const RedirectToPreferredLocale = () => {
  const preferredLanguage = getPreferredLanguage();
  console.log('Redirecting to preferred language:', preferredLanguage);
  return <Navigate to={`/${preferredLanguage}`} replace />;
};
