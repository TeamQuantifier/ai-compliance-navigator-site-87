import { useState, useEffect, useCallback } from 'react';
import {
  Shield, FileText, AlertTriangle, Activity, Users, Search,
  ChevronDown, ChevronUp, Sparkles, BarChart3, Upload, Link2,
  CheckCircle2, Clock, XCircle, GraduationCap, Eye
} from 'lucide-react';
import { useMockupText, type MockupText } from '@/lib/mockup-text';

/* ─── tab navigation ─── */
const tabs = [
  { id: 'dashboard', label: { en: 'NIS2 Dashboard', pl: 'Panel NIS2' } as MockupText, icon: BarChart3 },
  { id: 'policy', label: { en: 'Policy & Governance', pl: 'Polityki i nadzór' } as MockupText, icon: FileText },
  { id: 'wizard', label: { en: 'AI Document Wizard', pl: 'Kreator dokumentów AI' } as MockupText, icon: Sparkles },
  { id: 'training', label: { en: 'HR & Training', pl: 'HR i szkolenia' } as MockupText, icon: GraduationCap },
] as const;

type TabId = (typeof tabs)[number]['id'];

/* ─── status badge ─── */
const statusLabels: Record<'gap' | 'missing' | 'completed' | 'signed' | 'pending' | 'overdue' | 'in_progress' | 'scheduled', MockupText> = {
  gap: { en: 'gap', pl: 'Luka' },
  missing: { en: 'missing', pl: 'Brak' },
  overdue: { en: 'overdue', pl: 'Po terminie' },
  completed: { en: 'completed', pl: 'Zakończone' },
  signed: { en: 'signed', pl: 'Podpisane' },
  pending: { en: 'pending', pl: 'Oczekuje' },
  in_progress: { en: 'in progress', pl: 'W toku' },
  scheduled: { en: 'scheduled', pl: 'Zaplanowane' },
};

