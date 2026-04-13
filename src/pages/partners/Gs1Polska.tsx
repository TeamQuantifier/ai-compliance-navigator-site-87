import React, { useState, useRef } from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Package, Shield, BarChart3, Globe, ArrowRight, 
  CheckCircle2, Zap, Link2, FileCheck, Users,
  Factory, Leaf, Scale, Send, Quote
} from 'lucide-react';
import { GtinImportMockup, LcaFlowchartMockup, ScenarioExplorerMockup, PassportEditorMockup } from '@/components/mockups/Gs1IntegrationMockups';
import gs1Logo from '@/assets/gs1-logo.png';
import martaPhoto from '@/assets/marta-szymborska.png';

/* ─── brown palette tokens ─── */
const brown = {
  hero: 'bg-gradient-to-br from-amber-950 via-stone-900 to-stone-950',
  heroBadge: 'bg-amber-800/30 text-amber-200 border border-amber-700/40',
  cardBorder: 'border-amber-800/30',
  cardBg: 'bg-amber-900/20',
  cardBg2: 'bg-stone-800/30',
  accent: 'text-amber-400',
  accentBg: 'bg-amber-400',
  quoteBg: 'bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900',
  sectionBg: 'bg-gradient-to-br from-stone-50 to-amber-50',
  businessBg: 'bg-gradient-to-r from-amber-900 to-stone-800',
  formBg: 'bg-gradient-to-br from-stone-100 to-amber-50',
  stepCircle: 'bg-amber-800 text-white',
  btn: 'bg-amber-800 hover:bg-amber-700 text-white',
};

