import PageTemplate from '@/components/PageTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle, Lock, FileCheck, AlertTriangle, Server, Clock, Zap, Globe, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useState } from 'react';
import AiComplianceDashboard from '@/components/mockups/AiComplianceDashboard';
import { useLanguage } from '@/contexts/LanguageContext';

const Cybersecurity = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { t, currentLocale } = useLanguage();

  return (
    <PageTemplate
      title={t('cybersecurityPage.title')}
      description={t('cybersecurityPage.description')}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-compliance-800 to-innovation-800 rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('cybersecurityPage.hero.title')}
              </h2>
              <p className="text-xl opacity-90 mb-6">
                {t('cybersecurityPage.hero.subtitle')}
              </p>
              <Button size="lg" asChild className="bg-white text-compliance-800 hover:bg-white/90">
                <Link to={`/${currentLocale}/contact`}>
                  {t('cybersecurityPage.hero.button')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="md:w-2/5">
              <AiComplianceDashboard 
                title="SOC 2 Compliance" 
                themeColor="#6E59A5"
                variant="compact"
              />
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="mb-16">
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 gap-2 bg-transparent h-auto p-0 w-full mb-8">
              <TabsTrigger 
                value="overview" 
                className={`data-[state=active]:bg-compliance-100 data-[state=active]:border-compliance-500 border-2 border-transparent px-4 py-3 h-auto`}
              >
                <Shield className="h-5 w-5 mr-2" />
                <span>{t('cybersecurityPage.tabs.overview')}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="soc" 
                className={`data-[state=active]:bg-compliance-100 data-[state=active]:border-compliance-500 border-2 border-transparent px-4 py-3 h-auto`}
              >
                <Lock className="h-5 w-5 mr-2" />
                <span>{t('cybersecurityPage.tabs.soc')}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="nis2" 
                className={`data-[state=active]:bg-compliance-100 data-[state=active]:border-compliance-500 border-2 border-transparent px-4 py-3 h-auto`}
              >
                <Globe className="h-5 w-5 mr-2" />
                <span>{t('cybersecurityPage.tabs.nis2')}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="nist" 
                className={`data-[state=active]:bg-compliance-100 data-[state=active]:border-compliance-500 border-2 border-transparent px-4 py-3 h-auto`}
              >
                <FileCheck className="h-5 w-5 mr-2" />
                <span>{t('cybersecurityPage.tabs.nist')}</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab Content */}
            <TabsContent value="overview">
              {/* Built for Modern Security Demands */}
              <section className="mb-16">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/2">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-compliance-100 text-compliance-800 mb-4">
                      <Shield className="w-5 h-5 mr-2" />
                      <span className="font-medium">{t('cybersecurityPage.overview.badge')}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-heading">
                      {t('cybersecurityPage.overview.title')}
                    </h2>
                    <p className="text-lg text-slate-700 mb-6">
                      {t('cybersecurityPage.overview.description')}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {(t('cybersecurityPage.overview.features', { returnObjects: true }) as string[]).map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2" />
                          <span className="text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <AiComplianceDashboard 
                      title="NIST Framework Overview" 
                      themeColor="#3b82f6"
                      variant="compact"
                    />
                  </div>
                </div>
              </section>

              {/* Supported Frameworks */}
              <section className="mb-16">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-compliance-100 text-compliance-800 mb-4">
                    <Lock className="w-5 h-5 mr-2" />
                    <span className="font-medium">{t('cybersecurityPage.overview.supportedFrameworks.badge')}</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 gradient-heading">
                    {t('cybersecurityPage.overview.supportedFrameworks.title')}
                  </h2>
                  <p className="text-lg text-slate-700 max-w-3xl mx-auto">
                    {t('cybersecurityPage.overview.supportedFrameworks.description')}
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* SOC Framework Card */}
                  <Card className="border-compliance-100 hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex items-center mb-4">
                        <Shield className="h-8 w-8 text-compliance-600 mr-3" />
                        <h3 className="text-2xl font-bold text-slate-900">{t('cybersecurityPage.soc.title')}</h3>
                      </div>
                      <CardTitle className="text-base font-medium text-slate-700">
                        {t('cybersecurityPage.soc.subtitle')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 mb-4">
                        {t('cybersecurityPage.soc.description')}
                      </p>
                      
                      <h4 className="font-semibold text-sm mb-2">{t('cybersecurityPage.soc.featuresTitle')}</h4>
                      <ul className="space-y-2 mb-6 text-sm">
                        {(t('cybersecurityPage.soc.features', { returnObjects: true }) as string[]).map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" className="w-full group" onClick={() => setActiveTab("soc")}>
                        {t('cybersecurityPage.soc.button')} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  {/* NIS 2 Framework Card */}
                  <Card className="border-compliance-100 hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex items-center mb-4">
                        <Globe className="h-8 w-8 text-compliance-600 mr-3" />
                        <h3 className="text-2xl font-bold text-slate-900">{t('cybersecurityPage.nis2.title')}</h3>
                      </div>
                      <CardTitle className="text-base font-medium text-slate-700">
                        {t('cybersecurityPage.nis2.subtitle')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 mb-4">
                        {t('cybersecurityPage.nis2.description')}
                      </p>
                      
                      <h4 className="font-semibold text-sm mb-2">{t('cybersecurityPage.nis2.featuresTitle')}</h4>
                      <ul className="space-y-2 mb-6 text-sm">
                        {(t('cybersecurityPage.nis2.features', { returnObjects: true }) as string[]).map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" className="w-full group" asChild>
                        <Link to={`/${currentLocale}/frameworks/cybersecurity/nis-ii`}>
                          {t('cybersecurityPage.nis2.button')} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  {/* NIST Framework Card */}
                  <Card className="border-compliance-100 hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex items-center mb-4">
                        <FileCheck className="h-8 w-8 text-compliance-600 mr-3" />
                        <h3 className="text-2xl font-bold text-slate-900">{t('cybersecurityPage.nist.title')}</h3>
                      </div>
                      <CardTitle className="text-base font-medium text-slate-700">
                        {t('cybersecurityPage.nist.subtitle')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 mb-4">
                        {t('cybersecurityPage.nist.description')}
                      </p>
                      
                      <h4 className="font-semibold text-sm mb-2">{t('cybersecurityPage.nist.featuresTitle')}</h4>
                      <ul className="space-y-2 mb-6 text-sm">
                        {(t('cybersecurityPage.nist.features', { returnObjects: true }) as string[]).map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" className="w-full group" onClick={() => setActiveTab("nist")}>
                        {t('cybersecurityPage.nist.button')} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Why Quantifier */}
              <section className="mb-16">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-compliance-100 text-compliance-800 mb-4">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    <span className="font-medium">{t('cybersecurityPage.whyPlatform.badge')}</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 gradient-heading">
                    {t('cybersecurityPage.whyPlatform.title')}
                  </h2>
                  <p className="text-lg text-slate-700 max-w-3xl mx-auto">
                    {t('cybersecurityPage.whyPlatform.description')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="border-compliance-100 hover:border-compliance-300 transition-all card-hover">
                    <CardHeader className="pb-2">
                      <Clock className="h-12 w-12 text-compliance-500 mb-2" />
                      <CardTitle>{t('cybersecurityPage.whyPlatform.features.alwaysOn.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-slate-700">
                        {t('cybersecurityPage.whyPlatform.features.alwaysOn.description')}
                      </CardDescription>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-compliance-100 hover:border-compliance-300 transition-all card-hover">
                    <CardHeader className="pb-2">
                      <Zap className="h-12 w-12 text-compliance-500 mb-2" />
                      <CardTitle>{t('cybersecurityPage.whyPlatform.features.zeroManual.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-slate-700">
                        {t('cybersecurityPage.whyPlatform.features.zeroManual.description')}
                      </CardDescription>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-compliance-100 hover:border-compliance-300 transition-all card-hover">
                    <CardHeader className="pb-2">
                      <Shield className="h-12 w-12 text-compliance-500 mb-2" />
                      <CardTitle>{t('cybersecurityPage.whyPlatform.features.fullCoverage.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-slate-700">
                        {t('cybersecurityPage.whyPlatform.features.fullCoverage.description')}
                      </CardDescription>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-compliance-100 hover:border-compliance-300 transition-all card-hover">
                    <CardHeader className="pb-2">
                      <ArrowRight className="h-12 w-12 text-compliance-500 mb-2" />
                      <CardTitle>{t('cybersecurityPage.whyPlatform.features.fasterRollout.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-slate-700">
                        {t('cybersecurityPage.whyPlatform.features.fasterRollout.description')}
                      </CardDescription>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-compliance-100 hover:border-compliance-300 transition-all card-hover">
                    <CardHeader className="pb-2">
                      <Globe className="h-12 w-12 text-compliance-500 mb-2" />
                      <CardTitle>{t('cybersecurityPage.whyPlatform.features.globalReady.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-slate-700">
                        {t('cybersecurityPage.whyPlatform.features.globalReady.description')}
                      </CardDescription>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-compliance-100 hover:border-compliance-300 transition-all card-hover">
                    <CardHeader className="pb-2">
                      <Server className="h-12 w-12 text-compliance-500 mb-2" />
                      <CardTitle>{t('cybersecurityPage.whyPlatform.features.evidenceAutomation.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-slate-700">
                        {t('cybersecurityPage.whyPlatform.features.evidenceAutomation.description')}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </TabsContent>

            {/* SOC Tab Content */}
            <TabsContent value="soc">
              <section className="mb-12">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/2">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-compliance-100 text-compliance-800 mb-4">
                      <Lock className="w-5 h-5 mr-2" />
                      <span className="font-medium">{t('cybersecurityPage.soc.detailedContent.badge')}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-heading">
                      {t('cybersecurityPage.soc.detailedContent.title')}
                    </h2>
                    <p className="text-lg text-slate-700 mb-6">
                      {t('cybersecurityPage.soc.detailedContent.description')}
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      {(t('cybersecurityPage.soc.detailedContent.checklist', { returnObjects: true }) as string[]).map((item, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2" />
                          <span className="text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <AiComplianceDashboard 
                      title="SOC Trust Services" 
                      themeColor="#8B5CF6"
                    />
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">{t('cybersecurityPage.soc.detailedContent.featuresSection.title')}</h3>
                  <p className="text-lg text-slate-700 max-w-3xl mx-auto">
                    {t('cybersecurityPage.soc.detailedContent.featuresSection.description')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-compliance-100">
                    <CardHeader>
                      <CardTitle>{t('cybersecurityPage.soc.detailedContent.features.trustServices.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-4">
                        {t('cybersecurityPage.soc.detailedContent.features.trustServices.description')}
                      </p>
                      <ul className="space-y-2">
                        {(t('cybersecurityPage.soc.detailedContent.features.trustServices.items', { returnObjects: true }) as string[]).map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-compliance-100">
                    <CardHeader>
                      <CardTitle>{t('cybersecurityPage.soc.detailedContent.features.evidenceCollection.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-4">
                        {t('cybersecurityPage.soc.detailedContent.features.evidenceCollection.description')}
                      </p>
                      <ul className="space-y-2">
                        {(t('cybersecurityPage.soc.detailedContent.features.evidenceCollection.items', { returnObjects: true }) as string[]).map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-compliance-100">
                    <CardHeader>
                      <CardTitle>{t('cybersecurityPage.soc.detailedContent.features.auditPreparation.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-4">
                        {t('cybersecurityPage.soc.detailedContent.features.auditPreparation.description')}
                      </p>
                      <ul className="space-y-2">
                        {(t('cybersecurityPage.soc.detailedContent.features.auditPreparation.items', { returnObjects: true }) as string[]).map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-compliance-100">
                    <CardHeader>
                      <CardTitle>{t('cybersecurityPage.soc.detailedContent.features.continuousMonitoring.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-4">
                        {t('cybersecurityPage.soc.detailedContent.features.continuousMonitoring.description')}
                      </p>
                      <ul className="space-y-2">
                        {(t('cybersecurityPage.soc.detailedContent.features.continuousMonitoring.items', { returnObjects: true }) as string[]).map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </TabsContent>

            {/* NIS 2 Tab Content */}
            <TabsContent value="nis2">
              <section className="mb-12">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/2">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-compliance-100 text-compliance-800 mb-4">
                      <Globe className="w-5 h-5 mr-2" />
                      <span className="font-medium">{t('cybersecurityPage.nis2.detailedContent.badge')}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-heading">
                      {t('cybersecurityPage.nis2.detailedContent.title')}
                    </h2>
                    <p className="text-lg text-slate-700 mb-6">
                      {t('cybersecurityPage.nis2.detailedContent.description')}
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      {(t('cybersecurityPage.nis2.detailedContent.checklist', { returnObjects: true }) as string[]).map((item, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2" />
                          <span className="text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <AiComplianceDashboard 
                      title="NIS 2 Compliance Workflow" 
                      themeColor="#6E59A5"
                    />
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">{t('cybersecurityPage.nis2.detailedContent.featuresSection.title')}</h3>
                  <p className="text-lg text-slate-700 max-w-3xl mx-auto">
                    {t('cybersecurityPage.nis2.detailedContent.featuresSection.description')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-compliance-100">
                    <CardHeader>
                      <CardTitle>{t('cybersecurityPage.nis2.detailedContent.features.riskAssessment.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-4">
                        {t('cybersecurityPage.nis2.detailedContent.features.riskAssessment.description')}
                      </p>
                      <ul className="space-y-2">
                        {(t('cybersecurityPage.nis2.detailedContent.features.riskAssessment.items', { returnObjects: true }) as string[]).map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-compliance-100">
                    <CardHeader>
                      <CardTitle>{t('cybersecurityPage.nis2.detailedContent.features.incidentManagement.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-4">
                        {t('cybersecurityPage.nis2.detailedContent.features.incidentManagement.description')}
                      </p>
                      <ul className="space-y-2">
                        {(t('cybersecurityPage.nis2.detailedContent.features.incidentManagement.items', { returnObjects: true }) as string[]).map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-compliance-100">
                    <CardHeader>
                      <CardTitle>{t('cybersecurityPage.nis2.detailedContent.features.supplyChainSecurity.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-4">
                        {t('cybersecurityPage.nis2.detailedContent.features.supplyChainSecurity.description')}
                      </p>
                      <ul className="space-y-2">
                        {(t('cybersecurityPage.nis2.detailedContent.features.supplyChainSecurity.items', { returnObjects: true }) as string[]).map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-compliance-100">
                    <CardHeader>
                      <CardTitle>{t('cybersecurityPage.nis2.detailedContent.features.governance.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-4">
                        {t('cybersecurityPage.nis2.detailedContent.features.governance.description')}
                      </p>
                      <ul className="space-y-2">
                        {(t('cybersecurityPage.nis2.detailedContent.features.governance.items', { returnObjects: true }) as string[]).map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="text-center mt-12">
                  <Button size="lg" asChild className="bg-compliance-600 text-white hover:bg-compliance-700">
                    <Link to={`/${currentLocale}/frameworks/cybersecurity/nis-ii`}>
                      {t('cybersecurityPage.nis2.detailedContent.learnMoreButton')} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </section>
            </TabsContent>
            
            {/* NIST Tab Content */}
            <TabsContent value="nist">
              <section className="mb-12">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/2">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-compliance-100 text-compliance-800 mb-4">
                      <FileCheck className="w-5 h-5 mr-2" />
                      <span className="font-medium">{t('cybersecurityPage.nist.detailedContent.badge')}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-heading">
                      {t('cybersecurityPage.nist.detailedContent.title')}
                    </h2>
                    <p className="text-lg text-slate-700 mb-6">
                      {t('cybersecurityPage.nist.detailedContent.description')}
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      {(t('cybersecurityPage.nist.detailedContent.checklist', { returnObjects: true }) as string[]).map((item, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2" />
                          <span className="text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <AiComplianceDashboard 
                      title="NIST Framework Control Dashboard" 
                      themeColor="#3b82f6"
                    />
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">{t('cybersecurityPage.nist.detailedContent.functionsSection.title')}</h3>
                  <p className="text-lg text-slate-700 max-w-3xl mx-auto">
                    {t('cybersecurityPage.nist.detailedContent.functionsSection.description')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {['identify', 'protect', 'detect', 'respond', 'recover'].map((func) => (
                    <Card key={func} className="border-compliance-100">
                      <CardHeader>
                        <CardTitle>{t(`cybersecurityPage.nist.detailedContent.functions.${func}.title`)}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-700 mb-4">
                          {t(`cybersecurityPage.nist.detailedContent.functions.${func}.description`)}
                        </p>
                        <ul className="space-y-2">
                          {(t(`cybersecurityPage.nist.detailedContent.functions.${func}.items`, { returnObjects: true }) as string[]).map((item, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-compliance-800 to-innovation-700 rounded-xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('cybersecurityPage.finalCta.title')}
              </h2>
              <p className="text-xl opacity-90 mb-8">
                {t('cybersecurityPage.finalCta.description')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-compliance-800 hover:bg-white/90 px-8" asChild>
                  <Link to={`/${currentLocale}/contact`}>
                    {t('cybersecurityPage.finalCta.bookDemo')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  {t('cybersecurityPage.finalCta.watchTour')}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default Cybersecurity;
