import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Users, Eye, TrendingUp, Shield, Clock, Bell } from 'lucide-react';
import ManagerDashboardMockup from '@/components/mockups/ManagerDashboardMockup';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import FAQSection from '@/components/seo/FAQSection';

const Managers = () => {
  const { t, currentLocale } = useLanguage();

  const steps = [
    { icon: Eye, key: 'overview' },
    { icon: Users, key: 'delegate' },
    { icon: BarChart3, key: 'track' },
    { icon: Bell, key: 'report' },
  ];

  const capabilities = [
    { icon: Eye, key: 'overview' },
    { icon: Users, key: 'delegation' },
    { icon: BarChart3, key: 'progress' },
    { icon: TrendingUp, key: 'kpis' },
    { icon: Shield, key: 'riskView' },
    { icon: Clock, key: 'deadlines' },
  ];

  const frameworks = ['iso27001', 'nis2', 'dora', 'gdpr', 'soc2', 'esg'];
  const faqKeys = ['whatIsManagerView', 'howDelegate', 'whichMetrics', 'teamVisibility', 'reporting'];

  return (
    <PageTemplate
      title={t('roles.managers.title')}
      description={t('roles.managers.description')}
    >
      <div className="max-w-6xl mx-auto">
        {/* 1. Hero */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t('roles.managers.hero.title')}
                </h2>
                <p className="text-lg opacity-90 mb-6">
                  {t('roles.managers.hero.subtitle')}
                </p>
                <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90" asChild>
                  <Link to={`/${currentLocale}/contact`}>
                    {t('roles.managers.hero.bookDemo')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="lg:w-1/2">
                <ManagerDashboardMockup />
              </div>
            </div>
          </div>
        </section>

        {/* 2. How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
            {t('roles.managers.howItWorks.title')}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
            {t('roles.managers.howItWorks.subtitle')}
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
                <h3 className="font-semibold mb-2">{t(`roles.managers.howItWorks.steps.${step.key}.title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`roles.managers.howItWorks.steps.${step.key}.description`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Platform Mockup */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
            {t('roles.managers.dashboard.title')}
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
            {t('roles.managers.dashboard.subtitle')}
          </p>
          <div className="max-w-4xl mx-auto">
            <ManagerDashboardMockup />
          </div>
        </section>

        {/* 4. Key Capabilities */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            {t('roles.managers.capabilities.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <Card key={cap.key} className="border-[#9b87f5]/20 hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-[#9b87f5]/10 flex items-center justify-center mb-4">
                    <cap.icon className="h-6 w-6 text-[#7E69AB]" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t(`roles.managers.capabilities.${cap.key}.title`)}</h3>
                  <p className="text-muted-foreground text-sm">{t(`roles.managers.capabilities.${cap.key}.description`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 5. Framework Coverage */}
        <section className="mb-16 bg-slate-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-3 text-center">
            {t('roles.managers.frameworks.title')}
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
            {t('roles.managers.frameworks.subtitle')}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {frameworks.map((fw) => (
              <div key={fw} className="bg-white rounded-lg p-4 text-center border border-slate-200 hover:border-[#9b87f5]/40 transition-colors">
                <h3 className="font-semibold text-sm mb-1">{t(`roles.managers.frameworks.items.${fw}.name`)}</h3>
                <p className="text-xs text-muted-foreground">{t(`roles.managers.frameworks.items.${fw}.desc`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. FAQ */}
        <FAQSection
          title={t('roles.managers.faq.title')}
          faqs={faqKeys.map((key) => ({
            question: t(`roles.managers.faq.${key}.question`),
            answer: t(`roles.managers.faq.${key}.answer`),
          }))}
          pageUrl={`https://quantifier.ai/${currentLocale}/roles/managers`}
        />

        {/* 7. CTA */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                {t('roles.managers.cta.title')}
              </h2>
              <p className="text-xl opacity-90 mb-8">
                {t('roles.managers.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90 px-8" asChild>
                  <Link to={`/${currentLocale}/contact`}>
                    {t('roles.managers.cta.bookDemo')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" className="border-white text-white hover:bg-white/10 border bg-transparent px-8" asChild>
                  <Link to={`/${currentLocale}/plans`}>
                    {t('roles.managers.cta.explorePlans')}
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

export default Managers;
