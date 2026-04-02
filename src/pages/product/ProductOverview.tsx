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
      {/* Hero */}
      <div className="bg-gradient-to-b from-compliance-50 to-white -mt-12 pt-12 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-heading">
              {t('product.overview.title')}
            </h1>
            <p className="text-xl text-slate-700 mb-8">
              {t('product.overview.subtitle')}
            </p>
            <Button className="group" asChild>
              <Link to={`/${currentLocale}/contact`}>
                {t('product.overview.requestDemo')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="container mx-auto px-4 -mt-8 mb-16">
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6">
          <h2 className="text-xl font-bold text-center mb-6">{t('product.overview.statsTitle')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.key} className="text-center">
                <div className="text-3xl font-bold text-[#7E69AB] mb-1">
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

      {/* Platform Mockup */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto">
          <HomePlatformMockup />
        </div>
      </div>

      {/* Why Quantifier */}
      <div className="container mx-auto px-4 mb-16">
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

      {/* Product Modules Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-6 gradient-heading">
            {t('product.overview.featuresTitle')}
          </h2>
          <p className="text-lg text-slate-700">
            {t('product.overview.featuresDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div key={feature.titleKey} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3">{t(feature.titleKey)}</h3>
              <p className="text-slate-600 mb-4">{t(feature.descKey)}</p>
              <Link to={`/${currentLocale}${feature.href}`} className="flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
                {t('product.overview.learnMore')} <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 mb-8">
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