const StatusBadge = ({ status }: { status: 'gap' | 'missing' | 'completed' | 'signed' | 'pending' | 'overdue' | 'in_progress' | 'scheduled' }) => {
  const mt = useMockupText();
  const styles: Record<string, string> = {
    gap: 'bg-red-500/20 text-red-400 border-red-500/30',
    missing: 'bg-red-500/20 text-red-400 border-red-500/30',
    overdue: 'bg-red-500/20 text-red-400 border-red-500/30',
    completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    signed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    in_progress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    scheduled: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${styles[status]}`}>
      {mt(statusLabels[status])}
    </span>
  );
};

/* ─── progress bar ─── */
const MiniProgress = ({ value, color = 'bg-primary' }: { value: number; color?: string }) => (
  <div className="h-1 w-full rounded-full bg-white/10 mt-1">
    <div className={`h-1 rounded-full ${color}`} style={{ width: `${value}%` }} />
  </div>
);

/* ═══════════════ DASHBOARD TAB ═══════════════ */
const DashboardMockup = () => {
  const mt = useMockupText();
  return (
  <div className="space-y-4">
    {/* header */}
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-semibold text-white">{mt({ en: 'NIS2 Dashboard', pl: 'Panel NIS2' })}</h4>
        <p className="text-[10px] text-white/40">{mt({ en: 'Interactive command center for readiness, gaps, risks, incidents, suppliers, tasks, and audit preparation.', pl: 'Centrum zarządzania gotowością, lukami, ryzykiem, incydentami, dostawcami, zadaniami i przygotowaniem do audytu.' })}</p>
      </div>
      <button className="text-[10px] px-3 py-1.5 rounded-md bg-primary/20 text-primary border border-primary/30 font-medium">
        {mt({ en: 'Open Gap Analysis', pl: 'Otwórz analizę luk' })}
      </button>
    </div>

    {/* compliance score */}
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
      <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-3">{mt({ en: 'NIS2 Compliance Readiness Score', pl: 'Poziom gotowości do zgodności z NIS2' })}</p>
      <div className="flex gap-4 items-center">
        {/* circular gauge placeholder */}
        <div className="relative h-16 w-16 shrink-0">
          <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
            <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
            <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeDasharray="88" strokeDashoffset="22" strokeLinecap="round" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">75%</span>
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">{mt({ en: 'AI Summary', pl: 'Podsumowanie AI' })}</p>
          <p className="text-xs text-white/70">{mt({ en: 'Risk Management requires attention (Art. 21(2)(a)). Supply Chain Security partially implemented.', pl: 'Zarządzanie ryzykiem wymaga uwagi (art. 21 ust. 2 lit. a). Bezpieczeństwo łańcucha dostaw wdrożono częściowo.' })}</p>
          <div className="flex gap-2 mt-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">{mt({ en: 'Good: 6', pl: 'Zgodne: 6' })}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">{mt({ en: 'Partial: 3', pl: 'Częściowo: 3' })}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-400">{mt({ en: 'Gap: 1', pl: 'Luki: 1' })}</span>
          </div>
        </div>
      </div>
    </div>

    {/* domains grid */}
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
        <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-3">{mt({ en: 'Compliance Domains Status', pl: 'Status obszarów zgodności' })}</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: { en: 'Risk Management', pl: 'Zarządzanie ryzykiem' } as MockupText, pct: 85, status: 'completed' as const },
            { name: { en: 'Assets & Measures', pl: 'Zasoby i środki' } as MockupText, pct: 60, status: 'in_progress' as const },
            { name: { en: 'HR & Training', pl: 'HR i szkolenia' } as MockupText, pct: 90, status: 'completed' as const },
            { name: { en: 'Incident Handling', pl: 'Obsługa incydentów' } as MockupText, pct: 45, status: 'gap' as const },
            { name: { en: 'Supply Chain', pl: 'Łańcuch dostaw' } as MockupText, pct: 70, status: 'in_progress' as const },
            { name: { en: 'Business Continuity', pl: 'Ciągłość działania' } as MockupText, pct: 80, status: 'completed' as const },
          ].map((d) => (
            <div key={d.name.en} className="rounded border border-white/5 bg-white/[0.02] p-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-white/70 truncate">{mt(d.name)}</span>
                <StatusBadge status={d.status} />
              </div>
              <span className="text-sm font-bold text-white">{d.pct}%</span>
              <MiniProgress value={d.pct} color={d.pct >= 80 ? 'bg-emerald-500' : d.pct >= 50 ? 'bg-amber-500' : 'bg-red-500'} />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
        <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-3">{mt({ en: 'Policy Coverage', pl: 'Pokrycie wymaganiami polityk' })}</p>
        <div className="space-y-2">
          {[
            { name: { en: 'ISMS Policy', pl: 'Polityka SZBI' } as MockupText, status: 'completed' as const },
            { name: { en: 'Risk Assessment Policy', pl: 'Polityka oceny ryzyka' } as MockupText, status: 'completed' as const },
            { name: { en: 'Incident Handling Policy', pl: 'Polityka obsługi incydentów' } as MockupText, status: 'pending' as const },
            { name: { en: 'Supply Chain Security Policy', pl: 'Polityka bezpieczeństwa łańcucha dostaw' } as MockupText, status: 'missing' as const },
            { name: { en: 'Business Continuity Policy', pl: 'Polityka ciągłości działania' } as MockupText, status: 'completed' as const },
          ].map((p) => (
            <div key={p.name.en} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
              <span className="text-[10px] text-white/70">{mt(p.name)}</span>
              <StatusBadge status={p.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

/* ═══════════════ POLICY TAB ═══════════════ */
const PolicyMockup = () => {
  const mt = useMockupText();
  return (
  <div className="space-y-4">
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Shield className="h-4 w-4 text-white/40" />
        <h4 className="text-sm font-semibold text-white">{mt({ en: 'Top Level · ISMS Policy', pl: 'Poziom nadrzędny · Polityka SZBI' })}</h4>
      </div>
      <p className="text-[10px] text-white/40">{mt({ en: 'Central governance layer for cybersecurity ownership, board oversight, and operational accountability under NIS2.', pl: 'Centralny obszar zarządzania odpowiedzialnością za cyberbezpieczeństwo, nadzorem zarządu i obowiązkami operacyjnymi zgodnie z NIS2.' })}</p>
    </div>

    {/* breadcrumb flow */}
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
      <div className="flex gap-2 mb-2">
        <span className="text-[9px] px-2 py-0.5 rounded-full border border-primary/30 text-primary">{mt({ en: 'AI-native compliance workspace', pl: 'Zarządzanie zgodnością wspierane przez AI' })}</span>
        <span className="text-[9px] px-2 py-0.5 rounded-full border border-primary/30 text-primary">{mt({ en: 'Policy → AI Insights → Registers → Procedures', pl: 'Polityka → Wnioski AI → Rejestry → Procedury' })}</span>
      </div>
      <p className="text-[10px] text-white/50">{mt({ en: 'ISMS Policy Governance Workspace', pl: 'Zarządzanie polityką SZBI' })}</p>
      <p className="text-[9px] text-white/30">{mt({ en: 'Policy → AI Policy Insights → ISMS Governance & Responsibilities → Procedures & Tasks', pl: 'Polityka → Analiza polityki AI → Nadzór i odpowiedzialność w SZBI → Procedury i zadania' })}</p>
    </div>

    {/* Policies section */}
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText className="h-3.5 w-3.5 text-white/40" />
          <span className="text-xs font-medium text-white/80">{mt({ en: 'Policies', pl: 'Polityki' })}</span>
        </div>
        <ChevronUp className="h-3.5 w-3.5 text-white/30" />
      </div>
      <div className="rounded border border-white/5 bg-white/[0.02] p-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs font-medium text-white/80">{mt({ en: 'ISMS Policy', pl: 'Polityka SZBI' })}</p>
            <p className="text-[10px] text-white/40">{mt({ en: 'This top-level policy defines governance structure, accountability, approvals, and review obligations.', pl: 'Polityka nadrzędna określa strukturę zarządzania, odpowiedzialność, zasady zatwierdzania i obowiązki przeglądu.' })}</p>
          </div>
          <StatusBadge status="completed" />
        </div>
        <div className="flex items-center justify-between rounded border border-white/5 bg-white/[0.02] p-2 mt-2">
          <span className="text-[10px] text-white/50">{mt({ en: 'ISMS policy linked and analyzed', pl: 'Polityka SZBI powiązana i przeanalizowana' })}</span>
          <div className="flex gap-2">
            <button className="text-[9px] px-2 py-1 rounded bg-primary/20 text-primary border border-primary/30">{mt({ en: 'View Policy', pl: 'Zobacz politykę' })}</button>
            <button className="text-[9px] px-2 py-1 rounded bg-white/5 text-white/60 border border-white/10">{mt({ en: 'Re-analyze', pl: 'Przeanalizuj ponownie' })}</button>
          </div>
        </div>
      </div>
    </div>

    {/* AI Insights */}
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs font-medium text-white/80">{mt({ en: 'AI Policy Insights', pl: 'Analiza polityki AI' })}</span>
      </div>
      <p className="text-[10px] text-white/40 mb-2">{mt({ en: 'Automatically extracted governance insights from your ISMS policy.', pl: 'Automatycznie wyodrębnione wnioski dotyczące zarządzania z polityki SZBI.' })}</p>
      <div className="rounded border border-white/5 bg-white/[0.02] p-2 flex items-center gap-2">
        <Sparkles className="h-3 w-3 text-primary shrink-0" />
        <span className="text-[10px] text-white/50">{mt({ en: '3 governance insights extracted. Board oversight requirement identified.', pl: 'Wyodrębniono 3 wnioski dotyczące zarządzania. Zidentyfikowano wymóg nadzoru zarządu.' })}</span>
      </div>
    </div>
  </div>
  );
};

/* ═══════════════ WIZARD TAB ═══════════════ */
const WizardMockup = () => {
  const mt = useMockupText();
  return (
  <div className="space-y-4">
    <div className="flex items-center gap-2 mb-1">
      <Sparkles className="h-4 w-4 text-primary" />
      <div>
        <h4 className="text-sm font-semibold text-white">{mt({ en: 'AI Document Wizard', pl: 'Kreator dokumentów AI' })}</h4>
        <p className="text-[10px] text-white/40">{mt({ en: 'Create a compliance-ready document with AI assistance', pl: 'Twórz dokumenty zgodne z wymaganiami przy wsparciu AI' })}</p>
      </div>
    </div>

    {/* stepper */}
    <div className="flex items-center gap-0">
      {[
        { en: 'Setup', pl: 'Ustawienia' },
        { en: 'Content', pl: 'Treść' },
        { en: 'Compliance', pl: 'Zgodność' },
        { en: 'Review', pl: 'Przegląd' },
      ].map((s, i) => (
        <div key={s.en} className="flex items-center flex-1">
          <div className="flex items-center gap-1.5">
            <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-bold ${i === 0 ? 'bg-primary text-white' : 'border border-white/20 text-white/30'}`}>
              {i + 1}
            </div>
            <span className={`text-[10px] ${i === 0 ? 'text-white font-medium' : 'text-white/30'}`}>{mt(s)}</span>
          </div>
          {i < 3 && <div className="flex-1 h-px bg-white/10 mx-2" />}
        </div>
      ))}
    </div>

    <div className="grid grid-cols-2 gap-3">
      {/* AI Guide */}
      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="h-3 w-3 text-primary" />
          <span className="text-[10px] font-medium text-white/80">{mt({ en: 'AI Guide', pl: 'Asystent AI' })}</span>
        </div>
        <div className="rounded border border-white/5 bg-white/[0.02] p-2">
          <p className="text-[10px] text-white/50 leading-relaxed">
            {mt({ en: "Hi! I'm your AI policy assistant. I can help you understand compliance requirements, recommend document sections, and guide you through best practices for your chosen frameworks.", pl: 'Cześć! Jestem asystentem AI ds. polityk. Pomogę zrozumieć wymagania zgodności, zaproponować sekcje dokumentu i wskazać dobre praktyki dla wybranych norm i regulacji.' })}
          </p>
        </div>
        <div className="mt-2 flex items-center gap-2 rounded border border-white/5 bg-white/[0.02] p-1.5">
          <input className="flex-1 bg-transparent text-[10px] text-white/40 outline-none placeholder:text-white/20" placeholder={mt({ en: 'Ask a follow-up question...', pl: 'Zadaj dodatkowe pytanie...' })} readOnly />
          <div className="h-4 w-4 rounded bg-primary/20 flex items-center justify-center">
            <ChevronUp className="h-2.5 w-2.5 text-primary rotate-90" />
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-2.5">
        <div>
          <label className="text-[10px] text-white/60 mb-1 block">{mt({ en: 'Document Title *', pl: 'Tytuł dokumentu *' })}</label>
          <div className="rounded border border-white/10 bg-white/[0.02] px-2 py-1.5">
            <span className="text-[10px] text-white/70">{mt({ en: 'Information Security Policy', pl: 'Polityka bezpieczeństwa informacji' })}</span>
          </div>
        </div>
        <div>
          <label className="text-[10px] text-white/60 mb-1 block">{mt({ en: 'Document Type *', pl: 'Typ dokumentu *' })}</label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { en: 'Policy', pl: 'Polityka' },
              { en: 'Procedure', pl: 'Procedura' },
              { en: 'Standard', pl: 'Standard' },
            ].map((t, i) => (
              <div key={t.en} className={`rounded border p-1.5 text-center ${i === 0 ? 'border-primary/40 bg-primary/10' : 'border-white/10 bg-white/[0.02]'}`}>
                <FileText className={`h-3 w-3 mx-auto mb-0.5 ${i === 0 ? 'text-primary' : 'text-white/30'}`} />
                <span className={`text-[9px] ${i === 0 ? 'text-primary font-medium' : 'text-white/40'}`}>{mt(t)}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[10px] text-white/60 mb-1 block">{mt({ en: 'Compliance Frameworks', pl: 'Normy i regulacje' })}</label>
          <div className="flex gap-1.5">
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary">NIS2</span>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40">{mt({ en: '+ Add framework', pl: '+ Dodaj normę' })}</span>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="text-[10px] px-3 py-1.5 rounded bg-primary/20 text-primary border border-primary/30 font-medium">{mt({ en: 'Next: Generate', pl: 'Dalej: Generuj' })}</button>
        </div>
      </div>
    </div>
  </div>
  );
};

