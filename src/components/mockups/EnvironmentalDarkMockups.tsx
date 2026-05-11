import { BarChart3, CheckCircle2, AlertTriangle, FileText, Leaf, Factory, Target, Activity, Zap, Recycle, Droplets, Flame } from "lucide-react";

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

const Header = ({ icon: Icon, title, subtitle, accent = "text-emerald-300" }: any) => (
  <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-900/40">
    <div className="flex items-center gap-2">
      <Icon className={`h-5 w-5 ${accent}`} />
      <div>
        <div className="text-white text-sm font-semibold leading-tight">{title}</div>
        <div className="text-[10px] text-white/50">{subtitle}</div>
      </div>
    </div>
    <div className="h-6 px-2 rounded-md bg-emerald-500/20 border border-emerald-400/30 flex items-center text-[10px] text-emerald-200 font-medium">
      Live
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

export const Iso14001DarkMockup = () => (
  <Shell url="platform.quantifier.ai/iso-14001" badge="ISO 14001">
    <Header icon={Leaf} title="ISO 14001 — EMS" subtitle="System zarządzania środowiskowego · Audyt Q3" />
    <div className="p-4 space-y-3">
      <div className="grid grid-cols-4 gap-2">
        <Stat v="90%" l="Zgodność" c="text-emerald-300" Icon={CheckCircle2} />
        <Stat v="42" l="Procedury" c="text-sky-300" Icon={FileText} />
        <Stat v="8" l="Cele" c="text-violet-300" Icon={Target} />
        <Stat v="2" l="Niezgodności" c="text-amber-300" Icon={AlertTriangle} />
      </div>
      <div className="rounded-lg bg-white/5 border border-white/10 p-3">
        <div className="text-[11px] text-white/70 font-semibold mb-2">Cele środowiskowe</div>
        <div className="space-y-2">
          <Bar label="Redukcja odpadów" val={72} />
          <Bar label="Efektywność energetyczna" val={85} color="bg-sky-400" />
          <Bar label="Oszczędność wody" val={64} color="bg-violet-400" />
          <Bar label="Emisje GHG" val={58} color="bg-amber-400" />
        </div>
      </div>
      <div className="rounded-lg bg-emerald-500/10 border border-emerald-400/20 p-2.5 flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4 text-emerald-300" />
        <span className="text-[11px] text-emerald-100">AI Agent: zaktualizowano 4 polityki po zmianach prawnych</span>
      </div>
    </div>
  </Shell>
);

export const LcaDarkMockup = () => (
  <Shell url="platform.quantifier.ai/lca" badge="LCA">
    <Header icon={Recycle} title="Life Cycle Assessment" subtitle="ISO 14040/44 · 6 etapów · cradle-to-grave" />
    <div className="p-4 space-y-3">
      <div className="grid grid-cols-4 gap-2">
        <Stat v="248" l="kg CO₂e" c="text-emerald-300" Icon={Factory} />
        <Stat v="6" l="Etapy" c="text-sky-300" Icon={BarChart3} />
        <Stat v="18" l="Procesy" c="text-violet-300" Icon={Activity} />
        <Stat v="EPD" l="Format" c="text-amber-300" Icon={FileText} />
      </div>
      <div className="rounded-lg bg-white/5 border border-white/10 p-3">
        <div className="text-[11px] text-white/70 font-semibold mb-2">Wpływ wg etapu cyklu życia</div>
        <div className="space-y-2">
          <Bar label="Surowce" val={28} />
          <Bar label="Produkcja" val={42} color="bg-sky-400" />
          <Bar label="Transport" val={14} color="bg-violet-400" />
          <Bar label="Użytkowanie" val={10} color="bg-amber-400" />
          <Bar label="End-of-life" val={6} color="bg-rose-400" />
        </div>
      </div>
    </div>
  </Shell>
);

export const CarbonDarkMockup = () => (
  <Shell url="platform.quantifier.ai/carbon" badge="GHG">
    <Header icon={Flame} title="Ślad węglowy" subtitle="GHG Protocol · Scope 1 / 2 / 3" />
    <div className="p-4 space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <Stat v="1.2k" l="tCO₂e Scope 1" c="text-emerald-300" Icon={Factory} />
        <Stat v="3.8k" l="tCO₂e Scope 2" c="text-sky-300" Icon={Zap} />
        <Stat v="12.4k" l="tCO₂e Scope 3" c="text-violet-300" Icon={Activity} />
      </div>
      <div className="rounded-lg bg-white/5 border border-white/10 p-3">
        <div className="text-[11px] text-white/70 font-semibold mb-2">Źródła emisji (top 5)</div>
        <div className="space-y-2">
          <Bar label="Energia elektryczna" val={38} />
          <Bar label="Łańcuch dostaw" val={32} color="bg-sky-400" />
          <Bar label="Transport" val={18} color="bg-violet-400" />
          <Bar label="Paliwa" val={8} color="bg-amber-400" />
          <Bar label="Odpady" val={4} color="bg-rose-400" />
        </div>
      </div>
      <div className="rounded-lg bg-amber-500/10 border border-amber-400/20 p-2.5 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-amber-300" />
        <span className="text-[11px] text-amber-100">Scope 3 wymaga uzupełnienia danych od 12 dostawców</span>
      </div>
    </div>
  </Shell>
);

export const DecarbonisationDarkMockup = () => (
  <Shell url="platform.quantifier.ai/decarbonisation" badge="SBTi">
    <Header icon={Target} title="Strategia dekarbonizacji" subtitle="Cele 2030 · Trajektoria 1.5°C · SBTi" />
    <div className="p-4 space-y-3">
      <div className="grid grid-cols-4 gap-2">
        <Stat v="-42%" l="Redukcja vs 2020" c="text-emerald-300" Icon={Activity} />
        <Stat v="2030" l="Cel netto" c="text-sky-300" Icon={Target} />
        <Stat v="14" l="Inicjatywy" c="text-violet-300" Icon={Zap} />
        <Stat v="€2.8M" l="Inwestycje" c="text-amber-300" Icon={BarChart3} />
      </div>
      <div className="rounded-lg bg-white/5 border border-white/10 p-3">
        <div className="text-[11px] text-white/70 font-semibold mb-2">Postęp inicjatyw redukcyjnych</div>
        <div className="space-y-2">
          <Bar label="Energia odnawialna PPA" val={86} />
          <Bar label="Elektryfikacja floty" val={54} color="bg-sky-400" />
          <Bar label="Efektywność procesów" val={72} color="bg-violet-400" />
          <Bar label="Engagement dostawców" val={38} color="bg-amber-400" />
        </div>
      </div>
      <div className="rounded-lg bg-emerald-500/10 border border-emerald-400/20 p-2.5 flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4 text-emerald-300" />
        <span className="text-[11px] text-emerald-100">Trajektoria zgodna z celem 1.5°C — walidacja SBTi w toku</span>
      </div>
    </div>
  </Shell>
);
