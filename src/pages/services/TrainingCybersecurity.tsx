import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import FAQSection from '@/components/seo/FAQSection';
import {
  ArrowRight,
  Shield,
  BookOpen,
  Target,
  Award,
  Clock,
  CheckCircle2,
  GraduationCap,
  Users,
  FileText,
  Monitor,
  Briefcase,
  UserCheck,
  Building2,
} from 'lucide-react';

const TrainingCybersecurity = () => {
  const { t, currentLocale } = useLanguage();

  const modules = [
    { icon: Shield, key: 'nis2Compliance' },
    { icon: BookOpen, key: 'iso27001Implementation' },
    { icon: Target, key: 'riskAssessment' },
    { icon: Monitor, key: 'incidentResponse' },
    { icon: FileText, key: 'securityPolicies' },
    { icon: Users, key: 'awarenessWorkshops' },
  ];

  const audiences = [
    { icon: Briefcase, key: 'ciso' },
    { icon: UserCheck, key: 'complianceManagers' },
    { icon: Building2, key: 'itTeams' },
    { icon: Users, key: 'boardMembers' },
  ];

  const benefits = [
    'nis2Readiness',
    'isoAlignment',
    'practicalExercises',
    'certificationSupport',
    'customScenarios',
    'postTrainingSupport',
  ];

  const faqKeys = ['whoFor', 'duration', 'prerequisites', 'certification', 'customization'];

  return (
    <PageTemplate
      title={t('seo.trainingCyber.title')}
      description={t('seo.trainingCyber.description')}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-xl p-8 md:p-12 text-white">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-3/5">
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6">
                  <Shield className="h-4 w-4" />
                  {t('trainingCyber.hero.badge')}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  {t('trainingCyber.hero.title')}
                </h1>
                <p className="text-lg opacity-90 mb-6 max-w-xl">
                  {t('trainingCyber.hero.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90" asChild>
                    <Link to={`/${currentLocale}/contact`}>
                      {t('trainingCyber.hero.cta')} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="lg:w-2/5 grid grid-cols-2 gap-4">
                {[
                  { value: 'NIS2', label: t('trainingCyber.hero.stats.nis2') },
                  { value: 'ISO 27001', label: t('trainingCyber.hero.stats.iso') },
                  { value: '16h+', label: t('trainingCyber.hero.stats.hours') },
                  { value: '98%', label: t('trainingCyber.hero.stats.satisfaction') },
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

        {/* Modules */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
            {t('trainingCyber.modules.title')}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
            {t('trainingCyber.modules.subtitle')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => (
              <Card key={mod.key} className="group hover:shadow-lg transition-shadow border-border">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <mod.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {t(`trainingCyber.modules.items.${mod.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {t(`trainingCyber.modules.items.${mod.key}.description`)}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {t(`trainingCyber.modules.items.${mod.key}.duration`)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Audience */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
            {t('trainingCyber.audience.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((a) => (
              <div key={a.key} className="text-center p-6 rounded-xl bg-muted/50">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <a.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t(`trainingCyber.audience.items.${a.key}.title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`trainingCyber.audience.items.${a.key}.description`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <div className="bg-muted/30 rounded-xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              {t('trainingCyber.benefits.title')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((key) => (
                <div key={key} className="flex items-start gap-3 p-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm">{t(`trainingCyber.benefits.items.${key}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <FAQSection
            title={t('trainingCyber.faq.title')}
            pageUrl={`https://quantifier.ai/${currentLocale}/${currentLocale === 'pl' ? 'szkolenie-cyberbezpieczenstwo-nis2-iso27001' : 'training-cybersecurity-nis2-iso27001'}`}
            faqs={faqKeys.map((key) => ({
              question: t(`trainingCyber.faq.items.${key}.question`),
              answer: t(`trainingCyber.faq.items.${key}.answer`),
            }))}
          />
        </section>

        {/* CTA */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 md:p-12 text-center text-primary-foreground">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t('trainingCyber.cta.title')}
            </h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              {t('trainingCyber.cta.subtitle')}
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to={`/${currentLocale}/contact`}>
                {t('trainingCyber.cta.button')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default TrainingCybersecurity;
