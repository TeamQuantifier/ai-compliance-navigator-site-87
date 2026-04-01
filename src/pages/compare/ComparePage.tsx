import { useParams, Navigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getComparePageBySlug } from '@/data/compareData';
import PageTemplate from '@/components/PageTemplate';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, X, Minus, ArrowRight, Shield, Zap, Globe, BarChart3, Bot, FileCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

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

  // Feature comparison rows
  const featureKeys = [
    'multiFramework',
    'aiComplianceOfficer',
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
    if (value === 'true' || value === 'yes') return <Check className="h-5 w-5 text-green-600" />;
    if (value === 'partial') return <Minus className="h-5 w-5 text-amber-500" />;
    return <X className="h-5 w-5 text-red-400" />;
  };

  // Differentiators
  const differentiatorIcons = [Bot, Shield, Globe, BarChart3, FileCheck, Zap];

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
              // Skip if key returns itself (no translation)
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
            <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg">
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
