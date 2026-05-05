// Netlify Edge Function: bot-prerender
// Detects SEO/AI bots by User-Agent and proxies them to our Supabase
// prerender Edge Functions. Regular users pass through to the SPA.
//
// IMPORTANT: This replaces the disabled Netlify Prerender Extension and
// the rejected Prerender.io. Per project memory, we use ONLY our own
// Supabase Edge Functions for bot prerendering.

import type { Context } from "https://edge.netlify.com/";

const SUPABASE_FUNCTIONS_BASE =
  "https://zcrnfrijqasbrjrxconi.supabase.co/functions/v1";

// Bot user agents — comprehensive list covering search, social, and AI crawlers.
const BOT_UA_PATTERNS = [
  // Search engines
  "googlebot", "bingbot", "yandexbot", "duckduckbot", "baiduspider",
  "slurp", "applebot", "petalbot",
  // AI crawlers
  "gptbot", "chatgpt-user", "oai-searchbot", "claudebot", "claude-web",
  "anthropic-ai", "perplexitybot", "perplexity-user", "youbot",
  "ccbot", "google-extended", "amazonbot", "cohere-ai",
  "bytespider", "diffbot", "meta-externalagent",
  // Social previews
  "facebookexternalhit", "facebot", "twitterbot", "linkedinbot",
  "slackbot", "telegrambot", "discordbot", "whatsapp", "skypeuripreview",
  "pinterest", "redditbot", "vkshare",
  // SEO tools
  "ahrefsbot", "semrushbot", "mj12bot", "rogerbot", "screaming frog",
  // Generic
  "bot/", "spider", "crawler",
];

// Paths that must NEVER be intercepted (assets, API proxies, etc).
const SKIP_PATH_PATTERNS = [
  /^\/assets\//,
  /^\/static\//,
  /^\/images\//,
  /^\/icons\//,
  /^\/downloads\//,
  /^\/locales\//,
  /^\/admin(\/|$)/,
  /^\/sitemap\.xml$/,
  /^\/robots\.txt$/,
  /^\/llms(-full)?\.txt$/,
  /^\/rss(\.xml)?$/,
  /^\/favicon/,
  /^\/manifest/,
  /^\/sw\.js$/,
  /\.(js|css|png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf|otf|eot|map|json|xml|txt|pdf|mp4|webm|zip)$/i,
];

const LOCALES = ["en", "pl", "cs"];

// Reverse map: URL path (without locale, no leading/trailing slash) → marketing page slug.
// Must mirror pageUrlMap inside supabase/functions/prerender-marketing/index.ts.
const PATH_TO_PAGE: Record<string, string> = {
  "": "index",
  "frameworks": "frameworks",
  "frameworks/soc": "soc2-automation",
  "frameworks/iso-27001": "iso27001",
  "frameworks/gdpr": "gdpr-compliance",
  "frameworks/nis-2": "nis2",
  "frameworks/dora": "dora",
  "frameworks/iso-9001": "iso-9001",
  "frameworks/hipaa": "hipaa",
  "frameworks/ccpa": "ccpa",
  "frameworks/esg": "esg",
  "frameworks/environmental": "environmental",
  "frameworks/governance": "governance",
  "frameworks/product-level": "product-level",
  "grc-platform": "grc-platform",
  "product": "product-hub",
  "product/features": "product-features",
  "product/overview": "product-overview",
  "product/ai-compliance-officer": "compliance-officer",
  "product/task-data-management": "task-data-management",
  "product/analytics-dashboards": "analytics-dashboards",
  "product/documents-management": "documents-management",
  "product/value-chain": "value-chain",
  "product/risk-assessment": "risk-assessment",
  "frameworks/product-level/epd": "epd",
  "frameworks/product-level/lca-analysis": "lca-analysis",
  "events": "events",
  "plans": "plans",
  "about": "about",
  "contact": "contact",
  "partners": "partners",
  "by-roles": "by-roles",
  "by-roles/managers": "by-roles-managers",
  "by-roles/contributors": "by-roles-contributors",
  "by-roles/auditor": "by-roles-auditor",
  "blog": "blog",
  "success-stories": "success-stories",
  "legal/privacy": "legal-privacy",
  "legal/terms": "legal-terms",
  "legal/cookies": "legal-cookies",
  "cybersecurity-check": "cybersecurity-check",
  "sprawdz-cyberbezpieczenstwo": "cybersecurity-check-pl",
  "zkontrolujte-kybernetickou-bezpecnost": "cybersecurity-check",
};

