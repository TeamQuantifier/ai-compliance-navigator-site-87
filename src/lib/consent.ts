// Cookie Consent Manager - GDPR/ePrivacy Compliant
// Manages consent state with cookie storage and pub/sub for consent changes

export interface ConsentCategories {
  necessary: boolean;  // Always true, cannot be changed
  analytics: boolean;  // GA4, Clarity
  marketing: boolean;  // GTM (marketing tags)
  preferences: boolean; // Future: language, theme preferences
}

export interface ConsentState {
  version: string;      // "2026-01-28" - re-prompt on change
  timestamp: string;    // ISO date of consent
  categories: ConsentCategories;
}

// Constants
export const CONSENT_COOKIE_NAME = 'qa_consent';
export const CONSENT_VERSION = '2026-01-28';
const CONSENT_EXPIRY_DAYS = 180; // 6 months

// Default state before any consent
export const DEFAULT_CATEGORIES: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

// Subscribers for consent changes
type ConsentCallback = (state: ConsentState) => void;
const subscribers: Set<ConsentCallback> = new Set();

/**
 * Parse a cookie value from document.cookie
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    return cookieValue ? decodeURIComponent(cookieValue) : null;
  }
  return null;
}

/**
 * Set a cookie with proper attributes
 */
function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  
  const isSecure = window.location.protocol === 'https:';
  const cookieValue = encodeURIComponent(value);
  
  document.cookie = `${name}=${cookieValue}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${isSecure ? '; Secure' : ''}`;
}

/**
 * Delete a cookie by setting its expiry to the past
 */
function deleteCookie(name: string, domain?: string): void {
  if (typeof document === 'undefined') return;
  
  const domainPart = domain ? `; domain=${domain}` : '';
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainPart}`;
  // Also try without domain for cookies set on current domain
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

/**
 * Get the current consent state from cookie
 */
export function getConsent(): ConsentState | null {
  const cookieValue = getCookie(CONSENT_COOKIE_NAME);
  if (!cookieValue) return null;
  
  try {
    const state = JSON.parse(cookieValue) as ConsentState;
    // Ensure necessary is always true
    if (state.categories) {
      state.categories.necessary = true;
    }
    return state;
  } catch {
    return null;
  }
}

/**
 * Check if consent is needed (no consent or version mismatch)
 */
export function needsConsent(): boolean {
  const consent = getConsent();
  if (!consent) return true;
  return consent.version !== CONSENT_VERSION;
}

/**
 * Check if a specific category has consent
 */
export function hasConsent(category: keyof ConsentCategories): boolean {
  if (category === 'necessary') return true;
  
  const consent = getConsent();
  if (!consent) return false;
  
  return consent.categories[category] === true;
}

/**
 * Set consent and save to cookie
 */
export function setConsent(categories: Partial<ConsentCategories>): void {
  const newCategories: ConsentCategories = {
    necessary: true, // Always true
    analytics: categories.analytics ?? false,
    marketing: categories.marketing ?? false,
    preferences: categories.preferences ?? false,
  };
  
  const state: ConsentState = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    categories: newCategories,
  };
  
  setCookie(CONSENT_COOKIE_NAME, JSON.stringify(state), CONSENT_EXPIRY_DAYS);
  
  // Notify subscribers
  subscribers.forEach((callback) => callback(state));
}

/**
 * Accept all cookies
 */
export function acceptAll(): void {
  setConsent({
    necessary: true,
    analytics: true,
    marketing: true,
    preferences: true,
  });
}

/**
 * Reject all non-essential cookies
 */
export function rejectNonEssential(): void {
  setConsent({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });
  
  // Clear any existing tracking cookies
  clearNonEssentialCookies();
}

/**
 * Subscribe to consent changes
 */
export function onConsentChange(callback: ConsentCallback): () => void {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

/**
 * Clear known non-essential cookies (best-effort cleanup)
 */
export function clearNonEssentialCookies(): void {
  // Google Analytics cookies
  const gaCookies = ['_ga', '_gid', '_gat'];
  gaCookies.forEach((name) => {
    deleteCookie(name);
    // GA cookies may be set on the root domain
    const domain = window.location.hostname.split('.').slice(-2).join('.');
    deleteCookie(name, `.${domain}`);
  });
  
  // Find and delete _ga_* cookies (GA4 measurement ID specific)
  if (typeof document !== 'undefined') {
    document.cookie.split(';').forEach((cookie) => {
      const name = cookie.split('=')[0].trim();
      if (name.startsWith('_ga_')) {
        deleteCookie(name);
        const domain = window.location.hostname.split('.').slice(-2).join('.');
        deleteCookie(name, `.${domain}`);
      }
    });
  }
  
  // Microsoft Clarity cookies
  const clarityCookies = ['_clck', '_clsk'];
  clarityCookies.forEach((name) => {
    deleteCookie(name);
    const domain = window.location.hostname.split('.').slice(-2).join('.');
    deleteCookie(name, `.${domain}`);
  });
  
  // GTM/marketing related
  const marketingCookies = ['_gcl_au', '_fbp', '_fbc'];
  marketingCookies.forEach((name) => {
    deleteCookie(name);
    const domain = window.location.hostname.split('.').slice(-2).join('.');
    deleteCookie(name, `.${domain}`);
  });
}
