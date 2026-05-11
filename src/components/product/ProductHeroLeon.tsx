import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import leonOfficer from "@/assets/leon-compliance-officer.png";

const ProductHeroLeon = () => {
  const { currentLocale } = useLanguage();
  return (
    <section className="relative -mt-12 pt-24 pb-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute top-20 -left-40 h-[500px] w-[500px] rounded-full bg-purple-500/15 blur-[120px]" />
        <div className="absolute bottom-10 right-0 h-[500px] w-[500px] rounded-full bg-emerald-500/15 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-12 items-center">
          {/* Text */}
          <div>
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 backdrop-blur text-white text-xs font-semibold px-3 py-1 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              AI-Native GRC · Continuous Compliance
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
              Compliance, który{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                nigdy nie śpi
              </span>
              .
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
              Quantifier to system klasy AI-Native GRC. Leon — wirtualny Compliance Officer — monitoruje, integruje, automatyzuje i przygotowuje raporty audytowe 24/7. Ty zatwierdzasz. On robi resztę.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Button size="lg" className="bg-white text-slate-950 hover:bg-white/90" asChild>
                <Link to={`/${currentLocale}/contact/`}>
                  Umów demo z Leonem
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link to={`/${currentLocale}/cybersecurity-check/`}>Sprawdź gotowość NIS2</Link>
              </Button>
            </div>

            {/* KPI pills */}
            <div className="grid grid-cols-3 gap-3 max-w-xl">
              {[
                { v: "24/7", l: "monitoring" },
                { v: "15 min", l: "na politykę" },
                { v: "1 klik", l: "= pakiet audytora" },
              ].map((k) => (
                <div
                  key={k.l}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 backdrop-blur"
                >
                  <div className="text-xl md:text-2xl font-bold text-white">{k.v}</div>
                  <div className="text-[11px] md:text-xs text-white/70 uppercase tracking-wide">
                    {k.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leon */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px]">
              {/* Animated halos */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/30 via-blue-400/25 to-purple-400/30 blur-2xl animate-pulse" />
              <div
                className="absolute inset-2 rounded-full opacity-70 blur-md"
                style={{
                  background:
                    "conic-gradient(from 0deg, hsl(160 84% 60%), hsl(210 90% 65%), hsl(270 80% 70%), hsl(160 84% 60%))",
                  animation: "spin 12s linear infinite",
                }}
              />
              {/* Inner ring */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-slate-800 via-slate-900 to-black shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 rounded-full ring-1 ring-white/10" />
                <img
                  src={leonOfficer}
                  alt="Leon — wirtualny Compliance Officer"
                  className="h-[78%] w-[78%] object-contain"
                />
              </div>
              {/* Status pill */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-950/90 border border-white/20 backdrop-blur px-3 py-1.5 rounded-full whitespace-nowrap">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-xs font-semibold text-white">
                  Leon · online · monitoruje 27 frameworków
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHeroLeon;
