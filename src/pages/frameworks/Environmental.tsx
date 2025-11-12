import { useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Leaf, Recycle, FileText, BarChart3, Clock, Globe, AlertCircle, Zap, Shield, PieChart, Activity, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import Iso14001Dashboard from '@/components/dashboards/environmental/Iso14001Dashboard';
import LcaDashboard from '@/components/dashboards/environmental/LcaDashboard';
import CarbonFootprintDashboard from '@/components/dashboards/environmental/CarbonFootprintDashboard';
import DecarbonisationDashboard from '@/components/dashboards/environmental/DecarbonisationDashboard';
import { useLanguage } from '@/contexts/LanguageContext';

const Environmental = () => {
  const [activeTab, setActiveTab] = useState("iso14001");
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

  return (
    <PageTemplate
      title={t('environmentalPage.title')}
      description={t('environmentalPage.description')}
    >
      <div className="max-w-6xl mx-auto">
        {/* Framework Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto mb-8">
            <TabsTrigger value="iso14001" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
              {t('environmentalPage.tabs.iso14001')}
            </TabsTrigger>
            <TabsTrigger value="lca" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
              {t('environmentalPage.tabs.lca')}
            </TabsTrigger>
            <TabsTrigger value="carbon" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
              {t('environmentalPage.tabs.carbon')}
            </TabsTrigger>
            <TabsTrigger value="decarbonisation" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
              {t('environmentalPage.tabs.decarbonisation')}
            </TabsTrigger>
          </TabsList>

          {/* ISO 14001 Tab Content */}
          <TabsContent value="iso14001" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  {t('environmentalPage.iso14001.title')}
                </h2>
                <p className="text-slate-600 mb-6">
                  {t('environmentalPage.iso14001.description')}
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">{t('environmentalPage.iso14001.featuresTitle')}</h3>
                  <FeatureItem icon={CheckCircle} title={t('environmentalPage.iso14001.features.0.title')}>
                    {t('environmentalPage.iso14001.features.0.description')}
                  </FeatureItem>
                  <FeatureItem icon={FileText} title={t('environmentalPage.iso14001.features.1.title')}>
                    {t('environmentalPage.iso14001.features.1.description')}
                  </FeatureItem>
                  <FeatureItem icon={Clock} title={t('environmentalPage.iso14001.features.2.title')}>
                    {t('environmentalPage.iso14001.features.2.description')}
                  </FeatureItem>
                  <FeatureItem icon={BarChart3} title={t('environmentalPage.iso14001.features.3.title')}>
                    {t('environmentalPage.iso14001.features.3.description')}
                  </FeatureItem>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                <div className="rounded-lg shadow-md w-full overflow-hidden">
                  <Iso14001Dashboard />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* LCA Tab Content */}
          <TabsContent value="lca" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  {t('environmentalPage.lca.title')}
                </h2>
                <p className="text-slate-600 mb-6">
                  {t('environmentalPage.lca.description')}
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">{t('environmentalPage.lca.featuresTitle')}</h3>
                  <FeatureItem icon={Zap} title={t('environmentalPage.lca.features.0.title')}>
                    {t('environmentalPage.lca.features.0.description')}
                  </FeatureItem>
                  <FeatureItem icon={CheckCircle} title={t('environmentalPage.lca.features.1.title')}>
                    {t('environmentalPage.lca.features.1.description')}
                  </FeatureItem>
                  <FeatureItem icon={BarChart3} title={t('environmentalPage.lca.features.2.title')}>
                    {t('environmentalPage.lca.features.2.description')}
                  </FeatureItem>
                  <FeatureItem icon={FileText} title={t('environmentalPage.lca.features.3.title')}>
                    {t('environmentalPage.lca.features.3.description')}
                  </FeatureItem>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-100">
                <div className="rounded-lg shadow-md w-full overflow-hidden">
                  <LcaDashboard />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Carbon Footprint Tab Content */}
          <TabsContent value="carbon" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  {t('environmentalPage.carbon.title')}
                </h2>
                <p className="text-slate-600 mb-6">
                  {t('environmentalPage.carbon.description')}
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">{t('environmentalPage.carbon.featuresTitle')}</h3>
                  <FeatureItem icon={PieChart} title={t('environmentalPage.carbon.features.0.title')}>
                    {t('environmentalPage.carbon.features.0.description')}
                  </FeatureItem>
                  <FeatureItem icon={Zap} title={t('environmentalPage.carbon.features.1.title')}>
                    {t('environmentalPage.carbon.features.1.description')}
                  </FeatureItem>
                  <FeatureItem icon={BarChart3} title={t('environmentalPage.carbon.features.2.title')}>
                    {t('environmentalPage.carbon.features.2.description')}
                  </FeatureItem>
                  <FeatureItem icon={FileText} title={t('environmentalPage.carbon.features.3.title')}>
                    {t('environmentalPage.carbon.features.3.description')}
                  </FeatureItem>
                </div>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-green-50 p-4 rounded-lg border border-teal-100">
                <div className="rounded-lg shadow-md w-full overflow-hidden">
                  <CarbonFootprintDashboard />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Decarbonisation Tab Content */}
          <TabsContent value="decarbonisation" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  {t('environmentalPage.decarbonisation.title')}
                </h2>
                <p className="text-slate-600 mb-6">
                  {t('environmentalPage.decarbonisation.description')}
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">{t('environmentalPage.decarbonisation.featuresTitle')}</h3>
                  <FeatureItem icon={Target} title={t('environmentalPage.decarbonisation.features.0.title')}>
                    {t('environmentalPage.decarbonisation.features.0.description')}
                  </FeatureItem>
                  <FeatureItem icon={Activity} title={t('environmentalPage.decarbonisation.features.1.title')}>
                    {t('environmentalPage.decarbonisation.features.1.description')}
                  </FeatureItem>
                  <FeatureItem icon={AlertCircle} title={t('environmentalPage.decarbonisation.features.2.title')}>
                    {t('environmentalPage.decarbonisation.features.2.description')}
                  </FeatureItem>
                  <FeatureItem icon={Globe} title={t('environmentalPage.decarbonisation.features.3.title')}>
                    {t('environmentalPage.decarbonisation.features.3.description')}
                  </FeatureItem>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                <div className="rounded-lg shadow-md w-full overflow-hidden">
                  <DecarbonisationDashboard />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Why Choose Quantifier Section */}
        <div className="my-16 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
            {t('environmentalPage.whyQuantifier.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 border-green-100 bg-white/80">
              <Zap className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('environmentalPage.whyQuantifier.features.aiNative.title')}</h3>
              <p className="text-slate-600">{t('environmentalPage.whyQuantifier.features.aiNative.description')}</p>
            </Card>
            
            <Card className="p-6 border-green-100 bg-white/80">
              <Clock className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('environmentalPage.whyQuantifier.features.alwaysUpdated.title')}</h3>
              <p className="text-slate-600">{t('environmentalPage.whyQuantifier.features.alwaysUpdated.description')}</p>
            </Card>
            
            <Card className="p-6 border-green-100 bg-white/80">
              <Shield className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('environmentalPage.whyQuantifier.features.endToEnd.title')}</h3>
              <p className="text-slate-600">{t('environmentalPage.whyQuantifier.features.endToEnd.description')}</p>
            </Card>
            
            <Card className="p-6 border-green-100 bg-white/80">
              <Leaf className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('environmentalPage.whyQuantifier.features.fastImplementation.title')}</h3>
              <p className="text-slate-600">{t('environmentalPage.whyQuantifier.features.fastImplementation.description')}</p>
            </Card>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-10 text-center">
          <p className="text-lg text-slate-700 mb-6">
            {t('environmentalPage.cta.title')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              {t('environmentalPage.cta.bookDemo')} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
              {t('environmentalPage.cta.watchTour')}
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Environmental;
