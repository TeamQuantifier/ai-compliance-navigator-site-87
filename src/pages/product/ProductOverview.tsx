import { ArrowRight, Shield, CheckCircle, ChevronRight, Brain, BarChart3, FileText, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import PageTemplate from '@/components/PageTemplate';
import HomePlatformMockup from '@/components/mockups/HomePlatformMockup';

const ProductOverview = () => {
  const { t, currentLocale } = useLanguage();
  
  const features = [
    { titleKey: 'product.overview.features.mainFeatures.title', href: "/product", descKey: 'product.overview.features.mainFeatures.description' },
    { titleKey: 'product.overview.features.aiOfficer.title', href: "/product/ai-compliance-officer", descKey: 'product.overview.features.aiOfficer.description' },
    { titleKey: 'product.overview.features.taskDataManagement.title', href: "/product/task-data-management", descKey: 'product.overview.features.taskDataManagement.description' },
    { titleKey: 'product.overview.features.documents.title', href: "/product/documents-management", descKey: 'product.overview.features.documents.description' },
    { titleKey: 'product.overview.features.valueChain.title', href: "/product/value-chain", descKey: 'product.overview.features.valueChain.description' },
    { titleKey: 'product.overview.features.riskAssessment.title', href: "/product/risk-assessment", descKey: 'product.overview.features.riskAssessment.description' },
    { titleKey: 'product.overview.features.analytics.title', href: "/product/analytics-dashboards", descKey: 'product.overview.features.analytics.description' },
  ];

  const stats = [
    { key: 'frameworks' },
    { key: 'controls' },
    { key: 'timeSaved' },
    { key: 'auditReady' },
  ];

  const whyItems = [
    { icon: Brain, key: 'aiNative' },
    { icon: Globe, key: 'multiFramework' },
    { icon: BarChart3, key: 'fastDeployment' },
    { icon: Shield, key: 'rolesBuiltIn' },
  ];

  return (
    <PageTemplate
      title={t('seo.product.overview.title')}
      description={t('seo.product.overview.description')}
    >
      {/* Hero — light */}
      <section className="relative overflow-hidden -mt-12 pt-24 pb-20 bg-background">
        <div className="absolute top-20 -left-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-10 right-0 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {t('product.overview.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t('product.overview.subtitle')}
            </p>
            <Button className="group bg-primary hover:bg-primary/90" asChild>
              <Link to={`/${currentLocale}/contact`}>
                {t('product.overview.requestDemo')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl border border-border bg-card shadow-sm p-6">
              <h2 className="text-lg font-bold text-center mb-6 text-foreground">{t('product.overview.statsTitle')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <div key={stat.key} className="text-center">
                    <div className="text-3xl font-bold text-secondary mb-1">
                      {t(`product.overview.stats.${stat.key}.value`)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t(`product.overview.stats.${stat.key}.label`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Mockup — dark bg to match mockup's white text */}
      <section className="bg-slate-950 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <HomePlatformMockup />
          </div>
        </div>
      </section>

      {/* Why Quantifier */}
      <div className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">{t('product.overview.whyQuantifier.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyItems.map((item) => (
              <Card key={item.key} className="border-[#9b87f5]/20 hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <item.icon className="h-8 w-8 text-[#7E69AB] mb-4" />
                  <h3 className="font-semibold mb-2">{t(`product.overview.whyQuantifier.items.${item.key}.title`)}</h3>
                  <p className="text-sm text-muted-foreground">{t(`product.overview.whyQuantifier.items.${item.key}.desc`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Product Modules Grid — light */}
      <section className="relative py-16 bg-background overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              {t('product.overview.featuresTitle')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('product.overview.featuresDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {features.map((feature) => (
              <Card key={feature.titleKey} className="hover:shadow-md transition-all border-border">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3 text-foreground">{t(feature.titleKey)}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{t(feature.descKey)}</p>
                  <Link to={`/${currentLocale}${feature.href}`} className="flex items-center text-primary font-medium hover:text-primary/80 transition-colors text-sm">
                    {t('product.overview.learnMore')} <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">{t('product.overview.title')}</h2>
          <p className="text-xl opacity-90 mb-8">{t('product.overview.subtitle')}</p>
          <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90" asChild>
            <Link to={`/${currentLocale}/contact`}>
              {t('product.overview.requestDemo')} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ProductOverview;
