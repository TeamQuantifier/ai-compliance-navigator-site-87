import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Users,
  FileCheck,
  Layers,
  ClipboardList,
  Target,
  MessageSquare,
  Sparkles,
  Building2,
  Gavel,
  Clock,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TrainingPromoForm } from '@/components/promo/TrainingPromoForm';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const DEADLINE = '14.07.2026';
const CANONICAL = 'https://quantifier.ai/pl/darmowe-szkolenie-nis2/';

const agenda = [
  {
    icon: Target,
    duration: '45 min',
    title: 'Czy to dotyczy Twojej firmy?',
    desc: 'Samoidentyfikacja krok po kroku. 18 sektorów krytycznych, podmioty kluczowe vs. ważne, progi wielkości.',
  },
  {
    icon: ShieldAlert,
    duration: '60 min',
    title: 'Cztery obszary obowiązków NIS2',
    desc: 'Zarządzanie ryzykiem, obsługa incydentów (zgłoszenie do CSIRT w 24h), bezpieczeństwo łańcucha dostaw, odpowiedzialność zarządu (art. 20 — osobista odpowiedzialność kierownictwa, kary do 10 mln EUR).',
  },
  {
    icon: FileCheck,
    duration: '60 min',
    title: 'Co trzeba mieć „na papierze”: rejestry i dokumentacja',
    desc: 'Praktyczny przegląd: rejestr ryzyk, rejestr incydentów, rejestr aktywów, ewidencja dostawców, polityki bezpieczeństwa, ścieżka audytowa. Co dokładnie sprawdzi audytor.',
  },
  {
    icon: Layers,
    duration: '45 min',
    title: 'Jak się przygotować bez chaosu',
    desc: 'Harmonogram terminów (samoidentyfikacja → system do kwietnia 2027 → audyty od 2028). Automatyzacja, rejestry, gap analysis i dokumentacja bez zbędnej pracy.',
  },
  {
    icon: MessageSquare,
    duration: '30 min',
    title: 'Q&A z ekspertami',
    desc: 'Czas na indywidualne pytania uczestników — eksperci i prawnicy odpowiadają na realne wątpliwości z Twojej firmy.',
  },
];

const painPoints = [
  {
    icon: CalendarClock,
    title: 'KSC 2.0 już obowiązuje',
    desc: 'Nowelizacja ustawy o KSC weszła w życie 3 kwietnia 2026 r. (Dz.U. 2026 poz. 252). Wcześniejsi operatorzy usług kluczowych automatycznie stają się podmiotami kluczowymi.',
  },
  {
    icon: Clock,
    title: 'Samoidentyfikacja do 3.10.2026',
    desc: 'Firmy muszą same wpisać się do wykazu w systemie S46. To pierwszy obowiązek z konkretną datą — zostało mniej niż 4 miesiące.',
  },
  {
    icon: Gavel,
    title: 'Kary do 10 mln EUR / 2% obrotu',
    desc: 'Plus do 2-letniego zakazu pełnienia funkcji dla kadry kierowniczej za rażące naruszenia. Odpowiedzialność jest osobista (art. 20).',
  },
  {
    icon: Building2,
    title: '~10 000 firm + ich łańcuch dostaw',
    desc: '18 sektorów krytycznych bezpośrednio. Pośrednio — wszyscy ich dostawcy: klauzule NIS2, audyty, monitoring ryzyka. Możesz nie wiedzieć, że już Cię to dotyczy.',
  },
];

const timeline = [
  { date: '3.04.2026', label: 'Wejście w życie KSC 2.0', desc: 'Dotychczasowi operatorzy automatycznie podmiotami kluczowymi.' },
  { date: '3.10.2026', label: 'Samoidentyfikacja w S46', desc: 'Ostateczny termin na wpis do wykazu. Firmy muszą podjąć działanie.' },
  { date: '3.04.2027', label: 'Pełne wdrożenie SZBI', desc: 'Koniec 12-miesięcznego okresu na środki zarządzania ryzykiem i integrację z S46.' },
  { date: '3.04.2028', label: 'Pierwszy audyt + kary', desc: 'Termin pierwszego obowiązkowego audytu i start pełnej egzekucji kar.' },
];

