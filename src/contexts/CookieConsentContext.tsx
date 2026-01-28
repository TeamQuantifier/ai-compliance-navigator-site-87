import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  ConsentState,
  ConsentCategories,
  getConsent,
  needsConsent,
  setConsent,
  acceptAll as acceptAllConsent,
  rejectNonEssential as rejectNonEssentialConsent,
  onConsentChange,
  clearNonEssentialCookies,
} from '@/lib/consent';
import { loadConsentedScripts } from '@/lib/script-loader';

interface CookieConsentContextType {
  consent: ConsentState | null;
  showBanner: boolean;
  showModal: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (categories: Partial<ConsentCategories>) => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<ConsentState | null>(() => getConsent());
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Initialize: check if consent is needed
  useEffect(() => {
    const needs = needsConsent();
    setShowBanner(needs);
    
    // If consent exists and is valid, load scripts
    const currentConsent = getConsent();
    if (currentConsent && !needs) {
      loadConsentedScripts(currentConsent.categories);
    }
  }, []);

  // Subscribe to consent changes
  useEffect(() => {
    const unsubscribe = onConsentChange((newState) => {
      setConsentState(newState);
      setShowBanner(false);
      setShowModal(false);
      // Load scripts based on new consent
      loadConsentedScripts(newState.categories);
    });
    
    return unsubscribe;
  }, []);

  const acceptAll = useCallback(() => {
    acceptAllConsent();
  }, []);

  const rejectNonEssential = useCallback(() => {
    rejectNonEssentialConsent();
  }, []);

  const savePreferences = useCallback((categories: Partial<ConsentCategories>) => {
    // If analytics or marketing is being disabled, clear cookies
    const currentConsent = getConsent();
    if (currentConsent) {
      if (currentConsent.categories.analytics && !categories.analytics) {
        clearNonEssentialCookies();
      }
      if (currentConsent.categories.marketing && !categories.marketing) {
        clearNonEssentialCookies();
      }
    }
    
    setConsent(categories);
  }, []);

  const openPreferences = useCallback(() => {
    setShowModal(true);
  }, []);

  const closePreferences = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        showBanner,
        showModal,
        acceptAll,
        rejectNonEssential,
        savePreferences,
        openPreferences,
        closePreferences,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): CookieConsentContextType {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
}
