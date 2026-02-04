import { ReactNode, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { SUPPORTED_LOCALES, LOCALE_HREFLANG_MAP, Locale } from '@/i18n/config';

interface PageTemplateProps {
  title: string;
  description: string;
  children: ReactNode;
  ogImage?: string;
  noIndex?: boolean;
}

// Tracking parameters to strip from canonical URLs
const TRACKING_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'ref', 'source'];

// Strip tracking parameters from URL path
const stripTrackingParams = (pathname: string): string => {
  // Split path and query string
  const [path] = pathname.split('?');
  return path;
};

// Helper to generate breadcrumb items from path
const generateBreadcrumbs = (pathname: string, baseUrl: string) => {
  const cleanPath = stripTrackingParams(pathname);
  const pathSegments = cleanPath.split('/').filter(Boolean);
  const breadcrumbs = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": baseUrl
    }
  ];

  let currentPath = baseUrl;
  pathSegments.forEach((segment, index) => {
    // Skip locale segment for display name but include in path
    currentPath += `/${segment}`;
    const displayName = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": displayName,
      "item": currentPath
    });
  });

  return breadcrumbs;
};

const PageTemplate = ({
  title,
  description,
  children,
  ogImage = '/og-image.png',
  noIndex = false
}: PageTemplateProps) => {
  const { currentLocale } = useLanguage();
  const location = useLocation();
  
  const baseUrl = 'https://quantifier.ai';
  // Strip locale prefix AND any tracking parameters
  const currentPath = stripTrackingParams(location.pathname.replace(/^\/(en|pl|cs)/, ''));
  const canonicalUrl = `${baseUrl}/${currentLocale}${currentPath}`;
  
  const fullTitle = `${title} | Quantifier.ai`;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  // Generate hreflang for all supported locales
  const hreflangUrls = useMemo(() => {
    return SUPPORTED_LOCALES.map(locale => ({
      locale,
      url: `${baseUrl}/${locale}${currentPath}`
    }));
  }, [currentPath]);

  // Generate BreadcrumbList schema
  const breadcrumbSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": generateBreadcrumbs(location.pathname, baseUrl)
  }), [location.pathname]);

  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        
        {/* Robots - explicit index/follow */}
        <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
        
        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* hreflang for all supported locales */}
        {hreflangUrls.map(({ locale, url }) => (
          <link key={locale} rel="alternate" hrefLang={locale} href={url} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/en${currentPath}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:site_name" content="Quantifier.ai" />
        <meta property="og:locale" content={currentLocale === 'en' ? 'en_US' : currentLocale === 'pl' ? 'pl_PL' : 'cs_CZ'} />
        {SUPPORTED_LOCALES.filter(l => l !== currentLocale).map(locale => (
          <meta key={locale} property="og:locale:alternate" content={locale === 'en' ? 'en_US' : locale === 'pl' ? 'pl_PL' : 'cs_CZ'} />
        ))}
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImageUrl} />
        
        {/* BreadcrumbList JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-[20px]">
          {children}
        </div>
      </div>
    </>
  );
};

export default PageTemplate;
