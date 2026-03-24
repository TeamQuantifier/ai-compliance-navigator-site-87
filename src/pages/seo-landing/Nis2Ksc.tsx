import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  Shield,
  ShieldAlert,
  AlertTriangle,
  FileWarning,
  Clock,
  Users,
  ChevronRight,
  Brain,
  FileCheck,
  BarChart3,
  Link2,
  FolderLock,
  LayoutDashboard,
  RefreshCcw,
  Search,
  FileText,
  Settings,
  Activity,
  Lock,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Upload,
  Cpu,
  Rocket,
  Eye,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Nis2PlatformMockups from '@/components/mockups/Nis2PlatformMockups';

/* ───────────────────────── sticky CTA bar ───────────────────────── */

const StickyCta = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-slate-950/95 backdrop-blur border-t border-white/10 py-3">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4">
        <p className="text-white/80 text-sm hidden md:block">
          NIS2 to już obowiązek prawny. Sprawdź gotowość swojej organizacji.
        </p>
        <div className="flex gap-3 ml-auto">
          <Button asChild size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <a href="#final-cta">Zobacz demo</a>
          </Button>
          <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
            <a href="#final-cta">Sprawdź gotowość na NIS2</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────── section wrapper ───────────────────────── */

const Section = ({
  children,
  className = '',
  id,
  dark = true,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}) => (
  <section
    id={id}
    className={`py-20 md:py-28 ${dark ? 'bg-slate-950 text-white' : 'bg-slate-900 text-white'} ${className}`}
  >
    <div className="container mx-auto px-4">{children}</div>
  </section>
);

/* ───────────────────────── badge chip ───────────────────────── */

