import { useState, useEffect, useCallback } from 'react';
import {
  FileText, Sparkles, BarChart3, Shield, Upload, CheckCircle2,
  GitBranch, Leaf, Lock, Network, ChevronUp, Eye, Activity,
  ClipboardList, ArrowRight, Layers
} from 'lucide-react';

/* ─── tabs ─── */
const tabs = [
  { id: 'hub', label: 'Policy & Document Hub', icon: FileText },
  { id: 'compliance', label: 'Compliance Dashboard', icon: BarChart3 },
  { id: 'ai', label: 'AI Analytics', icon: Sparkles },
  { id: 'governance', label: 'Governance Flow', icon: GitBranch },
] as const;

type TabId = (typeof tabs)[number]['id'];

/* ─── status badge ─── */
const StatusBadge = ({ status, label }: { status: 'active' | 'review' | 'draft' | 'complete' | 'partial' | 'gap'; label?: string }) => {
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
      {label || status}
    </span>
  );
};

const MiniProgress = ({ value, color = 'bg-primary' }: { value: number; color?: string }) => (
  <div className="h-1 w-full rounded-full bg-white/10 mt-1">
    <div className={`h-1 rounded-full ${color}`} style={{ width: `${value}%` }} />
  </div>
);

/* ═══════════════ POLICY HUB TAB ═══════════════ */
const PolicyHubMockup = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-semibold text-white">Multi-Framework Policy Hub</h4>
        <p className="text-[10px] text-white/40">Centralized document management across regulatory frameworks, custom company policies, and strategic documents for AI analysis.</p>
      </div>
    </div>

    {/* Tab bar */}
    <div className="flex gap-0 border-b border-white/10">
      <button className="px-4 py-2 text-[10px] font-medium text-primary border-b-2 border-primary">Policies</button>
      <button className="px-4 py-2 text-[10px] font-medium text-white/40">Procedures</button>
    </div>

    {/* Upload cards */}
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-4">
        <div className="flex flex-col items-center text-center">
          <Upload className="h-5 w-5 text-primary/60 mb-2" />
          <p className="text-[10px] font-medium text-white/80 mb-1">Upload Policy & Document</p>
          <p className="text-[9px] text-white/40 mb-2">Import existing organization policy</p>
          <div className="space-y-1 text-left w-full">
            <div className="flex items-center gap-1.5"><div className="h-1 w-1 rounded-full bg-primary" /><span className="text-[9px] text-white/50">Upload PDF documents</span></div>
            <div className="flex items-center gap-1.5"><div className="h-1 w-1 rounded-full bg-primary" /><span className="text-[9px] text-white/50">Auto-categorize by framework</span></div>
            <div className="flex items-center gap-1.5"><div className="h-1 w-1 rounded-full bg-primary" /><span className="text-[9px] text-white/50">Create or link a policy</span></div>
          </div>
          <button className="mt-3 w-full text-[9px] px-3 py-1.5 rounded-md bg-primary/20 text-primary border border-primary/30 font-medium">Upload Policy & Document</button>
        </div>
      </div>

      <div className="rounded-lg border border-dashed border-emerald-500/30 bg-emerald-500/5 p-4">
        <div className="flex flex-col items-center text-center">
          <Sparkles className="h-5 w-5 text-emerald-400/60 mb-2" />
          <p className="text-[10px] font-medium text-white/80 mb-1">Create a Customized Policy</p>
          <p className="text-[9px] text-white/40 mb-2">AI-powered policy generation</p>
          <div className="space-y-1 text-left w-full">
            <div className="flex items-center gap-1.5"><div className="h-1 w-1 rounded-full bg-emerald-400" /><span className="text-[9px] text-white/50">Define policy structure</span></div>
            <div className="flex items-center gap-1.5"><div className="h-1 w-1 rounded-full bg-emerald-400" /><span className="text-[9px] text-white/50">Link existing documents</span></div>
            <div className="flex items-center gap-1.5"><div className="h-1 w-1 rounded-full bg-emerald-400" /><span className="text-[9px] text-white/50">Run AI indicator detection</span></div>
          </div>
          <button className="mt-3 w-full text-[9px] px-3 py-1.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">Create with AI</button>
        </div>
      </div>
    </div>

    {/* Modules grid */}
    <div>
      <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-2">Modules</p>
      <div className="grid grid-cols-4 gap-2">
        {[
          { name: 'ESG & CSRD', icon: Leaf, color: 'text-emerald-400', border: 'border-emerald-500/20' },
          { name: 'NIS2 Directive', icon: Shield, color: 'text-red-400', border: 'border-red-500/30 bg-red-500/5' },
          { name: 'ISO 27001', icon: Lock, color: 'text-blue-400', border: 'border-blue-500/20' },
          { name: 'Carbon Footprint', icon: Activity, color: 'text-green-400', border: 'border-green-500/20' },
        ].map((m) => (
          <div key={m.name} className={`rounded-lg border ${m.border} bg-white/[0.02] p-2.5`}>
            <m.icon className={`h-3.5 w-3.5 ${m.color} mb-1.5`} />
            <p className="text-[9px] font-medium text-white/80">{m.name}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ═══════════════ COMPLIANCE DASHBOARD ═══════════════ */
const ComplianceDashboardMockup = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-semibold text-white">Compliance Overview</h4>
        <p className="text-[10px] text-white/40">Cross-framework compliance status with AI-powered gap analysis and readiness scoring.</p>
      </div>
      <button className="text-[10px] px-3 py-1.5 rounded-md bg-primary/20 text-primary border border-primary/30 font-medium">
        Run AI Analysis
      </button>
    </div>

    {/* Score cards */}
    <div className="grid grid-cols-4 gap-3">
      {[
        { label: 'Overall Score', value: '78%', change: '+4%', pct: 78 },
        { label: 'Policies Active', value: '24/31', change: '77%', pct: 77 },
        { label: 'Open Tasks', value: '12', change: '-3', pct: 60 },
        { label: 'Audit Ready', value: '3/5', change: '60%', pct: 60 },
      ].map((c) => (
        <div key={c.label} className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
          <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1">{c.label}</p>
          <p className="text-lg font-bold text-white">{c.value}</p>
          <span className="text-[9px] text-emerald-400">{c.change}</span>
          <MiniProgress value={c.pct} color={c.pct >= 75 ? 'bg-emerald-500' : c.pct >= 50 ? 'bg-amber-500' : 'bg-red-500'} />
        </div>
      ))}
    </div>

    {/* Framework status */}
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
      <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-3">Framework Readiness</p>
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

/* ═══════════════ AI ANALYTICS ═══════════════ */
const AiAnalyticsMockup = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 mb-1">
      <Sparkles className="h-4 w-4 text-primary" />
      <div>
        <h4 className="text-sm font-semibold text-white">AI-Powered Analytics</h4>
        <p className="text-[10px] text-white/40">Intelligent insights, predictions, and recommendations across all compliance domains.</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3">
      {/* AI Insights panel */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="h-3 w-3 text-primary" />
          <span className="text-[10px] font-medium text-white/80">AI Compliance Insights</span>
        </div>
        <div className="space-y-2">
          {[
            { text: 'Supply chain security policy needs update for NIS2 Art. 21(2)(d)', severity: 'gap' as const },
            { text: 'ISO 27001 Annex A.8 controls fully mapped — ready for audit', severity: 'complete' as const },
            { text: 'CSRD double materiality assessment 65% complete — 3 topics pending', severity: 'partial' as const },
          ].map((insight, i) => (
            <div key={i} className="rounded border border-white/5 bg-white/[0.02] p-2 flex items-start gap-2">
              <Sparkles className="h-3 w-3 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-white/60 leading-relaxed">{insight.text}</p>
                <StatusBadge status={insight.severity} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk & recommendations */}
      <div className="space-y-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
          <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-2">Risk Assessment Summary</p>
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
                <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Low: 8</span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">Med: 4</span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-red-500/20 text-red-400">High: 1</span>
              </div>
              <p className="text-[9px] text-white/40">13 risks identified across 5 frameworks</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
          <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-2">AI Recommendations</p>
          <div className="space-y-1.5">
            {[
              'Complete incident response procedure for NIS2',
              'Schedule GDPR DPIA for new data processing',
              'Update asset registry for ISO 27001 audit',
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <ArrowRight className="h-2.5 w-2.5 text-primary shrink-0" />
                <span className="text-[9px] text-white/50">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ═══════════════ GOVERNANCE FLOW ═══════════════ */
const GovernanceFlowMockup = () => (
  <div className="space-y-4">
    <div>
      <h4 className="text-sm font-semibold text-white">Governance & Implementation Flow</h4>
      <p className="text-[10px] text-white/40">Structured compliance journey from onboarding through gap analysis to operational framework.</p>
    </div>

    {/* Flow visualization */}
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
      <div className="flex items-center justify-between mb-4">
        {['AI Onboarding', 'Gap Analysis', 'Strategy', 'Implementation'].map((step, i) => (
          <div key={step} className="flex items-center flex-1">
            <div className="flex items-center gap-2">
              <div className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                i <= 1 ? 'bg-primary text-white' : 'border border-white/20 text-white/30'
              }`}>
                {i <= 1 ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className={`text-[10px] ${i <= 1 ? 'text-white font-medium' : 'text-white/30'}`}>{step}</span>
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
          <span className="text-[10px] font-medium text-white/80">Policies</span>
        </div>
        <div className="space-y-1.5">
          {[
            { name: 'Information Security', status: 'active' as const },
            { name: 'Risk Management', status: 'active' as const },
            { name: 'Business Continuity', status: 'review' as const },
          ].map((p) => (
            <div key={p.name} className="flex items-center justify-between rounded border border-white/5 bg-white/[0.02] p-1.5">
              <span className="text-[9px] text-white/60">{p.name}</span>
              <StatusBadge status={p.status} />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <ClipboardList className="h-3.5 w-3.5 text-amber-400" />
          <span className="text-[10px] font-medium text-white/80">Procedures</span>
        </div>
        <div className="space-y-1.5">
          {[
            { name: 'Asset Inventory', status: 'active' as const },
            { name: 'Incident Response', status: 'draft' as const },
            { name: 'Access Control', status: 'active' as const },
          ].map((p) => (
            <div key={p.name} className="flex items-center justify-between rounded border border-white/5 bg-white/[0.02] p-1.5">
              <span className="text-[9px] text-white/60">{p.name}</span>
              <StatusBadge status={p.status} />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-[10px] font-medium text-white/80">Tasks & Register</span>
        </div>
        <div className="space-y-1.5">
          {[
            { name: 'Network Scan', status: 'complete' as const },
            { name: 'Risk Classification', status: 'partial' as const },
            { name: 'Registry Update', status: 'draft' as const },
          ].map((p) => (
            <div key={p.name} className="flex items-center justify-between rounded border border-white/5 bg-white/[0.02] p-1.5">
              <span className="text-[9px] text-white/60">{p.name}</span>
              <StatusBadge status={p.status} />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Auto-sync note */}
    <div className="rounded border border-white/5 bg-white/[0.02] p-2 flex items-center gap-2">
      <Sparkles className="h-3 w-3 text-primary shrink-0" />
      <span className="text-[9px] text-white/50">Auto-sync: changes in asset registry automatically update operational annexes. Policy content remains unchanged.</span>
    </div>
  </div>
);

/* ═══════════════ MAIN COMPONENT ═══════════════ */
const HomePlatformMockup = () => {
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
            {label}
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
