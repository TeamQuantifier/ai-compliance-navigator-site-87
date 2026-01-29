import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { useLanguage } from '@/contexts/LanguageContext';

export function CookieConsentBanner() {
  const { showBanner, acceptAll } = useCookieConsent();
  const { t, currentLocale } = useLanguage();

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      className="fixed bottom-0 left-0 right-0 z-[100] bg-background border-t border-border shadow-lg animate-in slide-in-from-bottom duration-300"
    >
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            {t('cookieConsent.banner.simpleDescription')}{' '}
            <Link
              to={`/${currentLocale}/legal/privacy`}
              className="text-primary hover:underline"
            >
              {t('footer.legal.privacy')}
            </Link>
          </p>
          <Button onClick={acceptAll} size="sm" className="shrink-0">
            {t('cookieConsent.banner.accept')}
          </Button>
        </div>
      </div>
    </div>
  );
}