const FrameworkBadge = ({ label }: { label: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white/70">
    <Shield className="h-3 w-3" />
    {label}
  </span>
);

/* ───────────────────────── feature card ───────────────────────── */

const FeatureCard = ({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) => (
  <div className="group relative rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-primary/40 hover:bg-white/[0.06]">
    <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2.5">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <h3 className="mb-2 text-lg font-semibold">{title}</h3>
    <p className="text-sm leading-relaxed text-white/60">{desc}</p>
  </div>
);

/* ───────────────────────── animated implementation steps ───────────────────────── */

const implementationSteps = [
  {
    icon: Upload,
    step: '01',
    title: 'Wgrywasz dokumenty',
    desc: 'Importuj istniejące polityki, procedury i dokumentację. AI automatycznie rozpoznaje strukturę i mapuje treść do wymogów NIS2.',
    details: ['Import polityk i procedur', 'Rozpoznawanie struktury dokumentów', 'Automatyczna klasyfikacja'],
  },
  {
    icon: Cpu,
    step: '02',
    title: 'AI mapuje do NIS2',
    desc: 'Sztuczna inteligencja analizuje dokumenty, identyfikuje luki w zgodności i generuje szczegółowy raport gap analysis.',
    details: ['AI Gap Analysis', 'Identyfikacja luk', 'Raport zgodności z artykułami NIS2'],
  },
  {
    icon: Rocket,
    step: '03',
    title: 'Platforma prowadzi wdrożenie',
    desc: 'Krok po kroku przez governance, zarządzanie ryzykiem, incydenty i łańcuch dostaw — z dynamiczną roadmapą.',
    details: ['Governance & Policies', 'Risk Management', 'Incident & Supply Chain'],
  },
  {
    icon: Eye,
    step: '04',
    title: 'Monitorujesz zgodność',
    desc: 'Ciągły monitoring, automatyczne alerty ryzyka i dashboard zarządu w czasie rzeczywistym.',
    details: ['Continuous Monitoring', 'Alerty w czasie rzeczywistym', 'Dashboard zarządu'],
  },
];

const ImplementationSteps = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div>
      {/* horizontal step selector */}
      <div className="relative mb-10">
        {/* connector line */}
        <div className="absolute top-5 left-[10%] right-[10%] h-px bg-white/10 hidden md:block" />
        <div
          className="absolute top-5 left-[10%] h-px bg-primary transition-all duration-700 ease-out hidden md:block"
          style={{ width: `${(activeStep / 3) * 80}%` }}
        />

        <div className="flex justify-between relative">
          {implementationSteps.map((s, i) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(i)}
              className="flex flex-col items-center text-center flex-1 group cursor-pointer"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold mb-3 transition-all duration-500 ${
                  i <= activeStep
                    ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30'
                    : 'border border-white/20 text-white/40 group-hover:border-white/40'
                }`}
              >
                {i < activeStep ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  s.step
                )}
              </div>
              <span
                className={`text-xs md:text-sm font-medium leading-tight transition-colors duration-300 ${
                  i === activeStep ? 'text-white' : 'text-white/40'
                }`}
              >
                {s.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* animated detail panel */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] min-h-[220px]">
        {implementationSteps.map((s, i) => (
          <div
            key={s.step}
            className={`transition-all duration-500 ease-out ${
              i === activeStep
                ? 'opacity-100 translate-y-0 relative'
                : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
            }`}
          >
            <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
              {/* icon */}
              <div className="shrink-0">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20">
                  <s.icon className="h-7 w-7 text-primary" />
                </div>
                <p className="text-xs font-mono text-primary mt-2 text-center">{s.step}</p>
              </div>

              {/* content */}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-5 max-w-lg">{s.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {s.details.map((d, j) => (
                    <span
                      key={d}
                      className="inline-flex items-center gap-1.5 text-xs rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/60 transition-all duration-500"
                      style={{ transitionDelay: `${j * 100}ms` }}
                    >
                      <CheckCircle2 className="h-3 w-3 text-primary" />
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* step indicator */}
              <div className="hidden md:flex flex-col items-center gap-1 shrink-0">
                <span className="text-4xl font-bold text-white/5">{s.step}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* step dots */}
      <div className="flex justify-center gap-2 mt-6">
        {implementationSteps.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeStep ? 'w-8 bg-primary' : 'w-2 bg-white/20 hover:bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
/* ───────────────────────── hero contact form ───────────────────────── */

const HeroContactForm = ({ locale }: { locale: string }) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('contact-form', {
        body: {
          firstName: firstName.trim(),
          lastName: '-',
          email: email.trim(),
          message: 'Sprawdź gotowość na NIS2 — formularz hero',
          language: locale,
          sourceUrl: window.location.href,
        },
      });
      if (error) throw error;
      toast.success('Dziękujemy! Odezwiemy się wkrótce.');
      setFirstName('');
      setEmail('');
    } catch {
      toast.error('Coś poszło nie tak. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 max-w-md">
      <h3 className="text-lg font-semibold text-white mb-1">Sprawdź gotowość na NIS2</h3>
      <p className="text-sm text-white/50 mb-4">
        Napiszemy do Ciebie lub zadzwoń:{' '}
        <a href="tel:+48222922636" className="text-primary hover:underline font-medium">+48 22 292 26 36</a>
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          placeholder="Imię"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          maxLength={50}
          className="bg-white/10 border-white/15 text-white placeholder:text-white/40 focus-visible:ring-primary"
        />
        <Input
          type="email"
          placeholder="Email służbowy"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          maxLength={100}
          className="bg-white/10 border-white/15 text-white placeholder:text-white/40 focus-visible:ring-primary"
        />
        <Button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary/90 text-base px-6 whitespace-nowrap"
        >
          {loading ? 'Wysyłam…' : 'Wyślij'}
          {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
};


/* ═══════════════════════════════════════════════════════════════════ */
/*                         MAIN COMPONENT                            */
/* ═══════════════════════════════════════════════════════════════════ */

const Nis2Ksc = () => {
  const { currentLocale } = useLanguage();

  return (
    <>
      <Helmet>
        <title>NIS2 KSC – AI-native platforma zgodności | Quantifier</title>
        <meta
          name="description"
          content="Quantifier to AI-native platforma GRC, która przygotowuje organizację do audytu NIS2 i zapewnia ciągłą zgodność. Sprawdź gotowość swojej organizacji."
        />
      </Helmet>

      {/* ────── HERO ────── */}
      <section className="relative min-h-[90vh] flex items-center bg-slate-950 overflow-hidden">
        {/* decorative orbs */}
        <div className="absolute top-20 -left-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-10 right-0 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[160px]" />

        {/* grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="container mx-auto px-4 relative z-10 py-28">
          <div className="max-w-3xl">
            {/* badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              <FrameworkBadge label="NIS2" />
              <FrameworkBadge label="ISO 27001" />
              <FrameworkBadge label="DORA" />
              <FrameworkBadge label="GDPR" />
            </div>

            {/* NIS2 signed banner */}
            <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-400/15 border border-emerald-400/30 px-4 py-2 mb-8">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-300">Prezydent RP podpisał NIS2 — ustawa obowiązuje</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
              Twoja organizacja musi spełnić NIS2.{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Zegar tyka.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-4 max-w-2xl leading-relaxed">
              Quantifier to AI-native platforma, która przygotowuje organizację
              do audytu i zapewnia ciągłą zgodność z NIS2.
            </p>
            <p className="text-base text-white/50 mb-10 max-w-2xl leading-relaxed">
              NIS2 wymaga operacyjnego zarządzania ryzykiem, incydentami,
              governance i bezpieczeństwem dostawców. Quantifier łączy wszystko
              w jednej platformie.
            </p>

            <HeroContactForm locale={currentLocale} />
          </div>
        </div>
      </section>

      {/* ────── URGENCY ────── */}
      <Section dark={false}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-red-500/10 p-2">
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              NIS2 to już obowiązek prawny
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-5 mt-10">
            {[
              {
                icon: Users,
                text: 'Osobista odpowiedzialność zarządu za cyberbezpieczeństwo',
              },
              {
                icon: Clock,
                text: 'Raportowanie incydentów w ciągu 24h / 72h',
              },
              {
                icon: Link2,
                text: 'Wymagania wobec dostawców i łańcucha dostaw',
              },
              {
                icon: ShieldAlert,
                text: 'Obowiązkowe zarządzanie ryzykiem ICT',
              },
              {
                icon: FileWarning,
                text: 'Kary do 10 mln EUR lub 2% rocznego przychodu',
              },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3">
                <Icon className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
                <span className="text-white/80 text-base">{text}</span>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Button
              asChild
              className="bg-red-500/90 hover:bg-red-500 text-white"
            >
              <Link to={`/${currentLocale}/sprawdz-cyberbezpieczenstwo`}>
                Sprawdź czy podlegasz NIS2
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* ────── PROBLEM ────── */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Większość organizacji nie jest operacyjnie gotowa
          </h2>
          <p className="text-white/50 mb-10 max-w-2xl">
            Typowe podejście do compliance nie spełnia wymogów NIS2.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Polityki w dokumentach Word',
              'Ryzyka w arkuszach Excel',
              'Incydenty w różnych systemach',
              'Brak audit trail',
              'Brak monitoringu dostawców',
              'Brak continuous compliance',
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3"
              >
                <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                <span className="text-sm text-white/70">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6">
            <p className="text-base text-white/80 font-medium">
              NIS2 wymaga jednego operacyjnego systemu — nie zestawu
              rozproszonych dokumentów i arkuszy.
            </p>
          </div>
        </div>
      </Section>

      {/* ────── SOLUTION ────── */}
      <Section id="solution" dark={false}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest text-primary mb-3">
              Platforma
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI-native platforma operacyjna dla NIS2
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Wszystkie wymogi NIS2 w jednym systemie — od gap analysis po
              continuous compliance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              icon={Brain}
              title="AI mapowanie polityk"
              desc="Automatyczne mapowanie istniejących polityk do wymogów NIS2 z wykorzystaniem AI."
            />
            <FeatureCard
              icon={BarChart3}
              title="Rejestr ryzyk NIS2"
              desc="Centralny rejestr ryzyk powiązany z artykułami dyrektywy NIS2."
            />
            <FeatureCard
              icon={Activity}
              title="Workflow incydentów"
              desc="Zarządzanie incydentami z automatycznym raportowaniem 24h/72h."
            />
            <FeatureCard
              icon={Link2}
              title="Monitoring dostawców"
              desc="Ocena i ciągły monitoring bezpieczeństwa łańcucha dostaw."
            />
            <FeatureCard
              icon={FolderLock}
              title="Evidence room"
              desc="Centralne repozytorium dowodów i dokumentacji audytowej."
            />
            <FeatureCard
              icon={LayoutDashboard}
              title="Dashboard zarządu"
              desc="Przejrzysty widok stanu zgodności dla C-level i zarządu."
            />
            <FeatureCard
              icon={RefreshCcw}
              title="Continuous compliance"
              desc="Ciągłe monitorowanie zgodności z automatycznymi alertami."
            />
          </div>

          {/* Platform Mockups */}
          <Nis2PlatformMockups />

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-base px-8"
            >
              <Link to={`/${currentLocale}/contact`}>
                Zobacz jak działa
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* ────── 4 STEPS TO COMPLIANCE (merged roadmap + how it works) ────── */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest text-primary mb-3">
              Wdrożenie
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              4 kroki do zgodności z NIS2
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Roadmapa dopasowuje się dynamicznie do poziomu dojrzałości organizacji.
            </p>
          </div>

          <ImplementationSteps />
        </div>
      </Section>

      {/* ────── AUDITOR SECTION ────── */}
      <Section dark={false}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-primary/10 p-2">
              <FileCheck className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Gdy wchodzi audytor — jesteś gotowy
            </h2>
          </div>

          <p className="text-white/60 mb-8 max-w-2xl">
            Quantifier automatycznie przygotowuje kompletną dokumentację
            audytową:
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Audit-ready polityki',
              'Rejestr ryzyk',
              'Log incydentów',
              'Evidencje kontroli',
              'Audit trail',
              'Przypisanie odpowiedzialności',
              'Mapowanie do artykułów NIS2',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-white/80 text-sm">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <p className="text-sm text-white/70">
              <span className="font-semibold text-emerald-400">Highlight:</span>{' '}
              Dokumentacja generowana bezpośrednio z platformy — zero ręcznego
              przygotowania.
            </p>
          </div>

          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-base"
            >
              <Link to={`/${currentLocale}/contact`}>
                Przygotuj się na audyt
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* ────── CONTINUOUS COMPLIANCE ────── */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              NIS2 wymaga ciągłej zgodności
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Jednorazowy audyt to za mało. NIS2 wymaga operacyjnego,
              ciągłego procesu.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Eye, title: 'Ciągły monitoring' },
              { icon: Search, title: 'Automatyczny gap analysis' },
              { icon: RefreshCcw, title: 'Aktualizacje regulacyjne' },
              { icon: Brain, title: 'AI rekomendacje' },
              { icon: LayoutDashboard, title: 'Dashboard zarządu' },
              { icon: AlertTriangle, title: 'Alerty ryzyka' },
            ].map(({ icon: Icon, title }) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-primary/30"
              >
                <Icon className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm font-medium text-white/80">
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ────── FINAL CTA ────── */}
      <section
        id="final-cta"
        className="relative py-24 md:py-32 bg-slate-950 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[140px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Sprawdź poziom gotowości na NIS2
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              Zacznij od bezpłatnej oceny dojrzałości i dowiedz się, co wymaga
              natychmiastowej uwagi.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-base px-8"
              >
                <Link to={`/${currentLocale}/contact`}>
                  Umów NIS2 Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 text-base"
              >
                <Link to={`/${currentLocale}/contact`}>Zobacz demo</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 text-base"
              >
                <Link to={`/${currentLocale}/sprawdz-cyberbezpieczenstwo`}>
                  Pobierz checklistę NIS2
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <StickyCta />
    </>
  );
};

export default Nis2Ksc;
