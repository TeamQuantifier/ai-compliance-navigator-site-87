
import PageTemplate from '@/components/PageTemplate';
import { 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  FileCheck, 
  BarChart4, 
  ClipboardCheck,
  Users,
  Settings,
  Repeat,
  Laptop,
  Database,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AiComplianceDashboard from '@/components/mockups/AiComplianceDashboard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Iso9001 = () => {
  const { t, currentLocale } = useLanguage();

  return (
    <PageTemplate
      title={t('iso9001Page.title')}
      description={t('iso9001Page.description')}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('iso9001Page.hero.title')}
              </h2>
              <p className="text-xl opacity-90 mb-6">
                {t('iso9001Page.hero.subtitle')}
              </p>
              <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90" asChild>
                <Link to={`/${currentLocale}/contact`}>
                  {t('iso9001Page.hero.button')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="md:w-2/5">
              <div className="bg-white/5 backdrop-blur-sm p-3 rounded-lg shadow-xl border border-white/20">
                <AiComplianceDashboard 
                  title="ISO 9001 Quality Management" 
                  themeColor="#9b87f5" 
                  variant="compact"
                />
              </div>
            </div>
          </div>
        </section>

        {/* What is ISO 9001 Section */}
        <section className="mb-16">
          <div className="bg-[#E5DEFF]/40 p-8 rounded-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#1A1F2C]">
              {t('iso9001Page.whatIs.title')}
            </h2>
            <p className="text-lg text-slate-700 mb-8 max-w-4xl mx-auto">
              {t('iso9001Page.whatIs.description')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5DEFF]">
                <h3 className="text-xl font-semibold mb-4 text-[#7E69AB]">{t('iso9001Page.whatIs.keyPrinciples.title')}</h3>
                <ul className="space-y-3">
                  {(t('iso9001Page.whatIs.keyPrinciples.items', { returnObjects: true }) as string[]).map((item, index) => (
                    <li key={index} className="flex items-start">
                      {index === 0 && <Users className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />}
                      {index === 1 && <Settings className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />}
                      {index === 2 && <ClipboardCheck className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />}
                      {index === 3 && <Repeat className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5DEFF]">
                <h3 className="text-xl font-semibold mb-4 text-[#7E69AB]">{t('iso9001Page.whatIs.benefits.title')}</h3>
                <ul className="space-y-3">
                  {(t('iso9001Page.whatIs.benefits.items', { returnObjects: true }) as string[]).map((item, index) => (
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

        {/* Platform Screenshots Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#1A1F2C]">
            {t('iso9001Page.platformScreenshots.title')}
          </h2>
          
          <div className="mb-10">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E5DEFF]">
              <h3 className="text-xl font-semibold mb-4 text-[#7E69AB] flex items-center">
                <Shield className="h-5 w-5 text-[#9b87f5] mr-3 flex-shrink-0" />
                {t('iso9001Page.platformScreenshots.dashboard.title')}
              </h3>
              <p className="text-slate-700 mb-4">
                {t('iso9001Page.platformScreenshots.dashboard.description')}
              </p>
              <div className="rounded-lg overflow-hidden border border-[#E5DEFF]">
                <AiComplianceDashboard 
                  title="ISO 9001 Quality Management" 
                  themeColor="#9b87f5"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5DEFF]">
              <h3 className="text-xl font-semibold mb-4 text-[#7E69AB] flex items-center">
                <Laptop className="h-5 w-5 text-[#9b87f5] mr-3 flex-shrink-0" />
                {t('iso9001Page.platformScreenshots.qualityManagement.title')}
              </h3>
              <p className="text-slate-700 mb-4">
                {t('iso9001Page.platformScreenshots.qualityManagement.description')}
              </p>
              <div className="rounded-lg overflow-hidden border border-[#E5DEFF]">
                <img 
                  src="/mockups/iso9001-dashboard-wide.png" 
                  alt={t('iso9001Page.platformScreenshots.qualityManagement.alt')}
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5DEFF]">
              <h3 className="text-xl font-semibold mb-4 text-[#7E69AB] flex items-center">
                <Database className="h-5 w-5 text-[#9b87f5] mr-3 flex-shrink-0" />
                {t('iso9001Page.platformScreenshots.processManagement.title')}
              </h3>
              <p className="text-slate-700 mb-4">
                {t('iso9001Page.platformScreenshots.processManagement.description')}
              </p>
              <div className="rounded-lg overflow-hidden border border-[#E5DEFF]">
                <img 
                  src="/mockups/process-management-screen.png" 
                  alt={t('iso9001Page.platformScreenshots.processManagement.alt')}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5DEFF]">
              <h3 className="text-xl font-semibold mb-4 text-[#7E69AB] flex items-center">
                <FileText className="h-5 w-5 text-[#9b87f5] mr-3 flex-shrink-0" />
                {t('iso9001Page.platformScreenshots.documentationControl.title')}
              </h3>
              <div className="rounded-lg overflow-hidden border border-[#E5DEFF] mb-4">
                <img 
                  src="/mockups/document-control-screen.png" 
                  alt={t('iso9001Page.platformScreenshots.documentationControl.alt')}
                  className="w-full"
                />
              </div>
              <p className="text-slate-600">
                {t('iso9001Page.platformScreenshots.documentationControl.description')}
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5DEFF]">
              <h3 className="text-xl font-semibold mb-4 text-[#7E69AB] flex items-center">
                <BarChart4 className="h-5 w-5 text-[#9b87f5] mr-3 flex-shrink-0" />
                {t('iso9001Page.platformScreenshots.performanceAnalytics.title')}
              </h3>
              <div className="rounded-lg overflow-hidden border border-[#E5DEFF] mb-4">
                <img 
                  src="/mockups/performance-analytics-screen.png" 
                  alt={t('iso9001Page.platformScreenshots.performanceAnalytics.alt')}
                  className="w-full"
                />
              </div>
              <p className="text-slate-600">
                {t('iso9001Page.platformScreenshots.performanceAnalytics.description')}
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5DEFF]">
              <h3 className="text-xl font-semibold mb-4 text-[#7E69AB] flex items-center">
                <ClipboardCheck className="h-5 w-5 text-[#9b87f5] mr-3 flex-shrink-0" />
                {t('iso9001Page.platformScreenshots.auditManagement.title')}
              </h3>
              <div className="rounded-lg overflow-hidden border border-[#E5DEFF] mb-4">
                <img 
                  src="/mockups/audit-management-screen.png" 
                  alt={t('iso9001Page.platformScreenshots.auditManagement.alt')}
                  className="w-full"
                />
              </div>
              <p className="text-slate-600">
                {t('iso9001Page.platformScreenshots.auditManagement.description')}
              </p>
            </div>
          </div>
        </section>

        {/* How Quantifier Helps Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#1A1F2C]">
            {t('iso9001Page.howQuantifierHelps.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <ClipboardCheck className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('iso9001Page.howQuantifierHelps.features.automatedTasks.title')}</h3>
                    <p className="text-slate-600">{t('iso9001Page.howQuantifierHelps.features.automatedTasks.description')}</p>
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
                    <h3 className="font-semibold text-lg mb-2">{t('iso9001Page.howQuantifierHelps.features.auditReady.title')}</h3>
                    <p className="text-slate-600">{t('iso9001Page.howQuantifierHelps.features.auditReady.description')}</p>
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
                    <h3 className="font-semibold text-lg mb-2">{t('iso9001Page.howQuantifierHelps.features.qualityMonitoring.title')}</h3>
                    <p className="text-slate-600">{t('iso9001Page.howQuantifierHelps.features.qualityMonitoring.description')}</p>
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
                {t('iso9001Page.cta.title')}
              </h2>
              <p className="text-xl opacity-90 mb-8">
                {t('iso9001Page.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90 px-8" asChild>
                  <Link to={`/${currentLocale}/contact`}>
                    {t('iso9001Page.cta.bookDemo')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                  <Link to={`/${currentLocale}/plans`}>
                    {t('iso9001Page.cta.explorePlans')}
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

export default Iso9001;
