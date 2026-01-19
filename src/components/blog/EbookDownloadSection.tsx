import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { newsletterClient } from '@/lib/newsletter-client';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, Loader2, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const EbookDownloadSection = () => {
  const { currentLocale } = useLanguage();
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNis2Dialog, setShowNis2Dialog] = useState(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: FormEvent) => {
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

    // IMMEDIATELY show dialog with download link
    setShowNis2Dialog(true);
    
    // Store email for background subscription
    const emailToSubscribe = email;
    
    // Reset form immediately
    setEmail('');
    setConsent(false);
    
    // Fire-and-forget: subscribe to newsletter in background (don't block UI)
    newsletterClient.subscribe(emailToSubscribe, currentLocale, {
      source: 'compliance_calendar_2026',
      origin: window.location.origin,
      tags: ['ebook', 'compliance_calendar_2026']
    }).catch(error => {
      console.error('Newsletter subscription failed:', error);
      // Ignore errors - user already got the download link
    });
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
                {' '}{t('blog.ebookSection.and')}{' '}
                <Link 
                  to={`/${currentLocale}/legal/terms`} 
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  {t('blog.ebookSection.termsOfService')}
                </Link>
                {'.'}
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

      {/* Success + Download + NIS2 Dialog */}
      <Dialog open={showNis2Dialog} onOpenChange={setShowNis2Dialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 p-2.5 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <DialogTitle className="text-xl">
                {t('blog.ebookSection.successDialog.title')}
              </DialogTitle>
            </div>
            <DialogDescription className="text-base leading-relaxed">
              {t('blog.ebookSection.successDialog.description')}
            </DialogDescription>
          </DialogHeader>
          
          {/* Download link - user clicks to download (avoids Safe Browsing blocks) */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <a 
              href="/downloads/compliance-kalendarz-2026.pdf"
              download="Compliance-Kalendarz-2026.pdf"
              className="flex items-center gap-2 text-primary hover:underline font-medium"
            >
              <Download className="h-5 w-5" />
              {t('blog.ebookSection.successDialog.downloadLink')}
            </a>
          </div>

          <div className="pt-2">
            <p className="text-sm text-muted-foreground mb-3">
              {t('blog.ebookSection.nis2Dialog.description')}
            </p>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2 mt-2">
            <Button 
              variant="outline" 
              onClick={() => setShowNis2Dialog(false)}
              className="w-full sm:w-auto"
            >
              {t('blog.ebookSection.nis2Dialog.close')}
            </Button>
            <Button 
              onClick={() => {
                setShowNis2Dialog(false);
                navigate(`/${currentLocale}/frameworks/cybersecurity/nis-ii`);
              }}
              className="w-full sm:w-auto"
            >
              {t('blog.ebookSection.nis2Dialog.goToNis2')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EbookDownloadSection;
