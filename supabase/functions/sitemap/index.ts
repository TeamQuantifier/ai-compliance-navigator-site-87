import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const BASE_URL = 'https://quantifier.ai';

// Static pages for the sitemap
const staticPages = [
  { path: '', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
  { path: '/partners', changefreq: 'monthly', priority: '0.7' },
  { path: '/plans', changefreq: 'weekly', priority: '0.9' },
  { path: '/success-stories', changefreq: 'weekly', priority: '0.9' },
  { path: '/blog', changefreq: 'daily', priority: '0.9' },
  { path: '/frameworks', changefreq: 'monthly', priority: '0.8' },
  { path: '/frameworks/cybersecurity', changefreq: 'monthly', priority: '0.8' },
  { path: '/frameworks/environmental', changefreq: 'monthly', priority: '0.8' },
  { path: '/frameworks/esg', changefreq: 'monthly', priority: '0.8' },
  { path: '/frameworks/governance', changefreq: 'monthly', priority: '0.8' },
  { path: '/frameworks/information-security', changefreq: 'monthly', priority: '0.8' },
  { path: '/frameworks/data-security', changefreq: 'monthly', priority: '0.8' },
  { path: '/product/overview', changefreq: 'monthly', priority: '0.8' },
  { path: '/product/features', changefreq: 'monthly', priority: '0.8' },
  { path: '/product/analytics-dashboards', changefreq: 'monthly', priority: '0.7' },
  { path: '/product/documents-management', changefreq: 'monthly', priority: '0.7' },
  { path: '/product/api-integrations', changefreq: 'monthly', priority: '0.7' },
];

const locales = ['en', 'pl'];

serve(async (req) => {
  try {
    console.log('Generating sitemap...');
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch all published stories
    const { data: stories, error: storiesError } = await supabase
      .from('stories')
      .select('slug, lang, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (storiesError) {
      console.error('Error fetching stories:', storiesError);
    }

    // Fetch all published posts
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('slug, lang, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (postsError) {
      console.error('Error fetching posts:', postsError);
    }

    const today = new Date().toISOString().split('T')[0];

    // Generate URL entries
    let urlEntries = '';

    // Static pages for each locale
    for (const page of staticPages) {
      for (const locale of locales) {
        const fullPath = `${BASE_URL}/${locale}${page.path}`;
        const altLocale = locale === 'en' ? 'pl' : 'en';
        const altPath = `${BASE_URL}/${altLocale}${page.path}`;
        
        urlEntries += `
  <url>
    <loc>${fullPath}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${locale === 'en' ? fullPath : altPath}" />
    <xhtml:link rel="alternate" hreflang="pl" href="${locale === 'pl' ? fullPath : altPath}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/en${page.path}" />
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
      }
    }

    // Success Stories
    if (stories && stories.length > 0) {
      // Group stories by slug to find alternates
      const storyMap = new Map<string, any[]>();
      stories.forEach(story => {
        const existing = storyMap.get(story.slug) || [];
        existing.push(story);
        storyMap.set(story.slug, existing);
      });

      for (const story of stories) {
        const fullPath = `${BASE_URL}/${story.lang}/success-stories/${story.slug}`;
        const altLocale = story.lang === 'en' ? 'pl' : 'en';
        
        // Try to find alternate language version
        const altStory = stories.find(s => s.lang === altLocale && s.slug === story.slug);
        const altPath = altStory 
          ? `${BASE_URL}/${altLocale}/success-stories/${altStory.slug}`
          : `${BASE_URL}/${altLocale}/success-stories/${story.slug}`;
        
        const lastmod = story.updated_at?.split('T')[0] || story.published_at?.split('T')[0] || today;
        
        urlEntries += `
  <url>
    <loc>${fullPath}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${story.lang === 'en' ? fullPath : altPath}" />
    <xhtml:link rel="alternate" hreflang="pl" href="${story.lang === 'pl' ? fullPath : altPath}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${story.lang === 'en' ? fullPath : altPath}" />
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
      }
    }

    // Blog Posts
    if (posts && posts.length > 0) {
      for (const post of posts) {
        const fullPath = `${BASE_URL}/${post.lang}/blog/${post.slug}`;
        const altLocale = post.lang === 'en' ? 'pl' : 'en';
        
        // Try to find alternate language version
        const altPost = posts.find(p => p.lang === altLocale && p.slug === post.slug);
        const altPath = altPost 
          ? `${BASE_URL}/${altLocale}/blog/${altPost.slug}`
          : `${BASE_URL}/${altLocale}/blog/${post.slug}`;
        
        const lastmod = post.updated_at?.split('T')[0] || post.published_at?.split('T')[0] || today;
        
        urlEntries += `
  <url>
    <loc>${fullPath}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${post.lang === 'en' ? fullPath : altPath}" />
    <xhtml:link rel="alternate" hreflang="pl" href="${post.lang === 'pl' ? fullPath : altPath}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${post.lang === 'en' ? fullPath : altPath}" />
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      }
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">${urlEntries}
</urlset>`;

    console.log(`Sitemap generated with ${(stories?.length || 0) + (posts?.length || 0)} dynamic entries`);

    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response(`Error: ${error.message}`, { 
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
});
