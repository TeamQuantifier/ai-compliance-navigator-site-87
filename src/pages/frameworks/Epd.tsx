import PageTemplate from '@/components/PageTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowRight, FileCheck, CheckCircle, Shield, Building2, Factory, Package, Truck, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import FAQSection from '@/components/seo/FAQSection';
import LcaLifecycleMockup from '@/components/mockups/LcaLifecycleMockup';
import ScenarioExplorerMockup from '@/components/mockups/ScenarioExplorerMockup';
import EpdReportGeneratorMockup from '@/components/mockups/EpdReportGeneratorMockup';

const badgeColorMap: Record<string, string> = {
  green: 'bg-green-100 text-green-800',
  orange: 'bg-orange-100 text-orange-800',
  blue: 'bg-blue-100 text-blue-800',
  amber: 'bg-amber-100 text-amber-800',
};

const processIcons = [FileCheck, Factory, Shield, Globe];

const Epd = () => {
  const { t, currentLocale } = useLanguage();

  const audiences = t('epdPage.audience.items', { returnObjects: true }) as Array<{ title: string; description: string }>;
  const processSteps = t('epdPage.process.steps', { returnObjects: true }) as Array<{ number: string; title: string; description: string; details: string[] }>;
  const advantages = t('epdPage.advantages.items', { returnObjects: true }) as Array<{ title: string; description: string }>;
  const useCases = t('epdPage.useCases.items', { returnObjects: true }) as Array<{ tabLabel: string; badge: string; badgeColor: string; title: string; description: string; features: string[] }>;

  const audienceIcons = [Building2, Package, Truck, Globe];
  const advantageIcons = [Shield, Factory, FileCheck, Globe, CheckCircle, Package];

  return (
    <PageTemplate
      title={t('epdPage.title')}
      description={t('epdPage.description')}
    >
      <div className="max-w-6xl mx-auto">

        {/* Hero */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                ISO 14025 · EN 15804
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t('epdPage.hero.title')}
              </h1>
              <p className="text-lg text-slate-600 mb-6">
                {t('epdPage.hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link to={`/${currentLocale}/contact`}>
                    {t('epdPage.cta.bookDemo')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50" asChild>
                  <Link to={`/${currentLocale}/contact`}>
                    {t('epdPage.cta.talkExpert')}
                  </Link>
                </Button>
              </div>
              {/* TÜV NORD */}
              <div className="flex items-center space-x-3 mt-6 pt-6 border-t border-slate-200">
                <img
                  src="/lovable-uploads/edcfd427-dd46-414b-a937-7fcf86b91e04.png"
                  alt="TÜV NORD Verified Product Certificate"
                  loading="lazy"
                  width="60"
                  height="60"
                  className="h-14 w-auto"
                />
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">{t('features.multiFramework.certified')}</h4>
                  <p className="text-xs text-slate-500">{t('features.multiFramework.verifiedBy')}</p>
                </div>
              </div>
            </div>

            {/* Right: Report generator mockup */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/40 to-indigo-200/40 rounded-2xl blur-2xl" />
              <div className="relative rounded-xl overflow-hidden">
                <EpdReportGeneratorMockup />
              </div>
            </div>
          </div>
        </section>

        {/* What is EPD */}
        <section className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-slate-900">
            {t('epdPage.whatIs.title')}
          </h2>
          <p className="text-center text-slate-600 max-w-3xl mx-auto mb-6">
            {t('epdPage.whatIs.description')}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {(t('epdPage.whatIs.keyPoints', { returnObjects: true }) as Array<{ title: string; description: string }>)?.map((point, i) => (
              <Card key={i} className="p-5 border-blue-100 bg-white/80">
                <CheckCircle className="h-6 w-6 text-blue-600 mb-3" />
                <h4 className="font-semibold text-slate-800 mb-1">{point.title}</h4>
                <p className="text-sm text-slate-600">{point.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* For whom */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-900">
            {t('epdPage.audience.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.isArray(audiences) && audiences.map((aud, i) => {
              const AudIcon = audienceIcons[i] || Building2;
              return (
                <Card key={i} className="p-5 border-slate-200">
                  <AudIcon className="h-6 w-6 text-blue-600 mb-3" />
                  <h4 className="font-semibold text-slate-800 mb-1">{aud.title}</h4>
                  <p className="text-sm text-slate-600">{aud.description}</p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Process - 4 Steps */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-slate-900">
            {t('epdPage.process.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.isArray(processSteps) && processSteps.map((step, i) => {
              const StepIcon = processIcons[i] || FileCheck;
              return (
                <Card key={i} className="p-6 border-blue-100 relative">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-bold text-blue-600">{step.number}</span>
                    <StepIcon className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 mb-3">{step.description}</p>
                  <ul className="space-y-1">
                    {Array.isArray(step.details) && step.details.map((d, j) => (
                      <li key={j} className="text-xs text-slate-500 flex items-center gap-1.5">
                        <CheckCircle className="h-3 w-3 text-blue-400 flex-shrink-0" /> {d}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Platform Mockup - Scenario Explorer */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-slate-900">
            {currentLocale === 'pl' ? 'Eksplorator scenariuszy what-if' : 'What-if Scenario Explorer'}
          </h2>
          <p className="text-center text-slate-600 mb-8 max-w-2xl mx-auto">
            {currentLocale === 'pl'
              ? 'Przesuwaj suwaki i obserwuj, jak zmiany w recyklingu, materiałach i transporcie wpływają na ślad węglowy produktu.'
              : 'Adjust sliders and see how changes in recycling, materials, and transport affect your product carbon footprint.'}
          </p>
          <ScenarioExplorerMockup />
        </section>

        {/* Platform Mockup - Lifecycle */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-slate-900">
            {currentLocale === 'pl' ? 'Granice systemu i cykl życia produktu' : 'System Boundaries & Product Lifecycle'}
          </h2>
          <p className="text-center text-slate-600 mb-8 max-w-2xl mx-auto">
            {currentLocale === 'pl'
              ? 'Określ zakres analizy — od kołyski do bramy, od bramy do grobu, lub pełny cykl życia produktu.'
              : 'Define the scope of analysis — cradle to gate, gate to grave, or full product lifecycle.'}
          </p>
          <LcaLifecycleMockup />
        </section>

        <section className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-900">
            {t('epdPage.advantages.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(advantages) && advantages.map((adv, i) => {
              const AdvIcon = advantageIcons[i] || CheckCircle;
              return (
                <Card key={i} className="p-6 border-blue-100 bg-white/80">
                  <AdvIcon className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="font-semibold text-slate-800 mb-2">{adv.title}</h3>
                  <p className="text-sm text-slate-600">{adv.description}</p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Use Cases Tabs */}
        <section className="mb-16" data-use-cases-section>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-slate-900">
            {t('epdPage.useCases.sectionTitle')}
          </h2>
          <p className="text-center text-slate-600 mb-8 max-w-2xl mx-auto">
            {t('epdPage.useCases.sectionSubtitle')}
          </p>

          {Array.isArray(useCases) && (
            <Tabs defaultValue="0" className="w-full">
              <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0 mb-6 justify-center">
                {useCases.map((uc, i) => (
                  <TabsTrigger
                    key={i}
                    value={String(i)}
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-4 py-2 rounded-full border border-slate-200 data-[state=active]:border-blue-600 text-sm font-medium"
                  >
                    {uc.tabLabel}
                  </TabsTrigger>
                ))}
              </TabsList>

              {useCases.map((uc, i) => (
                <TabsContent key={i} value={String(i)}>
                  <Card className="p-6 md:p-8 border-slate-200">
                    <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${badgeColorMap[uc.badgeColor] || badgeColorMap.blue}`}>
                      {uc.badge}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">{uc.title}</h3>
                    <p className="text-slate-600 mb-6 max-w-3xl">{uc.description}</p>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-3">{t('epdPage.useCases.keyFeatures')}</h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {Array.isArray(uc.features) && uc.features.map((f, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6">
                      <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                        <Link to={`/${currentLocale}/contact`}>
                          {t('epdPage.useCases.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </section>

        {/* FAQ */}
        <FAQSection
          title={t('epdPage.faq.title')}
          faqs={(t('epdPage.faq.items', { returnObjects: true }) as Array<{ question: string; answer: string }>) || []}
          pageUrl={`https://envirly.com/${currentLocale}/frameworks/product-level/epd`}
        />

        {/* CTA */}
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold mb-3 text-slate-800">
            {t('epdPage.cta.title')}
          </h2>
          <p className="text-lg text-slate-700 mb-6 max-w-3xl mx-auto">
            {t('epdPage.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link to={`/${currentLocale}/contact`}>
                {t('epdPage.cta.bookDemo')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50" asChild>
              <Link to={`/${currentLocale}/frameworks/product-level/dpp`}>
                {t('epdPage.cta.seeDpp')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Epd;
