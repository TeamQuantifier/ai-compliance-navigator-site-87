import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RECRUITMENT_URL = 'https://www.podyplomowe.ue.wroc.pl/kierunki/grc-z-wykorzystaniem-ai-governance-risk-compliance-w-nowoczesnych-organizacjach,k541.html';

export function PostgraduatePromoSection() {
  return (
    <div className="bg-gradient-to-r from-compliance-50 to-slate-50 rounded-xl p-6 md:p-8 mb-8 shadow-sm border border-slate-100">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
        {/* Image - left side on desktop, top on mobile */}
        <div className="shrink-0">
          <img
            src="/lovable-uploads/studia-podyplomowe-wroclaw.jpg"
            alt="Studia podyplomowe GRC z wykorzystaniem AI — Uniwersytet Ekonomiczny we Wrocławiu"
            className="w-64 md:w-80 rounded-lg object-cover hover:scale-105 transition-transform duration-300"
            width={320}
            height={450}
            loading="lazy"
          />
        </div>

        {/* Content - right side on desktop */}
        <div className="text-center md:text-left flex-1">
          <div className="flex items-center justify-center md:justify-start gap-2 text-primary mb-3">
            <GraduationCap className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wide">
              Studia podyplomowe
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
            Współtworzymy kierunek na Uniwersytecie Ekonomicznym we Wrocławiu
          </h3>

          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl mb-4">
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
  );
}
