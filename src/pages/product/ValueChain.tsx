import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Link2, Layers, BarChart3, CheckCircle, Globe, ClipboardCheck, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const ValueChain = () => {
  const { t, currentLocale } = useLanguage();

  return (
    <PageTemplate
      title={t('seo.product.valueChain.title')}
      description={t('seo.product.valueChain.description')}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('product.valueChain.hero.title')}
              </h2>
              <p className="text-xl opacity-90 mb-6">
                {t('product.valueChain.hero.subtitle')}
              </p>
              <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90" asChild>
                <Link to={`/${currentLocale}/contact`}>
                  {t('product.valueChain.hero.bookDemo')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <div className="space-y-3">
                  {[
                    { step: '01', label: 'Supplier Assessment' },
                    { step: '02', label: 'Risk Scoring' },
                    { step: '03', label: 'Continuous Monitoring' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                      <span className="text-xs font-bold bg-white/20 rounded-full h-8 w-8 flex items-center justify-center">{item.step}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                      <CheckCircle className="h-4 w-4 ml-auto text-green-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-foreground">
            {t('product.valueChain.keyFeatures.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <Link2 className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('product.valueChain.keyFeatures.supplierMapping.title')}</h3>
                    <p className="text-muted-foreground">{t('product.valueChain.keyFeatures.supplierMapping.description')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <Layers className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('product.valueChain.keyFeatures.dueDiligence.title')}</h3>
                    <p className="text-muted-foreground">{t('product.valueChain.keyFeatures.dueDiligence.description')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <BarChart3 className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('product.valueChain.keyFeatures.riskScoring.title')}</h3>
                    <p className="text-muted-foreground">{t('product.valueChain.keyFeatures.riskScoring.description')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Detailed Features */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-[#9b87f5]/20 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-[#9b87f5]" />
                </div>
                <h3 className="text-xl font-bold">{t('product.valueChain.detailedFeatures.esgSupplyChain.title')}</h3>
              </div>
              <p className="text-muted-foreground mb-5">
                {t('product.valueChain.detailedFeatures.esgSupplyChain.description')}
              </p>
              <ul className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{t(`product.valueChain.detailedFeatures.esgSupplyChain.feature${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-[#9b87f5]/20 flex items-center justify-center">
                  <ClipboardCheck className="h-5 w-5 text-[#9b87f5]" />
                </div>
                <h3 className="text-xl font-bold">{t('product.valueChain.detailedFeatures.complianceTracking.title')}</h3>
              </div>
              <p className="text-muted-foreground mb-5">
                {t('product.valueChain.detailedFeatures.complianceTracking.description')}
              </p>
              <ul className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{t(`product.valueChain.detailedFeatures.complianceTracking.feature${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('product.valueChain.cta.title')}
              </h2>
              <p className="text-xl opacity-90 mb-8">
                {t('product.valueChain.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90 px-8" asChild>
                  <Link to={`/${currentLocale}/contact`}>
                    {t('product.valueChain.cta.bookDemo')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" className="border-white text-white hover:bg-white/10 border bg-transparent px-8" asChild>
                  <Link to={`/${currentLocale}/plans`}>
                    {t('product.valueChain.cta.explorePlans')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default ValueChain;
