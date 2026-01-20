import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EbookDownloadSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-br from-compliance-50 via-white to-innovation-50 rounded-2xl p-8 md:p-12 mb-12 shadow-lg border border-slate-100">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left column - text + download button */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              {t('blog.ebookSection.title')}
            </h2>
            <p className="text-lg text-slate-600">
              {t('blog.ebookSection.subtitle')}
            </p>
          </div>

          {/* Direct download button - no form, no API, no blocking */}
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <a 
              href="/downloads/compliance-kalendarz-2026.pdf" 
              download="Compliance-Kalendarz-2026.pdf"
            >
              <Download className="mr-2 h-4 w-4" />
              {t('blog.ebookSection.downloadButton')}
            </a>
          </Button>
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
