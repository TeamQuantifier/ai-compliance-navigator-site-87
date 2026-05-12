import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, MessageSquare, Sparkles, Users, Building, Leaf, FileCheck, Check } from 'lucide-react';
import gs1LogoNew from '@/assets/gs1-logo-new.png';
import envirlyLogo from '@/assets/envirly-logo.png';
import logoBnp from '@/assets/partners/bnp-paribas.svg';
import logoAlior from '@/assets/partners/alior-bank.svg';
import logoPfr from '@/assets/partners/pfr.svg';
import logoUeWroclaw from '@/assets/partners/ue-wroclaw.png';
import logoKlasterGoz from '@/assets/partners/klaster-goz.png';
import logoCpc from '@/assets/partners/circular-production-community.png';
import logoReo from '@/assets/partners/reo.svg';
import logoRaben from '@/assets/partners/raben.svg';
import PageTemplate from '@/components/PageTemplate';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { GS1_PARTNER_PATHS, PARTNERS_PATHS, getLocalizedPathWithLocale } from '@/lib/localized-routes';

interface PartnerArea {
  name: string;
  desc: string;
}

interface SelectedPartnerCopy {
  name: string;
  description: string;
}

const areaIcons = [
  <Check className="h-5 w-5" />,
  <FileCheck className="h-5 w-5" />,
  <Building className="h-5 w-5" />,
  <Sparkles className="h-5 w-5" />,
  <Globe className="h-5 w-5" />,
];

const partnerLogos = [
  logoBnp,
  logoAlior,
  logoPfr,
  logoUeWroclaw,
  logoKlasterGoz,
  logoCpc,
  logoReo,
  logoRaben,
];

const asArray = <T,>(value: unknown): T[] => Array.isArray(value) ? value : [];

const Partners = () => {
  const { t, currentLocale } = useLanguage();
  const reasons = asArray<string>(t('partners.page.reasons.items', { returnObjects: true }));
  const areas = asArray<PartnerArea>(t('partners.page.areas.items', { returnObjects: true }));
  const selectedPartners = asArray<SelectedPartnerCopy>(t('partners.page.selected.items', { returnObjects: true }));
  const gs1Path = getLocalizedPathWithLocale(GS1_PARTNER_PATHS[currentLocale], currentLocale);
  const contactPath = `/${currentLocale}/contact`;
  const canonicalUrl = `https://quantifier.ai${PARTNERS_PATHS[currentLocale]}/`;

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('seo.partners.title'),
    description: t('seo.partners.description'),
    url: canonicalUrl,
    inLanguage: currentLocale === 'pl' ? 'pl-PL' : currentLocale === 'cs' ? 'cs-CZ' : 'en',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: selectedPartners.map((partner, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Organization',
          name: partner.name,
        },
      })),
    },
  };

  return (
    <PageTemplate title={t('seo.partners.title')} description={t('seo.partners.description')}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      </Helmet>

      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-compliance-200/40 blur-[100px]" />
        <div className="absolute top-[30%] -left-60 w-[400px] h-[400px] rounded-full bg-innovation-200/30 blur-[90px]" />
        <div className="absolute bottom-20 right-20 w-[350px] h-[350px] rounded-full bg-amber-200/25 blur-[80px]" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <section className="mb-16 relative">
          <div className="absolute inset-0 -z-10 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle, #1c3da1 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />

          <div className="border-b border-slate-200/80 pb-12 mb-12">
            <div className="grid md:grid-cols-12 gap-10 items-start">
              <div className="md:col-span-7">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-compliance-700 mb-5">
                  <span className="h-px w-8 bg-compliance-700" />
                  {t('partners.page.hero.eyebrow')}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-[1.1] tracking-tight">
                  {t('partners.page.hero.title')}
                </h1>

                <p className="text-slate-700 text-lg leading-relaxed mb-5">
                  {t('partners.page.hero.lead')}
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {t('partners.page.hero.body')}
                </p>
              </div>

              <div className="md:col-span-5">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 md:p-7">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-5">
                    {t('partners.page.reasons.title')}
                  </p>
                  <ul className="space-y-4 mb-7">
                    {reasons.map((point, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                        <Check className="h-4 w-4 text-compliance-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="grid grid-cols-3 gap-3 pt-5 border-t border-slate-200">
                    <div>
                      <div className="text-2xl font-bold text-slate-900">50+</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">{t('partners.page.stats.partners')}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">5</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">{t('partners.page.stats.areas')}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">EU · USA</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">{t('partners.page.stats.reach')}</div>
                    </div>
                  </div>

                  <Button size="lg" className="w-full mt-6 bg-compliance-900 text-white hover:bg-compliance-800" asChild>
                    <Link to={contactPath}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {t('partners.page.hero.cta')}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-5">
              {t('partners.page.areas.title')}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {areas.map((type, idx) => (
                <div
                  key={type.name}
                  className="p-5 bg-white rounded-xl border border-slate-200 hover:border-compliance-400 hover:shadow-md transition-all"
                >
                  <div className="text-compliance-600 mb-3">{areaIcons[idx] || <Check className="h-5 w-5" />}</div>
                  <div className="text-sm font-semibold text-slate-900 mb-1">{type.name}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{type.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <Link to={gs1Path} className="block group">
              <Card className="overflow-hidden border-amber-200/60 bg-gradient-to-br from-amber-50 via-stone-50 to-white hover:shadow-xl transition-all">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5 bg-white p-6 flex items-center justify-center gap-3">
                    <img src={gs1LogoNew} alt="GS1 Polska logo" className="h-20 object-contain" width={160} height={80} />
                    <span className="text-slate-400 font-medium text-2xl">×</span>
                    <img src={envirlyLogo} alt="Envirly by Quantifier logo" className="h-14 object-contain" width={160} height={56} />
                  </div>
                  <div className="md:w-3/5 p-6 md:p-8">
                    <h3 className="text-xl font-bold text-foreground mb-3">{t('partners.gs1.headline')}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                      {t('partners.gs1.description')}
                    </p>
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

        <section className="mb-16 relative" id="selected-partners">
          <div className="absolute -top-8 -left-8 w-32 h-32 border-t-2 border-l-2 border-compliance-200/50 rounded-tl-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -right-8 w-32 h-32 border-b-2 border-r-2 border-innovation-200/40 rounded-br-3xl pointer-events-none" />

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-heading">{t('partners.page.selected.title')}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              {t('partners.page.selected.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedPartners.map((p, index) => (
              <Card
                key={p.name}
                className="group relative p-8 md:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:text-left text-center border-0 bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden rounded-2xl"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-compliance-500 to-innovation-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="shrink-0 h-28 w-40 flex items-center justify-center bg-slate-50 rounded-xl p-4 group-hover:bg-white group-hover:shadow-inner transition-all">
                  <img
                    src={partnerLogos[index]}
                    alt={`${p.name} logo`}
                    className="max-h-20 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    width={160}
                    height={80}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{p.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{p.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <div className="mb-16">
          <div className="bg-gradient-to-r from-compliance-900 to-innovation-900 rounded-xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/[0.03] pointer-events-none" />

            <h2 className="text-3xl font-bold mb-4 text-white relative z-10">{t('partners.cta.title')}</h2>
            <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto relative z-10">{t('partners.cta.description')}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 px-8 py-6 text-lg group shadow-lg" asChild>
                <Link to={contactPath}>
                  <MessageSquare className="mr-2 h-5 w-5" />
                  {t('partners.cta.button')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Partners;
