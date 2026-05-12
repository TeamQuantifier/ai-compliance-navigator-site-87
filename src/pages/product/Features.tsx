import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageTemplate from '@/components/PageTemplate';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import InfinityComplianceLoop from '@/components/product/InfinityComplianceLoop';

const ProductFeatures = () => {
  const { t, currentLocale } = useLanguage();

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Quantifier.ai",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Governance, Risk and Compliance (GRC)",
    "operatingSystem": "Web Browser",
    "url": `https://quantifier.ai/${currentLocale}/product`,
    "description": currentLocale === 'en'
      ? "AI-native GRC platform with autonomous AI Compliance Officer Leon, continuous compliance loop, and one-click audit packs."
      : currentLocale === 'cs'
      ? "AI-nativní GRC platforma s autonomním AI Compliance Officerem Leonem, kontinuální smyčkou shody a reporty pro audit na jedno kliknutí."
      : "AI-natywna platforma GRC z autonomicznym AI Compliance Officer Leonem, pętlą Continuous Compliance i pakietem audytora w jednym kliknięciu.",
    "provider": { "@type": "Organization", "name": "Quantifier.ai", "url": "https://quantifier.ai" },
  };

  return (
    <PageTemplate title={t('seo.product.title')} description={t('seo.product.description')}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(softwareApplicationSchema)}</script>
      </Helmet>

      <InfinityComplianceLoop />

      {/* CTA */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">{t('product.overview.title')}</h2>
          <p className="text-xl opacity-90 mb-8">{t('product.overview.subtitle')}</p>
          <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90" asChild>
            <Link to={`/${currentLocale}/contact`}>
              {t('product.overview.requestDemo')} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ProductFeatures;