const Gs1Polska = () => {
  const { t, currentLocale } = useLanguage();
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedMessage = message.trim();

    if (!trimmedFirstName || !trimmedLastName || !trimmedEmail || !trimmedMessage) {
      toast({ title: t('contact.toast.missingFields'), description: t('contact.toast.missingFieldsDesc'), variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('contact-form', {
        body: {
          firstName: trimmedFirstName,
          lastName: trimmedLastName,
          email: trimmedEmail,
          company: company.trim() || undefined,
          message: trimmedMessage,
          language: currentLocale,
          sourceUrl: window.location.href,
        },
      });
      if (error) throw error;
      toast({ title: t('contact.toast.messageSent'), description: t('contact.toast.messageSentDesc') });
      setFirstName(''); setLastName(''); setEmail(''); setCompany(''); setMessage('');
    } catch (err: any) {
      toast({ title: t('contact.toast.failedToSend'), description: err?.message || t('contact.toast.failedToSendDesc'), variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: <Package className="h-8 w-8" />, titleKey: 'gs1.features.digitalCard.title', descKey: 'gs1.features.digitalCard.desc' },
    { icon: <Zap className="h-8 w-8" />, titleKey: 'gs1.features.scale.title', descKey: 'gs1.features.scale.desc' },
    { icon: <Link2 className="h-8 w-8" />, titleKey: 'gs1.features.sharing.title', descKey: 'gs1.features.sharing.desc' },
    { icon: <Shield className="h-8 w-8" />, titleKey: 'gs1.features.regulation.title', descKey: 'gs1.features.regulation.desc' },
  ];

  const audiences = [
    { icon: <Factory className="h-5 w-5" />, key: 'gs1.audience.manufacturers' },
    { icon: <Leaf className="h-5 w-5" />, key: 'gs1.audience.sustainability' },
    { icon: <Scale className="h-5 w-5" />, key: 'gs1.audience.compliance' },
    { icon: <Users className="h-5 w-5" />, key: 'gs1.audience.sales' },
  ];

  return (
    <PageTemplate title={t('seo.gs1.title')} description={t('seo.gs1.description')}>
      <div className="max-w-5xl mx-auto">

        {/* Hero — dark brown */}
        <section className={`relative mb-20 ${brown.hero} rounded-3xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(180,120,60,0.15),transparent_60%)]" />
          <div className="relative py-12 px-6 md:px-12">
            <div className="flex items-center gap-4 mb-8">
              <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase ${brown.heroBadge}`}>
                <Globe className="h-4 w-4" />
                GS1 Polska × Envirly by Quantifier.ai
              </span>
              <img src={gs1Logo} alt="GS1 Polska" className="h-12 w-auto bg-white rounded-lg px-2 py-1" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              {t('gs1.hero.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mb-8 leading-relaxed">
              {t('gs1.hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className={`text-lg px-8 py-6 group ${brown.btn}`} onClick={scrollToForm}>
                {t('gs1.hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </section>

        {/* Partnership intro */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">{t('gs1.partnership.title')}</h2>
              <p className="text-lg text-muted-foreground mb-4">{t('gs1.partnership.p1')}</p>
              <p className="text-lg text-muted-foreground">{t('gs1.partnership.p2')}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className={`p-6 text-center ${brown.cardBorder} ${brown.cardBg}`}>
                <FileCheck className={`h-10 w-10 ${brown.accent} mx-auto mb-3`} />
                <p className="font-bold text-lg text-foreground">Envirly LCA</p>
                <p className="text-sm text-muted-foreground mt-1">{t('gs1.partnership.dppLabel')}</p>
              </Card>
              <Card className={`p-6 text-center ${brown.cardBorder} ${brown.cardBg2}`}>
                <BarChart3 className={`h-10 w-10 ${brown.accent} mx-auto mb-3`} />
                <p className="font-bold text-lg text-foreground">Envirly GHG</p>
                <p className="text-sm text-muted-foreground mt-1">{t('gs1.partnership.ghgLabel')}</p>
              </Card>
              <Card className={`p-6 text-center ${brown.cardBorder} ${brown.cardBg}`}>
                <Globe className={`h-10 w-10 ${brown.accent} mx-auto mb-3`} />
                <p className="font-bold text-2xl text-foreground">47 000+</p>
                <p className="text-sm text-muted-foreground mt-1">{t('gs1.partnership.membersLabel')}</p>
              </Card>
              <Card className={`p-6 text-center ${brown.cardBorder} ${brown.cardBg2}`}>
                <Shield className={`h-10 w-10 ${brown.accent} mx-auto mb-3`} />
                <p className="font-bold text-lg text-foreground">ISO</p>
                <p className="text-sm text-muted-foreground mt-1">14064 / 14067</p>
              </Card>
            </div>
          </div>
        </section>

        {/* CEO Quote — warm brown */}
        <section className="mb-20">
          <div className={`relative ${brown.quoteBg} rounded-2xl p-10 md:p-14 overflow-hidden border border-amber-800/20`}>
            <Quote className="absolute top-6 left-6 h-20 w-20 text-amber-400/10" />
            <blockquote className="relative z-10">
              <p className="text-xl md:text-2xl font-medium italic leading-relaxed mb-6 text-white">
                &ldquo;{t('gs1.quote.text')}&rdquo;
              </p>
              <footer className="flex items-center gap-5">
                <img src={martaPhoto} alt="dr Marta Szymborska" className="w-20 h-20 rounded-full object-cover border-2 border-amber-400/30" />
                <div>
                  <cite className="not-italic font-bold text-lg text-white">{t('gs1.quote.author')}</cite>
                  <p className="text-white/60 text-sm">{t('gs1.quote.role')}</p>
                </div>
              </footer>
            </blockquote>
          </div>
        </section>

        {/* How it works */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('gs1.howItWorks.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('gs1.howItWorks.subtitle')}
            </p>
          </div>

          {(() => {
            const mockups = [<GtinImportMockup />, <LcaFlowchartMockup />, <ScenarioExplorerMockup />, <PassportEditorMockup />];
            const steps = [
              { step: 1, titleKey: 'gs1.howItWorks.step1.title', descKey: 'gs1.howItWorks.step1.desc' },
              { step: 2, titleKey: 'gs1.howItWorks.step2.title', descKey: 'gs1.howItWorks.step2.desc' },
              { step: 3, titleKey: 'gs1.howItWorks.step3.title', descKey: 'gs1.howItWorks.step3.desc' },
              { step: 4, titleKey: 'gs1.howItWorks.step4.title', descKey: 'gs1.howItWorks.step4.desc' },
            ];
            return (
              <div className="space-y-16">
                {steps.map((s, i) => (
                  <div key={s.step} className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                    <div className="md:w-2/5 space-y-4">
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ${brown.stepCircle}`}>
                        {s.step}
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">{t(s.titleKey)}</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">{t(s.descKey)}</p>
                    </div>
                    <div className="md:w-3/5">
                      {mockups[i]}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </section>

        {/* Product Passport Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('gs1.passport.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('gs1.passport.subtitle')}
            </p>
          </div>

          <div className={`${brown.sectionBg} rounded-2xl p-8 md:p-12 mb-12`}>
            <p className="text-lg text-foreground mb-4 font-medium">{t('gs1.passport.hook1')}</p>
            <p className="text-lg text-muted-foreground mb-6">{t('gs1.passport.hook2')}</p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-700 text-sm font-medium">
                ✕ {t('gs1.passport.noExcel')}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-700 text-sm font-medium">
                ✕ {t('gs1.passport.noConsultants')}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-700 text-sm font-medium">
                ✕ {t('gs1.passport.noGreenwashing')}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <Card key={i} className={`p-8 ${brown.cardBorder} hover:shadow-lg transition-shadow group`}>
                <div className="flex items-start gap-5">
                  <div className="p-3 rounded-xl bg-amber-100 text-amber-800 group-hover:bg-amber-800 group-hover:text-white transition-colors shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{t(f.titleKey)}</h3>
                    <p className="text-muted-foreground leading-relaxed">{t(f.descKey)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Business case — brown gradient */}
        <section className="mb-20">
          <div className={`${brown.businessBg} rounded-2xl p-10 md:p-14`}>
            <h2 className="text-3xl font-bold mb-4 text-white">{t('gs1.business.title')}</h2>
            <p className="text-xl text-white/80 mb-8 max-w-3xl">{t('gs1.business.desc')}</p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold mb-2 text-white">B2B</p>
                <p className="text-sm text-white/70">{t('gs1.business.b2b')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold mb-2 text-white">ESG</p>
                <p className="text-sm text-white/70">{t('gs1.business.esg')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold mb-2 text-white">-60%</p>
                <p className="text-sm text-white/70">{t('gs1.business.dueDiligence')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Audience */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t('gs1.audience.title')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {audiences.map((a, i) => (
              <div key={i} className={`flex items-start gap-4 p-6 rounded-xl ${brown.cardBorder} bg-card hover:bg-amber-50 transition-colors`}>
                <CheckCircle2 className={`h-6 w-6 ${brown.accent} shrink-0 mt-0.5`} />
                <p className="text-foreground">{t(a.key)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section ref={formRef} className="mb-16" id="contact-form">
          <div className={`${brown.formBg} rounded-2xl p-8 md:p-12`}>
            <h2 className="text-3xl font-bold text-foreground mb-3 text-center">{t('gs1.form.title')}</h2>
            <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">{t('gs1.form.subtitle')}</p>
            
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4">
              <Input placeholder={t('contact.firstName')} value={firstName} onChange={e => setFirstName(e.target.value)} required />
              <Input placeholder={t('contact.lastName')} value={lastName} onChange={e => setLastName(e.target.value)} required />
              <Input type="email" placeholder={t('contact.emailAddress')} value={email} onChange={e => setEmail(e.target.value)} required className="sm:col-span-2" />
              <Input placeholder={t('contact.companyName')} value={company} onChange={e => setCompany(e.target.value)} className="sm:col-span-2" />
              <Textarea placeholder={t('contact.message')} value={message} onChange={e => setMessage(e.target.value)} required className="sm:col-span-2 min-h-[120px]" />
              <Button type="submit" size="lg" className={`sm:col-span-2 text-lg py-6 ${brown.btn}`} disabled={loading}>
                <Send className="mr-2 h-5 w-5" />
                {loading ? t('contact.sending') : t('gs1.form.cta')}
              </Button>
            </form>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
};

export default Gs1Polska;
