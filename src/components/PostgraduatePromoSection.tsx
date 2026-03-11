import { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RECRUITMENT_URL = 'https://www.podyplomowe.ue.wroc.pl/studia.html?f[c][6]=1&f[c][5]=1&f[c][4]=1&f[a][23]=1&f[a][28]=1&f[a][24]=1&f[a][6]=1&f[a][13]=1&f[a][10]=1&f[a][25]=1&f[a][1]=1&f[a][11]=1&f[a][9]=1&f[m][blended]=1&f[m][online]=1';

export function PostgraduatePromoSection() {
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-r from-compliance-50 to-slate-50 rounded-xl p-6 md:p-8 mb-8 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* Image - left side on desktop, top on mobile */}
          <div className="shrink-0">
            <img
              src="/lovable-uploads/studia-podyplomowe-wroclaw.jpg"
              alt="Studia podyplomowe GRC z wykorzystaniem AI — Uniwersytet Ekonomiczny we Wrocławiu"
              className="w-80 md:w-[440px] rounded-lg object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
              width={384}
              height={540}
              loading="lazy"
              onDoubleClick={() => setZoomed(true)}
            />
          </div>

          {/* Content - right side on desktop, right-aligned */}
          <div className="text-center md:text-right flex-1">
            <div className="flex items-center justify-center md:justify-end gap-2 text-primary mb-3">
              <GraduationCap className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wide">
                Studia podyplomowe
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Współtworzymy kierunek na Uniwersytecie Ekonomicznym we Wrocławiu
            </h3>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl md:ml-auto mb-4">
              Zespół Quantifier współtworzy kierunek „GRC z wykorzystaniem AI: Governance, Risk &amp; Compliance
              w nowoczesnych organizacjach" na studiach podyplomowych Uniwersytetu Ekonomicznego we Wrocławiu.
              Łączymy praktykę biznesową z najnowszą wiedzą akademicką.
            </p>

            <a href={RECRUITMENT_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg">
                Dowiedz się więcej
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox overlay */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 cursor-pointer"
          onClick={() => setZoomed(false)}
        >
          <img
            src="/lovable-uploads/studia-podyplomowe-wroclaw.jpg"
            alt="Studia podyplomowe GRC z wykorzystaniem AI — Uniwersytet Ekonomiczny we Wrocławiu"
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
