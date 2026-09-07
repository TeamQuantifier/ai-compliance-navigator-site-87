import { useParams } from 'react-router-dom';
import PageTemplate from '@/components/PageTemplate';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Factory, BarChart3, TrendingDown, Leaf, Building2, Target, Globe, CheckCircle2, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import bosLogo from '@/assets/partners/bos-bank.png';

export default function BosBank() {
  const { t } = useTranslation();
  const { locale = 'pl' } = useParams<{ locale?: string }>();
  const calculatorUrl = 'https://www.bosbank.pl/kalkulator-sladu-weglowego';


  const brand = {
    hero: 'bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900',
    badge: 'bg-white/10 text-white/80 border border-white/20',
    accent: 'text-emerald-700',
    accentBg: 'bg-emerald-700',
    quoteBg: 'from-emerald-950 via-emerald-900 to-emerald-950',
    sectionBg: 'from-slate-50 to-emerald-50',
    businessBg: 'from-emerald-900 to-emerald-800',
    btn: 'bg-emerald-700 hover:bg-emerald-800 text-white',
    cardBorder: 'border-slate-200',
    cardBg: 'bg-slate-50',
    cardBg2: 'bg-emerald-50/50',
  };

  const scopes = [
    {
      key: 'scope1',
      icon: Factory,
    },
    {
      key: 'scope2',
      icon: BarChart3,
    },
    {
      key: 'scope3',
      icon: TrendingDown,
    },
  ];

  const audiences = [
    t('bos.audience.beginners'),
    t('bos.audience.experienced'),
    t('bos.audience.supplyChain'),
    t('bos.audience.strategy'),
  ];

  const strategyCards = [
    { key: 'esg', icon: Globe },
    { key: 'sme', icon: Building2 },
    { key: 'netZero', icon: Leaf },
  ];

  return (
    <PageTemplate title={t('seo.bos.title')} description={t('seo.bos.description')}>
      {/* Hero */}
      <section className={`relative overflow-hidden ${brand.hero} py-20 md:py-28`}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium mb-6 ${brand.badge}`}>
                {t('bos.hero.eyebrow')}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {t('bos.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                {t('bos.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href={calculatorUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className={`${brand.btn} text-base px-8 py-6 h-auto`}>
                    {t('bos.hero.cta')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>

              </div>
            </div>
            <div className="shrink-0">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <img
                  src={bosLogo}
                  alt="BOŚ Bank logo"
                  loading="lazy"
                  width={512}
                  height={512}
                  className="w-48 h-48 md:w-64 md:h-64 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{t('bos.partnership.title')}</h2>
            <p className="text-slate-600 leading-relaxed mb-4">{t('bos.partnership.p1')}</p>
            <p className="text-slate-600 leading-relaxed">{t('bos.partnership.p2')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: t('bos.partnership.ghgLabel'), icon: BarChart3 },
              { label: t('bos.partnership.scopeLabel'), icon: TrendingDown },
              { label: t('bos.partnership.periodLabel'), icon: CheckCircle2 },
              { label: t('bos.partnership.smeLabel'), icon: Building2 },
            ].map((item) => (
              <Card key={item.label} className={`p-6 text-center border ${brand.cardBorder} ${brand.cardBg} hover:shadow-lg transition-shadow`}>
                <item.icon className={`h-8 w-8 mx-auto mb-3 ${brand.accent}`} />
                <p className="text-sm font-semibold text-slate-900 whitespace-pre-line">{item.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works / Scopes */}
      <section className={`py-16 md:py-24 bg-gradient-to-b ${brand.sectionBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{t('bos.howItWorks.title')}</h2>
            <p className="text-slate-600">{t('bos.howItWorks.subtitle')}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 mb-12">
            <p className="text-slate-700 leading-relaxed text-center md:text-left">{t('bos.howItWorks.platform')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {scopes.map((scope) => {
              const Icon = scope.icon;
              return (
                <Card key={scope.key} className={`p-6 md:p-8 border ${brand.cardBorder} ${brand.cardBg2}`}>
                  <Icon className={`h-10 w-10 mb-4 ${brand.accent}`} />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{t(`bos.${scope.key}.title`)}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{t(`bos.${scope.key}.desc`)}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">{t('bos.why.title')}</h2>
              <p className="text-slate-600 leading-relaxed mb-4">{t('bos.why.p1')}</p>
              <p className="text-slate-600 leading-relaxed">{t('bos.why.p2')}</p>
            </div>
            <div className={`rounded-2xl p-8 md:p-10 text-white bg-gradient-to-br ${brand.businessBg}`}>
              <h3 className="text-xl font-bold mb-6">{t('bos.audience.title')}</h3>
              <ul className="space-y-4">
                {audiences.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-emerald-300" />
                    <span className="text-white/90 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quotes */}
      <section className={`py-16 md:py-24 bg-gradient-to-br ${brand.quoteBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {['quote1', 'quote2'].map((q) => (
              <Card key={q} className="p-8 bg-white/5 border-white/10 text-white">
                <Quote className="h-8 w-8 text-emerald-400 mb-4" />
                <p className="text-white/90 leading-relaxed mb-6 italic">{t(`bos.${q}.text`)}</p>
                <div>
                  <p className="font-semibold text-white">{t(`bos.${q}.author`)}</p>
                  <p className="text-sm text-white/70">{t(`bos.${q}.role`)}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Strategy */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{t('bos.strategy.title')}</h2>
            <p className="text-slate-600 leading-relaxed">{t('bos.strategy.desc')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {strategyCards.map((card) => {
              const Icon = card.icon;
              return (
                <Card key={card.key} className={`p-6 text-center border ${brand.cardBorder} ${brand.cardBg}`}>
                  <Icon className={`h-8 w-8 mx-auto mb-3 ${brand.accent}`} />
                  <p className="font-semibold text-slate-900">{t(`bos.strategy.${card.key}`)}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={`py-16 md:py-24 ${brand.hero}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">{t('bos.cta.title')}</h2>
          <p className="text-white/80 mb-8 text-lg">{t('bos.cta.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={calculatorUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className={`${brand.btn} text-base px-8 py-6 h-auto`}>
                {t('bos.cta.button')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <a href={contactPath}>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white text-base px-8 py-6 h-auto">
                {t('bos.cta.secondaryButton')}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
}
