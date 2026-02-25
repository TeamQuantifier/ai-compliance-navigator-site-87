import { ReactNode, useMemo, useEffect } from 'react';
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
  noSeo?: boolean;
}

// Tracking parameters to strip from canonical URLs
const TRACKING_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'ref', 'source'];

// Mapping of URL segments to proper display names for breadcrumbs
const SEGMENT_NAME_MAP: Record<string, string> = {
  'iso-27001': 'ISO 27001',
  'iso-9001': 'ISO 9001',
  'nis-ii': 'NIS2',
  'soc': 'SOC 2',
  'gdpr': 'GDPR',
  'dora': 'DORA',
  'hipaa': 'HIPAA',
  'ccpa': 'CCPA',
  'esg': 'ESG',
  'grc-platform': 'GRC Platform',
  'by-roles': 'By Role',
  'ai-compliance-officer': 'AI Compliance Officer',
  'task-data-management': 'Task & Data Management',
  'documents-management': 'Documents Management',
  'analytics-dashboards': 'Analytics Dashboards',
  'api-integrations': 'API Integrations',
  'value-chain': 'Value Chain',
  'risk-assessment': 'Risk Assessment',
  'product-level': 'Product Level',
  'success-stories': 'Success Stories',
  'events': 'Events',
  'nis2-w-polsce': 'NIS2 w Polsce',
};

// Parent category mapping for 3-level breadcrumbs
const SEGMENT_PARENT_MAP: Record<string, { segment: string; name: string }> = {
  'iso-27001': { segment: 'frameworks', name: 'Frameworks' },
  'iso-9001': { segment: 'frameworks', name: 'Frameworks' },
  'nis-ii': { segment: 'frameworks', name: 'Frameworks' },
  'soc': { segment: 'frameworks', name: 'Frameworks' },
  'gdpr': { segment: 'frameworks', name: 'Frameworks' },
  'dora': { segment: 'frameworks', name: 'Frameworks' },
  'hipaa': { segment: 'frameworks', name: 'Frameworks' },
  'ccpa': { segment: 'frameworks', name: 'Frameworks' },
  'esg': { segment: 'frameworks', name: 'Frameworks' },
  'environmental': { segment: 'frameworks', name: 'Frameworks' },
  'governance': { segment: 'frameworks', name: 'Frameworks' },
  'product-level': { segment: 'frameworks', name: 'Frameworks' },
  'features': { segment: 'product', name: 'Product' },
  'ai-compliance-officer': { segment: 'product', name: 'Product' },
  'task-data-management': { segment: 'product', name: 'Product' },
  'documents-management': { segment: 'product', name: 'Product' },
  'analytics-dashboards': { segment: 'product', name: 'Product' },
  'api-integrations': { segment: 'product', name: 'Product' },
  'value-chain': { segment: 'product', name: 'Product' },
  'risk-assessment': { segment: 'product', name: 'Product' },
  'overview': { segment: 'product', name: 'Product' },
  'managers': { segment: 'by-roles', name: 'By Role' },
  'contributors': { segment: 'by-roles', name: 'By Role' },
  'auditor': { segment: 'by-roles', name: 'By Role' },
  'nis2-w-polsce': { segment: 'events', name: 'Events' },
};

// Strip tracking parameters from URL path
const stripTrackingParams = (pathname: string): string => {
  const [path] = pathname.split('?');
  return path;
};

// Ensure URL ends with trailing slash
const ensureTrailingSlash = (url: string): string => {
  if (url.endsWith('/')) return url;
  return url + '/';
};

// Helper to generate breadcrumb items from path
const generateBreadcrumbs = (pathname: string, baseUrl: string) => {
  const cleanPath = stripTrackingParams(pathname);
  const pathSegments = cleanPath.split('/').filter(Boolean);
  // Remove locale segment
  const localeSegment = pathSegments[0];
  const contentSegments = pathSegments.slice(1);
  
  const breadcrumbs = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": baseUrl
    }
  ];

  if (contentSegments.length === 0) return breadcrumbs;

  // Get the last segment to check for parent category
  const lastSegment = contentSegments[contentSegments.length - 1];
  const parent = SEGMENT_PARENT_MAP[lastSegment];
  
  // If the path already contains the parent (e.g., /frameworks/iso-27001), use actual path
  // If not (e.g., flattened URL), insert parent breadcrumb
  let currentPath = baseUrl;
  let position = 2;

  for (let i = 0; i < contentSegments.length; i++) {
    const segment = contentSegments[i];
    currentPath += `/${segment}`;
    
    // Check if this is the last segment and it has a parent that isn't already in the path
    if (i === contentSegments.length - 1 && parent && !contentSegments.includes(parent.segment)) {
      // Insert parent breadcrumb before this one
      breadcrumbs.push({
        "@type": "ListItem",
        "position": position,
        "name": parent.name,
        "item": `${baseUrl}/${parent.segment}`
      });
      position++;
    }

    const displayName = SEGMENT_NAME_MAP[segment] || segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({
      "@type": "ListItem",
      "position": position,
      "name": displayName,
      "item": currentPath
    });
    position++;
  }

  return breadcrumbs;
};

const PageTemplate = ({
  title,
  description,
  children,
  ogImage = '/og-homepage.png',
  noIndex = false,
  noSeo = false
}: PageTemplateProps) => {
  const { currentLocale } = useLanguage();
  const location = useLocation();

  // Signal Netlify Prerender that static pages are ready
  useEffect(() => {
    if (!noSeo) {
      (window as any).prerenderReady = true;
    }
  }, [noSeo]);
  
  const baseUrl = 'https://quantifier.ai';
  // Strip locale prefix AND any tracking parameters
  const currentPath = stripTrackingParams(location.pathname.replace(/^\/(en|pl|cs)/, ''));
  const canonicalUrl = ensureTrailingSlash(`${baseUrl}/${currentLocale}${currentPath}`);
  
  const fullTitle = `${title} | Quantifier.ai`;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  // Generate hreflang for all supported locales
  const hreflangUrls = useMemo(() => {
    return SUPPORTED_LOCALES.map(locale => ({
      locale,
      url: ensureTrailingSlash(`${baseUrl}/${locale}${currentPath}`)
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
      {!noSeo && (
        <Helmet>
          <title>{fullTitle}</title>
          <meta name="description" content={description} />
          
          {/* Robots - explicit index/follow */}
          <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
          
          {/* Canonical */}
          <link rel="canonical" href={canonicalUrl} />
          
          {/* hreflang for all supported locales with geo-targeting */}
          {hreflangUrls.map(({ locale, url }) => (
            <link key={locale} rel="alternate" hrefLang={LOCALE_HREFLANG_MAP[locale as Locale]} href={url} />
          ))}
          <link rel="alternate" hrefLang="x-default" href={ensureTrailingSlash(`${baseUrl}/en${currentPath}`)} />
          
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
      )}
      
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-[20px]">
          {children}
        </div>
      </div>
    </>
  );
};

export default PageTemplate;
