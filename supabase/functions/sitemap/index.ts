import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const BASE_URL = 'https://quantifier.ai';

// Static pages for the sitemap - flattened framework structure with real lastmod dates
const staticPages = [
  { path: '', changefreq: 'weekly', priority: '1.0', lastmod: '2026-01-26' },
  { path: '/about', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-15' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-10' },
  { path: '/partners', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-12' },
  { path: '/plans', changefreq: 'weekly', priority: '0.9', lastmod: '2026-01-20' },
  { path: '/success-stories', changefreq: 'weekly', priority: '0.9', lastmod: '2026-01-25' },
  { path: '/blog', changefreq: 'daily', priority: '0.9', lastmod: '2026-01-26' },
  // Product pages
  { path: '/product', changefreq: 'monthly', priority: '0.9', lastmod: '2026-01-15' },
  { path: '/product/overview', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-15' },
  { path: '/product/features', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-15' },
  { path: '/product/analytics-dashboards', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-10' },
  { path: '/product/documents-management', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-10' },
  { path: '/product/api-integrations', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-10' },
  { path: '/product/compliance-officer', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-10' },
  { path: '/product/task-data-management', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-10' },
  { path: '/product/value-chain', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-10' },
  { path: '/product/risk-assessment', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-10' },
  // By Roles pages
  { path: '/by-roles', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-26' },
  { path: '/by-roles/managers', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-20' },
  { path: '/by-roles/contributors', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-20' },
  { path: '/by-roles/auditor', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-20' },
  // Frameworks main page
  { path: '/frameworks', changefreq: 'monthly', priority: '0.9', lastmod: '2026-01-22' },
  // Flattened framework pages - direct access (high priority)
  { path: '/frameworks/nis-ii', changefreq: 'monthly', priority: '0.9', lastmod: '2026-01-25' },
  { path: '/frameworks/iso-27001', changefreq: 'monthly', priority: '0.9', lastmod: '2026-01-20' },
  { path: '/frameworks/soc', changefreq: 'monthly', priority: '0.9', lastmod: '2026-01-20' },
  { path: '/frameworks/gdpr', changefreq: 'monthly', priority: '0.9', lastmod: '2026-01-18' },
  { path: '/frameworks/dora', changefreq: 'monthly', priority: '0.9', lastmod: '2026-01-18' },
  { path: '/frameworks/nist', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-15' },
  { path: '/frameworks/iso-9001', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-15' },
  { path: '/frameworks/hipaa', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-15' },
  { path: '/frameworks/ccpa', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-15' },
  // Category pages (still exist for ESG, Environmental, Governance, Product Level)
  { path: '/frameworks/esg', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-20' },
  { path: '/frameworks/environmental', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-22' },
  { path: '/frameworks/governance', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-18' },
  { path: '/frameworks/product-level', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-15' },
  // Legal pages
  { path: '/legal/privacy', changefreq: 'yearly', priority: '0.3', lastmod: '2026-01-01' },
  { path: '/legal/terms', changefreq: 'yearly', priority: '0.3', lastmod: '2026-01-01' },
  { path: '/legal/cookies', changefreq: 'yearly', priority: '0.3', lastmod: '2026-01-01' },
];

const locales = ['en', 'pl', 'cs'];

// Helper to generate hreflang links for all locales
const generateHreflangLinks = (path: string, currentLocale: string): string => {
  return locales
    .map(locale => {
      const href = `${BASE_URL}/${locale}${path}`;
      return `<xhtml:link rel="alternate" hreflang="${locale}" href="${href}" />`;
    })
    .join('\n    ') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/en${path}" />`;
};

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

    // Static pages for each locale - use real lastmod from config
    for (const page of staticPages) {
      for (const locale of locales) {
        const fullPath = `${BASE_URL}/${locale}${page.path}`;
        const lastmod = page.lastmod || today;
        
        urlEntries += `
  <url>
    <loc>${fullPath}</loc>
    ${generateHreflangLinks(page.path, locale)}
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
      }
    }

    // Success Stories
    if (stories && stories.length > 0) {
      for (const story of stories) {
        const fullPath = `${BASE_URL}/${story.lang}/success-stories/${story.slug}`;
        const storyPath = `/success-stories/${story.slug}`;
        
        const lastmod = story.updated_at?.split('T')[0] || story.published_at?.split('T')[0] || today;
        
        urlEntries += `
  <url>
    <loc>${fullPath}</loc>
    ${generateHreflangLinks(storyPath, story.lang)}
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
        const postPath = `/blog/${post.slug}`;
        
        const lastmod = post.updated_at?.split('T')[0] || post.published_at?.split('T')[0] || today;
        
        urlEntries += `
  <url>
    <loc>${fullPath}</loc>
    ${generateHreflangLinks(postPath, post.lang)}
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

    console.log(`Sitemap generated with ${(stories?.length || 0) + (posts?.length || 0)} dynamic entries for ${locales.length} locales`);

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
