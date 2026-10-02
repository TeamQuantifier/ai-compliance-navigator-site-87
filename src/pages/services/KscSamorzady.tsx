import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import {
  ArrowRight, Award, BookOpen, Building, Building2, CheckCircle2, ClipboardCheck, Download, FileText,
  FolderCheck, Landmark, Layers3, Network, Scale, ShieldCheck, Sparkles, Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import FAQSection from '@/components/seo/FAQSection';

const CANONICAL = 'https://quantifier.ai/pl/ksc-dla-samorzadow/';
const TITLE = 'SZBI dla urzędu: audyt KRI i KSC po grancie | Quantifier';
const DESC =
  'Utrzymanie SZBI po Cyberbezpiecznym Samorządzie: coroczny audyt KRI, obowiązki KSC i dowody dla kontroli. Zapytanie ofertowe, gotowy OPZ, realizacja zdalna.';

type OfficeType = 'maly' | 'kluczowy' | 'lcc';

const TYPES: { id: OfficeType; icon: typeof Building; title: string; desc: string; pkg: string; items: string[] }[] = [
  {
    id: 'maly', icon: Building, title: 'Urząd gminy do 50 etatów',
    desc: 'Podmiot ważny — uproszczony SZBI.', pkg: 'Zakres dla gminy',
    items: ['Dokumentacja SZBI i analiza ryzyka', 'Coroczny audyt KRI', 'Szkolenie kierownika (art. 8e)', 'Raport roczny dla kierownika'],
  },
  {
    id: 'kluczowy', icon: Landmark, title: 'Urząd kluczowy',
    desc: 'Gmina od 50 etatów, starostwo, miasto na prawach powiatu, urząd marszałkowski — audyt do 3.04.2028.',
    pkg: 'Zakres dla urzędu kluczowego',
    items: ['Pełny zakres dla gminy', 'Przygotowanie do audytu KSC 2028', 'Rejestry aktywów, incydentów, dostawców', 'Mapowanie KRI–ISO–KSC–RODO'],
  },
  {
    id: 'lcc', icon: Network, title: 'Lider partnerstwa LCC',
    desc: 'Jedna platforma dla całego partnerstwa i jednostek podległych.', pkg: 'Zakres dla partnerstwa',
    items: ['Osobny SZBI dla każdego urzędu', 'Widok lidera: stan wszystkich jednostek', 'Wspólne szkolenia i harmonogram audytów', 'Raport zbiorczy'],
  },
];

const TIMELINE = [
  { date: '2026-09-30', label: '30.09.2026', text: 'Koniec realizacji grantów Cyberbezpieczny Samorząd' },
  { date: '2026-10-30', label: '30.10.2026', text: 'Koniec naboru LCC' },
  { date: '2026-11-15', label: '15.11.2026', text: 'Projekt budżetu na 2027 r.' },
  { date: '2027-04-03', label: '3.04.2027', text: 'Termin na wdrożenie SZBI' },
  { date: '2028-04-03', label: '3.04.2028', text: 'Pierwszy audyt urzędów kluczowych' },
];

const DELIVERABLES = [
  'Aktualna dokumentacja SZBI', 'Analiza ryzyka', 'Rejestry aktywów, incydentów i dostawców',
  'Harmonogram audytów KRI', 'Raport roczny dla kierownika urzędu', 'Szkolenie z art. 8e ustawy o KSC',
  'Mapowanie KRI–ISO 27001–KSC–RODO w jednym raporcie',
];

const COOPERATION = [
  {
    icon: Scale,
    title: 'Doradztwo',
    description: 'Audytorzy, prawnicy i eksperci prowadzą urząd od analizy luk przez SZBI i audyt KRI po przygotowanie dowodów.',
    points: ['Interpretacja wymagań KRI i KSC', 'Audyt, dokumentacja i szkolenia', 'Wsparcie przed kontrolą'],
  },
  {
    icon: Layers3,
    title: 'Platforma',
    description: 'Zespół urzędu pracuje na jednym, stale aktualnym systemie zamiast w rozproszonych plikach i segregatorach.',
    points: ['Rejestry, zadania i właściciele', 'Repozytorium dowodów', 'Raportowanie stanu SZBI'],
  },
  {
    icon: Sparkles,
    title: 'Doradztwo + platforma',
    description: 'Eksperci odpowiadają za metodykę i jakość, a platforma utrzymuje ciągłość pracy między audytami.',
    points: ['Jeden zespół i jedno środowisko', 'Stałe utrzymanie zgodności', 'Gotowość audytowa przez cały rok'],
  },
];

const RECOGNITION = [
  { title: '3 certyfikaty TÜV NORD', description: 'Niezależne potwierdzenie kompetencji i jakości naszych rozwiązań.' },
  { title: 'ISO 27001', description: 'Pracujemy w oparciu o uznany międzynarodowy standard bezpieczeństwa informacji.' },
  { title: 'NCC-PL i Ministerstwo Cyfryzacji', description: 'Obecność w krajowej społeczności kompetencji cyberbezpieczeństwa.' },
  { title: 'OT Cyber Challenge', description: 'Praktyczne zaangażowanie w rozwój kompetencji cyberbezpieczeństwa.' },
  { title: 'ATLAS', description: 'Jesteśmy częścią ekosystemu łączącego wiedzę, technologię i odporność organizacji.' },
];

const JST = [
  'Urząd Miasta Gliwice', 'Urząd Miasta Krakowa', 'Urząd m.st. Warszawy', 'Urząd Miejski Wrocławia',
  'Urząd Miasta Poznania', 'Urząd Miasta Gdańska', 'Urząd Miasta Katowice', 'Urząd Miasta Łodzi',
  'Starostwo Powiatowe', 'Urząd Gminy', 'Urząd Marszałkowski Województwa Śląskiego',
  'Urząd Marszałkowski Województwa Mazowieckiego',
];

const faqs = [
  { question: 'Czy gmina podlega KSC?', answer: 'Tak. Nowelizacja ustawy o krajowym systemie cyberbezpieczeństwa obejmuje jednostki samorządu terytorialnego. Urzędy do 50 etatów są zwykle podmiotami ważnymi (uproszczony SZBI), większe urzędy, starostwa, miasta na prawach powiatu i urzędy marszałkowskie — podmiotami kluczowymi.' },
  { question: 'Czym audyt KRI różni się od audytu KSC?', answer: 'Audyt z § 19 rozporządzenia KRI urząd przeprowadza co najmniej raz w roku we własnym zakresie. Audyt KSC dotyczy podmiotów kluczowych, jest wykonywany przez uprawnionego audytora, a pierwszy przypada do 3.04.2028 r. Jeden SZBI może pokrywać oba wymagania.' },
  { question: 'Co po Cyberbezpiecznym Samorządzie?', answer: 'Grant się skończył, obowiązki zostały: dwuletnia trwałość projektu, coroczny audyt KRI i wymagania KSC. Utrzymanie SZBI oznacza aktualizację dokumentacji, rejestrów, analizy ryzyka i dowodów — nie jednorazowe wdrożenie.' },
  { question: 'Jak sprawnie przygotować zakup?', answer: 'Pomagamy precyzyjnie określić zakres i udostępniamy neutralny wzór opisu przedmiotu zamówienia. Tryb zakupu urząd dobiera zgodnie ze swoim regulaminem i obowiązującymi przepisami.' },
  { question: 'Kto w urzędzie odpowiada za SZBI?', answer: 'Kierownik urzędu (wójt, burmistrz, prezydent, starosta, marszałek). Zadania można delegować, ale odpowiedzialność pozostaje osobista — stąd znaczenie dowodów i raportu rocznego.' },
];

const daysTo = (iso: string) => Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);

