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
                      <CardTitle>Global-Ready</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-slate-700">
                        Designed for multi-entity, multi-region compliance across various regulatory landscapes.
                      </CardDescription>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-compliance-100 hover:border-compliance-300 transition-all card-hover">
                    <CardHeader className="pb-2">
                      <Server className="h-12 w-12 text-compliance-500 mb-2" />
                      <CardTitle>Evidence Automation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-slate-700">
                        Automatically collect, organize, and maintain evidence needed for audits and certification.
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
                      <span className="font-medium">SOC 1 & SOC 2</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-heading">
                      Trust Services Compliance Simplified
                    </h2>
                    <p className="text-lg text-slate-700 mb-6">
                      SOC compliance is critical for building trust with customers and partners. Our platform automates the entire
                      SOC 1 and SOC 2 compliance journey, from initial gap assessment to ongoing monitoring.
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2" />
                        <span className="text-slate-700">Automated evidence collection across all TSCs (Security, Availability, Processing Integrity, Confidentiality, Privacy)</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2" />
                        <span className="text-slate-700">Continuous compliance monitoring with real-time alerting</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2" />
                        <span className="text-slate-700">Pre-audit readiness assessments and remediation</span>
                      </div>
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
                  <h3 className="text-2xl font-bold mb-4">SOC Compliance Features</h3>
                  <p className="text-lg text-slate-700 max-w-3xl mx-auto">
                    Our platform covers all aspects of SOC compliance, making it easier for your organization to achieve and maintain certification.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-compliance-100">
                    <CardHeader>
                      <CardTitle>Trust Services Criteria Mapping</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-4">
                        Comprehensive mapping of all Trust Services Criteria (TSC) to your organization's controls,
                        policies, and procedures. Our AI automatically identifies gaps and suggests remediation actions.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Complete coverage of all TSC categories</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Automated control implementation tracking</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Control testing and validation workflows</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-compliance-100">
                    <CardHeader>
                      <CardTitle>Evidence Collection & Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-4">
                        Streamlined evidence collection process with automated requests, reminders, and approvals.
                        All evidence is securely stored and organized for easy retrieval during audits.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Automated evidence collection schedules</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Role-based assignments and notifications</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Evidence review and approval workflows</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-compliance-100">
                    <CardHeader>
                      <CardTitle>Audit Preparation & Support</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-4">
                        Comprehensive audit preparation tools including readiness assessments, remediation planning,
                        and auditor portal for secure document sharing and collaboration.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Pre-audit readiness assessments</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Secure auditor portal with controlled access</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Audit finding tracking and remediation</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-compliance-100">
                    <CardHeader>
                      <CardTitle>Continuous Monitoring</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-4">
                        Real-time monitoring of control effectiveness with alerts for deviations or failures.
                        Ensures your organization maintains compliance between audit cycles.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Real-time control monitoring</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Automated testing of technical controls</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Deviation alerting and remediation tracking</span>
                        </li>
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
                      <span className="font-medium">NIS 2 Directive</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-heading">
                      EU Cybersecurity Regulatory Compliance
                    </h2>
                    <p className="text-lg text-slate-700 mb-6">
                      The NIS 2 Directive expands cybersecurity obligations across more sectors in the EU. Our platform
                      helps organizations prepare for and maintain compliance with these complex requirements.
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2" />
                        <span className="text-slate-700">Comprehensive risk management framework aligned with NIS 2 requirements</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2" />
                        <span className="text-slate-700">Incident reporting and management workflows</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2" />
                        <span className="text-slate-700">Supply chain security assessment and monitoring</span>
                      </div>
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
                  <h3 className="text-2xl font-bold mb-4">NIS 2 Compliance Features</h3>
                  <p className="text-lg text-slate-700 max-w-3xl mx-auto">
                    Our platform provides comprehensive support for all aspects of NIS 2 compliance, from risk assessment to incident reporting.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-compliance-100">
                    <CardHeader>
                      <CardTitle>Risk Assessment & Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-4">
                        Structured risk assessment methodology aligned with NIS 2 requirements, including
                        threat modeling, vulnerability assessment, and risk treatment planning.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Automated risk assessment workflows</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Risk treatment planning and tracking</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Regular risk review and reassessment</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-compliance-100">
                    <CardHeader>
                      <CardTitle>Incident Management & Reporting</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-4">
                        Comprehensive incident management system including detection, classification,
                        response, and mandatory reporting to competent authorities.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Incident classification and severity assessment</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Automated notification workflows</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Regulatory reporting templates and tracking</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-compliance-100">
                    <CardHeader>
                      <CardTitle>Supply Chain Security</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-4">
                        Tools for assessing and monitoring the security of your supply chain,
                        including vendor risk assessments and ongoing monitoring.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Vendor security assessment questionnaires</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Third-party risk scoring and monitoring</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Supplier security requirements management</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-compliance-100">
                    <CardHeader>
                      <CardTitle>Governance & Documentation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-4">
                        Comprehensive governance framework including policy management,
                        training, and documentation required for NIS 2 compliance.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Policy and procedure management</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Security awareness training tracking</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Governance role assignment and monitoring</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="text-center mt-12">
                  <Button size="lg" asChild className="bg-compliance-600 text-white hover:bg-compliance-700">
                    <Link to="/frameworks/cybersecurity/nis-ii">
                      Learn More About NIS2 Compliance <ArrowRight className="ml-2 h-5 w-5" />
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
                      <span className="font-medium">NIST Framework</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-heading">
                      NIST Cybersecurity Framework Automation
                    </h2>
                    <p className="text-lg text-slate-700 mb-6">
                      The NIST Cybersecurity Framework provides a structured approach to managing cybersecurity risk. 
                      Our platform automates the implementation and continuous monitoring of NIST controls.
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2" />
                        <span className="text-slate-700">Complete coverage of all five NIST functions: Identify, Protect, Detect, Respond, Recover</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2" />
                        <span className="text-slate-700">Automated asset inventory and classification</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2" />
                        <span className="text-slate-700">Risk-based approach to security control implementation</span>
                      </div>
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
                  <h3 className="text-2xl font-bold mb-4">NIST Framework Functions</h3>
                  <p className="text-lg text-slate-700 max-w-3xl mx-auto">
                    Our platform automates each of the five core NIST Cybersecurity Framework functions, ensuring complete coverage.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="border-compliance-100">
                    <CardHeader>
                      <CardTitle>Identify</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-4">
                        Develop an organizational understanding to manage cybersecurity risk to systems, assets, data, and capabilities.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Automated asset management</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Business environment mapping</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Risk assessment automation</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-compliance-100">
                    <CardHeader>
                      <CardTitle>Protect</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-4">
                        Develop and implement appropriate safeguards to ensure delivery of critical infrastructure services.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Access control management</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Data security monitoring</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Information protection processes</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-compliance-100">
                    <CardHeader>
                      <CardTitle>Detect</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-4">
                        Develop and implement appropriate activities to identify the occurrence of a cybersecurity event.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Continuous monitoring automation</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Anomaly detection</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Event detection workflow</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-compliance-100">
                    <CardHeader>
                      <CardTitle>Respond</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-4">
                        Develop and implement appropriate activities to take action regarding a detected cybersecurity incident.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Response planning automation</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Communications coordination</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Analysis and mitigation workflows</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-compliance-100">
                    <CardHeader>
                      <CardTitle>Recover</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-4">
                        Develop and implement appropriate activities to maintain plans for resilience and to restore any capabilities or services.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Recovery planning automation</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Improvements tracking</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-compliance-600 mt-0.5 mr-2" />
                          <span className="text-sm">Communications management</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
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
                Ready to Streamline Your Cybersecurity Compliance?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join organizations that trust our platform to automate their cybersecurity compliance journey.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-compliance-800 hover:bg-white/90 px-8" asChild>
                  <Link to="/contact">
                    Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  Watch Platform Tour
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
