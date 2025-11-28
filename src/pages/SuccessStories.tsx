import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStories } from '@/hooks/useBlog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, ArrowRight, Trophy } from 'lucide-react';
import PageTemplate from '@/components/PageTemplate';

const SuccessStories = () => {
  const { currentLocale, t } = useLanguage();
  const { data: stories, isLoading } = useStories(currentLocale);
  
  const canonicalUrl = `https://quantifier.ai/${currentLocale}/success-stories`;

  return (
    <>
      <Helmet>
        <title>{t('successStories.title')} | Quantifier.ai</title>
        <meta name="description" content={t('successStories.subtitle')} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* hreflang tags */}
        <link rel="alternate" hrefLang="en" href="https://quantifier.ai/en/success-stories" />
        <link rel="alternate" hrefLang="pl" href="https://quantifier.ai/pl/success-stories" />
        <link rel="alternate" hrefLang="x-default" href="https://quantifier.ai/en/success-stories" />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${t('successStories.title')} | Quantifier.ai`} />
        <meta property="og:description" content={t('successStories.subtitle')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content={currentLocale === 'pl' ? 'pl_PL' : 'en_US'} />
      </Helmet>

      <PageTemplate title={t('successStories.title')} description={t('successStories.subtitle')}>
        {/* Hero section */}
        <div className="bg-gradient-to-br from-compliance-50 to-innovation-50 py-16 px-6 rounded-xl mb-12 relative overflow-hidden shadow-xl">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-compliance-200 rounded-full blur-3xl opacity-30 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-innovation-200 rounded-full blur-3xl opacity-30 -z-10"></div>
          
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-4 bg-white rounded-full mb-8 border border-slate-200 shadow-sm">
              <Trophy className="h-10 w-10 text-compliance-600" />
            </div>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {t('successStories.hero.title')}
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              {t('successStories.hero.description')}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Loading state */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-video" />
                  <CardHeader>
                    <Skeleton className="h-6 w-24 mb-2" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-32" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Stories grid */}
          {!isLoading && stories && stories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden bg-slate-100">
                    <img 
                      src={story.og_image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'} 
                      alt={story.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {story.industry && (
                        <Badge variant="secondary">{story.industry}</Badge>
                      )}
                    </div>
                    <CardTitle className="line-clamp-2 text-lg">{story.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {story.summary}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(story.published_at || story.created_at).toLocaleDateString(currentLocale)}
                        </span>
                      </div>
                      <Link to={`/${currentLocale}/success-stories/${story.slug}`}>
                        <Button variant="ghost" size="sm" className="group">
                          {t('successStories.readMore')}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && (!stories || stories.length === 0) && (
            <div className="text-center py-12">
              <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">{t('successStories.notFound')}</h3>
            </div>
          )}
        </div>
      </PageTemplate>
    </>
  );
};

export default SuccessStories;
