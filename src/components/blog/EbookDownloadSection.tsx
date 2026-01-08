import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { newsletterClient } from '@/lib/newsletter-client';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, Loader2 } from 'lucide-react';

const EbookDownloadSection = () => {
  const { currentLocale } = useLanguage();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !isValidEmail(email)) {
      toast({
        variant: 'destructive',
        title: t('blog.ebookSection.emailRequired'),
      });
      return;
    }

    if (!consent) {
      toast({
        variant: 'destructive',
        title: t('blog.ebookSection.consentRequired'),
      });
      return;
    }

    setIsLoading(true);
    
    // Try to subscribe to newsletter (but don't block PDF download on failure)
    try {
      await newsletterClient.subscribe(email, currentLocale, {
        source: 'compliance_calendar_2026',
        origin: window.location.origin,
        tags: ['ebook', 'compliance_calendar_2026']
      });
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
      // Continue anyway - allow PDF download
    }

    // Always trigger PDF download
    const link = document.createElement('a');
    link.href = '/downloads/compliance-kalendarz-2026.pdf';
    link.download = 'Compliance-Kalendarz-2026.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: t('blog.ebookSection.successTitle'),
      description: t('blog.ebookSection.successDesc'),
    });

    // Reset form
    setEmail('');
    setConsent(false);
    setIsLoading(false);
  };

  return (
    <section className="bg-gradient-to-br from-compliance-50 via-white to-innovation-50 rounded-2xl p-8 md:p-12 mb-12 shadow-lg border border-slate-100">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left column - text + form */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              {t('blog.ebookSection.title')}
            </h2>
            <p className="text-lg text-slate-600">
              {t('blog.ebookSection.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t('blog.ebookSection.formTitle')}
              </label>
              <Input
                type="email"
                placeholder={t('blog.ebookSection.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                disabled={isLoading}
              />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(checked) => setConsent(checked === true)}
                disabled={isLoading}
                className="mt-1"
              />
              <label htmlFor="consent" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                {t('blog.ebookSection.consent')}{' '}
                <Link 
                  to={`/${currentLocale}/legal/privacy`} 
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  {t('blog.ebookSection.privacyPolicy')}
                </Link>
                {' '}{currentLocale === 'pl' ? 'oraz' : 'and'}{' '}
                <Link 
                  to={`/${currentLocale}/legal/terms`} 
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  {t('blog.ebookSection.termsOfService')}
                </Link>
              </label>
            </div>

            <Button 
              type="submit" 
              size="lg"
              disabled={isLoading}
              className="w-full md:w-auto bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('blog.ebookSection.downloading')}
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  {t('blog.ebookSection.downloadButton')}
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Right column - image */}
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/compliance-calendar-2026-new.png" 
            alt="Compliance Kalendarz 2026"
            className="max-w-xs md:max-w-sm h-auto drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default EbookDownloadSection;
