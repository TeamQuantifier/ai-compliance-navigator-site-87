import {
  Bot,
  Database,
  ListChecks,
  FileSignature,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Plug,
  Workflow,
  FileText,
  Calendar,
  Download,
  Sparkles,
  AlertTriangle,
  Clock,
  ArrowRight,
} from "lucide-react";
import leonOfficer from "@/assets/leon-compliance-officer.png";

/* ----------------------------- Visual mockups ----------------------------- */

/* Reusable platform window chrome */
const PlatformWindow = ({
  title,
  module,
  children,
}: {
  title: string;
  module: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl bg-slate-950 border border-white/10 shadow-2xl overflow-hidden text-xs ring-1 ring-white/5">
    {/* Top bar */}
    <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-slate-900/80">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
      </div>
      <div className="flex-1 text-center">
        <span className="text-[10px] text-white/50 font-mono">platform.quantifier.ai</span>
      </div>
      <span className="text-[9px] uppercase tracking-wider text-white/40 font-semibold">{module}</span>
    </div>
    {/* Module title */}
    <div className="px-4 py-2.5 border-b border-white/10 bg-slate-900/40">
      <div className="text-white text-[12px] font-semibold">{title}</div>
    </div>
    {children}
  </div>
);

const LeonMonitorMockup = () => (
  <PlatformWindow title="Leon · AI Compliance Officer" module="Dashboard">
    <div className="flex">
      {/* Mini sidebar */}
      <div className="w-24 border-r border-white/10 bg-slate-900/40 py-3 px-2 space-y-1.5">
        {[
          { label: "Overview", active: true },
          { label: "Alerty", count: 7 },
          { label: "Zadania", count: 12 },
          { label: "Polityki" },
          { label: "Raporty" },
        ].map((i) => (
          <div
            key={i.label}
            className={`flex items-center justify-between text-[10px] px-2 py-1 rounded-md ${
              i.active ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30" : "text-white/60"
            }`}
          >
            <span className="truncate">{i.label}</span>
            {i.count && <span className="text-[9px] text-white/50">{i.count}</span>}
          </div>
        ))}
      </div>
      {/* Main */}
      <div className="flex-1 p-3 space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 rounded-full overflow-hidden ring-2 ring-emerald-400/60">
            <img src={leonOfficer} alt="Leon" className="h-full w-full object-cover scale-110" />
          </div>
          <div className="flex-1">
            <div className="text-white font-semibold leading-tight text-[11px]">Dzień dobry, Anna 👋</div>
            <div className="flex items-center gap-1 text-[9px] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> 24/7 · monitoring 4 frameworków
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { v: "94%", l: "Zgodność", c: "text-emerald-300" },
            { v: "7", l: "Alerty", c: "text-amber-300" },
            { v: "12", l: "Taski", c: "text-blue-300" },
          ].map((s) => (
            <div key={s.l} className="bg-white/5 border border-white/10 rounded-md px-2 py-1.5">
              <div className={`text-sm font-bold leading-tight ${s.c}`}>{s.v}</div>
              <div className="text-[9px] text-white/50 uppercase tracking-wider">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="space-y-1.5">
          <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 rounded-md p-1.5">
            <AlertTriangle className="h-3 w-3 text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="text-[10px] text-amber-100">
              <strong>Polityka BCM</strong> — wygasa za 9 dni · draft v3.2 gotowy
            </div>
          </div>
          <div className="flex items-start gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-md p-1.5">
            <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div className="text-[10px] text-emerald-100">
              <strong>ISO 27001 A.8.2</strong> — 14 dowodów odświeżonych w nocy
            </div>
          </div>
        </div>
      </div>
    </div>
  </PlatformWindow>
);

const DataIntegrationMockup = () => {
  const sources = [
    { name: "Microsoft 365", status: "synced", count: "1 248", color: "bg-blue-500" },
    { name: "Jira", status: "synced", count: "342", color: "bg-sky-500" },
    { name: "AWS / Azure", status: "syncing", count: "—", color: "bg-amber-500" },
    { name: "HRIS Workday", status: "synced", count: "187", color: "bg-emerald-500" },
    { name: "Vendors API", status: "synced", count: "56", color: "bg-purple-500" },
    { name: "Excel / CSV", status: "synced", count: "23", color: "bg-rose-500" },
  ];
  return (
    <PlatformWindow title="Hub danych — konektory i Data Lake" module="Integrations">
      <div className="p-3 space-y-2">
        <div className="grid grid-cols-2 gap-1.5">
          {sources.map((s) => (
            <div
              key={s.name}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-md px-2 py-1.5"
            >
              <div className={`h-2 w-2 rounded-full ${s.color} flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-white/85 truncate font-medium">{s.name}</div>
                <div className="text-[9px] text-white/45">{s.count} dowodów</div>
              </div>
              <span
                className={`text-[8px] uppercase tracking-wider font-bold ${
                  s.status === "syncing" ? "text-amber-300" : "text-emerald-300"
                }`}
              >
                {s.status === "syncing" ? "sync…" : "OK"}
              </span>
            </div>
          ))}
        </div>
        <div className="relative flex items-center justify-center my-1">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
          <div className="px-2 text-emerald-300 text-[9px] font-bold flex items-center gap-1">
            <Plug className="h-2.5 w-2.5" /> AUTO-SYNC · co 15 min
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
        </div>
        <div className="bg-gradient-to-br from-emerald-500/15 to-blue-500/15 border border-emerald-400/30 rounded-md p-2.5 flex items-center gap-3">
          <Database className="h-6 w-6 text-emerald-300 flex-shrink-0" />
          <div className="flex-1">
            <div className="text-white text-[11px] font-semibold">Quantifier Data Lake</div>
            <div className="text-[9px] text-white/55">1 856 dowodów · 412 metryk · 89 dokumentów</div>
          </div>
          <span className="text-[9px] text-emerald-300 font-bold">LIVE</span>
        </div>
      </div>
    </PlatformWindow>
  );
};

const TaskAutomationMockup = () => (
  <PlatformWindow title="Hub zadań compliance" module="Tasks">
    <div className="p-0">
      <div className="grid grid-cols-3 text-[9px] uppercase tracking-wider text-white/40 font-semibold border-b border-white/10 px-3 py-1.5 bg-slate-900/30">
        <span>Zadanie</span>
        <span>Owner</span>
        <span className="text-right">Termin</span>
      </div>
      {[
        { t: "Przegląd uprawnień M365", d: "A. Nowak", due: "14.05", color: "amber" },
        { t: "Dowód MFA — eksport raportu", d: "IT Team", due: "16.05", color: "blue" },
        { t: "Ocena dostawcy — Acme Sp.", d: "Procurement", due: "22.05", color: "purple" },
        { t: "Backup test BCM", d: "DevOps", due: "28.05", color: "emerald" },
      ].map((row, i) => (
        <div
          key={i}
          className="grid grid-cols-3 items-center px-3 py-2 border-b border-white/5 hover:bg-white/[0.02]"
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-3.5 w-3.5 rounded border border-white/30 flex-shrink-0" />
            <span className="text-white text-[10px] truncate">{row.t}</span>
          </div>
          <span className="text-[10px] text-white/60 truncate">{row.d}</span>
          <span
            className={`text-[9px] px-1.5 py-0.5 rounded border whitespace-nowrap justify-self-end font-semibold bg-${row.color}-500/15 text-${row.color}-300 border-${row.color}-500/30`}
          >
            {row.due}
          </span>
        </div>
      ))}
      <div className="flex items-center gap-2 text-[10px] text-white/65 bg-blue-500/10 border-t border-blue-500/30 px-3 py-2">
        <Mail className="h-3.5 w-3.5 text-blue-300 flex-shrink-0" />
        <span>Realizacja zadań prosto z maila — kliknij „Zatwierdź", Leon zamknie task</span>
      </div>
    </div>
  </PlatformWindow>
);

const PolicyBuilderMockup = () => {
  const steps = [
    { label: "Wybór szablonu", state: "done" },
    { label: "Owner & Collaborators", state: "done" },
    { label: "Sekcje i kontrole", state: "active" },
    { label: "Wersjonowanie", state: "todo" },
    { label: "Podpis e-IDAS", state: "todo" },
  ];
  return (
    <PlatformWindow title="Policy Builder — kreator polityki" module="Documents">
      <div className="grid grid-cols-5">
        {/* Stepper */}
        <div className="col-span-2 border-r border-white/10 p-3 bg-slate-900/30">
          <ol className="relative space-y-2.5">
            <span className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10" />
            {steps.map((s, i) => {
              const isDone = s.state === "done";
              const isActive = s.state === "active";
              return (
                <li key={s.label} className="relative flex items-center gap-2.5 pl-0">
                  <span
                    className={`relative z-10 h-[22px] w-[22px] rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 ${
                      isDone
                        ? "bg-emerald-500 text-white"
                        : isActive
                        ? "bg-blue-500 text-white ring-4 ring-blue-500/20 animate-pulse"
                        : "bg-white/10 text-white/50 border border-white/15"
                    }`}
                  >
                    {isDone ? "✓" : i + 1}
                  </span>
                  <span
                    className={`text-[10px] leading-tight ${
                      isDone ? "text-white/70 line-through decoration-white/30" : isActive ? "text-white font-semibold" : "text-white/50"
                    }`}
                  >
                    {s.label}
                  </span>
                </li>
              );
            })}
          </ol>
          <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[9px]">
            <span className="text-white/50">Postęp</span>
            <span className="text-emerald-300 font-bold">2 / 5</span>
          </div>
        </div>
        {/* Live preview */}
        <div className="col-span-3 p-3 bg-white/[0.02]">
          <div className="flex items-center justify-between text-[9px] text-white/50 mb-1.5">
            <span className="flex items-center gap-1">
              <Sparkles className="h-2.5 w-2.5 text-emerald-300" /> Live preview
            </span>
            <span>v1.3 · draft</span>
          </div>
          <div className="bg-white rounded-md p-2 shadow-inner">
            <div className="h-1.5 w-3/4 bg-slate-800 rounded mb-1.5" />
            <div className="h-1 w-full bg-slate-200 rounded mb-1" />
            <div className="h-1 w-5/6 bg-slate-200 rounded mb-1" />
            <div className="h-1 w-2/3 bg-slate-200 rounded mb-2" />
            <div className="h-1 w-full bg-slate-200 rounded mb-1" />
            <div className="h-1 w-4/5 bg-slate-200 rounded mb-1" />
            <div className="h-1 w-3/5 bg-slate-200 rounded" />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[9px] text-white/55">NIS2 · BCM Policy</span>
            <span className="text-[9px] text-emerald-300 font-bold bg-emerald-500/10 border border-emerald-500/30 rounded px-1.5 py-0.5">
              gotowe w 15 min
            </span>
          </div>
        </div>
      </div>
    </PlatformWindow>
  );
};

  <div className="rounded-xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden text-xs">
    <div className="px-3 py-2 border-b border-white/10 bg-slate-950 flex items-center gap-2">
      <ShieldCheck className="h-4 w-4 text-emerald-300" />
      <span className="text-white font-semibold">Audit Pack — gotowy w 1 kliknięcie</span>
    </div>
    <div className="p-3 space-y-2">
      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-2">
        <div className="flex items-center gap-2">
          <FileText className="h-3.5 w-3.5 text-blue-300" />
          <span className="text-white text-[11px]">Raport zgodności NIS2</span>
        </div>
        <div className="flex gap-1">
          {["PDF", "XLSX", "XBRL", "XML"].map((f) => (
            <span key={f} className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded px-1.5 py-0.5 font-bold">{f}</span>
          ))}
        </div>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-lg p-2 space-y-1">
        <div className="text-[10px] text-white/50 uppercase tracking-wider font-semibold mb-1">Audit trail</div>
        {[
          { who: "Leon (AI)", what: "wygenerował dowód MFA", when: "08:14" },
          { who: "A. Kowalska", what: "podpisała politykę BCM", when: "wczoraj" },
          { who: "M. Nowak", what: "zatwierdził ocenę ryzyka", when: "12.05" },
        ].map((e, i) => (
          <div key={i} className="flex items-center gap-2 text-[10px]">
            <CheckCircle2 className="h-3 w-3 text-emerald-400 flex-shrink-0" />
            <span className="text-white/80 flex-1 truncate"><strong>{e.who}</strong> {e.what}</span>
            <span className="text-white/40">{e.when}</span>
          </div>
        ))}
      </div>
      <button className="w-full mt-1 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-[11px] font-bold rounded-lg py-2 flex items-center justify-center gap-1.5 shadow-lg">
        <Download className="h-3.5 w-3.5" /> Wygeneruj pakiet dla audytora
      </button>
    </div>
  </div>
);

/* -------------------------------- Section -------------------------------- */

type Area = {
  num: string;
  icon: React.ElementType;
  badge: string;
  title: string;
  description: string;
  bullets?: string[];
  Mockup: React.ComponentType;
  accent: string;
};

const areas: Area[] = [
  {
    num: "01",
    icon: Bot,
    badge: "AI Native",
    title: "Agent AI Leon — wirtualny Compliance Officer 24/7",
    description:
      "Leon nie śpi. Codziennie analizuje status kontroli, sygnalizuje wygasające dowody, przygotowuje drafty polityk i przypomina właścicielom o terminach — zanim audytor zdąży wpisać nazwę firmy w wyszukiwarkę.",
    bullets: [
      "Monitoring 24/7 wszystkich frameworków",
      "Proaktywne alerty zamiast reaktywnych pożarów",
      "Asystent w czacie: zapytaj, deleguj, zatwierdź",
    ],
    Mockup: LeonMonitorMockup,
    accent: "from-purple-500/20 via-blue-500/15 to-transparent",
  },
  {
    num: "02",
    icon: Database,
    badge: "Integracje",
    title: "Integracja i zbieranie danych — dane same wchodzą do systemu",
    description:
      "Koniec z ręcznym zbieraniem screenshotów. Quantifier łączy się z M365, Jirą, chmurą, HR i dostawcami, automatycznie zaciągając dowody, metryki i dokumenty do jednego repozytorium.",
    bullets: [
      "Konektory out-of-the-box do najważniejszych systemów",
      "Automatyczna walidacja świeżości dowodów",
      "Jeden Data Lake — koniec z plikami w mailach",
    ],
    Mockup: DataIntegrationMockup,
    accent: "from-emerald-500/20 via-blue-500/15 to-transparent",
  },
  {
    num: "03",
    icon: Workflow,
    badge: "Project Management",
    title: "Zarządzanie pracą — taski same się organizują",
    description:
      "Procedury rozkładają się na zadania z jasno określonym timeline'em, ownerem i dowodami do zebrania. AI przydziela, przypomina i zamyka — a Twój zespół realizuje wszystko z poziomu maila lub Slacka.",
    bullets: [
      "Procedury → zadania z timeline'em i ownerem",
      "Auto-przydziały i przypomnienia od Leona",
      "Realizacja zadań prosto ze skrzynki mailowej",
    ],
    Mockup: TaskAutomationMockup,
    accent: "from-amber-500/20 via-rose-500/15 to-transparent",
  },
  {
    num: "04",
    icon: FileSignature,
    badge: "15 minut, nie 3 miesiące",
    title: "Polityki, rejestry, profile w 15 minut",
    description:
      "Policy Builder prowadzi przez tworzenie polityki krok po kroku z biblioteki gotowych szablonów. Procedure Builder to wizualny workflow z podziałem Owner/Collaborators. Live preview, wersjonowanie, podpis elektroniczny zgodny z eIDAS.",
    bullets: [
      "Biblioteka szablonów dla NIS2, ISO, DORA, GDPR",
      "Mapowanie danych i łańcuch dostaw pod stałą kontrolą",
      "Wersjonowanie + podpis e-IDAS w jednym miejscu",
    ],
    Mockup: PolicyBuilderMockup,
    accent: "from-purple-500/20 via-pink-500/15 to-transparent",
  },
  {
    num: "05",
    icon: ShieldCheck,
    badge: "Audyt-ready",
    title: "Audyt i weryfikacja — audytor wchodzi, klikasz, wychodzi",
    description:
      "Każda decyzja, data, osoba i podpis elektroniczny są zarejestrowane. Jedno kliknięcie = raport dla organu nadzoru w PDF, Excel, XBRL lub XML. Management Body Accountability gotowy do okazania.",
    bullets: [
      "Pełny audit trail każdej zmiany i decyzji",
      "Eksport w PDF / XLSX / XBRL / XML jednym przyciskiem",
      "Management Body Accountability out-of-the-box",
    ],
    Mockup: AuditExportMockup,
    accent: "from-emerald-500/20 via-teal-500/15 to-transparent",
  },
];

const ProductFiveAreas = () => {
  return (
    <section className="relative bg-slate-950 py-20 overflow-hidden">
      {/* Background glow */}
      <div aria-hidden className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]" />
      <div aria-hidden className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            AI Native GRC
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            6 obszarów, w których Quantifier robi różnicę
          </h2>
          <p className="text-lg text-white/70">
            System klasy AI Native GRC — nie kolejna baza dokumentów. Quantifier myśli, integruje, automatyzuje
            i przygotowuje Cię do każdego audytu.
          </p>
        </div>

        <div className="space-y-12">
          {areas.map((area, idx) => {
            const reverse = idx % 2 === 1;
            const Icon = area.icon;
            const Mockup = area.Mockup;
            return (
              <div
                key={area.num}
                id={`area-${area.num}`}
                className={`relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-gradient-to-br ${area.accent} bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-sm scroll-mt-24`}
              >
                {/* Text */}
                <div className={reverse ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-5xl font-bold text-white/10 leading-none">{area.num}</span>
                    <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-white/60 bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
                      {area.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">{area.title}</h3>
                  <p className="text-white/75 leading-relaxed mb-5">{area.description}</p>
                  {area.bullets && (
                    <ul className="space-y-2">
                      {area.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-white/85">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Mockup */}
                <div className={reverse ? "lg:order-1" : ""}>
                  <Mockup />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductFiveAreas;
