import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Book } from 'lucide-react';

const STORAGE_KEY = 'book_promo_shown';
const POPUP_DELAY_MS = 2000;

export function BookPromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLocale, t } = useLanguage();

  useEffect(() => {
    // Check if already shown in this session
    const hasBeenShown = sessionStorage.getItem(STORAGE_KEY) === 'true';
    if (hasBeenShown) return;

    // Show after delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, POPUP_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem(STORAGE_KEY, 'true');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Book Image */}
          <div className="md:w-2/5 bg-gradient-to-br from-slate-100 to-compliance-50 p-6 flex items-center justify-center">
            <img 
              src="/lovable-uploads/book-analiza-podwojnej-istotnosci.png"
              alt="Analiza podwójnej istotności - książka"
              className="w-48 md:w-full max-w-[200px] shadow-xl rounded-lg transform hover:scale-105 transition-transform duration-300"
              width={200}
              height={280}
              loading="lazy"
            />
          </div>
          
          {/* Content */}
          <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-primary mb-3">
              <Book className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wide">
                {t('bookPromo.badge')}
              </span>
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
              {currentLocale === 'pl' 
                ? 'Zapraszamy do zapoznania się z naszą publikacją wydaną przez oficynę C.H. Beck.' 
                : 'Check out our publication released by the C.H. Beck publishing house.'}
            </h2>
            
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
              {t('bookPromo.description')}
            </p>
            
            <Link to={`/${currentLocale}/success-stories`} onClick={handleClose}>
              <Button className="w-full md:w-auto" size="lg">
                {t('bookPromo.cta')}
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
