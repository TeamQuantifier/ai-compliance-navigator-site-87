import { BarChart3, CheckCircle2, AlertTriangle, Globe, FileText, TrendingUp, PieChart as PieIcon, Leaf, Users, Shield, Clock, Factory } from "lucide-react";

const Chrome = ({ url, badge }: { url: string; badge: string }) => (
  <>
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
  </>
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

export const CsrdDarkMockup = () => (
  <Shell url="platform.quantifier.ai/csrd" badge="CSRD">
    <Header icon={FileText} title="Dashboard CSRD / ESRS" subtitle="Raport 2025 · 12 ESRS · Podwójna istotność" />
    <div className="p-4 space-y-3">
      <div className="grid grid-cols-4 gap-2">
        <Stat v="78%" l="Zgodność" c="text-emerald-300" Icon={CheckCircle2} />
        <Stat v="142" l="Datapointy" c="text-sky-300" Icon={BarChart3} />
        <Stat v="9/12" l="ESRS" c="text-violet-300" Icon={Shield} />
        <Stat v="3" l="Luki" c="text-amber-300" Icon={AlertTriangle} />
      </div>
      <div className="rounded-lg bg-white/5 border border-white/10 p-3">
        <div className="text-[11px] text-white/70 font-semibold mb-2">Pokrycie ESRS</div>
        <div className="space-y-2">
          <Bar label="E1 Klimat" val={92} />
          <Bar label="E2 Zanieczyszczenia" val={74} color="bg-sky-400" />
          <Bar label="S1 Pracownicy" val={68} color="bg-violet-400" />
          <Bar label="G1 Zarządzanie" val={88} color="bg-amber-400" />
        </div>
      </div>
      <div className="rounded-lg bg-emerald-500/10 border border-emerald-400/20 p-2.5 flex items-center gap-2">
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
        <span className="text-[10px] text-emerald-100">Ocena podwójnej istotności ukończona dla 18 tematów</span>
      </div>
    </div>
  </Shell>
);

export const GriDarkMockup = () => (
  <Shell url="platform.quantifier.ai/gri" badge="GRI">
    <Header icon={Globe} title="Trendy wydajności GRI" subtitle="GRI Standards 2021 · 6 miesięcy" accent="text-sky-300" />
    <div className="p-4 space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <Stat v="+20%" l="Środowisko" c="text-emerald-300" Icon={TrendingUp} />
        <Stat v="+15%" l="Społeczne" c="text-sky-300" Icon={Users} />
        <Stat v="+10%" l="Ład" c="text-violet-300" Icon={Shield} />
      </div>
      <div className="rounded-lg bg-white/5 border border-white/10 p-3">
        <div className="text-[11px] text-white/70 font-semibold mb-2">Trend 6M (E/S/G)</div>
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
          <span>Sty</span><span>Lut</span><span>Mar</span><span>Kwi</span><span>Maj</span><span>Cze</span>
        </div>
      </div>
      <div className="rounded-lg bg-sky-500/10 border border-sky-400/20 p-2.5 flex items-center gap-2">
        <CheckCircle2 className="h-3.5 w-3.5 text-sky-300" />
        <span className="text-[10px] text-sky-100">Wszystkie wskaźniki GRI w trendzie wzrostowym</span>
      </div>
    </div>
  </Shell>
);

export const CbamDarkMockup = () => {
  const segs = [
    { l: "Bezpośrednie", v: 40, c: "bg-rose-400", t: "text-rose-300" },
    { l: "Energia el.", v: 25, c: "bg-sky-400", t: "text-sky-300" },
    { l: "Importowane", v: 35, c: "bg-emerald-400", t: "text-emerald-300" },
  ];
  return (
    <Shell url="platform.quantifier.ai/cbam" badge="CBAM">
      <Header icon={Factory} title="Podział emisji CBAM" subtitle="Q4 2025 · 12 dostawców · 4 towary" accent="text-rose-300" />
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <Stat v="2.4t" l="CO₂e/szt" c="text-rose-300" Icon={Factory} />
          <Stat v="28d" l="Termin" c="text-amber-300" Icon={Clock} />
          <Stat v="100%" l="Pokrycie" c="text-emerald-300" Icon={CheckCircle2} />
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <div className="text-[11px] text-white/70 font-semibold mb-3">Dystrybucja źródeł emisji</div>
          <div className="flex h-3 rounded-full overflow-hidden mb-3">
            {segs.map((s) => (
              <div key={s.l} className={s.c} style={{ width: `${s.v}%` }} />
            ))}
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
            <span className="text-[10px] text-amber-100">35% z importu</span>
          </div>
          <div className="rounded-lg bg-rose-500/10 border border-rose-400/20 p-2 flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-rose-300" />
            <span className="text-[10px] text-rose-100">Raport za 28 dni</span>
          </div>
        </div>
      </div>
    </Shell>
  );
};

export const VsmeDarkMockup = () => (
  <Shell url="platform.quantifier.ai/vsme" badge="VSME">
    <Header icon={Leaf} title="VSME · Standard dla MŚP" subtitle="Moduł Basic + Comprehensive · EFRAG" accent="text-emerald-300" />
    <div className="p-4 space-y-3">
      <div className="grid grid-cols-4 gap-2">
        <Stat v="11/11" l="Basic" c="text-emerald-300" Icon={CheckCircle2} />
        <Stat v="7/9" l="PAT" c="text-sky-300" Icon={BarChart3} />
        <Stat v="3" l="Polityki" c="text-violet-300" Icon={FileText} />
        <Stat v="A-" l="Ocena" c="text-amber-300" Icon={Shield} />
      </div>
      <div className="rounded-lg bg-white/5 border border-white/10 p-3">
        <div className="text-[11px] text-white/70 font-semibold mb-2">Ujawnienia VSME</div>
        <div className="space-y-2">
          <Bar label="B1–B2 Praktyki ogólne" val={100} />
          <Bar label="B3 Energia i emisje GHG" val={85} color="bg-sky-400" />
          <Bar label="B8–B11 Pracownicy" val={92} color="bg-violet-400" />
          <Bar label="C1–C9 Comprehensive" val={64} color="bg-amber-400" />
        </div>
      </div>
      <div className="rounded-lg bg-emerald-500/10 border border-emerald-400/20 p-2.5 flex items-center gap-2">
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
        <span className="text-[10px] text-emerald-100">Raport gotowy do udostępnienia bankom i klientom z łańcucha dostaw</span>
      </div>
    </div>
  </Shell>
);
