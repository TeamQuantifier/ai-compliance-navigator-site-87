import { Locale } from '@/i18n/config';

export const PARTNERS_PATHS: Record<Locale, string> = {
  en: '/partners',
  pl: '/partnerzy',
  cs: '/partneři',
};

export const GS1_PARTNER_PATHS: Record<Locale, string> = {
  en: '/partners/gs1-polska',
  pl: '/partnerzy/gs1-polska',
  cs: '/partneři/gs1-polska',
};

const LOCALIZED_SEGMENTS: Record<string, Record<Locale, string>> = {
  partners: PARTNERS_PATHS,
  partnerzy: PARTNERS_PATHS,
  'partneři': PARTNERS_PATHS,
  partneri: PARTNERS_PATHS,
  'partners/gs1-polska': GS1_PARTNER_PATHS,
  'partnerzy/gs1-polska': GS1_PARTNER_PATHS,
  'partneři/gs1-polska': GS1_PARTNER_PATHS,
  'partneri/gs1-polska': GS1_PARTNER_PATHS,
  'szkolenia-cyberbezpieczenstwo-dla-firm': {
    pl: '/szkolenia-cyberbezpieczenstwo-dla-firm',
    en: '/cybersecurity-training-for-companies',
    cs: '/skoleni-kyberneticka-bezpecnost-pro-firmy',
  },
  'cybersecurity-training-for-companies': {
    pl: '/szkolenia-cyberbezpieczenstwo-dla-firm',
    en: '/cybersecurity-training-for-companies',
    cs: '/skoleni-kyberneticka-bezpecnost-pro-firmy',
  },
  'skoleni-kyberneticka-bezpecnost-pro-firmy': {
    pl: '/szkolenia-cyberbezpieczenstwo-dla-firm',
    en: '/cybersecurity-training-for-companies',
    cs: '/skoleni-kyberneticka-bezpecnost-pro-firmy',
  },
};

export const normalizePathKey = (path: string) => decodeURIComponent(path).replace(/^\/|\/$/g, '');

export const getLocalizedPath = (path: string, locale: Locale): string => {
  const cleanPath = normalizePathKey(path);
  return LOCALIZED_SEGMENTS[cleanPath]?.[locale] ?? (path.startsWith('/') ? path : `/${path}`);
};

export const getLocalizedPathWithLocale = (path: string, locale: Locale): string => `/${locale}${getLocalizedPath(path, locale)}`;

export const getLocalizedAlternates = (path: string): Array<{ locale: Locale; path: string }> | null => {
  const cleanPath = normalizePathKey(path);
  const routes = LOCALIZED_SEGMENTS[cleanPath];
  if (!routes) return null;
  return (Object.keys(routes) as Locale[]).map((locale) => ({ locale, path: routes[locale] }));
};
