
import PageTemplate from '@/components/PageTemplate';
import { 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  FileCheck, 
  ServerCrash,
  BarChart4, 
  FileWarning,
  Building,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AiComplianceDashboard from '@/components/mockups/AiComplianceDashboard';
import { useLanguage } from '@/contexts/LanguageContext';

const Dora = () => {
  const { t, currentLocale } = useLanguage();

  return (
    <PageTemplate
      title={t('doraPage.title')}
      description={t('doraPage.description')}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('doraPage.hero.title')}
              </h2>
              <p className="text-xl opacity-90 mb-6">
                {t('doraPage.hero.subtitle')}
              </p>
              <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90" asChild>
                <a href={`/${currentLocale}/contact`}>
                  {t('doraPage.hero.button')} <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
            <div className="md:w-2/5">
              <div className="bg-white/5 backdrop-blur-sm p-3 rounded-lg shadow-xl border border-white/20">
                <AiComplianceDashboard 
                  title="DORA Compliance" 
                  themeColor="#6E59A5" 
                  variant="compact"
                />
              </div>
            </div>
          </div>
        </section>

        {/* What is DORA Section */}
        <section className="mb-16">
          <div className="bg-[#E5DEFF]/40 p-8 rounded-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#1A1F2C]">
              {t('doraPage.whatIs.title')}
            </h2>
            <p className="text-lg text-slate-700 mb-8 max-w-4xl mx-auto">
              {t('doraPage.whatIs.description')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5DEFF]">
                <h3 className="text-xl font-semibold mb-4 text-[#7E69AB]">{t('doraPage.whatIs.keyRequirements.title')}</h3>
                <ul className="space-y-3">
                  {(t('doraPage.whatIs.keyRequirements.items', { returnObjects: true }) as string[]).map((item, index) => (
                    <li key={index} className="flex items-start">
                      {index === 0 && <AlertTriangle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />}
                      {index === 1 && <FileWarning className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />}
                      {index === 2 && <ServerCrash className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />}
                      {index === 3 && <Building className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5DEFF]">
                <h3 className="text-xl font-semibold mb-4 text-[#7E69AB]">{t('doraPage.whatIs.whoMustComply.title')}</h3>
                <p className="text-slate-700 mb-4">
                  {t('doraPage.whatIs.whoMustComply.description')}
                </p>
                <ul className="space-y-3">
                  {(t('doraPage.whatIs.whoMustComply.items', { returnObjects: true }) as string[]).map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How Quantifier Helps Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#1A1F2C]">
            {t('doraPage.howQuantifierHelps.title')}
          </h2>
          
          <div className="mb-10">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E5DEFF]">
              <h3 className="text-xl font-semibold mb-4 text-[#7E69AB] flex items-center">
                <Shield className="h-5 w-5 text-[#9b87f5] mr-3 flex-shrink-0" />
                {t('doraPage.howQuantifierHelps.dashboard.title')}
              </h3>
              <p className="text-slate-700 mb-4">
                {t('doraPage.howQuantifierHelps.dashboard.description')}
              </p>
              <div className="rounded-lg overflow-hidden border border-[#E5DEFF]">
                <AiComplianceDashboard 
                  title="DORA Operational Resilience" 
                  themeColor="#6E59A5"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <Shield className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('doraPage.howQuantifierHelps.features.riskMonitoring.title')}</h3>
                    <p className="text-slate-600">{t('doraPage.howQuantifierHelps.features.riskMonitoring.description')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <FileCheck className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('doraPage.howQuantifierHelps.features.incidentResponse.title')}</h3>
                    <p className="text-slate-600">{t('doraPage.howQuantifierHelps.features.incidentResponse.description')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <Building className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('doraPage.howQuantifierHelps.features.thirdPartyRisk.title')}</h3>
                    <p className="text-slate-600">{t('doraPage.howQuantifierHelps.features.thirdPartyRisk.description')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('doraPage.cta.title')}
              </h2>
              <p className="text-xl opacity-90 mb-8">
                {t('doraPage.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90 px-8" asChild>
                  <a href={`/${currentLocale}/contact`}>
                    {t('doraPage.cta.bookDemo')} <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                  <a href={`/${currentLocale}/plans`}>
                    {t('doraPage.cta.explorePlans')}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default Dora;
