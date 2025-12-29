import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import InsidersSection from "@/components/InsidersSection";
import TrustReasonsSection from "@/components/TrustReasonsSection";
import CtaSection from "@/components/CtaSection";
import { ArrowRight, CheckCircle, Database, Shield, Users, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t, currentLocale } = useLanguage();
  const location = useLocation();
  
  const baseUrl = 'https://quantifier.ai';
  const currentPath = location.pathname.replace(/^\/(en|pl)/, '');
  const canonicalUrl = `${baseUrl}/${currentLocale}${currentPath}`;
  const altLocale = currentLocale === 'en' ? 'pl' : 'en';
  const altUrl = `${baseUrl}/${altLocale}${currentPath}`;
  const defaultUrl = `${baseUrl}/en${currentPath}`;
  
  const title = t('seo.index.title');
  const description = t('seo.index.description');
  const fullTitle = `${title} | Quantifier.ai`;

  // Organization JSON-LD Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Quantifier.ai",
    "url": "https://quantifier.ai",
    "logo": "https://quantifier.ai/lovable-uploads/b5ac5352-8089-4e7d-a1d4-6c879bd4f57e.png",
    "description": currentLocale === 'en' 
      ? "AI-Native GRC Platform for Compliance Automation" 
      : "AI-Native Platforma GRC do Automatyzacji Compliance",
    "foundingDate": "2020",
    "sameAs": [
      "https://www.linkedin.com/company/quantifier-ai"
    ],
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "447 Sutter St Ste 405 PMB 137",
        "addressLocality": "San Francisco",
        "addressRegion": "CA",
        "postalCode": "94108",
        "addressCountry": "US"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Rondo Daszynskiego 1",
        "addressLocality": "Warsaw",
        "addressCountry": "PL"
      }
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-415-799-8206",
        "contactType": "sales",
        "areaServed": "US"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+48-698-759-206",
        "contactType": "sales",
        "areaServed": "EU"
      }
    ]
  };

  // WebSite JSON-LD Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Quantifier.ai",
    "url": "https://quantifier.ai",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://quantifier.ai/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // SoftwareApplication JSON-LD Schema
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Quantifier.ai",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Governance, Risk and Compliance (GRC)",
    "operatingSystem": "Web Browser",
    "url": "https://quantifier.ai",
    "description": currentLocale === 'en'
      ? "AI-native GRC platform for automated compliance with SOC 2, ISO 27001, GDPR, NIS2, DORA, and ESG frameworks. Continuous compliance monitoring with autonomous AI agents."
      : "AI-natywna platforma GRC do automatyzacji zgodności z SOC 2, ISO 27001, GDPR, NIS2, DORA i ESG. Ciągłe monitorowanie zgodności z autonomicznymi agentami AI.",
    "featureList": [
      "SOC 2 Type I/II Automation",
      "ISO 27001 Compliance",
      "GDPR Compliance Management",
      "NIS2 Directive Compliance",
      "DORA Compliance",
      "ESG Reporting",
      "Autonomous AI Compliance Officer",
      "Continuous Control Monitoring",
      "Automated Evidence Collection",
      "Risk Assessment & Management",
      "Policy & Document Management",
      "Audit-Ready Reporting"
    ],
    "offers": {
      "@type": "Offer",
      "url": "https://quantifier.ai/en/plans",
      "priceCurrency": "USD",
      "availability": "https://schema.org/OnlineOnly"
    },
    "provider": {
      "@type": "Organization",
      "name": "Quantifier.ai",
      "url": "https://quantifier.ai"
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        
        {/* Canonical & hreflang */}
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en" href={currentLocale === 'en' ? canonicalUrl : altUrl} />
        <link rel="alternate" hrefLang="pl" href={currentLocale === 'pl' ? canonicalUrl : altUrl} />
        <link rel="alternate" hrefLang="x-default" href={defaultUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${baseUrl}/og-image.png`} />
        <meta property="og:site_name" content="Quantifier.ai" />
        <meta property="og:locale" content={currentLocale === 'en' ? 'en_US' : 'pl_PL'} />
        <meta property="og:locale:alternate" content={currentLocale === 'en' ? 'pl_PL' : 'en_US'} />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${baseUrl}/og-image.png`} />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(softwareApplicationSchema)}
        </script>
      </Helmet>

      <HeroSection />
      <FeatureSection />
      <InsidersSection />
      <TrustReasonsSection />
      
      {/* Role-Based Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
              {t('roles.title')}
            </h2>
            <p className="text-lg text-slate-600">
              {t('roles.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-compliance-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-compliance-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('roles.managers.title')}</h3>
              <p className="text-slate-600 mb-4">
                {t('roles.managers.description')}
              </p>
              <Button asChild variant="outline" className="group" size="sm">
                <Link to={`/${currentLocale}/by-roles`}>
                  {t('roles.learnMore')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-innovation-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Database className="h-10 w-10 text-innovation-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('roles.contributors.title')}</h3>
              <p className="text-slate-600 mb-4">
                {t('roles.contributors.description')}
              </p>
              <Button asChild variant="outline" className="group" size="sm">
                <Link to={`/${currentLocale}/by-roles`}>
                  {t('roles.learnMore')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-compliance-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileCheck className="h-10 w-10 text-compliance-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('roles.auditors.title')}</h3>
              <p className="text-slate-600 mb-4">
                {t('roles.auditors.description')}
              </p>
              <Button asChild variant="outline" className="group" size="sm">
                <Link to={`/${currentLocale}/by-roles`}>
                  {t('roles.learnMore')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CtaSection />
    </div>
  );
};

export default Index;
