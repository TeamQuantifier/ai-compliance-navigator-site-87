
import PageTemplate from '@/components/PageTemplate';
import { 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  FileCheck, 
  Lock,
  BarChart4, 
  FileWarning,
  ListChecks,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AiComplianceDashboard from '@/components/mockups/AiComplianceDashboard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Iso27001 = () => {
  const { t, currentLocale } = useLanguage();

  return (
    <PageTemplate
      title={t('seo.frameworks.informationSecurity.iso27001.title')}
      description={t('seo.frameworks.informationSecurity.iso27001.description')}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('iso27001Page.hero.title')}
              </h2>
              <p className="text-xl opacity-90 mb-6">
                {t('iso27001Page.hero.subtitle')}
              </p>
              <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90" asChild>
                <Link to={`/${currentLocale}/contact`}>
                  {t('iso27001Page.hero.button')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="md:w-2/5">
              <div className="bg-white/5 backdrop-blur-sm p-3 rounded-lg shadow-xl border border-white/20">
                <AiComplianceDashboard 
                  title="ISO 27001 Compliance" 
                  themeColor="#7E69AB" 
                  variant="compact"
                />
              </div>
            </div>
          </div>
        </section>

        {/* What is ISO 27001 Section */}
        <section className="mb-16">
          <div className="bg-[#E5DEFF]/40 p-8 rounded-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#1A1F2C]">
              {t('iso27001Page.whatIs.title')}
            </h2>
            <p className="text-lg text-slate-700 mb-8 max-w-4xl mx-auto">
              {t('iso27001Page.whatIs.description')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5DEFF]">
                <h3 className="text-xl font-semibold mb-4 text-[#7E69AB]">{t('iso27001Page.whatIs.keyRequirements.title')}</h3>
                <ul className="space-y-3">
                  {(t('iso27001Page.whatIs.keyRequirements.items', { returnObjects: true }) as string[]).map((item, index) => (
                    <li key={index} className="flex items-start">
                      {index === 0 && <AlertTriangle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />}
                      {index === 1 && <FileWarning className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />}
                      {index === 2 && <ListChecks className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />}
                      {index === 3 && <Lock className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5DEFF]">
                <h3 className="text-xl font-semibold mb-4 text-[#7E69AB]">{t('iso27001Page.whatIs.benefits.title')}</h3>
                <ul className="space-y-3">
                  {(t('iso27001Page.whatIs.benefits.items', { returnObjects: true }) as string[]).map((item, index) => (
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
            {t('iso27001Page.howQuantifierHelps.title')}
          </h2>
          
          <div className="mb-10">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E5DEFF]">
              <h3 className="text-xl font-semibold mb-4 text-[#7E69AB] flex items-center">
                <Shield className="h-5 w-5 text-[#9b87f5] mr-3 flex-shrink-0" />
                {t('iso27001Page.howQuantifierHelps.dashboard.title')}
              </h3>
              <p className="text-slate-700 mb-4">
                {t('iso27001Page.howQuantifierHelps.dashboard.description')}
              </p>
              <div className="rounded-lg overflow-hidden border border-[#E5DEFF]">
                <AiComplianceDashboard 
                  title="ISO 27001 Security Compliance" 
                  themeColor="#7E69AB"
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
                    <h3 className="font-semibold text-lg mb-2">{t('iso27001Page.howQuantifierHelps.features.riskManagement.title')}</h3>
                    <p className="text-slate-600">{t('iso27001Page.howQuantifierHelps.features.riskManagement.description')}</p>
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
                    <h3 className="font-semibold text-lg mb-2">{t('iso27001Page.howQuantifierHelps.features.evidenceCollection.title')}</h3>
                    <p className="text-slate-600">{t('iso27001Page.howQuantifierHelps.features.evidenceCollection.description')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <BarChart4 className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('iso27001Page.howQuantifierHelps.features.complianceMonitoring.title')}</h3>
                    <p className="text-slate-600">{t('iso27001Page.howQuantifierHelps.features.complianceMonitoring.description')}</p>
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
                {t('iso27001Page.cta.title')}
              </h2>
              <p className="text-xl opacity-90 mb-8">
                {t('iso27001Page.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90 px-8" asChild>
                  <Link to={`/${currentLocale}/contact`}>
                    {t('iso27001Page.cta.bookDemo')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                  <Link to={`/${currentLocale}/plans`}>
                    {t('iso27001Page.cta.explorePlans')}
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

export default Iso27001;
