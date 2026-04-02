import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Link2, Layers, BarChart3, CheckCircle, Globe, ClipboardCheck, TrendingUp, Users, FileSearch } from 'lucide-react';
import SupplierScoringMockup from '@/components/mockups/SupplierScoringMockup';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import FAQSection from '@/components/seo/FAQSection';

const ValueChain = () => {
  const { t, currentLocale } = useLanguage();

  const steps = [
    { icon: Users, key: 'identify' },
    { icon: FileSearch, key: 'assess' },
    { icon: BarChart3, key: 'score' },
    { icon: TrendingUp, key: 'monitor' },
  ];

  const capabilities = [
    { icon: Link2, key: 'supplierMapping' },
    { icon: Layers, key: 'dueDiligence' },
    { icon: BarChart3, key: 'riskScoring' },
    { icon: Globe, key: 'esgSupplyChain' },
    { icon: ClipboardCheck, key: 'complianceTracking' },
    { icon: TrendingUp, key: 'continuousMonitoring' },
  ];

  const frameworks = ['iso27001', 'nis2', 'dora', 'csrd', 'gdpr', 'esg'];
  const faqKeys = ['whatIsValueChain', 'howScoring', 'whichFrameworks', 'supplierOnboarding', 'continuousMonitoring'];

  return (
    <PageTemplate
      title={t('seo.product.valueChain.title')}
      description={t('seo.product.valueChain.description')}
    >
      <div className="max-w-6xl mx-auto">
        {/* 1. Hero */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t('product.valueChain.hero.title')}
                </h2>
                <p className="text-lg opacity-90 mb-6">
                  {t('product.valueChain.hero.subtitle')}
                </p>
                <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90" asChild>
                  <Link to={`/${currentLocale}/contact`}>
                    {t('product.valueChain.hero.bookDemo')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="lg:w-1/2">
                <SupplierScoringMockup />
              </div>
            </div>
          </div>
        </section>

        {/* 2. How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
            {t('product.valueChain.howItWorks.title')}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
            {t('product.valueChain.howItWorks.subtitle')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.key} className="text-center">
                <div className="relative mx-auto mb-4">
                  <div className="h-14 w-14 rounded-full bg-[#9b87f5]/10 flex items-center justify-center mx-auto">
                    <step.icon className="h-7 w-7 text-[#7E69AB]" />
                  </div>
                  <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-[#9b87f5] text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold mb-2">{t(`product.valueChain.howItWorks.steps.${step.key}.title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`product.valueChain.howItWorks.steps.${step.key}.description`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Platform Mockup */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
            {t('product.valueChain.dashboard.title')}
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
            {t('product.valueChain.dashboard.subtitle')}
          </p>
          <div className="max-w-4xl mx-auto">
            <SupplierScoringMockup />
          </div>
        </section>

        {/* 4. Key Capabilities */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            {t('product.valueChain.capabilities.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <Card key={cap.key} className="border-[#9b87f5]/20 hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-[#9b87f5]/10 flex items-center justify-center mb-4">
                    <cap.icon className="h-6 w-6 text-[#7E69AB]" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t(`product.valueChain.capabilities.${cap.key}.title`)}</h3>
                  <p className="text-muted-foreground text-sm">{t(`product.valueChain.capabilities.${cap.key}.description`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 5. Framework Coverage */}
        <section className="mb-16 bg-slate-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-3 text-center">
            {t('product.valueChain.frameworks.title')}
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
            {t('product.valueChain.frameworks.subtitle')}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {frameworks.map((fw) => (
              <div key={fw} className="bg-white rounded-lg p-4 text-center border border-slate-200 hover:border-[#9b87f5]/40 transition-colors">
                <h3 className="font-semibold text-sm mb-1">{t(`product.valueChain.frameworks.items.${fw}.name`)}</h3>
                <p className="text-xs text-muted-foreground">{t(`product.valueChain.frameworks.items.${fw}.desc`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. FAQ */}
        <FAQSection
          title={t('product.valueChain.faq.title')}
          faqs={faqKeys.map((key) => ({
            question: t(`product.valueChain.faq.${key}.question`),
            answer: t(`product.valueChain.faq.${key}.answer`),
          }))}
          pageUrl={`https://quantifier.ai/${currentLocale}/product/value-chain`}
        />

        {/* 7. CTA */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                {t('product.valueChain.cta.title')}
              </h2>
              <p className="text-xl opacity-90 mb-8">
                {t('product.valueChain.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90 px-8" asChild>
                  <Link to={`/${currentLocale}/contact`}>
                    {t('product.valueChain.cta.bookDemo')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" className="border-white text-white hover:bg-white/10 border bg-transparent px-8" asChild>
                  <Link to={`/${currentLocale}/plans`}>
                    {t('product.valueChain.cta.explorePlans')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default ValueChain;
