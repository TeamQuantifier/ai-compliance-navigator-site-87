
import { useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lock, Shield, Database, FileCheck, Globe, Eye, EyeOff, Key, UserCheck, Database as DatabaseIcon, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';

const DataSecurity = () => {
  const [activeTab, setActiveTab] = useState("gdpr");
  const { t, currentLocale } = useLanguage();

  const FeatureItem = ({ icon: Icon, title, children }) => (
    <div className="flex gap-3 mb-5">
      <div className="flex-shrink-0 mt-1">
        <div className="bg-purple-100 p-2 rounded-full">
          <Icon className="h-5 w-5 text-purple-600" />
        </div>
      </div>
      <div>
        <h4 className="font-medium text-slate-800 mb-1">{title}</h4>
        <p className="text-slate-600">{children}</p>
      </div>
    </div>
  );

  // Data for GDPR visualization
  const gdprComplianceData = [
    { name: 'Documentation', value: 88 },
    { name: 'Data Processing', value: 79 },
    { name: 'User Rights', value: 92 },
    { name: 'Security Measures', value: 84 }
  ];

  const GDPR_COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA'];

  // Data for HIPAA visualization
  const hipaaComplianceData = [
    { category: 'Privacy Rule', completed: 85, remaining: 15 },
    { category: 'Security Rule', completed: 90, remaining: 10 },
    { category: 'Breach Notification', completed: 75, remaining: 25 },
    { category: 'Enforcement Rule', completed: 80, remaining: 20 }
  ];

  // Data for CCPA visualization
  const ccpaRisksData = [
    { name: 'High Risk', value: 12 },
    { name: 'Medium Risk', value: 23 },
    { name: 'Low Risk', value: 65 }
  ];

  const CCPA_COLORS = ['#ef4444', '#f97316', '#22c55e'];

  return (
    <PageTemplate
      title={t('seo.frameworks.dataSecurity.title')}
      description={t('seo.frameworks.dataSecurity.description')}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
          {t('dataSecurityPage.pageTitle')}
        </h1>
        <p className="text-lg text-slate-700 text-center mb-10 max-w-3xl mx-auto">
          {t('dataSecurityPage.pageDescription')}
        </p>
        
        {/* Framework Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="gdpr" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800">
              {t('dataSecurityPage.tabs.gdpr')}
            </TabsTrigger>
            <TabsTrigger value="hipaa" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800">
              {t('dataSecurityPage.tabs.hipaa')}
            </TabsTrigger>
            <TabsTrigger value="ccpa" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800">
              {t('dataSecurityPage.tabs.ccpa')}
            </TabsTrigger>
          </TabsList>

          {/* GDPR Tab Content */}
          <TabsContent value="gdpr" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  {t('dataSecurityPage.gdpr.title')}
                </h2>
                <p className="text-slate-600 mb-6">
                  {t('dataSecurityPage.gdpr.description')}
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">{t('dataSecurityPage.gdpr.benefitsTitle')}</h3>
                  {t('dataSecurityPage.gdpr.benefits', { returnObjects: true }).map((benefit: any, index: number) => (
                    <FeatureItem key={index} icon={[FileCheck, UserCheck, Database, Shield][index]} title={benefit.title}>
                      {benefit.description}
                    </FeatureItem>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-100">
                <h3 className="text-lg font-semibold mb-4 text-slate-800 text-center">{t('dataSecurityPage.gdpr.dashboardTitle')}</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={gdprComplianceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                        labelLine={false}
                      >
                        {gdprComplianceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={GDPR_COLORS[index % GDPR_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 bg-white p-4 rounded-lg border border-purple-100">
                  <h4 className="text-sm font-medium text-purple-700 mb-2">{t('dataSecurityPage.gdpr.insightTitle')}</h4>
                  <p className="text-xs text-slate-600">{t('dataSecurityPage.gdpr.insight')}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* HIPAA Tab Content */}
          <TabsContent value="hipaa" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  {t('dataSecurityPage.hipaa.title')}
                </h2>
                <p className="text-slate-600 mb-6">
                  {t('dataSecurityPage.hipaa.description')}
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">{t('dataSecurityPage.hipaa.benefitsTitle')}</h3>
                  {t('dataSecurityPage.hipaa.benefits', { returnObjects: true }).map((benefit: any, index: number) => (
                    <FeatureItem key={index} icon={[Lock, Key, FileCheck, ShieldCheck][index]} title={benefit.title}>
                      {benefit.description}
                    </FeatureItem>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-100">
                <h3 className="text-lg font-semibold mb-4 text-slate-800 text-center">{t('dataSecurityPage.hipaa.dashboardTitle')}</h3>
                <div className="h-64">
                  <ChartContainer
                    config={{
                      completed: { 
                        theme: { 
                          light: '#9b87f5',
                          dark: '#7E69AB'
                        } 
                      },
                      remaining: { 
                        theme: { 
                          light: '#E5DEFF',
                          dark: '#D6BCFA'
                        } 
                      }
                    }}
                  >
                    <BarChart 
                      data={hipaaComplianceData} 
                      margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                      layout="vertical"
                      barGap={0}
                      barCategoryGap="20%"
                    >
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="category" width={120} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="completed" name="Completed" stackId="a" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="remaining" name="Remaining" stackId="a" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
                <div className="mt-4 bg-white p-4 rounded-lg border border-purple-100">
                  <h4 className="text-sm font-medium text-purple-700 mb-2">{t('dataSecurityPage.hipaa.insightTitle')}</h4>
                  <p className="text-xs text-slate-600">{t('dataSecurityPage.hipaa.insight')}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* CCPA Tab Content */}
          <TabsContent value="ccpa" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  {t('dataSecurityPage.ccpa.title')}
                </h2>
                <p className="text-slate-600 mb-6">
                  {t('dataSecurityPage.ccpa.description')}
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">{t('dataSecurityPage.ccpa.benefitsTitle')}</h3>
                  {t('dataSecurityPage.ccpa.benefits', { returnObjects: true }).map((benefit: any, index: number) => (
                    <FeatureItem key={index} icon={[Eye, Globe, EyeOff, DatabaseIcon][index]} title={benefit.title}>
                      {benefit.description}
                    </FeatureItem>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-100">
                <h3 className="text-lg font-semibold mb-4 text-slate-800 text-center">{t('dataSecurityPage.ccpa.dashboardTitle')}</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ccpaRisksData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                        labelLine={false}
                      >
                        {ccpaRisksData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CCPA_COLORS[index % CCPA_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 bg-white p-4 rounded-lg border border-purple-100">
                  <h4 className="text-sm font-medium text-purple-700 mb-2">{t('dataSecurityPage.ccpa.insightTitle')}</h4>
                  <p className="text-xs text-slate-600">{t('dataSecurityPage.ccpa.insight')}</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Why Choose Quantifier Section */}
        <div className="my-16 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8 border border-purple-100">
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
            {t('dataSecurityPage.whyQuantifier.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 border-purple-100 bg-white/80">
              <Lock className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('dataSecurityPage.whyQuantifier.features.multiJurisdiction.title')}</h3>
              <p className="text-slate-600">{t('dataSecurityPage.whyQuantifier.features.multiJurisdiction.description')}</p>
            </Card>
            
            <Card className="p-6 border-purple-100 bg-white/80">
              <Shield className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('dataSecurityPage.whyQuantifier.features.realTimeMonitoring.title')}</h3>
              <p className="text-slate-600">{t('dataSecurityPage.whyQuantifier.features.realTimeMonitoring.description')}</p>
            </Card>
            
            <Card className="p-6 border-purple-100 bg-white/80">
              <DatabaseIcon className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('dataSecurityPage.whyQuantifier.features.dataMapping.title')}</h3>
              <p className="text-slate-600">{t('dataSecurityPage.whyQuantifier.features.dataMapping.description')}</p>
            </Card>
            
            <Card className="p-6 border-purple-100 bg-white/80">
              <FileCheck className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('dataSecurityPage.whyQuantifier.features.auditReady.title')}</h3>
              <p className="text-slate-600">{t('dataSecurityPage.whyQuantifier.features.auditReady.description')}</p>
            </Card>
          </div>
        </div>
        
        {/* Related Solution Link - GDPR */}
        <div className="my-10 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">{t('dataSecurityPage.relatedSolution.title')}</h3>
              <p className="text-slate-600">{t('dataSecurityPage.relatedSolution.description')}</p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white whitespace-nowrap" asChild>
              <Link to={`/${currentLocale}/gdpr-compliance`}>
                {t('dataSecurityPage.relatedSolution.button')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-10 text-center mb-8">
          <h2 className="text-2xl font-bold mb-3 text-slate-800">
            {t('dataSecurityPage.cta.title')}
          </h2>
          <p className="text-lg text-slate-700 mb-6 max-w-3xl mx-auto">
            {t('dataSecurityPage.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
              <Link to={`/${currentLocale}/contact`}>
                {t('dataSecurityPage.cta.bookDemo')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50" asChild>
              <Link to={`/${currentLocale}/contact`}>
                {t('dataSecurityPage.cta.talkExpert')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default DataSecurity;