/* ═══════════════ TRAINING TAB ═══════════════ */
const TrainingMockup = () => {
  const mt = useMockupText();
  return (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-semibold text-white">{mt({ en: 'HR & Trainings Activities', pl: 'HR i szkolenia' })}</h4>
        <p className="text-[10px] text-white/40">{mt({ en: 'Training completion and employment cybersecurity sign-off records mapped to NIS2.', pl: 'Realizacja szkoleń i potwierdzenia pracowników dotyczące cyberbezpieczeństwa powiązane z wymaganiami NIS2.' })}</p>
      </div>
      <button className="text-[10px] px-3 py-1.5 rounded-md bg-white/5 text-white/60 border border-white/10">{mt({ en: 'Open training register', pl: 'Otwórz rejestr szkoleń' })}</button>
    </div>

    {/* Training table */}
    <div className="rounded-lg border border-white/10 bg-white/[0.02] overflow-hidden">
      <div className="px-3 py-2 border-b border-white/5">
        <span className="text-[10px] font-medium text-white/70">{mt({ en: 'Security Training List', pl: 'Lista szkoleń z bezpieczeństwa' })}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="border-b border-white/5 text-white/40">
              <th className="text-left px-3 py-1.5 font-medium">{mt({ en: 'Training', pl: 'Szkolenie' })}</th>
              <th className="text-left px-2 py-1.5 font-medium">{mt({ en: 'Type', pl: 'Typ' })}</th>
              <th className="text-left px-2 py-1.5 font-medium">{mt({ en: 'Completion', pl: 'Realizacja' })}</th>
              <th className="text-left px-2 py-1.5 font-medium">{mt({ en: 'Status', pl: 'Status' })}</th>
            </tr>
          </thead>
          <tbody className="text-white/60">
            <tr className="border-b border-white/5">
              <td className="px-3 py-2">{mt({ en: 'Cybersecurity Onboarding', pl: 'Wprowadzenie do cyberbezpieczeństwa' })}</td>
              <td className="px-2 py-2">{mt({ en: 'Onboarding', pl: 'Wdrożenie' })}</td>
              <td className="px-2 py-2">92%</td>
              <td className="px-2 py-2"><StatusBadge status="completed" /></td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="px-3 py-2">{mt({ en: 'Privileged Access & Identity', pl: 'Dostęp uprzywilejowany i tożsamość' })}</td>
              <td className="px-2 py-2">{mt({ en: 'Role-specific', pl: 'Dla danej roli' })}</td>
              <td className="px-2 py-2">61%</td>
              <td className="px-2 py-2"><StatusBadge status="in_progress" /></td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="px-3 py-2">{mt({ en: 'Phishing Readiness Drill', pl: 'Ćwiczenie odporności na phishing' })}</td>
              <td className="px-2 py-2">{mt({ en: 'Awareness', pl: 'Budowanie świadomości' })}</td>
              <td className="px-2 py-2">38%</td>
              <td className="px-2 py-2"><StatusBadge status="scheduled" /></td>
            </tr>
            <tr>
              <td className="px-3 py-2">{mt({ en: 'Secure Offboarding Data', pl: 'Bezpieczeństwo danych przy odejściu' })}</td>
              <td className="px-2 py-2">{mt({ en: 'Offboarding', pl: 'Zakończenie współpracy' })}</td>
              <td className="px-2 py-2">24%</td>
              <td className="px-2 py-2"><StatusBadge status="overdue" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* Sign-off table */}
    <div className="rounded-lg border border-white/10 bg-white/[0.02] overflow-hidden">
      <div className="px-3 py-2 border-b border-white/5">
        <span className="text-[10px] font-medium text-white/70">{mt({ en: 'Employment Cybersecurity Sign-off List', pl: 'Potwierdzenia pracowników w zakresie cyberbezpieczeństwa' })}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="border-b border-white/5 text-white/40">
              <th className="text-left px-3 py-1.5 font-medium">{mt({ en: 'Employee', pl: 'Pracownik' })}</th>
              <th className="text-left px-2 py-1.5 font-medium">{mt({ en: 'Role', pl: 'Rola' })}</th>
              <th className="text-left px-2 py-1.5 font-medium">{mt({ en: 'Document', pl: 'Dokument' })}</th>
              <th className="text-left px-2 py-1.5 font-medium">{mt({ en: 'Status', pl: 'Status' })}</th>
            </tr>
          </thead>
          <tbody className="text-white/60">
            <tr className="border-b border-white/5">
              <td className="px-3 py-2">Anna Kowalska</td>
              <td className="px-2 py-2">{mt({ en: 'Backend Engineer', pl: 'Inżynier backendu' })}</td>
              <td className="px-2 py-2">{mt({ en: 'Cybersecurity Acknowledgement', pl: 'Oświadczenie dotyczące cyberbezpieczeństwa' })}</td>
              <td className="px-2 py-2"><StatusBadge status="signed" /></td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="px-3 py-2">Luca Moretti</td>
              <td className="px-2 py-2">{mt({ en: 'SOC Analyst', pl: 'Analityk SOC' })}</td>
              <td className="px-2 py-2">{mt({ en: 'Acceptable Use & MFA', pl: 'Zasady użytkowania i MFA' })}</td>
              <td className="px-2 py-2"><StatusBadge status="signed" /></td>
            </tr>
            <tr>
              <td className="px-3 py-2">Maya Patel</td>
              <td className="px-2 py-2">{mt({ en: 'Supplier Risk', pl: 'Ryzyko dostawców' })}</td>
              <td className="px-2 py-2">{mt({ en: 'Incident Reporting Terms', pl: 'Zasady zgłaszania incydentów' })}</td>
              <td className="px-2 py-2"><StatusBadge status="pending" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

/* ═══════════════ MAIN COMPONENT ═══════════════ */
const Nis2PlatformMockups = () => {
  const mt = useMockupText();
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [paused, setPaused] = useState(false);

  const nextTab = useCallback(() => {
    setActiveTab((prev) => {
      const idx = tabs.findIndex((t) => t.id === prev);
      return tabs[(idx + 1) % tabs.length].id;
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(nextTab, 2000);
    return () => clearInterval(id);
  }, [paused, nextTab]);
  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardMockup />;
      case 'policy': return <PolicyMockup />;
      case 'wizard': return <WizardMockup />;
      case 'training': return <TrainingMockup />;
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* mockup chrome bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
        <div className="flex gap-1.5 mr-3">
          <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="rounded-md bg-white/5 border border-white/10 px-4 py-1 text-[10px] text-white/30 w-64 text-center">
            app.quantifier.ai/nis2
          </div>
        </div>
      </div>

      {/* tabs */}
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

      {/* content */}
      <div className="p-5 h-[480px] overflow-y-auto">
        {renderTab()}
      </div>
    </div>
  );
};

export default Nis2PlatformMockups;
