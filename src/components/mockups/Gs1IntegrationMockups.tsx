import { useState } from 'react';
import {
  Search, ArrowRight, Package, Truck, Factory, ShoppingCart,
  Recycle, Leaf, Zap, BarChart3, Sliders, QrCode, Eye,
  ExternalLink, Monitor, Smartphone, ChevronDown, Info,
  CheckCircle2, AlertTriangle, Download
} from 'lucide-react';

/* ─── shared ─── */
const MockupShell = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 overflow-hidden shadow-2xl">
    {/* Title bar */}
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
      </div>
      <div className="flex-1 text-center">
        <span className="text-[10px] text-white/40 font-medium">{title}</span>
      </div>
    </div>
    {subtitle && (
      <div className="px-4 pt-3 pb-1">
        <p className="text-[9px] text-white/30">{subtitle}</p>
      </div>
    )}
    <div className="p-4">{children}</div>
  </div>
);

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'info' }) => {
  const styles = {
    default: 'bg-white/10 text-white/60 border-white/10',
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    info: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  };
  return (
    <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full border ${styles[variant]}`}>
      {children}
    </span>
  );
};

/* ═══════════ 1. GTIN IMPORT ═══════════ */
export const GtinImportMockup = () => (
  <MockupShell title="Envirly LCA — Identyfikacja produktu">
    <div className="space-y-4">
      {/* Search bar */}
      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
          <Search className="h-3.5 w-3.5 text-white/30" />
          <span className="text-[11px] text-white/70">5900000012345</span>
        </div>
        <button className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-[10px] font-medium flex items-center gap-1.5">
          <Download className="h-3 w-3" />
          Import danych
        </button>
      </div>

      {/* GTIN / GPC fields */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] text-white/40 uppercase tracking-wider">Kod GTIN</span>
            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
          </div>
          <p className="text-[12px] font-mono text-white/90">5900000012345</p>
          <p className="text-[8px] text-white/30 mt-1">Zweryfikowano w GS1 Polska</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] text-white/40 uppercase tracking-wider">Kod GPC</span>
            <ChevronDown className="h-3 w-3 text-white/30" />
          </div>
          <p className="text-[12px] font-mono text-white/90">10000045</p>
          <p className="text-[8px] text-white/30 mt-1">Chemia przemysłowa</p>
        </div>
      </div>

      {/* Imported data preview */}
      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium text-white/70">Zaimportowane dane z GS1</span>
          <Badge variant="success">Połączono</Badge>
        </div>
        {[
          { label: 'Nazwa produktu', value: 'Preparat czyszczący EcoClean 500ml' },
          { label: 'Producent', value: 'EcoTech Polska Sp. z o.o.' },
          { label: 'Kategoria', value: 'Środki czystości — przemysłowe' },
          { label: 'Kraj pochodzenia', value: 'Polska' },
        ].map((r) => (
          <div key={r.label} className="flex items-center justify-between py-1 border-t border-white/5">
            <span className="text-[9px] text-white/40">{r.label}</span>
            <span className="text-[10px] text-white/80">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  </MockupShell>
);

/* ═══════════ 2. LCA FLOWCHART ═══════════ */
const LifecycleStage = ({ icon: Icon, label, items, color }: { icon: any; label: string; items: { name: string; value: string }[]; color: string }) => (
  <div className={`rounded-lg border p-2.5 space-y-1.5 ${color}`}>
    <div className="flex items-center gap-1.5">
      <Icon className="h-3 w-3" />
      <span className="text-[9px] font-semibold uppercase tracking-wider">{label}</span>
    </div>
    {items.map((it) => (
      <div key={it.name} className="rounded bg-white/10 px-2 py-1.5 flex items-center justify-between">
        <span className="text-[9px] text-white/70 truncate max-w-[80px]">{it.name}</span>
        <span className="text-[9px] font-mono text-white/90">{it.value}</span>
      </div>
    ))}
  </div>
);

export const LcaFlowchartMockup = () => (
  <MockupShell title="Envirly LCA — Schemat blokowy cyklu życia">
    <div className="space-y-3">
      {/* Impact selector */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 flex-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[10px] text-white/70">Climate change</span>
          <span className="text-[9px] text-white/40 ml-auto">kg CO₂-Eq</span>
        </div>
        <div className="flex rounded-lg border border-white/10 overflow-hidden">
          <button className="px-2.5 py-1.5 text-[9px] font-medium bg-primary text-primary-foreground">Schemat</button>
          <button className="px-2.5 py-1.5 text-[9px] font-medium text-white/40 bg-white/5">Wpływ</button>
          <button className="px-2.5 py-1.5 text-[9px] font-medium text-white/40 bg-white/5">Analityka</button>
        </div>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2">
        <AlertTriangle className="h-3 w-3 text-amber-400 mt-0.5 shrink-0" />
        <p className="text-[9px] text-amber-400/80">Wyświetlane są częściowe wyniki LCA. Uzupełnij brakujące węzły.</p>
      </div>

      {/* Lifecycle stages */}
      <div className="grid grid-cols-4 gap-2">
        <LifecycleStage
          icon={Package}
          label="Surowce"
          color="border-blue-500/20 bg-blue-500/5 text-blue-400"
          items={[{ name: 'Surfaktanty', value: '12.4' }]}
        />
        <LifecycleStage
          icon={Factory}
          label="Produkcja"
          color="border-amber-500/20 bg-amber-500/5 text-amber-400"
          items={[
            { name: 'Energia OZE', value: '32.8' },
            { name: 'Woda', value: '—' },
          ]}
        />
        <LifecycleStage
          icon={Truck}
          label="Dystrybucja"
          color="border-blue-400/20 bg-blue-400/5 text-blue-300"
          items={[{ name: 'Transport EU', value: '47.5' }]}
        />
        <LifecycleStage
          icon={Recycle}
          label="Koniec życia"
          color="border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
          items={[{ name: 'Recykling', value: '—' }]}
        />
      </div>

      {/* Arrows between stages */}
      <div className="flex items-center justify-center gap-1 -mt-1">
        {[1, 2, 3].map((i) => (
          <ArrowRight key={i} className="h-3 w-3 text-white/20" />
        ))}
      </div>
    </div>
  </MockupShell>
);

/* ═══════════ 3. SCENARIO EXPLORER ═══════════ */
const ScenarioSlider = ({ label, value, unit, result, change }: { label: string; value: number; unit: string; result: string; change: string }) => (
  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3 space-y-2">
    <p className="text-[10px] font-medium text-white/70">{label}</p>
    <div className="flex items-center justify-between">
      <span className="text-[9px] text-white/40">{value}{unit}</span>
    </div>
    <div className="h-1.5 w-full rounded-full bg-white/10 relative">
      <div className="h-1.5 rounded-full bg-primary" style={{ width: `${value}%` }} />
      <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary border-2 border-slate-900" style={{ left: `${value}%` }} />
    </div>
    <div className="rounded bg-white/5 px-2 py-1.5 mt-1">
      <p className="text-[9px] text-white/50">Wynik scenariusza</p>
      <p className="text-[12px] font-bold text-white/90">{result}</p>
      <p className="text-[9px] text-emerald-400">{change}</p>
    </div>
  </div>
);

export const ScenarioExplorerMockup = () => (
  <MockupShell title="Envirly LCA — Eksplorator scenariuszy">
    <div className="space-y-3">
      {/* Baseline */}
      <div className="rounded-lg bg-primary/10 border border-primary/20 px-3 py-2">
        <p className="text-[9px] text-white/40">Wynik bazowy</p>
        <p className="text-[14px] font-bold text-white/90">691.54 kg CO₂-Eq</p>
      </div>

      {/* Scenario sliders */}
      <div className="grid grid-cols-3 gap-2">
        <ScenarioSlider label="Udział recyklatu" value={50} unit="%" result="691.54 kg" change="0 kg (0%)" />
        <ScenarioSlider label="Odchudzenie produktu" value={10} unit="%" result="622.38 kg" change="-69.15 kg (-10%)" />
        <ScenarioSlider label="Optymalizacja transportu" value={20} unit="%" result="682.04 kg" change="-9.49 kg (-1.4%)" />
      </div>

      {/* Monte Carlo mini chart */}
      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
        <p className="text-[10px] font-medium text-white/70 mb-2">Symulacja Monte Carlo [kg CO₂-Eq]</p>
        <div className="h-12 flex items-end gap-px">
          {Array.from({ length: 40 }).map((_, i) => {
            const h = 20 + Math.sin(i * 0.3) * 15 + Math.random() * 10;
            return <div key={i} className="flex-1 rounded-t bg-primary/30" style={{ height: `${h}%` }} />;
          })}
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1"><div className="w-2 h-1 rounded bg-primary/50" /><span className="text-[8px] text-white/30">Symulacja</span></div>
          <div className="flex items-center gap-1"><div className="w-2 h-1 rounded bg-amber-400/50" /><span className="text-[8px] text-white/30">Odchylenie</span></div>
        </div>
      </div>
    </div>
  </MockupShell>
);

/* ═══════════ 4. PASSPORT EDITOR ═══════════ */
const PassportBlock = ({ title, status, tags }: { title: string; status: 'ready' | 'partial' | 'missing'; tags: string[] }) => {
  const statusStyles = {
    ready: { badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20', label: 'Gotowe' },
    partial: { badge: 'bg-amber-500/15 text-amber-400 border-amber-500/20', label: 'Częściowe' },
    missing: { badge: 'bg-red-500/15 text-red-400 border-red-500/20', label: 'Brak danych' },
  };
  const s = statusStyles[status];
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5 space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold text-white/80">{title}</span>
        <span className={`text-[8px] font-medium px-1.5 py-0.5 rounded-full border ${s.badge}`}>{s.label}</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span key={tag} className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-white/40 border border-white/5">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export const PassportEditorMockup = () => (
  <MockupShell title="Envirly DPP — Edytor paszportu produktowego">
    <div className="grid grid-cols-5 gap-3">
      {/* Left: layout canvas */}
      <div className="col-span-2 space-y-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-medium text-white/70">Canvas układu</span>
          <Badge variant="warning">Kompletność: 75%</Badge>
        </div>
        <PassportBlock title="Nagłówek paszportu" status="ready" tags={['Wymagany', 'Widoczny']} />
        <PassportBlock title="Czym są DPP i LCA" status="ready" tags={['Opcjonalny', 'Pełna szerokość']} />
        <PassportBlock title="Identyfikacja produktu" status="partial" tags={['Wymagany', '1/2 szerokości']} />
        <PassportBlock title="Ślad środowiskowy" status="missing" tags={['Wymagany', '1/2 szerokości']} />
        <PassportBlock title="Skład materiałowy" status="missing" tags={['Wymagany', 'Pełna szerokość']} />
      </div>

      {/* Right: live preview */}
      <div className="col-span-3 rounded-lg border border-white/10 bg-white/[0.02] p-3 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium text-white/70">Podgląd na żywo</span>
          <div className="flex rounded border border-white/10 overflow-hidden">
            <button className="px-2 py-1 text-[8px] font-medium bg-primary text-primary-foreground flex items-center gap-1">
              <Monitor className="h-2.5 w-2.5" /> Komputer
            </button>
            <button className="px-2 py-1 text-[8px] font-medium text-white/40 bg-white/5 flex items-center gap-1">
              <Smartphone className="h-2.5 w-2.5" /> Telefon
            </button>
          </div>
        </div>

        {/* Passport preview */}
        <div className="rounded-lg bg-white/[0.04] border border-white/10 p-3 space-y-2.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Package className="h-5 w-5 text-white/30" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-white/90">EcoClean 500ml</p>
              <p className="text-[8px] text-white/40">Preparat czyszczący</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded bg-white/5 p-2 space-y-1">
              <p className="text-[8px] font-semibold text-white/50 uppercase">Identyfikacja</p>
              {[{ l: 'GTIN', v: '590000001234' }, { l: 'Producent', v: 'EcoTech Polska' }].map((r) => (
                <div key={r.l} className="flex justify-between">
                  <span className="text-[8px] text-white/40">{r.l}</span>
                  <span className="text-[9px] text-white/70">{r.v}</span>
                </div>
              ))}
            </div>
            <div className="rounded bg-white/5 p-2 space-y-1">
              <p className="text-[8px] font-semibold text-white/50 uppercase">Ślad środowiskowy</p>
              {[{ l: 'CO₂', v: '691.5 kg' }, { l: 'Recyklat', v: '50%' }].map((r) => (
                <div key={r.l} className="flex justify-between">
                  <span className="text-[8px] text-white/40">{r.l}</span>
                  <span className="text-[9px] text-white/70">{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-[9px] font-medium">
            <QrCode className="h-3 w-3" /> Generuj kod QR
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-white/60 text-[9px] font-medium">
            <ExternalLink className="h-3 w-3" /> Udostępnij link
          </button>
        </div>
      </div>
    </div>
  </MockupShell>
);
