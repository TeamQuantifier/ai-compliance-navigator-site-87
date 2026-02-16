// Prerender post for SEO bots - deployed v2
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ensureTrailingSlash = (url: string): string => {
  if (url.endsWith('/')) return url;
  return url + '/';
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const localeHreflangMap: Record<string, string> = { en: 'en', pl: 'pl-PL', cs: 'cs-CZ' };
const localeToOg: Record<string, string> = { en: 'en_US', pl: 'pl_PL', cs: 'cs_CZ' };
const localeToDateLocale: Record<string, string> = { en: 'en-US', pl: 'pl-PL', cs: 'cs-CZ' };

function richTextToHtml(content: Record<string, unknown> | null): string {
  if (!content || !Array.isArray((content as Record<string, unknown>).content)) return '';
  const nodes = (content as Record<string, unknown>).content as Array<Record<string, unknown>>;
  return nodes.map((node) => {
    const type = node.type as string;
    const attrs = (node.attrs || {}) as Record<string, unknown>;
    const children = (node.content || []) as Array<Record<string, unknown>>;
    const inlineText = (items: Array<Record<string, unknown>>): string =>
      items.map((c) => {
        let t = (c.text as string) || '';
        const marks = (c.marks || []) as Array<Record<string, unknown>>;
        for (const mark of marks) {
          const mt = mark.type as string;
          if (mt === 'bold') t = '<strong>' + t + '</strong>';
          if (mt === 'italic') t = '<em>' + t + '</em>';
          if (mt === 'link') {
            const a = (mark.attrs || {}) as Record<string, string>;
            t = '<a href="' + (a.href || '#') + '">' + t + '</a>';
          }
        }
        return t;
      }).join('');
    switch (type) {
      case 'paragraph': return '<p>' + inlineText(children) + '</p>';
      case 'heading': { const l = (attrs.level as number) || 2; const t = children.map((c) => (c.text as string) || '').join(''); return '<h' + l + '>' + t + '</h' + l + '>'; }
      case 'bulletList': return '<ul>' + children.map((li) => '<li>' + ((li.content || []) as Array<Record<string, unknown>>).map((p) => ((p.content || []) as Array<Record<string, unknown>>).map((c) => (c.text as string) || '').join('')).join('') + '</li>').join('') + '</ul>';
      case 'orderedList': return '<ol>' + children.map((li) => '<li>' + ((li.content || []) as Array<Record<string, unknown>>).map((p) => ((p.content || []) as Array<Record<string, unknown>>).map((c) => (c.text as string) || '').join('')).join('') + '</li>').join('') + '</ol>';
      case 'image': return '<img src="' + ((attrs.src as string) || '') + '" alt="' + ((attrs.alt as string) || '') + '" />';
      case 'blockquote': return '<blockquote>' + children.map((p) => ((p.content || []) as Array<Record<string, unknown>>).map((c) => (c.text as string) || '').join('')).join('') + '</blockquote>';
      default: return '';
    }
  }).join('\n');
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    const url = new URL(req.url);
    const locale = url.searchParams.get('locale') || 'en';
    const slug = url.searchParams.get('slug');
    if (!slug) return new Response('Missing slug parameter', { status: 400, headers: corsHeaders });
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: post, error } = await supabase.from('posts').select('*, category:categories(name)').eq('slug', slug).eq('lang', locale).eq('status', 'published').single();
    if (error || !post) return new Response('Post not found', { status: 404, headers: corsHeaders });
    const alternateVersions: Array<{ locale: string; slug: string }> = [];
    if (post.group_id) {
      const { data: gp } = await supabase.from('posts').select('slug, lang').eq('group_id', post.group_id).eq('status', 'published').neq('id', post.id);
      if (gp) for (const g of gp) alternateVersions.push({ locale: g.lang, slug: g.slug });
    }
    const canonicalUrl = ensureTrailingSlash('https://quantifier.ai/' + locale + '/blog/' + post.slug);
    const imageUrl = post.og_image_url || post.featured_image_url || 'https://quantifier.ai/lovable-uploads/154104eb-8338-4e4f-884c-2343169fc09b.png';
    const title = post.meta_title || post.title;
    const description = post.meta_desc || post.excerpt || '';
    const selfHl = localeHreflangMap[locale] || locale;
    let hreflang = '<link rel="alternate" hreflang="' + selfHl + '" href="' + canonicalUrl + '">\n';
    for (const alt of alternateVersions) { const hl = localeHreflangMap[alt.locale] || alt.locale; hreflang += '  <link rel="alternate" hreflang="' + hl + '" href="' + ensureTrailingSlash('https://quantifier.ai/' + alt.locale + '/blog/' + alt.slug) + '">\n'; }
    const enV = locale === 'en' ? canonicalUrl : (alternateVersions.find((a) => a.locale === 'en') ? ensureTrailingSlash('https://quantifier.ai/en/blog/' + alternateVersions.find((a) => a.locale === 'en')!.slug) : canonicalUrl);
    hreflang += '  <link rel="alternate" hreflang="x-default" href="' + enV + '">';
    const ogLocale = localeToOg[locale] || 'en_US';
    const ogAlt = alternateVersions.map((a) => localeToOg[a.locale]).filter(Boolean).map((o) => '<meta property="og:locale:alternate" content="' + o + '">').join('\n  ');
    const bodyHtml = richTextToHtml(post.body_rich as Record<string, unknown>);
    const tags = (post.tags || []) as string[];
    const dateStr = post.published_at || post.created_at;
    const dateFmt = new Date(dateStr).toLocaleDateString(localeToDateLocale[locale] || 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const catName = (post.category as Record<string, string> | null)?.name || '';
    const jsonLd = JSON.stringify({"@context":"https://schema.org","@type":"BlogPosting","headline":post.title,"description":description,"image":imageUrl,"datePublished":dateStr,"dateModified":post.updated_at,"author":{"@type":"Organization","name":"Quantifier.ai","url":"https://quantifier.ai"},"publisher":{"@type":"Organization","name":"Quantifier.ai","logo":{"@type":"ImageObject","url":"https://quantifier.ai/logo-quantifier.png"}},"mainEntityOfPage":{"@type":"WebPage","@id":canonicalUrl},"inLanguage":localeToDateLocale[locale]||'en-US',"keywords":tags.join(', '),"articleSection":catName||'Blog'});
    const html = '<!DOCTYPE html>\n<html lang="' + locale + '">\n<head>\n<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="robots" content="index,follow">\n<title>' + title + ' | Quantifier.ai Blog</title>\n<meta name="description" content="' + description + '">\n<link rel="canonical" href="' + canonicalUrl + '">\n' + hreflang + '\n<meta property="og:title" content="' + title + '"><meta property="og:description" content="' + description + '"><meta property="og:type" content="article"><meta property="og:url" content="' + canonicalUrl + '"><meta property="og:image" content="' + imageUrl + '"><meta property="og:locale" content="' + ogLocale + '">\n' + ogAlt + '\n<meta property="og:site_name" content="Quantifier.ai"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="' + title + '"><meta name="twitter:description" content="' + description + '"><meta name="twitter:image" content="' + imageUrl + '">\n<meta property="article:published_time" content="' + dateStr + '"><meta property="article:modified_time" content="' + post.updated_at + '">\n' + tags.map((t: string) => '<meta property="article:tag" content="' + t + '">').join('\n') + '\n<script type="application/ld+json">' + jsonLd + '</script>\n<style>body{font-family:system-ui,-apple-system,sans-serif;line-height:1.6;max-width:800px;margin:0 auto;padding:20px}h1{font-size:2rem;margin-bottom:1rem}.meta{color:#666;margin-bottom:2rem}.category{display:inline-block;background:#e0f2f1;color:#00796b;padding:4px 12px;border-radius:4px;font-size:.875rem;margin-bottom:1rem}.excerpt{background:#f5f5f5;padding:1rem;border-left:4px solid #4CAF50;margin-bottom:2rem;font-style:italic}img{max-width:100%;height:auto;border-radius:8px}.tags{margin-top:2rem}.tags span{display:inline-block;background:#e0e0e0;padding:4px 12px;border-radius:4px;margin-right:8px;font-size:.875rem}</style>\n</head>\n<body>\n<article>\n<header>\n' + (catName ? '<span class="category">' + catName + '</span>\n' : '') + '<h1>' + post.title + '</h1>\n<div class="meta"><time datetime="' + dateStr + '">' + dateFmt + '</time></div>\n</header>\n' + (imageUrl ? '<img src="' + imageUrl + '" alt="' + (post.featured_image_alt || post.title) + '" />\n' : '') + (post.excerpt ? '<div class="excerpt"><p>' + post.excerpt + '</p></div>\n' : '') + '<main>' + bodyHtml + '</main>\n' + (tags.length > 0 ? '<footer class="tags"><strong>Tags:</strong>' + tags.map((t: string) => '<span>' + t + '</span>').join('') + '</footer>\n' : '') + '</article>\n<script>if(typeof window!=="undefined"&&!navigator.userAgent.match(/bot|crawl|spider|slurp|facebook|twitter|linkedin|whatsapp/i)){window.location.href="/' + locale + '/blog/' + post.slug + '";}</script>\n</body>\n</html>';
    return new Response(html, { status: 200, headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=86400' } });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Error in prerender-post:', msg);
    return new Response('Error: ' + msg, { status: 500, headers: corsHeaders });
  }
});
