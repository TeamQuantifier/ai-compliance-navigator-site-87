import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SUPPORTED_LOCALES, Locale, LOCALE_REGEX } from '@/i18n/config';
import i18n from '@/i18n/config';

interface LanguageContextType {
  currentLocale: Locale;
  changeLanguage: (locale: Locale) => void;
  t: (key: string, options?: any) => any;
  isLoading: boolean;
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const localeRegex = new RegExp(`^/(${LOCALE_REGEX})(/|$)`);

const getLocaleFromPath = (): Locale => {
  const path = window.location.pathname;
  const match = path.match(localeRegex);
  return match ? (match[1] as Locale) : 'en';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentLocale, setCurrentLocale] = useState<Locale>(getLocaleFromPath());
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Check if translations are ready
  useEffect(() => {
    const checkReady = () => {
      if (i18n.isInitialized && i18n.hasLoadedNamespace('translation')) {
        setIsReady(true);
      }
    };
    
    checkReady();
    i18n.on('loaded', checkReady);
    i18n.on('initialized', checkReady);
    
    return () => {
      i18n.off('loaded', checkReady);
      i18n.off('initialized', checkReady);
    };
  }, []);

  // Synchronize i18n language on mount
  useEffect(() => {
    const initialLocale = getLocaleFromPath();
    setIsLoading(true);
    i18n.changeLanguage(initialLocale).finally(() => {
      setIsLoading(false);
      setIsReady(true);
    });
    setCurrentLocale(initialLocale);
  }, []);

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
  }, [currentLocale]);

  const changeLanguage = async (newLocale: Locale) => {
    localStorage.setItem('preferred-language', newLocale);
    setCurrentLocale(newLocale);
    setIsLoading(true);
    await i18n.changeLanguage(newLocale);
    setIsLoading(false);
    
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
      isLoading,
      isReady
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
