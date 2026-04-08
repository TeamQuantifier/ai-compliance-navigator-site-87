import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';

interface RelatedArticlesProps {
  slugs: string[];
  lang: string;
}

const RelatedArticles = ({ slugs, lang }: RelatedArticlesProps) => {
  const { t, currentLocale } = useLanguage();

  const { data: posts } = useQuery({
    queryKey: ['related-articles', slugs, lang],
    queryFn: async () => {
      if (slugs.length === 0) return [];
      const { data, error } = await supabase
        .from('posts')
        .select('slug, title, excerpt, featured_image_url, featured_image_alt, published_at')
        .in('slug', slugs)
        .eq('status', 'published');
      if (error) throw error;
      // Keep original order from slugs array
      return slugs
        .map((s) => data?.find((p) => p.slug === s))
        .filter(Boolean) as typeof data;
    },
    enabled: slugs.length > 0,
  });

  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="text-2xl font-bold mb-6 text-foreground">
        {currentLocale === 'pl' ? 'Powiązane artykuły' : 'Related Articles'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/${currentLocale}/blog/${post.slug}`}
            className="group block rounded-lg border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Thumbnail area */}
            <div className="aspect-video bg-muted relative overflow-hidden">
              {post.featured_image_url ? (
                <img
                  src={post.featured_image_url}
                  alt={post.featured_image_alt || post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  width={400}
                  height={225}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-muted-foreground/40 text-center px-4">
                    <svg
                      className="w-10 h-10 mx-auto mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                      />
                    </svg>
                    <span className="text-xs">Thumbnail</span>
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
              )}
              <span className="inline-flex items-center text-sm font-medium text-primary">
                {currentLocale === 'pl' ? 'Czytaj więcej' : 'Read more'}
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
