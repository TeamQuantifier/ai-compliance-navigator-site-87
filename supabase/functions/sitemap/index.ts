import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const BASE_URL = 'https://quantifier.ai';

const ensureTrailingSlash = (url: string): string => {
  if (url.endsWith('/')) return url;
  return url + '/';
};

const staticPages = [
  { path: '', changefreq: 'weekly', priority: '1.0', lastmod: '2026-02-17' },
  { path: '/about', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-15' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-10' },
  { path: '/partners', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-12' },
  { path: '/plans', changefreq: 'weekly', priority: '0.9', lastmod: '2026-01-20' },
  { path: '/success-stories', changefreq: 'weekly', priority: '0.9', lastmod: '2026-02-17' },
  { path: '/blog', changefreq: 'daily', priority: '0.9', lastmod: '2026-02-17' },
  { path: '/grc-platform', changefreq: 'monthly', priority: '0.9', lastmod: '2026-01-20' },
  { path: '/product', changefreq: 'monthly', priority: '0.9', lastmod: '2026-01-15' },
  { path: '/product/overview', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-15' },
  { path: '/product/features', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-15' },
  { path: '/product/analytics-dashboards', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-10' },
  { path: '/product/documents-management', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-10' },
  { path: '/product/api-integrations', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-10' },
  { path: '/product/ai-compliance-officer', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-10' },
  { path: '/product/task-data-management', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-10' },
  { path: '/product/value-chain', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-10' },
  { path: '/product/risk-assessment', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-10' },
  { path: '/by-roles', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-26' },
  { path: '/by-roles/managers', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-20' },
  { path: '/by-roles/contributors', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-20' },
  { path: '/by-roles/auditor', changefreq: 'monthly', priority: '0.7', lastmod: '2026-01-20' },
  { path: '/frameworks', changefreq: 'monthly', priority: '0.9', lastmod: '2026-01-22' },
  { path: '/frameworks/nis-ii', changefreq: 'monthly', priority: '0.9', lastmod: '2026-01-25' },
  { path: '/frameworks/iso-27001', changefreq: 'monthly', priority: '0.9', lastmod: '2026-01-20' },
  { path: '/frameworks/soc', changefreq: 'monthly', priority: '0.9', lastmod: '2026-01-20' },
  { path: '/frameworks/gdpr', changefreq: 'monthly', priority: '0.9', lastmod: '2026-01-18' },
  { path: '/frameworks/dora', changefreq: 'monthly', priority: '0.9', lastmod: '2026-01-18' },
  { path: '/frameworks/iso-9001', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-15' },
  { path: '/frameworks/hipaa', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-15' },
  { path: '/frameworks/ccpa', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-15' },
  { path: '/frameworks/esg', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-20' },
  { path: '/frameworks/environmental', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-22' },
  { path: '/frameworks/governance', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-18' },
  { path: '/frameworks/product-level', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-15' },
  { path: '/legal/privacy', changefreq: 'yearly', priority: '0.3', lastmod: '2026-01-01' },
  { path: '/legal/terms', changefreq: 'yearly', priority: '0.3', lastmod: '2026-01-01' },
  { path: '/legal/cookies', changefreq: 'yearly', priority: '0.3', lastmod: '2026-01-01' },
  { path: '/cybersecurity-check', changefreq: 'monthly', priority: '0.8', lastmod: '2026-02-19' },
  { path: '/events', changefreq: 'weekly', priority: '0.8', lastmod: '2026-02-24' },
  { path: '/events/nis2-w-polsce', changefreq: 'weekly', priority: '0.9', lastmod: '2026-02-24' },
];

const locales = ['en', 'pl', 'cs'];

const localeHreflangMap: Record<string, string> = {
  en: 'en',
  pl: 'pl-PL',
  cs: 'cs-CZ',
};

// Generate hreflang links for static pages (all locales share same path)
const generateStaticHreflangLinks = (path: string): string => {
  return locales
    .map(locale => {
      const href = ensureTrailingSlash(`${BASE_URL}/${locale}${path}`);
      const hreflang = localeHreflangMap[locale] || locale;
      return `<xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`;
    })
    .join('\n    ') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${ensureTrailingSlash(`${BASE_URL}/en${path}`)}" />`;
};

// Generate hreflang links for dynamic content (only include languages that actually exist)
const generateDynamicHreflangLinks = (
  contentType: 'blog' | 'success-stories',
  currentLang: string,
  currentSlug: string,
  alternates: Array<{ lang: string; slug: string }>
): string => {
  // Start with current page
  const allVersions = [
    { lang: currentLang, slug: currentSlug },
    ...alternates,
  ];

  return allVersions
    .map(v => {
      const href = ensureTrailingSlash(`${BASE_URL}/${v.lang}/${contentType}/${v.slug}`);
      const hreflang = localeHreflangMap[v.lang] || v.lang;
      return `<xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`;
    })
    .join('\n    ') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${ensureTrailingSlash(`${BASE_URL}/en/${contentType}/${allVersions.find(v => v.lang === 'en')?.slug || currentSlug}`)}" />`;
};

interface ContentItem {
  id: string;
  slug: string;
  lang: string;
  group_id: string | null;
  updated_at: string | null;
  published_at: string | null;
}

// Build a map of group_id -> array of {lang, slug} for alternate versions
const buildAlternatesMap = (items: ContentItem[]): Map<string, Array<{ lang: string; slug: string }>> => {
  const groupMap = new Map<string, Array<{ lang: string; slug: string }>>();
  
  for (const item of items) {
    if (!item.group_id) continue;
    if (!groupMap.has(item.group_id)) {
      groupMap.set(item.group_id, []);
    }
    groupMap.get(item.group_id)!.push({ lang: item.lang, slug: item.slug });
  }
  
  return groupMap;
};

serve(async (req) => {
  try {
    console.log('Generating sitemap...');
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch all published stories with group_id
    const { data: stories, error: storiesError } = await supabase
      .from('stories')
      .select('id, slug, lang, group_id, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (storiesError) {
      console.error('Error fetching stories:', storiesError);
    }

    // Fetch all published posts with group_id
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('id, slug, lang, group_id, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (postsError) {
      console.error('Error fetching posts:', postsError);
    }

    const today = new Date().toISOString().split('T')[0];

    // Build alternate version maps
    const postAlternates = buildAlternatesMap((posts as ContentItem[]) || []);
    const storyAlternates = buildAlternatesMap((stories as ContentItem[]) || []);

    let urlEntries = '';

    // Static pages - all locales, shared paths
    for (const page of staticPages) {
      for (const locale of locales) {
        const fullPath = ensureTrailingSlash(`${BASE_URL}/${locale}${page.path}`);
        const lastmod = page.lastmod || today;
        
        urlEntries += `
  <url>
    <loc>${fullPath}</loc>
    ${generateStaticHreflangLinks(page.path)}
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
      }
    }

    // Blog Posts - only hreflang to existing alternate versions
    if (posts && posts.length > 0) {
      for (const post of posts) {
        const fullPath = ensureTrailingSlash(`${BASE_URL}/${post.lang}/blog/${post.slug}`);
        const lastmod = post.updated_at?.split('T')[0] || post.published_at?.split('T')[0] || today;
        
        // Find alternates via group_id
        let alternates: Array<{ lang: string; slug: string }> = [];
        if (post.group_id && postAlternates.has(post.group_id)) {
          alternates = postAlternates.get(post.group_id)!
            .filter(a => a.lang !== post.lang); // exclude self
        }
        
        const hreflangLinks = generateDynamicHreflangLinks('blog', post.lang, post.slug, alternates);
        
        urlEntries += `
  <url>
    <loc>${fullPath}</loc>
    ${hreflangLinks}
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      }
    }

    // Success Stories - only hreflang to existing alternate versions
    if (stories && stories.length > 0) {
      for (const story of stories) {
        const fullPath = ensureTrailingSlash(`${BASE_URL}/${story.lang}/success-stories/${story.slug}`);
        const lastmod = story.updated_at?.split('T')[0] || story.published_at?.split('T')[0] || today;
        
        // Find alternates via group_id
        let alternates: Array<{ lang: string; slug: string }> = [];
        if (story.group_id && storyAlternates.has(story.group_id)) {
          alternates = storyAlternates.get(story.group_id)!
            .filter(a => a.lang !== story.lang);
        }
        
        const hreflangLinks = generateDynamicHreflangLinks('success-stories', story.lang, story.slug, alternates);
        
        urlEntries += `
  <url>
    <loc>${fullPath}</loc>
    ${hreflangLinks}
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
      }
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">${urlEntries}
</urlset>`;

    console.log(`Sitemap generated: ${staticPages.length * locales.length} static + ${posts?.length || 0} posts + ${stories?.length || 0} stories`);

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
