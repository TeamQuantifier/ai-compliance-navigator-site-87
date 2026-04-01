import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldAlert, Target, TrendingDown, CheckCircle, BarChart3, AlertTriangle, Gauge } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const RiskAssessment = () => {
  const { t, currentLocale } = useLanguage();

  return (
    <PageTemplate
      title={t('seo.product.riskAssessment.title')}
      description={t('seo.product.riskAssessment.description')}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('product.riskAssessment.hero.title')}
              </h2>
              <p className="text-xl opacity-90 mb-6">
                {t('product.riskAssessment.hero.subtitle')}
              </p>
              <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90" asChild>
                <Link to={`/${currentLocale}/contact`}>
                  {t('product.riskAssessment.hero.bookDemo')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <div className="space-y-3">
                  {[
                    { level: 'Critical', count: '3', color: 'bg-red-400/30 text-red-200' },
                    { level: 'High', count: '12', color: 'bg-orange-400/30 text-orange-200' },
                    { level: 'Medium', count: '28', color: 'bg-yellow-400/30 text-yellow-200' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.color}`}>{item.level}</span>
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <div className="bg-white/40 rounded-full h-2" style={{ width: `${(parseInt(item.count) / 40) * 100}%` }} />
                      </div>
                      <span className="text-sm font-medium">{item.count}</span>
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
            {t('product.riskAssessment.keyFeatures.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <Target className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('product.riskAssessment.keyFeatures.identification.title')}</h3>
                    <p className="text-muted-foreground">{t('product.riskAssessment.keyFeatures.identification.description')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <Gauge className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('product.riskAssessment.keyFeatures.quantification.title')}</h3>
                    <p className="text-muted-foreground">{t('product.riskAssessment.keyFeatures.quantification.description')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <TrendingDown className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('product.riskAssessment.keyFeatures.mitigation.title')}</h3>
                    <p className="text-muted-foreground">{t('product.riskAssessment.keyFeatures.mitigation.description')}</p>
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
                  <BarChart3 className="h-5 w-5 text-[#9b87f5]" />
                </div>
                <h3 className="text-xl font-bold">{t('product.riskAssessment.detailedFeatures.riskMatrix.title')}</h3>
              </div>
              <p className="text-muted-foreground mb-5">
                {t('product.riskAssessment.detailedFeatures.riskMatrix.description')}
              </p>
              <ul className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{t(`product.riskAssessment.detailedFeatures.riskMatrix.feature${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-[#9b87f5]/20 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-[#9b87f5]" />
                </div>
                <h3 className="text-xl font-bold">{t('product.riskAssessment.detailedFeatures.treatmentPlans.title')}</h3>
              </div>
              <p className="text-muted-foreground mb-5">
                {t('product.riskAssessment.detailedFeatures.treatmentPlans.description')}
              </p>
              <ul className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{t(`product.riskAssessment.detailedFeatures.treatmentPlans.feature${i}`)}</span>
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
                {t('product.riskAssessment.cta.title')}
              </h2>
              <p className="text-xl opacity-90 mb-8">
                {t('product.riskAssessment.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90 px-8" asChild>
                  <Link to={`/${currentLocale}/contact`}>
                    {t('product.riskAssessment.cta.bookDemo')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" className="border-white text-white hover:bg-white/10 border bg-transparent px-8" asChild>
                  <Link to={`/${currentLocale}/plans`}>
                    {t('product.riskAssessment.cta.explorePlans')}
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

export default RiskAssessment;
