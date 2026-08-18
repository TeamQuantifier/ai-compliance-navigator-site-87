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

      {/* ────── HERO ────── */}
      <section className="relative overflow-hidden bg-slate-950 pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.25),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--secondary)/0.18),transparent_55%)]" />
        <div className="container relative mx-auto px-4">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-start">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-red-400/30 bg-red-500/10 px-5 py-2.5 mb-6">
                <AlertTriangle className="h-5 w-5 text-red-300" />
                <span className="text-base md:text-lg font-semibold text-red-200">
                  Wniosek do wykazu KSC: <span className="text-red-100">3 października 2026 r.</span> — zostało <span className="font-bold text-white">{days} dni</span>
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-[1.08] tracking-tight text-white mb-5">
                Start NIS2 / KSC{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  w dwa tygodnie
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/75 max-w-2xl leading-relaxed mb-4">
                Pakiet startowy zgodności z dyrektywą NIS2 i Krajowym Systemem Cyberbezpieczeństwa: szkolenie, wpis do wykazu KSC, rejestr aktywów i dostęp do platformy — w 10 dni roboczych.
              </p>
              <p className="text-base text-white/55 max-w-2xl mb-8">
                Nie zostawiamy Was z listą rekomendacji. Wychodzicie z protokołem samoidentyfikacji, potwierdzeniem wpisu, rejestrem aktywów i roadmapą do 3.04.2027.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {['10 dni roboczych', 'Wniosek w systemie S46', 'Rejestr aktywów w platformie', 'Raport gotowości'].map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/75"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    {chip}
                  </span>
                ))}
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5 max-w-2xl">
                <p className="text-sm text-white/70">
                  <strong className="text-white">Sankcje:</strong> podmiot kluczowy — do 10 mln EUR lub 2% światowego obrotu; podmiot ważny — do 7 mln EUR lub 1,4% (min. 15 000 zł). Kierownik podmiotu odpowiada osobiście — kara do 300% wynagrodzenia.
                </p>
              </div>
            </div>

            <div className="lg:pt-2">
              <KscStartForm id="zgloszenie" />
            </div>
          </div>
        </div>
      </section>

      {/* ────── ZEGAR USTAWOWY ────── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Zegar ustawowy</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Trzy daty, które wyznaczają Wasz harmonogram</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {clock.map((c) => (
              <div key={c.date} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <CalendarClock className="h-5 w-5 text-primary" />
                  <span className="text-xl font-bold text-slate-900">{c.date}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{c.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── ZAKRES PAKIETU ────── */}
      <section id="zakres" className="py-14 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Zakres pakietu</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Pięć elementów, które zamykają start zgodności</h2>
            <p className="text-slate-600">
              Każdy element kończy się artefaktem, który możecie pokazać organowi, audytorowi i zarządowi.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scope.map((s) => (
              <div key={s.num} className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-2xl font-bold text-slate-100">{s.num}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-3">{s.title}</h3>
                <ul className="space-y-2">
                  {s.items.map((i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── HARMONOGRAM ────── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Harmonogram</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">10 dni roboczych, dzień po dniu</h2>
            <p className="text-slate-600">Wiecie z góry, co dzieje się każdego dnia i jaki dokument z tego zostaje.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-5 py-4 font-semibold">Dzień</th>
                  <th className="px-5 py-4 font-semibold">Działanie</th>
                  <th className="px-5 py-4 font-semibold">Artefakt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {timeline.map((row) => (
                  <tr key={row.day} className="bg-white">
                    <td className="px-5 py-4 font-bold text-primary whitespace-nowrap">{row.day}</td>
                    <td className="px-5 py-4 text-slate-700">{row.action}</td>
                    <td className="px-5 py-4 text-slate-600">{row.artifact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ────── CENA ────── */}
      <section id="cena" className="py-14 md:py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[0.8fr_1.2fr] gap-8 items-center rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
            <div>
              <p className="text-6xl md:text-7xl font-bold text-white leading-none mb-3">0 zł</p>
              <p className="text-white/60 text-sm">
                wartość pakietu: <span className="text-white font-semibold">5 000 zł netto</span>
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-lg text-white/80 leading-relaxed">
                Pakiet realizujemy bezpłatnie, jeśli po zakończeniu 14-dniowego dostępu decydujecie się na platformę Quantifier. Jeśli nie — rozliczamy go jednorazową fakturą na 5 000 zł netto, bez żadnych dodatkowych kosztów.
              </p>
              <p className="text-sm text-white/60">
                Wypracowane dokumenty, protokół samoidentyfikacji, potwierdzenie wpisu, rejestr aktywów i certyfikaty szkoleniowe zostają u Was w obu przypadkach.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
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
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Dla kogo</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Kto powinien zacząć teraz</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {audience.map((a) => (
              <div key={a.title} className="rounded-2xl border border-slate-200 p-6 hover:border-primary/40 transition-colors">
                <a.icon className="h-6 w-6 text-primary mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">{a.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5 hover:text-primary/80">
              <Link to="/pl/frameworks/nis-2/">
                Zobacz pełne wymagania NIS2 / KSC
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900">
              <Link to="/pl/sprawdz-cyberbezpieczenstwo/">Sprawdź gotowość w 5 minut</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ────── FAQ ────── */}
      <FAQSection title="Najczęstsze pytania o pakiet KSC START" faqs={faqs} pageUrl={CANONICAL} />

      {/* ────── CTA KOŃCOWE ────── */}
      <section className="py-16 md:py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 mb-5">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm text-white/75">Zostało {days} dni do 3.10.2026</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Zacznijcie od pierwszego dnia, nie od kolejnej analizy
              </h2>
              <p className="text-white/70 mb-6">
                Zgłoście firmę — w 1 dzień roboczy potwierdzimy termin startu i prześlemy listę danych potrzebnych do wniosku w systemie S46.
              </p>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Rocket className="h-4 w-4 text-primary" />
                Start pakietu możliwy w ciągu tygodnia od zgłoszenia.
              </div>
            </div>
            <KscStartForm id="zgloszenie-final" />
          </div>

          <p className="max-w-5xl mx-auto text-xs text-white/40 mt-10 leading-relaxed">
            Decyzja o klasyfikacji podmiotu jako kluczowy lub ważny należy do kierownika podmiotu. Quantifier dostarcza metodykę, analizę i dokumentację wspierającą tę decyzję oraz asystę techniczną przy złożeniu wniosku — nie zastępuje oświadczenia woli podmiotu ani nie świadczy pomocy prawnej. Oferta ważna 14 dni od daty wystawienia.
          </p>
        </div>
      </section>
    </>
  );
};

export default KscStart;