function isBot(ua: string): boolean {
  const u = ua.toLowerCase();
  return BOT_UA_PATTERNS.some((p) => u.includes(p));
}

function shouldSkip(pathname: string): boolean {
  return SKIP_PATH_PATTERNS.some((re) => re.test(pathname));
}

/**
 * Map an incoming pathname to the right Supabase prerender function URL.
 * Returns null if no mapping (let SPA handle it).
 */
function resolvePrerenderUrl(pathname: string): string | null {
  // Strip trailing slash for matching.
  const path = pathname.replace(/\/+$/, "") || "/";

  // Root → marketing index EN
  if (path === "/") {
    return `${SUPABASE_FUNCTIONS_BASE}/prerender-marketing?locale=en&page=index`;
  }

  const parts = path.split("/").filter(Boolean);
  const locale = LOCALES.includes(parts[0]) ? parts[0] : "en";
  const localePath = LOCALES.includes(parts[0])
    ? parts.slice(1).join("/")
    : parts.join("/");

  // Locale root: /en, /pl, /cs
  if (!localePath) {
    return `${SUPABASE_FUNCTIONS_BASE}/prerender-marketing?locale=${locale}&page=index`;
  }

  const subParts = localePath.split("/");

  // /:locale/blog/:slug → prerender-post
  if (subParts.length === 2 && subParts[0] === "blog") {
    return `${SUPABASE_FUNCTIONS_BASE}/prerender-post?locale=${locale}&slug=${encodeURIComponent(
      subParts[1]
    )}`;
  }

  // /:locale/success-stories/:slug → prerender-story
  if (subParts.length === 2 && subParts[0] === "success-stories") {
    return `${SUPABASE_FUNCTIONS_BASE}/prerender-story?locale=${locale}&slug=${encodeURIComponent(
      subParts[1]
    )}`;
  }

  // Marketing: reverse-map URL path to known page slug.
  const pageSlug = PATH_TO_PAGE[localePath];
  if (pageSlug) {
    return `${SUPABASE_FUNCTIONS_BASE}/prerender-marketing?locale=${locale}&page=${encodeURIComponent(
      pageSlug
    )}`;
  }

  // Unknown route — let SPA handle it (avoids serving wrong/generic HTML to bots).
  return null;
}

export default async (request: Request, _context: Context) => {
  const url = new URL(request.url);

  // Only handle GET/HEAD.
  if (request.method !== "GET" && request.method !== "HEAD") return;

  // Skip non-page assets.
  if (shouldSkip(url.pathname)) return;

  const ua = request.headers.get("user-agent") || "";
  if (!isBot(ua)) return; // Pass through to SPA for humans.

  const target = resolvePrerenderUrl(url.pathname);
  if (!target) return;

  try {
    const upstream = await fetch(target, {
      method: "GET",
      headers: { "User-Agent": ua, Accept: "text/html" },
    });

    // On upstream 5xx or 404, fall back to SPA shell rather than serve an error.
    if (!upstream.ok) {
      console.log(
        `[bot-prerender] upstream ${upstream.status} for ${url.pathname} — falling back to SPA`
      );
      return;
    }

    const body = await upstream.text();
    const headers = new Headers({
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
      "X-Robots-Tag": "index, follow",
      "X-Prerendered-By": "supabase-edge",
      Vary: "User-Agent",
    });

    console.log(`[bot-prerender] served ${url.pathname} for "${ua.slice(0, 60)}"`);
    return new Response(body, { status: 200, headers });
  } catch (err) {
    console.error(`[bot-prerender] error for ${url.pathname}:`, err);
    return; // Fall through to SPA.
  }
};

export const config = {
  path: "/*",
};
