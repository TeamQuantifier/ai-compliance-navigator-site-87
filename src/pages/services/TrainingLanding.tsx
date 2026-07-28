import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { TrainingPromoFormInline } from '@/components/promo/TrainingPromoForm';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  FileCheck,
  Target,
  Briefcase,
  ShieldCheck,
  Cpu,
  Truck,
  Calendar,
  Clock,
  Map,
  BookOpen,
  MessagesSquare,
} from 'lucide-react';

const featuredLogos = [
  { src: '/featured/ministerstwo-cyfryzacji.png', alt: 'Ministerstwo Cyfryzacji', h: 'h-14 md:h-16' },
  { src: '/featured/ncc-pl.png', alt: 'NCC-PL — Krajowe Centrum Kompetencji Cyberbezpieczeństwa', h: 'h-14 md:h-16' },
  { src: '/featured/ai-chamber.png', alt: 'AI Chamber', h: 'h-10 md:h-12' },
  { src: '/featured/klaster-gospodarki-cyrkularnej.png', alt: 'Klaster Gospodarki Cyrkularnej i Recyklingu', h: 'h-12 md:h-14' },
  { src: '/featured/top-ai-driven-companies.png', alt: 'Top AI Driven Companies', h: 'h-12 md:h-14' },
];

const problems = [
  {
    title: 'Czy w ogóle podlegamy?',
    desc: 'Ustawa objęła 18 branż i tysiące organizacji, które wcześniej nie były w systemie — m.in. gospodarkę odpadami i ściekami, usługi pocztowe, produkcję żywności i chemikaliów, wyroby medyczne. Ciężar kwalifikacji spoczywa na samym podmiocie: nikt Was nie poinformuje, że podlegacie. To Wy musicie to ustalić i zgłosić.',
  },
  {
    title: 'Kto konkretnie odpowiada?',
    desc: 'Nowe przepisy przypisują odpowiedzialność za realizację zadań z zakresu cyberbezpieczeństwa kierownikowi podmiotu. Delegowanie tematu „do IT" nie zdejmuje tej odpowiedzialności — a od kwietnia 2028 r. jej zaniechanie jest zagrożone karami pieniężnymi.',
  },
  {
    title: 'Czym to udowodnimy?',
    desc: 'Zgodności nie potwierdza deklaracja ani polityka w intranecie. Potwierdza ją dokumentacja SZBI: rejestr aktywów, ocena ryzyka, Deklaracja Stosowania, plan ciągłości działania, dowody z testów. Do wniosku o wpis potrzebne są też dane techniczne, w tym zakresy adresów IP i domen — ich zebranie zajmuje więcej czasu, niż się zakłada.',
  },
];

const effects: { icon: any; text: string }[] = [
  { icon: UserCheck, text: 'Wstępna kwalifikacja Waszego podmiotu — kluczowy, ważny albo poza zakresem — wraz z uzasadnieniem.' },
  { icon: FileCheck, text: 'Jasność, jak się rejestrować w Wykazie KSC i jakie dane techniczne przygotować.' },
  { icon: Map, text: 'Mapa obowiązków z art. 21(2) NIS2 przełożona na konkretne zabezpieczenia ISO/IEC 27001.' },
  { icon: ShieldCheck, text: 'Zrozumienie zakresu odpowiedzialności kierownika podmiotu i tego, jak ją udokumentować.' },
  { icon: BookOpen, text: 'Lista dokumentów SZBI, które musicie mieć do kwietnia 2027 r.' },
  { icon: Clock, text: 'Terminy raportowania incydentów rozpisane na godziny i dni — zanim wystąpi incydent.' },
  { icon: Target, text: 'Zarys planu wdrożenia z podziałem na to, co robicie sami, a co warto zautomatyzować.' },
];

const audience = [
  { icon: Briefcase, title: 'Zarządy i kadra kierownicza', desc: 'Odpowiedzialność za realizację zadań z zakresu cyberbezpieczeństwa spoczywa na kierowniku podmiotu i wymaga udokumentowanego przeszkolenia.' },
  { icon: FileCheck, title: 'Compliance, ryzyko, audyt wewnętrzny', desc: 'To Wasz dział będzie musiał wykazać zgodność wobec organu i kontrahentów.' },
  { icon: Cpu, title: 'CISO, IT, bezpieczeństwo informacji', desc: 'Warto mieć wspólny język z zarządem, zanim trzeba będzie prosić o budżet.' },
  { icon: Truck, title: 'Zespoły zakupowe i łańcuch dostaw', desc: 'Wymagania kaskadują się na dostawców, także tych spoza ustawy.' },
];

