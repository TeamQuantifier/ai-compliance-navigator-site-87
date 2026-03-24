import { useState, useEffect, useCallback } from 'react';
import {
  Shield, FileText, AlertTriangle, Activity, Users, Search,
  ChevronDown, ChevronUp, Sparkles, BarChart3, Upload, Link2,
  CheckCircle2, Clock, XCircle, GraduationCap, Eye
} from 'lucide-react';

/* ─── tab navigation ─── */
const tabs = [
  { id: 'dashboard', label: 'NIS2 Dashboard', icon: BarChart3 },
  { id: 'policy', label: 'Policy & Governance', icon: FileText },
  { id: 'wizard', label: 'AI Document Wizard', icon: Sparkles },
  { id: 'training', label: 'HR & Training', icon: GraduationCap },
] as const;

type TabId = (typeof tabs)[number]['id'];

/* ─── status badge ─── */
const StatusBadge = ({ status }: { status: 'gap' | 'missing' | 'completed' | 'signed' | 'pending' | 'overdue' | 'in_progress' | 'scheduled' }) => {
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
      {status.replace('_', ' ')}
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
const DashboardMockup = () => (
  <div className="space-y-4">
    {/* header */}
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-semibold text-white">NIS2 Dashboard</h4>
        <p className="text-[10px] text-white/40">Interactive command center for readiness, gaps, risks, incidents, suppliers, tasks, and audit preparation.</p>
      </div>
      <button className="text-[10px] px-3 py-1.5 rounded-md bg-primary/20 text-primary border border-primary/30 font-medium">
        Open Gap Analysis
      </button>
    </div>

    {/* compliance score */}
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
      <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-3">NIS2 Compliance Readiness Score</p>
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
          <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">AI Summary</p>
          <p className="text-xs text-white/70">Risk Management requires attention (Art. 21(2)(a)). Supply Chain Security partially implemented.</p>
          <div className="flex gap-2 mt-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Good: 6</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">Partial: 3</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-400">Gap: 1</span>
          </div>
        </div>
      </div>
    </div>

    {/* domains grid */}
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
        <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-3">Compliance Domains Status</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: 'Risk Management', pct: 85, status: 'completed' as const },
            { name: 'Assets & Measures', pct: 60, status: 'in_progress' as const },
            { name: 'HR & Training', pct: 90, status: 'completed' as const },
            { name: 'Incident Handling', pct: 45, status: 'gap' as const },
            { name: 'Supply Chain', pct: 70, status: 'in_progress' as const },
            { name: 'Business Continuity', pct: 80, status: 'completed' as const },
          ].map((d) => (
            <div key={d.name} className="rounded border border-white/5 bg-white/[0.02] p-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-white/70 truncate">{d.name}</span>
                <StatusBadge status={d.status} />
              </div>
              <span className="text-sm font-bold text-white">{d.pct}%</span>
              <MiniProgress value={d.pct} color={d.pct >= 80 ? 'bg-emerald-500' : d.pct >= 50 ? 'bg-amber-500' : 'bg-red-500'} />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
        <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-3">Policy Coverage</p>
        <div className="space-y-2">
          {[
            { name: 'ISMS Policy', status: 'completed' as const },
            { name: 'Risk Assessment Policy', status: 'completed' as const },
            { name: 'Incident Handling Policy', status: 'pending' as const },
            { name: 'Supply Chain Security Policy', status: 'missing' as const },
            { name: 'Business Continuity Policy', status: 'completed' as const },
          ].map((p) => (
            <div key={p.name} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
              <span className="text-[10px] text-white/70">{p.name}</span>
              <StatusBadge status={p.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ═══════════════ POLICY TAB ═══════════════ */
const PolicyMockup = () => (
  <div className="space-y-4">
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Shield className="h-4 w-4 text-white/40" />
        <h4 className="text-sm font-semibold text-white">Top Level &middot; ISMS Policy</h4>
      </div>
      <p className="text-[10px] text-white/40">Central governance layer for cybersecurity ownership, board oversight, and operational accountability under NIS2.</p>
    </div>

    {/* breadcrumb flow */}
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
      <div className="flex gap-2 mb-2">
        <span className="text-[9px] px-2 py-0.5 rounded-full border border-primary/30 text-primary">AI-native compliance workspace</span>
        <span className="text-[9px] px-2 py-0.5 rounded-full border border-primary/30 text-primary">Policy → AI Insights → Registers → Procedures</span>
      </div>
      <p className="text-[10px] text-white/50">ISMS Policy Governance Workspace</p>
      <p className="text-[9px] text-white/30">Policy → AI Policy Insights → ISMS Governance & Responsibilities → Procedures & Tasks</p>
    </div>

    {/* Policies section */}
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText className="h-3.5 w-3.5 text-white/40" />
          <span className="text-xs font-medium text-white/80">Policies</span>
        </div>
        <ChevronUp className="h-3.5 w-3.5 text-white/30" />
      </div>
      <div className="rounded border border-white/5 bg-white/[0.02] p-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs font-medium text-white/80">ISMS Policy</p>
            <p className="text-[10px] text-white/40">This top-level policy defines governance structure, accountability, approvals, and review obligations.</p>
          </div>
          <StatusBadge status="completed" />
        </div>
        <div className="flex items-center justify-between rounded border border-white/5 bg-white/[0.02] p-2 mt-2">
          <span className="text-[10px] text-white/50">ISMS policy linked and analyzed</span>
          <div className="flex gap-2">
            <button className="text-[9px] px-2 py-1 rounded bg-primary/20 text-primary border border-primary/30">View Policy</button>
            <button className="text-[9px] px-2 py-1 rounded bg-white/5 text-white/60 border border-white/10">Re-analyze</button>
          </div>
        </div>
      </div>
    </div>

    {/* AI Insights */}
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs font-medium text-white/80">AI Policy Insights</span>
      </div>
      <p className="text-[10px] text-white/40 mb-2">Automatically extracted governance insights from your ISMS policy.</p>
      <div className="rounded border border-white/5 bg-white/[0.02] p-2 flex items-center gap-2">
        <Sparkles className="h-3 w-3 text-primary shrink-0" />
        <span className="text-[10px] text-white/50">3 governance insights extracted. Board oversight requirement identified.</span>
      </div>
    </div>
  </div>
);

/* ═══════════════ WIZARD TAB ═══════════════ */
const WizardMockup = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 mb-1">
      <Sparkles className="h-4 w-4 text-primary" />
      <div>
        <h4 className="text-sm font-semibold text-white">AI Document Wizard</h4>
        <p className="text-[10px] text-white/40">Create a compliance-ready document with AI assistance</p>
      </div>
    </div>

    {/* stepper */}
    <div className="flex items-center gap-0">
      {['Setup', 'Content', 'Compliance', 'Review'].map((s, i) => (
        <div key={s} className="flex items-center flex-1">
          <div className="flex items-center gap-1.5">
            <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-bold ${i === 0 ? 'bg-primary text-white' : 'border border-white/20 text-white/30'}`}>
              {i + 1}
            </div>
            <span className={`text-[10px] ${i === 0 ? 'text-white font-medium' : 'text-white/30'}`}>{s}</span>
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
          <span className="text-[10px] font-medium text-white/80">AI Guide</span>
        </div>
        <div className="rounded border border-white/5 bg-white/[0.02] p-2">
          <p className="text-[10px] text-white/50 leading-relaxed">
            Hi! I'm your AI policy assistant. I can help you understand compliance requirements, recommend document sections, and guide you through best practices for your chosen frameworks.
          </p>
        </div>
        <div className="mt-2 flex items-center gap-2 rounded border border-white/5 bg-white/[0.02] p-1.5">
          <input className="flex-1 bg-transparent text-[10px] text-white/40 outline-none placeholder:text-white/20" placeholder="Ask a follow-up question..." readOnly />
          <div className="h-4 w-4 rounded bg-primary/20 flex items-center justify-center">
            <ChevronUp className="h-2.5 w-2.5 text-primary rotate-90" />
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-2.5">
        <div>
          <label className="text-[10px] text-white/60 mb-1 block">Document Title *</label>
          <div className="rounded border border-white/10 bg-white/[0.02] px-2 py-1.5">
            <span className="text-[10px] text-white/70">Information Security Policy</span>
          </div>
        </div>
        <div>
          <label className="text-[10px] text-white/60 mb-1 block">Document Type *</label>
          <div className="grid grid-cols-3 gap-1.5">
            {['Policy', 'Procedure', 'Standard'].map((t, i) => (
              <div key={t} className={`rounded border p-1.5 text-center ${i === 0 ? 'border-primary/40 bg-primary/10' : 'border-white/10 bg-white/[0.02]'}`}>
                <FileText className={`h-3 w-3 mx-auto mb-0.5 ${i === 0 ? 'text-primary' : 'text-white/30'}`} />
                <span className={`text-[9px] ${i === 0 ? 'text-primary font-medium' : 'text-white/40'}`}>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[10px] text-white/60 mb-1 block">Compliance Frameworks</label>
          <div className="flex gap-1.5">
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary">NIS2</span>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40">+ Add framework</span>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="text-[10px] px-3 py-1.5 rounded bg-primary/20 text-primary border border-primary/30 font-medium">Next: Generate</button>
        </div>
      </div>
    </div>
  </div>
);

/* ═══════════════ TRAINING TAB ═══════════════ */
const TrainingMockup = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-semibold text-white">HR & Trainings Activities</h4>
        <p className="text-[10px] text-white/40">Training completion and employment cybersecurity sign-off records mapped to NIS2.</p>
      </div>
      <button className="text-[10px] px-3 py-1.5 rounded-md bg-white/5 text-white/60 border border-white/10">Open training register</button>
    </div>

    {/* Training table */}
    <div className="rounded-lg border border-white/10 bg-white/[0.02] overflow-hidden">
      <div className="px-3 py-2 border-b border-white/5">
        <span className="text-[10px] font-medium text-white/70">Security Training List</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="border-b border-white/5 text-white/40">
              <th className="text-left px-3 py-1.5 font-medium">Training</th>
              <th className="text-left px-2 py-1.5 font-medium">Type</th>
              <th className="text-left px-2 py-1.5 font-medium">Completion</th>
              <th className="text-left px-2 py-1.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-white/60">
            <tr className="border-b border-white/5">
              <td className="px-3 py-2">Cybersecurity Onboarding</td>
              <td className="px-2 py-2">Onboarding</td>
              <td className="px-2 py-2">92%</td>
              <td className="px-2 py-2"><StatusBadge status="completed" /></td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="px-3 py-2">Privileged Access & Identity</td>
              <td className="px-2 py-2">Role-specific</td>
              <td className="px-2 py-2">61%</td>
              <td className="px-2 py-2"><StatusBadge status="in_progress" /></td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="px-3 py-2">Phishing Readiness Drill</td>
              <td className="px-2 py-2">Awareness</td>
              <td className="px-2 py-2">38%</td>
              <td className="px-2 py-2"><StatusBadge status="scheduled" /></td>
            </tr>
            <tr>
              <td className="px-3 py-2">Secure Offboarding Data</td>
              <td className="px-2 py-2">Offboarding</td>
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
        <span className="text-[10px] font-medium text-white/70">Employment Cybersecurity Sign-off List</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="border-b border-white/5 text-white/40">
              <th className="text-left px-3 py-1.5 font-medium">Employee</th>
              <th className="text-left px-2 py-1.5 font-medium">Role</th>
              <th className="text-left px-2 py-1.5 font-medium">Document</th>
              <th className="text-left px-2 py-1.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-white/60">
            <tr className="border-b border-white/5">
              <td className="px-3 py-2">Anna Kowalska</td>
              <td className="px-2 py-2">Backend Engineer</td>
              <td className="px-2 py-2">Cybersecurity Acknowledgement</td>
              <td className="px-2 py-2"><StatusBadge status="signed" /></td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="px-3 py-2">Luca Moretti</td>
              <td className="px-2 py-2">SOC Analyst</td>
              <td className="px-2 py-2">Acceptable Use & MFA</td>
              <td className="px-2 py-2"><StatusBadge status="signed" /></td>
            </tr>
            <tr>
              <td className="px-3 py-2">Maya Patel</td>
              <td className="px-2 py-2">Supplier Risk</td>
              <td className="px-2 py-2">Incident Reporting Terms</td>
              <td className="px-2 py-2"><StatusBadge status="pending" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

/* ═══════════════ MAIN COMPONENT ═══════════════ */
const Nis2PlatformMockups = () => {
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
    const id = setInterval(nextTab, 5000);
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
    <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
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
            {label}
          </button>
        ))}
      </div>

      {/* content */}
      <div className="p-5 min-h-[380px]">
        {renderTab()}
      </div>
    </div>
  );
};

export default Nis2PlatformMockups;
