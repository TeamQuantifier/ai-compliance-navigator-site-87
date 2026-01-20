import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { newsletterClient } from '@/lib/newsletter-client';
import { Link } from 'react-router-dom';

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const EbookDownloadSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { currentLocale } = useLanguage();
  
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !isValidEmail(email)) {
      toast({ variant: 'destructive', title: t('blog.ebookSection.emailRequired') });
      return;
    }
    
    if (!consent) {
      toast({ variant: 'destructive', title: t('blog.ebookSection.consentRequired') });
      return;
    }
    
    setIsLoading(true);
    
    // Show dialog immediately - don't wait for API
    setShowSuccessDialog(true);
    setEmail('');
    setConsent(false);
    setIsLoading(false);
    
    // Newsletter subscription in background - fire-and-forget
    newsletterClient.subscribe(email, currentLocale, {
      source: 'compliance_calendar_2026',
      origin: window.location.origin,
      tags: ['ebook', 'compliance_calendar_2026']
    }).catch(console.error);
  };

  return (
    <>
      <section className="bg-gradient-to-br from-compliance-50 via-white to-innovation-50 rounded-2xl p-8 md:p-12 mb-12 shadow-lg border border-slate-100">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left column - form */}
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
              <Input
                type="email"
                placeholder={t('blog.ebookSection.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white"
                disabled={isLoading}
              />
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consent"
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(checked as boolean)}
                  disabled={isLoading}
                  className="mt-1"
                />
                <label htmlFor="consent" className="text-sm text-slate-600 leading-tight cursor-pointer">
                  {t('blog.ebookSection.consent')}{' '}
                  <Link to={`/${currentLocale}/legal/privacy`} className="text-primary hover:underline">
                    {t('blog.ebookSection.privacyPolicy')}
                  </Link>
                  {' '}{t('blog.ebookSection.and')}{' '}
                  <Link to={`/${currentLocale}/legal/terms`} className="text-primary hover:underline">
                    {t('blog.ebookSection.termsOfService')}
                  </Link>
                  .
                </label>
              </div>
              
              <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
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

      {/* Success Dialog with DIRECT download link */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <DialogTitle className="text-xl">
                {t('blog.ebookSection.successDialog.title')}
              </DialogTitle>
            </div>
            <DialogDescription>
              {t('blog.ebookSection.successDialog.description')}
            </DialogDescription>
          </DialogHeader>
          
          {/* Direct download link - no JavaScript, no API, no blocking */}
          <div className="bg-slate-50 p-4 rounded-lg border mt-4">
            <Button asChild size="lg" className="w-full">
              <a 
                href="/downloads/compliance-kalendarz-2026.pdf" 
                download="Compliance-Kalendarz-2026.pdf"
              >
                <Download className="mr-2 h-5 w-5" />
                {t('blog.ebookSection.successDialog.downloadLink')}
              </a>
            </Button>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowSuccessDialog(false)}>
              {t('blog.ebookSection.successDialog.close') || 'Zamknij'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EbookDownloadSection;
