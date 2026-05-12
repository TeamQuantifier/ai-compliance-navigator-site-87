import { X, Check } from "lucide-react";

const ROWS: { trad: string; q: string }[] = [
  { trad: "Excel + maile + foldery", q: "Jeden Data Lake, Leon zaciąga dowody sam" },
  { trad: "Dowody zbierane „pod audyt”", q: "Dowody odświeżane 24/7, zawsze świeże" },
  { trad: "Polityka — 3 miesiące pracy", q: "Polityka w 15 minut z biblioteki + e-IDAS" },
  { trad: "Audytor wchodzi = pożar", q: "Audytor wchodzi → 1 klik → pakiet PDF/XBRL" },
  { trad: "Compliance = projekt z deadline'em", q: "Compliance = stan ciągły, pętla ∞" },
];

const TraditionalVsQuantifier = () => {
  return (
    <section className="bg-slate-950 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Tradycyjny GRC vs Quantifier AI-Native
          </h2>
          <p className="text-white/70">
            To samo zadanie. Dwa zupełnie różne światy.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Traditional column */}
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs uppercase tracking-wider font-bold text-white/50">
                Tradycyjny GRC
              </span>
            </div>
            <ul className="space-y-3">
              {ROWS.map((r) => (
                <li key={r.trad} className="flex items-start gap-3 text-white/60">
                  <X className="h-5 w-5 text-rose-400/70 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{r.trad}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quantifier column */}
          <div className="relative rounded-2xl bg-gradient-to-br from-emerald-500/15 via-blue-500/10 to-purple-500/15 border border-emerald-400/30 p-6 md:p-8 shadow-[0_20px_60px_-20px_rgba(16,185,129,0.4)]">
            <div className="absolute -top-3 left-6 bg-gradient-to-r from-emerald-400 to-blue-400 text-slate-950 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Quantifier AI-Native
            </div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs uppercase tracking-wider font-bold text-white">
                Continuous Compliance
              </span>
            </div>
            <ul className="space-y-3">
              {ROWS.map((r) => (
                <li key={r.q} className="flex items-start gap-3 text-white">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{r.q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TraditionalVsQuantifier;
