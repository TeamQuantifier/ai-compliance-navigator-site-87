import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import PageTemplate from '@/components/PageTemplate';

// Mock data - będzie zastąpione przez Sanity
const mockPosts = {
  en: [
    {
      id: '1',
      title: 'Getting Started with ISO 27001 Compliance',
      slug: 'getting-started-iso-27001',
      excerpt: 'A comprehensive guide to implementing ISO 27001 in your organization.',
      category: 'Information Security',
      publishedAt: '2024-01-15',
      readingTime: 8,
      featuredImage: '/lovable-uploads/154104eb-8338-4e4f-884c-2343169fc09b.png'
    },
    {
      id: '2',
      title: 'GDPR Compliance Checklist for 2024',
      slug: 'gdpr-compliance-checklist-2024',
      excerpt: 'Essential steps to ensure your organization meets GDPR requirements.',
      category: 'Data Security',
      publishedAt: '2024-01-10',
      readingTime: 6,
      featuredImage: '/lovable-uploads/2fc8c576-cb69-4fea-822a-b157b5b6c412.png'
    }
  ],
  pl: [
    {
      id: '1',
      title: 'Wprowadzenie do zgodności ISO 27001',
      slug: 'wprowadzenie-zgodnosc-iso-27001',
      excerpt: 'Kompleksowy przewodnik po wdrażaniu ISO 27001 w organizacji.',
      category: 'Bezpieczeństwo Informacji',
      publishedAt: '2024-01-15',
      readingTime: 8,
      featuredImage: '/lovable-uploads/154104eb-8338-4e4f-884c-2343169fc09b.png'
    },
    {
      id: '2',
      title: 'Lista kontrolna zgodności RODO na 2024',
      slug: 'lista-kontrolna-rodo-2024',
      excerpt: 'Niezbędne kroki zapewnienia zgodności z wymogami RODO.',
      category: 'Bezpieczeństwo Danych',
      publishedAt: '2024-01-10',
      readingTime: 6,
      featuredImage: '/lovable-uploads/2fc8c576-cb69-4fea-822a-b157b5b6c412.png'
    }
  ]
};

const BlogList = () => {
  const { currentLocale, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const posts = mockPosts[currentLocale as keyof typeof mockPosts] || mockPosts.en;
  const canonicalUrl = `https://quantifier.ai/${currentLocale}/blog`;

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
          {/* Category filter - placeholder */}
          <div className="mb-8 flex gap-2 flex-wrap">
            <Badge 
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedCategory('all')}
            >
              {t('blog.allCategories')}
            </Badge>
          </div>

          {/* Blog posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{post.readingTime} {t('blog.readingTime')}</span>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.publishedAt).toLocaleDateString(currentLocale)}</span>
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
            ))}
          </div>

          {/* Info banner about Sanity integration */}
          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">🚀 Next Steps: Sanity CMS Integration</h3>
            <p className="text-muted-foreground">
              This is a placeholder blog structure. To complete the implementation:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Set up Sanity.io project with multi-language schema</li>
              <li>Replace mock data with real Sanity queries</li>
              <li>Add category filtering and search functionality</li>
              <li>Implement pagination or infinite scroll</li>
            </ul>
          </div>
        </div>
      </PageTemplate>
    </>
  );
};

export default BlogList;
