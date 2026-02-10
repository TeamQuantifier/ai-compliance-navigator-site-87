import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Ensure URL ends with trailing slash
const ensureTrailingSlash = (url: string): string => {
  if (url.endsWith('/')) return url;
  return url + '/';
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Hreflang map for regional targeting
const localeHreflangMap: Record<string, string> = {
  en: 'en',
  pl: 'pl-PL',
  cs: 'cs-CZ',
};

const localeToOg: Record<string, string> = {
  en: 'en_US',
  pl: 'pl_PL',
  cs: 'cs_CZ',
};

const localeToDateLocale: Record<string, string> = {
  en: 'en-US',
  pl: 'pl-PL',
  cs: 'cs-CZ',
};

// Convert TipTap JSON to HTML
function richTextToHtml(content: any): string {
  if (!content || !content.content) return '';
  
  return content.content.map((node: any) => {
    switch (node.type) {
      case 'paragraph':
        const text = node.content?.map((c: any) => {
          let t = c.text || '';
          if (c.marks) {
            c.marks.forEach((mark: any) => {
              if (mark.type === 'bold') t = `<strong>${t}</strong>`;
              if (mark.type === 'italic') t = `<em>${t}</em>`;
              if (mark.type === 'link') t = `<a href="${mark.attrs?.href || '#'}">${t}</a>`;
            });
          }
          return t;
        }).join('') || '';
        return `<p>${text}</p>`;
      case 'heading':
        const level = node.attrs?.level || 2;
        const headingText = node.content?.map((c: any) => c.text || '').join('') || '';
        return `<h${level}>${headingText}</h${level}>`;
      case 'bulletList':
        const listItems = node.content?.map((li: any) => {
          const liText = li.content?.map((p: any) => 
            p.content?.map((c: any) => c.text || '').join('') || ''
          ).join('') || '';
          return `<li>${liText}</li>`;
        }).join('') || '';
        return `<ul>${listItems}</ul>`;
      case 'orderedList':
        const orderedItems = node.content?.map((li: any) => {
          const liText = li.content?.map((p: any) => 
            p.content?.map((c: any) => c.text || '').join('') || ''
          ).join('') || '';
          return `<li>${liText}</li>`;
        }).join('') || '';
        return `<ol>${orderedItems}</ol>`;
      case 'image':
        return `<img src="${node.attrs?.src || ''}" alt="${node.attrs?.alt || ''}" />`;
      case 'blockquote':
        const quoteText = node.content?.map((p: any) => 
          p.content?.map((c: any) => c.text || '').join('') || ''
        ).join('') || '';
        return `<blockquote>${quoteText}</blockquote>`;
      default:
        return '';
    }
  }).join('\n');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const locale = url.searchParams.get('locale') || 'en';
    const slug = url.searchParams.get('slug');

    if (!slug) {
      return new Response('Missing slug parameter', { status: 400, headers: corsHeaders });
    }

    console.log(`Prerendering post: locale=${locale}, slug=${slug}`);

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch the post with category
    const { data: post, error } = await supabase
      .from('posts')
      .select(`
        *,
        category:categories(name)
      `)
      .eq('slug', slug)
      .eq('lang', locale)
      .eq('status', 'published')
      .single();

    if (error || !post) {
      console.error('Post not found:', error);
      return new Response('Post not found', { status: 404, headers: corsHeaders });
    }

    // Fetch all alternate language versions via group_id
    const alternateVersions: { locale: string; slug: string }[] = [];

    if (post.group_id) {
      const { data: groupPosts } = await supabase
        .from('posts')
        .select('slug, lang')
        .eq('group_id', post.group_id)
        .eq('status', 'published')
        .neq('id', post.id);
      
      if (groupPosts) {
        for (const gp of groupPosts) {
          alternateVersions.push({ locale: gp.lang, slug: gp.slug });
        }
      }
    } else {
      // Fallback: check alternates table
      const { data: alternates } = await supabase
        .from('alternates')
        .select('alternate_id, alternate_lang')
        .eq('primary_id', post.id)
        .eq('content_type', 'post');

      if (alternates) {
        for (const alt of alternates) {
          const { data: altPost } = await supabase
            .from('posts')
            .select('slug')
            .eq('id', alt.alternate_id)
            .single();
          if (altPost) {
            alternateVersions.push({ locale: alt.alternate_lang, slug: altPost.slug });
          }
        }
      }

      // Also check reverse direction
      const { data: reverseAlternates } = await supabase
        .from('alternates')
        .select('primary_id, primary_lang')
        .eq('alternate_id', post.id)
        .eq('content_type', 'post');

      if (reverseAlternates) {
        for (const alt of reverseAlternates) {
          const { data: altPost } = await supabase
            .from('posts')
            .select('slug')
            .eq('id', alt.primary_id)
            .single();
          if (altPost) {
            alternateVersions.push({ locale: alt.primary_lang, slug: altPost.slug });
          }
        }
      }
    }

    const canonicalUrl = ensureTrailingSlash(`https://quantifier.ai/${locale}/blog/${post.slug}`);
    const imageUrl = post.og_image_url || post.featured_image_url || 'https://quantifier.ai/lovable-uploads/154104eb-8338-4e4f-884c-2343169fc09b.png';

    // Generate hreflang tags
    const hreflangTags: string[] = [];
    
    // Self-referencing hreflang
    const selfHreflang = localeHreflangMap[locale] || locale;
    hreflangTags.push(`<link rel="alternate" hreflang="${selfHreflang}" href="${canonicalUrl}">`);
    
    // Alternate versions
    for (const alt of alternateVersions) {
      const hreflang = localeHreflangMap[alt.locale] || alt.locale;
      hreflangTags.push(`<link rel="alternate" hreflang="${hreflang}" href="https://quantifier.ai/${alt.locale}/blog/${alt.slug}">`);
    }
    
    // x-default (English version)
    const enVersion = locale === 'en' 
      ? canonicalUrl 
      : alternateVersions.find(a => a.locale === 'en')
        ? `https://quantifier.ai/en/blog/${alternateVersions.find(a => a.locale === 'en')!.slug}`
        : canonicalUrl;
    hreflangTags.push(`<link rel="alternate" hreflang="x-default" href="${enVersion}">`);

    // OG locale alternates
    const currentOgLocale = localeToOg[locale] || 'en_US';
    const ogAlternateLocales = alternateVersions
      .map(alt => localeToOg[alt.locale])
      .filter(Boolean)
      .map(ogLocale => `<meta property="og:locale:alternate" content="${ogLocale}">`)
      .join('\n  ');

    // Convert rich text to HTML
    const bodyHtml = richTextToHtml(post.body_rich);

    // JSON-LD structured data
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.meta_desc || post.excerpt || '',
      "image": imageUrl,
      "datePublished": post.published_at || post.created_at,
      "dateModified": post.updated_at,
      "author": {
        "@type": "Organization",
        "name": "Quantifier.ai",
        "url": "https://quantifier.ai"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Quantifier.ai",
        "logo": {
          "@type": "ImageObject",
          "url": "https://quantifier.ai/logo-quantifier.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "inLanguage": localeToDateLocale[locale] || 'en-US',
      "keywords": post.tags?.join(', ') || '',
      "articleSection": post.category?.name || 'Blog'
    };

    const html = `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow">
  <title>${post.meta_title || post.title} | Quantifier.ai Blog</title>
  <meta name="description" content="${post.meta_desc || post.excerpt || ''}">
  
  <!-- Canonical and hreflang -->
  <link rel="canonical" href="${canonicalUrl}">
  ${hreflangTags.join('\n  ')}
  
  <!-- Open Graph -->
  <meta property="og:title" content="${post.meta_title || post.title}">
  <meta property="og:description" content="${post.meta_desc || post.excerpt || ''}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:locale" content="${currentOgLocale}">
  ${ogAlternateLocales}
  <meta property="og:site_name" content="Quantifier.ai">
  
  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${post.meta_title || post.title}">
  <meta name="twitter:description" content="${post.meta_desc || post.excerpt || ''}">
  <meta name="twitter:image" content="${imageUrl}">
  
  <!-- Article metadata -->
  <meta property="article:published_time" content="${post.published_at || post.created_at}">
  <meta property="article:modified_time" content="${post.updated_at}">
  ${post.tags?.map((tag: string) => `<meta property="article:tag" content="${tag}">`).join('\n  ') || ''}
  
  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { font-size: 2rem; margin-bottom: 1rem; }
    .meta { color: #666; margin-bottom: 2rem; }
    .category { display: inline-block; background: #e0f2f1; color: #00796b; padding: 4px 12px; border-radius: 4px; font-size: 0.875rem; margin-bottom: 1rem; }
    .excerpt { background: #f5f5f5; padding: 1rem; border-left: 4px solid #4CAF50; margin-bottom: 2rem; font-style: italic; }
    img { max-width: 100%; height: auto; border-radius: 8px; }
    .tags { margin-top: 2rem; }
    .tags span { display: inline-block; background: #e0e0e0; padding: 4px 12px; border-radius: 4px; margin-right: 8px; font-size: 0.875rem; }
  </style>
</head>
<body>
  <article>
    <header>
      ${post.category?.name ? `<span class="category">${post.category.name}</span>` : ''}
      <h1>${post.title}</h1>
      <div class="meta">
        <time datetime="${post.published_at || post.created_at}">
          ${new Date(post.published_at || post.created_at).toLocaleDateString(localeToDateLocale[locale] || 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
      </div>
    </header>
    
    ${imageUrl ? `<img src="${imageUrl}" alt="${post.featured_image_alt || post.title}" />` : ''}
    
    ${post.excerpt ? `<div class="excerpt"><p>${post.excerpt}</p></div>` : ''}
    
    <main>${bodyHtml}</main>
    
    ${post.tags?.length ? `
    <footer class="tags">
      <strong>Tags:</strong>
      ${post.tags.map((tag: string) => `<span>${tag}</span>`).join('')}
    </footer>
    ` : ''}
  </article>
  
  <!-- Redirect to SPA for JavaScript-enabled browsers -->
  <script>
    if (typeof window !== 'undefined' && !navigator.userAgent.match(/bot|crawl|spider|slurp|facebook|twitter|linkedin|whatsapp/i)) {
      window.location.href = '/${locale}/blog/${post.slug}';
    }
  </script>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  } catch (error) {
    console.error('Error in prerender-post:', error);
    return new Response(`Error: ${error.message}`, { 
      status: 500, 
      headers: corsHeaders 
    });
  }
});