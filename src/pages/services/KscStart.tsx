import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  FileCheck,
  Gavel,
  Layers,
  ShieldCheck,
  Users,
  Rocket,
  Building2,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import FAQSection from '@/components/seo/FAQSection';
import { buildServicePageSchema } from '@/lib/seo-schema';

const CANONICAL = 'https://quantifier.ai/pl/start-nis2-ksc/';
const DEADLINE = new Date('2026-10-03T23:59:59+02:00');

const daysLeft = () =>
  Math.max(0, Math.ceil((DEADLINE.getTime() - Date.now()) / 86400000));

/* ───────────────────────── formularz ───────────────────────── */

const KscStartForm = ({ id, variant = 'paper' }: { id?: string; variant?: 'paper' | 'light' }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');

  const inputClass =
    'w-full px-4 py-3 rounded-sm bg-white border border-ksc-ink/20 text-ksc-ink placeholder:text-ksc-ink/40 text-sm focus:outline-none focus:border-ksc-accent focus:ring-1 focus:ring-ksc-accent/40';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fn = firstName.trim();
    const em = email.trim().toLowerCase();
    const co = company.trim();
    if (!fn || !em || !co) {
      toast({ title: 'Uzupełnij imię, e-mail i nazwę firmy', variant: 'destructive' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      toast({ title: 'Podaj poprawny e-mail służbowy', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('contact-form', {
        body: {
          firstName: fn,
          lastName: '—',
          email: em,
          company: co,
          message: [
            '[KSC START] Pakiet startowy NIS2 / KSC — 2 tygodnie',
            `Firma: ${co}`,
            phone.trim() ? `Telefon: ${phone.trim()}` : null,
          ]
            .filter(Boolean)
            .join('\n'),
          language: 'pl',
          sourceUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        },
      });
      if (error) throw error;
      setSent(true);
      toast({ title: 'Dziękujemy — zgłoszenie wysłane', description: 'Odezwiemy się w 1 dzień roboczy.' });
    } catch {
      toast({
        title: 'Nie udało się wysłać',
        description: 'Spróbuj ponownie lub napisz na contact@quantifier.ai.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const wrapper =
    variant === 'paper'
      ? 'bg-white border border-ksc-ink/15 rounded-sm p-6 md:p-8'
      : 'bg-ksc-paper border border-ksc-ink/10 rounded-sm p-6 md:p-8';

  return (
    <div id={id} className={wrapper}>
      {sent ? (
        <div className="text-center py-10">
          <div className="w-14 h-14 mx-auto rounded-full border border-ksc-accent/40 bg-ksc-paper flex items-center justify-center mb-4">
            <CheckCircle2 className="h-7 w-7 text-ksc-accent" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold mb-2 text-ksc-ink">Dziękujemy — zgłoszenie wysłane</h3>
          <p className="text-sm text-ksc-ink/65">
            Odezwiemy się w 1 dzień roboczy z propozycją startu pakietu.
          </p>
        </div>
      ) : (
        <>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ksc-accent mb-3">
            Zgłoszenie firmy
          </p>
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-ksc-ink leading-snug">
            Zgłoś firmę do pakietu KSC START
          </h2>
          <p className="text-sm mb-6 text-ksc-ink/65">
            Trzy pola. Odpowiadamy w 1 dzień roboczy i proponujemy termin startu.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Imię *"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              maxLength={80}
              required
              className={inputClass}
            />
            <input
              type="email"
              placeholder="Służbowy e-mail *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={200}
              required
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Nazwa firmy *"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              maxLength={150}
              required
              className={inputClass}
            />
            <input
              type="tel"
              placeholder="Telefon (opcjonalnie)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={40}
              className={inputClass}
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-sm bg-ksc-ink hover:bg-ksc-surface text-white h-12 text-base font-semibold"
            >
              {loading ? 'Wysyłanie…' : 'Zgłaszam firmę'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-xs text-ksc-ink/50 leading-relaxed">
              Wysyłając formularz zgadzasz się na kontakt w sprawie pakietu KSC START. Dane wykorzystujemy wyłącznie do obsługi zgłoszenia.
            </p>
          </form>
        </>
      )}
    </div>
  );
};


/* ───────────────────────── dane sekcji ───────────────────────── */

const clock = [
  {
    date: '3.10.2026',
    title: 'Wniosek o wpis do wykazu KSC',
    desc: 'Samoidentyfikacja po stronie podmiotu i złożenie wniosku w systemie S46.',
  },
  {
    date: '3.04.2027',
    title: 'Koniec okresu dostosowawczego',
    desc: 'SZBI, analiza ryzyka i procedury obsługi incydentów muszą działać.',
  },
  {
    date: '3.04.2028',
    title: 'Kary i pierwszy audyt',
    desc: 'Pierwsze kary pieniężne oraz pierwszy audyt bezpieczeństwa.',
  },
];

const scope = [
  {
    icon: Users,
    num: '01',
    title: 'Szkolenie NIS2 dla zarządu, IT i compliance',
    items: [
      'Kogo obejmuje KSC: podmiot kluczowy czy ważny, progi i sektory',
      'Obowiązki i terminy ustawowe, odpowiedzialność kierownictwa, sankcje',
      'Wymagane środki techniczne i organizacyjne — co trzeba mieć wdrożone',
      'Incydenty: klasyfikacja, terminy zgłoszeń, praca w systemie',
    ],
  },
  {
    icon: FileCheck,
    num: '02',
    title: 'Samoidentyfikacja i wpis do wykazu KSC',
    items: [
      'Warsztat klasyfikacyjny: sektor i próg wielkości',
      'Protokół samoidentyfikacji dla organu',
      'Asysta przy wniosku w systemie S46',
      'Rejestracja do systemu',
    ],
  },
  {
    icon: ClipboardList,
    num: '03',
    title: 'Rejestr aktywów z ekspertem',
    items: [
      'Sesje inwentaryzacyjne prowadzone przez eksperta',
      'Systemy, aktywa informacyjne, dostawcy ICT',
      'Krytyczność i przypisanie właścicieli',
    ],
  },
  {
    icon: ShieldCheck,
    num: '04',
    title: 'Konsultacje z dedykowanym ekspertem',
    items: [
      'Dedykowany ekspert na czas trwania pakietu',
      'Interpretacje przepisów w Waszym sektorze',
      'Wsparcie w przygotowaniu decyzji dla zarządu',
    ],
  },
  {
    icon: Layers,
    num: '05',
    title: 'Demo i dostęp do platformy na 14 dni',
    items: [
      'Dostęp do platformy zgodności z NIS2 / KSC',
      'Demo i konfiguracja instancji',
      'Rejestr aktywów przeniesiony do systemu',
      'Raport gotowości i roadmapa do 3.04.2027',
    ],
  },
];

const timeline = [
  { day: '1–2', action: 'Szkolenie NIS2', artifact: 'Certyfikaty i protokół szkolenia' },
  { day: '3–4', action: 'Warsztat klasyfikacyjny, analiza sektorowa i progowa', artifact: 'Protokół samoidentyfikacji' },
  { day: '5', action: 'Kompletacja danych, weryfikacja podpisu, złożenie wniosku w S46', artifact: 'Potwierdzenie wpisu do wykazu' },
  { day: '6–8', action: 'Inwentaryzacja z ekspertem: sesje z właścicielami systemów', artifact: 'Rejestr aktywów w platformie' },
  { day: '9', action: 'Demo platformy i uruchomienie 14-dniowego dostępu startowego', artifact: 'Skonfigurowana instancja' },
  { day: '10', action: 'Self-assessment, analiza luk, sesja podsumowująca', artifact: 'Raport gotowości i roadmapa' },
];

const audience = [
  { icon: Building2, title: 'Podmioty kluczowe i ważne', desc: '18 sektorów objętych KSC — od energetyki i zdrowia po odpady, żywność, produkcję i ICT.' },
  { icon: Gavel, title: 'Kierownicy podmiotu i zarządy', desc: 'Osobista odpowiedzialność za realizację zadań z zakresu cyberbezpieczeństwa — kara do 300% wynagrodzenia.' },
  { icon: ShieldCheck, title: 'Zespoły IT, bezpieczeństwa i compliance', desc: 'Zespoły, które muszą udowodnić zgodność dokumentem, a nie deklaracją.' },
];

const faqs = [
  {
    question: 'Ile trwa pakiet KSC START?',
    answer:
      '10 dni roboczych, czyli około dwóch tygodni kalendarzowych. W tym czasie realizujemy szkolenie, warsztat klasyfikacyjny, złożenie wniosku w systemie S46, inwentaryzację aktywów oraz uruchomienie instancji platformy z raportem gotowości.',
  },
  {
    question: 'Ile kosztuje pakiet?',
    answer:
      'Wartość pakietu to 5 000 zł netto. Realizujemy go bezpłatnie, jeśli po zakończeniu 14-dniowego dostępu decydujecie się na platformę Quantifier. Jeśli nie, rozliczamy pakiet jednorazową fakturą na 5 000 zł netto, bez dodatkowych kosztów.',
  },
  {
    question: 'Co zostaje w firmie, jeśli nie zdecydujemy się na platformę?',
    answer:
      'Wszystkie wypracowane dokumenty: protokół samoidentyfikacji, potwierdzenie wpisu do wykazu, rejestr aktywów, raport gotowości oraz certyfikaty szkoleniowe. Zostają u Was w obu przypadkach.',
  },
  {
    question: 'Jaki jest termin wpisu do wykazu KSC?',
    answer:
      '3 października 2026 r. to ostateczny termin złożenia wniosku o wpis do wykazu podmiotów kluczowych i ważnych w systemie S46. Kolejne kamienie milowe to 3 kwietnia 2027 r. (koniec okresu dostosowawczego) oraz 3 kwietnia 2028 r. (pierwsze kary i audyty).',
  },
  {
    question: 'Jakie są sankcje za brak zgodności?',
    answer:
      'Podmiot kluczowy — do 10 mln EUR lub 2% światowego obrotu. Podmiot ważny — do 7 mln EUR lub 1,4% obrotu (min. 15 000 zł). Kierownik podmiotu odpowiada osobiście — kara do 300% wynagrodzenia.',
  },
  {
    question: 'Czy Quantifier decyduje o klasyfikacji podmiotu?',
    answer:
      'Nie. Decyzja o klasyfikacji podmiotu jako kluczowy lub ważny należy do kierownika podmiotu. Quantifier dostarcza metodykę, analizę i dokumentację wspierającą tę decyzję oraz asystę techniczną przy złożeniu wniosku — nie zastępuje oświadczenia woli podmiotu ani nie świadczy pomocy prawnej.',
  },
];

/* ───────────────────────── strona ───────────────────────── */

const KscStart = () => {
  const days = useMemo(() => daysLeft(), []);

  const schema = buildServicePageSchema({
    url: CANONICAL,
    name: 'KSC START — pakiet startowy zgodności NIS2 i KSC',
    description:
      'Pakiet startowy zgodności z dyrektywą NIS2 i ustawą o KSC: szkolenie, samoidentyfikacja i wpis do wykazu KSC, rejestr aktywów oraz dostęp do platformy — w 10 dni roboczych.',
    serviceType: 'Wdrożenie zgodności NIS2 / KSC',
    areaServed: 'PL',
    locale: 'pl',
    featureList: [
      'Szkolenie NIS2 dla zarządu, IT i compliance',
      'Samoidentyfikacja i wpis do wykazu KSC (system S46)',
      'Rejestr aktywów z ekspertem',
      'Konsultacje z dedykowanym ekspertem',
      'Dostęp do platformy GRC na 14 dni i raport gotowości',
    ],
  });

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Quantifier.ai', item: 'https://quantifier.ai/pl/' },
      { '@type': 'ListItem', position: 2, name: 'NIS2 / KSC', item: 'https://quantifier.ai/pl/frameworks/nis-2/' },
      { '@type': 'ListItem', position: 3, name: 'Start NIS2 / KSC w dwa tygodnie' },
    ],
  };

  return (
    <>
      <Helmet htmlAttributes={{ lang: 'pl' }}>
        <title>Start NIS2 / KSC w dwa tygodnie — pakiet KSC START | Quantifier.ai</title>
        <meta
          name="description"
          content="Wpis do wykazu KSC, szkolenie NIS2, rejestr aktywów i platforma zgodności w 10 dni roboczych. Termin wniosku: 3.10.2026. Pakiet o wartości 5 000 zł netto — 0 zł przy decyzji o platformie."
        />
        <link rel="canonical" href={CANONICAL} />
        <link rel="alternate" hrefLang="pl-PL" href={CANONICAL} />
        <link rel="alternate" hrefLang="x-default" href={CANONICAL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Start NIS2 / KSC w dwa tygodnie — pakiet KSC START" />
        <meta
          property="og:description"
          content="Szkolenie, wpis do wykazu KSC, rejestr aktywów i dostęp do platformy w 10 dni roboczych."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:locale" content="pl_PL" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
      </Helmet>

      {/* ────── HERO — split screen ────── */}
      <section className="relative overflow-hidden bg-ksc-ink pt-28 pb-16 md:pt-32 md:pb-20">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #e8edf3 1px, transparent 1px), linear-gradient(to bottom, #e8edf3 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-ksc-paper/20" aria-hidden="true" />

        <div className="container relative mx-auto px-4">
          <div className="grid lg:grid-cols-[1.35fr_0.95fr] gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-ksc-paper/60 mb-5">
                Pakiet startowy NIS2 / KSC
              </p>

              <h1 className="text-4xl md:text-5xl xl:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-white mb-6">
                Start NIS2 / KSC w dwa tygodnie
              </h1>

              <div className="w-16 h-px bg-ksc-accent mb-6" aria-hidden="true" />

              <p className="text-lg md:text-xl text-ksc-paper/80 leading-relaxed mb-6">
                Pakiet startowy zgodności z dyrektywą NIS2 i Krajowym Systemem Cyberbezpieczeństwa: szkolenie, wpis do wykazu KSC, rejestr aktywów i dostęp do platformy — w 10 dni roboczych.
              </p>

              {/* licznik dni — powściągliwa listwa */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-ksc-paper/20 py-4 mb-8">
                <AlertTriangle className="h-5 w-5 text-ksc-accent shrink-0" strokeWidth={1.5} />
                <span className="text-sm md:text-base text-ksc-paper/75">
                  Wniosek o wpis do wykazu KSC: <span className="text-white font-semibold">3 października 2026 r.</span>
                </span>
                <span className="text-ksc-paper/30" aria-hidden="true">|</span>
                <span className="text-sm md:text-base text-ksc-paper/75">
                  zostało <span className="text-white font-bold text-xl md:text-2xl tabular-nums align-middle">{days}</span> dni
                </span>
              </div>

              {/* trzy dowody */}
              <dl className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { k: '10', l: 'dni roboczych' },
                  { k: '5', l: 'elementów pakietu' },
                  { k: '0 zł', l: 'przy decyzji o platformie' },
                ].map((s) => (
                  <div key={s.l}>
                    <dt className="text-2xl md:text-3xl font-bold text-white tabular-nums">{s.k}</dt>
                    <dd className="text-xs text-ksc-paper/55 mt-1 leading-snug">{s.l}</dd>
                  </div>
                ))}
              </dl>

              <p className="text-sm text-ksc-paper/55 max-w-3xl leading-relaxed border-l-2 border-ksc-accent/50 pl-4">
                <strong className="text-ksc-paper/80 font-semibold">Sankcje:</strong> podmiot kluczowy — do 10 mln EUR lub 2% światowego obrotu; podmiot ważny — do 7 mln EUR lub 1,4% (min. 15 000 zł). Kierownik podmiotu odpowiada osobiście — kara do 300% wynagrodzenia.
              </p>
            </div>

            <div className="lg:sticky lg:top-28">
              <KscStartForm id="zgloszenie" />
            </div>
          </div>
        </div>
      </section>

      {/* ────── PASEK ZAUFANIA ────── */}
      <section className="bg-ksc-paper border-b border-ksc-ink/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-3 py-5">
            {[
              'Prawnicy i praktycy audytu',
              'Metodyka zgodna z ustawą o KSC',
              'Asysta przy wniosku w S46',
              'Dokumentacja gotowa dla organu',
            ].map((t) => (
              <span
                key={t}
                className="text-[11px] md:text-xs uppercase tracking-[0.12em] text-ksc-ink/80 px-4 lg:border-r lg:border-ksc-ink/15 lg:last:border-r-0 first:pl-0 font-semibold"
              >
                {t}
              </span>
            ))}

          </div>
        </div>
      </section>

      {/* ────── ZEGAR USTAWOWY ────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ksc-accent mb-3">Zegar ustawowy</p>
            <h2 className="text-3xl md:text-4xl font-bold text-ksc-ink">Trzy daty, które wyznaczają Wasz harmonogram</h2>
          </div>
          <div className="grid md:grid-cols-3 border-t border-ksc-ink/15">
            {clock.map((c) => (
              <div
                key={c.date}
                className="py-8 md:pr-10 border-b border-ksc-ink/15 md:border-b-0 md:border-r md:last:border-r-0 md:pl-10 md:first:pl-0"
              >
                <div className="flex items-center gap-2 mb-3">
                  <CalendarClock className="h-4 w-4 text-ksc-accent" strokeWidth={1.5} />
                  <span className="text-2xl font-bold text-ksc-ink tabular-nums">{c.date}</span>
                </div>
                <h3 className="font-semibold text-ksc-ink mb-2">{c.title}</h3>
                <p className="text-sm text-ksc-ink/65 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── ZAKRES PAKIETU ────── */}
      <section id="zakres" className="py-16 md:py-24 bg-ksc-paper">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ksc-accent mb-3">Zakres pakietu</p>
            <h2 className="text-3xl md:text-4xl font-bold text-ksc-ink mb-3">Pięć elementów, które zamykają start zgodności</h2>
            <p className="text-ksc-ink/65">
              Każdy element kończy się artefaktem, który możecie pokazać organowi, audytorowi i zarządowi.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-x-14 border-t border-ksc-ink/15">
            {scope.map((s) => (
              <div key={s.num} className="py-8 border-b border-ksc-ink/15">
                <div className="flex items-start gap-5">
                  <span className="text-xs font-semibold tracking-[0.2em] text-ksc-accent pt-1 tabular-nums">{s.num}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <s.icon className="h-5 w-5 text-ksc-ink/70" strokeWidth={1.5} />
                      <h3 className="font-bold text-ksc-ink leading-snug">{s.title}</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {s.items.map((i) => (
                        <li key={i} className="flex gap-3 text-[15px] text-ksc-ink/75 leading-relaxed">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ksc-accent" aria-hidden="true" />
                          <span>{i}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── HARMONOGRAM ────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ksc-accent mb-3">Harmonogram</p>
            <h2 className="text-3xl md:text-4xl font-bold text-ksc-ink mb-3">10 dni roboczych, dzień po dniu</h2>
            <p className="text-ksc-ink/65">Wiecie z góry, co dzieje się każdego dnia i jaki dokument z tego zostaje.</p>
          </div>

          <div className="relative">
            {/* vertical spine */}
            <div
              className="absolute left-[15px] md:left-[23px] top-3 bottom-3 w-px bg-ksc-ink/15"
              aria-hidden="true"
            />

            <div className="space-y-0">
              {timeline.map((row, idx) => (
                <div key={row.day} className="relative pl-12 md:pl-20 pb-10 last:pb-0">
                  {/* day marker */}
                  <div className="absolute left-0 md:left-1 top-0 flex flex-col items-center">
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-ksc-ink/20 bg-white flex items-center justify-center z-10">
                      <span className="text-[10px] md:text-xs font-bold text-ksc-ink tabular-nums">
                        {row.day.replace(/[^0-9]/g, '').slice(0, 2)}
                      </span>
                    </div>
                    {idx !== timeline.length - 1 && (
                      <div className="h-full w-px bg-ksc-ink/10" aria-hidden="true" />
                    )}
                  </div>

                  {/* card */}
                  <div className="border border-ksc-ink/10 rounded-sm bg-ksc-paper/40 p-5 md:p-6 hover:border-ksc-accent/30 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-8">
                      <div className="flex-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ksc-accent mb-2">
                          Dzień {row.day}
                        </p>
                        <p className="text-lg md:text-xl font-bold text-ksc-ink leading-snug">
                          {row.action}
                        </p>
                      </div>
                      <div className="md:w-64 md:text-right md:border-l md:border-ksc-ink/10 md:pl-6">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ksc-ink/40 mb-1">
                          Artefakt
                        </p>
                        <p className="text-sm text-ksc-ink/70">{row.artifact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────── CENA ────── */}
      <section id="cena" className="py-16 md:py-24 bg-ksc-ink">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[0.7fr_1.3fr] gap-10 md:gap-16 items-start">
            <div className="md:border-r md:border-ksc-paper/20 md:pr-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ksc-accent mb-4">Rozliczenie</p>
              <p className="text-6xl md:text-7xl font-bold text-white leading-none mb-3 tabular-nums">0 zł</p>
              <p className="text-ksc-paper/60 text-sm">
                wartość pakietu: <span className="text-white font-semibold">5 000 zł netto</span>
              </p>
            </div>
            <div className="space-y-5">
              <p className="text-lg text-ksc-paper/85 leading-relaxed">
                Pakiet realizujemy bezpłatnie, jeśli po zakończeniu 14-dniowego dostępu decydujecie się na platformę Quantifier. Jeśli nie — rozliczamy go jednorazową fakturą na 5 000 zł netto, bez żadnych dodatkowych kosztów.
              </p>
              <p className="text-sm text-ksc-paper/55 leading-relaxed">
                Wypracowane dokumenty, protokół samoidentyfikacji, potwierdzenie wpisu, rejestr aktywów i certyfikaty szkoleniowe zostają u Was w obu przypadkach.
              </p>
              <Button asChild size="lg" className="rounded-sm bg-white text-ksc-ink hover:bg-ksc-paper font-semibold">
                <a href="#zgloszenie-final">
                  Zgłaszam firmę do pakietu
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ────── DLA KOGO ────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ksc-accent mb-3">Dla kogo</p>
            <h2 className="text-3xl md:text-4xl font-bold text-ksc-ink">Kto powinien zacząć teraz</h2>
          </div>
          <div className="grid md:grid-cols-3 border-t border-ksc-ink/15">
            {audience.map((a) => (
              <div
                key={a.title}
                className="py-8 border-b border-ksc-ink/15 md:border-b-0 md:border-r md:last:border-r-0 md:pr-10 md:pl-10 md:first:pl-0"
              >
                <a.icon className="h-6 w-6 text-ksc-accent mb-4" strokeWidth={1.5} />
                <h3 className="font-bold text-ksc-ink mb-2">{a.title}</h3>
                <p className="text-sm text-ksc-ink/65 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── FAQ ────── */}
      <FAQSection title="Najczęstsze pytania o pakiet KSC START" faqs={faqs} pageUrl={CANONICAL} variant="legal" />

      {/* ────── CTA KOŃCOWE ────── */}
      <section className="py-16 md:py-24 bg-ksc-ink">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 border-y border-ksc-paper/20 py-3 mb-6">
                <Clock className="h-4 w-4 text-ksc-accent" strokeWidth={1.5} />
                <span className="text-sm text-ksc-paper/75">
                  Zostało <span className="text-white font-semibold tabular-nums">{days}</span> dni do 3.10.2026
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                Zacznijcie od pierwszego dnia, nie od kolejnej analizy
              </h2>
              <p className="text-ksc-paper/70 mb-6 leading-relaxed">
                Zgłoście firmę — w 1 dzień roboczy potwierdzimy termin startu i prześlemy listę danych potrzebnych do wniosku w systemie S46.
              </p>
              <div className="flex items-center gap-3 text-sm text-ksc-paper/55">
                <Rocket className="h-4 w-4 text-ksc-accent" strokeWidth={1.5} />
                Start pakietu możliwy w ciągu tygodnia od zgłoszenia.
              </div>
            </div>
            <KscStartForm id="zgloszenie-final" />
          </div>

          <p className="max-w-5xl mx-auto text-xs text-ksc-paper/40 mt-12 pt-8 border-t border-ksc-paper/15 leading-relaxed">
            Decyzja o klasyfikacji podmiotu jako kluczowy lub ważny należy do kierownika podmiotu. Quantifier dostarcza metodykę, analizę i dokumentację wspierającą tę decyzję oraz asystę techniczną przy złożeniu wniosku — nie zastępuje oświadczenia woli podmiotu ani nie świadczy pomocy prawnej. Oferta ważna 14 dni od daty wystawienia.
          </p>
        </div>
      </section>
    </>
  );
};


export default KscStart;
