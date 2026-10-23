import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Locale-aware copy for product UI mockups (dashboards, wizards, tables).
 *
 * Mockup copy lives in component files rather than the translation bundles, so
 * it uses this helper instead of `t('key')`. English is the required fallback;
 * `pl` / `cs` are optional and fall back to English when absent.
 *
 * Usage:
 *   const mt = useMockupText();
 *   <span>{mt({ en: 'Compliance Dashboard', pl: 'Panel zgodności' })}</span>
 */
export type MockupText = { en: string; pl?: string; cs?: string };

export const useMockupText = () => {
  const { currentLocale } = useLanguage();
  return (text: MockupText) =>
    (text as Record<string, string>)[currentLocale] || text.en;
};
