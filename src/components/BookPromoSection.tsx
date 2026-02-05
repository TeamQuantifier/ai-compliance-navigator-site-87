import { useLanguage } from '@/contexts/LanguageContext';
import { Book } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BOOKSTORE_URL = 'https://www.ksiegarnia.beck.pl/23374-analiza-podwojnej-istotnosci-praktyczny-przewodnik-w-sprawozdawczosci-firm-weronika-czaplewska';

export function BookPromoSection() {
  const { currentLocale, t } = useLanguage();

  // Fallback translations in case i18n hasn't loaded yet
  const badge = t('bookPromo.badge') !== 'bookPromo.badge' 
    ? t('bookPromo.badge') 
    : currentLocale === 'pl' ? 'Nowa publikacja' : 'New publication';
  
  const sectionTitle = t('bookPromo.sectionTitle') !== 'bookPromo.sectionTitle' 
    ? t('bookPromo.sectionTitle') 
    : currentLocale === 'pl' ? 'Zapraszamy do zapoznania się z naszą publikacją wydaną przez oficynę C.H. Beck.' : 'Check out our publication released by the C.H. Beck publishing house.';
  
  const description = t('bookPromo.description') !== 'bookPromo.description' 
    ? t('bookPromo.description') 
    : currentLocale === 'pl' 
      ? 'Książka pokazuje praktyczne podejście do analizy krok po kroku, wzbogacone o case study oparte na setkach projektów ESG zrealizowanych przez zespół Envirly by Quantifier.'
      : 'This book presents a practical step-by-step approach to analysis, enriched with case studies based on hundreds of ESG projects completed by the Envirly by Quantifier team.';
  
  const cta = t('bookPromo.cta') !== 'bookPromo.cta' 
    ? t('bookPromo.cta') 
    : currentLocale === 'pl' ? 'Zobacz książkę' : 'See the book';

  return (
    <div className="bg-gradient-to-r from-slate-50 to-compliance-50 rounded-xl p-6 md:p-8 mb-8 shadow-sm border border-slate-100">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
        {/* Content - left side on desktop */}
        <div className="text-center md:text-left flex-1">
          <div className="flex items-center justify-center md:justify-start gap-2 text-primary mb-3">
            <Book className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wide">
              {badge}
            </span>
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
            {sectionTitle}
          </h3>
          
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl mb-4">
            {description}
          </p>
          
          <a href={BOOKSTORE_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg">
              {cta}
            </Button>
          </a>
        </div>

        {/* Book Image - right side on desktop, top on mobile */}
        <div className="shrink-0 order-first md:order-last">
          <img 
            src="/lovable-uploads/book-analiza-podwojnej-istotnosci.png"
            alt="Analiza podwójnej istotności - książka"
            className="w-48 md:w-64 object-contain transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}
