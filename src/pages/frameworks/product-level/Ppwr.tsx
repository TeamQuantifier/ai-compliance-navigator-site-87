import { useEffect, useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import FAQSection from '@/components/seo/FAQSection';
import {
  ArrowRight,
  CalendarClock,
  Package,
  Recycle,
  Factory,
  AlertTriangle,
  FileCheck,
  Ship,
  Users,
  Scale,
  ShieldAlert,
  TrendingUp,
  Layers,
  Database,
  Link2,
  FileText,
  Bot,
  CheckCircle,
} from 'lucide-react';

const TARGET_DATE = new Date('2026-08-12T00:00:00Z').getTime();

const useDaysUntilTarget = () => {
  const compute = () => Math.max(0, Math.ceil((TARGET_DATE - Date.now()) / (1000 * 60 * 60 * 24)));
  const [days, setDays] = useState<number>(compute());
  useEffect(() => {
    const id = setInterval(() => setDays(compute()), 60 * 60 * 1000);
    return () => clearInterval(id);
  }, []);
  return days;
};

const scopeIcons = [Layers, Recycle, FileCheck, Package, Recycle, Factory];
const helpIcons = [Database, FileText, Layers, Link2, FileCheck, Bot];

const Ppwr = () => {
  const { t, currentLocale } = useLanguage();
  const days = useDaysUntilTarget();

  const scope = t('ppwrPage.whatIs.scope', { returnObjects: true }) as Array<{ title: string; description: string }>;
  const actors = t('ppwrPage.whoConcerned.actors', { returnObjects: true }) as string[];
  const timelineSteps = t('ppwrPage.timeline.steps', { returnObjects: true }) as Array<{ date: string; title: string; description: string }>;
  const helpItems = t('ppwrPage.howHelps.items', { returnObjects: true }) as Array<{ title: string; description: string }>;
  const faqItems = t('ppwrPage.faq.items', { returnObjects: true }) as Array<{ question: string; answer: string }>;

  return (
    <PageTemplate
      title={t('ppwrPage.title')}
      description={t('ppwrPage.description')}
    >
      <div className="max-w-6xl mx-auto">

        {/* Hero */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <span className="inline-block bg-emerald-100 text-emerald-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                {t('ppwrPage.hero.badge')}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t('ppwrPage.hero.title')}
              </h1>
              <p className="text-lg text-slate-600 mb-4">
                {t('ppwrPage.hero.subtitle')}
              </p>
              <p className="text-base text-emerald-800 font-medium mb-6">
                {t('ppwrPage.hero.positioning')}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-emerald-700 hover:bg-emerald-800" asChild>
                  <Link to={`/${currentLocale}/contact?topic=ppwr-readiness`}>
                    {t('ppwrPage.hero.ctaPrimary')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-emerald-700 text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900" asChild>
                  <Link to={`/${currentLocale}/contact`}>
                    {t('ppwrPage.hero.ctaSecondary')}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Countdown */}
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/40 to-teal-200/40 rounded-2xl blur-2xl" />
                <Card className="relative p-8 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 text-center">
                  <CalendarClock className="h-8 w-8 text-emerald-700 mx-auto mb-3" />
                  <div className="text-6xl md:text-7xl font-bold text-emerald-800 leading-none tabular-nums">
                    {days}
                  </div>
                  <div className="text-sm font-medium text-slate-600 mt-3">
                    {t('ppwrPage.hero.counterLabel')}
                  </div>
                  <div className="mt-4 pt-4 border-t border-emerald-200 text-xs text-slate-500">
                    12.08.2026
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* What is PPWR */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            {t('ppwrPage.whatIs.title')}
          </h2>
          <p className="text-lg text-slate-700 mb-8 max-w-4xl">
            {t('ppwrPage.whatIs.lead')}
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            {t('ppwrPage.whatIs.scopeTitle')}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.isArray(scope) && scope.map((s, i) => {
              const Icon = scopeIcons[i] || Package;
              return (
                <Card key={i} className="p-5 border-slate-200">
                  <Icon className="h-6 w-6 text-emerald-700 mb-3" />
                  <h4 className="font-semibold text-slate-800 mb-1">{s.title}</h4>
                  <p className="text-sm text-slate-600">{s.description}</p>
                </Card>
              );
            })}
          </div>

          <Card className="mt-6 p-5 bg-slate-50 border-slate-200">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">EU · PL:</span> {t('ppwrPage.whatIs.context')}
            </p>
          </Card>
        </section>

        {/* Who is concerned */}
        <section className="mb-16 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 border border-emerald-100">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            {t('ppwrPage.whoConcerned.title')}
          </h2>
          <p className="text-lg text-slate-700 mb-8 max-w-4xl">
            {t('ppwrPage.whoConcerned.lead')}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <Card className="p-6 md:col-span-2 border-emerald-200 bg-white">
              <div className="flex items-start gap-3 mb-3">
                <Ship className="h-6 w-6 text-emerald-700 flex-shrink-0" />
                <h3 className="font-semibold text-slate-800 text-lg">{t('ppwrPage.whoConcerned.importerTitle')}</h3>
              </div>
              <p className="text-sm text-slate-600">{t('ppwrPage.whoConcerned.importerBody')}</p>
            </Card>

            <Card className="p-6 border-emerald-200 bg-white text-center">
              <TrendingUp className="h-6 w-6 text-emerald-700 mx-auto mb-3" />
              <div className="text-3xl font-bold text-emerald-800 tabular-nums">
                {t('ppwrPage.whoConcerned.statValue')}
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-500 mt-1">
                {t('ppwrPage.whoConcerned.statTitle')}
              </div>
              <p className="text-xs text-slate-600 mt-3">{t('ppwrPage.whoConcerned.statCaption')}</p>
            </Card>
          </div>

          <Card className="p-6 border-emerald-200 bg-white">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-emerald-700" />
              <h3 className="font-semibold text-slate-800">{t('ppwrPage.whoConcerned.actorsTitle')}</h3>
            </div>
            <ul className="grid md:grid-cols-2 gap-2">
              {Array.isArray(actors) && actors.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            {t('ppwrPage.timeline.title')}
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            {t('ppwrPage.timeline.subtitle')}
          </p>

          <div className="relative mb-8">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-emerald-200 -translate-x-1/2" />
            <div className="space-y-8">
              {Array.isArray(timelineSteps) && timelineSteps.map((step, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center gap-4 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`md:w-5/12 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <Card className="p-5 border-emerald-100">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-1 rounded">{step.date}</span>
                      <h4 className="font-semibold text-slate-800 mt-2">{step.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{step.description}</p>
                    </Card>
                  </div>
                  <div className="flex-shrink-0 z-10">
                    <div className="w-4 h-4 bg-emerald-600 rounded-full border-4 border-white shadow" />
                  </div>
                  <div className="md:w-5/12" />
                </div>
              ))}
            </div>
          </div>

          <Card className="p-5 bg-amber-50 border-amber-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-900 mb-1">{t('ppwrPage.timeline.callout.title')}</h4>
                <p className="text-sm text-amber-900/80">{t('ppwrPage.timeline.callout.body')}</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Consequences */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            {t('ppwrPage.consequences.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-red-100 bg-red-50/50">
              <ShieldAlert className="h-7 w-7 text-red-700 mb-3" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('ppwrPage.consequences.regulatoryTitle')}</h3>
              <p className="text-sm text-slate-600">{t('ppwrPage.consequences.regulatoryBody')}</p>
            </Card>
            <Card className="p-6 border-orange-100 bg-orange-50/50">
              <Scale className="h-7 w-7 text-orange-700 mb-3" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('ppwrPage.consequences.commercialTitle')}</h3>
              <p className="text-sm text-slate-600">{t('ppwrPage.consequences.commercialBody')}</p>
            </Card>
            <Card className="p-6 border-amber-100 bg-amber-50/50">
              <TrendingUp className="h-7 w-7 text-amber-700 mb-3" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('ppwrPage.consequences.financialTitle')}</h3>
              <p className="text-sm text-slate-600">{t('ppwrPage.consequences.financialBody')}</p>
            </Card>
          </div>
        </section>

        {/* How platform helps */}
        <section className="mb-16 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-8 border border-emerald-100">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            {t('ppwrPage.howHelps.title')}
          </h2>
          <p className="text-slate-700 mb-8 max-w-4xl">
            {t('ppwrPage.howHelps.subtitle')}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(helpItems) && helpItems.map((item, i) => {
              const Icon = helpIcons[i] || CheckCircle;
              return (
                <Card key={i} className="p-6 border-emerald-100 bg-white/80">
                  <Icon className="h-8 w-8 text-emerald-700 mb-3" />
                  <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </Card>
              );
            })}
          </div>

          {/* Cross-links */}
          <div className="mt-8 flex flex-wrap gap-2 justify-center">
            <Link to={`/${currentLocale}/frameworks/product-level/dpp`} className="text-xs font-medium bg-white border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-full hover:bg-emerald-50">DPP · ESPR</Link>
            <Link to={`/${currentLocale}/frameworks/product-level/lca-analysis`} className="text-xs font-medium bg-white border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-full hover:bg-emerald-50">LCA · ISO 14040</Link>
            <Link to={`/${currentLocale}/frameworks/esg`} className="text-xs font-medium bg-white border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-full hover:bg-emerald-50">CSRD · ESRS E5</Link>
            <Link to={`/${currentLocale}/frameworks/environmental`} className="text-xs font-medium bg-white border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-full hover:bg-emerald-50">Environmental</Link>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection
          title={t('ppwrPage.faq.title')}
          faqs={Array.isArray(faqItems) ? faqItems : []}
          pageUrl={`https://quantifier.ai/${currentLocale}/frameworks/product-level/ppwr/`}
        />

        {/* Final CTA */}
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold mb-3 text-slate-800">
            {t('ppwrPage.cta.title')}
          </h2>
          <p className="text-lg text-slate-700 mb-6 max-w-3xl mx-auto">
            {t('ppwrPage.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-emerald-700 hover:bg-emerald-800" asChild>
              <Link to={`/${currentLocale}/contact`}>
                {t('ppwrPage.cta.primary')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Link
              to={`/${currentLocale}/contact?topic=ppwr-checklist`}
              className="text-sm font-medium text-emerald-800 underline underline-offset-4 hover:text-emerald-900"
            >
              {t('ppwrPage.cta.checklist')}
            </Link>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Ppwr;
