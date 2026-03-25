import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'postgraduate_promo_shown';
const POPUP_DELAY_MS = 2000;

const CONTENT: Record<string, { badge: string; title: string; description: string; cta: string; image: string; alt: string }> = {
  pl: {
    badge: 'Studia podyplomowe',
    title: 'Współtworzymy kierunek na Uniwersytecie Ekonomicznym we Wrocławiu',
    description: 'Zespół Quantifier współtworzy kierunek „GRC z wykorzystaniem AI" na studiach podyplomowych Uniwersytetu Ekonomicznego we Wrocławiu.',
    cta: 'Dowiedz się więcej',
    image: '/lovable-uploads/studia-podyplomowe-grc-wykladowcy.png',
    alt: 'Wykładowcy studiów podyplomowych GRC z wykorzystaniem AI',
  },
  en: {
    badge: 'Postgraduate programme',
    title: 'We co-create a programme at the Wrocław University of Economics',
    description: 'The Quantifier team co-creates the "GRC with the Use of AI" postgraduate programme at the Wrocław University of Economics.',
    cta: 'Find out more',
    image: '/lovable-uploads/studia-podyplomowe-grc-wykladowcy-en.jpg',
    alt: 'Lecturers of the GRC with AI postgraduate programme',
  },
  cs: {
    badge: 'Postgraduální studium',
    title: 'Spoluvytváříme program na Ekonomické univerzitě ve Vratislavi',
    description: 'Tým Quantifier spoluvytváří program „GRC s využitím AI" na postgraduálním studiu Ekonomické univerzity ve Vratislavi.',
    cta: 'Zjistěte více',
    image: '/lovable-uploads/studia-podyplomowe-grc-wykladowcy-cs.jpg',
    alt: 'Vyučující postgraduálního programu GRC s využitím AI',
  },
};

export function BookPromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLocale } = useLanguage();
  const navigate = useNavigate();
  const c = CONTENT[currentLocale] || CONTENT.en;

  useEffect(() => {
    const hasBeenShown = sessionStorage.getItem(STORAGE_KEY) === 'true';
    if (hasBeenShown) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, POPUP_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem(STORAGE_KEY, 'true');
  };

  const handleCta = () => {
    handleClose();
    navigate(`/${currentLocale}/about`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-3/5 bg-gradient-to-br from-compliance-50 to-slate-50 p-4 flex items-center justify-center">
            <img
              src={c.image}
              alt={c.alt}
              className="w-full h-auto rounded-lg object-cover shadow-sm"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="md:w-2/5 p-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-primary mb-3">
              <GraduationCap className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wide">
                {c.badge}
              </span>
            </div>

            <h2 className="text-lg md:text-xl font-bold text-foreground mb-3 leading-tight">
              {c.title}
            </h2>

            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              {c.description}
            </p>

            <Button className="w-full md:w-auto" size="default" onClick={handleCta}>
              {c.cta}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
