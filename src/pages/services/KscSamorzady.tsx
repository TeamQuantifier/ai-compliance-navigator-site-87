import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import {
  Activity, ArrowRight, Award, BookOpen, Building, CheckCircle2, ChevronDown, ClipboardCheck, FileText,
  FolderCheck, Landmark, Layers3, Network, Scale, ShieldCheck, Sparkles,
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
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

const CERTIFICATES = [
  { eyebrow: 'System bezpieczeństwa', title: 'Zgodność z ISO/IEC 27001', description: 'System zarządzania bezpieczeństwem informacji prowadzony zgodnie z wymaganiami normy.', image: '/images/jst/tuv-nord-iso-27001.png', alt: 'Certyfikat TÜV NORD ISO 27001' },
  { eyebrow: 'Certyfikaty produktowe', title: '3 × Produkt Sprawdzony', description: 'Kontrola procesu i testy produktu potwierdzone przez TÜV NORD Polska.', image: '/images/jst/produkt-sprawdzony-3x.png', alt: 'Trzy certyfikaty TÜV NORD Produkt Sprawdzony' },
  { eyebrow: 'Ekosystem europejski', title: 'Społeczność Kompetentna', description: 'Wniosek złożony w NCC-PL przy Ministerstwie Cyfryzacji, z rejestracją danych w portalu ATLAS (UE i EOG).', image: '/images/jst/ncc-ministerstwo.png', alt: 'NCC-PL — Krajowe Centrum Kompetencji Cyberbezpieczeństwa i Ministerstwo Cyfryzacji' },
  { eyebrow: 'Wyróżnienie', title: 'Top AI Driven Companies', description: 'Quantifier.ai w zestawieniu firm budujących produkty w oparciu o AI.', image: '/featured/top-ai-driven-companies.png', alt: 'Top AI Driven Companies' },
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

/* ---------- teczka urzędu (interaktywny mockup) ---------- */
const PRIMARY = 'hsl(221 83% 53%)';

const AREA_READINESS = [
  { area: 'Dokumentacja', value: 92 },
  { area: 'Rejestry', value: 85 },
  { area: 'Szkolenia', value: 100 },
  { area: 'Audyt KRI', value: 60 },
  { area: 'Dostawcy', value: 74 },
];

const EVIDENCE_STATUS = [
  { name: 'Kompletne', value: 10 },
  { name: 'W toku', value: 2 },
];

const EvidenceFolder = () => {
  const [view, setView] = useState<'dashboard' | 'dowody' | 'zadania'>('dashboard');
  const rows = [
    { name: 'Analiza ryzyka 2026', ref: 'KRI § 20 ust. 2 pkt 3 · KSC art. 8', ok: true },
    { name: 'Rejestr incydentów', ref: 'KSC art. 11 · RODO art. 33', ok: true },
    { name: 'Szkolenie kierownika', ref: 'KSC art. 8e', ok: true },
    { name: 'Audyt KRI 2026', ref: 'KRI § 19', ok: false },
  ];
  return (
    <figure className="overflow-hidden rounded-lg border bg-card shadow-xl" aria-label="Przykład teczki Urzędu Gminy w systemie">
      <div className="flex items-center justify-between gap-4 border-b bg-foreground px-5 py-4 text-background">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary"><Landmark className="h-5 w-5" aria-hidden /></span>
          <div><span className="block font-semibold">Teczka Urzędu Gminy</span><span className="block text-xs text-background/60">SZBI · KRI · KSC</span></div>
        </div>
        <span className="flex items-center gap-2 text-xs text-background/70"><span className="h-2 w-2 rounded-full bg-primary" />Aktualizowana na żywo</span>
      </div>
      <div className="grid grid-cols-3 gap-px border-b bg-border">
        {[['78%', 'gotowość SZBI'], ['12', 'aktywnych dowodów'], ['3', 'zadania na ten miesiąc']].map(([value, label]) => (
          <div key={label} className="bg-card p-4"><strong className="block text-2xl text-primary">{value}</strong><span className="text-xs text-muted-foreground">{label}</span></div>
        ))}
      </div>
      <div className="flex flex-wrap border-b px-4 pt-3">
        {([['dashboard', 'Dashboard'], ['dowody', 'Dowody i rejestry'], ['zadania', 'Plan działań']] as const).map(([id, label]) => (
          <Button key={id} type="button" variant="ghost" size="sm" onClick={() => setView(id)} className={`rounded-none border-b-2 ${view === id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}>{label}</Button>
        ))}
      </div>
      {view === 'dashboard' && (
        <div className="space-y-5 p-5">
          <div>
            <p className="mb-2 text-sm font-semibold">Gotowość obszarów SZBI</p>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={AREA_READINESS} margin={{ top: 8, right: 4, bottom: 0, left: -18 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(214 32% 91%)" />
                  <XAxis dataKey="area" tick={{ fontSize: 10 }} interval={0} height={28} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} unit="%" />
                  <Tooltip formatter={(value: number) => [`${value}%`, 'Gotowość']} />
                  <Bar dataKey="value" barSize={24} radius={[4, 4, 0, 0]}>
                    {AREA_READINESS.map((entry) => (
                      <Cell key={entry.area} fill={entry.value >= 80 ? PRIMARY : entry.value >= 60 ? 'hsl(221 70% 66%)' : 'hsl(45 93% 47%)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-semibold">Status dowodów</p>
              <div className="h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={EVIDENCE_STATUS} dataKey="value" nameKey="name" innerRadius={30} outerRadius={50} cx="50%" cy="50%" isAnimationActive={false}>
                      <Cell fill={PRIMARY} />
                      <Cell fill="hsl(45 93% 47%)" />
                    </Pie>
                    <Legend layout="vertical" align="right" verticalAlign="middle" iconSize={9} wrapperStyle={{ fontSize: 11, paddingLeft: 4 }} />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-muted-foreground">10 dowodów kompletnych · 2 w toku</p>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold">Zgodność z wymaganiami</p>
              <ul className="space-y-3">
                {[
                  { label: 'KRI § 19 (audyt roczny)', pct: 78 },
                  { label: 'KSC art. 8e (szkolenia)', pct: 100 },
                  { label: 'KSC rejestry i zgłoszenia', pct: 85 },
                ].map((row) => (
                  <li key={row.label}>
                    <div className="mb-1 flex items-center justify-between text-xs"><span>{row.label}</span><span className="font-semibold text-primary">{row.pct}%</span></div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${row.pct}%` }} /></div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground"><Activity className="h-3.5 w-3.5 text-primary" aria-hidden /> Dane z ostatnich 30 dni</p>
            </div>
          </div>
        </div>
      )}
      {view === 'dowody' ? (
        <ul>{rows.map((r) => (
          <li key={r.name} className="flex items-center justify-between gap-4 border-b px-5 py-3 last:border-0">
            <div><p className="font-medium">{r.name}</p><p className="text-xs text-muted-foreground">{r.ref}</p></div>
            <span className={`whitespace-nowrap rounded px-2 py-1 text-xs font-semibold ${r.ok ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'}`}>{r.ok ? 'Kompletny' : 'Zaplanowany'}</span>
          </li>
        ))}</ul>
      ) : view === 'zadania' ? (
        <div className="space-y-3 p-5">
          {['Zatwierdzenie analizy ryzyka', 'Przegląd rejestru dostawców', 'Audyt wewnętrzny KRI'].map((task, index) => (
            <div key={task} className="flex items-center gap-3 rounded-md border p-3"><span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">{index + 1}</span><span className="text-sm font-medium">{task}</span></div>
          ))}
        </div>
      ) : null}
      <figcaption className="flex items-center justify-between bg-muted px-5 py-3 text-xs text-muted-foreground"><span>Stan udokumentowany w jednym miejscu</span><span className="flex items-center gap-1 text-primary"><Activity className="h-3.5 w-3.5" /> 78% gotowości</span></figcaption>
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
    : 'SZBI w urzędzie: KRI i KSC w jednym systemie';

  const breadcrumbs = useMemo(() => ({
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Quantifier.ai', item: 'https://quantifier.ai/pl/' },
      { '@type': 'ListItem', position: 2, name: 'KSC dla samorządów', item: CANONICAL },
    ],
  }), []);

  const toForm = () => document.getElementById('przeglad')?.scrollIntoView({ behavior: 'smooth' });
  const pickType = (t: OfficeType) => {
    setOfficeType(officeType === t ? '' : t);
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
          <div className="container relative mx-auto grid items-center gap-10 px-4 py-14 md:py-16 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">Dla urzędów i jednostek samorządu terytorialnego</p>
              <h1 id="hero-h1" className="text-3xl md:text-5xl font-bold leading-tight mb-6">{h1}</h1>
              <p className="text-lg text-background/80 mb-8 max-w-2xl">
                Pomożemy wdrożyć cyberbezpieczeństwo w Państwa urzędzie przy wsparciu doświadczonych prawników, ekspertów, audytorów i nowoczesnej technologii.
              </p>
              <Button size="lg" onClick={toForm}>Bezpłatny przegląd: co zostało po grancie <ArrowRight className="ml-2 h-4 w-4" aria-hidden /></Button>
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

        {/* Typ urzędu + zakres */}
        <section className="container mx-auto px-4 py-12" aria-labelledby="typ-h2">
          <h2 id="typ-h2" className="text-2xl md:text-3xl font-bold mb-2">Zakres dopasowany do Państwa urzędu</h2>
          <p className="text-muted-foreground mb-8">Proszę wybrać typ urzędu, aby rozwinąć właściwy zakres wsparcia.</p>
          <div className="grid gap-4 md:grid-cols-3 md:items-start">
            {TYPES.map(({ id, icon: I, title, desc, pkg, items }) => (
              <article key={id} className={`flex flex-col overflow-hidden rounded-lg border bg-card transition-all duration-300 ${officeType === id ? 'border-primary shadow-lg md:-translate-y-1' : 'hover:border-primary/50 hover:shadow-md'}`}>
                <button type="button" onClick={() => pickType(id)} aria-expanded={officeType === id} className="flex flex-1 flex-col items-start gap-3 p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-primary/10"><I className="h-6 w-6 text-primary" aria-hidden /></span>
                  <strong className="block text-lg leading-snug">{title}</strong>
                  <span className="block text-sm text-muted-foreground">{desc}</span>
                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {officeType === id ? 'Zwiń zakres' : 'Pokaż zakres'}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${officeType === id ? 'rotate-180' : ''}`} aria-hidden />
                  </span>
                </button>
                {officeType === id && (
                  <div className="border-t bg-muted/40 p-5">
                    <h3 className="font-bold">{pkg}</h3>
                    <ul className="mt-3 space-y-2">
                      {items.map((item) => <li key={item} className="flex gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{item}</li>)}
                    </ul>
                    <Button onClick={toForm} className="mt-5 w-full">Zapytaj o zakres <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Oś czasu */}
        <section className="container mx-auto px-4 py-12" aria-labelledby="czas-h2">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Droga do gotowego SZBI</p>
          <h2 id="czas-h2" className="text-2xl md:text-3xl font-bold mb-8">Najważniejsze daty, które wyznaczają plan działania urzędu</h2>
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
          <div className="container mx-auto px-4 py-12 md:py-16">
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
          <div className="container mx-auto grid items-start gap-10 px-4 py-12 lg:grid-cols-2">
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

        {/* Kompetencje i publikacje */}
        <section className="container mx-auto px-4 py-12 md:py-16" aria-labelledby="kompetencje-h2">
          <div className="max-w-3xl mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Kompetencje potwierdzone w praktyce</p>
            <h2 id="kompetencje-h2" className="text-2xl md:text-4xl font-bold mb-3">Quantifier to audytorzy, prawnicy i eksperci technologiczni w jednym zespole</h2>
            <p className="text-muted-foreground">Jesteśmy polskim podmiotem. Łączymy interpretację prawa, praktykę audytową i technologię, aby rekomendacje od razu przekładać na zadania, dowody i raporty.</p>
          </div>
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8 items-center">
            <div>
              <BookOpen className="h-8 w-8 text-primary mb-4" aria-hidden />
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Autorzy praktycznych książek o compliance</h2>
              <p className="text-muted-foreground">Nasz zespół jest autorem dwóch publikacji wydanych przez C.H. Beck: „Analiza podwójnej istotności” oraz „Nowa architektura compliance”. Wiedzę z projektów, audytów i regulacji przekładamy na metodykę pracy dla organizacji.</p>
            </div>
            <div className="flex items-center justify-center gap-4 overflow-hidden rounded-lg bg-muted/40 p-6 sm:gap-8">
              <img src="/lovable-uploads/book-analiza-podwojnej-istotnosci.png" alt="Książka Analiza podwójnej istotności" width={256} height={360} loading="lazy" className="h-[260px] w-[42%] max-w-[190px] rotate-[-2deg] object-contain drop-shadow-xl transition-all duration-300 hover:-translate-y-3 hover:rotate-0" />
              <img src="/images/nowa-architektura-compliance-okladka.png" alt="Książka Nowa architektura compliance" width={270} height={380} loading="lazy" className="h-[260px] w-[42%] max-w-[190px] rotate-2 object-contain drop-shadow-xl transition-all duration-300 hover:-translate-y-3 hover:rotate-0" />
            </div>
          </div>
        </section>

        {/* Certyfikowane i zaufane rozwiązanie */}
        <section className="bg-foreground border-y" aria-labelledby="certyfikaty-h2">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h2 id="certyfikaty-h2" className="text-2xl md:text-4xl font-bold text-white mb-6">Certyfikowane i <span className="text-primary">zaufane</span> rozwiązanie</h2>
            <div className="mb-10 h-1 w-32 rounded-full bg-gradient-to-r from-primary to-accent" aria-hidden />
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {CERTIFICATES.map((item) => (
                <article key={item.title} className="group">
                  <div className="mb-6 flex h-48 items-center justify-center rounded-lg bg-white p-5 shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
                    <img src={item.image} alt={item.alt} width={350} height={219} loading="lazy" className="max-h-full w-full object-contain" />
                  </div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">{item.eyebrow}</p>
                  <h3 className="mb-3 text-lg md:text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-background/80">{item.description}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 border-t border-background/10 pt-8">
              <img src="/images/jst/cyber-challenge.jpg" alt="OT Cyber Challenge" width={447} height={447} loading="lazy" className="h-16 w-16 rounded-md object-cover shadow-md transition-transform hover:scale-105" />
              <p className="text-sm text-background/80">OT Cyber Challenge — praktyczne zaangażowanie w rozwój kompetencji cyberbezpieczeństwa.</p>
            </div>
            <div className="mt-12 flex flex-col items-center">
              <div className="mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" aria-hidden />
              <p className="text-center text-xl md:text-2xl font-bold text-white">Standardy, które wdrażamy u klientów, potwierdzamy u siebie.</p>
            </div>
          </div>
        </section>

        {/* Zaufanie */}
        <section className="bg-muted/40 border-y">
          <div className="container mx-auto px-4 py-12" aria-label="Bezpieczna realizacja">
          <div className="max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Bezpieczna realizacja dla sektora publicznego</h2>
            <ul className="space-y-3">
              {['Hosting danych w Unii Europejskiej', 'Umowa powierzenia przetwarzania danych', 'Kwalifikacje i CV audytorów dostępne na potrzeby postępowania', 'Mapowanie KRI–ISO 27001–KSC–RODO w jednym raporcie'].map((t) => <li key={t} className="flex gap-3"><ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />{t}</li>)}
            </ul>
          </div>
          </div>
        </section>

        <FAQSection title="Najczęstsze pytania urzędów" faqs={faqs} pageUrl={CANONICAL} />

        {/* Formularz */}
        <section id="przeglad" className="bg-muted/40 border-t scroll-mt-20" aria-labelledby="form-h2">
          <div className="container mx-auto max-w-xl px-4 py-12">
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
