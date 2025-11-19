
import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit, Shield, FileCheck2, AlertTriangle, CheckCircle, Activity, MessageCircle, Clock } from 'lucide-react';
import AiComplianceDashboard from '@/components/mockups/AiComplianceDashboard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const ComplianceOfficer = () => {
  const { t, currentLocale } = useLanguage();
  
  return (
    <PageTemplate
      title={t('product.complianceOfficer.title')}
      description={t('product.complianceOfficer.description')}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('product.complianceOfficer.hero.title')}
              </h2>
              <p className="text-xl opacity-90 mb-6">
                {t('product.complianceOfficer.hero.subtitle')}
              </p>
              <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90" asChild>
                <Link to={`/${currentLocale}/contact`}>
                  {t('product.complianceOfficer.hero.bookDemo')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white/5 backdrop-blur-sm p-3 rounded-lg shadow-xl border border-white/20">
                <AiComplianceDashboard />
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">{t('product.complianceOfficer.howItWorks.title')}</h2>
          <p className="text-lg text-slate-600 text-center mb-10 max-w-3xl mx-auto">
            {t('product.complianceOfficer.howItWorks.subtitle')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-[#9b87f5]/20 hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-full bg-[#9b87f5]/10 flex items-center justify-center mb-4">
                  <BrainCircuit className="h-6 w-6 text-[#7E69AB]" />
                </div>
                <CardTitle className="text-lg">{t('product.complianceOfficer.howItWorks.monitoring.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  {t('product.complianceOfficer.howItWorks.monitoring.description')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-[#9b87f5]/20 hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-full bg-[#9b87f5]/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-[#7E69AB]" />
                </div>
                <CardTitle className="text-lg">{t('product.complianceOfficer.howItWorks.expertise.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  {t('product.complianceOfficer.howItWorks.expertise.description')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-[#9b87f5]/20 hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-full bg-[#9b87f5]/10 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-[#7E69AB]" />
                </div>
                <CardTitle className="text-lg">{t('product.complianceOfficer.howItWorks.action.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  {t('product.complianceOfficer.howItWorks.action.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Environmental Compliance Use Cases */}
        <section className="mb-16 bg-slate-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-8 text-center">{t('product.complianceOfficer.useCases.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <FileCheck2 className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">{t('product.complianceOfficer.useCases.iso14001.title')}</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">{t('product.complianceOfficer.useCases.iso14001.feature1')}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">{t('product.complianceOfficer.useCases.iso14001.feature2')}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">{t('product.complianceOfficer.useCases.iso14001.feature3')}</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">{t('product.complianceOfficer.useCases.carbon.title')}</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">{t('product.complianceOfficer.useCases.carbon.feature1')}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">{t('product.complianceOfficer.useCases.carbon.feature2')}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">{t('product.complianceOfficer.useCases.carbon.feature3')}</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">{t('product.complianceOfficer.useCases.lca.title')}</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">{t('product.complianceOfficer.useCases.lca.feature1')}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">{t('product.complianceOfficer.useCases.lca.feature2')}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">{t('product.complianceOfficer.useCases.lca.feature3')}</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">{t('product.complianceOfficer.useCases.decarbonisation.title')}</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">{t('product.complianceOfficer.useCases.decarbonisation.feature1')}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">{t('product.complianceOfficer.useCases.decarbonisation.feature2')}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">{t('product.complianceOfficer.useCases.decarbonisation.feature3')}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">{t('product.complianceOfficer.workflow.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="h-14 w-14 rounded-full bg-[#9b87f5]/10 flex items-center justify-center mx-auto">
                    <BrainCircuit className="h-7 w-7 text-[#7E69AB]" />
                  </div>
                  <h3 className="text-lg font-semibold mt-3">{t('product.complianceOfficer.workflow.learns.title')}</h3>
                </div>
                <p className="text-slate-600 text-center">
                  {t('product.complianceOfficer.workflow.learns.description')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="h-14 w-14 rounded-full bg-[#9b87f5]/10 flex items-center justify-center mx-auto">
                    <Activity className="h-7 w-7 text-[#7E69AB]" />
                  </div>
                  <h3 className="text-lg font-semibold mt-3">{t('product.complianceOfficer.workflow.monitors.title')}</h3>
                </div>
                <p className="text-slate-600 text-center">
                  {t('product.complianceOfficer.workflow.monitors.description')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="h-14 w-14 rounded-full bg-[#9b87f5]/10 flex items-center justify-center mx-auto">
                    <MessageCircle className="h-7 w-7 text-[#7E69AB]" />
                  </div>
                  <h3 className="text-lg font-semibold mt-3">{t('product.complianceOfficer.workflow.communicates.title')}</h3>
                </div>
                <p className="text-slate-600 text-center">
                  {t('product.complianceOfficer.workflow.communicates.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* CTA */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                {t('product.complianceOfficer.cta.title')}
              </h2>
              <p className="text-xl opacity-90 mb-8">
                {t('product.complianceOfficer.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-green-700 hover:bg-white/90 px-8" asChild>
                  <Link to={`/${currentLocale}/contact`}>
                    {t('product.complianceOfficer.cta.bookDemo')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  {t('product.complianceOfficer.cta.exploreFeatures')}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default ComplianceOfficer;
