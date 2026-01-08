import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SUPPORTED_LOCALES, Locale, LOCALE_REGEX } from '@/i18n/config';

interface LanguageContextType {
  currentLocale: Locale;
  changeLanguage: (locale: Locale) => void;
  t: (key: string, options?: any) => any;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const localeRegex = new RegExp(`^/(${LOCALE_REGEX})(/|$)`);

const getLocaleFromPath = (): Locale => {
  const path = window.location.pathname;
  const match = path.match(localeRegex);
  return match ? (match[1] as Locale) : 'en';
};

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
  const [currentLocale, setCurrentLocale] = useState<Locale>(getLocaleFromPath());
  const [isLoading, setIsLoading] = useState(false);

  // Synchronize i18n language on mount
  useEffect(() => {
    const initialLocale = getLocaleFromPath();
    setIsLoading(true);
    i18n.changeLanguage(initialLocale).finally(() => setIsLoading(false));
    setCurrentLocale(initialLocale);
  }, [i18n]);

  // Handle browser navigation (back/forward buttons)
  useEffect(() => {
    const handleLocationChange = () => {
      const newLocale = getLocaleFromPath();
      if (newLocale !== currentLocale) {
        setCurrentLocale(newLocale);
        setIsLoading(true);
        i18n.changeLanguage(newLocale).finally(() => setIsLoading(false));
        localStorage.setItem('preferred-language', newLocale);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [currentLocale, i18n]);

  const changeLanguage = async (newLocale: Locale) => {
    // Save to localStorage
    localStorage.setItem('preferred-language', newLocale);
    
    // Update state
    setCurrentLocale(newLocale);
    
    // Change i18n language with loading state
    setIsLoading(true);
    await i18n.changeLanguage(newLocale);
    setIsLoading(false);
    
    // Navigate with corrected path
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(localeRegex, '');
    const newPath = `/${newLocale}${pathWithoutLocale ? '/' + pathWithoutLocale : ''}`;
    
    navigate(newPath);
  };

  return (
    <LanguageContext.Provider value={{
      currentLocale,
      changeLanguage,
      t,
      isLoading
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
