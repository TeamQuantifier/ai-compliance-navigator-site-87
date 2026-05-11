import { BarChart3, CheckCircle2, AlertTriangle, Globe, FileText, TrendingUp, Users, Shield, Clock, Factory, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Locale = "pl" | "en" | "cs";
type T = { pl: string; en: string; cs: string };

const useTr = () => {
  const { currentLocale } = useLanguage();
  const l = (currentLocale as Locale) || "en";
  return (n: T) => n[l] || n.en;
};

const Chrome = ({ url, badge }: { url: string; badge: string }) => (
  <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-slate-900/80">
    <div className="flex gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
    </div>
    <div className="flex-1 text-center">
      <span className="text-[10px] text-white/50 font-mono">{url}</span>
    </div>
    <span className="text-[9px] uppercase tracking-wider text-white/40 font-semibold">{badge}</span>
  </div>
);

const Shell = ({ children, url, badge }: { children: React.ReactNode; url: string; badge: string }) => (
  <div className="w-full rounded-xl bg-slate-950 border border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/5">
    <Chrome url={url} badge={badge} />
    {children}
  </div>
);

const Header = ({ icon: Icon, title, subtitle, accent = "text-emerald-300", live = "Live" }: any) => (
  <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-900/40">
    <div className="flex items-center gap-2">
      <Icon className={`h-5 w-5 ${accent}`} />
      <div>
        <div className="text-white text-sm font-semibold leading-tight">{title}</div>
        <div className="text-[10px] text-white/50">{subtitle}</div>
      </div>
    </div>
    <div className="h-6 px-2 rounded-md bg-emerald-500/20 border border-emerald-400/30 flex items-center text-[10px] text-emerald-200 font-medium">{live}</div>
  </div>
);

const Stat = ({ v, l, c = "text-emerald-300", Icon }: any) => (
  <div className="rounded-lg bg-white/5 border border-white/10 p-2.5">
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-white/50 uppercase tracking-wider">{l}</span>
      {Icon && <Icon className={`h-3 w-3 ${c}`} />}
    </div>
    <div className={`text-lg font-bold ${c} mt-0.5`}>{v}</div>
  </div>
);

const Bar = ({ label, val, color = "bg-emerald-400" }: any) => (
  <div>
    <div className="flex justify-between text-[10px] text-white/70 mb-1">
      <span>{label}</span>
      <span className="font-mono">{val}%</span>
    </div>
    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${val}%` }} />
    </div>
  </div>
);

export const CsrdDarkMockup = () => {
  const tr = useTr();
  return (
    <Shell url="platform.quantifier.ai/csrd" badge="CSRD">
      <Header icon={FileText}
        title={tr({ pl: "Dashboard CSRD / ESRS", en: "CSRD / ESRS dashboard", cs: "Dashboard CSRD / ESRS" })}
        subtitle={tr({ pl: "Raport 2025 · 12 ESRS · Podwójna istotność", en: "2025 report · 12 ESRS · Double materiality", cs: "Zpráva 2025 · 12 ESRS · Dvojí významnost" })}
        live={tr({ pl: "Live", en: "Live", cs: "Live" })} />
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-4 gap-2">
          <Stat v="78%" l={tr({ pl: "Zgodność", en: "Compliance", cs: "Shoda" })} c="text-emerald-300" Icon={CheckCircle2} />
          <Stat v="142" l={tr({ pl: "Datapointy", en: "Datapoints", cs: "Datapointy" })} c="text-sky-300" Icon={BarChart3} />
          <Stat v="9/12" l="ESRS" c="text-violet-300" Icon={Shield} />
          <Stat v="3" l={tr({ pl: "Luki", en: "Gaps", cs: "Mezery" })} c="text-amber-300" Icon={AlertTriangle} />
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <div className="text-[11px] text-white/70 font-semibold mb-2">{tr({ pl: "Pokrycie ESRS", en: "ESRS coverage", cs: "Pokrytí ESRS" })}</div>
          <div className="space-y-2">
            <Bar label={tr({ pl: "E1 Klimat", en: "E1 Climate", cs: "E1 Klima" })} val={92} />
            <Bar label={tr({ pl: "E2 Zanieczyszczenia", en: "E2 Pollution", cs: "E2 Znečištění" })} val={74} color="bg-sky-400" />
            <Bar label={tr({ pl: "S1 Pracownicy", en: "S1 Workforce", cs: "S1 Zaměstnanci" })} val={68} color="bg-violet-400" />
            <Bar label={tr({ pl: "G1 Zarządzanie", en: "G1 Governance", cs: "G1 Správa" })} val={88} color="bg-amber-400" />
          </div>
        </div>
        <div className="rounded-lg bg-emerald-500/10 border border-emerald-400/20 p-2.5 flex items-center gap-2">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
          <span className="text-[10px] text-emerald-100">{tr({ pl: "Ocena podwójnej istotności ukończona dla 18 tematów", en: "Double materiality assessment completed for 18 topics", cs: "Hodnocení dvojí významnosti dokončeno pro 18 témat" })}</span>
        </div>
      </div>
    </Shell>
  );
};

export const GriDarkMockup = () => {
  const tr = useTr();
  const months = tr({ pl: "Sty,Lut,Mar,Kwi,Maj,Cze", en: "Jan,Feb,Mar,Apr,May,Jun", cs: "Led,Úno,Bře,Dub,Kvě,Čer" }).split(",");
  return (
    <Shell url="platform.quantifier.ai/gri" badge="GRI">
      <Header icon={Globe}
        title={tr({ pl: "Trendy wydajności GRI", en: "GRI performance trends", cs: "Trendy výkonu GRI" })}
        subtitle={tr({ pl: "GRI Standards 2021 · 6 miesięcy", en: "GRI Standards 2021 · 6 months", cs: "GRI Standards 2021 · 6 měsíců" })}
        accent="text-sky-300"
        live={tr({ pl: "Live", en: "Live", cs: "Live" })} />
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <Stat v="+20%" l={tr({ pl: "Środowisko", en: "Environment", cs: "Životní prostředí" })} c="text-emerald-300" Icon={TrendingUp} />
          <Stat v="+15%" l={tr({ pl: "Społeczne", en: "Social", cs: "Sociální" })} c="text-sky-300" Icon={Users} />
          <Stat v="+10%" l={tr({ pl: "Ład", en: "Governance", cs: "Správa" })} c="text-violet-300" Icon={Shield} />
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <div className="text-[11px] text-white/70 font-semibold mb-2">{tr({ pl: "Trend 6M (E/S/G)", en: "6M trend (E/S/G)", cs: "Trend 6M (E/S/G)" })}</div>
          <div className="flex items-end gap-1.5 h-24">
            {[
              { e: 65, s: 45, g: 78 },
              { e: 68, s: 52, g: 80 },
              { e: 72, s: 58, g: 82 },
              { e: 75, s: 62, g: 79 },
              { e: 80, s: 68, g: 85 },
              { e: 85, s: 75, g: 88 },
            ].map((d, i) => (
              <div key={i} className="flex-1 flex gap-0.5 items-end h-full">
                <div className="flex-1 bg-emerald-400/80 rounded-sm" style={{ height: `${d.e}%` }} />
                <div className="flex-1 bg-sky-400/80 rounded-sm" style={{ height: `${d.s}%` }} />
                <div className="flex-1 bg-violet-400/80 rounded-sm" style={{ height: `${d.g}%` }} />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[9px] text-white/40 mt-1 font-mono">
            {months.map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>
        <div className="rounded-lg bg-sky-500/10 border border-sky-400/20 p-2.5 flex items-center gap-2">
          <CheckCircle2 className="h-3.5 w-3.5 text-sky-300" />
          <span className="text-[10px] text-sky-100">{tr({ pl: "Wszystkie wskaźniki GRI w trendzie wzrostowym", en: "All GRI indicators trending upwards", cs: "Všechny ukazatele GRI rostou" })}</span>
        </div>
      </div>
    </Shell>
  );
};

export const CbamDarkMockup = () => {
  const tr = useTr();
  const segs = [
    { l: tr({ pl: "Bezpośrednie", en: "Direct", cs: "Přímé" }), v: 40, c: "bg-rose-400", t: "text-rose-300" },
    { l: tr({ pl: "Energia el.", en: "Electricity", cs: "Elektřina" }), v: 25, c: "bg-sky-400", t: "text-sky-300" },
    { l: tr({ pl: "Importowane", en: "Imported", cs: "Dovoz" }), v: 35, c: "bg-emerald-400", t: "text-emerald-300" },
  ];
  return (
    <Shell url="platform.quantifier.ai/cbam" badge="CBAM">
      <Header icon={Factory}
        title={tr({ pl: "Podział emisji CBAM", en: "CBAM emissions split", cs: "Rozdělení emisí CBAM" })}
        subtitle={tr({ pl: "Q4 2025 · 12 dostawców · 4 towary", en: "Q4 2025 · 12 suppliers · 4 goods", cs: "Q4 2025 · 12 dodavatelů · 4 zboží" })}
        accent="text-rose-300"
        live={tr({ pl: "Live", en: "Live", cs: "Live" })} />
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <Stat v="2.4t" l={tr({ pl: "CO₂e/szt", en: "CO₂e/unit", cs: "CO₂e/ks" })} c="text-rose-300" Icon={Factory} />
          <Stat v="28d" l={tr({ pl: "Termin", en: "Deadline", cs: "Termín" })} c="text-amber-300" Icon={Clock} />
          <Stat v="100%" l={tr({ pl: "Pokrycie", en: "Coverage", cs: "Pokrytí" })} c="text-emerald-300" Icon={CheckCircle2} />
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <div className="text-[11px] text-white/70 font-semibold mb-3">{tr({ pl: "Dystrybucja źródeł emisji", en: "Emission source distribution", cs: "Rozložení zdrojů emisí" })}</div>
          <div className="flex h-3 rounded-full overflow-hidden mb-3">
            {segs.map((s) => (<div key={s.l} className={s.c} style={{ width: `${s.v}%` }} />))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {segs.map((s) => (
              <div key={s.l} className="text-center">
                <div className={`text-base font-bold ${s.t}`}>{s.v}%</div>
                <div className="text-[9px] text-white/50 uppercase tracking-wider">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-amber-500/10 border border-amber-400/20 p-2 flex items-center gap-1.5">
            <AlertTriangle className="h-3 w-3 text-amber-300" />
            <span className="text-[10px] text-amber-100">{tr({ pl: "35% z importu", en: "35% from imports", cs: "35 % z dovozu" })}</span>
          </div>
          <div className="rounded-lg bg-rose-500/10 border border-rose-400/20 p-2 flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-rose-300" />
            <span className="text-[10px] text-rose-100">{tr({ pl: "Raport za 28 dni", en: "Report due in 28 days", cs: "Zpráva za 28 dní" })}</span>
          </div>
        </div>
      </div>
    </Shell>
  );
};

export const VsmeDarkMockup = () => {
  const tr = useTr();
  return (
    <Shell url="platform.quantifier.ai/vsme" badge="VSME">
      <Header icon={Leaf}
        title={tr({ pl: "VSME · Standard dla MŚP", en: "VSME · SME standard", cs: "VSME · Standard pro MSP" })}
        subtitle={tr({ pl: "Moduł Basic + Comprehensive · EFRAG", en: "Basic + Comprehensive module · EFRAG", cs: "Modul Basic + Comprehensive · EFRAG" })}
        accent="text-emerald-300"
        live={tr({ pl: "Live", en: "Live", cs: "Live" })} />
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-4 gap-2">
          <Stat v="11/11" l="Basic" c="text-emerald-300" Icon={CheckCircle2} />
          <Stat v="7/9" l="PAT" c="text-sky-300" Icon={BarChart3} />
          <Stat v="3" l={tr({ pl: "Polityki", en: "Policies", cs: "Zásady" })} c="text-violet-300" Icon={FileText} />
          <Stat v="A-" l={tr({ pl: "Ocena", en: "Rating", cs: "Hodnocení" })} c="text-amber-300" Icon={Shield} />
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <div className="text-[11px] text-white/70 font-semibold mb-2">{tr({ pl: "Ujawnienia VSME", en: "VSME disclosures", cs: "Zveřejnění VSME" })}</div>
          <div className="space-y-2">
            <Bar label={tr({ pl: "B1–B2 Praktyki ogólne", en: "B1–B2 General practices", cs: "B1–B2 Obecné praktiky" })} val={100} />
            <Bar label={tr({ pl: "B3 Energia i emisje GHG", en: "B3 Energy & GHG emissions", cs: "B3 Energie a emise GHG" })} val={85} color="bg-sky-400" />
            <Bar label={tr({ pl: "B8–B11 Pracownicy", en: "B8–B11 Workforce", cs: "B8–B11 Zaměstnanci" })} val={92} color="bg-violet-400" />
            <Bar label={tr({ pl: "C1–C9 Comprehensive", en: "C1–C9 Comprehensive", cs: "C1–C9 Comprehensive" })} val={64} color="bg-amber-400" />
          </div>
        </div>
        <div className="rounded-lg bg-emerald-500/10 border border-emerald-400/20 p-2.5 flex items-center gap-2">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
          <span className="text-[10px] text-emerald-100">{tr({ pl: "Raport gotowy do udostępnienia bankom i klientom z łańcucha dostaw", en: "Report ready to share with banks and supply chain customers", cs: "Zpráva připravena ke sdílení s bankami a zákazníky v dodavatelském řetězci" })}</span>
        </div>
      </div>
    </Shell>
  );
};
