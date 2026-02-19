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

async function proxyToPrerender(url: string, ua: string): Promise<Response> {
  const response = await fetch(url, {
    headers: { 'User-Agent': ua },
  });

  if (!response.ok) {
    return response;
  }

  const body = await response.text();

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'X-Robots-Tag': 'index, follow',
      // Explicitly override Supabase CSP which adds 'sandbox' — that blocks Googlebot indexing
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
    return proxyToPrerender(prerenderUrl, ua);
  }

  const storyMatch = rest.match(/^success-stories\/(.+)$/);
  if (storyMatch) {
    const slug = storyMatch[1];
    const prerenderUrl = `${SUPABASE_FUNCTIONS_BASE}/prerender-story?locale=${locale}&slug=${encodeURIComponent(slug)}`;
    return proxyToPrerender(prerenderUrl, ua);
  }

  // 2. Check static routes
  const pageSlug = STATIC_ROUTES[rest];
  if (pageSlug !== undefined) {
    const prerenderUrl = `${SUPABASE_FUNCTIONS_BASE}/prerender-marketing?locale=${locale}&page=${pageSlug}`;
    return proxyToPrerender(prerenderUrl, ua);
  }

  // No match — pass through to SPA
  return;
}
