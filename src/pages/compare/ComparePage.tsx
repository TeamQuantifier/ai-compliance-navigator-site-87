import { useParams, Navigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getComparePageBySlug } from '@/data/compareData';
import PageTemplate from '@/components/PageTemplate';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, X, Minus, ArrowRight, Shield, Zap, Globe, BarChart3, Bot, FileCheck, HelpCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import FAQSection from '@/components/seo/FAQSection';

const ComparePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, currentLocale } = useLanguage();

  const config = slug ? getComparePageBySlug(slug) : undefined;

  if (!config) {
    return <Navigate to={`/${currentLocale}/product`} replace />;
  }

  const ns = `compare.${config.i18nKey}`;
  const title = t(`${ns}.seo.title`);
  const description = t(`${ns}.seo.description`);

  const featureKeys = [
    'multiFramework',
    'aiWorkflows',
    'continuousMonitoring',
    'nis2Support',
    'doraSupport',
    'esgCsrd',
    'supplyChain',
    'euHosting',
    'evidenceCollection',
    'riskAssessment',
  ];

  const getIcon = (value: string) => {
    if (value === 'true' || value === 'yes') return <Check className="h-5 w-5 text-green-600 mx-auto" />;
    if (value === 'partial') return <Minus className="h-5 w-5 text-amber-500 mx-auto" />;
    if (value === 'unconfirmed') return <span className="text-xs text-muted-foreground">{t('compare.common.unconfirmed')}</span>;
    return <X className="h-5 w-5 text-red-400 mx-auto" />;
  };

  const differentiatorIcons = [Bot, Shield, Globe, BarChart3, FileCheck, Zap];

  // Build FAQ data
  const faqItems: { question: string; answer: string }[] = [];
  for (let i = 0; i < 6; i++) {
    const qKey = `${ns}.faq.items.${i}.question`;
    const aKey = `${ns}.faq.items.${i}.answer`;
    const q = t(qKey);
    if (q === qKey) break;
    faqItems.push({ question: q, answer: t(aKey) });
  }

  // Build list items for sections
  const getListItems = (sectionKey: string): string[] => {
    const items: string[] = [];
    for (let i = 0; i < 8; i++) {
      const key = `${ns}.${sectionKey}.items.${i}`;
      const val = t(key);
      if (val === key) break;
      items.push(val);
    }
    return items;
  };

  const bestForItems = getListItems('bestFor');
  const whenQuantifierItems = getListItems('whenQuantifier');
  const whenCompetitorItems = getListItems('whenCompetitor');
  const whyEuItems = getListItems('whyEu');

  return (
    <PageTemplate title={title} description={description}>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: title,
            description,
            url: `https://quantifier.ai/${currentLocale}/compare/${config.slug}/`,
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: [
                {
                  '@type': 'SoftwareApplication',
                  name: 'Quantifier.ai',
                  applicationCategory: 'BusinessApplication',
                  url: 'https://quantifier.ai',
                },
                {
                  '@type': 'SoftwareApplication',
                  name: config.competitor,
                  applicationCategory: 'BusinessApplication',
                  ...(config.competitorUrl && { url: config.competitorUrl }),
                },
              ],
            },
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            {t(`${ns}.hero.badge`)}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            {t(`${ns}.hero.heading`)}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t(`${ns}.hero.subheading`)}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="px-8 py-6 text-lg">
              <Link to={`/${currentLocale}/contact`}>
                {t('compare.common.requestDemo')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg group">
              <Link to={`/${currentLocale}/plans`}>
                {t('compare.common.viewPricing')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            {t(`${ns}.table.heading`)}
          </h2>

          {/* Legend */}
          <div className="flex flex-wrap gap-6 justify-center mb-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-green-600" /> {t('compare.common.legendYes')}</span>
            <span className="flex items-center gap-1.5"><Minus className="h-4 w-4 text-amber-500" /> {t('compare.common.legendPartial')}</span>
            <span className="flex items-center gap-1.5"><X className="h-4 w-4 text-red-400" /> {t('compare.common.legendNo')}</span>
            <span className="flex items-center gap-1.5"><HelpCircle className="h-4 w-4 text-muted-foreground" /> {t('compare.common.unconfirmed')}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-4 px-4 text-muted-foreground font-medium w-1/2">
                    {t('compare.common.feature')}
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-primary w-1/4">
                    Quantifier.ai
                  </th>
                  <th className="text-center py-4 px-4 font-medium text-muted-foreground w-1/4">
                    {config.competitor}
                  </th>
                </tr>
              </thead>
              <tbody>
                {featureKeys.map((key, i) => (
                  <tr key={key} className={`border-b border-border ${i % 2 === 0 ? 'bg-muted/30' : ''}`}>
                    <td className="py-4 px-4 text-foreground font-medium">
                      {t(`compare.common.features.${key}`)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {getIcon(t(`${ns}.comparison.${key}.quantifier`))}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {getIcon(t(`${ns}.comparison.${key}.competitor`))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 space-y-2 text-xs text-muted-foreground">
            <p>{t(`${ns}.disclaimer`)}</p>
            <p>{t('compare.common.legendNote')}</p>
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            {t(`${ns}.differentiators.heading`)}
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            {t(`${ns}.differentiators.subheading`)}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const Icon = differentiatorIcons[i] || Shield;
              const titleKey = `${ns}.differentiators.items.${i}.title`;
              const descKey = `${ns}.differentiators.items.${i}.desc`;
              const titleVal = t(titleKey);
              if (titleVal === titleKey) return null;
              return (
                <div key={i} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{titleVal}</h3>
                  <p className="text-muted-foreground">{t(descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who this alternative is best for */}
      {bestForItems.length > 0 && (
        <section className="pb-16 md:pb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              {t(`${ns}.bestFor.heading`)}
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
              {t(`${ns}.bestFor.subheading`)}
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {bestForItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                  <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* When Quantifier is the better fit */}
      {whenQuantifierItems.length > 0 && (
        <section className="pb-16 md:pb-24 bg-primary/5 py-16 md:py-24 -mx-4 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              {t(`${ns}.whenQuantifier.heading`)}
            </h2>
            <ul className="space-y-3 max-w-2xl mx-auto mt-8">
              {whenQuantifierItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* When the competitor may be the better fit */}
      {whenCompetitorItems.length > 0 && (
        <section className="pb-16 md:pb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              {t(`${ns}.whenCompetitor.heading`)}
            </h2>
            <ul className="space-y-3 max-w-2xl mx-auto mt-8">
              {whenCompetitorItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Why EU-regulated teams may prefer Quantifier */}
      {whyEuItems.length > 0 && (
        <section className="pb-16 md:pb-24 bg-muted/30 py-16 md:py-24 -mx-4 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              {t(`${ns}.whyEu.heading`)}
            </h2>
            <ul className="space-y-3 max-w-2xl mx-auto mt-8">
              {whyEuItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqItems.length > 0 && (
        <FAQSection
          title={t(`${ns}.faq.heading`)}
          faqs={faqItems}
          pageUrl={`https://quantifier.ai/${currentLocale}/compare/${config.slug}/`}
        />
      )}

      {/* Related Reading */}
      {config.slug === 'vanta-alternative' && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 text-foreground">{t('compare.common.relatedReading')}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to={`/${currentLocale}/blog/vanta-alternatives-europe-eu-compliance`} className="block p-5 rounded-lg border border-border hover:border-primary/50 transition-colors bg-card">
                <h3 className="font-semibold text-foreground mb-2">{currentLocale === 'pl' ? 'Alternatywy dla Vanta w Europie' : 'Top Vanta Alternatives for EU Companies'}</h3>
                <p className="text-sm text-muted-foreground">{currentLocale === 'pl' ? 'Porównanie 5 platform compliance pod kątem NIS2, DORA i hostingu EU.' : 'Compare 5 compliance platforms on NIS2, DORA support, EU data hosting.'}</p>
              </Link>
              <Link to={`/${currentLocale}/blog/iso-27001-vs-soc-2-comparison`} className="block p-5 rounded-lg border border-border hover:border-primary/50 transition-colors bg-card">
                <h3 className="font-semibold text-foreground mb-2">{currentLocale === 'pl' ? 'ISO 27001 vs SOC 2: Porównanie' : 'ISO 27001 vs SOC 2: Which Do You Need?'}</h3>
                <p className="text-sm text-muted-foreground">{currentLocale === 'pl' ? 'Zakres, koszty, timeline i pokrycie kontroli — kompleksowe porównanie.' : 'Scope, cost, timeline, control overlap — complete comparison.'}</p>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t(`${ns}.cta.heading`)}
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            {t(`${ns}.cta.subheading`)}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-white/90 px-8 py-6 text-lg">
              <Link to={`/${currentLocale}/contact`}>
                {t('compare.common.requestDemo')}
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg">
              <Link to={`/${currentLocale}/frameworks`}>
                {t('compare.common.seeFrameworks')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
};

export default ComparePage;
