import { useLanguage } from '@/contexts/LanguageContext';
import { Book } from 'lucide-react';

export function BookPromoSection() {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-slate-50 to-compliance-50 rounded-xl p-6 md:p-8 mb-8 shadow-sm border border-slate-100">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
        {/* Book Image */}
        <div className="shrink-0">
          <img 
            src="/lovable-uploads/book-analiza-podwojnej-istotnosci.png"
            alt="Analiza podwójnej istotności - książka"
            className="w-40 md:w-56 shadow-xl rounded-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Content */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-primary mb-3">
            <Book className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wide">
              {t('bookPromo.badge')}
            </span>
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
            {t('bookPromo.sectionTitle')}
          </h3>
          
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl">
            {t('bookPromo.description')}
          </p>
        </div>
      </div>
    </div>
  );
}
