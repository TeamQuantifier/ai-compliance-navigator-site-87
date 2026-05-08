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
import { ArrowRight, Globe, MessageSquare, Sparkles, Users, Building, Handshake, Leaf, FileCheck, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Partners = () => {
  const { t, currentLocale } = useLanguage();
  
  
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
      {/* Subtle decorative background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-compliance-200/40 blur-[100px]" />
        <div className="absolute top-[30%] -left-60 w-[400px] h-[400px] rounded-full bg-innovation-200/30 blur-[90px]" />
        <div className="absolute bottom-20 right-20 w-[350px] h-[350px] rounded-full bg-amber-200/25 blur-[80px]" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* HERO — editorial, fact-based partnership intro */}
        <section className="mb-16 relative">
          {/* Decorative dot pattern behind hero */}
          <div className="absolute inset-0 -z-10 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle, #1c3da1 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />

          <div className="border-b border-slate-200/80 pb-12 mb-12">
            <div className="grid md:grid-cols-12 gap-10 items-start">
              {/* Left: heading + copy */}
              <div className="md:col-span-7">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-compliance-700 mb-5">
                  <span className="h-px w-8 bg-compliance-700" />
                  Sieć partnerska Quantifier
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-[1.1] tracking-tight">
                  50+ partnerów,<br />
                  z którymi wdrażamy zgodność i&nbsp;ESG w&nbsp;polskich firmach.
                </h1>

                <p className="text-slate-700 text-lg leading-relaxed mb-5">
                  Sami nie zrobimy wszystkiego — i nie chcemy. Quantifier to platforma, ale realne wdrożenie wymaga ludzi: audytorów, prawników, konsultantów i integratorów. Dlatego budujemy sieć partnerów, którzy dokładają swoją wiedzę tam, gdzie klient jej potrzebuje.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Współpracujemy z <strong className="text-slate-900">firmami audytorskimi</strong> przy wdrożeniach NIS 2, ISO 27001 i SOC 2, z <strong className="text-slate-900">kancelariami prawnymi</strong> przy DORA, RODO i sygnalistach, z <strong className="text-slate-900">firmami konsultingowymi</strong> w obszarze ESG i CSRD, z <strong className="text-slate-900">integratorami IT i cybersecurity</strong> przy zabezpieczeniach technicznych, oraz z <strong className="text-slate-900">uczelniami i NGO</strong> przy badaniach, edukacji i projektach finansowanych m.in. z programu LIFE.
                </p>
              </div>

              {/* Right: facts panel */}
              <div className="md:col-span-5">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 md:p-7">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-5">
                    Dlaczego warto być w sieci
                  </p>
                  <ul className="space-y-4 mb-7">
                    {[
                      'Wspólne projekty z realnymi klientami, nie pilotaże dla samej technologii.',
                      'Dostęp do platformy GRC z gotowymi modułami NIS 2, ESG, DPP i LCA.',
                      'Wsparcie merytoryczne i materiały edukacyjne (webinary, raporty, szkolenia).',
                      'Widoczność marki partnera w ekosystemie 47 tys. firm sieci GS1 Polska.',
                    ].map((point, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                        <Check className="h-4 w-4 text-compliance-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="grid grid-cols-3 gap-3 pt-5 border-t border-slate-200">
                    <div>
                      <div className="text-2xl font-bold text-slate-900">50+</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">Partnerów</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">5</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">Obszarów</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">PL · EU</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">Zasięg</div>
                    </div>
                  </div>

                  <Button size="lg" className="w-full mt-6 bg-compliance-900 text-white hover:bg-compliance-800" asChild>
                    <Link to={`/${currentLocale}/contact`}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Porozmawiajmy o partnerstwie
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Partner types — areas of cooperation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-5">
              Z jakich obszarów są nasi partnerzy
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { name: 'Audytorzy', desc: 'NIS 2, ISO 27001, SOC 2', icon: <Check className="h-5 w-5" /> },
                { name: 'Kancelarie prawne', desc: 'DORA, RODO, sygnaliści', icon: <FileCheck className="h-5 w-5" /> },
                { name: 'Konsulting', desc: 'ESG, CSRD, ślad węglowy', icon: <Building className="h-5 w-5" /> },
                { name: 'IT i cybersec', desc: 'Wdrożenia, integracje, SOC', icon: <Sparkles className="h-5 w-5" /> },
                { name: 'NGO i uczelnie', desc: 'Badania, edukacja, LIFE', icon: <Globe className="h-5 w-5" /> },
              ].map((type, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white rounded-xl border border-slate-200 hover:border-compliance-400 hover:shadow-md transition-all"
                >
                  <div className="text-compliance-600 mb-3">{type.icon}</div>
                  <div className="text-sm font-semibold text-slate-900 mb-1">{type.name}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{type.desc}</div>
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

        <div className="mb-16">
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