import { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { SUPPORTED_LOCALES, LOCALE_HREFLANG_MAP, Locale } from '@/i18n/config';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import FAQSection from '@/components/seo/FAQSection';
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
import { useTranslation } from 'react-i18next';

/* ───────────────────────── sticky CTA bar ───────────────────────── */

const StickyCta = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

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
          {t('nis2Ksc.stickyCta.text')}
        </p>
        <div className="flex gap-3 ml-auto">
          <Button asChild size="sm" className="bg-white text-slate-900 hover:bg-white/90">
            <a href="#final-cta">{t('nis2Ksc.stickyCta.demo')}</a>
          </Button>
          <Button asChild size="sm" className="bg-primary text-white hover:bg-primary/90">
            <a href="#final-cta">{t('nis2Ksc.stickyCta.cta')}</a>
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
    className={`py-12 md:py-16 ${dark ? 'bg-white text-foreground' : 'bg-slate-50 text-foreground'} ${className}`}
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

/* ───────────────────────── implementation steps ───────────────────────── */

const ImplementationSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useTranslation();

  const steps = useMemo(() => {
    const icons = [Upload, Cpu, Rocket, Eye];
    const stepNums = ['01', '02', '03', '04'];
    return stepNums.map((step, i) => ({
      icon: icons[i],
      step,
      title: t(`nis2Ksc.steps.items.${i}.title`),
      desc: t(`nis2Ksc.steps.items.${i}.desc`),
      details: [0, 1, 2].map(j => t(`nis2Ksc.steps.items.${i}.details.${j}`)),
    }));
  }, [t]);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(id);
  }, [steps.length]);

  return (
    <div>
      {/* horizontal step selector */}
      <div className="relative mb-10">
        <div className="absolute top-5 left-[10%] right-[10%] h-px bg-slate-200 hidden md:block" />
        <div
          className="absolute top-5 left-[10%] h-px bg-primary transition-all duration-700 ease-out hidden md:block"
          style={{ width: `${(activeStep / 3) * 80}%` }}
        />
        <div className="flex justify-between relative">
          {steps.map((s, i) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(i)}
              className="flex flex-col items-center text-center flex-1 group cursor-pointer"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold mb-3 transition-all duration-500 ${
                  i <= activeStep
                    ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30'
                    : 'border border-slate-300 text-slate-400 group-hover:border-slate-400'
                }`}
              >
                {i < activeStep ? <CheckCircle2 className="h-5 w-5" /> : s.step}
              </div>
              <span
                className={`text-xs md:text-sm font-medium leading-tight transition-colors duration-300 ${
                  i === activeStep ? 'text-foreground' : 'text-slate-400'
                }`}
              >
                {s.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* animated detail panel */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 min-h-[220px]">
        {steps.map((s, i) => (
          <div
            key={s.step}
            className={`transition-all duration-500 ease-out ${
              i === activeStep
                ? 'opacity-100 translate-y-0 relative'
                : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
            }`}
          >
            <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
              <div className="shrink-0">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20">
                  <s.icon className="h-7 w-7 text-primary" />
                </div>
                <p className="text-xs font-mono text-primary mt-2 text-center">{s.step}</p>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-3">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5 max-w-lg">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.details.map((d, j) => (
                    <span
                      key={d}
                      className="inline-flex items-center gap-1.5 text-xs rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-slate-600 transition-all duration-500"
                      style={{ transitionDelay: `${j * 100}ms` }}
                    >
                      <CheckCircle2 className="h-3 w-3 text-primary" />
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex flex-col items-center gap-1 shrink-0">
                <span className="text-4xl font-bold text-slate-100">{s.step}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* step dots */}
      <div className="flex justify-center gap-2 mt-6">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeStep ? 'w-8 bg-primary' : 'w-2 bg-slate-200 hover:bg-slate-300'
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
  const { t } = useTranslation();

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
          message: t('nis2Ksc.form.heroMessage'),
          language: locale,
          sourceUrl: window.location.href,
        },
      });
      if (error) throw error;
      toast.success(t('nis2Ksc.form.successToast'));
      setFirstName('');
      setEmail('');
    } catch {
      toast.error(t('nis2Ksc.form.errorToast'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 max-w-md mx-auto rounded-xl border border-white/20 bg-white/[0.08] backdrop-blur-sm p-5">
      <h3 className="text-lg font-semibold text-white mb-1">{t('nis2Ksc.form.title')}</h3>
      <p className="text-sm text-white/70 mb-4">
        {t('nis2Ksc.form.subtitle')}{' '}
        <a href="tel:+48698759206" className="text-primary hover:underline font-medium">(+48) 698 759 206</a>
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          placeholder={t('nis2Ksc.form.firstNamePlaceholder')}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          maxLength={50}
          className="bg-white/15 border-white/25 text-white placeholder:text-white/60 focus-visible:ring-primary"
        />
        <Input
          type="email"
          placeholder={t('nis2Ksc.form.emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          maxLength={100}
          className="bg-white/15 border-white/25 text-white placeholder:text-white/60 focus-visible:ring-primary"
        />
        <Button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary/90 text-base px-6 whitespace-nowrap"
        >
          {loading ? t('nis2Ksc.form.submitting') : t('nis2Ksc.form.submit')}
          {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </form>
      <p className="text-[10px] text-white/50 mt-3 leading-relaxed">
        {t('nis2Ksc.form.rodo')}{' '}
        <Link to={`/${locale}/legal/privacy`} className="underline hover:text-white/70">{t('nis2Ksc.form.privacyPolicy')}</Link>.{' '}
        {t('nis2Ksc.form.rodoSuffix')}
      </p>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════ */
/*                         MAIN COMPONENT                            */
/* ═══════════════════════════════════════════════════════════════════ */

const BASE_URL = 'https://quantifier.ai';
const BRAND_NAME = 'Quantifier.ai';

const ensureTrailingSlash = (url: string): string => url.endsWith('/') ? url : url + '/';

const Nis2KscSeoHead = ({ locale }: { locale: string }) => {
  const { t } = useTranslation();
  const canonicalUrl = ensureTrailingSlash(`${BASE_URL}/${locale}/frameworks/nis-2`);
  const ogLocale = locale === 'pl' ? 'pl_PL' : locale === 'cs' ? 'cs_CZ' : 'en_US';

  const title = locale === 'pl'
    ? t('nis2Ksc.seo.titlePl')
    : locale === 'cs'
    ? t('nis2Ksc.seo.titleCs')
    : t('nis2Ksc.seo.titleEn');

  const description = locale === 'pl'
    ? t('nis2Ksc.seo.descPl')
    : locale === 'cs'
    ? t('nis2Ksc.seo.descCs')
    : t('nis2Ksc.seo.descEn');

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: BRAND_NAME,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description,
    url: canonicalUrl,
    publisher: { '@type': 'Organization', name: BRAND_NAME, url: BASE_URL },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', availability: 'https://schema.org/OnlineOnly' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Frameworks', item: `${BASE_URL}/${locale}/frameworks` },
      { '@type': 'ListItem', position: 3, name: 'NIS2' },
    ],
  };

  const faqKeys = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6'];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqKeys.map(k => ({
      '@type': 'Question',
      name: t(`nis2Ksc.seo.${k}q`),
      acceptedAnswer: { '@type': 'Answer', text: t(`nis2Ksc.seo.${k}a`) },
    })),
  };

  return (
    <Helmet htmlAttributes={{ lang: locale }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />
      {SUPPORTED_LOCALES.map(l => (
        <link key={l} rel="alternate" hrefLang={LOCALE_HREFLANG_MAP[l as Locale]} href={ensureTrailingSlash(`${BASE_URL}/${l}/frameworks/nis-2`)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={ensureTrailingSlash(`${BASE_URL}/en/frameworks/nis-2`)} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${BASE_URL}/og-homepage.png`} />
      <meta property="og:site_name" content={BRAND_NAME} />
      <meta property="og:locale" content={ogLocale} />
      {SUPPORTED_LOCALES.filter(l => l !== locale).map(l => (
        <meta key={l} property="og:locale:alternate" content={l === 'en' ? 'en_US' : l === 'pl' ? 'pl_PL' : 'cs_CZ'} />
      ))}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@quantifier_ai" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${BASE_URL}/og-homepage.png`} />
      <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>
  );
};

