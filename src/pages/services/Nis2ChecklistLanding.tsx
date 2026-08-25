import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  FileCheck,
  FileSpreadsheet,
  Gavel,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { newsletterClient } from '@/lib/newsletter-client';
import { useToast } from '@/hooks/use-toast';
import FAQSection from '@/components/seo/FAQSection';

const CANONICAL = 'https://quantifier.ai/pl/checklista-nis2-ksc-wdrozenie-audyt/';
const THANK_YOU = '/pl/checklista-nis2-ksc-wdrozenie-audyt/dziekujemy';

/* ───────────────────────── formularz pobrania ───────────────────────── */

export const ChecklistDownloadForm = ({
  id,
  variant = 'paper',
}: {
  id?: string;
  variant?: 'paper' | 'light';
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [consent, setConsent] = useState(false);

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
    const sourceUrl = typeof window !== 'undefined' ? window.location.href : undefined;

    try {
      const { error } = await supabase.functions.invoke('contact-form', {
        body: {
          firstName: fn,
          lastName: '—',
          email: em,
          company: co,
          message: [
            '[CHECKLISTA NIS2/KSC] Pobranie arkusza roboczego',
            `Firma: ${co}`,
            consent ? 'Zgoda marketingowa: TAK' : 'Zgoda marketingowa: NIE',
          ].join('\n'),
          language: 'pl',
          sourceUrl,
        },
      });
      if (error) throw error;
    } catch {
      // Nie blokujemy pobrania — materiał jest bezpłatny.
    }

    if (consent) {
      newsletterClient
        .subscribe(em, 'pl', {
          first_name: fn,
          company: co,
          source: 'checklist_nis2_ksc',
          origin: sourceUrl,
          tags: ['checklist', 'nis2_ksc'],
        })
        .catch(() => undefined);
    }

    setLoading(false);
    navigate(THANK_YOU);
  };

  const wrapper =
    variant === 'paper'
      ? 'bg-white border border-ksc-ink/15 rounded-sm p-6 md:p-8'
      : 'bg-ksc-paper border border-ksc-ink/10 rounded-sm p-6 md:p-8';

  return (
    <div id={id} className={wrapper}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ksc-accent mb-3">
        Bezpłatne pobranie
      </p>
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-ksc-ink leading-snug">
        Pobierz checklistę NIS2 / KSC 2.0
      </h2>
      <p className="text-sm mb-6 text-ksc-ink/65">
        Arkusz roboczy (XLSX) plus jednostronicowa instrukcja PDF. Trzy pola — dostęp do plików
        od razu po wysłaniu.
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
          maxLength={140}
          required
          className={inputClass}
        />
        <label className="flex items-start gap-3 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 accent-ksc-accent"
          />
          <span className="text-[12px] leading-relaxed text-ksc-ink/60">
            Chcę otrzymywać materiały wdrożeniowe NIS2 / KSC na podany adres. Zgoda jest
            dobrowolna i można ją wycofać w każdej chwili —{' '}
            <Link to="/pl/legal/privacy" className="underline hover:text-ksc-accent">
              polityka prywatności
            </Link>
            .
          </span>
        </label>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-ksc-ink hover:bg-ksc-surface text-white rounded-sm py-6 text-sm font-semibold tracking-wide"
        >
          {loading ? 'Przygotowujemy pliki…' : 'Pobierz checklistę'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <p className="text-[11px] text-ksc-ink/45 pt-1">
          Materiał edukacyjny. Nie stanowi porady prawnej.
        </p>
      </form>
    </div>
  );
};

/* ───────────────────────── zawartość arkusza ───────────────────────── */

const CONTENTS = [
  {
    icon: CalendarClock,
    title: 'Harmonogram 10 dni roboczych',
    desc: 'Plan dzień po dniu do pierwszej gotowości audytowej — z rezultatem wymaganym na każdym etapie.',
  },
  {
    icon: Users,
    title: 'Właściciele zadań (RACI)',
    desc: '14 obszarów SZBI z przypisaniem odpowiedzialności imiennie, bez współodpowiedzialności zbiorowej.',
  },
  {
    icon: ClipboardList,
    title: 'Lista wymaganych działań',
    desc: '22 działania wdrożeniowe z priorytetem krytyczny / wysoki / średni oraz statusem realizacji.',
  },
  {
    icon: FileCheck,
    title: 'Lista dowodów do audytu',
    desc: '23 dokumenty i rejestry, których może żądać organ lub audytor, wraz z formą dowodu.',
  },
];

const SHEET_TABS = ['Harmonogram', 'Właściciele', 'Działania', 'Dowody', 'Legenda'];

const SHEET_ROWS = [
  ['Dzień 1', 'Kwalifikacja', 'Ustalenie, czy podmiot jest kluczowy lub ważny', 'Notatka kwalifikacyjna'],
  ['Dzień 3', 'Ryzyko', 'Analiza ryzyka dla procesów krytycznych', 'Rejestr ryzyk'],
  ['Dzień 5', 'Incydenty', 'Procedura zgłaszania incydentów i ścieżka do CSIRT', 'Procedura + rejestr'],
  ['Dzień 7', 'Dostawcy', 'Ocena łańcucha dostaw i klauzule umowne', 'Rejestr dostawców'],
  ['Dzień 10', 'Gotowość', 'Kompletacja dokumentacji w paczkę audytową', 'Paczka dowodowa'],
];

const AUDIENCE = [
  {
    title: 'Zarząd i właściciele',
    desc: 'Potrzebują jednej strony prawdy: co jest zrobione, czego brakuje i kto za to odpowiada.',
  },
  {
    title: 'Osoby odpowiedzialne za cyberbezpieczeństwo',
    desc: 'Dostają gotową strukturę dokumentacji i listę dowodów, zamiast budować ją od zera.',
  },
  {
    title: 'Zespoły przed pierwszą kontrolą',
    desc: 'Widzą, które dowody są kompletne, a które trzeba przygotować przed audytem.',
  },
];

const FAQS = [
  {
    question: 'Czy checklista NIS2 / KSC jest bezpłatna?',
    answer:
      'Tak. Arkusz roboczy XLSX oraz jednostronicowa instrukcja PDF są udostępniane bezpłatnie. Do pobrania wystarczy imię, służbowy e-mail i nazwa firmy.',
  },
  {
    question: 'W jakim formacie otrzymam checklistę?',
    answer:
      'Otrzymują Państwo arkusz XLSX z pięcioma zakładkami (Harmonogram, Właściciele, Działania, Dowody, Legenda) oraz instrukcję PDF. Arkusz otwiera się w Excelu, Google Sheets i LibreOffice — statusy wybiera się z list rozwijanych.',
  },
  {
    question: 'Czy checklista zastępuje audyt NIS2 lub KSC?',
    answer:
      'Nie. Checklista porządkuje zakres wdrożenia i przygotowanie dowodów, natomiast nie jest audytem ani opinią prawną. Ułatwia jednak samoocenę przed audytem wewnętrznym i przed kontrolą organu.',
  },
  {
    question: 'Skąd wynikają obowiązki wskazane w arkuszu?',
    answer:
      'Z dyrektywy (UE) 2022/2555 (NIS2) oraz z ustawy o krajowym systemie cyberbezpieczeństwa (KSC), która wdraża ją do polskiego porządku prawnego. Zakres obowiązków zależy od kwalifikacji podmiotu jako kluczowy lub ważny.',
  },
  {
    question: 'Czy checklista obejmuje harmonogram KSC do pierwszego audytu?',
    answer:
      'Tak. Zakładka „Harmonogram” zawiera plan 10 dni roboczych — od kwalifikacji podmiotu i zakresu SZBI, przez analizę ryzyka, polityki, incydenty i łańcuch dostaw, do przeglądu zarządzania i kompletacji paczki dowodowej.',
  },
];

/* ───────────────────────── strona ───────────────────────── */

const Nis2ChecklistLanding = () => {
  return (
    <div className="bg-white text-ksc-ink">
      <Helmet htmlAttributes={{ lang: 'pl' }}>
        <title>Checklista NIS2/KSC: wdrożenie i audyt krok po kroku</title>
        <meta
          name="description"
          content="Pobierz checklistę NIS2/KSC z harmonogramem do pierwszego audytu, podziałem odpowiedzialności oraz listą wymaganych działań i dowodów."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={CANONICAL} />
        <link rel="alternate" hrefLang="pl-PL" href={CANONICAL} />
        <meta property="og:title" content="Checklista NIS2/KSC: wdrożenie i audyt krok po kroku" />
        <meta
          property="og:description"
          content="Bezpłatny arkusz roboczy NIS2/KSC 2.0 — harmonogram, właściciele zadań i lista dowodów do audytu."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:locale" content="pl_PL" />
        <meta property="og:site_name" content="Quantifier.ai" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://quantifier.ai/pl/' },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Checklista NIS2 / KSC',
                item: CANONICAL,
              },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'DigitalDocument',
            name: 'Checklista NIS2 / KSC 2.0 — arkusz roboczy',
            description:
              'Arkusz roboczy do wdrożenia NIS2 / KSC: harmonogram 10 dni roboczych, podział odpowiedzialności RACI, lista wymaganych działań oraz lista dowodów do audytu.',
            inLanguage: 'pl-PL',
            encodingFormat:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            isAccessibleForFree: true,
            url: CANONICAL,
            author: { '@type': 'Organization', name: 'Quantifier.ai', url: 'https://quantifier.ai' },
          })}
        </script>
      </Helmet>

      {/* HERO */}
      <section className="bg-ksc-paper border-b border-ksc-ink/10">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-start">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ksc-accent mb-5">
                Materiał do pobrania · NIS2 / KSC 2.0
              </p>
              <h1 className="text-3xl md:text-5xl font-bold leading-[1.12] mb-6">
                Checklista NIS2 / KSC — wdrożenie i audyt krok po kroku
              </h1>
              <p className="text-base md:text-lg text-ksc-ink/70 leading-relaxed mb-8">
                Pobierz bezpłatną checklistę NIS2 / KSC 2.0 w arkuszu roboczym — z harmonogramem,
                właścicielami zadań i listą dowodów do audytu. Zamiast pustej strony zaczynają
                Państwo od gotowej struktury dokumentacji.
              </p>

              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 border-t border-ksc-ink/10 pt-6">
                {[
                  { icon: Gavel, label: 'Prawnicy i praktycy audytu' },
                  { icon: ShieldCheck, label: 'Metodyka zgodna z ustawą o KSC' },
                  { icon: FileCheck, label: 'Gotowe dowody dla organu' },
                  { icon: FileSpreadsheet, label: 'XLSX + instrukcja PDF' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-ksc-accent shrink-0" strokeWidth={1.6} />
                    <span className="text-sm font-semibold text-ksc-ink/80">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <ChecklistDownloadForm id="pobierz" />
            </div>
          </div>
        </div>
      </section>

      {/* CO ZAWIERA ARKUSZ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ksc-accent mb-3">
            Zakres materiału
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Co zawiera arkusz</h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {CONTENTS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="border border-ksc-ink/12 rounded-sm p-6 hover:border-ksc-accent/50 transition-colors"
              >
                <Icon className="h-6 w-6 text-ksc-accent mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-bold mb-2 leading-snug">{title}</h3>
                <p className="text-[15px] text-ksc-ink/65 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PODGLĄD ARKUSZA */}
      <section className="py-16 md:py-24 bg-ksc-paper border-y border-ksc-ink/10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ksc-accent mb-3">
                Podgląd
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
                Arkusz roboczy, nie plakat z hasłami
              </h2>
              <p className="text-[15px] md:text-base text-ksc-ink/70 leading-relaxed mb-4">
                Każde działanie ma właściciela, termin, status i wskazany dowód. Statusy wybiera się
                z list rozwijanych, więc arkusz od razu działa jako rejestr postępu wdrożenia.
              </p>
              <p className="text-[15px] md:text-base text-ksc-ink/70 leading-relaxed">
                Pięć zakładek: harmonogram, właściciele, działania, dowody i legenda z opisem
                statusów oraz modelu RACI.
              </p>
            </div>

            <div className="bg-white border border-ksc-ink/15 rounded-sm overflow-hidden shadow-sm">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-ksc-ink/10 bg-ksc-ink">
                <FileSpreadsheet className="h-4 w-4 text-white/80" strokeWidth={1.6} />
                <span className="text-xs font-semibold text-white tracking-wide">
                  checklista-nis2-ksc-2026.xlsx
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[560px]">
                  <thead>
                    <tr className="bg-ksc-paper">
                      {['Dzień', 'Obszar', 'Działanie', 'Rezultat'].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-ksc-ink/70 border-b border-ksc-ink/10"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SHEET_ROWS.map((row) => (
                      <tr key={row[0]} className="border-b border-ksc-ink/8">
                        <td className="px-4 py-3 text-[13px] font-semibold text-ksc-ink whitespace-nowrap">
                          {row[0]}
                        </td>
                        <td className="px-4 py-3 text-[13px] text-ksc-accent font-medium whitespace-nowrap">
                          {row[1]}
                        </td>
                        <td className="px-4 py-3 text-[13px] text-ksc-ink/75">{row[2]}</td>
                        <td className="px-4 py-3 text-[13px] text-ksc-ink/60">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-ksc-ink/10 bg-ksc-paper/60">
                {SHEET_TABS.map((tab, i) => (
                  <span
                    key={tab}
                    className={`px-3 py-1 text-[11px] font-semibold rounded-sm border ${
                      i === 0
                        ? 'bg-white border-ksc-accent/50 text-ksc-ink'
                        : 'border-ksc-ink/15 text-ksc-ink/55'
                    }`}
                  >
                    {tab}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DLA KOGO */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ksc-accent mb-3">
            Dla kogo
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Kto korzysta z checklisty najczęściej
          </h2>

          <div className="grid md:grid-cols-3 gap-8 border-t border-ksc-ink/10 pt-10">
            {AUDIENCE.map((item, i) => (
              <div key={item.title}>
                <span className="block text-[11px] font-bold tracking-[0.2em] text-ksc-accent mb-3">
                  0{i + 1}
                </span>
                <h3 className="text-lg font-bold mb-2 leading-snug">{item.title}</h3>
                <p className="text-[15px] text-ksc-ink/65 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        title="Checklista NIS2 / KSC — najczęstsze pytania"
        faqs={FAQS}
        pageUrl={CANONICAL}
        variant="legal"
      />

      {/* CTA KOŃCOWE */}
      <section className="py-16 md:py-24 bg-ksc-ink">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_0.85fr] gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                Pobierz checklistę i zacznijcie od pierwszego dnia harmonogramu
              </h2>
              <p className="text-base text-white/80 leading-relaxed mb-7">
                Arkusz XLSX oraz instrukcja PDF, bez opłat. Jeśli wolą Państwo najpierw sprawdzić
                kwalifikację podmiotu, zajmuje to pięć minut.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  variant="outline"
                  className="bg-transparent border-white/40 text-white hover:bg-white hover:text-ksc-ink rounded-sm px-6 py-6 text-sm font-semibold"
                >
                  <Link to="/pl/sprawdz-cyberbezpieczenstwo">
                    Sprawdź w quizie, czy podlegasz KSC
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-transparent border-white/25 text-white/85 hover:bg-white hover:text-ksc-ink rounded-sm px-6 py-6 text-sm font-semibold"
                >
                  <Link to="/pl/start-nis2-ksc">Zobacz wdrożenie w 2 tygodnie</Link>
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-7 text-white/60 text-[13px]">
                <CheckCircle2 className="h-4 w-4" strokeWidth={1.6} />
                Materiał edukacyjny — nie stanowi porady prawnej.
              </div>
            </div>

            <ChecklistDownloadForm variant="light" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nis2ChecklistLanding;
