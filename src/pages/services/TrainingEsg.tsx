import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import FAQSection from '@/components/seo/FAQSection';
import {
  ArrowRight,
  Leaf,
  BarChart3,
  FileText,
  Globe,
  Clock,
  CheckCircle2,
  Briefcase,
  UserCheck,
  Building2,
  Users,
  Target,
  BookOpen,
} from 'lucide-react';

const TrainingEsg = () => {
  const { t, currentLocale } = useLanguage();

  const modules = [
    { icon: Leaf, key: 'csrdReporting' },
    { icon: BarChart3, key: 'carbonFootprint' },
    { icon: Globe, key: 'supplyChain' },
    { icon: FileText, key: 'griStandards' },
    { icon: Target, key: 'materialityAssessment' },
    { icon: BookOpen, key: 'esgStrategy' },
  ];

  const audiences = [
    { icon: Briefcase, key: 'sustainabilityManagers' },
    { icon: UserCheck, key: 'cfoFinance' },
    { icon: Building2, key: 'operationsTeams' },
    { icon: Users, key: 'boardDirectors' },
  ];

  const benefits = [
    'csrdCompliance',
    'carbonReduction',
    'stakeholderTrust',
    'practicalTools',
    'benchmarking',
    'ongoingGuidance',
  ];

  const faqKeys = ['whoShouldAttend', 'esgKnowledge', 'format', 'certification', 'roi'];

  return (
    <PageTemplate
      title={t('seo.trainingEsg.title')}
      description={t('seo.trainingEsg.description')}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-emerald-900 to-teal-800 rounded-xl p-8 md:p-12 text-white">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-3/5">
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6">
                  <Leaf className="h-4 w-4" />
                  {t('trainingEsg.hero.badge')}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  {t('trainingEsg.hero.title')}
                </h1>
                <p className="text-lg opacity-90 mb-6 max-w-xl">
                  {t('trainingEsg.hero.subtitle')}
                </p>
                <Button size="lg" className="bg-white text-emerald-900 hover:bg-white/90" asChild>
                  <Link to={`/${currentLocale}/contact`}>
                    {t('trainingEsg.hero.cta')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="lg:w-2/5 grid grid-cols-2 gap-4">
                {[
                  { value: 'CSRD', label: t('trainingEsg.hero.stats.csrd') },
                  { value: 'GRI', label: t('trainingEsg.hero.stats.gri') },
                  { value: '12h+', label: t('trainingEsg.hero.stats.hours') },
                  { value: '100%', label: t('trainingEsg.hero.stats.practical') },
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
            {t('trainingEsg.modules.title')}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
            {t('trainingEsg.modules.subtitle')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => (
              <Card key={mod.key} className="group hover:shadow-lg transition-shadow border-border">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                    <mod.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {t(`trainingEsg.modules.items.${mod.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {t(`trainingEsg.modules.items.${mod.key}.description`)}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {t(`trainingEsg.modules.items.${mod.key}.duration`)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Audience */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
            {t('trainingEsg.audience.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((a) => (
              <div key={a.key} className="text-center p-6 rounded-xl bg-muted/50">
                <div className="h-14 w-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                  <a.icon className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="font-semibold mb-2">{t(`trainingEsg.audience.items.${a.key}.title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`trainingEsg.audience.items.${a.key}.description`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <div className="bg-muted/30 rounded-xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              {t('trainingEsg.benefits.title')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((key) => (
                <div key={key} className="flex items-start gap-3 p-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="text-sm">{t(`trainingEsg.benefits.items.${key}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <FAQSection
            title={t('trainingEsg.faq.title')}
            pageUrl={`https://quantifier.ai/${currentLocale}/${currentLocale === 'pl' ? 'szkolenie-esg-csrd' : 'training-esg-csrd'}`}
            faqs={faqKeys.map((key) => ({
              question: t(`trainingEsg.faq.items.${key}.question`),
              answer: t(`trainingEsg.faq.items.${key}.answer`),
            }))}
          />
        </section>

        {/* CTA */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t('trainingEsg.cta.title')}
            </h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              {t('trainingEsg.cta.subtitle')}
            </p>
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-white/90" asChild>
              <Link to={`/${currentLocale}/contact`}>
                {t('trainingEsg.cta.button')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default TrainingEsg;
