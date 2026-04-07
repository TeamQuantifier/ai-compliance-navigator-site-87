import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import FAQSection from '@/components/seo/FAQSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Shield,
  ShieldAlert,
  Leaf,
  Scale,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Users,
  FileCheck,
  Layers,
  GraduationCap,
  Wrench,
  BarChart3,
  ClipboardList,
  Target,
  Building2,
  UserCheck,
  BookOpen,
  Zap,
  Lock,
  Eye,
  MessageSquare,
  Clock,
  ChevronRight,
} from 'lucide-react';

/* ─── data ─── */

const PROBLEMS = [
  { icon: Eye, titleKey: 'training.problems.items.0.title', descKey: 'training.problems.items.0.desc' },
  { icon: ClipboardList, titleKey: 'training.problems.items.1.title', descKey: 'training.problems.items.1.desc' },
  { icon: Users, titleKey: 'training.problems.items.2.title', descKey: 'training.problems.items.2.desc' },
  { icon: Wrench, titleKey: 'training.problems.items.3.title', descKey: 'training.problems.items.3.desc' },
  { icon: AlertTriangle, titleKey: 'training.problems.items.4.title', descKey: 'training.problems.items.4.desc' },
];

const TRACKS = [
  {
    icon: ShieldAlert,
    colorClass: 'from-blue-600 to-blue-800',
    badgeColor: 'bg-blue-100 text-blue-800',
    titleKey: 'training.tracks.cyber.title',
    subtitleKey: 'training.tracks.cyber.subtitle',
    audienceKey: 'training.tracks.cyber.audience',
    problemKey: 'training.tracks.cyber.problem',
    topicsKey: 'training.tracks.cyber.topics',
    deliverableKey: 'training.tracks.cyber.deliverable',
    resultKey: 'training.tracks.cyber.result',
  },
  {
    icon: Leaf,
    colorClass: 'from-emerald-600 to-emerald-800',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    titleKey: 'training.tracks.esg.title',
    subtitleKey: 'training.tracks.esg.subtitle',
    audienceKey: 'training.tracks.esg.audience',
    problemKey: 'training.tracks.esg.problem',
    topicsKey: 'training.tracks.esg.topics',
    deliverableKey: 'training.tracks.esg.deliverable',
    resultKey: 'training.tracks.esg.result',
  },
  {
    icon: Scale,
    colorClass: 'from-violet-600 to-violet-800',
    badgeColor: 'bg-violet-100 text-violet-800',
    titleKey: 'training.tracks.compliance.title',
    subtitleKey: 'training.tracks.compliance.subtitle',
    audienceKey: 'training.tracks.compliance.audience',
    problemKey: 'training.tracks.compliance.problem',
    topicsKey: 'training.tracks.compliance.topics',
    deliverableKey: 'training.tracks.compliance.deliverable',
    resultKey: 'training.tracks.compliance.result',
  },
];

const TIERS = [
  {
    icon: GraduationCap,
    titleKey: 'training.model.tiers.0.title',
    descKey: 'training.model.tiers.0.desc',
    itemsKey: 'training.model.tiers.0.items',
    highlight: false,
  },
  {
    icon: Layers,
    titleKey: 'training.model.tiers.1.title',
    descKey: 'training.model.tiers.1.desc',
    itemsKey: 'training.model.tiers.1.items',
    highlight: true,
  },
  {
    icon: Zap,
    titleKey: 'training.model.tiers.2.title',
    descKey: 'training.model.tiers.2.desc',
    itemsKey: 'training.model.tiers.2.items',
    highlight: false,
  },
];

const DELIVERABLES = [
  { icon: ClipboardList, key: 'training.deliverables.items.0' },
  { icon: FileCheck, key: 'training.deliverables.items.1' },
  { icon: BarChart3, key: 'training.deliverables.items.2' },
  { icon: Shield, key: 'training.deliverables.items.3' },
  { icon: Target, key: 'training.deliverables.items.4' },
  { icon: Lock, key: 'training.deliverables.items.5' },
];

