import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePost, useAlternatePost } from '@/hooks/useBlog';
import { calculateReadingTime } from '@/lib/reading-time';
import RichTextRenderer from '@/components/blog/RichTextRenderer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Clock, Calendar, Share2, AlertCircle } from 'lucide-react';
import PageTemplate from '@/components/PageTemplate';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { currentLocale, t } = useLanguage();
  
  const { data: post, isLoading, error } = usePost(slug || '', currentLocale);
  const { data: alternatePost } = useAlternatePost(post?.id || '');

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.meta_desc || post?.excerpt,
        url: window.location.href,
      });
    }
  };

  if (error) {
    return (
      <PageTemplate title={t('blog.title')} description="">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{t('blog.error')}</AlertDescription>
        </Alert>
      </PageTemplate>
    );
  }

  if (isLoading) {
    return (
      <PageTemplate title={t('blog.loading')} description="">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-32 mb-8" />
          <Skeleton className="aspect-video w-full mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
      </PageTemplate>
    );
  }

  if (!post) {
    return (
      <PageTemplate title={t('blog.notFound')} description="">
        <div className="max-w-4xl mx-auto text-center py-12">
          <h2 className="text-2xl font-bold mb-4">{t('blog.notFound')}</h2>
          <Link to={`/${currentLocale}/blog`}>
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('blog.backToBlog')}
            </Button>
          </Link>
        </div>
      </PageTemplate>
    );
  }

  const readingTime = calculateReadingTime(post.body_rich as any);
  const canonicalUrl = `https://quantifier.ai/${currentLocale}/blog/${post.slug}`;
  const imageUrl = post.og_image_url || '/lovable-uploads/154104eb-8338-4e4f-884c-2343169fc09b.png';

  // Build alternate URLs for hreflang
  const alternateUrl = alternatePost 
    ? `https://quantifier.ai/${alternatePost.lang}/blog/${alternatePost.slug}`
    : null;
  const altLang = currentLocale === 'en' ? 'pl' : 'en';

  return (
    <>
      <Helmet>
        <title>{post.meta_title || post.title} | Quantifier.ai</title>
        <meta name="description" content={post.meta_desc || post.excerpt || ''} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* hreflang tags */}
        <link rel="alternate" hrefLang={currentLocale} href={canonicalUrl} />
        {alternateUrl && (
          <link rel="alternate" hrefLang={altLang} href={alternateUrl} />
        )}
        <link rel="alternate" hrefLang="x-default" href={`https://quantifier.ai/en/blog/${slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta property="og:description" content={post.meta_desc || post.excerpt || ''} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:locale" content={currentLocale === 'pl' ? 'pl_PL' : 'en_US'} />
        {alternateUrl && (
          <meta property="og:locale:alternate" content={altLang === 'pl' ? 'pl_PL' : 'en_US'} />
        )}
        
        {/* Article metadata */}
        {post.published_at && (
          <meta property="article:published_time" content={post.published_at} />
        )}
        {post.updated_at && (
          <meta property="article:modified_time" content={post.updated_at} />
        )}
        {post.author && (
          <meta property="article:author" content={post.author.name} />
        )}
        {post.tags && post.tags.map((tag: string) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.meta_desc || post.excerpt,
            image: imageUrl,
            datePublished: post.published_at || post.created_at,
            dateModified: post.updated_at,
            author: {
              '@type': 'Person',
              name: post.author?.name || 'Quantifier Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Quantifier.ai',
              logo: {
                '@type': 'ImageObject',
                url: 'https://quantifier.ai/logo.png',
              },
            },
          })}
        </script>
      </Helmet>

      <PageTemplate title="" description="">
        <article className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link to={`/${currentLocale}/blog`}>
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('blog.backToBlog')}
            </Button>
          </Link>

          {/* Featured image */}
          <div className="aspect-video overflow-hidden rounded-lg mb-8">
            <img 
              src={imageUrl} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article header */}
          <header className="mb-8">
            {post.category && (
              <Badge variant="secondary" className="mb-4">
                {post.category.name}
              </Badge>
            )}
            
            <h1 className="text-4xl font-bold mb-4 text-foreground">{post.title}</h1>
            
            <div className="flex items-center gap-4 text-muted-foreground">
              {post.author && (
                <div className="flex items-center gap-2">
                  {post.author.avatar_url && (
                    <img 
                      src={post.author.avatar_url} 
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span>{post.author.name}</span>
                </div>
              )}
              
              <Separator orientation="vertical" className="h-4" />
              
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {post.published_at 
                    ? new Date(post.published_at).toLocaleDateString(currentLocale, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : new Date(post.created_at).toLocaleDateString(currentLocale, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                  }
                </span>
              </div>
              
              <Separator orientation="vertical" className="h-4" />
              
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readingTime} {t('blog.readingTime')}</span>
              </div>
            </div>
          </header>

          {/* Article content */}
          <div className="mb-12">
            <RichTextRenderer content={post.body_rich as any} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase">Tags</h3>
              <div className="flex gap-2 flex-wrap">
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Share button */}
          <div className="flex justify-center pt-8 border-t">
            <Button onClick={handleShare} variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              {t('blog.share')}
            </Button>
          </div>
        </article>
      </PageTemplate>
    </>
  );
};

export default BlogPost;
