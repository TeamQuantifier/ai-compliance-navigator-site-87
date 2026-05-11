import {
  Shield,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingUp,
  FileText,
  Sparkles,
} from "lucide-react";
import leonOfficer from "@/assets/leon-compliance-officer.png";

/**
 * Static, screenshot-style mockup of the AI Compliance Officer dashboard.
 * No animations, no interactive buttons — meant to feel like a frozen
 * snapshot of the platform.
 */
const StaticAiOfficerDashboard = () => {
  return (
    <div className="w-full rounded-xl bg-slate-950 border border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/5">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-slate-900/80">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-[10px] text-white/50 font-mono">platform.quantifier.ai/dashboard</span>
        </div>
        <span className="text-[9px] uppercase tracking-wider text-white/40 font-semibold">Officer</span>
      </div>

      {/* App header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-900/40">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-emerald-300" />
          <div>
            <div className="text-white text-sm font-semibold leading-tight">Dashboard zgodności</div>
            <div className="text-[10px] text-white/50">Przegląd · 4 frameworki · 12 polityk</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="h-4 w-4 text-white/60" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-rose-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">
              3
            </span>
          </div>
          <div className="h-6 w-6 rounded-full bg-emerald-500/30 border border-emerald-400/40 flex items-center justify-center">
            <span className="text-[10px] text-white font-medium">AK</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Stat tiles */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { v: "94%", l: "Zgodność", c: "text-emerald-300", icon: CheckCircle2 },
            { v: "7", l: "Alerty", c: "text-amber-300", icon: AlertTriangle },
            { v: "12", l: "Otwarte taski", c: "text-blue-300", icon: Clock },
            { v: "+8 pp", l: "Trend 30 dni", c: "text-purple-300", icon: TrendingUp },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.l} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] text-white/50 uppercase tracking-wider">{s.l}</span>
                  <Icon className={`h-3 w-3 ${s.c}`} />
                </div>
                <div className={`text-lg font-bold leading-tight ${s.c}`}>{s.v}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Frameworks status */}
          <div className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-lg p-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white text-xs font-semibold">Status frameworków</span>
              <span className="text-[9px] text-white/40 uppercase tracking-wider">live</span>
            </div>
            <div className="space-y-2.5">
              {[
                { name: "NIS2", v: 96, c: "bg-emerald-400" },
                { name: "ISO 27001", v: 91, c: "bg-emerald-400" },
                { name: "DORA", v: 78, c: "bg-amber-400" },
                { name: "RODO / GDPR", v: 88, c: "bg-blue-400" },
                { name: "CSRD", v: 64, c: "bg-rose-400" },
              ].map((f) => (
                <div key={f.name} className="space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-white/85 font-medium">{f.name}</span>
                    <span className="text-white/60 tabular-nums">{f.v}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${f.c} rounded-full`} style={{ width: `${f.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leon's daily brief */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-400/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="h-7 w-7 rounded-full overflow-hidden ring-2 ring-emerald-400/60 flex-shrink-0">
                <img src={leonOfficer} alt="Leon" className="h-full w-full object-cover scale-110" />
              </div>
              <div>
                <div className="text-white text-[11px] font-semibold leading-tight">Leon · Daily brief</div>
                <div className="text-[9px] text-emerald-300">poniedziałek, 09:00</div>
              </div>
            </div>
            <ul className="space-y-1.5 text-[10px] text-white/80">
              <li className="flex items-start gap-1.5">
                <Sparkles className="h-3 w-3 text-emerald-300 mt-0.5 flex-shrink-0" />
                <span>14 dowodów odświeżonych w nocy</span>
              </li>
              <li className="flex items-start gap-1.5">
                <AlertTriangle className="h-3 w-3 text-amber-300 mt-0.5 flex-shrink-0" />
                <span>Polityka BCM wygasa za 9 dni · draft v3.2 gotowy</span>
              </li>
              <li className="flex items-start gap-1.5">
                <FileText className="h-3 w-3 text-blue-300 mt-0.5 flex-shrink-0" />
                <span>3 przypomnienia wysłane do ownerów kontroli</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Audit trail */}
        <div className="bg-white/[0.03] border border-white/10 rounded-lg">
          <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
            <span className="text-white text-xs font-semibold">Ostatnia aktywność</span>
            <span className="text-[9px] text-white/40 uppercase tracking-wider">audit trail</span>
          </div>
          <div className="divide-y divide-white/5">
            {[
              { who: "Leon (AI)", what: "wygenerował dowód MFA dla ISO 27001 A.9", when: "08:14" },
              { who: "A. Kowalska", what: "podpisała politykę BCM v3.1 (e-IDAS)", when: "wczoraj" },
              { who: "M. Nowak", what: "zatwierdził ocenę ryzyka dostawcy Acme", when: "12.05" },
              { who: "Leon (AI)", what: "zsynchronizował 187 rekordów z Workday", when: "12.05" },
            ].map((e, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 text-[10px]">
                <CheckCircle2 className="h-3 w-3 text-emerald-400 flex-shrink-0" />
                <span className="text-white/85 flex-1 truncate">
                  <strong className="text-white">{e.who}</strong> {e.what}
                </span>
                <span className="text-white/40 tabular-nums">{e.when}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticAiOfficerDashboard;
