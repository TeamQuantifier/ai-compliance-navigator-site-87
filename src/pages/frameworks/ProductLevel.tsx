
import { useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Scan, RefreshCw, QrCode, BarChart3, Shield, Leaf, Clock, CheckCircle, Zap, Recycle, Globe, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import AiComplianceDashboard from '@/components/mockups/AiComplianceDashboard';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';

const ProductLevel = () => {
  const [activeTab, setActiveTab] = useState("dpp");
  const { t, currentLocale } = useLanguage();

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

  // Data for Digital Product Passport visualization
  const dppCompletionData = [
    { name: 'Materials', value: 85 },
    { name: 'Manufacturing', value: 92 },
    { name: 'Certifications', value: 78 },
    { name: 'End of Life', value: 65 }
  ];

  const DPP_COLORS = ['#22c55e', '#16a34a', '#15803d', '#166534'];

  // Data for LCA visualization
  const lcaImpactData = [
    { phase: 'Raw Materials', carbon: 38, water: 45, waste: 25 },
    { phase: 'Manufacturing', carbon: 25, water: 20, waste: 30 },
    { phase: 'Distribution', carbon: 15, water: 10, waste: 12 },
    { phase: 'Usage', carbon: 12, water: 15, waste: 8 },
    { phase: 'End of Life', carbon: 10, water: 10, waste: 25 }
  ];

  return (
    <PageTemplate
      title={t('productLevelPage.title')}
      description={t('productLevelPage.description')}
    >
      <div className="max-w-6xl mx-auto">
        {/* Framework Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="dpp" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
              {t('productLevelPage.tabs.dpp')}
            </TabsTrigger>
            <TabsTrigger value="lca" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
              {t('productLevelPage.tabs.lca')}
            </TabsTrigger>
          </TabsList>

          {/* DPP Tab Content */}
          <TabsContent value="dpp" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  {t('productLevelPage.dpp.title')}
                </h2>
                <p className="text-slate-600 mb-6">
                  {t('productLevelPage.dpp.description')}
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">{t('productLevelPage.dpp.featuresTitle')}</h3>
                  {t('productLevelPage.dpp.features', { returnObjects: true }).map((feature: any, index: number) => (
                    <FeatureItem key={index} icon={[FileText, Globe, RefreshCw, QrCode, CheckCircle][index]} title={feature.title}>
                      {feature.description}
                    </FeatureItem>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100">
                <h3 className="text-lg font-semibold mb-4 text-slate-800 text-center">{t('productLevelPage.dpp.dashboardTitle')}</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dppCompletionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                        labelLine={false}
                      >
                        {dppCompletionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={DPP_COLORS[index % DPP_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 bg-white p-4 rounded-lg border border-green-100">
                  <h4 className="text-sm font-medium text-green-700 mb-2">{t('productLevelPage.dpp.insightTitle')}</h4>
                  <p className="text-xs text-slate-600">{t('productLevelPage.dpp.insight')}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* LCA Tab Content */}
          <TabsContent value="lca" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  {t('productLevelPage.lca.title')}
                </h2>
                <p className="text-slate-600 mb-6">
                  {t('productLevelPage.lca.description')}
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">{t('productLevelPage.lca.featuresTitle')}</h3>
                  {t('productLevelPage.lca.features', { returnObjects: true }).map((feature: any, index: number) => (
                    <FeatureItem key={index} icon={[Leaf, Globe, BarChart3, FileText, Recycle][index]} title={feature.title}>
                      {feature.description}
                    </FeatureItem>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-lg border border-emerald-100">
                <h3 className="text-lg font-semibold mb-4 text-slate-800 text-center">{t('productLevelPage.lca.dashboardTitle')}</h3>
                <div className="h-64">
                  <ChartContainer
                    config={{
                      carbon: { 
                        theme: { 
                          light: '#15803d',
                          dark: '#166534'
                        } 
                      },
                      water: { 
                        theme: { 
                          light: '#0ea5e9',
                          dark: '#0284c7'
                        } 
                      },
                      waste: { 
                        theme: { 
                          light: '#f97316',
                          dark: '#ea580c'
                        } 
                      }
                    }}
                  >
                    <BarChart 
                      data={lcaImpactData} 
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      barGap={0}
                      barCategoryGap="15%"
                    >
                      <XAxis dataKey="phase" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="carbon" name="Carbon Impact" barSize={20} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="water" name="Water Usage" barSize={20} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="waste" name="Waste Production" barSize={20} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
                <div className="mt-4 bg-white p-4 rounded-lg border border-emerald-100">
                  <h4 className="text-sm font-medium text-emerald-700 mb-2">{t('productLevelPage.lca.insightTitle')}</h4>
                  <p className="text-xs text-slate-600">{t('productLevelPage.lca.insight')}</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Why Choose Quantifier Section */}
        <div className="my-16 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
            {t('productLevelPage.whyQuantifier.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 border-green-100 bg-white/80">
              <Package className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('productLevelPage.whyQuantifier.features.aiPowered.title')}</h3>
              <p className="text-slate-600">{t('productLevelPage.whyQuantifier.features.aiPowered.description')}</p>
            </Card>
            
            <Card className="p-6 border-green-100 bg-white/80">
              <RefreshCw className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('productLevelPage.whyQuantifier.features.alwaysUpdated.title')}</h3>
              <p className="text-slate-600">{t('productLevelPage.whyQuantifier.features.alwaysUpdated.description')}</p>
            </Card>
            
            <Card className="p-6 border-green-100 bg-white/80">
              <Recycle className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('productLevelPage.whyQuantifier.features.designedCircularity.title')}</h3>
              <p className="text-slate-600">{t('productLevelPage.whyQuantifier.features.designedCircularity.description')}</p>
            </Card>
            
            <Card className="p-6 border-green-100 bg-white/80">
              <Zap className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('productLevelPage.whyQuantifier.features.fastCompliance.title')}</h3>
              <p className="text-slate-600">{t('productLevelPage.whyQuantifier.features.fastCompliance.description')}</p>
            </Card>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold mb-3 text-slate-800">
            {t('productLevelPage.cta.title')}
          </h2>
          <p className="text-lg text-slate-700 mb-6 max-w-3xl mx-auto">
            {t('productLevelPage.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
              <Link to={`/${currentLocale}/contact`}>
                {t('productLevelPage.cta.bookDemo')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50" asChild>
              <Link to={`/${currentLocale}/contact`}>
                {t('productLevelPage.cta.talkExpert')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ProductLevel;
