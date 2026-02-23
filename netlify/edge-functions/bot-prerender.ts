// Netlify Edge Function: Bot detection + proxy to Supabase prerender functions
// Mirrors the vercel.json rewrites for bot user-agents

const BOT_UA_REGEX = /bot|crawl|spider|slurp|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Discordbot|Telegrambot|Googlebot|Bingbot|Slackbot|Pinterest|Embedly|Quora|OutBrain|vkShare/i;

const SUPABASE_FUNCTIONS_BASE = 'https://zcrnfrijqasbrjrxconi.supabase.co/functions/v1';

// Static page slug → prerender-marketing ?page= value
const STATIC_ROUTES: Record<string, string> = {
  '': 'index',
  'frameworks': 'frameworks',
  'frameworks/soc': 'soc2-automation',
  'frameworks/iso-27001': 'iso27001',
  'frameworks/gdpr': 'gdpr-compliance',
  'frameworks/nis-ii': 'nis2',
  'frameworks/dora': 'dora',
  'frameworks/iso-9001': 'iso-9001',
  'frameworks/hipaa': 'hipaa',
  'frameworks/ccpa': 'ccpa',
  'frameworks/esg': 'esg',
  'frameworks/environmental': 'environmental',
  'frameworks/governance': 'governance',
  'frameworks/product-level': 'product-level',
  'grc-platform': 'grc-platform',
  'product': 'product-features',
  'product/features': 'product-features',
  'product/overview': 'product-overview',
  'product/ai-compliance-officer': 'compliance-officer',
  'product/task-data-management': 'task-data-management',
  'product/documents-management': 'documents-management',
  'product/value-chain': 'value-chain',
  'product/risk-assessment': 'risk-assessment',
  'product/analytics-dashboards': 'analytics-dashboards',
  'product/api-integrations': 'api-integrations',
  'plans': 'plans',
  'about': 'about',
  'contact': 'contact',
  'partners': 'partners',
  'by-roles': 'by-roles',
  'by-roles/managers': 'by-roles-managers',
  'by-roles/contributors': 'by-roles-contributors',
  'by-roles/auditor': 'by-roles-auditor',
  'blog': 'blog',
  'success-stories': 'success-stories',
  'legal/privacy': 'legal-privacy',
  'legal/terms': 'legal-terms',
  'legal/cookies': 'legal-cookies',
  'cybersecurity-check': 'cybersecurity-check',
  'sprawdz-cyberbezpieczenstwo': 'cybersecurity-check',
};

// Human-readable titles for fallback HTML
const ROUTE_TITLES: Record<string, Record<string, string>> = {
  en: {
    '': 'Quantifier.ai - AI-Powered GRC Platform',
    'blog': 'Blog | Quantifier.ai',
    'success-stories': 'Success Stories | Quantifier.ai',
    'frameworks': 'Compliance Frameworks | Quantifier.ai',
    'plans': 'Pricing Plans | Quantifier.ai',
    'about': 'About Us | Quantifier.ai',
    'contact': 'Contact | Quantifier.ai',
    'partners': 'Partners | Quantifier.ai',
  },
  pl: {
    '': 'Quantifier.ai - Platforma GRC oparta na AI',
    'blog': 'Blog | Quantifier.ai',
    'success-stories': 'Historie Sukcesu | Quantifier.ai',
    'frameworks': 'Ramy Zgodności | Quantifier.ai',
    'plans': 'Cennik | Quantifier.ai',
    'about': 'O Nas | Quantifier.ai',
    'contact': 'Kontakt | Quantifier.ai',
    'partners': 'Partnerzy | Quantifier.ai',
  },
  cs: {
    '': 'Quantifier.ai - GRC platforma poháněná AI',
    'blog': 'Blog | Quantifier.ai',
    'success-stories': 'Příběhy úspěchu | Quantifier.ai',
    'frameworks': 'Rámce shody | Quantifier.ai',
    'plans': 'Ceník | Quantifier.ai',
    'about': 'O nás | Quantifier.ai',
    'contact': 'Kontakt | Quantifier.ai',
    'partners': 'Partneři | Quantifier.ai',
  },
};

function getFallbackTitle(locale: string, rest: string): string {
  const titles = ROUTE_TITLES[locale] || ROUTE_TITLES['en'];
  // Try exact match first, then first segment, then generic
  if (titles[rest]) return titles[rest];
  const firstSegment = rest.split('/')[0];
  if (titles[firstSegment]) return titles[firstSegment];
  return `Quantifier.ai`;
}

