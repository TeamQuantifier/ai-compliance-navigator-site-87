// Prerender story for SEO bots - deployed v3
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

    console.log(`Prerendering story: locale=${locale}, slug=${slug}`);

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch the story
    const { data: story, error } = await supabase
      .from('stories')
      .select('*')
      .eq('slug', slug)
      .eq('lang', locale)
      .eq('status', 'published')
      .single();

    if (error || !story) {
      console.error('Story not found:', error);
      return new Response('Story not found', { status: 404, headers: corsHeaders });
    }

    // Fetch all alternate language versions via group_id
    const alternateVersions: { locale: string; slug: string }[] = [];

    if (story.group_id) {
      const { data: groupStories } = await supabase
        .from('stories')
        .select('slug, lang')
        .eq('group_id', story.group_id)
        .eq('status', 'published')
        .neq('id', story.id);
      
      if (groupStories) {
        for (const gs of groupStories) {
          alternateVersions.push({ locale: gs.lang, slug: gs.slug });
        }
      }
    } else {
      // Fallback: check alternates table
      const { data: alternates } = await supabase
        .from('alternates')
        .select('alternate_id, alternate_lang')
        .eq('primary_id', story.id)
        .eq('content_type', 'story');

      if (alternates) {
        for (const alt of alternates) {
          const { data: altStory } = await supabase
            .from('stories')
            .select('slug')
            .eq('id', alt.alternate_id)
            .single();
          if (altStory) {
            alternateVersions.push({ locale: alt.alternate_lang, slug: altStory.slug });
          }
        }
      }

      const { data: reverseAlternates } = await supabase
        .from('alternates')
        .select('primary_id, primary_lang')
        .eq('alternate_id', story.id)
        .eq('content_type', 'story');

      if (reverseAlternates) {
        for (const alt of reverseAlternates) {
          const { data: altStory } = await supabase
            .from('stories')
            .select('slug')
            .eq('id', alt.primary_id)
            .single();
          if (altStory) {
            alternateVersions.push({ locale: alt.primary_lang, slug: altStory.slug });
          }
        }
      }
    }

    const canonicalUrl = ensureTrailingSlash(`https://quantifier.ai/${locale}/success-stories/${story.slug}`);
    const imageUrl = story.og_image_url || story.featured_image_url || 'https://quantifier.ai/og-homepage.png';

    // Generate hreflang tags
    const hreflangTags: string[] = [];
    
    const selfHreflang = localeHreflangMap[locale] || locale;
    hreflangTags.push(`<link rel="alternate" hreflang="${selfHreflang}" href="${canonicalUrl}">`);
    
    for (const alt of alternateVersions) {
      const hreflang = localeHreflangMap[alt.locale] || alt.locale;
      hreflangTags.push(`<link rel="alternate" hreflang="${hreflang}" href="${ensureTrailingSlash(`https://quantifier.ai/${alt.locale}/success-stories/${alt.slug}`)}">`);
    }
    
    const enVersion = locale === 'en' 
      ? canonicalUrl 
      : alternateVersions.find(a => a.locale === 'en')
        ? ensureTrailingSlash(`https://quantifier.ai/en/success-stories/${alternateVersions.find(a => a.locale === 'en')!.slug}`)
        : canonicalUrl;
    hreflangTags.push(`<link rel="alternate" hreflang="x-default" href="${enVersion}">`);

    const currentOgLocale = localeToOg[locale] || 'en_US';
    const ogAlternateLocales = alternateVersions
      .map(alt => localeToOg[alt.locale])
      .filter(Boolean)
      .map(ogLocale => `<meta property="og:locale:alternate" content="${ogLocale}">`)
      .join('\n  ');

    // Parse KPIs
    const kpis = Array.isArray(story.results_kpis) ? story.results_kpis : [];
    const kpiLabel = locale === 'pl' ? 'Kluczowe rezultaty' : (locale === 'cs' ? 'Klíčové výsledky' : 'Key Results');
    const kpisHtml = kpis.length > 0 ? `
      <section class="kpis">
        <h2>${kpiLabel}</h2>
        <ul>
          ${kpis.map((kpi: any) => `<li><strong>${kpi.value}${kpi.unit || ''}</strong> - ${kpi.label}</li>`).join('')}
        </ul>
      </section>
    ` : '';

    // Convert rich text to HTML
    const bodyHtml = richTextToHtml(story.body_rich);

    // JSON-LD structured data
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": story.title,
      "description": story.meta_desc || story.summary || '',
      "image": imageUrl,
      "datePublished": story.published_at || story.created_at,
      "dateModified": story.updated_at,
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
      "keywords": story.tags?.join(', ') || '',
      "articleSection": story.industry || 'Case Study'
    };

    const clientLabel = locale === 'pl' ? 'Klient' : (locale === 'cs' ? 'Klient' : 'Client');

    const html = `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow">
  <title>${story.meta_title || story.title} | Quantifier.ai</title>
  <meta name="description" content="${story.meta_desc || story.summary || ''}">
  
  <!-- Canonical and hreflang -->
  <link rel="canonical" href="${canonicalUrl}">
  ${hreflangTags.join('\n  ')}
  
  <!-- Open Graph -->
  <meta property="og:title" content="${story.meta_title || story.title}">
  <meta property="og:description" content="${story.meta_desc || story.summary || ''}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:locale" content="${currentOgLocale}">
  ${ogAlternateLocales}
  <meta property="og:site_name" content="Quantifier.ai">
  
  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${story.meta_title || story.title}">
  <meta name="twitter:description" content="${story.meta_desc || story.summary || ''}">
  <meta name="twitter:image" content="${imageUrl}">
  
  <!-- Article metadata -->
  <meta property="article:published_time" content="${story.published_at || story.created_at}">
  <meta property="article:modified_time" content="${story.updated_at}">
  ${story.tags?.map((tag: string) => `<meta property="article:tag" content="${tag}">`).join('\n  ') || ''}
  
  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { font-size: 2rem; margin-bottom: 1rem; }
    .meta { color: #666; margin-bottom: 2rem; }
    .summary { background: #f5f5f5; padding: 1rem; border-left: 4px solid #4CAF50; margin-bottom: 2rem; }
    .kpis { background: #e8f5e9; padding: 1rem; border-radius: 8px; margin-bottom: 2rem; }
    .kpis ul { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
    .kpis li { background: white; padding: 1rem; border-radius: 4px; text-align: center; }
    img { max-width: 100%; height: auto; border-radius: 8px; }
    .tags { margin-top: 2rem; }
    .tags span { display: inline-block; background: #e0e0e0; padding: 4px 12px; border-radius: 4px; margin-right: 8px; font-size: 0.875rem; }
  </style>
</head>
<body>
  <article>
    <header>
      ${story.industry ? `<span class="industry">${story.industry}</span>` : ''}
      ${story.country ? `<span class="country">${story.country}</span>` : ''}
      <h1>${story.title}</h1>
      <div class="meta">
        ${story.client_name ? `<span>${clientLabel}: ${story.client_name}</span> | ` : ''}
        <time datetime="${story.published_at || story.created_at}">
          ${new Date(story.published_at || story.created_at).toLocaleDateString(localeToDateLocale[locale] || 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
      </div>
    </header>
    
    ${imageUrl ? `<img src="${imageUrl}" alt="${story.featured_image_alt || story.title}" />` : ''}
    
    ${story.summary ? `<div class="summary"><p>${story.summary}</p></div>` : ''}
    
    ${kpisHtml}
    
    <main>${bodyHtml}</main>
    
    ${story.tags?.length ? `
    <footer class="tags">
      <strong>Tags:</strong>
      ${story.tags.map((tag: string) => `<span>${tag}</span>`).join('')}
    </footer>
    ` : ''}
  </article>
  
  <!-- Redirect to SPA for JavaScript-enabled browsers -->
  <script>
    if (typeof window !== 'undefined' && !navigator.userAgent.match(/bot|crawl|spider|slurp|facebook|twitter|linkedin|whatsapp/i)) {
      window.location.href = '/${locale}/success-stories/${story.slug}';
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
        'X-Robots-Tag': 'index, follow',
        'Content-Security-Policy': "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'",
      },
    });
  } catch (error) {
    console.error('Error in prerender-story:', error);
    return new Response(`Error: ${error.message}`, { 
      status: 500, 
      headers: corsHeaders 
    });
  }
});