const EXPERTS = [
  {
    nameKey: 'training.experts.people.0.name',
    roleKey: 'training.experts.people.0.role',
    bioKey: 'training.experts.people.0.bio',
    advisesKey: 'training.experts.people.0.advises',
    bringsKey: 'training.experts.people.0.brings',
    certsKey: 'training.experts.people.0.certs',
    initials: 'MK',
  },
  {
    nameKey: 'training.experts.people.1.name',
    roleKey: 'training.experts.people.1.role',
    bioKey: 'training.experts.people.1.bio',
    advisesKey: 'training.experts.people.1.advises',
    bringsKey: 'training.experts.people.1.brings',
    certsKey: 'training.experts.people.1.certs',
    initials: 'AW',
  },
  {
    nameKey: 'training.experts.people.2.name',
    roleKey: 'training.experts.people.2.role',
    bioKey: 'training.experts.people.2.bio',
    advisesKey: 'training.experts.people.2.advises',
    bringsKey: 'training.experts.people.2.brings',
    certsKey: 'training.experts.people.2.certs',
    initials: 'PZ',
  },
];

const PROCESS_STEPS = [
  { num: '01', icon: MessageSquare, titleKey: 'training.process.steps.0.title', descKey: 'training.process.steps.0.desc' },
  { num: '02', icon: Target, titleKey: 'training.process.steps.1.title', descKey: 'training.process.steps.1.desc' },
  { num: '03', icon: GraduationCap, titleKey: 'training.process.steps.2.title', descKey: 'training.process.steps.2.desc' },
  { num: '04', icon: Zap, titleKey: 'training.process.steps.3.title', descKey: 'training.process.steps.3.desc' },
];

/* ─── component ─── */

