import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface PageTemplateProps {
  title: string;
  description: string;
  children: ReactNode;
  ogImage?: string;
  noIndex?: boolean;
}

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
  const currentPath = location.pathname.replace(/^\/(en|pl)/, '');
  const canonicalUrl = `${baseUrl}/${currentLocale}${currentPath}`;
  const altLocale = currentLocale === 'en' ? 'pl' : 'en';
  const altUrl = `${baseUrl}/${altLocale}${currentPath}`;
  const defaultUrl = `${baseUrl}/en${currentPath}`;
  
  const fullTitle = `${title} | Quantifier.ai`;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  return (
    <>
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
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:site_name" content="Quantifier.ai" />
        <meta property="og:locale" content={currentLocale === 'en' ? 'en_US' : 'pl_PL'} />
        <meta property="og:locale:alternate" content={currentLocale === 'en' ? 'pl_PL' : 'en_US'} />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImageUrl} />
        
        {/* Robots */}
        {noIndex && <meta name="robots" content="noindex, nofollow" />}
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
