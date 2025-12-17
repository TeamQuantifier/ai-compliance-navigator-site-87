import { useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Bell, Shield, Users, Clock, CheckCircle, Lock, AlertTriangle, BarChart3, Globe, MessageSquare } from 'lucide-react';
import LegalPoliciesDashboard from '@/components/dashboards/governance/LegalPoliciesDashboard';
import WhistleblowingDashboard from '@/components/dashboards/governance/WhistleblowingDashboard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Governance = () => {
  const [activeTab, setActiveTab] = useState("legal-policies");
  const { t, currentLocale } = useLanguage();
  const FeatureItem = ({
    icon: Icon,
    title,
    children
  }) => <div className="flex gap-3 mb-5">
      <div className="flex-shrink-0 mt-1">
        <div className="bg-purple-100 p-2 rounded-full">
          <Icon className="h-5 w-5 text-purple-600" />
        </div>
      </div>
      <div>
        <h4 className="font-medium text-slate-800 mb-1">{title}</h4>
        <p className="text-slate-600">{children}</p>
      </div>
    </div>;
  return <PageTemplate title={t('seo.frameworks.governance.title')} description={t('seo.frameworks.governance.description')}>
      <div className="max-w-6xl mx-auto">
        {/* Framework Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="legal-policies" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800">
              {t('governancePage.tabs.legalPolicies')}
            </TabsTrigger>
            <TabsTrigger value="whistleblowing" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800">
              {t('governancePage.tabs.whistleblowing')}
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Sections - Added before the description content */}
          <TabsContent value="legal-policies" className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-bold mb-6 text-slate-800">{t('governancePage.legalPolicies.dashboardTitle')}</h3>
              <LegalPoliciesDashboard />
            </div>
            
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  {t('governancePage.legalPolicies.title')}
                </h2>
                <p className="text-slate-600 mb-6">
                  {t('governancePage.legalPolicies.description')}
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">{t('governancePage.legalPolicies.featuresTitle')}</h3>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <FeatureItem key={i} icon={[MessageSquare, CheckCircle, FileText, Bell, BarChart3][i]} title={t(`governancePage.legalPolicies.features.${i}.title`)}>
                      {t(`governancePage.legalPolicies.features.${i}.description`)}
                    </FeatureItem>
                  ))}
                </div>
              </div>
              
            </div>
          </TabsContent>

          {/* Whistleblowing Tab Content */}
          <TabsContent value="whistleblowing" className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-bold mb-6 text-slate-800">{t('governancePage.whistleblowing.dashboardTitle')}</h3>
              <WhistleblowingDashboard />
            </div>
            
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  {t('governancePage.whistleblowing.title')}
                </h2>
                <p className="text-slate-600 mb-6">
                  {t('governancePage.whistleblowing.description')}
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">{t('governancePage.whistleblowing.featuresTitle')}</h3>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <FeatureItem key={i} icon={[Shield, Users, Clock, FileText, Lock][i]} title={t(`governancePage.whistleblowing.features.${i}.title`)}>
                      {t(`governancePage.whistleblowing.features.${i}.description`)}
                    </FeatureItem>
                  ))}
                </div>
              </div>
              
            </div>
          </TabsContent>
        </Tabs>

        {/* Why Choose Quantifier Section */}
        <div className="my-16 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8 border border-purple-100">
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
            {t('governancePage.whyQuantifier.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 border-purple-100 bg-white/80">
              <CheckCircle className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('governancePage.whyQuantifier.features.fullyAutonomous.title')}</h3>
              <p className="text-slate-600">{t('governancePage.whyQuantifier.features.fullyAutonomous.description')}</p>
            </Card>
            
            <Card className="p-6 border-purple-100 bg-white/80">
              <FileText className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('governancePage.whyQuantifier.features.alwaysAuditReady.title')}</h3>
              <p className="text-slate-600">{t('governancePage.whyQuantifier.features.alwaysAuditReady.description')}</p>
            </Card>
            
            <Card className="p-6 border-purple-100 bg-white/80">
              <Shield className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('governancePage.whyQuantifier.features.builtInPrivacy.title')}</h3>
              <p className="text-slate-600">{t('governancePage.whyQuantifier.features.builtInPrivacy.description')}</p>
            </Card>
            
            <Card className="p-6 border-purple-100 bg-white/80">
              <Globe className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('governancePage.whyQuantifier.features.multilingual.title')}</h3>
              <p className="text-slate-600">{t('governancePage.whyQuantifier.features.multilingual.description')}</p>
            </Card>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-10 text-center">
          <p className="text-lg text-slate-700 mb-6">
            {t('governancePage.cta.title')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
              <Link to={`/${currentLocale}/contact`}>
                {t('governancePage.cta.bookDemo')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50" asChild>
              <Link to={`/${currentLocale}/contact`}>
                {t('governancePage.cta.watchTour')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>;
};
export default Governance;