const faqs = [
  {
    q: 'Czy moja firma podlega NIS2 / KSC 2.0?',
    a: 'Co do zasady: średnie i duże firmy (≥50 pracowników lub >10 mln EUR obrotu) z 18 sektorów krytycznych — energetyka, transport, bankowość, ochrona zdrowia, woda, infrastruktura cyfrowa, administracja, ICT, usługi cyfrowe, produkcja krytyczna (chemia, żywność, wyroby medyczne, motoryzacja, elektronika), poczta i kurierzy, sektor kosmiczny. Na szkoleniu pokażemy, jak to ocenić samodzielnie.',
  },
  {
    q: 'A jeśli jesteśmy mniejszą firmą — dostawcą podmiotu kluczowego?',
    a: 'Wtedy NIS2 dotyczy Cię pośrednio. Klienci objęci dyrektywą będą wymagać klauzul NIS2 w umowach, audytów i monitoringu ryzyka. W praktyce musisz spełnić część obowiązków, żeby nie wypaść z łańcucha dostaw.',
  },
  {
    q: 'Ile kosztuje udział w akcji wsparcia?',
    a: '0 zł dla zakwalifikowanych firm. To akcja wsparcia poziomu cyberbezpieczeństwa polskich przedsiębiorstw — wspieramy 100 firm we wzmocnieniu przygotowania do NIS2. Rejestracja do 14.07.2026, decyduje kolejność zgłoszeń.',
  },
  {
    q: 'Stacjonarnie czy online?',
    a: 'Do wyboru — obie formy są dostępne. Formę dopasowujemy do potrzeb zespołu po otrzymaniu zgłoszenia.',
  },
  {
    q: 'Kto prowadzi szkolenie?',
    a: 'Eksperci i prawnicy Quantifier.ai, którzy na co dzień wdrażają NIS2 i KSC 2.0 w firmach. To praktyka, nie sucha teoria — odpowiadamy na realne pytania z Twojego sektora.',
  },
  {
    q: 'Co dostanę po szkoleniu?',
    a: 'Konkretny plan działania dla Twojej firmy: wynik samoidentyfikacji, listę obowiązków, rejestrów i terminów oraz rekomendacje pierwszych kroków — nie kolejny stos slajdów.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      name: 'Darmowe szkolenie NIS2 / KSC 2.0 dla firm',
      description:
        '4-godzinne praktyczne szkolenie z NIS2 i Krajowego Systemu Cyberbezpieczeństwa (KSC 2.0). Samoidentyfikacja, obowiązki, dokumentacja, harmonogram. Prowadzą eksperci i prawnicy Quantifier.ai.',
      provider: {
        '@type': 'Organization',
        name: 'Quantifier.ai',
        url: 'https://quantifier.ai',
      },
      url: CANONICAL,
      inLanguage: 'pl-PL',
      educationalLevel: 'Professional',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'PLN',
        availability: 'https://schema.org/LimitedAvailability',
        validThrough: '2026-07-14',
        url: `${CANONICAL}#promo-form`,
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

const Nis2TrainingLanding = () => {
  return (
    <>
      <Helmet>
        <html lang="pl" />
        <title>Darmowe szkolenie NIS2 / KSC 2.0 dla firm — Quantifier.ai</title>
        <meta
          name="description"
          content="Darmowe 4h szkolenie z NIS2 i KSC 2.0 dla firm. Praktyka, nie teoria — prowadzą eksperci i prawnicy wdrażający NIS2. Zapisy do 14.07.2026, liczba miejsc ograniczona."
        />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Darmowe szkolenie NIS2 / KSC 2.0 dla firm — Quantifier.ai" />
        <meta
          property="og:description"
          content="4h praktyki z NIS2 i KSC 2.0. Samoidentyfikacja, obowiązki, dokumentacja, harmonogram. Zapisy do 14.07.2026."
        />
        <meta property="og:url" content={CANONICAL} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* HERO */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-br from-[hsl(222_47%_11%)] via-[hsl(222_47%_14%)] to-[hsl(221_60%_20%)] overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,_hsl(221_83%_53%/0.25),transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[520px] h-[520px] bg-[radial-gradient(circle_at_center,_hsl(260_84%_60%/0.15),transparent_70%)] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 mb-6 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold tracking-wide text-white uppercase">
                Darmowe szkolenie · zapisy do {DEADLINE}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Darmowe szkolenie <span className="text-primary">NIS2 / KSC 2.0</span> dla firm
            </h1>
            <p className="text-base md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto">
              4 godziny praktyki z ekspertami i prawnikami wdrażającymi NIS2. Wychodzisz z konkretnym planem działania — nie ze stosem slajdów.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-9">
              {['4 godziny', 'Stacjonarnie lub online', 'Q&A z ekspertami', 'NIS2 + KSC 2.0'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base">
                <a href="#promo-form">
                  Zapisz się na szkolenie <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white px-8 py-6 text-base"
              >
                <a href="#agenda">Zobacz program (4h)</a>
              </Button>
            </div>

            <p className="text-xs text-white/60 mt-6">
              Liczba miejsc ograniczona · decyduje kolejność zgłoszeń
            </p>
          </div>
        </div>
      </section>

      {/* PAIN — dlaczego teraz */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20 mb-4">
              <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
              <span className="text-xs font-semibold tracking-wide text-destructive uppercase">
                Dlaczego teraz
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              KSC 2.0 już obowiązuje. Większość firm nie wie nawet, czy ich dotyczy.
            </h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              Pierwszy konkretny termin — samoidentyfikacja w systemie S46 — wypada 3.10.2026. Zostało mniej niż 4 miesiące, a kary i odpowiedzialność osobista zarządu są realne.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {painPoints.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-11 h-11 rounded-xl bg-destructive/10 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-destructive" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{p.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AGENDA */}
      <section id="agenda" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <ClipboardList className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                Program 4h
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Co dostaniesz w 4 godziny szkolenia
            </h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              5 bloków — od samoidentyfikacji, przez obowiązki i dokumentację, po praktyczny plan wdrożenia.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {agenda.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex gap-5 p-6 bg-slate-50 border border-slate-200 rounded-2xl hover:border-primary/30 hover:bg-white transition-all"
                >
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-3 mb-2">
                      <span className="text-xs font-bold tracking-wider text-primary uppercase">
                        Blok {i + 1} · {item.duration}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-primary/5 border border-primary/20 rounded-2xl">
            <p className="text-sm md:text-base text-slate-700">
              <strong className="text-slate-900">Forma:</strong> do wyboru — stacjonarnie lub online. Dopasujemy do zespołu.
            </p>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="#promo-form">
                Zapisz się <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* WHY THIS TRAINING + QUANTIFIER */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Award className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                  Dlaczego to szkolenie
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5 leading-tight">
                Eksperci i prawnicy, którzy NIS2 wdrażają na co dzień
              </h2>
              <ul className="space-y-4">
                {[
                  'Prowadzą eksperci i prawnicy Quantifier.ai wdrażający NIS2 w firmach — to praktyka, nie sucha teoria.',
                  'Odpowiadamy na realne pytania z Twojego sektora — nie generyczne case study.',
                  'Wychodzisz z konkretnym planem działania dla swojej firmy — listą obowiązków, terminów i pierwszych kroków.',
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm md:text-base text-slate-700 leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
              <p className="text-xs font-semibold tracking-wider text-primary uppercase mb-3">
                O Quantifier.ai
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-5">
                Polska platforma GRC (governance, risk, compliance) połączona z doradztwem ekspertów. Łączymy technologię z realnym wsparciem we wdrażaniu zgodności — od cyberbezpieczeństwa (NIS2, ISO 27001, DORA), przez AI Act i governance, po ESG i ślad węglowy.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-5">
                Wyrośliśmy z <strong>Envirly</strong> — certyfikowanej platformy ESG (300+ projektów na świecie, TÜV NORD). Dziś wspieramy 250+ organizacji i 2 000+ użytkowników. Wśród klientów referencyjnych: <strong>BNP Paribas</strong>.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200">
                <div>
                  <p className="text-2xl font-bold text-slate-900">250+</p>
                  <p className="text-xs text-slate-500">organizacji</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">2 000+</p>
                  <p className="text-xs text-slate-500">użytkowników</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">TÜV NORD</p>
                  <p className="text-xs text-slate-500">certyfikacja</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MID CTA */}
      <section className="py-12 bg-gradient-to-r from-primary via-primary to-primary/80">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 max-w-5xl mx-auto">
            <div className="text-center md:text-left">
              <p className="text-xs font-semibold tracking-wider text-primary-foreground/80 uppercase mb-1">
                Zapisy do {DEADLINE}
              </p>
              <p className="text-xl md:text-2xl font-bold text-primary-foreground leading-tight">
                Zarezerwuj miejsce — liczba ograniczona
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 px-7 py-6 text-base font-semibold"
            >
              <a href="#promo-form">
                Wypełnij formularz <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* TIMELINE / KALENDARZ NIS2 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-4">
              <CalendarClock className="h-3.5 w-3.5 text-slate-700" />
              <span className="text-xs font-semibold tracking-wide text-slate-700 uppercase">
                Kalendarz NIS2 / KSC 2.0
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Kluczowe terminy do 2028 r.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Każda data wiąże konkretny obowiązek. Im wcześniej zaczniesz, tym mniej chaosu.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {timeline.map((t, i) => (
              <div
                key={t.date}
                className="relative bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-primary/30 transition-colors"
              >
                <div className="text-xs font-bold tracking-wider text-primary uppercase mb-2">
                  Krok {i + 1}
                </div>
                <p className="text-xl font-bold text-slate-900 mb-1">{t.date}</p>
                <p className="text-sm font-semibold text-slate-800 mb-2">{t.label}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold text-slate-900">Obowiązki w 4 obszarach</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><strong>Zarządzanie ryzykiem / SZBI</strong> — polityki, dokumentacja, środki techniczne i organizacyjne.</li>
                <li><strong>Obsługa incydentów</strong> — wczesne ostrzeżenie w 24h, zgłoszenie w 72h, raport końcowy w 1 miesiąc.</li>
                <li><strong>Łańcuch dostaw</strong> — audyt dostawców, klauzule NIS2 w umowach, monitoring ryzyka.</li>
                <li><strong>Odpowiedzialność zarządu (art. 20)</strong> — zatwierdzanie polityk z podpisem, obowiązkowe szkolenia, ślad audytowy.</li>
              </ul>
            </div>
            <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Gavel className="h-5 w-5 text-destructive" />
                <h3 className="text-lg font-bold text-slate-900">Kary</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-700">
                <li>
                  <strong className="block text-slate-900">Podmioty kluczowe</strong>
                  do <strong>10 mln EUR</strong> lub <strong>2%</strong> rocznego światowego obrotu
                </li>
                <li>
                  <strong className="block text-slate-900">Podmioty ważne</strong>
                  do <strong>7 mln EUR</strong> lub <strong>1,4%</strong> obrotu
                </li>
                <li>
                  <strong className="block text-slate-900">Zarząd</strong>
                  za rażące naruszenia — nawet <strong>2-letni zakaz</strong> pełnienia funkcji
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 text-center">
              Najczęstsze pytania
            </h2>
            <p className="text-base text-slate-600 leading-relaxed text-center mb-10">
              Wszystkiego nie da się tu zmieścić — resztę omówimy w bloku Q&A na szkoleniu.
            </p>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-white border border-slate-200 rounded-xl px-5"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-slate-600 leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* FORM */}
      <TrainingPromoForm locale="pl" />

      {/* Trust footer line */}
      <section className="py-8 bg-slate-950 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-white/60 max-w-3xl mx-auto leading-relaxed">
            Quantifier.ai · polska platforma GRC z certyfikacją TÜV NORD · 250+ organizacji ·{' '}
            <Link to="/pl/frameworks/nis-2/" className="text-primary hover:underline">
              Dowiedz się więcej o NIS2 i KSC 2.0
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Nis2TrainingLanding;
