import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Cookie, Settings } from 'lucide-react';

export function CookieConsentBanner() {
  const { showBanner, acceptAll, rejectNonEssential, openPreferences } = useCookieConsent();
  const { t, currentLocale } = useLanguage();

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
      className="fixed bottom-0 left-0 right-0 z-[100] bg-background border-t border-border shadow-lg animate-in slide-in-from-bottom duration-300"
    >
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center gap-2">
            <Cookie className="h-5 w-5 text-primary" />
            <h2 id="cookie-banner-title" className="text-lg font-semibold text-foreground">
              {t('cookieConsent.banner.title')}
            </h2>
          </div>

          {/* Description */}
          <p id="cookie-banner-description" className="text-sm text-muted-foreground leading-relaxed">
            {t('cookieConsent.banner.description')}
          </p>

          {/* Links */}
          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              to={`/${currentLocale}/legal/privacy`}
              className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            >
              {t('footer.legal.privacy')}
            </Link>
            <Link
              to={`/${currentLocale}/legal/cookies`}
              className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            >
              {t('footer.legal.cookies')}
            </Link>
          </div>

          {/* Buttons - equal visual weight, no dark patterns */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={acceptAll}
              variant="default"
              className="flex-1 sm:flex-none"
            >
              {t('cookieConsent.banner.acceptAll')}
            </Button>
            <Button
              onClick={rejectNonEssential}
              variant="outline"
              className="flex-1 sm:flex-none"
            >
              {t('cookieConsent.banner.rejectNonEssential')}
            </Button>
            <Button
              onClick={openPreferences}
              variant="outline"
              className="flex-1 sm:flex-none"
            >
              <Settings className="h-4 w-4 mr-2" />
              {t('cookieConsent.banner.managePreferences')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