const TrainingLanding = () => {
  const { t, currentLocale } = useLanguage();
  const [formStep, setFormStep] = useState(0);
  const [selectedArea, setSelectedArea] = useState('');

  const baseUrl = 'https://quantifier.ai';
  const pageUrl = `${baseUrl}/${currentLocale}/${currentLocale === 'pl' ? 'szkolenia-cyberbezpieczenstwo-dla-firm' : 'cybersecurity-training-for-companies'}`;

  const faqs = Array.isArray(t('training.faq.items', { returnObjects: true }))
    ? (t('training.faq.items', { returnObjects: true }) as { question: string; answer: string }[])
    : [];

  return (
    <PageTemplate
      title={t('seo.training.title')}
      description={t('seo.training.description')}
    >
      {/* ─── STICKY CTA BAR ─── */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-foreground/95 backdrop-blur-sm border-b border-border/20 hidden md:block">
        <div className="container mx-auto px-4 flex items-center justify-between h-12">
          <p className="text-sm text-primary-foreground/80 font-medium">
            {t('training.stickyBar')}
          </p>
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="#contact">{t('training.cta.primary')}</a>
          </Button>
        </div>
      </div>

      {/* ─── 1. HERO ─── */}
      <section className="relative bg-slate-950 overflow-hidden pt-20 md:pt-12">
        {/* Decorative */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(221_83%_53%/0.15),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — copy */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                  {t('training.hero.badge')}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                {t('training.hero.title')}
              </h1>

              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                {t('training.hero.subtitle')}
              </p>

              {/* Hero stats */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {(['cyber', 'esg', 'compliance'] as const).map((key) => (
                  <div key={key} className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-xl font-bold text-white">{t(`training.hero.stats.${key}.value`)}</p>
                    <p className="text-xs text-slate-400 mt-1">{t(`training.hero.stats.${key}.label`)}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base">
                  <a href="#contact">{t('training.cta.primary')}</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/20 text-slate-200 hover:bg-white/10 px-8 py-6 text-base">
                  <a href="#tracks">{t('training.cta.secondary')}</a>
                </Button>
              </div>

              <p className="text-xs text-slate-500 mt-4">{t('training.hero.microcopy')}</p>
            </div>

            {/* Right — proof block */}
            <div className="hidden lg:block">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">
                  {t('training.hero.proof.title')}
                </p>

                {/* Credentials badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {['ISO 27001', 'NIS2 / KSC', 'DORA', 'CSRD / ESG', 'RODO / GDPR'].map((cert) => (
                    <span key={cert} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                      {cert}
                    </span>
                  ))}
                </div>

                {/* Value props */}
                <div className="space-y-4">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <p className="text-sm text-slate-300">{t(`training.hero.proof.items.${i}`)}</p>
                    </div>
                  ))}
                </div>

                {/* Expert avatars placeholder */}
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {EXPERTS.map((e, i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-primary/20 border-2 border-slate-950 flex items-center justify-center text-xs font-bold text-primary">
                        {e.initials}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-400">{t('training.hero.proof.experts')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. CREDIBILITY BAR ─── */}
      <section className="bg-slate-900 border-y border-white/5 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-slate-400">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>{t(`training.credibilityBar.${i}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. PROBLEM SECTION ─── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('training.problems.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('training.problems.subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROBLEMS.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className={`p-6 rounded-xl border border-border bg-card ${i === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-destructive" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{t(p.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(p.descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 4. THREE TRAINING TRACKS ─── */}
      <section id="tracks" className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('training.tracks.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('training.tracks.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {TRACKS.map((track, idx) => {
              const Icon = track.icon;
              const topics = t(track.topicsKey, { returnObjects: true });
              const topicsList = Array.isArray(topics) ? topics as string[] : [];

              return (
                <div key={idx} className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col">
                  {/* Header stripe */}
                  <div className={`bg-gradient-to-r ${track.colorClass} p-6`}>
                    <Icon className="h-8 w-8 text-white mb-3" />
                    <h3 className="text-xl font-bold text-white">{t(track.titleKey)}</h3>
                    <p className="text-sm text-white/80 mt-1">{t(track.subtitleKey)}</p>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    {/* Audience */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        {t('training.tracks.labels.audience')}
                      </p>
                      <p className="text-sm text-foreground">{t(track.audienceKey)}</p>
                    </div>

                    {/* Problem solved */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        {t('training.tracks.labels.problem')}
                      </p>
                      <p className="text-sm text-foreground">{t(track.problemKey)}</p>
                    </div>

                    {/* Topics */}
                    <div className="mb-4 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        {t('training.tracks.labels.topics')}
                      </p>
                      <ul className="space-y-1.5">
                        {topicsList.map((topic, ti) => (
                          <li key={ti} className="flex items-start gap-2 text-sm text-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverable */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        {t('training.tracks.labels.deliverable')}
                      </p>
                      <p className="text-sm font-medium text-foreground">{t(track.deliverableKey)}</p>
                    </div>

                    {/* Result */}
                    <div className="mt-auto pt-4 border-t border-border">
                      <p className="text-sm font-semibold text-primary flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        {t(track.resultKey)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 5. MODEL — Training + Workshop + Implementation ─── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('training.model.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('training.model.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TIERS.map((tier, idx) => {
              const Icon = tier.icon;
              const items = t(tier.itemsKey, { returnObjects: true });
              const itemsList = Array.isArray(items) ? items as string[] : [];

              return (
                <div
                  key={idx}
                  className={`relative rounded-2xl p-6 border flex flex-col ${
                    tier.highlight
                      ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                      : 'border-border bg-card'
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                      {t('training.model.popular')}
                    </div>
                  )}
                  <Icon className={`h-8 w-8 mb-4 ${tier.highlight ? 'text-primary' : 'text-muted-foreground'}`} />
                  <h3 className="text-lg font-bold text-foreground mb-2">{t(tier.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{t(tier.descKey)}</p>
                  <ul className="space-y-2 flex-1">
                    {itemsList.map((item, ii) => (
                      <li key={ii} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${tier.highlight ? 'text-primary' : 'text-muted-foreground'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`mt-6 w-full ${tier.highlight ? 'bg-primary text-primary-foreground' : ''}`}
                    variant={tier.highlight ? 'default' : 'outline'}
                  >
                    <a href="#contact">{t('training.cta.primary')}</a>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 6. DELIVERABLES — What you get after ─── */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('training.deliverables.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('training.deliverables.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {DELIVERABLES.map((d, i) => {
              const Icon = d.icon;
              return (
                <div key={i} className="bg-card border border-border rounded-xl p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm text-foreground font-medium leading-relaxed">{t(d.key)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 7. EXPERTS ─── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('training.experts.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('training.experts.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {EXPERTS.map((expert, idx) => (
              <div key={idx} className="bg-card border border-border rounded-2xl p-6">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/20 flex items-center justify-center mb-5 mx-auto">
                  <span className="text-2xl font-bold text-primary">{expert.initials}</span>
                </div>

                <h3 className="text-lg font-bold text-foreground text-center">{t(expert.nameKey)}</h3>
                <p className="text-sm text-primary font-medium text-center mb-4">{t(expert.roleKey)}</p>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-1">{t('training.experts.labels.who')}</p>
                    <p className="text-foreground">{t(expert.bioKey)}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-1">{t('training.experts.labels.advises')}</p>
                    <p className="text-foreground">{t(expert.advisesKey)}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-1">{t('training.experts.labels.brings')}</p>
                    <p className="text-foreground">{t(expert.bringsKey)}</p>
                  </div>
                </div>

                {/* Certs */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex flex-wrap gap-1.5">
                    {(Array.isArray(t(expert.certsKey, { returnObjects: true }))
                      ? (t(expert.certsKey, { returnObjects: true }) as string[])
                      : []
                    ).map((cert, ci) => (
                      <span key={ci} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. SOCIAL PROOF ─── */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-14">
              {t('training.proof.title')}
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[0, 1, 2].map((i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6">
                  <p className="text-3xl font-bold text-primary mb-1">{t(`training.proof.stats.${i}.value`)}</p>
                  <p className="text-sm text-muted-foreground">{t(`training.proof.stats.${i}.label`)}</p>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="bg-card border border-border rounded-2xl p-8 max-w-3xl mx-auto">
              <blockquote className="text-lg text-foreground italic leading-relaxed mb-4">
                "{t('training.proof.testimonial.quote')}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {t('training.proof.testimonial.initials')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t('training.proof.testimonial.name')}</p>
                  <p className="text-xs text-muted-foreground">{t('training.proof.testimonial.role')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. HOW WE WORK — 4 steps ─── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('training.process.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('training.process.subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-primary">{step.num}</span>
                  <h3 className="text-base font-bold text-foreground mt-1 mb-2">{t(step.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(step.descKey)}</p>
                  {i < PROCESS_STEPS.length - 1 && (
                    <ChevronRight className="hidden md:block absolute top-7 -right-3 h-5 w-5 text-border" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 10. FAQ ─── */}
      {faqs.length > 0 && (
        <FAQSection
          title={t('training.faq.title')}
          faqs={faqs}
          pageUrl={pageUrl}
        />
      )}

      {/* ─── 11. FINAL CTA + CONTACT FORM ─── */}
      <section id="contact" className="relative py-16 md:py-24 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(221_83%_53%/0.15),transparent_60%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            {/* Left — copy */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('training.finalCta.title')}
              </h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                {t('training.finalCta.subtitle')}
              </p>

              <div className="space-y-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-slate-300">{t(`training.finalCta.benefits.${i}`)}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-500 mt-8">{t('training.finalCta.microcopy')}</p>
            </div>

            {/* Right — 2-step form */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              {formStep === 0 ? (
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{t('training.form.step1.title')}</h3>
                  <p className="text-sm text-slate-400 mb-6">{t('training.form.step1.subtitle')}</p>

                  <div className="grid gap-3">
                    {(['cybersecurity', 'esg', 'compliance'] as const).map((area) => (
                      <button
                        key={area}
                        onClick={() => { setSelectedArea(area); setFormStep(1); }}
                        className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                          selectedArea === area
                            ? 'border-primary bg-primary/10'
                            : 'border-white/10 hover:border-white/30 bg-white/5'
                        }`}
                      >
                        {area === 'cybersecurity' && <ShieldAlert className="h-5 w-5 text-blue-400" />}
                        {area === 'esg' && <Leaf className="h-5 w-5 text-emerald-400" />}
                        {area === 'compliance' && <Scale className="h-5 w-5 text-violet-400" />}
                        <div>
                          <p className="text-sm font-semibold text-white">{t(`training.form.areas.${area}.title`)}</p>
                          <p className="text-xs text-slate-400">{t(`training.form.areas.${area}.desc`)}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-500 ml-auto" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <button onClick={() => setFormStep(0)} className="text-xs text-slate-400 hover:text-white mb-4 flex items-center gap-1">
                    ← {t('training.form.back')}
                  </button>
                  <h3 className="text-lg font-bold text-white mb-2">{t('training.form.step2.title')}</h3>
                  <p className="text-sm text-slate-400 mb-6">{t('training.form.step2.subtitle')}</p>

                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="text"
                      placeholder={t('training.form.fields.name')}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-primary"
                    />
                    <input
                      type="email"
                      placeholder={t('training.form.fields.email')}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-primary"
                    />
                    <input
                      type="text"
                      placeholder={t('training.form.fields.company')}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-primary"
                    />
                    <textarea
                      placeholder={t('training.form.fields.message')}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-primary resize-none"
                    />
                    <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6">
                      {t('training.form.submit')}
                    </Button>
                    <p className="text-xs text-slate-500 text-center">{t('training.form.privacy')}</p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
};

export default TrainingLanding;
