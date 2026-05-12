import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Landmark,
  Cpu,
  Factory,
  Truck,
  ShoppingBag,
  HeartPulse,
  Zap,
  Scale as ScaleIcon,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";

type IndustryConfig = {
  id: string;
  icon: LucideIcon;
};

const INDUSTRIES_CONFIG: IndustryConfig[] = [
  { id: "finance", icon: Landmark },
  { id: "tech", icon: Cpu },
  { id: "industry", icon: Factory },
  { id: "tsl", icon: Truck },
  { id: "retail", icon: ShoppingBag },
  { id: "health", icon: HeartPulse },
  { id: "energy", icon: Zap },
  { id: "services", icon: ScaleIcon },
];

export default function IndustryWhySection({ currentLocale }: { currentLocale: string }) {
  const { t } = useLanguage();
  const [active, setActive] = useState<string>("tech");
  
  const currentConfig = INDUSTRIES_CONFIG.find((i) => i.id === active) ?? INDUSTRIES_CONFIG[0];
  const Icon = currentConfig.icon;
  
  const translatedCurrent = t(`iso27001Page.industryWhy.industries.${currentConfig.id}`, { returnObjects: true }) as any;

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <Badge className="bg-brand-purple text-white mb-4">{t("iso27001Page.industryWhy.badge")}</Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-4">
          {t("iso27001Page.industryWhy.title")}
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          {t("iso27001Page.industryWhy.description")}
        </p>
      </div>

      {/* Industry pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {INDUSTRIES_CONFIG.map((ind) => {
          const IndIcon = ind.icon;
          const isActive = ind.id === active;
          const translatedInd = t(`iso27001Page.industryWhy.industries.${ind.id}`, { returnObjects: true }) as any;
          return (
            <button
              key={ind.id}
              onClick={() => setActive(ind.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                isActive
                  ? "bg-brand-blue-dark text-white border-brand-blue-dark shadow-md"
                  : "bg-white text-slate-700 border-slate-200 hover:border-brand-blue hover:text-brand-blue-dark"
              }`}
              aria-pressed={isActive}
            >
              <IndIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{translatedInd.label}</span>
              <span className="sm:hidden">{translatedInd.short}</span>
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      <div key={currentConfig.id} className="animate-fade-in">
          <Card className="border-brand-gray-light bg-gradient-to-br from-white to-brand-gray-light/30 overflow-hidden">
            <CardContent className="p-6 md:p-10">
              {/* Header row */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 pb-6 border-b border-slate-200">
                <div className="w-14 h-14 rounded-xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-7 w-7 text-brand-blue-dark" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-brand-blue-dark">{translatedCurrent.label}</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {t("iso27001Page.industryWhy.mainDriver")}: <span className="font-medium">{translatedCurrent.driver}</span>
                  </p>
                </div>
              </div>

              {/* Two columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <h4 className="font-semibold text-brand-blue-dark">{t("iso27001Page.industryWhy.yourChallenges")}</h4>
                  </div>
                  <ul className="space-y-3">
                    {(translatedCurrent.challenges || []).map((c: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                        <span className="text-amber-600 mt-0.5">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="h-5 w-5 text-brand-blue" />
                    <h4 className="font-semibold text-brand-blue-dark">
                      {t("iso27001Page.industryWhy.whatYouGain")}
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {(translatedCurrent.benefits || []).map((b: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                        <CheckCircle className="h-4 w-4 text-brand-blue mt-0.5 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Example */}
              <div className="bg-brand-blue/5 border-l-4 border-brand-blue rounded-r-lg p-5 mb-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-brand-blue mb-2">
                  {t("iso27001Page.industryWhy.concreteExample")}
                </div>
                <p className="text-slate-700 italic">„{translatedCurrent.example}"</p>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="bg-brand-blue-dark text-white hover:bg-brand-blue-dark/90"
                >
                  <Link to={`/${currentLocale}/contact`}>
                    {t("iso27001Page.industryWhy.bookDemo")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="hover:text-brand-blue-dark">
                  <Link to={`/${currentLocale}/cybersecurity-check`}>
                    {t("iso27001Page.industryWhy.checkReadiness")}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
      </div>
    </section>
  );
}
