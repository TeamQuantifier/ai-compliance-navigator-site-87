import PageTemplate from '@/components/PageTemplate';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCog, User, FileCheck, Users, ArrowRight, CheckCircle, BarChart3, Calendar, Zap, Shield, Lock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const ByRoles = () => {
  const { t, currentLocale } = useLanguage();

  // AI Agent features for each role (for the standalone section)
  const aiManagersFeatures = [
    t('byRoles.managers.aiAgent.feature1'),
    t('byRoles.managers.aiAgent.feature2'),
    t('byRoles.managers.aiAgent.feature3'),
    t('byRoles.managers.aiAgent.feature4')
  ];

  const aiContributorsFeatures = [
    t('byRoles.contributors.aiAgent.feature1'),
    t('byRoles.contributors.aiAgent.feature2'),
    t('byRoles.contributors.aiAgent.feature3'),
    t('byRoles.contributors.aiAgent.feature4')
  ];

  const aiAuditorsFeatures = [
    t('byRoles.auditors.aiAgent.feature1'),
    t('byRoles.auditors.aiAgent.feature2'),
    t('byRoles.auditors.aiAgent.feature3'),
    t('byRoles.auditors.aiAgent.feature4')
  ];
  
  return <PageTemplate title={t('byRoles.pageTitle')} description={t('byRoles.pageDescription')}>
      {/* Compact Hero Section */}
      <div className="bg-gradient-to-b from-slate-950 via-slate-950 to-compliance-950 py-6 md:py-8 px-6 rounded-xl mb-8 relative overflow-hidden shadow-lg">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-innovation-800 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-compliance-800 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute top-1/2 left-0 w-32 h-32 bg-slate-800 rounded-full blur-3xl opacity-20"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
            {t('byRoles.hero.title')}
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            {t('byRoles.hero.description')}
          </p>
        </div>
      </div>

      {/* Tabs with role-specific content */}
      <div className="mb-12">
        <Tabs defaultValue="managers" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-8">
            <TabsTrigger value="managers" className="py-6 data-[state=active]:bg-compliance-100">
              <UserCog className="h-5 w-5 mr-2" />
              {t('byRoles.tabs.managers')}
            </TabsTrigger>
            <TabsTrigger value="contributors" className="data-[state=active]:bg-innovation-100 py-6">
              <User className="h-5 w-5 mr-2" />
              {t('byRoles.tabs.contributors')}
            </TabsTrigger>
            <TabsTrigger value="auditors" className="data-[state=active]:bg-compliance-100 py-6">
              <FileCheck className="h-5 w-5 mr-2" />
              {t('byRoles.tabs.auditors')}
            </TabsTrigger>
          </TabsList>

          {/* Managers Tab Content */}
          <TabsContent value="managers" className="mt-6">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    {t('byRoles.managers.title')}
                  </h3>
                  
                  <h4 className="text-lg font-semibold text-compliance-600 mt-6 mb-3">{t('byRoles.managers.whoTheyAre')}</h4>
                  <p className="text-slate-700 mb-6">
                    {t('byRoles.managers.whoDescription')}
                  </p>
                  
                  <h4 className="text-lg font-semibold text-compliance-600 mt-8 mb-3">{t('byRoles.managers.whatTheyGet')}</h4>
                  <ul className="space-y-3 mb-8">
                    {[
                      t('byRoles.managers.feature1'),
                      t('byRoles.managers.feature2'),
                      t('byRoles.managers.feature3'),
                      t('byRoles.managers.feature4'),
                      t('byRoles.managers.feature5')
                    ].map((item, index) => <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-compliance-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{item}</span>
                      </li>)}
                  </ul>
                </div>
                
                <div className="flex flex-col">
                  {/* Manager visualization */}
                  <div className="bg-slate-50 rounded-xl p-6 shadow-md border border-slate-200">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="font-medium text-slate-900">{t('byRoles.managers.dashboard.title')}</h5>
                      <BarChart3 className="h-5 w-5 text-compliance-600" />
                    </div>
                    
                    {/* Mock dashboard visualization */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white rounded-lg p-3 border border-slate-200">
                        <div className="text-sm text-slate-600 mb-1">{t('byRoles.managers.dashboard.riskStatus')}</div>
                        <div className="text-xl font-semibold text-slate-900 mb-2">87<span className="text-compliance-600 text-sm ml-1">/ 100</span></div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-red-400 to-green-400 h-2 rounded-full" style={{
                          width: '87%'
                        }}></div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 border border-slate-200">
                        <div className="text-sm text-slate-600 mb-1">{t('byRoles.managers.dashboard.taskCompletion')}</div>
                        <div className="text-xl font-semibold text-slate-900 mb-2">92<span className="text-innovation-600 text-sm ml-1">%</span></div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-innovation-500 h-2 rounded-full" style={{
                          width: '92%'
                        }}></div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 border border-slate-200">
                        <div className="text-sm text-slate-600 mb-1">{t('byRoles.managers.dashboard.frameworks')}</div>
                        <div className="text-xl font-semibold text-slate-900">3<span className="text-slate-600 text-sm ml-1">{t('byRoles.managers.dashboard.active')}</span></div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 border border-slate-200">
                        <div className="text-sm text-slate-600 mb-1">{t('byRoles.managers.dashboard.dueTasks')}</div>
                        <div className="text-xl font-semibold text-slate-900">7<span className="text-slate-600 text-sm ml-1">{t('byRoles.managers.dashboard.thisWeek')}</span></div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <div className="text-sm text-slate-600 mb-2">{t('byRoles.managers.dashboard.frameworkProgress')}</div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1 text-slate-700">
                            <span>ISO 27001</span>
                            <span>78%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-1.5">
                            <div className="bg-compliance-500 h-1.5 rounded-full" style={{
                            width: '78%'
                          }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1 text-slate-700">
                            <span>SOC 2</span>
                            <span>93%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-1.5">
                            <div className="bg-compliance-500 h-1.5 rounded-full" style={{
                            width: '93%'
                          }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1 text-slate-700">
                            <span>GDPR</span>
                            <span>65%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-1.5">
                            <div className="bg-compliance-500 h-1.5 rounded-full" style={{
                            width: '65%'
                          }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Contributors Tab Content */}
          <TabsContent value="contributors" className="mt-6">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    {t('byRoles.contributors.title')}
                  </h3>
                  
                  <h4 className="text-lg font-semibold text-innovation-600 mt-6 mb-3">{t('byRoles.contributors.whoTheyAre')}</h4>
                  <p className="text-slate-700 mb-6">
                    {t('byRoles.contributors.whoDescription')}
                  </p>
                  
                  <h4 className="text-lg font-semibold text-innovation-600 mt-8 mb-3">{t('byRoles.contributors.whatTheyGet')}</h4>
                  <ul className="space-y-3 mb-8">
                    {[
                      t('byRoles.contributors.feature1'),
                      t('byRoles.contributors.feature2'),
                      t('byRoles.contributors.feature3'),
                      t('byRoles.contributors.feature4')
                    ].map((item, index) => <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-innovation-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{item}</span>
                      </li>)}
                  </ul>
                </div>
                
                <div className="flex flex-col">
                  {/* Contributor visualization */}
                  <div className="bg-slate-50 rounded-xl p-6 shadow-md border border-slate-200">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="font-medium text-slate-900">{t('byRoles.contributors.dashboard.title')}</h5>
                      <Calendar className="h-5 w-5 text-innovation-600" />
                    </div>
                    
                    {/* Mock task view */}
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3 border-l-4 border-red-500 border border-slate-200">
                        <div className="flex justify-between">
                          <div className="text-sm font-medium mb-1 text-slate-900">{t('byRoles.contributors.dashboard.updatePolicy')}</div>
                          <div className="text-xs text-red-600">{t('byRoles.contributors.dashboard.dueToday')}</div>
                        </div>
                        <div className="text-xs text-slate-600 mb-2">{t('byRoles.contributors.dashboard.for')} ISO 27001 - A.16.1.1</div>
                        <div className="flex justify-between items-center">
                          <div className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-700">{t('byRoles.contributors.dashboard.highPriority')}</div>
                          <button className="text-xs text-innovation-600 hover:text-innovation-700">{t('byRoles.contributors.dashboard.markComplete')}</button>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 border-l-4 border-yellow-500 border border-slate-200">
                        <div className="flex justify-between">
                          <div className="text-sm font-medium mb-1 text-slate-900">{t('byRoles.contributors.dashboard.uploadRecords')}</div>
                          <div className="text-xs text-yellow-600">{t('byRoles.contributors.dashboard.dueIn3Days')}</div>
                        </div>
                        <div className="text-xs text-slate-600 mb-2">{t('byRoles.contributors.dashboard.for')} SOC 2 - CC1.4</div>
                        <div className="flex justify-between items-center">
                          <div className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-700">{t('byRoles.contributors.dashboard.mediumPriority')}</div>
                          <button className="text-xs text-innovation-600 hover:text-innovation-700">{t('byRoles.contributors.dashboard.uploadFiles')}</button>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 border-l-4 border-green-500 border border-slate-200">
                        <div className="flex justify-between">
                          <div className="text-sm font-medium mb-1 text-slate-900">{t('byRoles.contributors.dashboard.reviewPolicy')}</div>
                          <div className="text-xs text-green-600">{t('byRoles.contributors.dashboard.dueIn7Days')}</div>
                        </div>
                        <div className="text-xs text-slate-600 mb-2">{t('byRoles.contributors.dashboard.for')} GDPR - Art. 32</div>
                        <div className="flex justify-between items-center">
                          <div className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-700">{t('byRoles.contributors.dashboard.lowPriority')}</div>
                          <button className="text-xs text-innovation-600 hover:text-innovation-700">{t('byRoles.contributors.dashboard.startReview')}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Auditors Tab Content */}
          <TabsContent value="auditors" className="mt-6">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    {t('byRoles.auditors.title')}
                  </h3>
                  
                  <h4 className="text-lg font-semibold text-compliance-600 mt-6 mb-3">{t('byRoles.auditors.whoTheyAre')}</h4>
                  <p className="text-slate-700 mb-6">
                    {t('byRoles.auditors.whoDescription')}
                  </p>
                  
                  <h4 className="text-lg font-semibold text-compliance-600 mt-8 mb-3">{t('byRoles.auditors.whatTheyGet')}</h4>
                  <ul className="space-y-3 mb-8">
                    {[
                      t('byRoles.auditors.feature1'),
                      t('byRoles.auditors.feature2'),
                      t('byRoles.auditors.feature3'),
                      t('byRoles.auditors.feature4')
                    ].map((item, index) => <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-compliance-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{item}</span>
                      </li>)}
                  </ul>
                </div>
                
                <div className="flex flex-col">
                  {/* Auditor visualization */}
                  <div className="bg-slate-50 rounded-xl p-6 shadow-md border border-slate-200">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="font-medium text-slate-900">{t('byRoles.auditors.dashboard.title')}</h5>
                      <Shield className="h-5 w-5 text-compliance-600" />
                    </div>
                    
                    {/* Mock evidence view */}
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3 border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock className="h-4 w-4 text-compliance-600" />
                          <div className="text-sm font-medium text-slate-900">{t('byRoles.auditors.dashboard.accessControl')}</div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-600 mb-2">
                          <span>ISO 27001 - A.9.2</span>
                          <span>{t('byRoles.auditors.dashboard.lastUpdated')} 2025-01-15</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-600">
                          <FileText className="h-3 w-3 text-slate-600" />
                          <span>AccessControlPolicy_v3.2.pdf</span>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="h-4 w-4 text-compliance-600" />
                          <div className="text-sm font-medium text-slate-900">{t('byRoles.auditors.dashboard.riskAssessment')}</div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-600 mb-2">
                          <span>SOC 2 - CC3.1</span>
                          <span>{t('byRoles.auditors.dashboard.lastUpdated')} 2025-03-22</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-600">
                          <FileText className="h-3 w-3 text-slate-600" />
                          <span>RiskAssessment_2025_Q1.xlsx</span>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="h-4 w-4 text-compliance-600" />
                          <div className="text-sm font-medium text-slate-900">{t('byRoles.auditors.dashboard.securityTraining')}</div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-600 mb-2">
                          <span>{t('byRoles.auditors.dashboard.multipleFrameworks')}</span>
                          <span>{t('byRoles.auditors.dashboard.lastUpdated')} 2025-02-10</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <div className="text-xs px-2 py-0.5 bg-slate-100 rounded flex items-center text-slate-700">
                            <span>4 {t('byRoles.auditors.dashboard.files')}</span>
                          </div>
                          <div className="text-xs px-2 py-0.5 bg-slate-100 rounded flex items-center text-slate-700">
                            <span>2 {t('byRoles.auditors.dashboard.screenshots')}</span>
                          </div>
                          <div className="text-xs px-2 py-0.5 bg-slate-100 rounded flex items-center text-slate-700">
                            <span>1 {t('byRoles.auditors.dashboard.video')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Standalone AI Compliance Officer Section */}
      <section className="mb-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-compliance-100 to-innovation-100 mb-6 shadow-lg">
            <Zap className="h-8 w-8 text-compliance-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
            {t('byRoles.aiSection.title')}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('byRoles.aiSection.subtitle')}
          </p>
        </div>

        {/* 3-column grid with role cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card: Managers */}
          <Card className="bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:border-compliance-200">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-compliance-100 to-compliance-200 flex items-center justify-center shadow-sm">
                <UserCog className="h-6 w-6 text-compliance-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {t('byRoles.aiSection.managers.title')}
              </h3>
            </div>
            <ul className="space-y-3">
              {aiManagersFeatures.map((feat, i) => (
                <li key={i} className="flex items-start">
                  <Zap className="h-4 w-4 text-compliance-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{feat}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Card: Contributors */}
          <Card className="bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:border-innovation-200">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-innovation-100 to-innovation-200 flex items-center justify-center shadow-sm">
                <User className="h-6 w-6 text-innovation-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {t('byRoles.aiSection.contributors.title')}
              </h3>
            </div>
            <ul className="space-y-3">
              {aiContributorsFeatures.map((feat, i) => (
                <li key={i} className="flex items-start">
                  <Zap className="h-4 w-4 text-innovation-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{feat}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Card: Auditors */}
          <Card className="bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:border-compliance-200">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-compliance-100 to-compliance-200 flex items-center justify-center shadow-sm">
                <FileCheck className="h-6 w-6 text-compliance-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {t('byRoles.aiSection.auditors.title')}
              </h3>
            </div>
            <ul className="space-y-3">
              {aiAuditorsFeatures.map((feat, i) => (
                <li key={i} className="flex items-start">
                  <Zap className="h-4 w-4 text-compliance-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{feat}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Outcome Section */}
        <div className="mt-8 bg-gradient-to-r from-slate-50 via-compliance-50/50 to-innovation-50/50 rounded-xl p-8 border border-slate-200 shadow-sm">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-4">
              <CheckCircle className="h-5 w-5 text-compliance-600" />
              <span className="font-semibold text-slate-900">{t('byRoles.aiSection.outcome.title')}</span>
            </div>
            <p className="text-slate-700 text-lg leading-relaxed">
              {t('byRoles.aiSection.outcome.description')}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-slate-900 to-compliance-950 text-white rounded-xl p-8 shadow-xl border border-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            {t('byRoles.cta.title')}
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            {t('byRoles.cta.description')}
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white px-8 py-6 shadow-lg">
            <Link to={`/${currentLocale}/contact`}>
              {t('byRoles.cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </PageTemplate>;
};
export default ByRoles;
