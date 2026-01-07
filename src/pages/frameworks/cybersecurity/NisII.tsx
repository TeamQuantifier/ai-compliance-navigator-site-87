import PageTemplate from '@/components/PageTemplate';
import { Globe, CheckCircle, ArrowRight, Shield, Users, FileText, Monitor, AlertTriangle, Building, Gavel, Clock, Euro, Briefcase, Scale, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import FAQSection from '@/components/seo/FAQSection';

const NisII = () => {
  const { t, currentLocale } = useLanguage();
  
  // Helper to safely get array from translations
  const getArrayTranslation = (key: string): string[] => {
    const result = t(key, { returnObjects: true });
    return Array.isArray(result) ? result : [];
  };
  
  // Helper to safely get object array from translations
  const getObjectArrayTranslation = <T,>(key: string): T[] => {
    const result = t(key, { returnObjects: true });
    return Array.isArray(result) ? result : [];
  };
  return <PageTemplate title={t('seo.frameworks.cybersecurity.nisII.title')} description={t('seo.frameworks.cybersecurity.nisII.description')}>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-brand-blue-dark via-brand-blue to-brand-purple rounded-2xl p-8 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5"></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-start gap-12">
                <div className="lg:w-1/2">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white/90 mb-6 border border-white/20">
                    <Shield className="w-5 h-5 mr-2" />
                    <span className="font-medium">{t('nisIIPage.hero.badge')}</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                    {t('nisIIPage.hero.title')}
                  </h1>
                  <p className="text-xl md:text-2xl opacity-90 mb-8 text-white/80">{t('nisIIPage.hero.subtitle')}</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    
                    
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/10 rounded-xl blur-3xl"></div>
                    <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <h3 className="text-xl font-semibold mb-4 text-white">{t('nisIIPage.hero.formTitle')}</h3>
                      <form className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-white/90 text-sm">{t('nisIIPage.hero.nameLabel')}</Label>
                          <Input id="name" placeholder={t('nisIIPage.hero.namePlaceholder')} className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-brand-blue" />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-white/90 text-sm">{t('nisIIPage.hero.emailLabel')}</Label>
                          <Input id="email" type="email" placeholder={t('nisIIPage.hero.emailPlaceholder')} className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-brand-blue" />
                        </div>
                        <div>
                          
                          
                        </div>
                        <div className="flex items-start space-x-2 pt-2">
                          <Checkbox id="marketing" className="border-white/30 data-[state=checked]:bg-brand-blue" />
                          <Label htmlFor="marketing" className="text-xs text-white/80 leading-relaxed">
                            {t('nisIIPage.hero.marketingConsent')}
                          </Label>
                        </div>
                        <Button className="w-full bg-white text-brand-blue-dark hover:bg-brand-gray-light font-medium" asChild>
                          <Link to={`/${currentLocale}/contact`}>
                            {t('nisIIPage.hero.requestDemoButton')}
                          </Link>
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why NIS2 Is a Problem Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {t('nisIIPage.whyProblem.title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              {t('nisIIPage.whyProblem.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-brand-gray-light hover:shadow-lg transition-all duration-300 bg-white">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-brand-purple/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Euro className="w-8 h-8 text-brand-purple" />
                </div>
                <div className="text-4xl font-bold text-brand-purple mb-2">{t('nisIIPage.whyProblem.cards.penalties.stat')}</div>
                <CardTitle className="text-xl">{t('nisIIPage.whyProblem.cards.penalties.title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600">{t('nisIIPage.whyProblem.cards.penalties.description')}</p>
              </CardContent>
            </Card>

            <Card className="border-brand-gray-light hover:shadow-lg transition-all duration-300 bg-white">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-brand-blue/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <FileText className="w-8 h-8 text-brand-blue" />
                </div>
                <div className="text-4xl font-bold text-brand-blue mb-2">{t('nisIIPage.whyProblem.cards.complexity.stat')}</div>
                <CardTitle className="text-xl">{t('nisIIPage.whyProblem.cards.complexity.title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600">{t('nisIIPage.whyProblem.cards.complexity.description')}</p>
              </CardContent>
            </Card>

            <Card className="border-brand-gray-light hover:shadow-lg transition-all duration-300 bg-white">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-brand-blue-dark/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Clock className="w-8 h-8 text-brand-blue-dark" />
                </div>
                <div className="text-4xl font-bold text-brand-blue-dark mb-2">{t('nisIIPage.whyProblem.cards.timeline.stat')}</div>
                <CardTitle className="text-xl">{t('nisIIPage.whyProblem.cards.timeline.title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600">{t('nisIIPage.whyProblem.cards.timeline.description')}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What is NIS2 Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {t('nisIIPage.understanding.title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              {t('nisIIPage.understanding.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="border-brand-gray-light hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-brand-blue" />
                </div>
                <CardTitle className="text-xl">{t('nisIIPage.understanding.whatIs.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  {t('nisIIPage.understanding.whatIs.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-brand-gray-light hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <Building className="w-6 h-6 text-brand-purple" />
                </div>
                <CardTitle className="text-xl">{t('nisIIPage.understanding.whoMustComply.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-slate-600 space-y-2">
                  {getArrayTranslation('nisIIPage.understanding.whoMustComply.items').map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-brand-gray-light hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-blue-dark/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-brand-blue-dark" />
                </div>
                <CardTitle className="text-xl">{t('nisIIPage.understanding.keyRequirements.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-slate-600 space-y-2">
                  {getArrayTranslation('nisIIPage.understanding.keyRequirements.items').map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why NIS2 Matters for Management Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-brand-blue-dark to-brand-purple rounded-2xl p-8 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5"></div>
            <div className="relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white/90 mb-6 border border-white/20">
                  <Gavel className="w-5 h-5 mr-2" />
                  <span className="font-medium">{t('nisIIPage.whyManagement.badge')}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  {t('nisIIPage.whyManagement.title')}
                </h2>
                <p className="text-xl text-white/80 max-w-4xl mx-auto">
                  {t('nisIIPage.whyManagement.description')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getObjectArrayTranslation<{title: string, description: string}>('nisIIPage.whyManagement.points').map((point, index) => {
                  const icons = [Gavel, AlertTriangle, TrendingUp, Shield];
                  const IconComponent = icons[index % icons.length];
                  return (
                    <div key={index} className="flex items-start p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{point.title}</h3>
                        <p className="text-white/70 text-sm">{point.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* How Quantifier Helps */}
        <section className="mb-20">
          <div className="bg-brand-gray-light/30 rounded-2xl p-8 md:p-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                {t('nisIIPage.howQuantifierHelps.title')}
              </h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto">
                {t('nisIIPage.howQuantifierHelps.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center mb-4">
                  <Monitor className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{t('nisIIPage.howQuantifierHelps.features.riskAssessment.title')}</h3>
                <p className="text-slate-600">
                  {t('nisIIPage.howQuantifierHelps.features.riskAssessment.description')}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-brand-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-brand-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{t('nisIIPage.howQuantifierHelps.features.roleBasedWorkflows.title')}</h3>
                <p className="text-slate-600">
                  {t('nisIIPage.howQuantifierHelps.features.roleBasedWorkflows.description')}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-brand-blue-dark/10 rounded-lg flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-brand-blue-dark" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{t('nisIIPage.howQuantifierHelps.features.incidentManagement.title')}</h3>
                <p className="text-slate-600">
                  {t('nisIIPage.howQuantifierHelps.features.incidentManagement.description')}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-brand-mint rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-brand-blue-dark" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{t('nisIIPage.howQuantifierHelps.features.policyAutomation.title')}</h3>
                <p className="text-slate-600">{t('nisIIPage.howQuantifierHelps.features.policyAutomation.description')}</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{t('nisIIPage.howQuantifierHelps.features.multiJurisdiction.title')}</h3>
                <p className="text-slate-600">{t('nisIIPage.howQuantifierHelps.features.multiJurisdiction.description')}</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-brand-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-brand-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{t('nisIIPage.howQuantifierHelps.features.auditReady.title')}</h3>
                <p className="text-slate-600">
                  {t('nisIIPage.howQuantifierHelps.features.auditReady.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* NIS2 AI-Native Compliance Module Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
              {t('nisIIPage.aiModule.title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
              {t('nisIIPage.aiModule.description')}
            </p>
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-brand-mint text-brand-blue-dark border border-brand-blue/20">
              <Shield className="w-5 h-5 mr-2 text-brand-blue" />
              <span className="font-medium">{t('nisIIPage.aiModule.badge')}</span>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {t('nisIIPage.results.title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
              {t('nisIIPage.results.description')}
            </p>
            
            {/* Success Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
              <div className="text-center animate-fade-in">
                <div className="text-3xl md:text-4xl font-bold text-brand-blue-dark mb-2">{t('nisIIPage.results.metrics.compliance')}</div>
                <div className="text-sm text-slate-600">{t('nisIIPage.results.metrics.complianceLabel')}</div>
              </div>
              <div className="text-center animate-fade-in" style={{animationDelay: '0.1s'}}>
                <div className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">{t('nisIIPage.results.metrics.keyAreas')}</div>
                <div className="text-sm text-slate-600">{t('nisIIPage.results.metrics.keyAreasLabel')}</div>
              </div>
              <div className="text-center animate-fade-in" style={{animationDelay: '0.2s'}}>
                <div className="text-3xl md:text-4xl font-bold text-brand-purple mb-2">{t('nisIIPage.results.metrics.monitoring')}</div>
                <div className="text-sm text-slate-600">{t('nisIIPage.results.metrics.monitoringLabel')}</div>
              </div>
              <div className="text-center animate-fade-in" style={{animationDelay: '0.3s'}}>
                <div className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">{t('nisIIPage.results.metrics.responseTime')}</div>
                <div className="text-sm text-slate-600">{t('nisIIPage.results.metrics.responseTimeLabel')}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Risk Assessment */}
            <div className="group animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Card className="border-brand-gray-light hover:shadow-md transition-all duration-300 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold">{t('nisIIPage.resultAreas.riskAssessment.title')}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-slate-600 space-y-3">
                    {getArrayTranslation('nisIIPage.resultAreas.riskAssessment.items').map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-brand-blue mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Crisis Management */}
            <div className="group animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Card className="border-brand-gray-light hover:shadow-md transition-all duration-300 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold">{t('nisIIPage.resultAreas.crisisManagement.title')}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-slate-600 space-y-3">
                    {getArrayTranslation('nisIIPage.resultAreas.crisisManagement.items').map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-brand-blue mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Incidents */}
            <div className="group animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Card className="border-brand-gray-light hover:shadow-md transition-all duration-300 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold">{t('nisIIPage.resultAreas.incidents.title')}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-slate-600 space-y-3">
                    {getArrayTranslation('nisIIPage.resultAreas.incidents.items').map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-brand-blue mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Employees and Training */}
            <div className="group animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Card className="border-brand-gray-light hover:shadow-md transition-all duration-300 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold">{t('nisIIPage.resultAreas.employeesTraining.title')}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-slate-600 space-y-3">
                    {getArrayTranslation('nisIIPage.resultAreas.employeesTraining.items').map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-brand-blue mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Suppliers */}
            <div className="group animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <Card className="border-brand-gray-light hover:shadow-md transition-all duration-300 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold">{t('nisIIPage.resultAreas.suppliers.title')}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-slate-600 space-y-3">
                    {getArrayTranslation('nisIIPage.resultAreas.suppliers.items').map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-brand-blue mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Assets and Security Measures */}
            <div className="group animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Card className="border-brand-gray-light hover:shadow-md transition-all duration-300 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold">{t('nisIIPage.resultAreas.assets.title')}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-slate-600 space-y-3">
                    {getArrayTranslation('nisIIPage.resultAreas.assets.items').map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-brand-blue mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

        </section>

        {/* For Whom Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {t('nisIIPage.forWhom.title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              {t('nisIIPage.forWhom.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-brand-gray-light hover:shadow-md transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-brand-blue/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Briefcase className="w-8 h-8 text-brand-blue" />
                </div>
                <CardTitle className="text-lg">{t('nisIIPage.forWhom.personas.ceo.title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-slate-600 text-sm">{t('nisIIPage.forWhom.personas.ceo.description')}</p>
              </CardContent>
            </Card>

            <Card className="border-brand-gray-light hover:shadow-md transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-brand-blue-dark/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Shield className="w-8 h-8 text-brand-blue-dark" />
                </div>
                <CardTitle className="text-lg">{t('nisIIPage.forWhom.personas.ciso.title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-slate-600 text-sm">{t('nisIIPage.forWhom.personas.ciso.description')}</p>
              </CardContent>
            </Card>

            <Card className="border-brand-gray-light hover:shadow-md transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-brand-purple/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Scale className="w-8 h-8 text-brand-purple" />
                </div>
                <CardTitle className="text-lg">{t('nisIIPage.forWhom.personas.compliance.title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-slate-600 text-sm">{t('nisIIPage.forWhom.personas.compliance.description')}</p>
              </CardContent>
            </Card>

            <Card className="border-brand-gray-light hover:shadow-md transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-brand-mint rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Building className="w-8 h-8 text-brand-blue-dark" />
                </div>
                <CardTitle className="text-lg">{t('nisIIPage.forWhom.personas.coo.title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-slate-600 text-sm">{t('nisIIPage.forWhom.personas.coo.description')}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Continuous Compliance Operations */}
        <section className="mb-20">
          <div className="bg-brand-mint/30 rounded-2xl p-8 border border-brand-blue/10">
            <div className="flex items-center justify-center mb-6">
              
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Request Demo Form - Left Side */}
              <div className="bg-white p-6 rounded-lg border border-brand-gray-light shadow-sm">
                <h4 className="text-lg font-semibold text-slate-900 mb-4 text-center">{t('nisIIPage.continuousCompliance.form.title')}</h4>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                      {t('nisIIPage.continuousCompliance.form.nameLabel')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-3 py-2 border border-brand-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                      placeholder={t('nisIIPage.continuousCompliance.form.namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                      {t('nisIIPage.continuousCompliance.form.emailLabel')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-3 py-2 border border-brand-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                      placeholder={t('nisIIPage.continuousCompliance.form.emailPlaceholder')}
                    />
                  </div>
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="marketing"
                      name="marketing"
                      className="mt-1 h-4 w-4 text-brand-blue border-brand-gray-light rounded focus:ring-brand-blue"
                    />
                    <label htmlFor="marketing" className="ml-2 text-sm text-slate-600">
                      {t('nisIIPage.continuousCompliance.form.marketingConsent')}
                    </label>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white"
                  >
                    {t('nisIIPage.continuousCompliance.form.submitButton')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>

              {/* Content - Right Side */}
              <div className="animate-fade-in">
                <h3 className="text-3xl font-bold mb-6 text-slate-900">
                  {t('nisIIPage.continuousCompliance.title')}
                </h3>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {t('nisIIPage.continuousCompliance.description')}
                </p>
                
                {/* Interactive Feature Cards */}
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-brand-gray-light hover:bg-white/80 transition-all duration-300 hover:shadow-md animate-fade-in" 
                       style={{animationDelay: '0.1s'}}>
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center mr-4">
                      <Monitor className="w-6 h-6 text-brand-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{t('nisIIPage.continuousCompliance.features.monitoring.title')}</h4>
                      <p className="text-sm text-slate-600">{t('nisIIPage.continuousCompliance.features.monitoring.description')}</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-brand-blue rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-brand-gray-light hover:bg-white/80 transition-all duration-300 hover:shadow-md animate-fade-in" 
                       style={{animationDelay: '0.2s'}}>
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-purple/10 rounded-lg flex items-center justify-center mr-4">
                      <AlertTriangle className="w-6 h-6 text-brand-purple" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{t('nisIIPage.continuousCompliance.features.riskAssessment.title')}</h4>
                      <p className="text-sm text-slate-600">{t('nisIIPage.continuousCompliance.features.riskAssessment.description')}</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-brand-purple rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-brand-gray-light hover:bg-white/80 transition-all duration-300 hover:shadow-md animate-fade-in" 
                       style={{animationDelay: '0.3s'}}>
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-mint rounded-lg flex items-center justify-center mr-4">
                      <FileText className="w-6 h-6 text-brand-blue-dark" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{t('nisIIPage.continuousCompliance.features.reporting.title')}</h4>
                      <p className="text-sm text-slate-600">{t('nisIIPage.continuousCompliance.features.reporting.description')}</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-brand-blue-dark rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-brand-gray-light hover:bg-white/80 transition-all duration-300 hover:shadow-md animate-fade-in" 
                       style={{animationDelay: '0.4s'}}>
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-blue-dark/10 rounded-lg flex items-center justify-center mr-4">
                      <Shield className="w-6 h-6 text-brand-blue-dark" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{t('nisIIPage.continuousCompliance.features.incidentManagement.title')}</h4>
                      <p className="text-sm text-slate-600">{t('nisIIPage.continuousCompliance.features.incidentManagement.description')}</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-brand-blue rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-8 inline-flex items-center px-4 py-2 rounded-full bg-brand-mint text-brand-blue-dark border border-brand-blue/20 animate-fade-in" 
                     style={{animationDelay: '0.5s'}}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">{t('nisIIPage.continuousCompliance.statusBadge')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection 
          title={t('seoLanding.nis2.faq.title')}
          faqs={[
            { question: t('seoLanding.nis2.faq.items.0.question'), answer: t('seoLanding.nis2.faq.items.0.answer') },
            { question: t('seoLanding.nis2.faq.items.1.question'), answer: t('seoLanding.nis2.faq.items.1.answer') },
            { question: t('seoLanding.nis2.faq.items.2.question'), answer: t('seoLanding.nis2.faq.items.2.answer') },
            { question: t('seoLanding.nis2.faq.items.3.question'), answer: t('seoLanding.nis2.faq.items.3.answer') },
            { question: t('seoLanding.nis2.faq.items.4.question'), answer: t('seoLanding.nis2.faq.items.4.answer') },
            { question: t('seoLanding.nis2.faq.items.5.question'), answer: t('seoLanding.nis2.faq.items.5.answer') }
          ]}
          pageUrl={`https://quantifier.com/${currentLocale}/frameworks/cybersecurity/nis-ii`}
        />

        {/* Final CTA Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-brand-blue-dark to-brand-purple rounded-2xl p-8 md:p-16 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('nisIIPage.finalCta.title')}
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                {t('nisIIPage.finalCta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-brand-blue-dark hover:bg-brand-gray-light font-semibold px-8" asChild>
                  <Link to={`/${currentLocale}/contact`}>
                    {t('nisIIPage.finalCta.bookDemo')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold px-8" asChild>
                  <Link to={`/${currentLocale}/plans`}>
                    {t('nisIIPage.finalCta.talkExpert')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>;
};

export default NisII;