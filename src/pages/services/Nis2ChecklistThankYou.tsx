import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarCheck,
  Download,
  FileSpreadsheet,
  FileText,
  LayoutDashboard,
  ListChecks,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const XLSX_FILE = '/downloads/checklista-nis2-ksc-2026.xlsx';
const PDF_FILE = '/downloads/checklista-nis2-ksc-instrukcja.pdf';

const SEQUENCE = [
  { day: 'Dzień 0', label: 'Materiał i instrukcja korzystania z arkusza' },
  { day: 'Dzień 2', label: 'Jak przypisać odpowiedzialności w modelu RACI' },
  { day: 'Dzień 5', label: 'Pięć najczęstszych luk przed kontrolą' },
  { day: 'Dzień 8', label: 'Zaproszenie na konsultację lub demo platformy' },
];

const Nis2ChecklistThankYou = () => {
  useEffect(() => {
    (window as any).prerenderReady = true;
  }, []);

  return (
    <div className="bg-white text-ksc-ink">
      <Helmet htmlAttributes={{ lang: 'pl' }}>
        <title>Dziękujemy — checklista NIS2 / KSC gotowa do pobrania</title>
        <meta
          name="description"
          content="Pliki checklisty NIS2 / KSC są gotowe do pobrania. Sprawdź kwalifikację w quizie, zobacz platformę NIS2/KSC lub umów konsultację."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* HERO */}
      <section className="bg-ksc-paper border-b border-ksc-ink/10">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ksc-accent mb-5">
            Dziękujemy
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-[1.14] mb-5">
            Checklista NIS2 / KSC 2.0 jest gotowa do pobrania
          </h1>
          <p className="text-base md:text-lg text-ksc-ink/70 leading-relaxed">
            Poniżej znajdują się pliki oraz trzy kolejne kroki, które warto wykonać w tej samej
            sesji — zaczynając od kwalifikacji podmiotu.
          </p>
        </div>
      </section>

      {/* KROKI */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 space-y-6">
          {/* Krok 1 — pobranie */}
          <div className="border border-ksc-accent/40 rounded-sm p-6 md:p-8 bg-ksc-paper/50">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <span className="block text-[11px] font-bold tracking-[0.2em] text-ksc-accent mb-2">
                  KROK 01
                </span>
                <h2 className="text-xl md:text-2xl font-bold mb-2 leading-snug">Pobierz pliki</h2>
                <p className="text-[15px] text-ksc-ink/65 leading-relaxed">
                  Arkusz roboczy XLSX z pięcioma zakładkami oraz jednostronicowa instrukcja PDF.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Button
                  asChild
                  className="bg-ksc-ink hover:bg-ksc-surface text-white rounded-sm px-6 py-6 text-sm font-semibold"
                >
                  <a href={XLSX_FILE} download>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Arkusz XLSX
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-transparent border-ksc-ink/25 text-ksc-ink hover:bg-ksc-ink hover:text-white rounded-sm px-6 py-6 text-sm font-semibold"
                >
                  <a href={PDF_FILE} download>
                    <FileText className="mr-2 h-4 w-4" />
                    Instrukcja PDF
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Kroki 2-4 */}
          {[
            {
              step: '02',
              icon: ListChecks,
              title: 'Sprawdź w quizie, czy organizacja podlega KSC',
              desc: 'Pięć minut. Wynik wskazuje, czy podmiot jest kluczowy, ważny czy nieobjęty obowiązkami.',
              cta: 'Przejdź do quizu',
              to: '/pl/sprawdz-cyberbezpieczenstwo',
            },
            {
              step: '03',
              icon: LayoutDashboard,
              title: 'Zobacz platformę NIS2 / KSC',
              desc: 'Te same rejestry, polityki i dowody prowadzone w jednym miejscu, z historią zmian i statusami.',
              cta: 'Zobacz platformę',
              to: '/pl/frameworks/nis-2',
            },
            {
              step: '04',
              icon: CalendarCheck,
              title: 'Umów konsultację dotyczącą kwalifikacji lub wdrożenia',
              desc: 'Rozmowa z osobą, która prowadziła wdrożenia i asystę przy kontroli. Bez opłat na tym etapie.',
              cta: 'Umów konsultację',
              to: '/pl/contact',
            },
          ].map(({ step, icon: Icon, title, desc, cta, to }) => (
            <div
              key={step}
              className="border border-ksc-ink/12 rounded-sm p-6 md:p-8 hover:border-ksc-accent/50 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <span className="block text-[11px] font-bold tracking-[0.2em] text-ksc-accent mb-2">
                    KROK {step}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold mb-2 leading-snug flex items-center gap-3">
                    <Icon className="h-5 w-5 text-ksc-accent shrink-0" strokeWidth={1.6} />
                    {title}
                  </h2>
                  <p className="text-[15px] text-ksc-ink/65 leading-relaxed">{desc}</p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="bg-transparent border-ksc-ink/25 text-ksc-ink hover:bg-ksc-ink hover:text-white rounded-sm px-6 py-6 text-sm font-semibold shrink-0"
                >
                  <Link to={to}>
                    {cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEKWENCJA E-MAIL */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="border-t border-ksc-ink/10 pt-10">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-4 w-4 text-ksc-accent" strokeWidth={1.6} />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ksc-accent">
                Co dalej na e-mail
              </p>
            </div>
            <p className="text-[15px] text-ksc-ink/65 leading-relaxed mb-6">
              Jeśli zaznaczyli Państwo zgodę na komunikację, w kolejnych dniach wyślemy krótką
              sekwencję wdrożeniową. Można ją wyłączyć jednym kliknięciem w każdej wiadomości.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SEQUENCE.map(({ day, label }) => (
                <div key={day} className="border border-ksc-ink/12 rounded-sm p-4">
                  <span className="block text-[11px] font-bold tracking-[0.18em] text-ksc-accent mb-2">
                    {day}
                  </span>
                  <p className="text-[14px] text-ksc-ink/75 leading-relaxed">{label}</p>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-ksc-ink/45 mt-6 flex items-center gap-2">
              <Download className="h-3.5 w-3.5" strokeWidth={1.6} />
              Problem z pobraniem plików? Napisz na contact@quantifier.ai — odeślemy je e-mailem.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nis2ChecklistThankYou;
