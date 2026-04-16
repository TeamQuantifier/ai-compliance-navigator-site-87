import PageTemplate from '@/components/PageTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, Shield, Building2, Factory, Package, Truck, Globe, BarChart3, Leaf, Target, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import FAQSection from '@/components/seo/FAQSection';
import LcaResultsMockup from '@/components/mockups/LcaResultsMockup';
import ScenarioExplorerMockup from '@/components/mockups/ScenarioExplorerMockup';
import LcaLifecycleMockup from '@/components/mockups/LcaLifecycleMockup';

const approachIcons = [Target, Building2, Package];
const advantageIcons = [BarChart3, Factory, Shield, Target, Layers, Leaf];
const useCaseIcons = [Package, Building2, Truck];

const badgeColorMap: Record<string, string> = {
  amber: 'bg-amber-100 text-amber-800',
  green: 'bg-green-100 text-green-800',
  blue: 'bg-blue-100 text-blue-800',
  orange: 'bg-orange-100 text-orange-800',
};

const LcaAnalysis = () => {
  const { t, currentLocale } = useLanguage();
  const isPl = currentLocale === 'pl';

  const approaches = t('lcaPage.approaches.items', { returnObjects: true }) as Array<{
    tabLabel: string; badge: string; title: string; description: string; features: string[];
  }>;
  const advantages = t('lcaPage.advantages.items', { returnObjects: true }) as Array<{ title: string; description: string }>;
  const useCases = t('lcaPage.useCases.items', { returnObjects: true }) as Array<{
    tabLabel: string; badge: string; badgeColor: string; title: string; description: string; features: string[];
  }>;
  const whatIsPoints = t('lcaPage.whatIs.keyPoints', { returnObjects: true }) as Array<{ title: string; description: string }>;

  return (
    <PageTemplate
      title={t('lcaPage.title')}
      description={t('lcaPage.description')}
    >
      <div className="max-w-6xl mx-auto">

        {/* Hero */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block bg-amber-100 text-amber-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                ISO 14040 · ISO 14044 · PEF
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t('lcaPage.hero.title')}
              </h1>
              <p className="text-lg text-slate-600 mb-6">
                {t('lcaPage.hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-amber-700 hover:bg-amber-800" asChild>
                  <Link to={`/${currentLocale}/contact`}>
                    {t('lcaPage.cta.bookDemo')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50" asChild>
                  <Link to={`/${currentLocale}/contact`}>
                    {t('lcaPage.cta.talkExpert')}
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

            {/* Right: LCA Results mockup */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200/40 to-orange-200/40 rounded-2xl blur-2xl" />
              <div className="relative rounded-xl overflow-hidden">
                <LcaResultsMockup />
              </div>
            </div>
          </div>
        </section>

        {/* What is LCA */}
        <section className="mb-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-100">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-slate-900">
            {t('lcaPage.whatIs.title')}
          </h2>
          <p className="text-center text-slate-600 max-w-3xl mx-auto mb-6">
            {t('lcaPage.whatIs.description')}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {Array.isArray(whatIsPoints) && whatIsPoints.map((point, i) => (
              <Card key={i} className="p-5 border-amber-100 bg-white/80">
                <CheckCircle className="h-6 w-6 text-amber-600 mb-3" />
                <h4 className="font-semibold text-slate-800 mb-1">{point.title}</h4>
                <p className="text-sm text-slate-600">{point.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Three Approaches Tabs */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-slate-900">
            {t('lcaPage.approaches.title')}
          </h2>
          <p className="text-center text-slate-600 mb-8 max-w-2xl mx-auto">
            {t('lcaPage.approaches.subtitle')}
          </p>

          {Array.isArray(approaches) && (
            <Tabs defaultValue="0" className="w-full">
              <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0 mb-6 justify-center">
                {approaches.map((a, i) => (
                  <TabsTrigger
                    key={i}
                    value={String(i)}
                    className="data-[state=active]:bg-amber-700 data-[state=active]:text-white px-4 py-2 rounded-full border border-slate-200 data-[state=active]:border-amber-700 text-sm font-medium"
                  >
                    {a.tabLabel}
                  </TabsTrigger>
                ))}
              </TabsList>

              {approaches.map((a, i) => {
                const Icon = approachIcons[i] || Target;
                return (
                  <TabsContent key={i} value={String(i)}>
                    <Card className="p-6 md:p-8 border-slate-200">
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className="h-8 w-8 text-amber-600" />
                        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                          {a.badge}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">{a.title}</h3>
                      <p className="text-slate-600 mb-6 max-w-3xl">{a.description}</p>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {Array.isArray(a.features) && a.features.map((f, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </TabsContent>
                );
              })}
            </Tabs>
          )}
        </section>

        {/* Scenario Explorer Mockup */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-slate-900">
            {isPl ? 'Eksplorator scenariuszy what-if' : 'What-if Scenario Explorer'}
          </h2>
          <p className="text-center text-slate-600 mb-8 max-w-2xl mx-auto">
            {isPl
              ? 'Przesuwaj suwaki i obserwuj, jak zmiany w recyklingu, materiałach i transporcie wpływają na ślad węglowy.'
              : 'Adjust sliders and see how changes in recycling, materials, and transport affect the carbon footprint.'}
          </p>
          <ScenarioExplorerMockup />
        </section>

        {/* Lifecycle Boundaries Mockup */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-slate-900">
            {isPl ? 'Granice systemu i cykl życia produktu' : 'System Boundaries & Product Lifecycle'}
          </h2>
          <p className="text-center text-slate-600 mb-8 max-w-2xl mx-auto">
            {isPl
              ? 'Określ zakres analizy — od kołyski do bramy, od bramy do grobu, lub pełny cykl życia produktu.'
              : 'Define the scope — cradle to gate, gate to grave, or full product lifecycle.'}
          </p>
          <LcaLifecycleMockup />
        </section>

        {/* Advantages */}
        <section className="mb-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-100">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-900">
            {t('lcaPage.advantages.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(advantages) && advantages.map((adv, i) => {
              const AdvIcon = advantageIcons[i] || CheckCircle;
              return (
                <Card key={i} className="p-6 border-amber-100 bg-white/80">
                  <AdvIcon className="h-8 w-8 text-amber-600 mb-4" />
                  <h3 className="font-semibold text-slate-800 mb-2">{adv.title}</h3>
                  <p className="text-sm text-slate-600">{adv.description}</p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-16" data-use-cases-section>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-slate-900">
            {t('lcaPage.useCases.sectionTitle')}
          </h2>
          <p className="text-center text-slate-600 mb-8 max-w-2xl mx-auto">
            {t('lcaPage.useCases.sectionSubtitle')}
          </p>

          {Array.isArray(useCases) && (
            <Tabs defaultValue="0" className="w-full">
              <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0 mb-6 justify-center">
                {useCases.map((uc, i) => (
                  <TabsTrigger
                    key={i}
                    value={String(i)}
                    className="data-[state=active]:bg-amber-700 data-[state=active]:text-white px-4 py-2 rounded-full border border-slate-200 data-[state=active]:border-amber-700 text-sm font-medium"
                  >
                    {uc.tabLabel}
                  </TabsTrigger>
                ))}
              </TabsList>

              {useCases.map((uc, i) => (
                <TabsContent key={i} value={String(i)}>
                  <Card className="p-6 md:p-8 border-slate-200">
                    <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${badgeColorMap[uc.badgeColor] || badgeColorMap.amber}`}>
                      {uc.badge}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">{uc.title}</h3>
                    <p className="text-slate-600 mb-6 max-w-3xl">{uc.description}</p>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-3">{t('lcaPage.useCases.keyFeatures')}</h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {Array.isArray(uc.features) && uc.features.map((f, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6">
                      <Button className="bg-amber-700 hover:bg-amber-800" asChild>
                        <Link to={`/${currentLocale}/contact`}>
                          {t('lcaPage.useCases.cta')} <ArrowRight className="ml-2 h-4 w-4" />
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
          title={t('lcaPage.faq.title')}
          faqs={(t('lcaPage.faq.items', { returnObjects: true }) as Array<{ question: string; answer: string }>) || []}
          pageUrl={`https://envirly.com/${currentLocale}/frameworks/product-level/lca-analysis`}
        />

        {/* CTA */}
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold mb-3 text-slate-800">
            {t('lcaPage.cta.title')}
          </h2>
          <p className="text-lg text-slate-700 mb-6 max-w-3xl mx-auto">
            {t('lcaPage.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-amber-700 hover:bg-amber-800" asChild>
              <Link to={`/${currentLocale}/contact`}>
                {t('lcaPage.cta.bookDemo')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50" asChild>
              <Link to={`/${currentLocale}/frameworks/product-level/epd`}>
                {t('lcaPage.cta.seeEpd')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default LcaAnalysis;
