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
  // Strip trailing slash for matching, then re-normalize.
  const path = pathname.replace(/\/+$/, "") || "/";

  // Root → marketing with path "/"
  if (path === "/") {
    return `${SUPABASE_FUNCTIONS_BASE}/prerender-marketing?path=/`;
  }

  const parts = path.split("/").filter(Boolean);
  const locale = parts[0];

  // Locale root: /en, /pl, /cs
  if (parts.length === 1 && LOCALES.includes(locale)) {
    return `${SUPABASE_FUNCTIONS_BASE}/prerender-marketing?path=${encodeURIComponent(
      "/" + locale + "/"
    )}`;
  }

  // Non-localized paths fall through to marketing too (covers legacy + redirects).
  if (!LOCALES.includes(locale)) {
    return `${SUPABASE_FUNCTIONS_BASE}/prerender-marketing?path=${encodeURIComponent(
      path + "/"
    )}`;
  }

  // /:locale/blog/:slug → prerender-post
  if (parts.length === 3 && parts[1] === "blog") {
    const slug = parts[2];
    return `${SUPABASE_FUNCTIONS_BASE}/prerender-post?locale=${locale}&slug=${encodeURIComponent(
      slug
    )}`;
  }

  // /:locale/success-stories/:slug → prerender-story
  if (parts.length === 3 && parts[1] === "success-stories") {
    const slug = parts[2];
    return `${SUPABASE_FUNCTIONS_BASE}/prerender-story?locale=${locale}&slug=${encodeURIComponent(
      slug
    )}`;
  }

  // Everything else (frameworks, product, by-roles, plans, contact, about,
  // legal, partners, blog listing, success-stories listing, landings, etc.)
  return `${SUPABASE_FUNCTIONS_BASE}/prerender-marketing?path=${encodeURIComponent(
    path + "/"
  )}`;
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
