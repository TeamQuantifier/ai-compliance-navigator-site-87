import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { CheckCircle, Shield, FileText, Users, BarChart3, ArrowRight, Lock } from 'lucide-react';
import FAQSection from '@/components/seo/FAQSection';

const Iso27001Landing = () => {
  const { t } = useTranslation();
  const { locale = 'en' } = useParams<{ locale: string }>();

  const pageUrl = `https://www.quantifier.ai/${locale}/iso27001`;
  const seoTitle = t('seoLanding.iso27001.seo.title');
  const seoDescription = t('seoLanding.iso27001.seo.description');

  const faqs = [
    {
      question: t('seoLanding.iso27001.faq.items.0.question'),
      answer: t('seoLanding.iso27001.faq.items.0.answer'),
    },
    {
      question: t('seoLanding.iso27001.faq.items.1.question'),
      answer: t('seoLanding.iso27001.faq.items.1.answer'),
    },
    {
      question: t('seoLanding.iso27001.faq.items.2.question'),
      answer: t('seoLanding.iso27001.faq.items.2.answer'),
    },
    {
      question: t('seoLanding.iso27001.faq.items.3.question'),
      answer: t('seoLanding.iso27001.faq.items.3.answer'),
    },
    {
      question: t('seoLanding.iso27001.faq.items.4.question'),
      answer: t('seoLanding.iso27001.faq.items.4.answer'),
    },
    {
      question: t('seoLanding.iso27001.faq.items.5.question'),
      answer: t('seoLanding.iso27001.faq.items.5.answer'),
    },
  ];

  const features = [
    { icon: Shield, title: t('seoLanding.iso27001.features.isms.title'), description: t('seoLanding.iso27001.features.isms.description') },
    { icon: FileText, title: t('seoLanding.iso27001.features.policies.title'), description: t('seoLanding.iso27001.features.policies.description') },
    { icon: BarChart3, title: t('seoLanding.iso27001.features.risk.title'), description: t('seoLanding.iso27001.features.risk.description') },
    { icon: Users, title: t('seoLanding.iso27001.features.training.title'), description: t('seoLanding.iso27001.features.training.description') },
  ];

  const annexAControls = [
    'Organizational Controls',
    'People Controls',
    'Physical Controls',
    'Technological Controls',
  ];

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={pageUrl} />
        <link rel="alternate" hrefLang="en" href="https://www.quantifier.ai/en/iso27001" />
        <link rel="alternate" hrefLang="pl" href="https://www.quantifier.ai/pl/iso27001" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-6">
              <Lock className="w-4 h-4 mr-2" />
              {t('seoLanding.iso27001.hero.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t('seoLanding.iso27001.hero.title')}
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              {t('seoLanding.iso27001.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to={`/${locale}/contact`}>{t('seoLanding.common.requestDemo')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Link to={`/${locale}/frameworks/information-security/iso-27001`}>{t('seoLanding.common.learnMore')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why ISO 27001 Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t('seoLanding.iso27001.why.title')}
            </h2>
            <p className="text-lg text-slate-600">
              {t('seoLanding.iso27001.why.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{t(`seoLanding.iso27001.why.items.${i}.title`)}</h3>
                <p className="text-slate-600 text-sm">{t(`seoLanding.iso27001.why.items.${i}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t('seoLanding.iso27001.challenges.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-start bg-white rounded-lg p-5 border border-slate-200">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-red-600 font-bold">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{t(`seoLanding.iso27001.challenges.items.${i}.title`)}</h3>
                  <p className="text-slate-600 text-sm">{t(`seoLanding.iso27001.challenges.items.${i}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t('seoLanding.iso27001.solution.title')}
            </h2>
            <p className="text-lg text-slate-600">
              {t('seoLanding.iso27001.solution.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                <feature.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Annex A Controls Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t('seoLanding.iso27001.annexA.title')}
            </h2>
            <p className="text-lg text-slate-600">
              {t('seoLanding.iso27001.annexA.subtitle')}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {annexAControls.map((control, index) => (
              <div key={index} className="flex items-center bg-blue-50 text-blue-700 px-6 py-3 rounded-full border border-blue-200">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">{control}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-700 to-blue-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('seoLanding.iso27001.results.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[0, 1, 2].map((i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-bold text-white mb-2">{t(`seoLanding.iso27001.results.items.${i}.stat`)}</div>
                <p className="text-blue-200">{t(`seoLanding.iso27001.results.items.${i}.label`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        title={t('seoLanding.iso27001.faq.title')}
        faqs={faqs}
        pageUrl={pageUrl}
      />

      {/* Internal Links & CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {t('seoLanding.common.readyToStart')}
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              {t('seoLanding.iso27001.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to={`/${locale}/contact`}>{t('seoLanding.common.requestDemo')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to={`/${locale}/plans`}>{t('seoLanding.common.viewPricing')}</Link>
              </Button>
            </div>

            {/* Related Pages */}
            <div className="border-t border-slate-200 pt-8">
              <p className="text-sm text-slate-500 mb-4">{t('seoLanding.common.relatedPages')}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to={`/${locale}/soc2-automation`} className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  SOC 2 Automation <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <Link to={`/${locale}/grc-platform`} className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  GRC Platform <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <Link to={`/${locale}/gdpr-compliance`} className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  GDPR Compliance <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Iso27001Landing;
