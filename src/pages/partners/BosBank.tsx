import PageTemplate from '@/components/PageTemplate';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import {
  Leaf, ArrowRight, Globe, Factory, BarChart3, CheckCircle2,
  Quote, TrendingDown, FileCheck, Users
} from 'lucide-react';
import bosLogo from '@/assets/partners/bos-bank.png';

const brand = {
  hero: 'bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900',
  heroBadge: 'bg-white/10 text-white/80 border border-white/20',
  cardBorder: 'border-slate-200',
  cardBg: 'bg-slate-50',
  cardBg2: 'bg-emerald-50/50',
  accent: 'text-emerald-700',
  accentBg: 'bg-emerald-700',
  quoteBg: 'bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950',
  sectionBg: 'bg-gradient-to-br from-slate-50 to-emerald-50',
  businessBg: 'bg-gradient-to-r from-emerald-900 to-emerald-800',
  btn: 'bg-emerald-700 hover:bg-emerald-800 text-white',
};

const BosBank = () => {
  const { t, currentLocale } = useLanguage();
  const contactPath = `/${currentLocale}/contact`;
  const calculatorUrl = 'https://www.envirly.pl/';

  const scopes = [
    { icon: <Factory className="h-6 w-6" />, key: 'bos.scope1' },
    { icon: <BarChart3 className="h-6 w-6" />, key: 'bos.scope2' },
    { icon: <TrendingDown className="h-6 w-6" />, key: 'bos.scope3' },
  ];

  const audiences = [
    { icon: <FileCheck className="h-5 w-5" />, key: 'bos.audience.beginners' },
    { icon: <Users className="h-5 w-5" />, key: 'bos.audience.experienced' },
    { icon: <Globe className="h-5 w-5" />, key: 'bos.audience.supplyChain' },
    { icon: <Leaf className="h-5 w-5" />, key: 'bos.audience.strategy' },
  ];

  return (
    <PageTemplate title={t('seo.bos.title')} description={t('seo.bos.description')}>
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <section className={`relative mb-20 ${brand.hero} rounded-3xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.15),transparent_60%)]" />
          <div className="relative py-12 px-6 md:px-12">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
              <img src={bosLogo} alt="BOŚ Bank logo" className="h-14 w-auto bg-white rounded-lg px-3 py-2 self-start shrink-0" />
              <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase ${brand.heroBadge} self-start sm:self-auto max-w-full`}>
                <Globe className="h-4 w-4 shrink-0" />
                {t('bos.hero.eyebrow')}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              {t('bos.hero.title')}
            </h1>

            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mb-8 leading-relaxed">
              {t('bos.hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className={`text-lg px-8 py-6 group ${brand.btn}`} asChild>
                <a href={calculatorUrl} target="_blank" rel="noopener noreferrer">
                  {t('bos.hero.cta')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 group border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white" asChild>
                <Link to={contactPath}>
                  {t('bos.hero.secondaryCta')}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Partnership intro */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">{t('bos.partnership.title')}</h2>
              <p className="text-lg text-muted-foreground mb-4">{t('bos.partnership.p1')}</p>
              <p className="text-lg text-muted-foreground whitespace-pre-line">{t('bos.partnership.p2')}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className={`p-6 text-center ${brand.cardBorder} ${brand.cardBg}`}>
                <Leaf className={`h-10 w-10 ${brand.accent} mx-auto mb-3`} />
                <p className="font-bold text-lg text-foreground">Envirly GHG</p>
                <p className="text-sm text-muted-foreground mt-1">{t('bos.partnership.ghgLabel')}</p>
              </Card>
              <Card className={`p-6 text-center ${brand.cardBorder} ${brand.cardBg2}`}>
                <CheckCircle2 className={`h-10 w-10 ${brand.accent} mx-auto mb-3`} />
                <p className="font-bold text-lg text-foreground">3 zakresy</p>
                <p className="text-sm text-muted-foreground mt-1">{t('bos.partnership.scopeLabel')}</p>
              </Card>
              <Card className={`p-6 text-center ${brand.cardBorder} ${brand.cardBg2}`}>
                <BarChart3 className={`h-10 w-10 ${brand.accent} mx-auto mb-3`} />
                <p className="font-bold text-2xl text-foreground">3 mies.</p>
                <p className="text-sm text-muted-foreground mt-1">{t('bos.partnership.periodLabel')}</p>
              </Card>
              <Card className={`p-6 text-center ${brand.cardBorder} ${brand.cardBg}`}>
                <Factory className={`h-10 w-10 ${brand.accent} mx-auto mb-3`} />
                <p className="font-bold text-lg text-foreground">MŚP</p>
                <p className="text-sm text-muted-foreground mt-1">{t('bos.partnership.smeLabel')}</p>
              </Card>
            </div>
          </div>
        </section>

        {/* How it works / Scopes */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('bos.howItWorks.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t('bos.howItWorks.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {scopes.map((s, i) => (
              <Card key={i} className={`p-8 ${brand.cardBorder} hover:shadow-lg transition-shadow h-full`}>
                <div className={`p-3 rounded-xl ${brand.cardBg2} ${brand.accent} w-fit mb-5`}>
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{t(`${s.key}.title`)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(`${s.key}.desc`)}</p>
              </Card>
            ))}
          </div>

          <div className={`${brand.sectionBg} rounded-2xl p-8 md:p-12 mt-8`}>
            <p className="text-lg text-foreground leading-relaxed">{t('bos.howItWorks.platform')}</p>
          </div>
        </section>

        {/* Why it matters */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">{t('bos.why.title')}</h2>
              <p className="text-lg text-muted-foreground mb-6">{t('bos.why.p1')}</p>
              <p className="text-lg text-muted-foreground">{t('bos.why.p2')}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {audiences.map((a, i) => (
                <div key={i} className={`flex items-start gap-4 p-6 rounded-xl ${brand.cardBorder} bg-card hover:bg-emerald-50/50 transition-colors`}>
                  <CheckCircle2 className={`h-6 w-6 ${brand.accent} shrink-0 mt-0.5`} />
                  <p className="text-foreground">{t(a.key)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quotes */}
        <section className="mb-20 space-y-8">
          <div className={`relative ${brand.quoteBg} rounded-2xl p-10 md:p-14 overflow-hidden border border-emerald-700/20`}>
            <Quote className="absolute top-6 left-6 h-20 w-20 text-emerald-500/10" />
            <blockquote className="relative z-10">
              <p className="text-xl md:text-2xl font-medium italic leading-relaxed mb-6 text-white whitespace-pre-line">
                &ldquo;{t('bos.quote1.text')}&rdquo;
              </p>
              <footer>
                <cite className="not-italic font-bold text-lg text-white">{t('bos.quote1.author')}</cite>
                <p className="text-white/60 text-sm">{t('bos.quote1.role')}</p>
              </footer>
            </blockquote>
          </div>

          <div className={`relative ${brand.quoteBg} rounded-2xl p-10 md:p-14 overflow-hidden border border-emerald-700/20`}>
            <Quote className="absolute top-6 left-6 h-20 w-20 text-emerald-500/10" />
            <blockquote className="relative z-10">
              <p className="text-xl md:text-2xl font-medium italic leading-relaxed mb-6 text-white whitespace-pre-line">
                &ldquo;{t('bos.quote2.text')}&rdquo;
              </p>
              <footer>
                <cite className="not-italic font-bold text-lg text-white">{t('bos.quote2.author')}</cite>
                <p className="text-white/60 text-sm">{t('bos.quote2.role')}</p>
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Strategy */}
        <section className="mb-20">
          <div className={`${brand.businessBg} rounded-2xl p-10 md:p-14`}>
            <h2 className="text-3xl font-bold mb-4 text-white">{t('bos.strategy.title')}</h2>
            <p className="text-xl text-white/80 mb-8 max-w-3xl whitespace-pre-line">{t('bos.strategy.desc')}</p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold mb-2 text-white">ESG</p>
                <p className="text-sm text-white/70">{t('bos.strategy.esg')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold mb-2 text-white">MŚP</p>
                <p className="text-sm text-white/70">{t('bos.strategy.sme')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold mb-2 text-white">Net Zero</p>
                <p className="text-sm text-white/70">{t('bos.strategy.netZero')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mb-16">
          <div className="bg-slate-50 rounded-2xl p-8 md:p-12 text-center border border-slate-200">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t('bos.cta.title')}</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{t('bos.cta.subtitle')}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className={`text-lg px-8 py-6 group ${brand.btn}`} asChild>
                <a href={calculatorUrl} target="_blank" rel="noopener noreferrer">
                  {t('bos.cta.button')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 group" asChild>
                <Link to={contactPath}>
                  {t('bos.cta.secondaryButton')}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default BosBank;
