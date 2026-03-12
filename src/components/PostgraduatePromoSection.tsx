import { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const RECRUITMENT_URL = 'https://www.podyplomowe.ue.wroc.pl/studia.html?f[c][6]=1&f[c][5]=1&f[c][4]=1&f[a][23]=1&f[a][28]=1&f[a][24]=1&f[a][6]=1&f[a][13]=1&f[a][10]=1&f[a][25]=1&f[a][1]=1&f[a][11]=1&f[a][9]=1&f[m][blended]=1&f[m][online]=1';

const CONTENT: Record<string, { badge: string; title: string; description: string; cta: string; image: string; alt: string }> = {
  pl: {
    badge: 'Studia podyplomowe',
    title: 'Współtworzymy kierunek na Uniwersytecie Ekonomicznym we Wrocławiu',
    description: 'Zespół Quantifier współtworzy kierunek „GRC z wykorzystaniem AI: Governance, Risk & Compliance w nowoczesnych organizacjach" na studiach podyplomowych Uniwersytetu Ekonomicznego we Wrocławiu. Łączymy praktykę biznesową z najnowszą wiedzą akademicką.',
    cta: 'Dowiedz się więcej',
    image: '/lovable-uploads/studia-podyplomowe-grc-wykladowcy.png',
    alt: 'Wykładowcy studiów podyplomowych GRC z wykorzystaniem AI — Quantifier.ai i Uniwersytet Ekonomiczny we Wrocławiu',
  },
  en: {
    badge: 'Postgraduate programme',
    title: 'We co-create a programme at the Wrocław University of Economics',
    description: 'The Quantifier team co-creates the "GRC with the Use of AI: Governance, Risk & Compliance in Modern Organisations" postgraduate programme at the Wrocław University of Economics. We combine business practice with cutting-edge academic knowledge.',
    cta: 'Find out more',
    image: '/lovable-uploads/studia-podyplomowe-grc-wykladowcy-en.jpg',
    alt: 'Lecturers of the GRC with AI postgraduate programme — Quantifier.ai and Wrocław University of Economics',
  },
  cs: {
    badge: 'Postgraduální studium',
    title: 'Spoluvytváříme program na Ekonomické univerzitě ve Vratislavi',
    description: 'Tým Quantifier spoluvytváří program „GRC s využitím AI: Governance, Risk & Compliance v moderních organizacích" na postgraduálním studiu Ekonomické univerzity ve Vratislavi. Spojujeme obchodní praxi s nejnovějšími akademickými poznatky.',
    cta: 'Zjistěte více',
    image: '/lovable-uploads/studia-podyplomowe-grc-wykladowcy-cs.jpg',
    alt: 'Vyučující postgraduálního programu GRC s využitím AI — Quantifier.ai a Ekonomická univerzita ve Vratislavi',
  },
};

export function PostgraduatePromoSection() {
  const [zoomed, setZoomed] = useState(false);
  const { currentLocale } = useLanguage();
  const c = CONTENT[currentLocale] || CONTENT.en;

  return (
    <>
      <div className="bg-gradient-to-r from-compliance-50 to-slate-50 rounded-xl p-6 md:p-8 mb-8 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="shrink-0">
            <img
              src={c.image}
              alt={c.alt}
              className="w-full md:w-[600px] rounded-lg object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
              width={600}
              height={338}
              loading="lazy"
              onDoubleClick={() => setZoomed(true)}
            />
          </div>

          <div className="text-center md:text-right flex-1">
            <div className="flex items-center justify-center md:justify-end gap-2 text-primary mb-3">
              <GraduationCap className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wide">
                {c.badge}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              {c.title}
            </h3>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl md:ml-auto mb-4">
              {c.description}
            </p>

            <a href={RECRUITMENT_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg">
                {c.cta}
              </Button>
            </a>
          </div>
        </div>
      </div>

      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 cursor-pointer"
          onClick={() => setZoomed(false)}
        >
          <img
            src={c.image}
            alt={c.alt}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
