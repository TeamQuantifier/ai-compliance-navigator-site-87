import {
  Sparkles, Shield, FileText, CheckCircle2, AlertTriangle, ClipboardList,
  Lock, Activity, ArrowRight, FileCheck, Eye, BarChart3, Users
} from 'lucide-react';
import { useMockupText, type MockupText } from '@/lib/mockup-text';

/* ─── shared atoms (mirroring HomePlatformMockup) ─── */
const StatusBadge = ({ status, label }: { status: 'active' | 'review' | 'draft' | 'complete' | 'partial' | 'gap'; label?: string }) => {
  const mt = useMockupText();
  const styles: Record<string, string> = {
    active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    complete: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    review: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    partial: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    draft: 'bg-blue-500/20 text-blue-400 border-blue-400/30',
    gap: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  const labels: Record<string, MockupText> = {
    active: { en: 'active', pl: 'aktywna' },
    review: { en: 'review', pl: 'do przeglądu' },
    draft: { en: 'draft', pl: 'robocza' },
    complete: { en: 'complete', pl: 'ukończone' },
    partial: { en: 'partial', pl: 'częściowe' },
    gap: { en: 'gap', pl: 'luka' },
  };
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${styles[status]}`}>
      {label || mt(labels[status])}
    </span>
  );
};

const MiniProgress = ({ value, color = 'bg-primary' }: { value: number; color?: string }) => (
  <div className="h-1 w-full rounded-full bg-white/10 mt-1">
    <div className={`h-1 rounded-full ${color}`} style={{ width: `${value}%` }} />
  </div>
);

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-slate-950 p-4">{children}</div>
);

/* ═══════════════ STEP 2 — GAP ANALYSIS ═══════════════ */
export const Iso27001GapAnalysisMockup = () => {
  const mt = useMockupText();
  return (
    <Frame>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-white">{mt({ en: 'AI Gap Analysis · ISO 27001', pl: 'Analiza luk AI · ISO 27001' })}</h4>
            <p className="text-[10px] text-white/40">{mt({ en: 'Mapping the 93 Annex A controls against your current state.', pl: 'Mapowanie 93 kontroli Aneksu A względem aktualnego stanu organizacji.' })}</p>
          </div>
          <span className="text-[10px] px-3 py-1.5 rounded-md bg-primary/20 text-primary border border-primary/30 font-medium flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> {mt({ en: 'AI Scan', pl: 'Skan AI' })}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: mt({ en: 'Coverage', pl: 'Zakrycie' }), value: '67%', color: 'bg-amber-500', pct: 67 },
            { label: mt({ en: 'Gaps detected', pl: 'Wykryte luki' }), value: '24', color: 'bg-red-500', pct: 80 },
            { label: mt({ en: 'Quick wins', pl: 'Szybkie wygrane' }), value: '11', color: 'bg-emerald-500', pct: 55 },
          ].map((c) => (
            <div key={c.label} className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
              <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1">{c.label}</p>
              <p className="text-lg font-bold text-white">{c.value}</p>
              <MiniProgress value={c.pct} color={c.color} />
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
          <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-3">{mt({ en: 'Annex A — sections', pl: 'Aneks A — sekcje' })}</p>
          <div className="space-y-2.5">
            {[
              { name: mt({ en: 'A.5 Organizational', pl: 'A.5 Organizacyjne' }), pct: 92, status: 'complete' as const },
              { name: mt({ en: 'A.6 People', pl: 'A.6 Ludzie' }), pct: 74, status: 'partial' as const },
              { name: mt({ en: 'A.7 Physical', pl: 'A.7 Fizyczne' }), pct: 81, status: 'complete' as const },
              { name: mt({ en: 'A.8 Technological', pl: 'A.8 Techniczne' }), pct: 48, status: 'gap' as const },
            ].map((f) => (
              <div key={f.name} className="flex items-center gap-3">
                <span className="text-[10px] text-white/70 w-32 shrink-0">{f.name}</span>
                <div className="flex-1"><MiniProgress value={f.pct} color={f.pct >= 80 ? 'bg-emerald-500' : f.pct >= 50 ? 'bg-amber-500' : 'bg-red-500'} /></div>
                <span className="text-[10px] font-medium text-white/60 w-8 text-right">{f.pct}%</span>
                <StatusBadge status={f.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
};

/* ═══════════════ STEP 3 — RISK HEATMAP ═══════════════ */
export const Iso27001RiskHeatmapMockup = () => {
  const mt = useMockupText();
  const cells = [
    [1, 2, 3, 5, 8],
    [1, 3, 6, 9, 12],
    [2, 5, 11, 15, 18],
    [3, 7, 14, 22, 28],
    [4, 9, 18, 30, 42],
  ];
  const colorFor = (v: number) => {
    if (v >= 20) return 'bg-red-500/70 text-white';
    if (v >= 10) return 'bg-amber-500/60 text-white';
    if (v >= 5) return 'bg-yellow-500/40 text-white';
    return 'bg-emerald-500/40 text-white';
  };
  const scale = mt({ en: ['VH', 'H', 'M', 'L', 'VL'], pl: ['B.W', 'W', 'Ś', 'N', 'B.N'] });
  const scaleRev = [...scale].reverse();
  return (
    <Frame>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-white">{mt({ en: 'Risk Heatmap · ISO 27005', pl: 'Macierz ryzyka · ISO 27005' })}</h4>
          <p className="text-[10px] text-white/40">{mt({ en: 'Probability × impact matrix with a treatment plan.', pl: 'Macierz prawdopodobieństwo × wpływ z planem postępowania.' })}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-2">{mt({ en: '5×5 matrix', pl: 'Macierz 5×5' })}</p>
            <div className="flex gap-1">
              <div className="flex flex-col justify-between text-[8px] text-white/40 py-1">
                {scaleRev.map((l) => <span key={l}>{l}</span>)}
              </div>
              <div className="flex-1 grid grid-cols-5 gap-1">
                {cells.map((row, ri) => row.map((v, ci) => (
                  <div key={`${ri}-${ci}`} className={`aspect-square rounded flex items-center justify-center text-[9px] font-bold ${colorFor(v)}`}>{v}</div>
                )))}
              </div>
            </div>
            <div className="flex justify-between text-[8px] text-white/40 mt-1 pl-4">
              {scale.map((l) => <span key={l}>{l}</span>)}
            </div>
          </div>

          <div className="space-y-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
              <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-2">{mt({ en: 'Top risks', pl: 'Największe ryzyka' })}</p>
              <div className="space-y-1.5">
                {[
                  { name: mt({ en: 'Customer data leak', pl: 'Wyciek danych klientów' }), sev: 'gap' as const },
                  { name: mt({ en: 'Admin account compromise', pl: 'Kompromitacja konta administratora' }), sev: 'gap' as const },
                  { name: mt({ en: 'SaaS vendor — SLA', pl: 'Dostawca SaaS — SLA' }), sev: 'partial' as const },
                  { name: mt({ en: 'Backup failure', pl: 'Awaria kopii zapasowej' }), sev: 'partial' as const },
                ].map((r) => (
                  <div key={r.name} className="flex items-center justify-between rounded border border-white/5 bg-white/[0.02] p-1.5">
                    <span className="text-[9px] text-white/60">{r.name}</span>
                    <StatusBadge status={r.sev} />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded border border-white/5 bg-white/[0.02] p-2 flex items-center gap-2">
              <AlertTriangle className="h-3 w-3 text-amber-400 shrink-0" />
              <span className="text-[9px] text-white/50">{mt({ en: '2 critical risks need an immediate mitigation plan.', pl: '2 ryzyka krytyczne wymagają natychmiastowego planu postępowania.' })}</span>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
};

/* ═══════════════ STEP 4 — POLICIES ═══════════════ */
export const Iso27001PoliciesMockup = () => (
  <Frame>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-white">Polityki ISMS · Repozytorium</h4>
          <p className="text-[10px] text-white/40">Generowane z szablonów ISO 27001 i wersjonowane automatycznie.</p>
        </div>
        <span className="text-[10px] px-3 py-1.5 rounded-md bg-primary/20 text-primary border border-primary/30 font-medium">+ Nowa polityka</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Aktywne', value: '18', color: 'text-emerald-400' },
          { label: 'Review', value: '4', color: 'text-amber-400' },
          { label: 'Draft', value: '3', color: 'text-blue-400' },
          { label: 'Wygasłe', value: '1', color: 'text-red-400' },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-white/10 bg-white/[0.02] p-2.5 text-center">
            <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[9px] text-white/40 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.02] divide-y divide-white/5">
        {[
          { name: 'Polityka Bezpieczeństwa Informacji', ver: 'v3.2', owner: 'CISO', status: 'active' as const },
          { name: 'Polityka Kontroli Dostępu', ver: 'v2.1', owner: 'IT Manager', status: 'active' as const },
          { name: 'Polityka Backupu i DR', ver: 'v1.4', owner: 'IT Ops', status: 'review' as const },
          { name: 'Polityka Zarządzania Incydentami', ver: 'v2.0', owner: 'CISO', status: 'active' as const },
          { name: 'Polityka Zarządzania Dostawcami', ver: 'v1.0', owner: 'Procurement', status: 'draft' as const },
        ].map((p) => (
          <div key={p.name} className="flex items-center gap-3 px-3 py-2">
            <FileText className="h-3.5 w-3.5 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-medium text-white/80 truncate">{p.name}</p>
              <p className="text-[9px] text-white/40">{p.ver} · {p.owner}</p>
            </div>
            <StatusBadge status={p.status} />
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

/* ═══════════════ STEP 5 — CONTROLS ═══════════════ */
export const Iso27001ControlsMockup = () => {
  const mt = useMockupText();
  const columns = [
    { title: mt({ en: 'To do', pl: 'Do zrobienia' }), count: 8, color: 'text-white/60', items: [
      { name: mt({ en: 'A.8.9 Server hardening', pl: 'A.8.9 Wzmocnienie serwerów' }), tag: mt({ en: 'Tech', pl: 'Tech' }), sev: 'draft' as const },
      { name: mt({ en: 'A.5.20 Supplier clauses', pl: 'A.5.20 Klauzule dla dostawców' }), tag: mt({ en: 'Org', pl: 'Org.' }), sev: 'draft' as const },
    ]},
    { title: mt({ en: 'In progress', pl: 'W trakcie' }), count: 5, color: 'text-amber-400', items: [
      { name: mt({ en: 'A.8.16 SIEM monitoring', pl: 'A.8.16 Monitoring SIEM' }), tag: mt({ en: 'Tech', pl: 'Tech' }), sev: 'partial' as const },
      { name: mt({ en: 'A.6.3 ISMS training', pl: 'A.6.3 Szkolenia ISMS' }), tag: mt({ en: 'People', pl: 'Ludzie' }), sev: 'partial' as const },
    ]},
    { title: mt({ en: 'Done', pl: 'Zrobione' }), count: 12, color: 'text-emerald-400', items: [
      { name: mt({ en: 'A.8.5 MFA on all accounts', pl: 'A.8.5 MFA na wszystkich kontach' }), tag: mt({ en: 'Tech', pl: 'Tech' }), sev: 'complete' as const },
      { name: mt({ en: 'A.7.4 Physical access control', pl: 'A.7.4 Kontrola dostępu fizycznego' }), tag: mt({ en: 'Phys', pl: 'Fiz.' }), sev: 'complete' as const },
    ]},
  ];
  return (
    <Frame>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-white">{mt({ en: 'Control rollout · Task board', pl: 'Wdrożenie kontroli · Tablica zadań' })}</h4>
          <p className="text-[10px] text-white/40">{mt({ en: '25 of 93 Annex A controls · assigned to owners.', pl: '25 z 93 kontroli Aneksu A · przypisane do właścicieli.' })}</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {columns.map((col) => (
            <div key={col.title} className="rounded-lg border border-white/10 bg-white/[0.02] p-2">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${col.color}`}>{col.title}</span>
                <span className="text-[9px] text-white/40">{col.count}</span>
              </div>
              <div className="space-y-1.5">
                {col.items.map((it) => (
                  <div key={it.name} className="rounded border border-white/5 bg-white/[0.03] p-1.5">
                    <div className="flex items-start gap-1.5 mb-1">
                      <Lock className="h-2.5 w-2.5 text-primary shrink-0 mt-0.5" />
                      <p className="text-[9px] text-white/80 leading-tight">{it.name}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] text-white/40">{it.tag}</span>
                      <StatusBadge status={it.sev} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
};

/* ═══════════════ STEP 6 — CERTIFICATION ═══════════════ */
export const Iso27001CertificationMockup = () => {
  const mt = useMockupText();
  return (
    <Frame>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-white">{mt({ en: 'Audit workspace · Certification', pl: 'Przestrzeń audytu · Certyfikacja' })}</h4>
            <p className="text-[10px] text-white/40">{mt({ en: 'Evidence, SoA and reports for the auditor in one place.', pl: 'Dowody, SoA i raporty dla audytora w jednym miejscu.' })}</p>
          </div>
          <span className="text-[10px] px-3 py-1.5 rounded-md bg-primary/20 text-primary border border-primary/30 font-medium flex items-center gap-1">
            <FileCheck className="h-3 w-3" /> {mt({ en: 'Export SoA', pl: 'Eksport SoA' })}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: mt({ en: 'Verified', pl: 'Zweryfikowane' }), value: '38', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { label: mt({ en: 'Pending', pl: 'Oczekujące' }), value: '5', color: 'text-amber-400', bg: 'bg-amber-500/10' },
            { label: mt({ en: 'Gaps', pl: 'Luki' }), value: '2', color: 'text-red-400', bg: 'bg-red-500/10' },
          ].map((c) => (
            <div key={c.label} className={`rounded-lg border border-white/10 ${c.bg} p-3 text-center`}>
              <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
              <p className="text-[9px] text-white/50 uppercase tracking-wider">{c.label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.02] divide-y divide-white/5">
          {[
            { name: mt({ en: 'A.5.1 Security policy', pl: 'A.5.1 Polityka bezpieczeństwa' }), ev: 3, status: 'complete' as const },
            { name: mt({ en: 'A.8.1 Asset inventory', pl: 'A.8.1 Inwentaryzacja aktywów' }), ev: 5, status: 'complete' as const },
            { name: mt({ en: 'A.9.2 Access management', pl: 'A.9.2 Zarządzanie dostępem' }), ev: 2, status: 'partial' as const },
            { name: mt({ en: 'A.12.4 Logging & monitoring', pl: 'A.12.4 Rejestrowanie i monitorowanie' }), ev: 4, status: 'complete' as const },
            { name: mt({ en: 'A.16.1 Incident management', pl: 'A.16.1 Zarządzanie incydentami' }), ev: 1, status: 'gap' as const },
          ].map((r) => (
            <div key={r.name} className="flex items-center gap-3 px-3 py-2">
              <Shield className="h-3.5 w-3.5 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-medium text-white/80 truncate">{r.name}</p>
                <p className="text-[9px] text-white/40 flex items-center gap-1"><FileText className="h-2.5 w-2.5" /> {r.ev} {mt({ en: 'evidence items', pl: 'dowody' })}</p>
              </div>
              <StatusBadge status={r.status} />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
};

/* ═══════════════ STEP 7 — MAINTENANCE ═══════════════ */
export const Iso27001MaintenanceMockup = () => {
  const mt = useMockupText();
  return (
    <Frame>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-white">{mt({ en: 'ISMS maintenance · Manager dashboard', pl: 'Utrzymanie ISMS · Panel menedżera' })}</h4>
          <p className="text-[10px] text-white/40">{mt({ en: 'PDCA cycle, management reviews and continuous improvement.', pl: 'Cykl PDCA, przeglądy zarządcze i ciągłe doskonalenie.' })}</p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[
            { label: mt({ en: 'ISMS health', pl: 'Kondycja ISMS' }), value: '94%', pct: 94, color: 'bg-emerald-500' },
            { label: mt({ en: 'Audits / year', pl: 'Audyty / rok' }), value: '4/4', pct: 100, color: 'bg-emerald-500' },
            { label: mt({ en: 'Open CAPA', pl: 'Otwarte CAPA' }), value: '3', pct: 30, color: 'bg-amber-500' },
            { label: mt({ en: 'KPI met', pl: 'Zrealizowane KPI' }), value: '11/12', pct: 92, color: 'bg-emerald-500' },
          ].map((c) => (
            <div key={c.label} className="rounded-lg border border-white/10 bg-white/[0.02] p-2.5">
              <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1">{c.label}</p>
              <p className="text-base font-bold text-white">{c.value}</p>
              <MiniProgress value={c.pct} color={c.color} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-2">{mt({ en: 'Upcoming actions', pl: 'Nadchodzące działania' })}</p>
            <div className="space-y-1.5">
              {[
                { name: mt({ en: 'Q2 management review', pl: 'Przegląd zarządczy Q2' }), date: '2026-06-15', icon: Users },
                { name: mt({ en: 'Internal audit A.8', pl: 'Audyt wewnętrzny A.8' }), date: '2026-06-22', icon: Eye },
                { name: mt({ en: 'DRP test', pl: 'Test DRP' }), date: '2026-07-05', icon: Activity },
              ].map((t) => (
                <div key={t.name} className="flex items-center gap-2 rounded border border-white/5 bg-white/[0.02] p-1.5">
                  <t.icon className="h-3 w-3 text-primary shrink-0" />
                  <span className="text-[9px] text-white/70 flex-1">{t.name}</span>
                  <span className="text-[9px] text-white/40">{t.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded border border-primary/20 bg-primary/5 p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-medium text-white/80">{mt({ en: 'AI continuous improvement', pl: 'Ciągłe doskonalenie AI' })}</span>
            </div>
            <div className="space-y-1.5">
              {[
                mt({ en: 'A.8.16 update — new SIEM patterns', pl: 'Aktualizacja A.8.16 — nowe wzorce SIEM' }),
                mt({ en: 'New CVE — A.8.8 control review', pl: 'Nowe CVE — przegląd kontroli A.8.8' }),
                mt({ en: 'Recertification in 8 months — plan', pl: 'Recertyfikacja za 8 miesięcy — plan' }),
              ].map((r) => (
                <div key={r} className="flex items-start gap-2">
                  <ArrowRight className="h-2.5 w-2.5 text-primary shrink-0 mt-0.5" />
                  <span className="text-[9px] text-white/60 leading-relaxed">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
};