function buildFallbackHtml(locale: string, rest: string, canonicalUrl: string): string {
  const title = getFallbackTitle(locale, rest);
  const description = locale === 'pl'
    ? 'Kompleksowe GRC w jednej platformie AI. Automatyzuj ISO 27001, SOC 2, GDPR, NIS2.'
    : locale === 'cs'
    ? 'Komplexní GRC v jedné AI platformě. Automatizujte ISO 27001, SOC 2, GDPR, NIS2.'
    : 'End-to-end GRC in one AI-native platform. Automate ISO 27001, SOC 2, GDPR, NIS2 compliance.';

  const localeHreflangMap: Record<string, string> = { en: 'en', pl: 'pl-PL', cs: 'cs-CZ' };
  const hreflang = localeHreflangMap[locale] || locale;
  const allLocales = ['en', 'pl', 'cs'];
  const hreflangTags = allLocales.map(l => {
    const hl = localeHreflangMap[l] || l;
    const href = `https://quantifier.ai/${l}/${rest}${rest ? '/' : ''}`;
    return `<link rel="alternate" hreflang="${hl}" href="${href}">`;
  }).join('\n  ');

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonicalUrl}">
  ${hreflangTags}
  <link rel="alternate" hreflang="x-default" href="https://quantifier.ai/en/${rest}${rest ? '/' : ''}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://quantifier.ai/og-homepage.png">
  <meta property="og:site_name" content="Quantifier.ai">
  <style>body{font-family:system-ui,sans-serif;max-width:800px;margin:0 auto;padding:2rem;text-align:center}h1{font-size:2rem;margin-bottom:1rem}p{color:#666}</style>
</head>
<body>
  <h1>${title}</h1>
  <p>${description}</p>
  <p><a href="${canonicalUrl}">Visit ${title}</a></p>
  <script>
    if(typeof window!=="undefined"&&!navigator.userAgent.match(/bot|crawl|spider|slurp|facebook|twitter|linkedin|whatsapp/i)){
      window.location.href="/${locale}/${rest}${rest ? '/' : ''}";
    }
  </script>
</body>
</html>`;
}

async function proxyToPrerender(url: string, ua: string, locale: string, rest: string): Promise<Response> {
  const canonicalUrl = `https://quantifier.ai/${locale}/${rest}${rest ? '/' : ''}`;

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': ua },
    });

    if (response.ok) {
      const body = await response.text();
      return new Response(body, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=86400',
          'X-Robots-Tag': 'index, follow',
          'Content-Security-Policy': "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'",
          'X-Content-Type-Options': 'nosniff',
        },
      });
    }

    // Supabase returned non-OK (404, 500, etc.) — serve fallback
    console.log(`[bot-prerender] Supabase returned ${response.status} for ${url}, serving fallback`);
  } catch (e) {
    // Network error — serve fallback
    console.error(`[bot-prerender] Fetch error for ${url}:`, e);
  }

  // Fallback: return minimal SEO-friendly HTML with 200 status
  return new Response(buildFallbackHtml(locale, rest, canonicalUrl), {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=600',
      'X-Robots-Tag': 'index, follow',
      'Content-Security-Policy': "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'",
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export default async function handler(request: Request) {
  const ua = request.headers.get('user-agent') || '';

  // Only intercept bot requests
  if (!BOT_UA_REGEX.test(ua)) {
    return; // undefined = pass through to origin (SPA)
  }

  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/+$/, ''); // strip trailing slash

  // Extract locale and rest of path: /:locale/rest...
  const match = pathname.match(/^\/(en|pl|cs)(?:\/(.*))?$/);
  if (!match) {
    return; // not a localized path, pass through
  }

  const locale = match[1];
  const rest = (match[2] || '').replace(/\/+$/, ''); // rest of path without trailing slash

  // 1. Check dynamic routes: blog posts and success stories with slugs
  const blogPostMatch = rest.match(/^blog\/(.+)$/);
  if (blogPostMatch) {
    const slug = blogPostMatch[1];
    const prerenderUrl = `${SUPABASE_FUNCTIONS_BASE}/prerender-post?locale=${locale}&slug=${encodeURIComponent(slug)}`;
    return proxyToPrerender(prerenderUrl, ua, locale, rest);
  }

  const storyMatch = rest.match(/^success-stories\/(.+)$/);
  if (storyMatch) {
    const slug = storyMatch[1];
    const prerenderUrl = `${SUPABASE_FUNCTIONS_BASE}/prerender-story?locale=${locale}&slug=${encodeURIComponent(slug)}`;
    return proxyToPrerender(prerenderUrl, ua, locale, rest);
  }

  // 2. Check static routes
  const pageSlug = STATIC_ROUTES[rest];
  if (pageSlug !== undefined) {
    const prerenderUrl = `${SUPABASE_FUNCTIONS_BASE}/prerender-marketing?locale=${locale}&page=${pageSlug}`;
    return proxyToPrerender(prerenderUrl, ua, locale, rest);
  }

  // No match — pass through to SPA
  return;
}
