import { BarChart3, CheckCircle2, AlertTriangle, FileText, Leaf, Factory, Target, Activity, Zap, Recycle, Flame } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Locale = "pl" | "en" | "cs";

const dict = {
  live: { pl: "Live", en: "Live", cs: "Live" },
  iso: {
    title: { pl: "ISO 14001 — EMS", en: "ISO 14001 — EMS", cs: "ISO 14001 — EMS" },
    subtitle: {
      pl: "System zarządzania środowiskowego · Audyt Q3",
      en: "Environmental management system · Q3 audit",
      cs: "Systém environmentálního řízení · Audit Q3",
    },
    stats: {
      compliance: { pl: "Zgodność", en: "Compliance", cs: "Shoda" },
      procedures: { pl: "Procedury", en: "Procedures", cs: "Procedury" },
      goals: { pl: "Cele", en: "Objectives", cs: "Cíle" },
      gaps: { pl: "Niezgodności", en: "Non-conformities", cs: "Neshody" },
    },
    barsTitle: { pl: "Cele środowiskowe", en: "Environmental objectives", cs: "Environmentální cíle" },
    bars: {
      waste: { pl: "Redukcja odpadów", en: "Waste reduction", cs: "Snížení odpadů" },
      energy: { pl: "Efektywność energetyczna", en: "Energy efficiency", cs: "Energetická účinnost" },
      water: { pl: "Oszczędność wody", en: "Water savings", cs: "Úspora vody" },
      ghg: { pl: "Emisje GHG", en: "GHG emissions", cs: "Emise GHG" },
    },
    insight: {
      pl: "AI Agent: zaktualizowano 4 polityki po zmianach prawnych",
      en: "AI Agent: 4 policies updated after regulatory changes",
      cs: "AI Agent: po změnách předpisů aktualizovány 4 zásady",
    },
  },
  lca: {
    title: { pl: "Analiza cyklu życia", en: "Life Cycle Assessment", cs: "Analýza životního cyklu" },
    subtitle: {
      pl: "ISO 14040/44 · 6 etapów · cradle-to-grave",
      en: "ISO 14040/44 · 6 stages · cradle-to-grave",
      cs: "ISO 14040/44 · 6 fází · cradle-to-grave",
    },
    stats: {
      co2: { pl: "kg CO₂e", en: "kg CO₂e", cs: "kg CO₂e" },
      stages: { pl: "Etapy", en: "Stages", cs: "Fáze" },
      proc: { pl: "Procesy", en: "Processes", cs: "Procesy" },
      format: { pl: "Format", en: "Format", cs: "Formát" },
    },
    barsTitle: {
      pl: "Wpływ wg etapu cyklu życia",
      en: "Impact by life cycle stage",
      cs: "Dopad podle fáze životního cyklu",
    },
    bars: {
      raw: { pl: "Surowce", en: "Raw materials", cs: "Suroviny" },
      prod: { pl: "Produkcja", en: "Manufacturing", cs: "Výroba" },
      trans: { pl: "Transport", en: "Transport", cs: "Doprava" },
      use: { pl: "Użytkowanie", en: "Use phase", cs: "Užívání" },
      eol: { pl: "End-of-life", en: "End-of-life", cs: "Konec životnosti" },
    },
  },
  carbon: {
    title: { pl: "Ślad węglowy", en: "Carbon footprint", cs: "Uhlíková stopa" },
    subtitle: {
      pl: "GHG Protocol · Scope 1 / 2 / 3",
      en: "GHG Protocol · Scope 1 / 2 / 3",
      cs: "GHG Protocol · Scope 1 / 2 / 3",
    },
    stats: {
      s1: { pl: "tCO₂e Scope 1", en: "tCO₂e Scope 1", cs: "tCO₂e Scope 1" },
      s2: { pl: "tCO₂e Scope 2", en: "tCO₂e Scope 2", cs: "tCO₂e Scope 2" },
      s3: { pl: "tCO₂e Scope 3", en: "tCO₂e Scope 3", cs: "tCO₂e Scope 3" },
    },
    barsTitle: { pl: "Źródła emisji (top 5)", en: "Emission sources (top 5)", cs: "Zdroje emisí (top 5)" },
    bars: {
      elec: { pl: "Energia elektryczna", en: "Electricity", cs: "Elektřina" },
      supply: { pl: "Łańcuch dostaw", en: "Supply chain", cs: "Dodavatelský řetězec" },
      trans: { pl: "Transport", en: "Transport", cs: "Doprava" },
      fuel: { pl: "Paliwa", en: "Fuels", cs: "Paliva" },
      waste: { pl: "Odpady", en: "Waste", cs: "Odpady" },
    },
    insight: {
      pl: "Scope 3 wymaga uzupełnienia danych od 12 dostawców",
      en: "Scope 3 needs data from 12 suppliers",
      cs: "Scope 3 vyžaduje data od 12 dodavatelů",
    },
  },
  decarb: {
    title: { pl: "Strategia dekarbonizacji", en: "Decarbonisation strategy", cs: "Strategie dekarbonizace" },
    subtitle: {
      pl: "Cele 2030 · Trajektoria 1.5°C · SBTi",
      en: "2030 targets · 1.5°C trajectory · SBTi",
      cs: "Cíle 2030 · Trajektorie 1,5 °C · SBTi",
    },
    stats: {
      red: { pl: "Redukcja vs 2020", en: "Reduction vs 2020", cs: "Redukce vs 2020" },
      net: { pl: "Cel netto", en: "Net target", cs: "Cíl netto" },
      init: { pl: "Inicjatywy", en: "Initiatives", cs: "Iniciativy" },
      capex: { pl: "Inwestycje", en: "Investments", cs: "Investice" },
    },
    barsTitle: {
      pl: "Postęp inicjatyw redukcyjnych",
      en: "Reduction initiatives progress",
      cs: "Pokrok redukčních iniciativ",
    },
    bars: {
      ppa: { pl: "Energia odnawialna PPA", en: "Renewable energy PPA", cs: "Obnovitelná energie PPA" },
      fleet: { pl: "Elektryfikacja floty", en: "Fleet electrification", cs: "Elektrifikace flotily" },
      proc: { pl: "Efektywność procesów", en: "Process efficiency", cs: "Účinnost procesů" },
      supp: { pl: "Engagement dostawców", en: "Supplier engagement", cs: "Zapojení dodavatelů" },
    },
    insight: {
      pl: "Trajektoria zgodna z celem 1.5°C — walidacja SBTi w toku",
      en: "Trajectory aligned with 1.5°C — SBTi validation in progress",
      cs: "Trajektorie v souladu s cílem 1,5 °C — validace SBTi probíhá",
    },
  },
};

