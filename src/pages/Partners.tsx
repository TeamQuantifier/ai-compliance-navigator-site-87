import gs1LogoNew from '@/assets/gs1-logo-new.png';
import envirlyLogo from '@/assets/envirly-logo.png';
import logoBnp from '@/assets/partners/bnp-paribas.svg';
import logoAlior from '@/assets/partners/alior-bank.svg';
import logoPfr from '@/assets/partners/pfr.svg';
import logoUeWroclaw from '@/assets/partners/ue-wroclaw.png';
import logoKlasterGoz from '@/assets/partners/klaster-goz.png';
import logoLife from '@/assets/partners/life-programme.png';
import logoReo from '@/assets/partners/reo.svg';
import logoRaben from '@/assets/partners/raben.svg';
import PageTemplate from '@/components/PageTemplate';
import { ArrowRight, Globe, MessageSquare, Users, Building, Handshake, Leaf, FileCheck, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Partners = () => {
  const { t, currentLocale } = useLanguage();
  
  const partnerBenefits = [{
    title: t('partners.benefits.expand.title'),
    description: t('partners.benefits.expand.description'),
    icon: <Sparkles className="h-10 w-10 text-primary" />
  }, {
    title: t('partners.benefits.access.title'),
    description: t('partners.benefits.access.description'),
    icon: <Gift className="h-10 w-10 text-primary" />
  }, {
    title: t('partners.benefits.comarket.title'),
    description: t('partners.benefits.comarket.description'),
    icon: <Users className="h-10 w-10 text-primary" />
  }, {
    title: t('partners.benefits.value.title'),
    description: t('partners.benefits.value.description'),
    icon: <BarChart className="h-10 w-10 text-primary" />
  }];
  
  const partnerTypes = [{
    name: t('partners.types.consulting'),
    icon: <Building className="h-6 w-6 text-compliance-600" />
  }, {
    name: t('partners.types.audit'),
    icon: <Check className="h-6 w-6 text-compliance-600" />
  }, {
    name: t('partners.types.technology'),
    icon: <Sparkles className="h-6 w-6 text-compliance-600" />
  }, {
    name: t('partners.types.financial'),
    icon: <Building className="h-6 w-6 text-compliance-600" />
  }, {
    name: t('partners.types.ngos'),
    icon: <Globe className="h-6 w-6 text-compliance-600" />
  }];

  // Wybrani partnerzy (tylko PL — opisy do weryfikacji przez zespół)
  const selectedPartners = [
    {
      name: 'BNP Paribas Bank Polska',
      logo: logoBnp,
      description: 'Partnerstwo w obszarze finansowania zrównoważonej transformacji i wsparcia raportowania ESG dla klientów korporacyjnych.',
    },
    {
      name: 'Alior Bank',
      logo: logoAlior,
      description: 'Współpraca przy edukacji i narzędziach ESG / cyberbezpieczeństwa dla sektora MŚP.',
    },
    {
      name: 'Polski Fundusz Rozwoju',
      logo: logoPfr,
      description: 'Partner programów rozwoju kompetencji ESG i odporności cyfrowej polskich przedsiębiorstw.',
    },
    {
      name: 'Uniwersytet Ekonomiczny we Wrocławiu',
      logo: logoUeWroclaw,
      description: 'Współpraca naukowo-badawcza w obszarze GRC, śladu węglowego i bezpieczeństwa informacji.',
    },
    {
      name: 'Klaster Gospodarki Obiegu Zamkniętego',
      logo: logoKlasterGoz,
      description: 'Wspólne projekty wokół DPP, LCA i transformacji cyrkularnej członków klastra.',
    },
    {
      name: 'Projekt LIFE',
      logo: logoLife,
      description: 'Udział w projektach finansowanych z programu LIFE Komisji Europejskiej w obszarze klimatu i środowiska.',
    },
    {
      name: 'Reo.pl',
      logo: logoReo,
      description: 'Integracja danych o energii OZE i umowach PPA z modułami carbon Quantifier.',
    },
    {
      name: 'Raben Group',
      logo: logoRaben,
      description: 'Współpraca w obszarze raportowania emisji łańcucha dostaw (Scope 3) i zrównoważonej logistyki.',
    },
  ];
  return <PageTemplate title={t('seo.partners.title')} description={t('seo.partners.description')}>
      <div className="max-w-5xl mx-auto">
        {/* HERO — modern partnership invitation */}
        <section className="mb-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-compliance-900 via-compliance-800 to-innovation-900 p-10 md:p-14">
            {/* Decorative blobs */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-innovation-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-compliance-500/20 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.08),transparent_60%)]" />

            <div className="relative grid md:grid-cols-5 gap-10 items-center">
              <div className="md:col-span-3">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur text-white border border-white/20 mb-6">
                  <Handshake className="w-4 h-4 mr-2" />
                  <span className="font-medium text-sm">{t('partners.network.badge')}</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-5 text-white leading-tight">
                  {t('partners.network.heading')}
                </h2>

                <p className="text-white/80 text-lg leading-relaxed mb-4">
                  {t('partners.network.intro1')}
                </p>
                <p className="text-white/70 leading-relaxed mb-8">
                  {t('partners.network.intro2')}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-white text-compliance-900 hover:bg-white/90 shadow-lg" asChild>
                    <Link to={`/${currentLocale}/contact`}>
                      <MessageSquare className="mr-2 h-5 w-5" />
                      {t('partners.cta.button')}
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right: stats */}
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                {[
                  { value: '50+', label: 'Partnerów', icon: <Handshake className="h-5 w-5" /> },
                  { value: '8', label: 'Sektorów', icon: <Building className="h-5 w-5" /> },
                  { value: '47k+', label: 'Firm w sieci GS1', icon: <Users className="h-5 w-5" /> },
                  { value: 'EU', label: 'Zasięg', icon: <Globe className="h-5 w-5" /> },
                ].map((s, i) => (
                  <div key={i} className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-5 hover:bg-white/15 transition-colors">
                    <div className="text-white/70 mb-2">{s.icon}</div>
                    <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
                    <div className="text-xs text-white/70 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Partner types — modern pills */}
          <div className="mt-10">
            <p className="text-center text-sm text-slate-500 uppercase tracking-wider font-medium mb-6">
              Z kim współpracujemy
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {partnerTypes.map((type, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-full border border-slate-200 shadow-sm hover:shadow-md hover:border-compliance-300 transition-all"
                >
                  {type.icon}
                  <span className="text-sm font-medium text-slate-700">{type.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* GS1 Polska highlight */}
          <div className="mt-10">
            <Link to={`/${currentLocale}/partners/gs1-polska`} className="block group">
              <Card className="overflow-hidden border-amber-200/60 bg-gradient-to-br from-amber-50 via-stone-50 to-white hover:shadow-xl transition-all">
                <div className="flex flex-col md:flex-row">
                  {/* Left: logo + branding */}
                  <div className="md:w-2/5 bg-white p-6 flex items-center justify-center gap-3">
                    <img src={gs1LogoNew} alt="GS1 Polska logo" className="h-20 object-contain" />
                    <span className="text-slate-400 font-medium text-2xl">×</span>
                    <img src={envirlyLogo} alt="Envirly by Quantifier logo" className="h-14 object-contain" />
                  </div>
                  
                  {/* Right: content */}
                  <div className="md:w-3/5 p-6 md:p-8">
                    <h3 className="text-xl font-bold text-foreground mb-3">{t('partners.gs1.headline')}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                      {t('partners.gs1.description')}
                    </p>
                    
                    {/* Stats badges */}
                    <div className="flex flex-wrap gap-3 mb-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
                        <FileCheck className="h-3.5 w-3.5" />
                        {t('partners.gs1.dpp')}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                        <Leaf className="h-3.5 w-3.5" />
                        {t('partners.gs1.ghg')}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 text-stone-700 text-xs font-medium">
                        <Users className="h-3.5 w-3.5" />
                        {t('partners.gs1.members')}
                      </span>
                    </div>
                    
                    <span className="inline-flex items-center text-amber-700 font-semibold text-sm group-hover:text-amber-900 transition-colors">
                      {t('partners.gs1.cta')}
                      <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </section>

        {/* Logo wall — wybrani partnerzy (PL only) — 2 per row */}
        {currentLocale === 'pl' && (
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 gradient-heading">Wybrani partnerzy</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Współpracujemy z liderami sektora finansowego, instytucjami publicznymi, uczelniami oraz organizacjami zrównoważonego rozwoju i logistyki.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedPartners.map((p) => (
                <Card
                  key={p.name}
                  className="group relative p-8 md:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:text-left text-center border-0 bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden rounded-2xl"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-compliance-500 to-innovation-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="shrink-0 h-28 w-40 flex items-center justify-center bg-slate-50 rounded-xl p-4 group-hover:bg-white group-hover:shadow-inner transition-all">
                    <img
                      src={p.logo}
                      alt={`${p.name} logo`}
                      className="max-h-20 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      width={160}
                      height={80}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                      {p.name}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-8 gradient-heading text-center">{t('partners.benefits.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnerBenefits.map((benefit, index) => <Card key={index} className="p-6 border border-slate-200 h-full flex flex-col card-hover">
                <div className="mb-4 p-3 rounded-full bg-compliance-50 w-fit">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-medium text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </div>
              </Card>)}
          </div>
        </section>

        <div className="mb-16">
          <div className="my-8 h-px bg-slate-200" />
          <div className="bg-gradient-to-r from-compliance-900 to-innovation-900 rounded-xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -z-10"></div>
            
            <h2 className="text-3xl font-bold mb-4 text-white">
              {t('partners.cta.title')}
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
              {t('partners.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 px-8 py-6 text-lg group shadow-lg" asChild>
            <Link to={`/${currentLocale}/contact`}>
              <MessageSquare className="mr-2 h-5 w-5" />
              {t('partners.cta.button')}
            </Link>
          </Button>
              
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>;
};
export default Partners;