const Nis2Ksc = () => {
  const { currentLocale } = useLanguage();
  const { t } = useTranslation();

  const urgencyIcons = [Users, Clock, Link2, ShieldAlert, FileWarning];
  const solutionIcons = [Brain, BarChart3, Activity, Link2, FolderLock, LayoutDashboard, RefreshCcw];
  const continuousIcons = [Eye, Search, RefreshCcw, Brain, LayoutDashboard, AlertTriangle];

  // Signal prerender readiness
  useEffect(() => {
    (window as any).prerenderReady = true;
  }, []);

  // Cybersecurity check URL
  const cyberCheckUrl = currentLocale === 'pl'
    ? `/${currentLocale}/sprawdz-cyberbezpieczenstwo`
    : currentLocale === 'cs'
    ? `/${currentLocale}/zkontrolujte-kybernetickou-bezpecnost`
    : `/${currentLocale}/cybersecurity-check`;

  return (
    <>
      <Nis2KscSeoHead locale={currentLocale} />

      {/* ────── HERO ────── */}
      <section className="relative bg-slate-950 overflow-hidden">
        <div className="absolute top-20 -left-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-10 right-0 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="container mx-auto px-4 relative z-10 py-12 md:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                <FrameworkBadge label="NIS2" />
                <FrameworkBadge label="ISO 27001" />
                <FrameworkBadge label="DORA" />
                <FrameworkBadge label="GDPR" />
              </div>

              <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-400/15 border border-emerald-400/30 px-4 py-2 mb-4 md:mb-6">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300">{t('nis2Ksc.hero.bannerText')}</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] mb-4 md:mb-6 tracking-tight">
                <span className="text-white">{t('nis2Ksc.hero.heading1')}</span>{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {t('nis2Ksc.hero.heading2')}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/70 mb-4 max-w-2xl leading-relaxed">
                {t('nis2Ksc.hero.subtext1')}
              </p>
              <p className="text-sm md:text-base text-white/50 mb-6 max-w-2xl leading-relaxed lg:mb-0">
                {t('nis2Ksc.hero.subtext2')}
              </p>
            </div>

            <div className="lg:pt-4">
              <HeroContactForm locale={currentLocale} />
            </div>
          </div>
        </div>
      </section>

      {/* ────── URGENCY ────── */}
      <section className="py-12 md:py-16 bg-slate-50 text-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-lg bg-red-500/10 p-2">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                {t('nis2Ksc.urgency.heading')}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-5 mt-10">
              {urgencyIcons.map((Icon, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Icon className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
                  <span className="text-slate-600 text-base">{t(`nis2Ksc.urgency.items.${i}`)}</span>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Button asChild className="bg-red-500/90 hover:bg-red-500 text-white">
                <Link to={cyberCheckUrl}>
                  {t('nis2Ksc.urgency.ctaText')}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ────── PROBLEM ────── */}
      <section className="py-12 md:py-16 bg-white text-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('nis2Ksc.problem.heading')}
            </h2>
            <p className="text-slate-500 mb-10 max-w-2xl">
              {t('nis2Ksc.problem.subtitle')}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3"
                >
                  <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                  <span className="text-sm text-slate-700">{t(`nis2Ksc.problem.items.${i}`)}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-base text-slate-700 font-medium">
                {t('nis2Ksc.problem.callout')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────── SOLUTION ────── */}
      <section id="solution" className="py-12 md:py-16 bg-slate-950 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-widest text-primary mb-3">
                {t('nis2Ksc.solution.label')}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('nis2Ksc.solution.heading')}
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                {t('nis2Ksc.solution.subtitle')}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-stretch">
              <ul className="flex flex-col justify-between py-2">
                {solutionIcons.map((Icon, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Icon className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm leading-relaxed text-white/70">{t(`nis2Ksc.solution.features.${i}`)}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl overflow-hidden">
                <Nis2PlatformMockups />
              </div>
            </div>

            <div className="text-center mt-12">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-base px-8"
              >
                <Link to={`/${currentLocale}/contact`} state={{ demo: true }}>
                  {t('nis2Ksc.solution.cta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ────── 4 STEPS ────── */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest text-primary mb-3">
              {t('nis2Ksc.steps.label')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('nis2Ksc.steps.heading')}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              {t('nis2Ksc.steps.subtitle')}
            </p>
          </div>
          <ImplementationSteps />
        </div>
      </Section>

      {/* ────── AUDITOR ────── */}
      <Section dark={false}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-primary/10 p-2">
              <FileCheck className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('nis2Ksc.auditor.heading')}
            </h2>
          </div>

          <p className="text-slate-600 mb-8 max-w-2xl">
            {t('nis2Ksc.auditor.subtitle')}
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-slate-700 text-sm">{t(`nis2Ksc.auditor.items.${i}`)}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-sm text-slate-700">
              <span className="font-semibold text-emerald-600">{t('nis2Ksc.auditor.highlightLabel')}</span>{' '}
              {t('nis2Ksc.auditor.highlight')}
            </p>
          </div>
        </div>
      </Section>

      {/* ────── CONTINUOUS COMPLIANCE ────── */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('nis2Ksc.continuous.heading')}
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              {t('nis2Ksc.continuous.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {continuousIcons.map((Icon, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-primary/30 hover:shadow-sm"
              >
                <Icon className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm font-medium text-slate-700">
                  {t(`nis2Ksc.continuous.items.${i}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ────── ARTICLE 21 MAPPING TABLE ────── */}
      <Section dark={false}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('nis2Ksc.article21.heading')}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              {t('nis2Ksc.article21.subtitle')}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-3 font-semibold text-slate-700 border border-slate-200">{t('nis2Ksc.article21.colReq')}</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border border-slate-200">{t('nis2Ksc.article21.colAction')}</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border border-slate-200 hidden md:table-cell">{t('nis2Ksc.article21.colEvidence')}</th>
                </tr>
              </thead>
              <tbody>
                {[0,1,2,3,4,5,6,7,8,9].map((i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="p-3 border border-slate-200 font-medium text-slate-800">
                      {t(`nis2Ksc.article21.rows.${i}.req`)}
                    </td>
                    <td className="p-3 border border-slate-200 text-slate-600">
                      {t(`nis2Ksc.article21.rows.${i}.action`)}
                    </td>
                    <td className="p-3 border border-slate-200 text-slate-500 hidden md:table-cell">
                      {t(`nis2Ksc.article21.rows.${i}.evidence`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ────── WHY SOFTWARE ────── */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('nis2Ksc.whySoftware.heading')}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              {t('nis2Ksc.whySoftware.subtitle')}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-3 font-semibold text-red-700 bg-red-50 border border-slate-200">{t('nis2Ksc.whySoftware.colBefore')}</th>
                  <th className="text-left p-3 font-semibold text-emerald-700 bg-emerald-50 border border-slate-200">{t('nis2Ksc.whySoftware.colAfter')}</th>
                </tr>
              </thead>
              <tbody>
                {[0,1,2,3,4,5].map((i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="p-3 border border-slate-200 text-slate-500 line-through decoration-red-300">
                      {t(`nis2Ksc.whySoftware.items.${i}.before`)}
                    </td>
                    <td className="p-3 border border-slate-200 text-slate-700 font-medium">
                      {t(`nis2Ksc.whySoftware.items.${i}.after`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-base px-8">
              <Link to={`/${currentLocale}/contact`} state={{ demo: true }}>
                {t('nis2Ksc.solution.cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* ────── RELATED CONTENT ────── */}
      <Section dark={false}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('nis2Ksc.relatedContent.heading')}
            </h2>
            <p className="text-slate-500">{t('nis2Ksc.relatedContent.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[0,1,2].map((i) => (
              <Link
                key={i}
                to={`/${currentLocale}/blog/${t(`nis2Ksc.relatedContent.articles.${i}.slug`)}`}
                className="block rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-primary/30 hover:shadow-md group"
              >
                <FileText className="h-5 w-5 text-primary mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                  {t(`nis2Ksc.relatedContent.articles.${i}.title`)}
                </h3>
                <p className="text-sm text-slate-500">
                  {t(`nis2Ksc.relatedContent.articles.${i}.desc`)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* ────── FAQ ────── */}
      <FAQSection
        title={t('nis2Ksc.seo.faq1q').includes('NIS2') ? 'NIS2 FAQ' : 'FAQ'}
        faqs={['faq1','faq2','faq3','faq4','faq5','faq6'].map(k => ({
          question: t(`nis2Ksc.seo.${k}q`),
          answer: t(`nis2Ksc.seo.${k}a`),
        }))}
        pageUrl={`https://quantifier.ai/${currentLocale}/frameworks/nis-2/`}
      />
      <section
        id="final-cta"
        className="relative py-24 md:py-32 bg-slate-950 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[140px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('nis2Ksc.finalCta.heading')}
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              {t('nis2Ksc.finalCta.subtitle')}
            </p>

            <div className="flex justify-center">
              <HeroContactForm locale={currentLocale} />
            </div>
          </div>
        </div>
      </section>

      <StickyCta />
    </>
  );
};

export default Nis2Ksc;
