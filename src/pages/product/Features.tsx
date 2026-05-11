import { Helmet } from 'react-helmet-async';
import PageTemplate from '@/components/PageTemplate';
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
      : "AI-natywna platforma GRC z autonomicznym AI Compliance Officer Leonem, pętlą Continuous Compliance i pakietem audytora w jednym kliknięciu.",
    "provider": { "@type": "Organization", "name": "Quantifier.ai", "url": "https://quantifier.ai" },
  };

  return (
    <PageTemplate title={t('seo.product.title')} description={t('seo.product.description')}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(softwareApplicationSchema)}</script>
      </Helmet>

      <InfinityComplianceLoop />
    </PageTemplate>
  );
};

export default ProductFeatures;
