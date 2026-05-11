import { useState } from "react";
import { Bot, Database, Workflow, FileSignature, ShieldCheck, ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

type AreaId = "01" | "02" | "03" | "04" | "05";

type Node = {
  id: AreaId;
  label: string;
  short: string;
  icon: React.ElementType;
  // position in viewBox 800x320
  x: number;
  y: number;
  description: string;
  bullets: string[];
  href: string; // path under /{locale}
  color: string; // tailwind text color for icon
  ring: string; // tailwind ring color
};

const NODES: Node[] = [
  {
    id: "01",
    label: "Leon — AI Compliance Officer",
    short: "Leon",
    icon: Bot,
    x: 80,
    y: 160,
    description:
      "Leon nie śpi. Codziennie analizuje status kontroli, sygnalizuje wygasające dowody, przygotowuje drafty polityk i przypomina właścicielom o terminach — zanim audytor zdąży wpisać nazwę firmy w wyszukiwarkę.",
    bullets: [
      "Monitoring 24/7 wszystkich frameworków",
      "Proaktywne alerty zamiast reaktywnych pożarów",
      "Asystent w czacie: zapytaj, deleguj, zatwierdź",
    ],
    href: "/product/ai-compliance-officer",
    color: "text-purple-300",
    ring: "ring-purple-400/60",
  },
  {
    id: "02",
    label: "Integracje i dane",
    short: "Integracje",
    icon: Database,
    x: 240,
    y: 70,
    description:
      "Koniec z ręcznym zbieraniem screenshotów. Quantifier łączy się z M365, Jirą, chmurą, HR i dostawcami — automatycznie zaciągając dowody, metryki i dokumenty do jednego repozytorium.",
    bullets: [
      "Konektory out-of-the-box do najważniejszych systemów",
      "Automatyczna walidacja świeżości dowodów",
      "Jeden Data Lake — koniec z plikami w mailach",
    ],
    href: "/product/task-data-management",
    color: "text-emerald-300",
    ring: "ring-emerald-400/60",
  },
  {
    id: "03",
    label: "Zarządzanie pracą",
    short: "Project Mgmt",
    icon: Workflow,
    x: 400,
    y: 160,
    description:
      "Procedury rozkładają się na zadania z jasno określonym timeline'em, ownerem i dowodami. AI przydziela, przypomina i zamyka — zespół realizuje wszystko z poziomu maila lub Slacka.",
    bullets: [
      "Procedury → zadania z timeline'em i ownerem",
      "Auto-przydziały i przypomnienia od Leona",
      "Realizacja zadań prosto ze skrzynki mailowej",
    ],
    href: "/product/task-data-management",
    color: "text-amber-300",
    ring: "ring-amber-400/60",
  },
  {
    id: "04",
    label: "Polityki w 15 minut",
    short: "Polityki",
    icon: FileSignature,
    x: 560,
    y: 70,
    description:
      "Policy Builder prowadzi przez tworzenie polityki krok po kroku z biblioteki gotowych szablonów. Live preview, wersjonowanie, podpis elektroniczny zgodny z eIDAS — w 15 minut, nie w 3 miesiące.",
    bullets: [
      "Biblioteka szablonów dla NIS2, ISO, DORA, GDPR",
      "Mapowanie danych i łańcuch dostaw pod stałą kontrolą",
      "Wersjonowanie + podpis e-IDAS w jednym miejscu",
    ],
    href: "/product/documents-management",
    color: "text-pink-300",
    ring: "ring-pink-400/60",
  },
  {
    id: "05",
    label: "Audyt — 1 klik",
    short: "Audyt",
    icon: ShieldCheck,
    x: 720,
    y: 160,
    description:
      "Każda decyzja, data, osoba i podpis elektroniczny są zarejestrowane. Jedno kliknięcie = raport dla organu nadzoru w PDF, Excel, XBRL lub XML. Management Body Accountability gotowy do okazania.",
    bullets: [
      "Pełny audit trail każdej zmiany i decyzji",
      "Eksport w PDF / XLSX / XBRL / XML jednym przyciskiem",
      "Management Body Accountability out-of-the-box",
    ],
    href: "/product/analytics-dashboards",
    color: "text-blue-300",
    ring: "ring-blue-400/60",
  },
];

// Lemniscate-ish figure-8 path in 800x320 viewBox
const LOOP_PATH =
  "M 400,160 C 400,60 240,60 80,160 C 240,260 400,260 400,160 C 400,60 560,60 720,160 C 560,260 400,260 400,160 Z";

const InfinityComplianceLoop = () => {
  const [active, setActive] = useState<AreaId | null>("01");
  const { currentLocale } = useLanguage();
  const activeNode = NODES.find((n) => n.id === active) ?? null;

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 md:py-28 overflow-hidden -mt-12 -mx-4">
      <div aria-hidden className="absolute inset-0 opacity-40">
        <div className="absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/20 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-5">
            ∞ Continuous Compliance · AI-Native GRC
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Compliance to nie projekt.
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
              To stan ciągły.
            </span>
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            Quantifier zamyka 5 obszarów GRC w jedną nieskończoną pętlę. Kliknij dowolny węzeł, by zobaczyć, jak działa.
          </p>
        </div>


        {/* Detail panel — ABOVE the loop, so user can't miss it */}
        <div
          id="loop-detail-panel"
          className="max-w-3xl mx-auto overflow-hidden transition-all duration-500 mb-8"
          style={{ maxHeight: activeNode ? "600px" : "0px", opacity: activeNode ? 1 : 0 }}
          aria-live="polite"
        >
          {activeNode && (
            <div
              key={activeNode.id}
              className="relative animate-fade-in bg-white/[0.06] border border-white/20 rounded-2xl p-5 md:p-7 backdrop-blur-md shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]"
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Zamknij"
                className="absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-start gap-4 pr-8">
                <span
                  className={`flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl bg-slate-900 border-2 border-white/20 ring-2 ${activeNode.ring} flex-shrink-0`}
                >
                  <activeNode.icon className={`h-6 w-6 md:h-7 md:w-7 ${activeNode.color}`} />
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
                    Obszar {activeNode.id}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                    {activeNode.label}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-sm md:text-base mb-3">
                    {activeNode.description}
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5 mb-4">
                    {activeNode.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs md:text-sm text-white/85">
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 ${activeNode.color.replace("text-", "bg-")}`}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/${currentLocale}${activeNode.href}/`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white border border-white/30 hover:bg-white/10 rounded-lg px-3.5 py-1.5 transition-colors"
                  >
                    Dowiedz się więcej
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
              {/* Pointer arrow toward the loop below */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-4 w-4 rotate-45 bg-white/[0.06] border-r border-b border-white/20" />
            </div>
          )}
        </div>

        {/* Loop SVG + nodes */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative w-full" style={{ aspectRatio: "800 / 320" }}>
            <svg
              viewBox="0 0 800 320"
              className="absolute inset-0 w-full h-full"
              fill="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="loopGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(160 84% 60%)" />
                  <stop offset="50%" stopColor="hsl(210 90% 65%)" />
                  <stop offset="100%" stopColor="hsl(270 80% 70%)" />
                </linearGradient>
                <radialGradient id="dotGlow">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* glow underlay */}
              <path d={LOOP_PATH} stroke="url(#loopGrad)" strokeWidth="14" opacity="0.15" />
              {/* main stroke */}
              <path
                d={LOOP_PATH}
                stroke="url(#loopGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* moving dot */}
              <circle r="14" fill="url(#dotGlow)" opacity="0.7">
                <animateMotion dur="14s" repeatCount="indefinite" path={LOOP_PATH} />
              </circle>
              <circle r="5" fill="white">
                <animateMotion dur="14s" repeatCount="indefinite" path={LOOP_PATH} />
              </circle>
            </svg>

            {/* Nodes */}
            {NODES.map((node) => {
              const Icon = node.icon;
              const isActive = active === node.id;
              const leftPct = (node.x / 800) * 100;
              const topPct = (node.y / 320) * 100;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActive(isActive ? null : node.id)}
                  aria-expanded={isActive}
                  aria-controls="loop-detail-panel"
                  className={`group absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ${
                    isActive ? "scale-110 z-20" : "hover:scale-105 z-10"
                  }`}
                  style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                >
                  <span
                    className={`flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-slate-900 border-2 ${
                      isActive ? "border-white shadow-[0_0_30px_rgba(255,255,255,0.4)]" : "border-white/30"
                    } ring-4 ${node.ring} ring-offset-2 ring-offset-slate-950 transition-all`}
                  >
                    <Icon className={`h-6 w-6 md:h-7 md:w-7 ${node.color}`} />
                  </span>
                  <span className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap text-[10px] md:text-xs font-bold text-white/80 bg-slate-950/80 backdrop-blur px-2 py-0.5 rounded-full border border-white/10">
                    {node.id} · {node.short}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Hint */}
          <p className="text-center text-xs text-white/50 mt-12 mb-6 flex items-center justify-center gap-1">
            <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
            Kliknij węzeł, aby zobaczyć szczegóły
          </p>

          {/* Detail panel */}
          <div
            id="loop-detail-panel"
            className="overflow-hidden transition-all duration-500"
            style={{ maxHeight: activeNode ? "1000px" : "0px" }}
          >
            {activeNode && (
              <div
                key={activeNode.id}
                className="animate-fade-in bg-white/[0.04] border border-white/15 rounded-2xl p-6 md:p-8 backdrop-blur-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-6 items-start">
                  <div className="flex md:flex-col items-center md:items-start gap-3">
                    <span
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 border-2 border-white/20 ring-4 ${activeNode.ring} ring-offset-2 ring-offset-slate-950`}
                    >
                      <activeNode.icon className={`h-8 w-8 ${activeNode.color}`} />
                    </span>
                    <span className="text-5xl md:text-6xl font-bold text-white/10 leading-none">
                      {activeNode.id}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {activeNode.label}
                    </h3>
                    <p className="text-white/80 leading-relaxed mb-4">{activeNode.description}</p>
                    <ul className="space-y-2 mb-5">
                      {activeNode.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-white/85">
                          <span className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 ${activeNode.color.replace("text-", "bg-")}`} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={`#area-${activeNode.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-white border border-white/30 hover:bg-white/10 rounded-lg px-4 py-2 transition-colors"
                      >
                        Zobacz pełny opis
                        <ChevronDown className="h-4 w-4" />
                      </a>
                      <Link
                        to={`/${currentLocale}${activeNode.href}/`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-950 bg-white hover:bg-white/90 rounded-lg px-4 py-2 transition-colors"
                      >
                        Dedykowana strona
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfinityComplianceLoop;
