import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { CheckCircle, Shield, FileText, Users, Globe, ArrowRight, Lock } from 'lucide-react';
import FAQSection from '@/components/seo/FAQSection';

const GdprCompliance = () => {
  const { t } = useTranslation();
  const { locale = 'en' } = useParams<{ locale: string }>();

  const pageUrl = `https://www.quantifier.ai/${locale}/gdpr-compliance`;
  const seoTitle = t('seoLanding.gdpr.seo.title');
  const seoDescription = t('seoLanding.gdpr.seo.description');

  const faqs = [
    {
      question: t('seoLanding.gdpr.faq.items.0.question'),
      answer: t('seoLanding.gdpr.faq.items.0.answer'),
    },
    {
      question: t('seoLanding.gdpr.faq.items.1.question'),
      answer: t('seoLanding.gdpr.faq.items.1.answer'),
    },
    {
      question: t('seoLanding.gdpr.faq.items.2.question'),
      answer: t('seoLanding.gdpr.faq.items.2.answer'),
    },
    {
      question: t('seoLanding.gdpr.faq.items.3.question'),
      answer: t('seoLanding.gdpr.faq.items.3.answer'),
    },
    {
      question: t('seoLanding.gdpr.faq.items.4.question'),
      answer: t('seoLanding.gdpr.faq.items.4.answer'),
    },
    {
      question: t('seoLanding.gdpr.faq.items.5.question'),
      answer: t('seoLanding.gdpr.faq.items.5.answer'),
    },
  ];

  const features = [
    { icon: FileText, title: t('seoLanding.gdpr.features.ropa.title'), description: t('seoLanding.gdpr.features.ropa.description') },
    { icon: Users, title: t('seoLanding.gdpr.features.dsar.title'), description: t('seoLanding.gdpr.features.dsar.description') },
    { icon: Shield, title: t('seoLanding.gdpr.features.dpia.title'), description: t('seoLanding.gdpr.features.dpia.description') },
    { icon: Globe, title: t('seoLanding.gdpr.features.transfers.title'), description: t('seoLanding.gdpr.features.transfers.description') },
  ];

  const gdprRights = [
    'Right to Access',
    'Right to Rectification',
    'Right to Erasure',
    'Right to Portability',
    'Right to Object',
    'Right to Restrict Processing',
  ];

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={pageUrl} />
        <link rel="alternate" hrefLang="en" href="https://www.quantifier.ai/en/gdpr-compliance" />
        <link rel="alternate" hrefLang="pl" href="https://www.quantifier.ai/pl/gdpr-compliance" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-6">
              <Lock className="w-4 h-4 mr-2" />
              {t('seoLanding.gdpr.hero.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t('seoLanding.gdpr.hero.title')}
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              {t('seoLanding.gdpr.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to={`/${locale}/contact`}>{t('seoLanding.common.requestDemo')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Link to={`/${locale}/frameworks/data-security`}>{t('seoLanding.common.learnMore')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t('seoLanding.gdpr.overview.title')}
            </h2>
            <p className="text-lg text-slate-600">
              {t('seoLanding.gdpr.overview.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="text-4xl font-bold text-purple-600 mb-3">{t(`seoLanding.gdpr.overview.items.${i}.stat`)}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{t(`seoLanding.gdpr.overview.items.${i}.title`)}</h3>
                <p className="text-slate-600 text-sm">{t(`seoLanding.gdpr.overview.items.${i}.description`)}</p>
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
              {t('seoLanding.gdpr.challenges.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-start bg-white rounded-lg p-5 border border-slate-200">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-red-600 font-bold">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{t(`seoLanding.gdpr.challenges.items.${i}.title`)}</h3>
                  <p className="text-slate-600 text-sm">{t(`seoLanding.gdpr.challenges.items.${i}.description`)}</p>
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
              {t('seoLanding.gdpr.solution.title')}
            </h2>
            <p className="text-lg text-slate-600">
              {t('seoLanding.gdpr.solution.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                <feature.icon className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Subject Rights Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t('seoLanding.gdpr.rights.title')}
            </h2>
            <p className="text-lg text-slate-600">
              {t('seoLanding.gdpr.rights.subtitle')}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {gdprRights.map((right, index) => (
              <div key={index} className="flex items-center bg-purple-50 text-purple-700 px-6 py-3 rounded-full border border-purple-200">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">{right}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-700 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('seoLanding.gdpr.results.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[0, 1, 2].map((i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-bold text-white mb-2">{t(`seoLanding.gdpr.results.items.${i}.stat`)}</div>
                <p className="text-purple-200">{t(`seoLanding.gdpr.results.items.${i}.label`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        title={t('seoLanding.gdpr.faq.title')}
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
              {t('seoLanding.gdpr.cta.description')}
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
                <Link to={`/${locale}/iso27001`} className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
                  ISO 27001 Compliance <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <Link to={`/${locale}/nis2`} className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
                  NIS2 Compliance <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <Link to={`/${locale}/grc-platform`} className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
                  GRC Platform <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GdprCompliance;
