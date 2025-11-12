import PageTemplate from '@/components/PageTemplate';
import { Globe, CheckCircle, ArrowRight, Shield, Users, FileText, Monitor, AlertTriangle, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import GanttChart from '@/components/charts/GanttChart';
import ProcedureFlowMockup from '@/components/mockups/components/ProcedureFlowMockup';
import NIS2AnalyticsMockup from '@/components/mockups/components/NIS2AnalyticsMockup';
import ComplianceDashboardMockup from '@/components/mockups/components/ComplianceDashboardMockup';
import { useLanguage } from '@/contexts/LanguageContext';

const NisII = () => {
  const { t, currentLocale } = useLanguage();
  
  const ganttTasks = [{
    id: 'onboarding',
    name: t('nisIIPage.aiModule.ganttChart.tasks.onboarding'),
    startMonth: 1,
    duration: 1,
    roles: ['Administrator'],
    color: 'bg-gradient-to-r from-blue-500 to-blue-600'
  }, {
    id: 'gap-analysis',
    name: t('nisIIPage.aiModule.ganttChart.tasks.gapAnalysis'),
    startMonth: 1,
    duration: 1,
    roles: ['Administrator'],
    color: 'bg-gradient-to-r from-purple-500 to-purple-600'
  }, {
    id: 'implementation',
    name: t('nisIIPage.aiModule.ganttChart.tasks.implementation'),
    startMonth: 2,
    duration: 1,
    roles: ['Administrator', 'CISO'],
    color: 'bg-gradient-to-r from-green-500 to-green-600'
  }, {
    id: 'procedures',
    name: t('nisIIPage.aiModule.ganttChart.tasks.procedures'),
    startMonth: 3,
    duration: 3,
    roles: ['Administrator', 'CISO', 'HR Manager', 'Asset Manager'],
    color: 'bg-gradient-to-r from-orange-500 to-orange-600'
  }, {
    id: 'continuous',
    name: t('nisIIPage.aiModule.ganttChart.tasks.continuous'),
    startMonth: 1,
    duration: 6,
    roles: ['AI', 'Administrator'],
    color: 'bg-gradient-to-r from-cyan-500 to-cyan-600',
    isContinuous: true
  }];
  return <PageTemplate title={t('nisIIPage.title')} description={t('nisIIPage.description')}>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-start gap-12">
                <div className="lg:w-1/2">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 mb-6 border border-cyan-500/30">
                    <Shield className="w-5 h-5 mr-2" />
                    <span className="font-medium">{t('nisIIPage.hero.badge')}</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                    {t('nisIIPage.hero.title')}
                  </h1>
                  <p className="text-xl md:text-2xl opacity-90 mb-8 text-slate-300">{t('nisIIPage.hero.subtitle')}</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    
                    
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-xl blur-3xl"></div>
                    <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <h3 className="text-xl font-semibold mb-4 text-white">{t('nisIIPage.hero.formTitle')}</h3>
                      <form className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-white/90 text-sm">{t('nisIIPage.hero.nameLabel')}</Label>
                          <Input id="name" placeholder={t('nisIIPage.hero.namePlaceholder')} className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-400" />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-white/90 text-sm">{t('nisIIPage.hero.emailLabel')}</Label>
                          <Input id="email" type="email" placeholder={t('nisIIPage.hero.emailPlaceholder')} className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-400" />
                        </div>
                        <div>
                          
                          
                        </div>
                        <div className="flex items-start space-x-2 pt-2">
                          <Checkbox id="marketing" className="border-white/30 data-[state=checked]:bg-cyan-500" />
                          <Label htmlFor="marketing" className="text-xs text-white/80 leading-relaxed">
                            {t('nisIIPage.hero.marketingConsent')}
                          </Label>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium">
                          {t('nisIIPage.hero.requestDemoButton')}
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{t('nisIIPage.understanding.whatIs.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  {t('nisIIPage.understanding.whatIs.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{t('nisIIPage.understanding.whoMustComply.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-slate-600 space-y-2">
                  {(t('nisIIPage.understanding.whoMustComply.items', { returnObjects: true }) as string[]).map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{t('nisIIPage.understanding.keyRequirements.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-slate-600 space-y-2">
                  {(t('nisIIPage.understanding.keyRequirements.items', { returnObjects: true }) as string[]).map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How Quantifier Helps */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 md:p-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                {t('nisIIPage.howQuantifierHelps.title')}
              </h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto">
                {t('nisIIPage.howQuantifierHelps.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                  <Monitor className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{t('nisIIPage.howQuantifierHelps.features.riskAssessment.title')}</h3>
                <p className="text-slate-600">
                  {t('nisIIPage.howQuantifierHelps.features.riskAssessment.description')}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{t('nisIIPage.howQuantifierHelps.features.roleBasedWorkflows.title')}</h3>
                <p className="text-slate-600">
                  {t('nisIIPage.howQuantifierHelps.features.roleBasedWorkflows.description')}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{t('nisIIPage.howQuantifierHelps.features.incidentManagement.title')}</h3>
                <p className="text-slate-600">
                  {t('nisIIPage.howQuantifierHelps.features.incidentManagement.description')}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{t('nisIIPage.howQuantifierHelps.features.policyAutomation.title')}</h3>
                <p className="text-slate-600">{t('nisIIPage.howQuantifierHelps.features.policyAutomation.description')}</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{t('nisIIPage.howQuantifierHelps.features.multiJurisdiction.title')}</h3>
                <p className="text-slate-600">{t('nisIIPage.howQuantifierHelps.features.multiJurisdiction.description')}</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-white" />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {t('nisIIPage.aiModule.title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
              {t('nisIIPage.aiModule.description')}
            </p>
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-slate-700 border border-cyan-200">
              <Shield className="w-5 h-5 mr-2 text-cyan-600" />
              <span className="font-medium">{t('nisIIPage.aiModule.badge')}
            </span>
            </div>
          </div>

          {/* Gantt Chart */}
          <div className="mb-12">
            <GanttChart title="NIS2 Implementation Timeline" subtitle="Complete roadmap from initial onboarding to continuous compliance monitoring" tasks={ganttTasks} />
          </div>


        </section>

        {/* Platform Mockups Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            
            
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
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">{t('nisIIPage.results.metrics.compliance')}</div>
                <div className="text-sm text-slate-600">{t('nisIIPage.results.metrics.complianceLabel')}</div>
              </div>
              <div className="text-center animate-fade-in" style={{animationDelay: '0.1s'}}>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{t('nisIIPage.results.metrics.keyAreas')}</div>
                <div className="text-sm text-slate-600">{t('nisIIPage.results.metrics.keyAreasLabel')}</div>
              </div>
              <div className="text-center animate-fade-in" style={{animationDelay: '0.2s'}}>
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">{t('nisIIPage.results.metrics.monitoring')}</div>
                <div className="text-sm text-slate-600">{t('nisIIPage.results.metrics.monitoringLabel')}</div>
              </div>
              <div className="text-center animate-fade-in" style={{animationDelay: '0.3s'}}>
                <div className="text-3xl md:text-4xl font-bold text-cyan-600 mb-2">{t('nisIIPage.results.metrics.responseTime')}</div>
                <div className="text-sm text-slate-600">{t('nisIIPage.results.metrics.responseTimeLabel')}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Risk Assessment */}
            <div className="group animate-fade-in hover-scale" style={{
            animationDelay: '0.1s'
          }}>
              <Card className="border-slate-200 hover:shadow-xl hover:border-red-200 transition-all duration-500 h-full">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <AlertTriangle className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Risk Assessment</CardTitle>
                  
                  
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-slate-600 space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Complete list of identified risks and vulnerabilities
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Probability and impact analysis with clear metrics
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Risk evaluation with assigned significance levels
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Comprehensive risk management plan
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Technical and organizational controls implemented
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Crisis Management */}
            <div className="group animate-fade-in hover-scale" style={{
            animationDelay: '0.2s'
          }}>
              <Card className="border-slate-200 hover:shadow-xl hover:border-orange-200 transition-all duration-500 h-full">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Crisis Management</CardTitle>
                  
                  
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-slate-600 space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Ready crisis communication plans
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Identified critical technologies and operations
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Defined priorities for system recovery
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Coordinated action procedures
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Incidents */}
            <div className="group animate-fade-in hover-scale" style={{
            animationDelay: '0.3s'
          }}>
              <Card className="border-slate-200 hover:shadow-xl hover:border-yellow-200 transition-all duration-500 h-full">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Incidents</CardTitle>
                  
                  
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-slate-600 space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Classified incident types with assessment criteria
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Efficient reporting and management system
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Internal and external reporting procedures
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Comprehensive incident handling tools
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Employees and Training */}
            <div className="group animate-fade-in hover-scale" style={{
            animationDelay: '0.4s'
          }}>
              <Card className="border-slate-200 hover:shadow-xl hover:border-blue-200 transition-all duration-500 h-full">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Employees and Training</CardTitle>
                  
                  
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-slate-600 space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Assigned responsibilities for all employees
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Regular training programs implemented
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Enhanced security awareness and competencies
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      HR and recruitment standards compliance
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Suppliers */}
            <div className="group animate-fade-in hover-scale" style={{
            animationDelay: '0.5s'
          }}>
              <Card className="border-slate-200 hover:shadow-xl hover:border-purple-200 transition-all duration-500 h-full">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Building className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Suppliers</CardTitle>
                  
                  
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-slate-600 space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Supplier audits conducted and compliance confirmed
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Communication obligations fulfilled
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Required information provision under NIS2
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Incident response coordination established
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Assets and Security Measures */}
            <div className="group animate-fade-in hover-scale" style={{
            animationDelay: '0.6s'
          }}>
              <Card className="border-slate-200 hover:shadow-xl hover:border-green-200 transition-all duration-500 h-full">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Monitor className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Assets and Security Measures</CardTitle>
                  
                  
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-slate-600 space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Complete asset inventory with responsible persons
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Tailored security measures for each asset
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Asset classification by significance
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Security requirements properly assigned
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom Summary */}
          <div className="mt-16 text-center animate-fade-in" style={{
          animationDelay: '0.8s'
        }}>
            
          </div>
        </section>

        {/* Continuous Compliance Operations */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-cyan-900/10 via-blue-900/10 to-purple-900/10 rounded-2xl p-8 border border-cyan-200/20">
            <div className="flex items-center justify-center mb-6">
              
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Request Demo Form - Left Side */}
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <h4 className="text-lg font-semibold text-slate-900 mb-4 text-center">Request a Demo</h4>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="marketing"
                      name="marketing"
                      className="mt-1 h-4 w-4 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500"
                    />
                    <label htmlFor="marketing" className="ml-2 text-sm text-slate-600">
                      I agree to receive marketing communications and updates about NIS2 compliance solutions
                    </label>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                  >
                    Request Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>

              {/* Content - Right Side */}
              <div className="animate-fade-in">
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Continuous Compliance Operations
                </h3>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Once implemented, our AI agents take over continuous monitoring, risk assessment, incident management, and regulatory reporting — ensuring your NIS2 compliance never lapses.
                </p>
                
                {/* Interactive Feature Cards */}
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-cyan-200/30 hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-fade-in" 
                       style={{animationDelay: '0.1s'}}>
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                      <Monitor className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Real-time Monitoring</h4>
                      <p className="text-sm text-slate-600">24/7 automated surveillance of all compliance parameters</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-cyan-200/30 hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-fade-in" 
                       style={{animationDelay: '0.2s'}}>
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Risk Assessment</h4>
                      <p className="text-sm text-slate-600">AI-powered continuous risk evaluation and mitigation</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-cyan-200/30 hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-fade-in" 
                       style={{animationDelay: '0.3s'}}>
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Automated Reporting</h4>
                      <p className="text-sm text-slate-600">Regulatory reports generated and submitted automatically</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-cyan-200/30 hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-fade-in" 
                       style={{animationDelay: '0.4s'}}>
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Incident Management</h4>
                      <p className="text-sm text-slate-600">Automated incident detection, response, and documentation</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-8 inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 border border-green-200 animate-fade-in" 
                     style={{animationDelay: '0.5s'}}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Always Compliant • Always Protected</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="mb-12">
          
        </section>
      </div>
    </PageTemplate>;
};
export default NisII;