const faqs = [
  {
    q: 'Ustawa trafiła do Trybunału Konstytucyjnego. Czy nie warto poczekać?',
    a: 'Nie. Prezydent podpisał ustawę i skierował ją do kontroli następczej — to znaczy, że przepisy obowiązują od 3 kwietnia 2026 r. i terminy biegną normalnie. Zastrzeżenia dotyczą przede wszystkim regulacji o dostawcach wysokiego ryzyka i poleceniach zabezpieczających, a nie obowiązków rejestracyjnych czy wymogów SZBI dla podmiotów kluczowych i ważnych. Czekanie na rozstrzygnięcie oznacza po prostu utratę czasu z sześciomiesięcznego okna.',
  },
  {
    q: 'Czy godzina wystarczy na taki temat?',
    a: 'Nie zastąpi wdrożenia i nie udaje, że zastępuje. Wystarczy natomiast, żeby zarząd zrozumiał zakres swojej odpowiedzialności, a zespół wiedział, od czego zacząć i w jakiej kolejności. To najczęściej brakujący element — nie wiedza szczegółowa, tylko wspólny punkt startu.',
  },
  {
    q: 'Nie jesteśmy pewni, czy ustawa nas dotyczy. Ma sens uczestnictwo?',
    a: 'Tak — moduł drugi jest poświęcony dokładnie temu. Ustawa przenosi ciężar kwalifikacji na sam podmiot, więc odpowiedź „nie podlegamy" też jest wartościowa, o ile jest udokumentowana i można ją pokazać kontrahentowi albo organowi.',
  },
  {
    q: 'Nie zdążymy do 3 października. Co wtedy?',
    a: 'Zaniedbanie wpisu uruchamia wpis z urzędu, a dalej czynności nadzorcze. Kary pieniężne mogą być nakładane dopiero od kwietnia 2028 r., co nie znaczy, że wcześniejsze zaniechania są bez znaczenia — organ ocenia stan przygotowania od początku obowiązywania przepisów. Szkolenie pomoże ustalić, co da się zrobić w pozostałym czasie i w jakiej kolejności.',
  },
  {
    q: 'Mamy certyfikat ISO 27001. Czy to nie wystarczy?',
    a: 'Certyfikat pokrywa istotną część wymagań SZBI, ale nie wszystkie — różnice dotyczą m.in. obowiązków rejestracyjnych i raportowych, roli kierownika podmiotu i bezpieczeństwa łańcucha dostaw. Moduł trzeci pokazuje dokładnie, gdzie te luki występują.',
  },
  {
    q: 'Czy szkolenie jest techniczne?',
    a: 'Nie. Jest regulacyjne i organizacyjne. Nie wymaga przygotowania technicznego — jest projektowane tak, żeby zarząd i dział IT wyszli z niego z tym samym rozumieniem sytuacji.',
  },
  {
    q: 'Czy szkolenie spełnia obowiązek szkoleniowy?',
    a: 'Wystawiamy imienne zaświadczenia uczestnictwa wraz z programem, które stanowią dokumentację realizacji szkolenia dla kierownictwa podmiotu. Zakres i częstotliwość szkoleń w Waszej organizacji powinny wynikać z przyjętej polityki bezpieczeństwa.',
  },
  {
    q: 'Ile to kosztuje?',
    a: 'Bezpłatne, oferta limitowana czasowo.',
  },
];

