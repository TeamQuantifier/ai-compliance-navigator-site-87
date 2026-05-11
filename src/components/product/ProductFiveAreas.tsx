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

const LeonMonitorMockup = () => (
  <div className="rounded-xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden text-xs">
    <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-slate-950">
      <div className="relative h-7 w-7 rounded-full overflow-hidden ring-2 ring-emerald-400/60">
        <img src={leonOfficer} alt="Leon" className="h-full w-full object-cover scale-110" />
      </div>
      <div className="flex-1">
        <div className="text-white font-semibold leading-tight">Leon · AI Compliance Officer</div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> online · monitoruje 24/7
        </div>
      </div>
    </div>
    <div className="p-3 space-y-2">
      <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 rounded-lg p-2">
        <AlertTriangle className="h-3.5 w-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
        <div className="text-[11px] text-amber-100">
          <strong>Polityka BCM</strong> wygasa za 9 dni — przygotowałem draft v3.2
        </div>
      </div>
      <div className="flex items-start gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-2">
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
        <div className="text-[11px] text-emerald-100">
          <strong>ISO 27001 A.8.2</strong> — 14 dowodów odświeżonych w nocy
        </div>
      </div>
      <div className="flex items-start gap-2 bg-blue-500/10 border border-blue-500/30 rounded-lg p-2">
        <Clock className="h-3.5 w-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
        <div className="text-[11px] text-blue-100">
          <strong>NIS2 Art. 21</strong> — wysłałem 3 przypomnienia do właścicieli kontroli
        </div>
      </div>
    </div>
  </div>
);

const DataIntegrationMockup = () => {
  const sources = [
    { name: "Microsoft 365", color: "bg-blue-500" },
    { name: "Jira", color: "bg-sky-500" },
    { name: "AWS / Azure", color: "bg-amber-500" },
    { name: "HRIS", color: "bg-emerald-500" },
    { name: "Vendors API", color: "bg-purple-500" },
    { name: "Excel / CSV", color: "bg-rose-500" },
  ];
  return (
    <div className="rounded-xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden text-xs p-4">
      <div className="text-[10px] uppercase tracking-wider text-white/50 font-semibold mb-3">Źródła danych</div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {sources.map((s) => (
          <div key={s.name} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-md px-2 py-1.5">
            <div className={`h-2 w-2 rounded-full ${s.color}`} />
            <span className="text-[10px] text-white/80 truncate">{s.name}</span>
          </div>
        ))}
      </div>
      <div className="relative flex items-center justify-center my-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
        <div className="px-2 text-emerald-300 text-[10px] font-bold flex items-center gap-1">
          <Plug className="h-3 w-3" /> AUTO-SYNC
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
      </div>
      <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-emerald-400/30 rounded-lg p-3 text-center">
        <Database className="h-5 w-5 text-emerald-300 mx-auto mb-1" />
        <div className="text-white text-xs font-semibold">Quantifier Data Lake</div>
        <div className="text-[10px] text-white/60">Dowody · metryki · dokumenty · ryzyka</div>
      </div>
    </div>
  );
};

const TaskAutomationMockup = () => (
  <div className="rounded-xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden text-xs">
    <div className="px-3 py-2 border-b border-white/10 bg-slate-950 flex items-center justify-between">
      <span className="text-white font-semibold">Auto-zadania z procedury</span>
      <span className="text-[10px] text-emerald-400">+12 dziś</span>
    </div>
    <div className="p-3 space-y-2">
      {[
        { t: "Przegląd uprawnień M365", d: "Owner: A. Nowak", due: "do 14.05", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
        { t: "Dowód MFA — eksport raportu", d: "Owner: IT Team", due: "do 16.05", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { t: "Ocena dostawcy — Acme Sp.", d: "Owner: Procurement", due: "do 22.05", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
      ].map((row, i) => (
        <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-2">
          <div className="h-4 w-4 rounded border border-white/30" />
          <div className="flex-1 min-w-0">
            <div className="text-white text-[11px] font-medium truncate">{row.t}</div>
            <div className="text-[10px] text-white/50 truncate">{row.d}</div>
          </div>
          <span className={`text-[9px] px-1.5 py-0.5 rounded border ${row.color} whitespace-nowrap`}>{row.due}</span>
        </div>
      ))}
      <div className="mt-3 flex items-center gap-2 text-[10px] text-white/60 bg-blue-500/10 border border-blue-500/30 rounded-lg p-2">
        <Mail className="h-3.5 w-3.5 text-blue-300 flex-shrink-0" />
        <span>Realizacja zadań prosto z maila — kliknij „Zatwierdź", Leon zamknie task</span>
      </div>
    </div>
  </div>
);

const PolicyBuilderMockup = () => (
  <div className="rounded-xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden text-xs">
    <div className="px-3 py-2 border-b border-white/10 bg-slate-950 flex items-center gap-2">
      <FileSignature className="h-4 w-4 text-purple-300" />
      <span className="text-white font-semibold">Policy Builder — kreator polityki</span>
      <span className="ml-auto text-[10px] text-emerald-400">Live preview</span>
    </div>
    <div className="grid grid-cols-2">
      <div className="border-r border-white/10 p-3 space-y-1.5">
        {["1. Wybór szablonu", "2. Owner & Collaborators", "3. Sekcje i kontrole", "4. Wersjonowanie", "5. Podpis e-IDAS"].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className={`h-4 w-4 rounded-full flex items-center justify-center text-[9px] font-bold ${i < 3 ? "bg-emerald-500 text-white" : "bg-white/10 text-white/50"}`}>
              {i < 3 ? "✓" : i + 1}
            </div>
            <span className={`text-[10px] ${i < 3 ? "text-white" : "text-white/50"}`}>{step}</span>
          </div>
        ))}
      </div>
      <div className="p-3 bg-white/[0.03]">
        <div className="bg-white rounded-md p-2 shadow-inner">
          <div className="h-1.5 w-3/4 bg-slate-800 rounded mb-1" />
          <div className="h-1 w-full bg-slate-200 rounded mb-1" />
          <div className="h-1 w-5/6 bg-slate-200 rounded mb-1" />
          <div className="h-1 w-2/3 bg-slate-200 rounded mb-2" />
          <div className="h-1 w-full bg-slate-200 rounded mb-1" />
          <div className="h-1 w-4/5 bg-slate-200 rounded" />
        </div>
        <div className="mt-2 flex items-center justify-between text-[9px] text-white/60">
          <span>v1.3 · draft</span>
          <span className="text-emerald-300 font-semibold">15 min</span>
        </div>
      </div>
    </div>
  </div>
);

const AuditExportMockup = () => (
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
