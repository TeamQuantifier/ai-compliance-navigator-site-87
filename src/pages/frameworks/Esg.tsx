
import { useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, BarChart3, Globe, CheckCircle, Zap, Shield, PieChart, Clock, AlertCircle, Leaf, Recycle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, CartesianGrid, Tooltip, LineChart, Line, PieChart as RePieChart, Pie, Cell, Legend } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';

const Esg = () => {
  const [activeTab, setActiveTab] = useState("csdr");
  const { t, currentLocale } = useLanguage();

  // CSDR Chart Data
  const csdrComplianceData = [
    { category: 'Environmental', complete: 85, incomplete: 15 },
    { category: 'Social', complete: 70, incomplete: 30 },
    { category: 'Governance', complete: 90, incomplete: 10 },
    { category: 'Climate', complete: 65, incomplete: 35 },
    { category: 'Ethics', complete: 80, incomplete: 20 },
  ];

  // GRI Chart Data
  const griTrendData = [
    { month: 'Jan', environmental: 65, social: 45, governance: 78 },
    { month: 'Feb', environmental: 68, social: 52, governance: 80 },
    { month: 'Mar', environmental: 72, social: 58, governance: 82 },
    { month: 'Apr', environmental: 75, social: 62, governance: 79 },
    { month: 'May', environmental: 80, social: 68, governance: 85 },
    { month: 'Jun', environmental: 85, social: 75, governance: 88 },
  ];

  // CBAM Chart Data
  const cbamEmissionsData = [
    { name: 'Direct', value: 40 },
    { name: 'Electricity', value: 25 },
    { name: 'Imported', value: 35 },
  ];
  
  const EMISSIONS_COLORS = ['#ef4444', '#3b82f6', '#22c55e'];

  const FeatureItem = ({ icon: Icon, title, children }) => (
    <div className="flex gap-3 mb-5">
      <div className="flex-shrink-0 mt-1">
        <div className="bg-green-100 p-2 rounded-full">
          <Icon className="h-5 w-5 text-green-600" />
        </div>
      </div>
      <div>
        <h4 className="font-medium text-slate-800 mb-1">{title}</h4>
        <p className="text-slate-600">{children}</p>
      </div>
    </div>
  );

  return (
    <PageTemplate
      title={t('seo.frameworks.esg.title')}
      description={t('seo.frameworks.esg.description')}
    >
      <div className="max-w-6xl mx-auto">
        {/* Envirly Promotion Section */}
        <div className="mb-12 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-8 border border-amber-200 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Column - Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Leaf className="h-4 w-4" />
                {t('esgPage.envirly.badge')}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                {t('esgPage.envirly.title')}
              </h2>
              <ul className="space-y-3 text-slate-700 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>{t('esgPage.envirly.features.csrd')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>{t('esgPage.envirly.features.ghg')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>{t('esgPage.envirly.features.lca')}</span>
                </li>
              </ul>
              <Button 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-white"
                asChild
              >
                <a 
                  href={currentLocale === 'pl' ? 'https://www.envirly.pl/' : 'https://www.envirly.com/'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {t('esgPage.envirly.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            
            {/* Right Column - Image */}
            <div className="relative">
              <div className="bg-white rounded-xl shadow-xl border border-amber-100 p-2 transform rotate-1 hover:rotate-0 transition-transform">
                <img 
                  src="/lovable-uploads/envirly-dashboard.png" 
                  alt="Envirly ESG Dashboard"
                  className="rounded-lg w-full"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-400 rounded-full opacity-20 -z-10" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-400 rounded-full opacity-20 -z-10" />
            </div>
          </div>
        </div>

        {/* Framework Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto mb-8">
            <TabsTrigger value="csdr" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
              {t('esgPage.tabs.csdr')}
            </TabsTrigger>
            <TabsTrigger value="gri" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
              {t('esgPage.tabs.gri')}
            </TabsTrigger>
            <TabsTrigger value="cbam" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
              {t('esgPage.tabs.cbam')}
            </TabsTrigger>
          </TabsList>

          {/* CSDR Tab Content */}
          <TabsContent value="csdr" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  {t('esgPage.csdr.title')}
                </h2>
                <p className="text-slate-600 mb-6">
                  {t('esgPage.csdr.description')}
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">{t('esgPage.csdr.featuresTitle')}</h3>
                  {t('esgPage.csdr.features', { returnObjects: true }).map((feature: any, index: number) => (
                    <FeatureItem key={index} icon={[Zap, CheckCircle, BarChart3, AlertCircle, Clock][index]} title={feature.title}>
                      {feature.description}
                    </FeatureItem>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100">
                <h3 className="text-sm font-medium text-green-800 mb-3 flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-green-600" />
                  {t('esgPage.csdr.dashboardTitle')}
                </h3>
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <div className="text-sm text-center font-medium mb-3 text-slate-700">
                    {t('esgPage.csdr.chartTitle')}
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={csdrComplianceData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="category" type="category" width={80} />
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Completion']}
                          labelFormatter={(value) => `${value} Category`}
                        />
                        <Bar dataKey="complete" stackId="a" fill="#22c55e" name="Complete" />
                        <Bar dataKey="incomplete" stackId="a" fill="#e5e7eb" name="Incomplete" />
                        <Legend />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="bg-green-50 py-2 px-3 rounded-md text-xs text-green-700">
                  <div className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" /> 
                    {t('esgPage.csdr.insight')}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* GRI Tab Content */}
          <TabsContent value="gri" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  {t('esgPage.gri.title')}
                </h2>
                <p className="text-slate-600 mb-6">
                  {t('esgPage.gri.description')}
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">{t('esgPage.gri.featuresTitle')}</h3>
                  {t('esgPage.gri.features', { returnObjects: true }).map((feature: any, index: number) => (
                    <FeatureItem key={index} icon={[Globe, FileText, PieChart, Shield][index]} title={feature.title}>
                      {feature.description}
                    </FeatureItem>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-lg border border-emerald-100">
                <h3 className="text-sm font-medium text-emerald-800 mb-3 flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-emerald-600" />
                  {t('esgPage.gri.dashboardTitle')}
                </h3>
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <div className="text-sm text-center font-medium mb-3 text-slate-700">
                    {t('esgPage.gri.chartTitle')}
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={griTrendData}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="environmental" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          activeDot={{ r: 6 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="social" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          activeDot={{ r: 6 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="governance" 
                          stroke="#8b5cf6" 
                          strokeWidth={2}
                          activeDot={{ r: 6 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="bg-emerald-50 py-2 px-3 rounded-md text-xs text-emerald-700">
                  <div className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" /> 
                    {t('esgPage.gri.insight')}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* CBAM Tab Content */}
          <TabsContent value="cbam" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  {t('esgPage.cbam.title')}
                </h2>
                <p className="text-slate-600 mb-6">
                  {t('esgPage.cbam.description')}
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">{t('esgPage.cbam.featuresTitle')}</h3>
                  {t('esgPage.cbam.features', { returnObjects: true }).map((feature: any, index: number) => (
                    <FeatureItem key={index} icon={[BarChart3, CheckCircle, Globe, AlertCircle][index]} title={feature.title}>
                      {feature.description}
                    </FeatureItem>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-green-50 p-6 rounded-lg border border-teal-100">
                <h3 className="text-sm font-medium text-teal-800 mb-3 flex items-center">
                  <PieChart className="h-4 w-4 mr-2 text-teal-600" />
                  {t('esgPage.cbam.dashboardTitle')}
                </h3>
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <div className="text-sm text-center font-medium mb-3 text-slate-700">
                    {t('esgPage.cbam.chartTitle')}
                  </div>
                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={cbamEmissionsData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          innerRadius={40}
                          paddingAngle={5}
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {cbamEmissionsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={EMISSIONS_COLORS[index % EMISSIONS_COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip formatter={(value) => [`${value}%`, 'of Total Emissions']} />
                      </RePieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="bg-teal-50 py-2 px-3 rounded-md text-xs text-teal-700 flex-1">
                    <div className="flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" /> 
                      {t('esgPage.cbam.insight1')}
                    </div>
                  </div>
                  <div className="bg-amber-50 py-2 px-3 rounded-md text-xs text-amber-700 flex-1">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> 
                      {t('esgPage.cbam.insight2')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Why Choose Quantifier Section */}
        <div className="my-16 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
            {t('esgPage.whyQuantifier.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 border-green-100 bg-white/80">
              <Zap className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('esgPage.whyQuantifier.features.fullyAutomated.title')}</h3>
              <p className="text-slate-600">{t('esgPage.whyQuantifier.features.fullyAutomated.description')}</p>
            </Card>
            
            <Card className="p-6 border-green-100 bg-white/80">
              <BarChart3 className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('esgPage.whyQuantifier.features.realTimeInsights.title')}</h3>
              <p className="text-slate-600">{t('esgPage.whyQuantifier.features.realTimeInsights.description')}</p>
            </Card>
            
            <Card className="p-6 border-green-100 bg-white/80">
              <Globe className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('esgPage.whyQuantifier.features.seamlessIntegration.title')}</h3>
              <p className="text-slate-600">{t('esgPage.whyQuantifier.features.seamlessIntegration.description')}</p>
            </Card>
            
            <Card className="p-6 border-green-100 bg-white/80">
              <Shield className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('esgPage.whyQuantifier.features.globalCompliance.title')}</h3>
              <p className="text-slate-600">{t('esgPage.whyQuantifier.features.globalCompliance.description')}</p>
            </Card>
            
            <Card className="p-6 border-green-100 bg-white/80">
              <FileText className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('esgPage.whyQuantifier.features.auditReady.title')}</h3>
              <p className="text-slate-600">{t('esgPage.whyQuantifier.features.auditReady.description')}</p>
            </Card>
            
            <Card className="p-6 border-green-100 bg-white/80">
              <Leaf className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('esgPage.whyQuantifier.features.smartAlerts.title')}</h3>
              <p className="text-slate-600">{t('esgPage.whyQuantifier.features.smartAlerts.description')}</p>
            </Card>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-10 text-center mb-8">
          <h2 className="text-2xl font-bold mb-3 text-slate-800">
            {t('esgPage.cta.title')}
          </h2>
          <p className="text-lg text-slate-700 mb-6 max-w-3xl mx-auto">
            {t('esgPage.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
              <Link to={`/${currentLocale}/contact`}>
                {t('esgPage.cta.bookConsultation')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50" asChild>
              <Link to={`/${currentLocale}/contact`}>
                {t('esgPage.cta.watchDemo')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Esg;
