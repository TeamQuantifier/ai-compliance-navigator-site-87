import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const BASE_URL = "https://quantifier.ai";
const BRAND = "Quantifier.ai";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const lang = url.searchParams.get("lang") || "en";
    const format = url.searchParams.get("format") || "rss"; // rss or atom

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch published posts
    const { data: posts, error } = await supabase
      .from("posts")
      .select("title, slug, excerpt, published_at, updated_at, featured_image_url, tags")
      .eq("lang", lang)
      .eq("status", "published")
      .not("published_at", "is", null)
      .order("published_at", { ascending: false })
      .limit(50);

    if (error) throw error;

    const feedUrl = `${BASE_URL}/functions/v1/rss-feed?lang=${lang}`;
    const blogUrl = `${BASE_URL}/${lang}/blog/`;
    const now = new Date().toUTCString();

    if (format === "atom") {
      const atomItems = (posts || [])
        .map((p) => {
          const postUrl = `${BASE_URL}/${lang}/blog/${p.slug}/`;
          return `  <entry>
    <title>${escapeXml(p.title)}</title>
    <link href="${postUrl}" rel="alternate" type="text/html"/>
    <id>${postUrl}</id>
    <updated>${new Date(p.updated_at || p.published_at).toISOString()}</updated>
    <published>${new Date(p.published_at).toISOString()}</published>
    <summary>${escapeXml(p.excerpt || "")}</summary>
    <author><name>${BRAND}</name></author>
  </entry>`;
        })
        .join("\n");

      const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${BRAND} Blog (${lang.toUpperCase()})</title>
  <link href="${blogUrl}" rel="alternate" type="text/html"/>
  <link href="${feedUrl}&amp;format=atom" rel="self" type="application/atom+xml"/>
  <id>${blogUrl}</id>
  <updated>${posts?.[0] ? new Date(posts[0].published_at).toISOString() : new Date().toISOString()}</updated>
  <author><name>${BRAND}</name></author>
${atomItems}
</feed>`;

      return new Response(atom, {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/atom+xml; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    // Default: RSS 2.0
    const rssItems = (posts || [])
      .map((p) => {
        const postUrl = `${BASE_URL}/${lang}/blog/${p.slug}/`;
        const categories = (p.tags || [])
          .map((t: string) => `      <category>${escapeXml(t)}</category>`)
          .join("\n");
        return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${new Date(p.published_at).toUTCString()}</pubDate>
      <description>${escapeXml(p.excerpt || "")}</description>
${categories}
    </item>`;
      })
      .join("\n");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${BRAND} Blog (${lang.toUpperCase()})</title>
    <link>${blogUrl}</link>
    <description>Compliance automation insights from ${BRAND}</description>
    <language>${lang}</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/logo-quantifier.png</url>
      <title>${BRAND}</title>
      <link>${BASE_URL}</link>
    </image>
${rssItems}
  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
