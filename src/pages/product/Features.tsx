import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageTemplate from '@/components/PageTemplate';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import ProductHeroLeon from '@/components/product/ProductHeroLeon';
import InfinityComplianceLoop from '@/components/product/InfinityComplianceLoop';
import AlwaysOnBar from '@/components/product/AlwaysOnBar';
import ProductFiveAreas from '@/components/product/ProductFiveAreas';
import TraditionalVsQuantifier from '@/components/product/TraditionalVsQuantifier';
import FrameworkEngineGrid from '@/components/product/FrameworkEngineGrid';
import RolesValueCards from '@/components/product/RolesValueCards';
import leonOfficer from '@/assets/leon-compliance-officer.png';

const ProductFeatures = () => {
  const { t, currentLocale } = useLanguage();

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Quantifier.ai",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Governance, Risk and Compliance (GRC)",
    "operatingSystem": "Web Browser",
    "url": "https://quantifier.ai/en/product",
    "description": currentLocale === 'en'
      ? "AI-native GRC platform featuring autonomous AI Compliance Officer, real-time analytics dashboards, task & data hub, and comprehensive risk assessment for SOC 2, ISO 27001, GDPR, NIS2, and ESG compliance."
      : "AI-natywna platforma GRC z autonomicznym AI Compliance Officer, dashboardami analitycznymi w czasie rzeczywistym, hubem zadań i danych oraz kompleksową oceną ryzyka dla SOC 2, ISO 27001, GDPR, NIS2 i ESG.",
    "featureList": [
      "AI Compliance Officer Leon — 24/7 monitoring",
      "Continuous Compliance loop ∞",
      "Auto-zaciąganie dowodów z M365, Jiry, chmury",
      "Policy Builder — polityka w 15 minut",
      "Audit Pack jednym kliknięciem (PDF/XLSX/XBRL/XML)",
      "Multi-framework: NIS2, ISO 27001, DORA, GDPR, SOC 2",
    ],
    "offers": {
      "@type": "Offer",
      "url": "https://quantifier.ai/en/plans",
      "priceCurrency": "USD",
      "availability": "https://schema.org/OnlineOnly",
    },
    "provider": {
      "@type": "Organization",
      "name": "Quantifier.ai",
      "url": "https://quantifier.ai",
    },
  };

  return (
    <PageTemplate title={t('seo.product.title')} description={t('seo.product.description')}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(softwareApplicationSchema)}</script>
      </Helmet>

      {/* 1. Hero */}
      <ProductHeroLeon />

      {/* 2. Infinity Loop ∞ — clue strony */}
      <InfinityComplianceLoop />

      {/* 3. Always-on bar */}
      <AlwaysOnBar />

      {/* 4. Deep-dive: 5 obszarów */}
      <ProductFiveAreas />

      {/* 5. Traditional vs Quantifier */}
      <TraditionalVsQuantifier />

      {/* 6. Framework engine */}
      <FrameworkEngineGrid />

      {/* 7. Roles */}
      <RolesValueCards />

      {/* 8. Final CTA */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-emerald-600/20 border border-white/15 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8 items-center">
              <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto md:mx-0 flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/40 via-blue-400/30 to-purple-400/40 blur-xl animate-pulse" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-800 to-black flex items-center justify-center overflow-hidden ring-1 ring-white/20">
                  <img
                    src={leonOfficer}
                    alt="Leon"
                    className="h-[78%] w-[78%] object-contain"
                    loading="lazy"
                    width="160"
                    height="160"
                  />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Zobacz Leona w akcji
                </h2>
                <p className="text-white/80 mb-6">
                  30 minut, jeden screenshare, demo na Twoich frameworkach. Pokażemy, jak wygląda Continuous Compliance w praktyce.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Button size="lg" className="bg-white text-slate-950 hover:bg-white/90" asChild>
                    <Link to={`/${currentLocale}/contact/`}>
                      Umów demo z Leonem
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white"
                    asChild
                  >
                    <Link to={`/${currentLocale}/cybersecurity-check/`}>
                      Sprawdź gotowość NIS2
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
};

export default ProductFeatures;