const useLoc = () => {
  const { currentLocale } = useLanguage();
  const l = (currentLocale as Locale) || "en";
  return (node: any) => (node && typeof node === "object" && node[l]) || node?.en || "";
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

const Header = ({ icon: Icon, title, subtitle, accent = "text-emerald-300", liveLabel = "Live" }: any) => (
  <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-900/40">
    <div className="flex items-center gap-2">
      <Icon className={`h-5 w-5 ${accent}`} />
      <div>
        <div className="text-white text-sm font-semibold leading-tight">{title}</div>
        <div className="text-[10px] text-white/50">{subtitle}</div>
      </div>
    </div>
    <div className="h-6 px-2 rounded-md bg-emerald-500/20 border border-emerald-400/30 flex items-center text-[10px] text-emerald-200 font-medium">
      {liveLabel}
    </div>
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

export const Iso14001DarkMockup = () => {
  const tr = useLoc();
  const d = dict.iso;
  return (
    <Shell url="platform.quantifier.ai/iso-14001" badge="ISO 14001">
      <Header icon={Leaf} title={tr(d.title)} subtitle={tr(d.subtitle)} liveLabel={tr(dict.live)} />
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-4 gap-2">
          <Stat v="90%" l={tr(d.stats.compliance)} c="text-emerald-300" Icon={CheckCircle2} />
          <Stat v="42" l={tr(d.stats.procedures)} c="text-sky-300" Icon={FileText} />
          <Stat v="8" l={tr(d.stats.goals)} c="text-violet-300" Icon={Target} />
          <Stat v="2" l={tr(d.stats.gaps)} c="text-amber-300" Icon={AlertTriangle} />
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <div className="text-[11px] text-white/70 font-semibold mb-2">{tr(d.barsTitle)}</div>
          <div className="space-y-2">
            <Bar label={tr(d.bars.waste)} val={72} />
            <Bar label={tr(d.bars.energy)} val={85} color="bg-sky-400" />
            <Bar label={tr(d.bars.water)} val={64} color="bg-violet-400" />
            <Bar label={tr(d.bars.ghg)} val={58} color="bg-amber-400" />
          </div>
        </div>
        <div className="rounded-lg bg-emerald-500/10 border border-emerald-400/20 p-2.5 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-300" />
          <span className="text-[11px] text-emerald-100">{tr(d.insight)}</span>
        </div>
      </div>
    </Shell>
  );
};

export const LcaDarkMockup = () => {
  const tr = useLoc();
  const d = dict.lca;
  return (
    <Shell url="platform.quantifier.ai/lca" badge="LCA">
      <Header icon={Recycle} title={tr(d.title)} subtitle={tr(d.subtitle)} liveLabel={tr(dict.live)} />
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-4 gap-2">
          <Stat v="248" l={tr(d.stats.co2)} c="text-emerald-300" Icon={Factory} />
          <Stat v="6" l={tr(d.stats.stages)} c="text-sky-300" Icon={BarChart3} />
          <Stat v="18" l={tr(d.stats.proc)} c="text-violet-300" Icon={Activity} />
          <Stat v="EPD" l={tr(d.stats.format)} c="text-amber-300" Icon={FileText} />
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <div className="text-[11px] text-white/70 font-semibold mb-2">{tr(d.barsTitle)}</div>
          <div className="space-y-2">
            <Bar label={tr(d.bars.raw)} val={28} />
            <Bar label={tr(d.bars.prod)} val={42} color="bg-sky-400" />
            <Bar label={tr(d.bars.trans)} val={14} color="bg-violet-400" />
            <Bar label={tr(d.bars.use)} val={10} color="bg-amber-400" />
            <Bar label={tr(d.bars.eol)} val={6} color="bg-rose-400" />
          </div>
        </div>
      </div>
    </Shell>
  );
};

export const CarbonDarkMockup = () => {
  const tr = useLoc();
  const d = dict.carbon;
  return (
    <Shell url="platform.quantifier.ai/carbon" badge="GHG">
      <Header icon={Flame} title={tr(d.title)} subtitle={tr(d.subtitle)} liveLabel={tr(dict.live)} />
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <Stat v="1.2k" l={tr(d.stats.s1)} c="text-emerald-300" Icon={Factory} />
          <Stat v="3.8k" l={tr(d.stats.s2)} c="text-sky-300" Icon={Zap} />
          <Stat v="12.4k" l={tr(d.stats.s3)} c="text-violet-300" Icon={Activity} />
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <div className="text-[11px] text-white/70 font-semibold mb-2">{tr(d.barsTitle)}</div>
          <div className="space-y-2">
            <Bar label={tr(d.bars.elec)} val={38} />
            <Bar label={tr(d.bars.supply)} val={32} color="bg-sky-400" />
            <Bar label={tr(d.bars.trans)} val={18} color="bg-violet-400" />
            <Bar label={tr(d.bars.fuel)} val={8} color="bg-amber-400" />
            <Bar label={tr(d.bars.waste)} val={4} color="bg-rose-400" />
          </div>
        </div>
        <div className="rounded-lg bg-amber-500/10 border border-amber-400/20 p-2.5 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-300" />
          <span className="text-[11px] text-amber-100">{tr(d.insight)}</span>
        </div>
      </div>
    </Shell>
  );
};

export const DecarbonisationDarkMockup = () => {
  const tr = useLoc();
  const d = dict.decarb;
  return (
    <Shell url="platform.quantifier.ai/decarbonisation" badge="SBTi">
      <Header icon={Target} title={tr(d.title)} subtitle={tr(d.subtitle)} liveLabel={tr(dict.live)} />
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-4 gap-2">
          <Stat v="-42%" l={tr(d.stats.red)} c="text-emerald-300" Icon={Activity} />
          <Stat v="2030" l={tr(d.stats.net)} c="text-sky-300" Icon={Target} />
          <Stat v="14" l={tr(d.stats.init)} c="text-violet-300" Icon={Zap} />
          <Stat v="€2.8M" l={tr(d.stats.capex)} c="text-amber-300" Icon={BarChart3} />
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <div className="text-[11px] text-white/70 font-semibold mb-2">{tr(d.barsTitle)}</div>
          <div className="space-y-2">
            <Bar label={tr(d.bars.ppa)} val={86} />
            <Bar label={tr(d.bars.fleet)} val={54} color="bg-sky-400" />
            <Bar label={tr(d.bars.proc)} val={72} color="bg-violet-400" />
            <Bar label={tr(d.bars.supp)} val={38} color="bg-amber-400" />
          </div>
        </div>
        <div className="rounded-lg bg-emerald-500/10 border border-emerald-400/20 p-2.5 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-300" />
          <span className="text-[11px] text-emerald-100">{tr(d.insight)}</span>
        </div>
      </div>
    </Shell>
  );
};
