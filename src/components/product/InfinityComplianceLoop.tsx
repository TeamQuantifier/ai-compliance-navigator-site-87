import { useState } from "react";
import { Bot, Database, Workflow, FileSignature, ShieldCheck, BarChart3, ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

type AreaId = "01" | "02" | "03" | "04" | "05" | "06";

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
    label: "AI Officer Leon",
    short: "AI Officer Leon",
    icon: Bot,
    x: 80,
    y: 220,
    description:
      "Leon nie śpi. Codziennie analizuje status kontroli, sygnalizuje wygasające dowody, przygotowuje drafty polityk i przypomina właścicielom o terminach — zanim audytor zdąży wpisać nazwę firmy w wyszukiwarkę.",
    bullets: [
      "Monitoring 24/7 wszystkich frameworków",
      "Proaktywne alerty zamiast reaktywnych pożarów",
      "Asystent w czacie: zapytaj, deleguj, zatwierdź",
      "Drafty polityk i procedur generowane na żądanie",
    ],
    href: "/product/ai-compliance-officer",
    color: "text-purple-300",
    ring: "ring-purple-400/60",
  },
  {
    id: "02",
    label: "Dane i integracje",
    short: "Dane i integracje",
    icon: Database,
    x: 240,
    y: 90,
    description:
      "Mapowanie danych z Twoich arkuszy i systemów — bez przepisywania, bez dopasowywania formatów. Wrzucasz to, czym już pracujesz, a Quantifier sam układa to w spójny obraz zgodności.",
    bullets: [
      "Import z istniejących arkuszy bez zmiany ich struktury",
      "Automatyczne mapowanie danych do wymagań frameworków",
      "Brak żmudnego dopasowywania pól i kolumn",
      "Jedno spójne źródło prawdy dla całego zespołu",
    ],
    href: "/product/task-data-management",
    color: "text-emerald-300",
    ring: "ring-emerald-400/60",
  },
  {
    id: "03",
    label: "Zarządzanie pracą",
    short: "Zarządzanie pracą",
    icon: Workflow,
    x: 240,
    y: 350,
    description:
      "Procedury rozkładają się na zadania z jasno określonym timeline'em, ownerem i dowodami. AI przydziela, przypomina i zamyka — zespół realizuje wszystko z poziomu maila lub Slacka.",
    bullets: [
      "Procedury rozbijane na zadania z timeline'em i ownerem",
      "Auto-przydziały i przypomnienia od Leona",
      "Realizacja zadań prosto ze skrzynki mailowej",
      "Pełna widoczność postępu na dashboardzie",
    ],
    href: "/product/task-data-management",
    color: "text-amber-300",
    ring: "ring-amber-400/60",
  },
  {
    id: "04",
    label: "Polityki, rejestry, dostawcy",
    short: "Polityki, rejestry, dostawcy",
    icon: FileSignature,
    x: 560,
    y: 90,
    description:
      "Polityki tworzone w 15 minut z biblioteki szablonów, rejestry (ryzyk, incydentów, aktywów) prowadzone w jednym miejscu, a dostawcy oceniani i monitorowani w stałym cyklu.",
    bullets: [
      "Policy Builder z szablonami dla NIS2, ISO, DORA, GDPR",
      "Rejestry ryzyk, incydentów i aktywów w jednym miejscu",
      "Ocena i monitoring dostawców w stałym cyklu",
      "Wersjonowanie i podpis elektroniczny",
    ],
    href: "/product/documents-management",
    color: "text-pink-300",
    ring: "ring-pink-400/60",
  },
  {
    id: "05",
    label: "Audyt, jedno kliknięcie",
    short: "Audyt, jedno kliknięcie",
    icon: ShieldCheck,
    x: 720,
    y: 220,
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
  {
    id: "06",
    label: "Analityka, dashboardy i raporty",
    short: "Analityka, dashboardy i raporty",
    icon: BarChart3,
    x: 560,
    y: 350,
    description:
      "Status zgodności w czasie rzeczywistym: dashboardy KPI, trendy ryzyk, mapy ciepła, postęp wdrożeń i gotowe raporty dla zarządu, audytora i regulatora — bez budowania pivotów w arkuszach.",
    bullets: [
      "Dashboardy KPI dla zarządu, zespołu i audytora",
      "Trendy ryzyk, incydentów i zaległości w jednym widoku",
      "Mapy ciepła ryzyk i postęp wdrożeń frameworków",
      "Eksport raportów do PDF, XLSX i prezentacji jednym kliknięciem",
    ],
    href: "/product/analytics-dashboards",
    color: "text-cyan-300",
    ring: "ring-cyan-400/60",
  },
];

// Lemniscate figure-8 in 800x440 viewBox — wider, rounded ends (no cusps at L/R)
const LOOP_PATH =
  "M 400,220 C 400,40 80,40 80,220 C 80,400 400,400 400,220 C 400,40 720,40 720,220 C 720,400 400,400 400,220 Z";

const InfinityComplianceLoop = () => {
  const [active, setActive] = useState<AreaId | null>("01");
  const { currentLocale } = useLanguage();
  const activeNode = NODES.find((n) => n.id === active) ?? null;

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-10 md:py-14 overflow-hidden -mt-12 -mx-4">
      <div aria-hidden className="absolute inset-0 opacity-40">
        <div className="absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/20 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-4 md:mb-6">
          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-5">
            ∞ Continuous Compliance · AI-Native GRC
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Compliance to nie projekt.
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
              To stan ciągłej zgodności.
            </span>
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            Quantifier zamyka 5 obszarów w jedną nieskończoną pętlę ciągłej zgodności. Kliknij dowolny węzeł, by zobaczyć, jak działa.
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
          <div className="relative w-full" style={{ aspectRatio: "800 / 440" }}>
            <svg
              viewBox="0 0 800 440"
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

            {/* Center: regulatory frameworks emblem */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
              style={{ left: "50%", top: `${(220 / 440) * 100}%` }}
              aria-hidden
            >
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/30 via-blue-400/30 to-purple-400/30 blur-xl" />
                  <div className="relative flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-slate-950/90 border border-white/20 backdrop-blur shadow-[0_0_40px_rgba(99,102,241,0.25)]">
                    <ShieldCheck className="h-7 w-7 md:h-9 md:w-9 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-1 max-w-[180px] md:max-w-[220px]">
                  {["NIS2", "ISO 27001", "DORA", "GDPR", "SOC 2"].map((f) => (
                    <span
                      key={f}
                      className="text-[9px] md:text-[10px] font-semibold text-white/75 bg-white/10 border border-white/15 px-1.5 py-0.5 rounded-full backdrop-blur"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Nodes */}
            {NODES.map((node) => {
              const Icon = node.icon;
              const isActive = active === node.id;
              const leftPct = (node.x / 800) * 100;
              const topPct = (node.y / 440) * 100;
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

          {/* Hint (only visible when nothing is open) */}
          {!activeNode && (
            <p className="text-center text-xs text-white/50 mt-12 flex items-center justify-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Kliknij węzeł, aby zobaczyć szczegóły
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default InfinityComplianceLoop;
