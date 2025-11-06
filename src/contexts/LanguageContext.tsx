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

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const { locale } = useParams<{ locale: string }>();

  useEffect(() => {
    const validLocale = locale && SUPPORTED_LOCALES.includes(locale as Locale) 
      ? locale as Locale 
      : getPreferredLanguage();
    
    console.log('Locale from URL:', locale);
    console.log('Current i18n language:', i18n.language);
    console.log('Setting language to:', validLocale);
    
    if (i18n.language !== validLocale) {
      i18n.changeLanguage(validLocale);
      localStorage.setItem('preferred-language', validLocale);
    }
  }, [locale, i18n]);

  const changeLanguage = (newLocale: Locale) => {
    console.log('=== changeLanguage called ===');
    console.log('New locale:', newLocale);
    console.log('Current path:', window.location.pathname);
    
    // Save to localStorage
    localStorage.setItem('preferred-language', newLocale);
    
    // Change i18n language
    i18n.changeLanguage(newLocale);
    
    // Navigate with corrected path
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/(en|pl)(\/|$)/, '');
    const newPath = `/${newLocale}${pathWithoutLocale ? '/' + pathWithoutLocale : ''}`;
    
    console.log('Path without locale:', pathWithoutLocale);
    console.log('New path:', newPath);
    console.log('=========================');
    
    navigate(newPath);
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
