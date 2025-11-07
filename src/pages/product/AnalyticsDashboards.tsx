
import PageTemplate from '@/components/PageTemplate';
import { ArrowRight, BarChart4, Shield, CheckCircle, FileText, PieChart, BrainCircuit, Activity, AlertTriangle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AiComplianceDashboard from '@/components/mockups/AiComplianceDashboard';
import { useLanguage } from '@/contexts/LanguageContext';

const AnalyticsDashboards = () => {
  const { t } = useLanguage();
  
  return (
    <PageTemplate
      title={t('product.analyticsDashboards.title')}
      description={t('product.analyticsDashboards.description')}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('product.analyticsDashboards.hero.title')}
              </h2>
              <p className="text-xl opacity-90 mb-6">
                {t('product.analyticsDashboards.hero.subtitle')}
              </p>
              <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90">
                {t('product.analyticsDashboards.hero.bookDemo')} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white/5 backdrop-blur-sm p-3 rounded-lg shadow-xl border border-white/20">
                <AiComplianceDashboard />
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Features */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#1A1F2C]">
            {t('product.analyticsDashboards.keyFeatures.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <BarChart4 className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('product.analyticsDashboards.keyFeatures.realTime.title')}</h3>
                    <p className="text-slate-600">{t('product.analyticsDashboards.keyFeatures.realTime.description')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <BrainCircuit className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('product.analyticsDashboards.keyFeatures.aiInsights.title')}</h3>
                    <p className="text-slate-600">{t('product.analyticsDashboards.keyFeatures.aiInsights.description')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <AlertTriangle className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('product.analyticsDashboards.keyFeatures.riskAssessment.title')}</h3>
                    <p className="text-slate-600">{t('product.analyticsDashboards.keyFeatures.riskAssessment.description')}</p>
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
                  <Activity className="h-5 w-5 text-[#9b87f5]" />
                </div>
                <h3 className="text-xl font-bold">{t('product.analyticsDashboards.detailedFeatures.reporting.title')}</h3>
              </div>
              <p className="text-slate-700 mb-5">
                {t('product.analyticsDashboards.detailedFeatures.reporting.description')}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">{t('product.analyticsDashboards.detailedFeatures.reporting.feature1')}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">{t('product.analyticsDashboards.detailedFeatures.reporting.feature2')}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">{t('product.analyticsDashboards.detailedFeatures.reporting.feature3')}</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-[#9b87f5]/20 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-[#9b87f5]" />
                </div>
                <h3 className="text-xl font-bold">{t('product.analyticsDashboards.detailedFeatures.automation.title')}</h3>
              </div>
              <p className="text-slate-700 mb-5">
                {t('product.analyticsDashboards.detailedFeatures.automation.description')}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">{t('product.analyticsDashboards.detailedFeatures.automation.feature1')}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">{t('product.analyticsDashboards.detailedFeatures.automation.feature2')}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">{t('product.analyticsDashboards.detailedFeatures.automation.feature3')}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('product.analyticsDashboards.cta.title')}
              </h2>
              <p className="text-xl opacity-90 mb-8">
                {t('product.analyticsDashboards.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90 px-8">
                  {t('product.analyticsDashboards.cta.bookDemo')} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  {t('product.analyticsDashboards.cta.explorePlans')}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default AnalyticsDashboards;
