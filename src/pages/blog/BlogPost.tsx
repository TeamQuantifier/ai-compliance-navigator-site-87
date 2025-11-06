import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import PageTemplate from '@/components/PageTemplate';

// Mock data - będzie zastąpione przez Sanity
const mockPostData = {
  en: {
    'getting-started-iso-27001': {
      title: 'Getting Started with ISO 27001 Compliance',
      slug: 'getting-started-iso-27001',
      seoTitle: 'ISO 27001 Compliance Guide 2024 | Getting Started',
      seoDescription: 'Complete guide to implementing ISO 27001 in your organization. Learn the key requirements, steps, and best practices.',
      content: `
        <h2>What is ISO 27001?</h2>
        <p>ISO 27001 is an international standard for information security management systems (ISMS). It provides a systematic approach to managing sensitive company information.</p>
        
        <h2>Key Requirements</h2>
        <p>The standard requires organizations to:</p>
        <ul>
          <li>Establish an information security management system</li>
          <li>Conduct regular risk assessments</li>
          <li>Implement appropriate security controls</li>
          <li>Monitor and review the ISMS regularly</li>
        </ul>
        
        <h2>Implementation Steps</h2>
        <p>Follow these steps to implement ISO 27001:</p>
        <ol>
          <li>Get management commitment and define scope</li>
          <li>Conduct a gap analysis</li>
          <li>Develop information security policies</li>
          <li>Perform risk assessment and treatment</li>
          <li>Implement controls and train staff</li>
          <li>Monitor, audit, and review</li>
        </ol>
      `,
      category: 'Information Security',
      publishedAt: '2024-01-15',
      readingTime: 8,
      featuredImage: '/lovable-uploads/154104eb-8338-4e4f-884c-2343169fc09b.png',
      author: { name: 'Quantifier Team', image: '' }
    }
  },
  pl: {
    'wprowadzenie-zgodnosc-iso-27001': {
      title: 'Wprowadzenie do zgodności ISO 27001',
      slug: 'wprowadzenie-zgodnosc-iso-27001',
      seoTitle: 'Przewodnik zgodności ISO 27001 2024 | Wprowadzenie',
      seoDescription: 'Kompleksowy przewodnik po wdrażaniu ISO 27001 w organizacji. Poznaj kluczowe wymagania, etapy i najlepsze praktyki.',
      content: `
        <h2>Czym jest ISO 27001?</h2>
        <p>ISO 27001 to międzynarodowy standard dla systemów zarządzania bezpieczeństwem informacji (ISMS). Zapewnia systematyczne podejście do zarządzania wrażliwymi informacjami firmowymi.</p>
        
        <h2>Kluczowe wymagania</h2>
        <p>Standard wymaga od organizacji:</p>
        <ul>
          <li>Ustanowienia systemu zarządzania bezpieczeństwem informacji</li>
          <li>Przeprowadzania regularnych ocen ryzyka</li>
          <li>Wdrażania odpowiednich kontroli bezpieczeństwa</li>
          <li>Regularnego monitorowania i przeglądu ISMS</li>
        </ul>
        
        <h2>Etapy wdrożenia</h2>
        <p>Wykonaj następujące kroki aby wdrożyć ISO 27001:</p>
        <ol>
          <li>Uzyskaj zaangażowanie zarządu i zdefiniuj zakres</li>
          <li>Przeprowadź analizę luk</li>
          <li>Opracuj polityki bezpieczeństwa informacji</li>
          <li>Wykonaj ocenę i postępowanie z ryzykiem</li>
          <li>Wdróż kontrole i przeszkol personel</li>
          <li>Monitoruj, audituj i dokonuj przeglądów</li>
        </ol>
      `,
      category: 'Bezpieczeństwo Informacji',
      publishedAt: '2024-01-15',
      readingTime: 8,
      featuredImage: '/lovable-uploads/154104eb-8338-4e4f-884c-2343169fc09b.png',
      author: { name: 'Zespół Quantifier', image: '' }
    }
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { currentLocale, t } = useLanguage();
  
  const posts = mockPostData[currentLocale as keyof typeof mockPostData] || mockPostData.en;
  const post = slug ? posts[slug as keyof typeof posts] : null;

  if (!post) {
    return (
      <PageTemplate title={t('common.notFound')} description="">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">{t('common.notFound')}</p>
          <Link to={`/${currentLocale}/blog`}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('blog.backToBlog')}
            </Button>
          </Link>
        </div>
      </PageTemplate>
    );
  }

  const canonicalUrl = `https://quantifier.ai/${currentLocale}/blog/${post.slug}`;
  const alternateSlug = currentLocale === 'en' ? 'wprowadzenie-zgodnosc-iso-27001' : 'getting-started-iso-27001';

  return (
    <>
      <Helmet>
        <title>{post.seoTitle}</title>
        <meta name="description" content={post.seoDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* hreflang tags */}
        <link rel="alternate" hrefLang="en" href={`https://quantifier.ai/en/blog/getting-started-iso-27001`} />
        <link rel="alternate" hrefLang="pl" href={`https://quantifier.ai/pl/blog/wprowadzenie-zgodnosc-iso-27001`} />
        <link rel="alternate" hrefLang="x-default" href={`https://quantifier.ai/en/blog/getting-started-iso-27001`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.seoDescription} />
        <meta property="og:image" content={post.featuredImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content={currentLocale === 'pl' ? 'pl_PL' : 'en_US'} />
        <meta property="article:published_time" content={post.publishedAt} />
        
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.seoDescription,
            "image": post.featuredImage,
            "datePublished": post.publishedAt,
            "author": {
              "@type": "Person",
              "name": post.author.name
            },
            "publisher": {
              "@type": "Organization",
              "name": "Quantifier.ai",
              "logo": {
                "@type": "ImageObject",
                "url": "https://quantifier.ai/lovable-uploads/dc230f24-69a0-48e6-952c-3811d16e1833.png"
              }
            },
            "mainEntityOfPage": canonicalUrl,
            "inLanguage": currentLocale
          })}
        </script>
      </Helmet>

      <PageTemplate title="" description="">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link to={`/${currentLocale}/blog`}>
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('blog.backToBlog')}
            </Button>
          </Link>

          {/* Featured image */}
          <div className="aspect-video overflow-hidden rounded-lg mb-8">
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article header */}
          <header className="mb-8">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{t('blog.publishedOn')} {new Date(post.publishedAt).toLocaleDateString(currentLocale)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} {t('blog.readingTime')}</span>
              </div>
            </div>
          </header>

          <Separator className="mb-8" />

          {/* Article content */}
          <article 
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <Separator className="my-8" />

          {/* Share section */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{t('blog.shareArticle')}</span>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </PageTemplate>
    </>
  );
};

export default BlogPost;
