import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { SUPPORTED_LOCALES, Locale } from '@/i18n/config';

interface LanguageContextType {
  currentLocale: Locale;
  changeLanguage: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const { locale } = useParams<{ locale: string }>();

  useEffect(() => {
    const validLocale = locale && SUPPORTED_LOCALES.includes(locale as Locale) 
      ? locale as Locale 
      : 'en';
    
    if (i18n.language !== validLocale) {
      i18n.changeLanguage(validLocale);
    }
  }, [locale, i18n]);

  const changeLanguage = (newLocale: Locale) => {
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/(en|pl)/, '');
    navigate(`/${newLocale}${pathWithoutLocale || '/'}`);
  };

  return (
    <LanguageContext.Provider value={{
      currentLocale: (locale as Locale) || 'en',
      changeLanguage,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
