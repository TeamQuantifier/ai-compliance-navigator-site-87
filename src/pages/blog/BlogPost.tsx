import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePost, useAlternates } from '@/hooks/useBlog';
import { calculateReadingTime } from '@/lib/reading-time';
import RichTextRenderer from '@/components/blog/RichTextRenderer';
import { SEOHead } from '@/components/seo/SEOHead';
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
  const { data: alternates } = useAlternates(post?.group_id, currentLocale, 'post');

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

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt || ''}
        slug={post.slug}
        lang={currentLocale}
        contentType="post"
        featuredImageUrl={post.featured_image_url}
        featuredImageAlt={post.featured_image_alt}
        ogImageUrl={post.og_image_url}
        publishedAt={post.published_at}
        updatedAt={post.updated_at}
        createdAt={post.created_at}
        metaTitle={post.meta_title}
        metaDesc={post.meta_desc}
        focusKeyword={post.focus_keyword}
        canonicalUrl={post.canonical_url}
        robotsIndex={post.robots_index}
        robotsFollow={post.robots_follow}
        ogTitle={post.og_title}
        ogDescription={post.og_description}
        twitterCardType={post.twitter_card_type}
        twitterTitle={post.twitter_title}
        twitterDescription={post.twitter_description}
        twitterImageUrl={post.twitter_image_url}
        schemaType={post.schema_type}
        schemaJsonOverride={post.schema_json_override}
        breadcrumbsEnabled={post.breadcrumbs_enabled}
        tags={post.tags}
        category={post.category?.name}
        alternates={alternates || null}
      />

      <PageTemplate title="" description="" noSeo>
        <article className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link to={`/${currentLocale}/blog`}>
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('blog.backToBlog')}
            </Button>
          </Link>

          {/* Featured image */}
          {post.featured_image_url && (
            <img 
              src={post.featured_image_url} 
              alt={post.featured_image_alt || post.title}
              className="w-full aspect-video object-cover rounded-lg mb-8"
            />
          )}

          {/* Article header */}
          <header className="mb-8">
            {post.category && (
              <Badge variant="secondary" className="mb-4">
                {post.category.name}
              </Badge>
            )}
            
            <h1 className="text-4xl font-bold mb-4 text-foreground">{post.title}</h1>
            
            <div className="flex items-center gap-4 text-muted-foreground">
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
