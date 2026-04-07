import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import FAQSection from '@/components/seo/FAQSection';
import {
  ArrowRight,
  Shield,
  Users,
  GraduationCap,
  BookOpen,
  Target,
  Award,
  Building2,
  UserCheck,
  Briefcase,
  Clock,
  CheckCircle2,
  Monitor,
  FileText,
  HelpCircle,
} from 'lucide-react';

const CybersecurityTraining = () => {
  const { t, currentLocale } = useLanguage();

  const programs = [
    { icon: Shield, key: 'nis2Dora' },
    { icon: BookOpen, key: 'iso27001' },
    { icon: Users, key: 'awareness' },
    { icon: Target, key: 'riskManagement' },
    { icon: Monitor, key: 'incidentResponse' },
    { icon: FileText, key: 'gdprPrivacy' },
  ];

  const audiences = [
    { icon: Briefcase, key: 'executives' },
    { icon: UserCheck, key: 'complianceTeams' },
    { icon: Users, key: 'allEmployees' },
    { icon: Building2, key: 'itSecurity' },
  ];

  const processSteps = [
    { icon: Target, key: 'assess' },
    { icon: BookOpen, key: 'design' },
    { icon: GraduationCap, key: 'deliver' },
    { icon: Award, key: 'certify' },
  ];

  const benefits = [
    'regulatoryCompliance',
    'reducedRisk',
    'certifiedTeam',
    'practicalSkills',
    'customPrograms',
    'ongoingSupport',
  ];

  const faqKeys = ['whoShouldAttend', 'howLong', 'onlineOrOnsite', 'certification', 'pricing'];

  return (
    <PageTemplate
      title={t('seo.training.title')}
      description={t('seo.training.description')}
    >
      <div className="max-w-6xl mx-auto">
        {/* 1. Hero */}
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
                    <a href="#programs">
                      {t('training.hero.ctaSecondary')}
                    </a>
                  </Button>
                </div>
              </div>
              <div className="lg:w-2/5 grid grid-cols-2 gap-4">
                {[
                  { value: '500+', label: t('training.hero.stats.participants') },
                  { value: '98%', label: t('training.hero.stats.satisfaction') },
                  { value: '12+', label: t('training.hero.stats.programs') },
                  { value: '6+', label: t('training.hero.stats.frameworks') },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm opacity-70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Training Programs */}
        <section id="programs" className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
            {t('training.programs.title')}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
            {t('training.programs.subtitle')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <Card key={program.key} className="group hover:shadow-lg transition-shadow border-border">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <program.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {t(`training.programs.items.${program.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {t(`training.programs.items.${program.key}.description`)}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {t(`training.programs.items.${program.key}.duration`)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 3. For Whom */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
            {t('training.audience.title')}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
            {t('training.audience.subtitle')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((audience) => (
              <div key={audience.key} className="text-center p-6 rounded-xl bg-muted/50">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <audience.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">
                  {t(`training.audience.items.${audience.key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(`training.audience.items.${audience.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Process */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
            {t('training.process.title')}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
            {t('training.process.subtitle')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={step.key} className="text-center">
                <div className="relative mx-auto mb-4">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold mb-2">
                  {t(`training.process.steps.${step.key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(`training.process.steps.${step.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Benefits */}
        <section className="mb-16">
          <div className="bg-muted/30 rounded-xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              {t('training.benefits.title')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((key) => (
                <div key={key} className="flex items-start gap-3 p-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm">{t(`training.benefits.items.${key}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FAQ */}
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

        {/* 7. CTA */}
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
