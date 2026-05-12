import { Shield, FileCheck, Library, ClipboardCheck, FolderCheck, RefreshCw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Interactive-feel ISMS (ISO 27001) schema.
 * Central hub = ISMS, surrounded by 5 PDCA-aligned modules.
 * Pure SVG + Tailwind, no images, no gradient backgrounds.
 */
export default function IsmsSchema() {
  const { t } = useLanguage();

  const nodes = [
    { icon: ClipboardCheck, label: t('iso27001Page.schema.riskAssessment', "Ocena ryzyka"), sub: t('iso27001Page.schema.plan', "PLAN"), angle: -90 },
    { icon: Library, label: t('iso27001Page.schema.annexA', "Aneks A — 93 kontrole"), sub: t('iso27001Page.schema.do', "DO"), angle: -18 },
    { icon: FileCheck, label: t('iso27001Page.schema.soa', "Statement of Applicability"), sub: t('iso27001Page.schema.do', "DO"), angle: 54 },
    { icon: FolderCheck, label: t('iso27001Page.schema.evidence', "Evidence collection"), sub: t('iso27001Page.schema.check', "CHECK"), angle: 126 },
    { icon: RefreshCw, label: t('iso27001Page.schema.audit', "Audyt + doskonalenie"), sub: t('iso27001Page.schema.act', "ACT"), angle: 198 },
  ];

  const radius = 140; // px
  const size = 380; // svg viewport
  const center = size / 2;

  return (
    <div className="relative w-full max-w-[480px] mx-auto aspect-square">
      {/* Connection lines */}
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <pattern id="ringDots" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(56,127,239,0.25)" />
          </pattern>
        </defs>
        {/* Outer dotted ring */}
        <circle
          cx={center}
          cy={center}
          r={radius + 6}
          fill="none"
          stroke="rgba(56,127,239,0.18)"
          strokeWidth="1"
          strokeDasharray="3 6"
        />
        {/* Spokes */}
        {nodes.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180;
          const x = center + radius * Math.cos(rad);
          const y = center + radius * Math.sin(rad);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(56,127,239,0.2)"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
          );
        })}
      </svg>

      {/* Center hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-32 h-32 rounded-full bg-brand-blue-dark text-white flex flex-col items-center justify-center shadow-xl shadow-brand-blue/30 border-4 border-white">
          <Shield className="h-7 w-7 mb-1" />
          <div className="text-xs font-semibold opacity-80">ISMS</div>
          <div className="text-base font-bold leading-tight">ISO 27001</div>
        </div>
        {/* Pulse ring */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full border-2 border-brand-blue/40 animate-ping"
          style={{ animationDuration: "3s" }}
        />
      </div>

      {/* Nodes */}
      {nodes.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const xPct = 50 + (radius / (size / 2)) * 50 * Math.cos(rad);
        const yPct = 50 + (radius / (size / 2)) * 50 * Math.sin(rad);
        const Icon = n.icon;
        return (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${xPct}%`, top: `${yPct}%` }}
          >
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 shadow-md flex items-center justify-center group-hover:border-brand-blue group-hover:shadow-lg transition-all">
                <Icon className="h-6 w-6 text-brand-blue-dark" />
              </div>
              <div className="mt-2 px-2 py-1 rounded-md bg-white/95 backdrop-blur text-center max-w-[120px]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">
                  {n.sub}
                </div>
                <div className="text-xs font-semibold text-brand-blue-dark leading-tight">
                  {n.label}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
