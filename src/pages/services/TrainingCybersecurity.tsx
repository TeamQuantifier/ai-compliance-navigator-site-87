import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import FAQSection from '@/components/seo/FAQSection';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  ArrowRight,
  Shield,
  Target,
  Clock,
  CheckCircle2,
  Users,
  Monitor,
  Briefcase,
  UserCheck,
  Building2,
  AlertTriangle,
  Scale,
  Link2,
  Zap,
  ClipboardCheck,
  Timer,
  ChevronDown,
  BookOpen,
  Hammer,
  FileCheck,
} from 'lucide-react';
import { useState } from 'react';

const TrainingCybersecurity = () => {
  const { t, currentLocale } = useLanguage();
  const [openBlock, setOpenBlock] = useState<number | null>(0);

  const agendaBlocks = [
    { icon: BookOpen, color: 'text-blue-500', key: 'block1' },
    { icon: AlertTriangle, color: 'text-amber-500', key: 'block2' },
    { icon: Shield, color: 'text-emerald-500', key: 'block3' },
    { icon: Link2, color: 'text-purple-500', key: 'block4' },
    { icon: Hammer, color: 'text-red-500', key: 'block5' },
  ];

  const audiences = [
    { icon: Building2, key: 'board' },
    { icon: UserCheck, key: 'ciso' },
    { icon: Monitor, key: 'itSecurity' },
    { icon: Briefcase, key: 'compliance' },
  ];

  const benefits = [
    'riskRegistry',
    'incidentProcedure',
    'roadmap',
    'quickWins',
    'supplierChecklist',
    'nis2Mapping',
    'governanceModel',
    'maturityReport',
  ];

  const processSteps = [
    { icon: Target, key: 'diagnosis' },
    { icon: BookOpen, key: 'training' },
    { icon: Zap, key: 'action' },
  ];

  const faqKeys = ['whoFor', 'duration', 'format', 'prerequisites', 'certificate', 'pricing', 'customization'];

  return (
    <PageTemplate
      title={t('seo.trainingCyber.title')}
      description={t('seo.trainingCyber.description')}
    >
      <div className="max-w-6xl mx-auto">
        {/* HERO */}
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
                  { value: t('trainingCyber.hero.stats.blocks.value'), label: t('trainingCyber.hero.stats.blocks.label') },
                  { value: t('trainingCyber.hero.stats.hours.value'), label: t('trainingCyber.hero.stats.hours.label') },
                  { value: t('trainingCyber.hero.stats.frameworks.value'), label: t('trainingCyber.hero.stats.frameworks.label') },
                  { value: t('trainingCyber.hero.stats.workshop.value'), label: t('trainingCyber.hero.stats.workshop.label') },
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

        {/* PROBLEM */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
            {t('trainingCyber.problem.title')}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
            {t('trainingCyber.problem.subtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['deadline', 'penalties', 'liability'].map((key) => (
              <Card key={key} className="border-destructive/20 bg-destructive/5">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                    {key === 'deadline' && <Timer className="h-6 w-6 text-destructive" />}
                    {key === 'penalties' && <Scale className="h-6 w-6 text-destructive" />}
                    {key === 'liability' && <AlertTriangle className="h-6 w-6 text-destructive" />}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {t(`trainingCyber.problem.items.${key}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t(`trainingCyber.problem.items.${key}.description`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* AGENDA */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
            {t('trainingCyber.agenda.title')}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
            {t('trainingCyber.agenda.subtitle')}
          </p>
          <div className="space-y-3 max-w-4xl mx-auto">
            {agendaBlocks.map((block, idx) => (
              <Collapsible
                key={block.key}
                open={openBlock === idx}
                onOpenChange={(isOpen) => setOpenBlock(isOpen ? idx : null)}
              >
                <CollapsibleTrigger className="w-full">
                  <div className={`flex items-center gap-4 p-5 rounded-xl border transition-colors ${openBlock === idx ? 'bg-muted border-primary/30' : 'bg-background border-border hover:bg-muted/50'}`}>
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <block.icon className={`h-5 w-5 ${block.color}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-medium text-muted-foreground">
                          {t(`trainingCyber.agenda.items.${block.key}.time`)}
                        </span>
                      </div>
                      <h3 className="font-semibold">
                        {t(`trainingCyber.agenda.items.${block.key}.title`)}
                      </h3>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${openBlock === idx ? 'rotate-180' : ''}`} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-5 pb-5 pt-2 ml-14">
                    <ul className="space-y-2">
                      {(Array.isArray(t(`trainingCyber.agenda.items.${block.key}.topics`, { returnObjects: true })) ? t(`trainingCyber.agenda.items.${block.key}.topics`, { returnObjects: true }) as string[] : []).map((topic, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </section>

        {/* BENEFITS */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900/50 dark:to-blue-900/20 rounded-xl p-8 md:p-12">
            <div className="flex items-center justify-center gap-3 mb-2">
              <FileCheck className="h-7 w-7 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-center">
                {t('trainingCyber.benefits.title')}
              </h2>
            </div>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              {t('trainingCyber.benefits.subtitle')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {benefits.map((key) => (
                <div key={key} className="flex items-start gap-3 p-4 rounded-lg bg-background/80 border border-border/50">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-sm">{t(`trainingCyber.benefits.items.${key}.title`)}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">{t(`trainingCyber.benefits.items.${key}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AUDIENCE */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
            {t('trainingCyber.audience.title')}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
            {t('trainingCyber.audience.subtitle')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((a) => (
              <div key={a.key} className="text-center p-6 rounded-xl bg-muted/50 border border-border/50">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <a.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t(`trainingCyber.audience.items.${a.key}.title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`trainingCyber.audience.items.${a.key}.description`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            {t('trainingCyber.process.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {processSteps.map((step, idx) => (
              <div key={step.key} className="text-center relative">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 relative">
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold h-6 w-6 rounded-full flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t(`trainingCyber.process.steps.${step.key}.title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`trainingCyber.process.steps.${step.key}.description`)}</p>
              </div>
            ))}
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
          <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t('trainingCyber.cta.title')}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {t('trainingCyber.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90" asChild>
                <Link to={`/${currentLocale}/contact`}>
                  {t('trainingCyber.cta.button')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link to={`/${currentLocale}/contact`}>
                  {t('trainingCyber.cta.buttonSecondary')}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default TrainingCybersecurity;
