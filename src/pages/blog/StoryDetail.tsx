import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStory } from '@/hooks/useBlog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Calendar, Building2, Globe, AlertCircle, Trophy } from 'lucide-react';
import RichTextRenderer from '@/components/blog/RichTextRenderer';
import PageTemplate from '@/components/PageTemplate';
import FashionRetailerCaseStudy from '@/components/case-studies/FashionRetailerCaseStudy';
import LogisticsGroupCaseStudy from '@/components/case-studies/LogisticsGroupCaseStudy';
import FinancialServicesCaseStudy from '@/components/case-studies/FinancialServicesCaseStudy';
import type { Json } from '@/integrations/supabase/types';
import type { JSONContent } from '@tiptap/react';

interface KPI {
  label: string;
  value: string;
  unit?: string;
}

// Static case study slugs
const STATIC_CASE_STUDIES = ['fashion-retailer', 'logistics-group', 'financial-services'] as const;
type StaticCaseStudySlug = typeof STATIC_CASE_STUDIES[number];

const isStaticCaseStudy = (slug: string): slug is StaticCaseStudySlug => {
  return STATIC_CASE_STUDIES.includes(slug as StaticCaseStudySlug);
};

const StaticCaseStudyDetail = ({ slug }: { slug: StaticCaseStudySlug }) => {
  const { currentLocale, t } = useLanguage();
  
  const caseStudyComponents: Record<StaticCaseStudySlug, React.ReactNode> = {
    'fashion-retailer': <FashionRetailerCaseStudy />,
    'logistics-group': <LogisticsGroupCaseStudy />,
    'financial-services': <FinancialServicesCaseStudy />,
  };

  const titles: Record<StaticCaseStudySlug, string> = {
    'fashion-retailer': t('successStoriesPage.fashionRetailer.title'),
    'logistics-group': t('successStoriesPage.logisticsGroup.title'),
    'financial-services': t('successStoriesPage.financialServices.title'),
  };

  const descriptions: Record<StaticCaseStudySlug, string> = {
    'fashion-retailer': t('successStoriesPage.fashionRetailer.section1Text'),
    'logistics-group': t('successStoriesPage.logisticsGroup.section1Text'),
    'financial-services': t('successStoriesPage.financialServices.section1Text'),
  };

  const canonicalUrl = `https://quantifier.ai/${currentLocale}/success-stories/${slug}`;

  return (
    <>
      <Helmet>
        <title>{titles[slug]} | Quantifier.ai</title>
        <meta name="description" content={descriptions[slug].substring(0, 160)} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* hreflang tags */}
        <link rel="alternate" hrefLang="en" href={`https://quantifier.ai/en/success-stories/${slug}`} />
        <link rel="alternate" hrefLang="pl" href={`https://quantifier.ai/pl/success-stories/${slug}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://quantifier.ai/en/success-stories/${slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={titles[slug]} />
        <meta property="og:description" content={descriptions[slug].substring(0, 160)} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content={currentLocale === 'pl' ? 'pl_PL' : 'en_US'} />
      </Helmet>

      <PageTemplate title="" description="">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <div className="mb-8">
            <Link to={`/${currentLocale}/success-stories`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('successStories.backToStories')}
              </Button>
            </Link>
          </div>

          {/* Case study content */}
          {caseStudyComponents[slug]}

          {/* Back button */}
          <div className="mt-12 pt-8 border-t text-center">
            <Link to={`/${currentLocale}/success-stories`}>
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('successStories.backToStories')}
              </Button>
            </Link>
          </div>
        </div>
      </PageTemplate>
    </>
  );
};

const DatabaseStoryDetail = ({ slug }: { slug: string }) => {
  const { currentLocale, t } = useLanguage();
  
  const { data: story, isLoading, error } = useStory(slug, currentLocale);
  
  if (isLoading) {
    return (
      <PageTemplate title={t('successStories.loading')} description="">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="aspect-video mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </PageTemplate>
    );
  }

  if (error || !story) {
    return (
      <PageTemplate title={t('successStories.notFound')} description="">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{t('successStories.error')}</AlertDescription>
        </Alert>
        <div className="text-center mt-8">
          <Link to={`/${currentLocale}/success-stories`}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('successStories.backToStories')}
            </Button>
          </Link>
        </div>
      </PageTemplate>
    );
  }

  const canonicalUrl = `https://quantifier.ai/${currentLocale}/success-stories/${story.slug}`;
  const alternateLocale = currentLocale === 'en' ? 'pl' : 'en';
  const kpis = (Array.isArray(story.results_kpis) ? story.results_kpis : []) as unknown as KPI[];

  return (
    <>
      <Helmet>
        <title>{story.meta_title || story.title} | Quantifier.ai</title>
        <meta name="description" content={story.meta_desc || story.summary || ''} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* hreflang tags */}
        <link rel="alternate" hrefLang="en" href={`https://quantifier.ai/en/success-stories/${story.slug}`} />
        <link rel="alternate" hrefLang="pl" href={`https://quantifier.ai/pl/success-stories/${story.slug}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://quantifier.ai/en/success-stories/${story.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={story.meta_title || story.title} />
        <meta property="og:description" content={story.meta_desc || story.summary || ''} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        {story.og_image_url && <meta property="og:image" content={story.og_image_url} />}
        <meta property="og:locale" content={currentLocale === 'pl' ? 'pl_PL' : 'en_US'} />
        <meta property="og:locale:alternate" content={alternateLocale === 'pl' ? 'pl_PL' : 'en_US'} />
        
        {/* Article metadata */}
        <meta property="article:published_time" content={story.published_at || story.created_at} />
        <meta property="article:modified_time" content={story.updated_at} />
      </Helmet>

      <PageTemplate title="" description="">
        <article className="max-w-4xl mx-auto">
          {/* Back button */}
          <div className="mb-8">
            <Link to={`/${currentLocale}/success-stories`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('successStories.backToStories')}
              </Button>
            </Link>
          </div>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {story.industry && (
                <Badge variant="secondary">{story.industry}</Badge>
              )}
              {story.country && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  {story.country}
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {story.title}
            </h1>
            
            <div className="flex items-center gap-4 text-muted-foreground flex-wrap">
              {story.client_name && (
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  <span>{story.client_name}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={story.published_at || story.created_at}>
                  {new Date(story.published_at || story.created_at).toLocaleDateString(currentLocale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </div>
          </header>

          {/* Featured image */}
          {(story.og_image_url || story.logo_url) && (
            <div className="aspect-video overflow-hidden rounded-xl mb-8 bg-slate-100">
              <img 
                src={story.og_image_url || story.logo_url || ''} 
                alt={story.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Summary */}
          {story.summary && (
            <div className="bg-compliance-50 border-l-4 border-compliance-500 p-6 rounded-r-lg mb-8">
              <p className="text-lg text-slate-700 italic">{story.summary}</p>
            </div>
          )}

          {/* KPIs */}
          {kpis.length > 0 && (
            <div className="bg-gradient-to-br from-compliance-50 to-innovation-50 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-5 w-5 text-compliance-600" />
                <h2 className="text-xl font-semibold">{t('successStories.results')}</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {kpis.map((kpi, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <div className="text-2xl md:text-3xl font-bold text-compliance-600">
                      {kpi.value}{kpi.unit && <span className="text-lg">{kpi.unit}</span>}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{kpi.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <RichTextRenderer content={story.body_rich as unknown as JSONContent} />
          </div>

          {/* Tags */}
          {story.tags && story.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">{t('successStories.tags')}:</span>
                {story.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Back button */}
          <div className="mt-12 pt-8 border-t text-center">
            <Link to={`/${currentLocale}/success-stories`}>
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('successStories.backToStories')}
              </Button>
            </Link>
          </div>
        </article>
      </PageTemplate>
    </>
  );
};

const StoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return null;
  }

  // Check if this is a static case study
  if (isStaticCaseStudy(slug)) {
    return <StaticCaseStudyDetail slug={slug} />;
  }

  // Otherwise, fetch from database
  return <DatabaseStoryDetail slug={slug} />;
};

export default StoryDetail;