/* ---------- formularz ---------- */
const LeadForm = ({ officeType, setOfficeType }: { officeType: OfficeType | ''; setOfficeType: (t: OfficeType) => void }) => {
  const { toast } = useToast();
  const [office, setOffice] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [grant, setGrant] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const input = 'w-full px-4 py-3 rounded-md bg-background border border-input text-foreground text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-ring';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const em = email.trim().toLowerCase();
    if (!office.trim() || !role.trim() || !grant || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      toast({ title: 'Uzupełnij wszystkie pola poprawnie', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('contact-form', {
        body: {
          firstName: role.trim(), lastName: '—', email: em, company: office.trim(),
          message: [
            '[JST] Bezpłatny przegląd: co zostało po grancie',
            `Urząd: ${office.trim()}`, `Rola: ${role.trim()}`,
            officeType ? `Typ urzędu: ${TYPES.find((t) => t.id === officeType)?.title}` : null,
            `Grant CS: ${grant}`,
          ].filter(Boolean).join('\n'),
          language: 'pl',
          sourceUrl: window.location.href,
        },
      });
      if (error) throw error;
      setSent(true);
    } catch {
      toast({ title: 'Nie udało się wysłać', description: 'Spróbuj ponownie lub napisz na contact@quantifier.ai.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  if (sent)
    return (
      <div role="status" className="text-center py-10">
        <CheckCircle2 className="h-10 w-10 mx-auto text-primary mb-3" aria-hidden />
        <h3 className="text-xl font-semibold">Dziękujemy, zgłoszenie przyjęte</h3>
        <p className="text-muted-foreground mt-2">Skontaktujemy się w ciągu 1 dnia roboczego, aby ustalić termin przeglądu. Wyślemy też wzór OPZ i uzasadnienie wydatku.</p>
      </div>
    );

  return (
    <form onSubmit={submit} className="space-y-4" aria-describedby="form-desc">
      <p id="form-desc" className="text-sm text-muted-foreground">Cztery pola. Wszystkie są wymagane.</p>
      <div>
        <label htmlFor="jst-office" className="block text-sm font-medium mb-1">Nazwa urzędu</label>
        <input id="jst-office" list="jst-list" className={input} value={office} onChange={(e) => setOffice(e.target.value)} maxLength={150} required autoComplete="organization" />
        <datalist id="jst-list">{JST.map((j) => <option key={j} value={j} />)}</datalist>
      </div>
      <div>
        <label htmlFor="jst-role" className="block text-sm font-medium mb-1">Rola w urzędzie</label>
        <select id="jst-role" className={input} value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Wybierz</option>
          <option>Sekretarz</option><option>Kierownik urzędu</option><option>Informatyk / kierownik IT</option>
          <option>Inspektor ochrony danych</option><option>Pełnomocnik ds. cyberbezpieczeństwa</option><option>Inna</option>
        </select>
      </div>
      <div>
        <label htmlFor="jst-email" className="block text-sm font-medium mb-1">E-mail służbowy</label>
        <input id="jst-email" type="email" className={input} value={email} onChange={(e) => setEmail(e.target.value)} maxLength={200} required autoComplete="email" />
      </div>
      <fieldset>
        <legend className="block text-sm font-medium mb-2">Czy realizowaliście grant Cyberbezpieczny Samorząd?</legend>
        <div className="flex gap-6">
          {['Tak', 'Nie', 'W trakcie'].map((v) => (
            <label key={v} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="grant" value={v} checked={grant === v} onChange={() => setGrant(v)} className="h-4 w-4 accent-primary" required />
              {v}
            </label>
          ))}
        </div>
      </fieldset>
      {officeType === '' && (
        <p className="text-sm text-muted-foreground">
          Typ urzędu:{' '}
          {TYPES.map((t) => (
            <button key={t.id} type="button" onClick={() => setOfficeType(t.id)} className="underline mr-3 hover:text-foreground">{t.title}</button>
          ))}
        </p>
      )}
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? 'Wysyłanie…' : 'Umów bezpłatny przegląd (30 min)'}
      </Button>
      <p className="text-xs text-muted-foreground">Administratorem danych jest Quantifier. Dane wykorzystamy wyłącznie do kontaktu w sprawie przeglądu.</p>
    </form>
  );
};

/* ---------- teczka dowodowa (mockup) ---------- */
const EvidenceFolder = () => {
  const rows = [
    { name: 'Analiza ryzyka 2026', ref: 'KRI § 20 ust. 2 pkt 3 · KSC art. 8', ok: true },
    { name: 'Rejestr incydentów', ref: 'KSC art. 11 · RODO art. 33', ok: true },
    { name: 'Szkolenie kierownika', ref: 'KSC art. 8e', ok: true },
    { name: 'Audyt KRI 2026', ref: 'KRI § 19', ok: false },
  ];
  return (
    <figure className="rounded-lg border bg-card shadow-sm overflow-hidden" aria-label="Przykład teczki dowodowej w systemie">
      <div className="flex items-center gap-2 border-b px-4 py-3 bg-muted">
        <FolderCheck className="h-5 w-5 text-primary" aria-hidden />
        <span className="font-semibold">Teczka dowodowa — Urząd Gminy (przykład)</span>
      </div>
      <ul>
        {rows.map((r) => (
          <li key={r.name} className="flex items-center justify-between gap-4 px-4 py-3 border-b last:border-0">
            <div>
              <p className="font-medium">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.ref}</p>
            </div>
            <span className={`text-xs font-semibold px-2 py-1 rounded ${r.ok ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'}`}>
              {r.ok ? 'Dowód kompletny' : 'Zaplanowany: XI 2026'}
            </span>
          </li>
        ))}
      </ul>
      <figcaption className="px-4 py-3 text-xs text-muted-foreground bg-muted">Gotowość do kontroli: 3 z 4 obszarów udokumentowane</figcaption>
    </figure>
  );
};

/* ---------- strona ---------- */
const KscSamorzady = () => {
  const [params] = useSearchParams();
  const [officeType, setOfficeType] = useState<OfficeType | ''>('');
  const abmOffice = params.get('urzad')?.slice(0, 120);
  const abmUnits = params.get('jednostki')?.replace(/\D/g, '').slice(0, 4);

  const h1 = abmOffice
    ? `${abmOffice}: utrzymanie SZBI${abmUnits ? ` dla ${abmUnits} jednostek` : ''}`
    : 'SZBI w urzędzie po Cyberbezpiecznym Samorządzie: KRI i KSC w jednym systemie';

  const breadcrumbs = useMemo(() => ({
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Quantifier.ai', item: 'https://quantifier.ai/pl/' },
      { '@type': 'ListItem', position: 2, name: 'KSC dla samorządów', item: CANONICAL },
    ],
  }), []);

  const toForm = () => document.getElementById('przeglad')?.scrollIntoView({ behavior: 'smooth' });
  const pickType = (t: OfficeType) => {
    setOfficeType(t);
    document.getElementById('zakresy')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet htmlAttributes={{ lang: 'pl' }}>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={CANONICAL} />
        <link rel="alternate" hrefLang="pl-PL" href={CANONICAL} />
        <link rel="alternate" hrefLang="x-default" href={CANONICAL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
      </Helmet>

      <main className="bg-background text-foreground">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-foreground text-background" aria-labelledby="hero-h1">
          <div className="absolute inset-x-0 top-0 h-1 bg-primary" aria-hidden />
          <div className="container relative mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-[1.15fr_.85fr] gap-12 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">Dla urzędów i jednostek samorządu terytorialnego</p>
              <h1 id="hero-h1" className="text-3xl md:text-5xl font-bold leading-tight mb-6">{h1}</h1>
              <p className="text-lg text-background/80 mb-8 max-w-2xl">
                Audytorzy, prawnicy i eksperci pomagają utrzymać SZBI po grancie. Doradztwo, platforma albo oba modele razem — zależnie od potrzeb urzędu.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" onClick={toForm}>Bezpłatny przegląd: co zostało po grancie (30 min) <ArrowRight className="ml-2 h-4 w-4" aria-hidden /></Button>
                <Button size="lg" variant="outline" onClick={toForm} className="border-background/40 bg-transparent text-background hover:bg-background hover:text-foreground">
                  <Download className="mr-2 h-4 w-4" aria-hidden /> Pobierz uzasadnienie wydatku do budżetu 2027
                </Button>
              </div>
            </div>
            <ul className="grid gap-3">
              {[
                { icon: ClipboardCheck, t: 'Ciągłość', d: 'Grant się skończył, obowiązki zostały: dwuletnia trwałość, coroczny audyt KRI i wymagania KSC.' },
                { icon: FolderCheck, t: 'Dowody', d: 'Kierownik urzędu odpowiada osobiście — potrzebuje dowodów, a nie segregatora.' },
                { icon: FileText, t: 'Prosty zakup', d: 'Gotowy, neutralny opis przedmiotu zamówienia i jasno określony zakres.' },
              ].map(({ icon: I, t, d }) => (
                <li key={t} className="group flex gap-4 rounded-lg border border-background/20 bg-background/5 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-background/10">
                  <I className="h-6 w-6 text-primary shrink-0" aria-hidden />
                  <div><p className="font-semibold text-background">{t}</p><p className="text-sm text-background/70">{d}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Typ urzędu */}
        <section className="container mx-auto px-4 py-16" aria-labelledby="typ-h2">
          <h2 id="typ-h2" className="text-2xl md:text-3xl font-bold mb-2">Jaki to urząd?</h2>
          <p className="text-muted-foreground mb-8">Wybierz typ, aby zobaczyć zakres i pakiet dla Państwa urzędu.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {TYPES.map(({ id, icon: I, title, desc }) => (
              <button key={id} type="button" onClick={() => pickType(id)} aria-pressed={officeType === id}
                className={`group text-left rounded-lg border p-6 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${officeType === id ? 'border-primary bg-primary/5 shadow-lg -translate-y-1' : 'bg-card hover:-translate-y-1 hover:border-primary/50 hover:shadow-md'}`}>
                <I className="h-7 w-7 text-primary mb-3" aria-hidden />
                <h3 className="font-semibold text-lg mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">Zobacz zakres <ArrowRight className="ml-1 h-4 w-4" aria-hidden /></span>
              </button>
            ))}
          </div>
        </section>

        {/* Problem */}
        <section className="bg-muted/40 border-y" aria-labelledby="problem-h2">
          <div className="container mx-auto px-4 py-16">
            <h2 id="problem-h2" className="text-2xl md:text-3xl font-bold mb-8">Trzy obowiązki, które zostały po grancie</h2>
            <ol className="grid md:grid-cols-3 gap-6">
              {[
                { t: 'Trwałość projektu CS — 2 lata', d: 'Wdrożone rozwiązania trzeba utrzymać i udokumentować przez cały okres trwałości.' },
                { t: 'Coroczny audyt — § 19 KRI', d: 'Audyt bezpieczeństwa informacji co najmniej raz w roku.' },
                { t: 'KSC', d: 'Osobista odpowiedzialność kierownika, zgłaszanie incydentów w 24 h, coroczne szkolenie kierownika.' },
              ].map((p, i) => (
                <li key={p.t} className="rounded-lg border bg-card p-6">
                  <span className="text-3xl font-bold text-primary" aria-hidden>{i + 1}</span>
                  <h3 className="font-semibold text-lg mt-2 mb-1">{p.t}</h3>
                  <p className="text-sm text-muted-foreground">{p.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Oś czasu */}
        <section className="container mx-auto px-4 py-16" aria-labelledby="czas-h2">
          <h2 id="czas-h2" className="text-2xl md:text-3xl font-bold mb-8">Terminy</h2>
          <ol className="relative grid md:grid-cols-5 gap-6 md:gap-4">
            {TIMELINE.map((e) => {
              const d = daysTo(e.date);
              const past = d < 0;
              return (
                <li key={e.date} className={`rounded-lg border p-5 ${past ? 'bg-muted text-muted-foreground' : 'bg-card'}`}>
                  <time dateTime={e.date} className="block text-xl font-bold text-foreground">{e.label}</time>
                  <p className="text-sm mt-2">{e.text}</p>
                  <p className={`text-xs font-semibold mt-3 ${past ? '' : 'text-primary'}`}>{past ? 'Termin minął' : `Za ${d} dni`}</p>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Model współpracy */}
        <section className="bg-foreground text-background border-y" aria-labelledby="wspolpraca-h2">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Elastyczny model współpracy</p>
            <h2 id="wspolpraca-h2" className="text-2xl md:text-4xl font-bold mb-3">Doradztwo, platforma lub oba rozwiązania razem</h2>
            <p className="text-background/70 max-w-3xl mb-10">Nie narzucamy jednego modelu. Uzupełniamy kompetencje urzędu tam, gdzie są potrzebne, i porządkujemy pracę w jednym systemie.</p>
            <div className="grid md:grid-cols-3 gap-5">
              {COOPERATION.map(({ icon: Icon, title, description, points }) => (
                <article key={title} className="group border border-background/20 bg-background/5 p-6 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:bg-background/10">
                  <Icon className="h-8 w-8 text-primary mb-5 transition-transform duration-300 group-hover:scale-110" aria-hidden />
                  <h3 className="text-xl font-bold text-background mb-2">{title}</h3>
                  <p className="text-sm text-background/70 mb-5">{description}</p>
                  <ul className="space-y-2 text-sm">
                    {points.map((point) => <li key={point} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden />{point}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Co dostajecie */}
        <section className="bg-muted/40 border-y" aria-labelledby="zakres-h2">
          <div className="container mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 id="zakres-h2" className="text-2xl md:text-3xl font-bold mb-6">Przedmiot zamówienia</h2>
              <ul className="space-y-3">
                {DELIVERABLES.map((d) => (
                  <li key={d} className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />{d}</li>
                ))}
              </ul>
            </div>
            <EvidenceFolder />
          </div>
        </section>

        {/* Jak kupić */}
        <section className="container mx-auto px-4 py-16" aria-labelledby="zakup-h2">
          <h2 id="zakup-h2" className="text-2xl md:text-3xl font-bold mb-2">Jak kupić</h2>
          <p className="text-muted-foreground mb-8">Przejrzysty zakres, neutralny OPZ i sprawny proces dopasowany do zasad zakupowych urzędu.</p>
          <ol className="grid md:grid-cols-4 gap-4 mb-10">
            {['Bezpłatny przegląd (30 min)', 'Zapytanie ofertowe urzędu', 'Umowa i umowa powierzenia', 'Realizacja zdalna'].map((s, i) => (
              <li key={s} className="rounded-lg border bg-card p-5">
                <span className="text-sm font-semibold text-primary">Krok {i + 1}</span>
                <p className="font-semibold mt-1">{s}</p>
              </li>
            ))}
          </ol>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { t: 'Wzór opisu przedmiotu zamówienia (OPZ)', d: 'Neutralny — bez warunków dopasowanych pod jednego wykonawcę.' },
              { t: 'Lista kwalifikacji wykonawcy', d: 'Referencje, certyfikaty i CV audytorów, o które urzędy pytają w zapytaniach.' },
            ].map((f) => (
              <div key={f.t} className="flex items-start gap-4 rounded-lg border p-5">
                <FileText className="h-6 w-6 text-primary shrink-0" aria-hidden />
                <div className="flex-1">
                  <h3 className="font-semibold">{f.t}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{f.d}</p>
                  <Button variant="outline" size="sm" onClick={toForm} className="hover:text-foreground">Otrzymaj e-mailem</Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Zakresy */}
        <section id="zakresy" className="bg-muted/40 border-y scroll-mt-20" aria-labelledby="pakiety-h2">
          <div className="container mx-auto px-4 py-16">
            <h2 id="pakiety-h2" className="text-2xl md:text-3xl font-bold mb-2">Zakres dopasowany do urzędu</h2>
            <p className="text-muted-foreground mb-8">Zakres ustalamy po krótkim przeglądzie potrzeb, bez publikowania sztywnych cenników.</p>
            <div className="grid md:grid-cols-3 gap-4">
              {TYPES.map((t) => (
                <article key={t.id} className={`rounded-lg border p-6 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${officeType === t.id ? 'ring-2 ring-primary shadow-lg' : ''}`}>
                  <p className="text-sm text-muted-foreground">{t.title}</p>
                  <h3 className="text-xl font-bold mt-1">{t.pkg}</h3>
                  <ul className="mt-4 space-y-2 text-sm">
                    {t.items.map((i) => <li key={i} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden />{i}</li>)}
                  </ul>
                  <Button className="w-full mt-6" variant={officeType === t.id ? 'default' : 'outline'} onClick={() => { setOfficeType(t.id); toForm(); }}>Zapytaj o ofertę</Button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Kompetencje i publikacje */}
        <section className="container mx-auto px-4 py-16 md:py-20" aria-labelledby="kompetencje-h2">
          <div className="max-w-3xl mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Kompetencje potwierdzone w praktyce</p>
            <h2 id="kompetencje-h2" className="text-2xl md:text-4xl font-bold mb-3">Audytorzy, prawnicy i eksperci technologiczni w jednym zespole</h2>
            <p className="text-muted-foreground">Łączymy interpretację prawa, praktykę audytową i technologię. Dzięki temu rekomendacje można od razu przełożyć na zadania, dowody i raporty.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {RECOGNITION.map((item) => (
              <article key={item.title} className="group border-t-2 border-primary bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <Award className="h-6 w-6 text-primary mb-4" aria-hidden />
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 border-y py-8 mb-12">
            <img src="/lovable-uploads/edcfd427-dd46-414b-a937-7fcf86b91e04.png" alt="Certyfikat TÜV NORD" width={220} height={90} loading="lazy" className="h-14 w-auto object-contain grayscale opacity-80 transition-all hover:grayscale-0 hover:opacity-100" />
            <img src="/featured/ministerstwo-cyfryzacji.png" alt="Ministerstwo Cyfryzacji" width={220} height={70} loading="lazy" className="h-12 w-auto object-contain grayscale opacity-80 transition-all hover:grayscale-0 hover:opacity-100" />
            <img src="/featured/ncc-pl.png" alt="NCC-PL — Krajowe Centrum Kompetencji Cyberbezpieczeństwa" width={220} height={70} loading="lazy" className="h-12 w-auto object-contain grayscale opacity-80 transition-all hover:grayscale-0 hover:opacity-100" />
          </div>
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8 items-center">
            <div>
              <BookOpen className="h-8 w-8 text-primary mb-4" aria-hidden />
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Autorzy praktycznych książek o compliance</h2>
              <p className="text-muted-foreground">Nasz zespół jest autorem dwóch publikacji wydanych przez C.H. Beck: „Analiza podwójnej istotności” oraz „Nowa architektura compliance”. Wiedzę z projektów, audytów i regulacji przekładamy na metodykę pracy dla organizacji.</p>
            </div>
            <div className="flex items-end justify-center gap-5 min-h-[300px] bg-muted/40 p-6 rounded-lg">
              <img src="/lovable-uploads/book-analiza-podwojnej-istotnosci.png" alt="Książka Analiza podwójnej istotności" width={256} height={360} loading="lazy" className="w-[38%] max-w-[190px] h-auto object-contain drop-shadow-xl transition-transform duration-300 hover:-translate-y-2" />
              <img src="/images/nowa-architektura-compliance-okladka.png" alt="Książka Nowa architektura compliance" width={270} height={380} loading="lazy" className="w-[42%] max-w-[210px] h-auto object-contain drop-shadow-xl transition-transform duration-300 hover:-translate-y-2" />
            </div>
          </div>
        </section>

        {/* Zaufanie + LCC */}
        <section className="bg-muted/40 border-y">
          <div className="container mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12" aria-label="Zaufanie i partnerstwa">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Bezpieczna realizacja dla sektora publicznego</h2>
            <ul className="space-y-3">
              {['Hosting danych w Unii Europejskiej', 'Umowa powierzenia przetwarzania danych', 'Kwalifikacje i CV audytorów dostępne na potrzeby postępowania', 'Mapowanie KRI–ISO 27001–KSC–RODO w jednym raporcie'].map((t) => <li key={t} className="flex gap-3"><ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />{t}</li>)}
            </ul>
          </div>
          <div className="rounded-lg border bg-card p-8">
            <Users className="h-8 w-8 text-primary mb-3" aria-hidden />
            <h2 className="text-2xl font-bold mb-3">Dla liderów partnerstw LCC</h2>
            <p className="text-muted-foreground mb-4">Jedna platforma dla całego partnerstwa: każdy urząd prowadzi własny SZBI, a lider widzi stan wszystkich jednostek w jednym widoku.</p>
            <Button variant="outline" onClick={() => { setOfficeType('lcc'); toForm(); }} className="hover:text-foreground">
              <Building2 className="mr-2 h-4 w-4" aria-hidden /> Porozmawiajmy o partnerstwie
            </Button>
          </div>
          </div>
        </section>

        <FAQSection title="Najczęstsze pytania urzędów" faqs={faqs} pageUrl={CANONICAL} />

        {/* Formularz */}
        <section id="przeglad" className="bg-muted/40 border-t scroll-mt-20" aria-labelledby="form-h2">
          <div className="container mx-auto px-4 py-16 max-w-xl">
            <h2 id="form-h2" className="text-2xl md:text-3xl font-bold mb-2">Bezpłatny przegląd: co zostało po grancie</h2>
            <p className="text-muted-foreground mb-6">30 minut online. Wskażemy, co trzeba utrzymać, i prześlemy uzasadnienie wydatku do budżetu 2027 oraz wzór OPZ.</p>
            <div className="rounded-lg border bg-card p-6">
              <LeadForm officeType={officeType} setOfficeType={setOfficeType} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default KscSamorzady;
