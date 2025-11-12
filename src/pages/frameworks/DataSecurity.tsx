
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
      title={t('dataSecurityPage.title')}
      description={t('dataSecurityPage.description')}
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
                  GDPR Compliance: Protect User Data and Build Trust
                </h2>
                <p className="text-slate-600 mb-6">
                  The General Data Protection Regulation (GDPR) governs how organizations collect, process, and store EU citizens' personal data. Quantifier helps you systematically implement and document GDPR requirements, avoiding costly penalties.
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">Key Benefits:</h3>
                  <FeatureItem icon={FileCheck} title="Thorough Documentation">
                    Automated generation of required GDPR documentation, including DPIAs and processing records
                  </FeatureItem>
                  <FeatureItem icon={UserCheck} title="User Rights Management">
                    Tools to efficiently handle data subject access requests and consent management
                  </FeatureItem>
                  <FeatureItem icon={Database} title="Data Processing Oversight">
                    Track and document all data processing activities with clear audit trails
                  </FeatureItem>
                  <FeatureItem icon={Shield} title="Security by Design">
                    Implement technical and organizational measures that fulfill GDPR requirements
                  </FeatureItem>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-100">
                <h3 className="text-lg font-semibold mb-4 text-slate-800 text-center">GDPR Compliance Status</h3>
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
                  <h4 className="text-sm font-medium text-purple-700 mb-2">AI Compliance Insights:</h4>
                  <p className="text-xs text-slate-600">Your GDPR implementation is 85% complete. Focus on strengthening your data processing documentation to improve overall compliance.</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* HIPAA Tab Content */}
          <TabsContent value="hipaa" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  HIPAA: Healthcare Data Protection Made Simple
                </h2>
                <p className="text-slate-600 mb-6">
                  HIPAA sets standards for protecting sensitive patient health information. Quantifier helps healthcare organizations and business associates implement compliant data handling practices with less effort and greater accuracy.
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">Key Benefits:</h3>
                  <FeatureItem icon={Lock} title="PHI Protection">
                    Implement required safeguards for protected health information (PHI) across systems
                  </FeatureItem>
                  <FeatureItem icon={Key} title="Access Controls">
                    Role-based access management with detailed audit logging for all PHI interactions
                  </FeatureItem>
                  <FeatureItem icon={FileCheck} title="Policy Management">
                    AI-generated policies and procedures specific to your healthcare organization
                  </FeatureItem>
                  <FeatureItem icon={ShieldCheck} title="Risk Assessment">
                    Continuous monitoring and automated risk assessment tools
                  </FeatureItem>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-100">
                <h3 className="text-lg font-semibold mb-4 text-slate-800 text-center">HIPAA Compliance Status</h3>
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
                  <h4 className="text-sm font-medium text-purple-700 mb-2">AI Compliance Insights:</h4>
                  <p className="text-xs text-slate-600">Your breach notification procedures need strengthening. Consider implementing our automated incident response workflow to improve compliance.</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* CCPA Tab Content */}
          <TabsContent value="ccpa" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  CCPA/CPRA: California Privacy Compliance
                </h2>
                <p className="text-slate-600 mb-6">
                  The California Consumer Privacy Act and its successor CPRA give California residents greater control over their personal information. Quantifier helps businesses comply with these evolving regulations efficiently and comprehensively.
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">Key Benefits:</h3>
                  <FeatureItem icon={Eye} title="Data Discovery">
                    Automated scanning and classification of personal information in your systems
                  </FeatureItem>
                  <FeatureItem icon={Globe} title="Consumer Rights Portal">
                    Ready-to-deploy consumer request handling system with tracking and documentation
                  </FeatureItem>
                  <FeatureItem icon={EyeOff} title="Data Minimization">
                    Tools to implement and document data minimization and retention policies
                  </FeatureItem>
                  <FeatureItem icon={DatabaseIcon} title="Data Deletion">
                    Streamlined workflows for verifiable consumer deletion requests
                  </FeatureItem>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-100">
                <h3 className="text-lg font-semibold mb-4 text-slate-800 text-center">CCPA Risk Distribution</h3>
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
                  <h4 className="text-sm font-medium text-purple-700 mb-2">AI Compliance Insights:</h4>
                  <p className="text-xs text-slate-600">Most of your data processing activities are low-risk under CCPA. Address the 12% high-risk activities by implementing enhanced consent mechanisms.</p>
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
              <h3 className="font-semibold text-slate-800 mb-2">Multi-Jurisdiction Coverage</h3>
              <p className="text-slate-600">One platform to manage compliance across global data protection regulations, preventing duplicative work.</p>
            </Card>
            
            <Card className="p-6 border-purple-100 bg-white/80">
              <Shield className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">Real-time Monitoring</h3>
              <p className="text-slate-600">Continuous scanning for compliance gaps and automated alerts when issues are detected.</p>
            </Card>
            
            <Card className="p-6 border-purple-100 bg-white/80">
              <DatabaseIcon className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">Data Mapping Automation</h3>
              <p className="text-slate-600">AI-powered discovery and classification of personal data across your organization's systems.</p>
            </Card>
            
            <Card className="p-6 border-purple-100 bg-white/80">
              <FileCheck className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">Audit-Ready Documentation</h3>
              <p className="text-slate-600">Generate comprehensive compliance reports and evidence with a single click.</p>
            </Card>
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
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              {t('dataSecurityPage.cta.bookDemo')} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
              {t('dataSecurityPage.cta.talkExpert')}
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default DataSecurity;
