import { Helmet } from 'react-helmet-async';
import { LOCALE_HREFLANG_MAP, Locale } from '@/i18n/config';

export interface SEOHeadProps {
  // Content data
  title: string;
  description?: string;
  excerpt?: string;
  
  // URLs
  slug: string;
  lang: string;
  contentType: 'post' | 'story';
  
  // Images
  featuredImageUrl?: string | null;
  featuredImageAlt?: string | null;
  ogImageUrl?: string | null;
  
  // Dates
  publishedAt?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
  
  // Optional SEO fields (from database)
  metaTitle?: string | null;
  metaDesc?: string | null;
  focusKeyword?: string | null;
  canonicalUrl?: string | null;
  robotsIndex?: boolean | null;
  robotsFollow?: boolean | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  twitterCardType?: string | null;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  twitterImageUrl?: string | null;
  schemaType?: string | null;
  schemaJsonOverride?: any;
  breadcrumbsEnabled?: boolean | null;
  
  // Additional data
  tags?: string[] | null;
  category?: string | null;
  
  // For stories
  industry?: string | null;
  clientName?: string | null;
  
  // Alternate language versions (for hreflang)
  alternates?: Array<{ lang: string; slug: string }> | null;
}

const BASE_URL = 'https://quantifier.ai';
const DEFAULT_OG_IMAGE = '/lovable-uploads/platform-screenshot.png';
const BRAND_NAME = 'Quantifier.ai';
const BRAND_LOGO = 'https://quantifier.ai/logo-quantifier.png';

// Ensure URL ends with trailing slash
const ensureTrailingSlash = (url: string): string => {
  if (url.endsWith('/')) return url;
  return url + '/';
};

export const SEOHead = ({
  title,
  description,
  excerpt,
  slug,
  lang,
  contentType,
  featuredImageUrl,
  featuredImageAlt,
  ogImageUrl,
  publishedAt,
  updatedAt,
  createdAt,
  metaTitle,
  metaDesc,
  focusKeyword,
  canonicalUrl: customCanonicalUrl,
  robotsIndex = true,
  robotsFollow = true,
  ogTitle,
  ogDescription,
  twitterCardType = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImageUrl,
  schemaType,
  schemaJsonOverride,
  breadcrumbsEnabled = true,
  tags,
  category,
  industry,
  clientName,
  alternates,
}: SEOHeadProps) => {
  // Build URLs with trailing slash
  const basePath = contentType === 'post' ? 'blog' : 'success-stories';
  const canonicalUrl = customCanonicalUrl || ensureTrailingSlash(`${BASE_URL}/${lang}/${basePath}/${slug}`);
  
  // Build alternates URLs with proper hreflang
  const alternateLinks = (alternates || []).map(alt => ({
    lang: alt.lang,
    hreflang: LOCALE_HREFLANG_MAP[alt.lang as Locale] || alt.lang,
    url: ensureTrailingSlash(`${BASE_URL}/${alt.lang}/${basePath}/${alt.slug}`),
  }));
  
  // x-default: use EN alternate if exists, otherwise current URL
  const enAlternate = alternateLinks.find(a => a.lang === 'en');
  const defaultLangUrl = lang === 'en' 
    ? canonicalUrl 
    : enAlternate 
      ? enAlternate.url 
      : canonicalUrl;

  // Fallback logic for meta fields
  const finalTitle = metaTitle || `${title} | ${BRAND_NAME}`;
  const finalDescription = metaDesc || excerpt || description || '';
  
  // OG fields with fallbacks
  const finalOgTitle = ogTitle || metaTitle || title;
  const finalOgDescription = ogDescription || metaDesc || excerpt || description || '';
  const finalOgImage = ogImageUrl || featuredImageUrl || `${BASE_URL}${DEFAULT_OG_IMAGE}`;
  
  // Twitter fields with fallbacks
  const finalTwitterTitle = twitterTitle || finalOgTitle;
  const finalTwitterDescription = twitterDescription || finalOgDescription;
  const finalTwitterImage = twitterImageUrl || finalOgImage;
  
  // Robots meta
  const robotsContent = `${robotsIndex !== false ? 'index' : 'noindex'}, ${robotsFollow !== false ? 'follow' : 'nofollow'}`;
  
  // Locale formatting
  const ogLocale = lang === 'pl' ? 'pl_PL' : lang === 'cs' ? 'cs_CZ' : 'en_US';
  const inLanguage = lang === 'pl' ? 'pl-PL' : lang === 'cs' ? 'cs-CZ' : 'en-US';

  // Determine schema type
  const effectiveSchemaType = schemaType || (contentType === 'post' ? 'BlogPosting' : 'Article');
  
  // Build JSON-LD schema
  const buildSchema = () => {
    // If custom override provided, use it
    if (schemaJsonOverride) {
      return schemaJsonOverride;
    }

    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': effectiveSchemaType,
      headline: title,
      description: finalDescription,
      image: finalOgImage,
      datePublished: publishedAt || createdAt,
      dateModified: updatedAt || publishedAt || createdAt,
      author: {
        '@type': 'Organization',
        name: BRAND_NAME,
        url: BASE_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: BRAND_NAME,
        logo: {
          '@type': 'ImageObject',
          url: BRAND_LOGO,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
      inLanguage,
      ...(tags?.length && { keywords: tags.join(', ') }),
      ...(category && { articleSection: category }),
      ...(industry && { articleSection: industry }),
    };

    return baseSchema;
  };

  // Build breadcrumb schema
  const buildBreadcrumbSchema = () => {
    if (!breadcrumbsEnabled) return null;

    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${BASE_URL}/${lang}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: contentType === 'post' ? 'Blog' : 'Success Stories',
        item: `${BASE_URL}/${lang}/${basePath}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
      },
    ];

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    };
  };

  const articleSchema = buildSchema();
  const breadcrumbSchema = buildBreadcrumbSchema();

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      
      {/* Robots */}
      <meta name="robots" content={robotsContent} />
      
      {/* Canonical & hreflang with geo-targeting */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang={LOCALE_HREFLANG_MAP[lang as Locale] || lang} href={canonicalUrl} />
      {alternateLinks.map(alt => (
        <link key={alt.lang} rel="alternate" hrefLang={alt.hreflang} href={alt.url} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={defaultLangUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:site_name" content={BRAND_NAME} />
      <meta property="og:locale" content={ogLocale} />
      {alternateLinks.map(alt => {
        const altOgLocale = alt.lang === 'pl' ? 'pl_PL' : alt.lang === 'cs' ? 'cs_CZ' : 'en_US';
        return <meta key={alt.lang} property="og:locale:alternate" content={altOgLocale} />;
      })}
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content={twitterCardType || 'summary_large_image'} />
      <meta name="twitter:title" content={finalTwitterTitle} />
      <meta name="twitter:description" content={finalTwitterDescription} />
      <meta name="twitter:image" content={finalTwitterImage} />
      {featuredImageAlt && <meta name="twitter:image:alt" content={featuredImageAlt} />}
      
      {/* Article metadata */}
      {(publishedAt || createdAt) && (
        <meta property="article:published_time" content={publishedAt || createdAt || ''} />
      )}
      {updatedAt && (
        <meta property="article:modified_time" content={updatedAt} />
      )}
      {tags?.map((tag: string) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* JSON-LD Schema - Article/BlogPosting */}
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
      
      {/* JSON-LD Schema - Breadcrumbs */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
