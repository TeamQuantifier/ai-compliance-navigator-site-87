import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { CheckCircle, Shield, BarChart3, Layers, Bot, ArrowRight, Boxes, Workflow } from 'lucide-react';
import FAQSection from '@/components/seo/FAQSection';

const GrcPlatform = () => {
  const { t } = useTranslation();
  const { locale = 'en' } = useParams<{ locale: string }>();

  const baseUrl = 'https://quantifier.ai';
  const pageUrl = `${baseUrl}/${locale}/grc-platform/`;
  const seoTitle = t('seoLanding.grc.seo.title');
  const seoDescription = t('seoLanding.grc.seo.description');

  const faqs = [
    {
      question: t('seoLanding.grc.faq.items.0.question'),
      answer: t('seoLanding.grc.faq.items.0.answer'),
    },
    {
      question: t('seoLanding.grc.faq.items.1.question'),
      answer: t('seoLanding.grc.faq.items.1.answer'),
    },
    {
      question: t('seoLanding.grc.faq.items.2.question'),
      answer: t('seoLanding.grc.faq.items.2.answer'),
    },
    {
      question: t('seoLanding.grc.faq.items.3.question'),
      answer: t('seoLanding.grc.faq.items.3.answer'),
    },
    {
      question: t('seoLanding.grc.faq.items.4.question'),
      answer: t('seoLanding.grc.faq.items.4.answer'),
    },
    {
      question: t('seoLanding.grc.faq.items.5.question'),
      answer: t('seoLanding.grc.faq.items.5.answer'),
    },
  ];

  const features = [
    { icon: Layers, title: t('seoLanding.grc.features.unified.title'), description: t('seoLanding.grc.features.unified.description') },
    { icon: Bot, title: t('seoLanding.grc.features.ai.title'), description: t('seoLanding.grc.features.ai.description') },
    { icon: BarChart3, title: t('seoLanding.grc.features.analytics.title'), description: t('seoLanding.grc.features.analytics.description') },
    { icon: Workflow, title: t('seoLanding.grc.features.automation.title'), description: t('seoLanding.grc.features.automation.description') },
  ];

  const frameworks = [
    'SOC 2',
    'ISO 27001',
    'GDPR',
    'NIS2',
    'HIPAA',
    'NIST',
    'ISO 14001',
    'ESG',
  ];

  // BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${baseUrl}/${locale}/` },
      { "@type": "ListItem", "position": 2, "name": "GRC Platform", "item": pageUrl }
    ]
  };

  // SoftwareApplication JSON-LD
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Quantifier.ai",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Governance, Risk and Compliance (GRC)",
    "operatingSystem": "Web Browser",
    "url": baseUrl,
    "description": seoDescription,
    "offers": {
      "@type": "Offer",
      "url": `${baseUrl}/${locale}/plans`,
      "priceCurrency": "USD",
      "availability": "https://schema.org/OnlineOnly"
    },
    "provider": {
      "@type": "Organization",
      "name": "Quantifier.ai",
      "url": baseUrl
    }
  };

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />
        <link rel="alternate" hrefLang="en" href={`${baseUrl}/en/grc-platform/`} />
        <link rel="alternate" hrefLang="pl-PL" href={`${baseUrl}/pl/grc-platform/`} />
        <link rel="alternate" hrefLang="cs-CZ" href={`${baseUrl}/cs/grc-platform/`} />
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/en/grc-platform/`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${baseUrl}/lovable-uploads/platform-screenshot.png`} />
        <meta property="og:site_name" content="Quantifier.ai" />
        <meta property="og:locale" content={locale === 'pl' ? 'pl_PL' : locale === 'cs' ? 'cs_CZ' : 'en_US'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={`${baseUrl}/lovable-uploads/platform-screenshot.png`} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(softwareAppSchema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-300 text-sm font-medium mb-6">
              <Boxes className="w-4 h-4 mr-2" />
              {t('seoLanding.grc.hero.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t('seoLanding.grc.hero.title')}
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              {t('seoLanding.grc.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to={`/${locale}/contact`}>{t('seoLanding.common.requestDemo')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Link to={`/${locale}/product/features`}>{t('seoLanding.common.learnMore')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is GRC Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t('seoLanding.grc.whatIs.title')}
            </h2>
            <p className="text-lg text-slate-600">
              {t('seoLanding.grc.whatIs.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-emerald-600">{t(`seoLanding.grc.whatIs.pillars.${i}.letter`)}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{t(`seoLanding.grc.whatIs.pillars.${i}.title`)}</h3>
                <p className="text-slate-600 text-sm">{t(`seoLanding.grc.whatIs.pillars.${i}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Traditional GRC Problems Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t('seoLanding.grc.problems.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-start bg-white rounded-lg p-5 border border-slate-200">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-red-600 font-bold">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{t(`seoLanding.grc.problems.items.${i}.title`)}</h3>
                  <p className="text-slate-600 text-sm">{t(`seoLanding.grc.problems.items.${i}.description`)}</p>
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
              {t('seoLanding.grc.solution.title')}
            </h2>
            <p className="text-lg text-slate-600">
              {t('seoLanding.grc.solution.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                <feature.icon className="w-10 h-10 text-emerald-600 mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Frameworks Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t('seoLanding.grc.frameworks.title')}
            </h2>
            <p className="text-lg text-slate-600">
              {t('seoLanding.grc.frameworks.subtitle')}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {frameworks.map((framework, index) => (
              <div key={index} className="flex items-center bg-emerald-50 text-emerald-700 px-6 py-3 rounded-full border border-emerald-200">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">{framework}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t('seoLanding.grc.comparison.title')}
            </h2>
            <p className="text-lg text-slate-600">
              {t('seoLanding.grc.comparison.subtitle')}
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="font-semibold text-slate-900">{t('seoLanding.grc.comparison.feature')}</div>
              <div className="font-semibold text-slate-900 text-center">{t('seoLanding.grc.comparison.traditional')}</div>
              <div className="font-semibold text-emerald-600 text-center">Quantifier</div>
            </div>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-3 gap-4 py-4 border-b border-slate-200">
                <div className="text-slate-700">{t(`seoLanding.grc.comparison.rows.${i}.feature`)}</div>
                <div className="text-slate-500 text-center">{t(`seoLanding.grc.comparison.rows.${i}.traditional`)}</div>
                <div className="text-emerald-600 text-center font-medium">{t(`seoLanding.grc.comparison.rows.${i}.quantifier`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-600 to-emerald-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('seoLanding.grc.results.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[0, 1, 2].map((i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-bold text-white mb-2">{t(`seoLanding.grc.results.items.${i}.stat`)}</div>
                <p className="text-emerald-200">{t(`seoLanding.grc.results.items.${i}.label`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        title={t('seoLanding.grc.faq.title')}
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
              {t('seoLanding.grc.cta.description')}
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
                <Link to={`/${locale}/soc2-automation`} className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium">
                  SOC 2 Automation <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <Link to={`/${locale}/iso27001`} className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium">
                  ISO 27001 Compliance <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <Link to={`/${locale}/nis2`} className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium">
                  NIS2 Compliance <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GrcPlatform;
