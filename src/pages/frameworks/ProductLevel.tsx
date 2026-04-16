import PageTemplate from '@/components/PageTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowRight, FileText, Scan, QrCode, BarChart3, Shield, Clock, CheckCircle, Zap, Globe, Package, Database, Bot, Link2, CalendarClock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import FAQSection from '@/components/seo/FAQSection';
import DppPassportMockup from '@/components/mockups/DppPassportMockup';
const badgeColorMap: Record<string, string> = {
  green: 'bg-green-100 text-green-800',
  orange: 'bg-orange-100 text-orange-800',
  red: 'bg-red-100 text-red-800',
  blue: 'bg-blue-100 text-blue-800',
  amber: 'bg-amber-100 text-amber-800',
};

const ProductLevel = () => {
  const { t, currentLocale } = useLanguage();

  const timelineSteps = t('productLevelPage.timeline.steps', { returnObjects: true }) as Array<{ date: string; title: string; description: string }>;
  const processSteps = t('productLevelPage.process.steps', { returnObjects: true }) as Array<{ number: string; title: string; description: string; details: string[] }>;
  const advantages = t('productLevelPage.advantages.items', { returnObjects: true }) as Array<{ title: string; description: string }>;
  const dataReqs = t('productLevelPage.dataRequirements.items', { returnObjects: true }) as Array<{ title: string; description: string }>;
  const useCases = t('productLevelPage.useCases.items', { returnObjects: true }) as Array<{ tabLabel: string; badge: string; badgeColor: string; title: string; description: string; features: string[] }>;

  const advantageIcons = [Database, Shield, Link2, BarChart3, FileText, Bot];

  return (
    <PageTemplate
      title={t('productLevelPage.title')}
      description={t('productLevelPage.description')}
    >
      <div className="max-w-6xl mx-auto">

        {/* Hero Section with Mockup */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left: Text */}
            <div>
              <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                ESPR 2024/1781
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t('productLevelPage.hero.title')}
              </h1>
              <p className="text-lg text-slate-600 mb-6">
                {t('productLevelPage.hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-3">
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
              {/* TÜV NORD Certification */}
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

            {/* Right: Passport Mockup */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-200/40 to-emerald-200/40 rounded-2xl blur-2xl" />
              <div className="relative">
                <DppPassportMockup />
              </div>
            </div>
          </div>

          {/* Problem Cards Below */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {(t('productLevelPage.hero.problems', { returnObjects: true }) as Array<{ icon: string; title: string; description: string }>).map((problem, i) => (
              <Card key={i} className="p-6 border-red-100 bg-red-50/50">
                <div className="text-2xl mb-3">{problem.icon}</div>
                <h3 className="font-semibold text-slate-800 mb-2">{problem.title}</h3>
                <p className="text-sm text-slate-600">{problem.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-slate-900">
            {t('productLevelPage.timeline.title')}
          </h2>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-green-200 -translate-x-1/2" />
            <div className="space-y-8">
              {Array.isArray(timelineSteps) && timelineSteps.map((step, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center gap-4 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`md:w-5/12 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <Card className="p-5 border-green-100">
                      <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded">{step.date}</span>
                      <h4 className="font-semibold text-slate-800 mt-2">{step.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{step.description}</p>
                    </Card>
                  </div>
                  <div className="flex-shrink-0 z-10">
                    <div className="w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow" />
                  </div>
                  <div className="md:w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4-Step Process */}
        <section className="mb-16 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-slate-900">
            {t('productLevelPage.process.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.isArray(processSteps) && processSteps.map((step, i) => {
              const StepIcon = [Scan, FileText, BarChart3, QrCode][i];
              return (
                <Card key={i} className="p-6 bg-white/90 border-green-100 relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>
                  <StepIcon className="h-8 w-8 text-green-600 mb-3 mt-2" />
                  <h3 className="font-semibold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 mb-3">{step.description}</p>
                  <ul className="space-y-1">
                    {step.details.map((d, j) => (
                      <li key={j} className="text-xs text-slate-500 flex items-start gap-1.5">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Mandatory Data Requirements */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-900">
            {t('productLevelPage.dataRequirements.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(dataReqs) && dataReqs.map((req, i) => {
              const ReqIcon = [Package, Globe, Zap, Shield, CalendarClock, CheckCircle][i];
              return (
                <Card key={i} className="p-5 border-slate-200">
                  <ReqIcon className="h-6 w-6 text-green-600 mb-3" />
                  <h4 className="font-semibold text-slate-800 mb-1">{req.title}</h4>
                  <p className="text-sm text-slate-600">{req.description}</p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Why Envirly / Advantages */}
        <section className="mb-16 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-900">
            {t('productLevelPage.advantages.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(advantages) && advantages.map((adv, i) => {
              const AdvIcon = advantageIcons[i] || CheckCircle;
              return (
                <Card key={i} className="p-6 border-green-100 bg-white/80">
                  <AdvIcon className="h-8 w-8 text-green-600 mb-4" />
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
            {t('productLevelPage.useCases.sectionTitle')}
          </h2>
          <p className="text-center text-slate-600 mb-8 max-w-2xl mx-auto">
            {t('productLevelPage.useCases.sectionSubtitle')}
          </p>
          
          {Array.isArray(useCases) && (
            <Tabs 
              defaultValue="0" 
              className="w-full"
              onValueChange={(value) => {
                // Prevent scrolling to top when switching tabs
                setTimeout(() => {
                  const element = document.querySelector('[data-use-cases-section]');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }
                }, 0);
              }}
            >
              <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0 mb-6 justify-center">
                {useCases.map((uc, i) => (
                  <TabsTrigger
                    key={i}
                    value={String(i)}
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white px-4 py-2 rounded-full border border-slate-200 data-[state=active]:border-green-600 text-sm font-medium"
                  >
                    {uc.tabLabel}
                  </TabsTrigger>
                ))}
              </TabsList>

              {useCases.map((uc, i) => (
                <TabsContent key={i} value={String(i)}>
                  <Card className="p-6 md:p-8 border-slate-200">
                    <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${badgeColorMap[uc.badgeColor] || badgeColorMap.green}`}>
                      {uc.badge}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">{uc.title}</h3>
                    <p className="text-slate-600 mb-6 max-w-3xl">{uc.description}</p>
                    
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                      {t('productLevelPage.useCases.keyFeatures')}
                    </h4>
                    <ul className="grid md:grid-cols-2 gap-2 mb-6">
                      {uc.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Button className="bg-green-600 hover:bg-green-700" asChild>
                      <Link to={`/${currentLocale}/contact`}>
                        {t('productLevelPage.useCases.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </section>

        {/* FAQ Section */}
        <FAQSection
          title={t('productLevelPage.faq.title')}
          faqs={(t('productLevelPage.faq.items', { returnObjects: true }) as Array<{ question: string; answer: string }>) || []}
          pageUrl={`https://envirly.com/${currentLocale}/frameworks/product-level`}
        />

        {/* CTA */}
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
