import { useState, useEffect, useCallback } from 'react';
import {
  FileText, Sparkles, BarChart3, Shield, Upload, CheckCircle2,
  GitBranch, Leaf, Lock, Network, ChevronUp, Eye, Activity,
  ClipboardList, ArrowRight, Layers
} from 'lucide-react';
import { useMockupText, type MockupText } from '@/lib/mockup-text';

/* ─── tabs ─── */
const tabs = [
  { id: 'hub', label: { en: 'Policy & Document Hub', pl: 'Rejestr polityk i dokumentów' } as MockupText, icon: FileText },
  { id: 'compliance', label: { en: 'Compliance Dashboard', pl: 'Panel zgodności' } as MockupText, icon: BarChart3 },
  { id: 'ai', label: { en: 'AI Analytics', pl: 'Analityka AI' } as MockupText, icon: Sparkles },
  { id: 'governance', label: { en: 'Governance Flow', pl: 'Zarządzanie zgodnością' } as MockupText, icon: GitBranch },
] as const;

type TabId = (typeof tabs)[number]['id'];

/* ─── status badge ─── */
const StatusBadge = ({ status, label }: { status: 'active' | 'review' | 'draft' | 'complete' | 'partial' | 'gap'; label?: MockupText }) => {
  const mt = useMockupText();
  const statusLabels: Record<'active' | 'review' | 'draft' | 'complete' | 'partial' | 'gap', MockupText> = {
    active: { en: 'Active', pl: 'Aktywna' },
    complete: { en: 'Complete', pl: 'Kompletne' },
    review: { en: 'Review', pl: 'Do przeglądu' },
    partial: { en: 'Partial', pl: 'Częściowe' },
    draft: { en: 'Draft', pl: 'Wersja robocza' },
    gap: { en: 'Gap', pl: 'Luka' },
  };
  const styles: Record<string, string> = {
    active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    complete: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    review: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    partial: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    draft: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    gap: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${styles[status]}`}>
      {mt(label || statusLabels[status])}
    </span>
  );
};

const MiniProgress = ({ value, color = 'bg-primary' }: { value: number; color?: string }) => (
  <div className="h-1 w-full rounded-full bg-white/10 mt-1">
    <div className={`h-1 rounded-full ${color}`} style={{ width: `${value}%` }} />
  </div>
);

/* ═══════════════ POLICY HUB TAB ═══════════════ */
const PolicyHubMockup = () => {
  const mt = useMockupText();
  return (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-semibold text-white">{mt({ en: 'Multi-Framework Policy Hub', pl: 'Polityki dla wielu standardów' })}</h4>
        <p className="text-[10px] text-white/40">{mt({ en: 'Centralized document management across regulatory frameworks, custom company policies, and strategic documents for AI analysis.', pl: 'Centralne zarządzanie dokumentacją regulacyjną, politykami firmowymi i dokumentami strategicznymi do analizy AI.' })}</p>
      </div>
    </div>

    {/* Tab bar */}
    <div className="flex gap-0 border-b border-white/10">
      <button className="px-4 py-2 text-[10px] font-medium text-primary border-b-2 border-primary">{mt({ en: 'Policies', pl: 'Polityki' })}</button>
      <button className="px-4 py-2 text-[10px] font-medium text-white/40">{mt({ en: 'Procedures', pl: 'Procedury' })}</button>
    </div>

    {/* Upload cards */}
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-4">
        <div className="flex flex-col items-center text-center">
          <Upload className="h-5 w-5 text-primary/60 mb-2" />
          <p className="text-[10px] font-medium text-white/80 mb-1">{mt({ en: 'Upload Policy & Document', pl: 'Dodaj politykę lub dokument' })}</p>
          <p className="text-[9px] text-white/40 mb-2">{mt({ en: 'Import existing organization policy', pl: 'Import istniejącej polityki organizacji' })}</p>
          <div className="space-y-1 text-left w-full">
            <div className="flex items-center gap-1.5"><div className="h-1 w-1 rounded-full bg-primary" /><span className="text-[9px] text-white/50">{mt({ en: 'Upload PDF documents', pl: 'Dodawanie dokumentów PDF' })}</span></div>
            <div className="flex items-center gap-1.5"><div className="h-1 w-1 rounded-full bg-primary" /><span className="text-[9px] text-white/50">{mt({ en: 'Auto-categorize by framework', pl: 'Automatyczne przypisanie do standardu' })}</span></div>
            <div className="flex items-center gap-1.5"><div className="h-1 w-1 rounded-full bg-primary" /><span className="text-[9px] text-white/50">{mt({ en: 'Create or link a policy', pl: 'Tworzenie lub powiązanie polityki' })}</span></div>
          </div>
          <button className="mt-3 w-full text-[9px] px-3 py-1.5 rounded-md bg-primary/20 text-primary border border-primary/30 font-medium">{mt({ en: 'Upload Policy & Document', pl: 'Dodaj politykę lub dokument' })}</button>
        </div>
      </div>

      <div className="rounded-lg border border-dashed border-emerald-500/30 bg-emerald-500/5 p-4">
        <div className="flex flex-col items-center text-center">
          <Sparkles className="h-5 w-5 text-emerald-400/60 mb-2" />
          <p className="text-[10px] font-medium text-white/80 mb-1">{mt({ en: 'Create a Customized Policy', pl: 'Utwórz politykę dla swojej firmy' })}</p>
          <p className="text-[9px] text-white/40 mb-2">{mt({ en: 'AI-powered policy generation', pl: 'Generowanie polityk z AI' })}</p>
          <div className="space-y-1 text-left w-full">
            <div className="flex items-center gap-1.5"><div className="h-1 w-1 rounded-full bg-emerald-400" /><span className="text-[9px] text-white/50">{mt({ en: 'Define policy structure', pl: 'Określenie struktury polityki' })}</span></div>
            <div className="flex items-center gap-1.5"><div className="h-1 w-1 rounded-full bg-emerald-400" /><span className="text-[9px] text-white/50">{mt({ en: 'Link existing documents', pl: 'Powiązanie istniejących dokumentów' })}</span></div>
            <div className="flex items-center gap-1.5"><div className="h-1 w-1 rounded-full bg-emerald-400" /><span className="text-[9px] text-white/50">{mt({ en: 'Run AI indicator detection', pl: 'Wykrywanie wskaźników przez AI' })}</span></div>
          </div>
          <button className="mt-3 w-full text-[9px] px-3 py-1.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">{mt({ en: 'Create with AI', pl: 'Utwórz z AI' })}</button>
        </div>
      </div>
    </div>

    {/* Modules grid */}
    <div>
      <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-2">{mt({ en: 'Modules', pl: 'Moduły' })}</p>
      <div className="grid grid-cols-4 gap-2">
        {[
          { name: { en: 'ESG & CSRD', pl: 'ESG & CSRD' } as MockupText, icon: Leaf, color: 'text-emerald-400', border: 'border-emerald-500/20' },
          { name: { en: 'NIS2 Directive', pl: 'Dyrektywa NIS2' } as MockupText, icon: Shield, color: 'text-red-400', border: 'border-red-500/30 bg-red-500/5' },
          { name: { en: 'ISO 27001', pl: 'ISO 27001' } as MockupText, icon: Lock, color: 'text-blue-400', border: 'border-blue-500/20' },
          { name: { en: 'Carbon Footprint', pl: 'Ślad węglowy' } as MockupText, icon: Activity, color: 'text-green-400', border: 'border-green-500/20' },
        ].map((m) => (
          <div key={m.name.en} className={`rounded-lg border ${m.border} bg-white/[0.02] p-2.5`}>
            <m.icon className={`h-3.5 w-3.5 ${m.color} mb-1.5`} />
            <p className="text-[9px] font-medium text-white/80">{mt(m.name)}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

/* ═══════════════ COMPLIANCE DASHBOARD ═══════════════ */
const ComplianceDashboardMockup = () => {
  const mt = useMockupText();
  return (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-semibold text-white">{mt({ en: 'Compliance Overview', pl: 'Przegląd zgodności' })}</h4>
        <p className="text-[10px] text-white/40">{mt({ en: 'Cross-framework compliance status with AI-powered gap analysis and readiness scoring.', pl: 'Status zgodności z wieloma standardami, analiza luk z AI i ocena gotowości.' })}</p>
      </div>
      <button className="text-[10px] px-3 py-1.5 rounded-md bg-primary/20 text-primary border border-primary/30 font-medium">
        {mt({ en: 'Run AI Analysis', pl: 'Uruchom analizę AI' })}
      </button>
    </div>

    {/* Score cards */}
    <div className="grid grid-cols-4 gap-3">
      {[
        { label: { en: 'Overall Score', pl: 'Wynik ogólny' } as MockupText, value: '78%', change: '+4%', pct: 78 },
        { label: { en: 'Policies Active', pl: 'Aktywne polityki' } as MockupText, value: '24/31', change: '77%', pct: 77 },
        { label: { en: 'Open Tasks', pl: 'Otwarte zadania' } as MockupText, value: '12', change: '-3', pct: 60 },
        { label: { en: 'Audit Ready', pl: 'Gotowość do audytu' } as MockupText, value: '3/5', change: '60%', pct: 60 },
      ].map((c) => (
        <div key={c.label.en} className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
          <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1">{mt(c.label)}</p>
          <p className="text-lg font-bold text-white">{c.value}</p>
          <span className="text-[9px] text-emerald-400">{c.change}</span>
          <MiniProgress value={c.pct} color={c.pct >= 75 ? 'bg-emerald-500' : c.pct >= 50 ? 'bg-amber-500' : 'bg-red-500'} />
        </div>
      ))}
    </div>

    {/* Framework status */}
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
      <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-3">{mt({ en: 'Framework Readiness', pl: 'Gotowość według standardów' })}</p>
      <div className="space-y-2.5">
        {[
          { name: 'ISO 27001', pct: 88, status: 'complete' as const },
          { name: 'NIS2 Directive', pct: 72, status: 'partial' as const },
          { name: 'GDPR', pct: 91, status: 'complete' as const },
          { name: 'ESG / CSRD', pct: 65, status: 'partial' as const },
          { name: 'SOC 2 Type II', pct: 45, status: 'gap' as const },
        ].map((f) => (
          <div key={f.name} className="flex items-center gap-3">
            <span className="text-[10px] text-white/70 w-24 shrink-0">{f.name}</span>
            <div className="flex-1">
              <MiniProgress value={f.pct} color={f.pct >= 80 ? 'bg-emerald-500' : f.pct >= 50 ? 'bg-amber-500' : 'bg-red-500'} />
            </div>
            <span className="text-[10px] font-medium text-white/60 w-8 text-right">{f.pct}%</span>
            <StatusBadge status={f.status} />
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

/* ═══════════════ AI ANALYTICS ═══════════════ */
const AiAnalyticsMockup = () => {
  const mt = useMockupText();
  return (
  <div className="space-y-4">
    <div className="flex items-center gap-2 mb-1">
      <Sparkles className="h-4 w-4 text-primary" />
      <div>
        <h4 className="text-sm font-semibold text-white">{mt({ en: 'AI-Powered Analytics', pl: 'Analityka wspierana przez AI' })}</h4>
        <p className="text-[10px] text-white/40">{mt({ en: 'Intelligent insights, predictions, and recommendations across all compliance domains.', pl: 'Inteligentne wnioski, prognozy i rekomendacje dla wszystkich obszarów zgodności.' })}</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3">
      {/* AI Insights panel */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="h-3 w-3 text-primary" />
          <span className="text-[10px] font-medium text-white/80">{mt({ en: 'AI Compliance Insights', pl: 'Wnioski AI dotyczące zgodności' })}</span>
        </div>
        <div className="space-y-2">
          {[
            { text: { en: 'Supply chain security policy needs update for NIS2 Art. 21(2)(d)', pl: 'Polityka bezpieczeństwa łańcucha dostaw wymaga aktualizacji zgodnie z art. 21(2)(d) NIS2' } as MockupText, severity: 'gap' as const },
            { text: { en: 'ISO 27001 Annex A.8 controls fully mapped — ready for audit', pl: 'Zabezpieczenia z załącznika A.8 ISO 27001 w pełni zmapowane — gotowe do audytu' } as MockupText, severity: 'complete' as const },
            { text: { en: 'CSRD double materiality assessment 65% complete — 3 topics pending', pl: 'Ocena podwójnej istotności CSRD ukończona w 65% — 3 tematy do uzupełnienia' } as MockupText, severity: 'partial' as const },
          ].map((insight, i) => (
            <div key={i} className="rounded border border-white/5 bg-white/[0.02] p-2 flex items-start gap-2">
              <Sparkles className="h-3 w-3 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-white/60 leading-relaxed">{mt(insight.text)}</p>
                <StatusBadge status={insight.severity} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk & recommendations */}
      <div className="space-y-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
          <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-2">{mt({ en: 'Risk Assessment Summary', pl: 'Podsumowanie oceny ryzyka' })}</p>
          <div className="flex gap-4 items-center">
            <div className="relative h-14 w-14 shrink-0">
              <svg viewBox="0 0 36 36" className="h-14 w-14 -rotate-90">
                <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeDasharray="88" strokeDashoffset="19" strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">78%</span>
            </div>
            <div className="flex-1">
              <div className="flex gap-2 mb-1">
                <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">{mt({ en: 'Low: 8', pl: 'Niskie: 8' })}</span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">{mt({ en: 'Med: 4', pl: 'Średnie: 4' })}</span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-red-500/20 text-red-400">{mt({ en: 'High: 1', pl: 'Wysokie: 1' })}</span>
              </div>
              <p className="text-[9px] text-white/40">{mt({ en: '13 risks identified across 5 frameworks', pl: '13 zidentyfikowanych ryzyk w ramach 5 standardów' })}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
          <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-2">{mt({ en: 'AI Recommendations', pl: 'Rekomendacje AI' })}</p>
          <div className="space-y-1.5">
            {[
              { en: 'Complete incident response procedure for NIS2', pl: 'Uzupełnij procedurę reagowania na incydenty zgodnie z NIS2' },
              { en: 'Schedule GDPR DPIA for new data processing', pl: 'Zaplanuj DPIA dla nowego przetwarzania danych' },
              { en: 'Update asset registry for ISO 27001 audit', pl: 'Zaktualizuj rejestr aktywów przed audytem ISO 27001' },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <ArrowRight className="h-2.5 w-2.5 text-primary shrink-0" />
                <span className="text-[9px] text-white/50">{mt(r)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

/* ═══════════════ GOVERNANCE FLOW ═══════════════ */
const GovernanceFlowMockup = () => {
  const mt = useMockupText();
  return (
  <div className="space-y-4">
    <div>
      <h4 className="text-sm font-semibold text-white">{mt({ en: 'Governance & Implementation Flow', pl: 'Zarządzanie zgodnością i wdrożenie' })}</h4>
      <p className="text-[10px] text-white/40">{mt({ en: 'Structured compliance journey from onboarding through gap analysis to operational framework.', pl: 'Uporządkowany proces zapewnienia zgodności: od konfiguracji, przez analizę luk, po wdrożenie operacyjne.' })}</p>
    </div>

    {/* Flow visualization */}
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
      <div className="flex items-center justify-between mb-4">
        {[
          { en: 'AI Onboarding', pl: 'Konfiguracja z AI' },
          { en: 'Gap Analysis', pl: 'Analiza luk' },
          { en: 'Strategy', pl: 'Strategia' },
          { en: 'Implementation', pl: 'Wdrożenie' },
        ].map((step, i) => (
          <div key={step.en} className="flex items-center flex-1">
            <div className="flex items-center gap-2">
              <div className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                i <= 1 ? 'bg-primary text-white' : 'border border-white/20 text-white/30'
              }`}>
                {i <= 1 ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className={`text-[10px] ${i <= 1 ? 'text-white font-medium' : 'text-white/30'}`}>{mt(step)}</span>
            </div>
            {i < 3 && <div className={`flex-1 h-px mx-3 ${i < 1 ? 'bg-primary/50' : 'bg-white/10'}`} />}
          </div>
        ))}
      </div>
    </div>

    {/* Policy → Procedure → Task hierarchy */}
    <div className="grid grid-cols-3 gap-3">
      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Layers className="h-3.5 w-3.5 text-blue-400" />
          <span className="text-[10px] font-medium text-white/80">{mt({ en: 'Policies', pl: 'Polityki' })}</span>
        </div>
        <div className="space-y-1.5">
          {[
            { name: { en: 'Information Security', pl: 'Bezpieczeństwo informacji' } as MockupText, status: 'active' as const },
            { name: { en: 'Risk Management', pl: 'Zarządzanie ryzykiem' } as MockupText, status: 'active' as const },
            { name: { en: 'Business Continuity', pl: 'Ciągłość działania' } as MockupText, status: 'review' as const },
          ].map((p) => (
            <div key={p.name.en} className="flex items-center justify-between rounded border border-white/5 bg-white/[0.02] p-1.5">
              <span className="text-[9px] text-white/60">{mt(p.name)}</span>
              <StatusBadge status={p.status} />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <ClipboardList className="h-3.5 w-3.5 text-amber-400" />
          <span className="text-[10px] font-medium text-white/80">{mt({ en: 'Procedures', pl: 'Procedury' })}</span>
        </div>
        <div className="space-y-1.5">
          {[
            { name: { en: 'Asset Inventory', pl: 'Inwentaryzacja aktywów' } as MockupText, status: 'active' as const },
            { name: { en: 'Incident Response', pl: 'Reagowanie na incydenty' } as MockupText, status: 'draft' as const },
            { name: { en: 'Access Control', pl: 'Kontrola dostępu' } as MockupText, status: 'active' as const },
          ].map((p) => (
            <div key={p.name.en} className="flex items-center justify-between rounded border border-white/5 bg-white/[0.02] p-1.5">
              <span className="text-[9px] text-white/60">{mt(p.name)}</span>
              <StatusBadge status={p.status} />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-[10px] font-medium text-white/80">{mt({ en: 'Tasks & Register', pl: 'Zadania i rejestr' })}</span>
        </div>
        <div className="space-y-1.5">
          {[
            { name: { en: 'Network Scan', pl: 'Skanowanie sieci' } as MockupText, status: 'complete' as const },
            { name: { en: 'Risk Classification', pl: 'Klasyfikacja ryzyka' } as MockupText, status: 'partial' as const },
            { name: { en: 'Registry Update', pl: 'Aktualizacja rejestru' } as MockupText, status: 'draft' as const },
          ].map((p) => (
            <div key={p.name.en} className="flex items-center justify-between rounded border border-white/5 bg-white/[0.02] p-1.5">
              <span className="text-[9px] text-white/60">{mt(p.name)}</span>
              <StatusBadge status={p.status} />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Auto-sync note */}
    <div className="rounded border border-white/5 bg-white/[0.02] p-2 flex items-center gap-2">
      <Sparkles className="h-3 w-3 text-primary shrink-0" />
      <span className="text-[9px] text-white/50">{mt({ en: 'Auto-sync: changes in asset registry automatically update operational annexes. Policy content remains unchanged.', pl: 'Automatyczna synchronizacja: zmiany w rejestrze aktywów aktualizują załączniki operacyjne. Treść polityki pozostaje bez zmian.' })}</span>
    </div>
  </div>
  );
};

/* ═══════════════ MAIN COMPONENT ═══════════════ */
const HomePlatformMockup = () => {
  const mt = useMockupText();
  const [activeTab, setActiveTab] = useState<TabId>('hub');
  const [paused, setPaused] = useState(false);

  const nextTab = useCallback(() => {
    setActiveTab((prev) => {
      const idx = tabs.findIndex((t) => t.id === prev);
      return tabs[(idx + 1) % tabs.length].id;
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(nextTab, 4000);
    return () => clearInterval(id);
  }, [paused, nextTab]);

  const renderTab = () => {
    switch (activeTab) {
      case 'hub': return <PolicyHubMockup />;
      case 'compliance': return <ComplianceDashboardMockup />;
      case 'ai': return <AiAnalyticsMockup />;
      case 'governance': return <GovernanceFlowMockup />;
    }
  };

  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
        <div className="flex gap-1.5 mr-3">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/40" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="rounded-md bg-white/5 border border-white/10 px-4 py-1 text-[10px] text-white/30 w-64 text-center">
            app.quantifier.ai
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-colors whitespace-nowrap border-b-2 ${
              activeTab === id
                ? 'border-primary text-primary bg-primary/5'
                : 'border-transparent text-white/40 hover:text-white/60'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {mt(label)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-5 min-h-[380px]">
        {renderTab()}
      </div>
    </div>
  );
};

export default HomePlatformMockup;
