import PageTemplate from '@/components/PageTemplate';
import { Shield, CheckCircle, ArrowRight, FileCheck, Clock, BarChart4, Globe, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import AiComplianceDashboard from '@/components/mockups/AiComplianceDashboard';
import { useLanguage } from '@/contexts/LanguageContext';

const InformationSecurity = () => {
  const { t, currentLocale } = useLanguage();
  
  return <PageTemplate title={t('seo.frameworks.informationSecurity.title')} description={t('seo.frameworks.informationSecurity.description')}>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#324691] via-[#387fef] to-[#6d38a8] rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('informationSecurityPage.hero.title')}
              </h2>
              <p className="text-xl opacity-90 mb-6">
                {t('informationSecurityPage.hero.subtitle')}
              </p>
              <Button size="lg" className="bg-white text-[#324691] hover:bg-white/90" asChild>
                <Link to={`/${currentLocale}/contact`}>
                  {t('informationSecurityPage.hero.button')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="md:w-2/5">
              
            </div>
          </div>
        </section>

        {/* Framework Tabs */}
        <section className="mb-16">
          <Tabs defaultValue="iso27001" className="w-full">
            <TabsList className="w-full flex justify-between bg-[#e0e2e9]/70 p-1 rounded-xl mb-8">
              <TabsTrigger value="iso27001" className="flex-1 py-3 data-[state=active]:bg-[#6d38a8] data-[state=active]:text-white rounded-lg">
                {t('informationSecurityPage.tabs.iso27001')}
              </TabsTrigger>
              <TabsTrigger value="iso9001" className="flex-1 py-3 data-[state=active]:bg-[#6d38a8] data-[state=active]:text-white rounded-lg">
                {t('informationSecurityPage.tabs.iso9001')}
              </TabsTrigger>
              <TabsTrigger value="dora" className="flex-1 py-3 data-[state=active]:bg-[#6d38a8] data-[state=active]:text-white rounded-lg">
                {t('informationSecurityPage.tabs.dora')}
              </TabsTrigger>
            </TabsList>
            
            {/* ISO 27001 Content */}
            <TabsContent value="iso27001" className="mt-4">
              <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
                <div className="md:w-1/2">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#324691]">
                    {t('informationSecurityPage.iso27001.title')}
                  </h3>
                  <p className="text-lg text-slate-700 mb-6">
                    {t('informationSecurityPage.iso27001.description')}
                  </p>
                  
                  <h4 className="font-semibold text-lg mb-3">{t('informationSecurityPage.iso27001.featuresTitle')}</h4>
                  <ul className="space-y-3 mb-6">
                    {(t('informationSecurityPage.iso27001.features', { returnObjects: true }) as Array<{title: string, description: string}>).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#387fef] mt-1 mr-3 flex-shrink-0" />
                        <span><span className="font-medium">{feature.title}</span> {feature.description}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild>
                    <Link to={`/${currentLocale}/frameworks/information-security/iso-27001`}>
                      {t('informationSecurityPage.iso27001.button')} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-[#e0e2e9]/30 p-4 rounded-xl border border-[#e0e2e9]">
                    <AiComplianceDashboard title="ISO 27001 Compliance" themeColor="#387fef" />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* ISO 9001 Content */}
            <TabsContent value="iso9001" className="mt-4">
              <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
                <div className="md:w-1/2">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#324691]">
                    ISO 9001: Streamline Quality Management
                  </h3>
                  <p className="text-lg text-slate-700 mb-6">
                    ISO 9001 is the benchmark for quality management systems (QMS). Quantifier makes achieving and maintaining ISO 9001 compliance effortless by continuously driving quality management actions, tracking key metrics, and ensuring all necessary documentation is in place.
                  </p>
                  
                  <h4 className="font-semibold text-lg mb-3">You get:</h4>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#387fef] mt-1 mr-3 flex-shrink-0" />
                      <span><span className="font-medium">Automated Task Assignment:</span> Ensure quality management activities are performed consistently and on schedule</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#387fef] mt-1 mr-3 flex-shrink-0" />
                      <span><span className="font-medium">Audit-Ready Reporting:</span> Gather the required quality evidence without lifting a finger</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#387fef] mt-1 mr-3 flex-shrink-0" />
                      <span><span className="font-medium">Proactive Quality Control:</span> Identify quality gaps and resolve them before they escalate</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#387fef] mt-1 mr-3 flex-shrink-0" />
                      <span><span className="font-medium">Cross-Functional Alignment:</span> Involve relevant teams—IT, operations, HR, and legal—without manual oversight</span>
                    </li>
                  </ul>

                  <Button asChild>
                    <Link to={`/${currentLocale}/frameworks/information-security/iso-9001`}>
                      Learn More About ISO 9001 <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-[#e0e2e9]/30 p-4 rounded-xl border border-[#e0e2e9]">
                    <AiComplianceDashboard title="ISO 9001 Quality Management" themeColor="#6d38a8" />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* DORA Content */}
            <TabsContent value="dora" className="mt-4">
              <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
                <div className="md:w-1/2">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#324691]">
                    DORA: Ensure Digital Operational Resilience
                  </h3>
                  <p className="text-lg text-slate-700 mb-6">
                    The Digital Operational Resilience Act (DORA) ensures that financial institutions in the EU can withstand operational disruptions. Quantifier's platform automatically monitors, reports, and enforces resilience measures, ensuring your organization meets the stringent requirements of DORA.
                  </p>
                  
                  <h4 className="font-semibold text-lg mb-3">You get:</h4>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#387fef] mt-1 mr-3 flex-shrink-0" />
                      <span><span className="font-medium">Automated Risk Monitoring:</span> Continuously monitor and manage risks to your digital operations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#387fef] mt-1 mr-3 flex-shrink-0" />
                      <span><span className="font-medium">Incident Response Planning:</span> AI agents help build and execute comprehensive plans for operational disruptions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#387fef] mt-1 mr-3 flex-shrink-0" />
                      <span><span className="font-medium">Third-Party Compliance Management:</span> Ensure your third-party suppliers comply with DORA requirements</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#387fef] mt-1 mr-3 flex-shrink-0" />
                      <span><span className="font-medium">Real-Time Risk & Incident Reporting:</span> Track and mitigate risks before they affect your operations</span>
                    </li>
                  </ul>

                  <Button asChild>
                    <Link to={`/${currentLocale}/frameworks/information-security/dora`}>
                      Learn More About DORA <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-[#e0e2e9]/30 p-4 rounded-xl border border-[#e0e2e9]">
                    <AiComplianceDashboard title="DORA Compliance" themeColor="#324691" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Why Choose Quantifier Section */}
        <section className="mb-16 bg-[#e0e2e9]/30 p-8 rounded-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#324691]">
            {t('informationSecurityPage.whyQuantifier.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-[#e0e2e9] bg-white hover:border-[#387fef]/30 transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#387fef]/10 p-2 mr-4">
                    <Shield className="h-6 w-6 text-[#387fef]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('informationSecurityPage.whyQuantifier.features.autonomous.title')}</h3>
                    <p className="text-slate-600">{t('informationSecurityPage.whyQuantifier.features.autonomous.description')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#e0e2e9] bg-white hover:border-[#387fef]/30 transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#387fef]/10 p-2 mr-4">
                    <FileCheck className="h-6 w-6 text-[#387fef]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('informationSecurityPage.whyQuantifier.features.seamless.title')}</h3>
                    <p className="text-slate-600">{t('informationSecurityPage.whyQuantifier.features.seamless.description')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#e0e2e9] bg-white hover:border-[#387fef]/30 transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#387fef]/10 p-2 mr-4">
                    <Clock className="h-6 w-6 text-[#387fef]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('informationSecurityPage.whyQuantifier.features.realTime.title')}</h3>
                    <p className="text-slate-600">{t('informationSecurityPage.whyQuantifier.features.realTime.description')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#e0e2e9] bg-white hover:border-[#387fef]/30 transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#387fef]/10 p-2 mr-4">
                    <Globe className="h-6 w-6 text-[#387fef]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('informationSecurityPage.whyQuantifier.features.global.title')}</h3>
                    <p className="text-slate-600">{t('informationSecurityPage.whyQuantifier.features.global.description')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#e0e2e9] bg-white hover:border-[#387fef]/30 transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#387fef]/10 p-2 mr-4">
                    <Lock className="h-6 w-6 text-[#387fef]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('informationSecurityPage.whyQuantifier.features.dataFirst.title')}</h3>
                    <p className="text-slate-600">{t('informationSecurityPage.whyQuantifier.features.dataFirst.description')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#e0e2e9] bg-white hover:border-[#387fef]/30 transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#387fef]/10 p-2 mr-4">
                    <BarChart4 className="h-6 w-6 text-[#387fef]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('informationSecurityPage.whyQuantifier.features.intelligent.title')}</h3>
                    <p className="text-slate-600">{t('informationSecurityPage.whyQuantifier.features.intelligent.description')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-[#324691] via-[#387fef] to-[#6d38a8] rounded-xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('informationSecurityPage.cta.title')}
              </h2>
              <p className="text-xl opacity-90 mb-8">
                {t('informationSecurityPage.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-[#324691] hover:bg-white/90 px-8" asChild>
                  <Link to={`/${currentLocale}/contact`}>
                    {t('informationSecurityPage.cta.bookDemo')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 bg-gray-50 text-[#324691] hover:bg-white px-8" asChild>
                  <Link to={`/${currentLocale}/plans`}>
                    {t('informationSecurityPage.cta.explorePlans')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>;
};
export default InformationSecurity;