const TrainingLanding = () => {
  const { currentLocale } = useLanguage();
  const baseUrl = 'https://quantifier.ai';
  const pageUrl = `${baseUrl}/${currentLocale}/${currentLocale === 'pl' ? 'szkolenia-cyberbezpieczenstwo-dla-firm' : currentLocale === 'cs' ? 'skoleni-kyberneticka-bezpecnost-pro-firmy' : 'cybersecurity-training-for-companies'}`;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <Helmet>
        <title>Szkolenie KSC / NIS2 — 60 minut dla zarządu i zespołu | Quantifier.ai</title>
        <meta
          name="description"
          content="Ustawa o KSC obowiązuje od 3 kwietnia 2026 r. Termin wpisu do Wykazu KSC mija 3 października. 60-minutowe szkolenie dla zarządów, compliance i IT — bezpłatne, oferta limitowana."
        />
        <link rel="canonical" href={pageUrl + '/'} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* ─── 1. HERO ─── */}
      <section className="relative bg-slate-950 overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(221_83%_53%/0.18),transparent_60%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                Szkolenie dla firm · 60 minut · online lub stacjonarnie · Cyberbezpieczeństwo
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Cyberbezpieczeństwo. Ustawa o KSC obowiązuje. Termin wpisu do wykazu mija 3 października.
            </h1>

            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Prezydent podpisał nowelizację ustawy o krajowym systemie cyberbezpieczeństwa 19 lutego 2026 r., a przepisy wdrażające dyrektywę NIS2 weszły w życie 3 kwietnia 2026 r. Podmioty kluczowe i ważne mają obowiązek złożyć wniosek o wpis do Wykazu KSC do 3 października 2026 r.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base"
            >
              <a href="#contact">Zarezerwuj termin szkolenia</a>
            </Button>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> 60 minut</span>
              <span className="inline-flex items-center gap-2"><FileCheck className="h-4 w-4 text-primary" /> Materiały i checklisty po szkoleniu</span>
              <span className="inline-flex items-center gap-2"><Cpu className="h-4 w-4 text-primary" /> Dostęp do środowiska DEMO</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Prowadzą praktycy GRC</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. PROBLEM ─── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pytania, na które wiele firm nie ma jeszcze odpowiedzi
            </h2>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            {problems.map((p, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. EFEKTY ─── */}
      <section className="py-16 md:py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Co wychodzi z sali po 60 minutach
            </h2>
            <p className="text-lg text-muted-foreground">
              Konkretne rezultaty, które zabierzecie z sali — nie prezentacja, tylko punkty pracy.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
            {effects.map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-start gap-3 p-5 rounded-xl border border-border bg-card">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm md:text-base text-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. DLA KOGO ─── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Dla kogo jest to szkolenie
            </h2>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {audience.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="p-6 rounded-xl border border-border bg-card">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. PROWADZĄCY ─── */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white border-y border-slate-200/70">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-compliance-50 border border-compliance-200 text-compliance-700 text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-compliance-500" />
              Prowadzący
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Szkolenie prowadzą audytorzy Quantifier.ai
            </h2>
            <p className="text-lg text-slate-600">
              Praktycy GRC z doświadczeniem w audytach ISO/IEC 27001, wdrożeniach SZBI i przygotowaniu podmiotów do wymogów NIS2/KSC. Program prowadzi zespół audytorów Quantifier.ai — firmy, która wspiera organizacje w spełnianiu obowiązków cyberbezpieczeństwa i compliance.
            </p>
          </div>

          <div className="mt-10">
            <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500 mb-6">
              Zaufali nam
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-10 md:gap-x-20">
              {featuredLogos.map((logo) => (
                <li
                  key={logo.src}
                  className="flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    width={200}
                    height={64}
                    className={`${logo.h} w-auto object-contain`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── 6. FAQ ─── */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900">
            Najczęściej zadawane pytania
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="bg-white rounded-lg border border-slate-200 px-6"
                >
                  <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-compliance-700 py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-5 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ─── 7. CTA KOŃCOWE ─── */}
      <section id="contact" className="py-16 md:py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(221_83%_53%/0.18),transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-5">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                Termin: 3 października 2026
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Do 3 października zostało mniej, niż się wydaje
            </h2>
            <p className="text-lg text-slate-300">
              Zarezerwuj termin szkolenia. Wolicie najpierw porozmawiać?{' '}
              <a
                href={`/${currentLocale}/contact`}
                className="text-primary underline underline-offset-4 hover:text-primary/80 inline-flex items-center gap-1"
              >
                <MessagesSquare className="h-4 w-4" />
                Umów 15-minutową rozmowę wstępną
              </a>
              .
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <TrainingPromoFormInline locale={currentLocale} id="promo-form" />
          </div>
        </div>
      </section>
    </>
  );
};

export default TrainingLanding;
