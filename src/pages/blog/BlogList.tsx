import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePosts, useCategories } from '@/hooks/useBlog';
import { calculateReadingTime } from '@/lib/reading-time';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, Calendar, ArrowRight, AlertCircle } from 'lucide-react';
import PageTemplate from '@/components/PageTemplate';

const BlogList = () => {
  const { currentLocale, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const { data: posts, isLoading: postsLoading, error: postsError } = usePosts(
    currentLocale, 
    selectedCategory
  );
  const { data: categories, isLoading: categoriesLoading } = useCategories(currentLocale);
  
  const canonicalUrl = `https://quantifier.ai/${currentLocale}/blog`;

  if (postsError) {
    return (
      <PageTemplate title={t('blog.title')} description={t('blog.subtitle')}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{t('blog.error')}</AlertDescription>
        </Alert>
      </PageTemplate>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('blog.title')} | Quantifier.ai</title>
        <meta name="description" content={t('blog.subtitle')} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* hreflang tags */}
        <link rel="alternate" hrefLang="en" href="https://quantifier.ai/en/blog" />
        <link rel="alternate" hrefLang="pl" href="https://quantifier.ai/pl/blog" />
        <link rel="alternate" hrefLang="x-default" href="https://quantifier.ai/en/blog" />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${t('blog.title')} | Quantifier.ai`} />
        <meta property="og:description" content={t('blog.subtitle')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content={currentLocale === 'pl' ? 'pl_PL' : 'en_US'} />
      </Helmet>

      <PageTemplate title={t('blog.title')} description={t('blog.subtitle')}>
        <div className="max-w-7xl mx-auto">
          {/* Category filter */}
          <div className="mb-8 flex gap-2 flex-wrap">
            {categoriesLoading ? (
              <>
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-28" />
              </>
            ) : (
              <>
                <Badge 
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory('all')}
                >
                  {t('blog.allCategories')}
                </Badge>
                {categories?.map((category) => (
                  <Badge 
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Badge>
                ))}
              </>
            )}
          </div>

          {/* Blog posts grid */}
          {postsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-video" />
                  <CardHeader>
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-32" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const readingTime = calculateReadingTime(post.body_rich as any);
                const imageUrl = post.og_image_url || '/lovable-uploads/154104eb-8338-4e4f-884c-2343169fc09b.png';
                
                return (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden">
              <img 
                src={post.featured_image_url || imageUrl} 
                alt={post.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        {post.category && (
                          <Badge variant="secondary">{post.category.name}</Badge>
                        )}
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{readingTime} {t('blog.readingTime')}</span>
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt || post.meta_desc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {post.published_at 
                              ? new Date(post.published_at).toLocaleDateString(currentLocale)
                              : new Date(post.created_at).toLocaleDateString(currentLocale)
                            }
                          </span>
                        </div>
                        <Link to={`/${currentLocale}/blog/${post.slug}`}>
                          <Button variant="ghost" size="sm" className="group">
                            {t('blog.readMore')}
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t('blog.notFound')}</p>
            </div>
          )}
        </div>
      </PageTemplate>
    </>
  );
};

export default BlogList;
