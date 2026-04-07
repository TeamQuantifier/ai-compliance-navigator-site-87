import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import FAQSection from '@/components/seo/FAQSection';
import {
  ArrowRight,
  Shield,
  Leaf,
  Scale,
  GraduationCap,
  CheckCircle2,
  Users,
  Building2,
  Award,
  Target,
} from 'lucide-react';

const CybersecurityTraining = () => {
  const { t, currentLocale } = useLanguage();

  const trainings = [
    {
      icon: Shield,
      key: 'cyber',
      gradient: 'from-slate-900 to-blue-900',
      href: currentLocale === 'pl' ? '/szkolenie-cyberbezpieczenstwo-nis2-iso27001' : '/training-cybersecurity-nis2-iso27001',
    },
    {
      icon: Leaf,
      key: 'esg',
      gradient: 'from-emerald-900 to-teal-800',
      href: currentLocale === 'pl' ? '/szkolenie-esg-csrd' : '/training-esg-csrd',
    },
    {
      icon: Scale,
      key: 'compliance',
      gradient: 'from-violet-900 to-indigo-900',
      href: currentLocale === 'pl' ? '/szkolenie-compliance-zarzadzanie-ryzykiem' : '/training-compliance-risk-management',
    },
  ];

  const whyUs = [
    'experiencedTrainers',
    'practicalApproach',
    'customPrograms',
    'postTrainingSupport',
    'certificationPaths',
    'flexibleFormats',
  ];

  const stats = [
    { value: '500+', label: t('training.hero.stats.participants') },
    { value: '98%', label: t('training.hero.stats.satisfaction') },
    { value: '3', label: t('training.hub.stats.programs') },
    { value: '6+', label: t('training.hero.stats.frameworks') },
  ];

  const faqKeys = ['whoShouldAttend', 'howLong', 'onlineOrOnsite', 'certification', 'pricing'];

  return (
    <PageTemplate
      title={t('seo.training.title')}
      description={t('seo.training.description')}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-8 md:p-12 text-white">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-3/5">
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6">
                  <GraduationCap className="h-4 w-4" />
                  {t('training.hero.badge')}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  {t('training.hero.title')}
                </h1>
                <p className="text-lg opacity-90 mb-6 max-w-xl">
                  {t('training.hero.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90" asChild>
                    <Link to={`/${currentLocale}/contact`}>
                      {t('training.hero.cta')} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                    <a href="#programs">{t('training.hero.ctaSecondary')}</a>
                  </Button>
                </div>
              </div>
              <div className="lg:w-2/5 grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm opacity-70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Training Programs Cards */}
        <section id="programs" className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
            {t('training.programs.title')}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
            {t('training.programs.subtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainings.map((tr) => (
              <Link key={tr.key} to={`/${currentLocale}${tr.href}`} className="group">
                <Card className="h-full overflow-hidden border-border hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  <div className={`bg-gradient-to-br ${tr.gradient} p-6 text-white`}>
                    <tr.icon className="h-10 w-10 mb-3 opacity-90" />
                    <h3 className="text-xl font-bold mb-2">
                      {t(`training.hub.cards.${tr.key}.title`)}
                    </h3>
                    <p className="text-sm opacity-80">
                      {t(`training.hub.cards.${tr.key}.subtitle`)}
                    </p>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground text-sm mb-4">
                      {t(`training.hub.cards.${tr.key}.description`)}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {[1, 2, 3].map((i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          {t(`training.hub.cards.${tr.key}.points.${i}`)}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      {t('training.hub.learnMore')} <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Why Us */}
        <section className="mb-16">
          <div className="bg-muted/30 rounded-xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              {t('training.benefits.title')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {whyUs.map((key) => (
                <div key={key} className="flex items-start gap-3 p-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm">{t(`training.benefits.items.${key}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <FAQSection
            title={t('training.faq.title')}
            pageUrl={`https://quantifier.ai/${currentLocale}/${currentLocale === 'pl' ? 'szkolenia-cyberbezpieczenstwo-dla-firm' : 'cybersecurity-training-for-business'}`}
            faqs={faqKeys.map((key) => ({
              question: t(`training.faq.items.${key}.question`),
              answer: t(`training.faq.items.${key}.answer`),
            }))}
          />
        </section>

        {/* CTA */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 md:p-12 text-center text-primary-foreground">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t('training.cta.title')}
            </h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              {t('training.cta.subtitle')}
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to={`/${currentLocale}/contact`}>
                {t('training.cta.button')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default CybersecurityTraining;
