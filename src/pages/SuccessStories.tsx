import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStories } from '@/hooks/useBlog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, ArrowRight, Trophy } from 'lucide-react';
import PageTemplate from '@/components/PageTemplate';
import { BookPromoSection } from '@/components/BookPromoSection';

const SuccessStories = () => {
  const { currentLocale, t } = useLanguage();
  const { data: stories, isLoading } = useStories(currentLocale);
  
  return (
      <PageTemplate title={t('successStories.title')} description={t('successStories.subtitle')}>
        {/* Compact Hero Section */}
        <div className="bg-gradient-to-b from-slate-950 via-slate-950 to-compliance-950 py-6 md:py-8 px-6 rounded-xl mb-8 relative overflow-hidden shadow-lg">
          {/* Decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-innovation-800 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-compliance-800 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute top-1/2 left-0 w-32 h-32 bg-slate-800 rounded-full blur-3xl opacity-20"></div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white flex items-center justify-center gap-3">
              <Trophy className="h-7 w-7" />
              {t('successStories.hero.title')}
            </h2>
            <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
              {t('successStories.hero.description')}
            </p>
          </div>
        </div>

        {/* Book Promo Section */}
        <BookPromoSection />

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
                  <Link to={`/${currentLocale}/success-stories/${story.slug}`} className="block">
                    <div className="aspect-video overflow-hidden bg-slate-100">
                      <img 
                        src={story.featured_image_url || story.og_image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'} 
                        alt={story.featured_image_alt || story.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                        width={800}
                        height={450}
                        loading="lazy"
                      />
                    </div>
                  </Link>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {story.industry && (
                        <Badge variant="secondary">{story.industry}</Badge>
                      )}
                    </div>
                    <Link to={`/${currentLocale}/success-stories/${story.slug}`}>
                      <CardTitle className="line-clamp-2 text-lg hover:text-primary transition-colors cursor-pointer">{story.title}</CardTitle>
                    </Link>
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
  );
};

export default SuccessStories;
