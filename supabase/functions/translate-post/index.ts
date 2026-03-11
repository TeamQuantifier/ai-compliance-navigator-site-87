import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractTexts(node: any, texts: string[]): void {
  if (!node) return;
  if (Array.isArray(node)) {
    node.forEach((n) => extractTexts(n, texts));
    return;
  }
  if (typeof node === "object") {
    if (
      node.type === "text" &&
      typeof node.text === "string" &&
      node.text.trim() &&
      !/^https?:\/\//.test(node.text) &&
      !/^\d+[\d.,% ]*$/.test(node.text.trim())
    ) {
      texts.push(node.text);
    }
    if (node.content && Array.isArray(node.content)) {
      extractTexts(node.content, texts);
    }
  }
}

function replaceTexts(node: any, map: Map<string, string>): any {
  if (!node) return node;
  if (Array.isArray(node)) {
    return node.map((n) => replaceTexts(n, map));
  }
  if (typeof node === "object") {
    const result: any = { ...node };
    if (
      node.type === "text" &&
      typeof node.text === "string" &&
      map.has(node.text)
    ) {
      result.text = map.get(node.text)!;
    }
    if (node.content && Array.isArray(node.content)) {
      result.content = replaceTexts(node.content, map);
    }
    return result;
  }
  return node;
}

async function callAI(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const response = await fetch(
    "https://ai.gateway.lovable.dev/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`AI Gateway error ${response.status}: ${err}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { post_id, target_lang } = await req.json();
    if (!post_id || !target_lang) {
      throw new Error("post_id and target_lang are required");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: post, error: fetchErr } = await supabase
      .from("posts")
      .select("*")
      .eq("id", post_id)
      .single();

    if (fetchErr || !post) {
      throw new Error(`Post not found: ${fetchErr?.message}`);
    }

    console.log(`Translating post "${post.title}" (${post.lang} → ${target_lang})`);

    if (post.group_id) {
      const { data: existing } = await supabase
        .from("posts")
        .select("id")
        .eq("group_id", post.group_id)
        .eq("lang", target_lang);
      if (existing && existing.length > 0) {
        throw new Error(`${target_lang} version already exists for group ${post.group_id}`);
      }
    }

    const sourceLang = post.lang === "pl" ? "Polish" : "English";

    // 1. Translate metadata
    const metadataPrompt = `Translate the following JSON values from ${sourceLang} to Czech. Return ONLY valid JSON with the same keys. Keep brand names (Envirly, Quantifier, company names) unchanged. Translate naturally for Czech audience.

${JSON.stringify({
  title: post.title,
  excerpt: post.excerpt,
  meta_title: post.meta_title,
  meta_desc: post.meta_desc,
  tags: post.tags,
  focus_keyword: post.focus_keyword,
  featured_image_alt: post.featured_image_alt,
})}`;

    const metaRaw = await callAI(
      LOVABLE_API_KEY,
      "You are a professional translator. Translate from " + sourceLang + " to Czech. Return only valid JSON.",
      metadataPrompt
    );

    let meta: any;
    try {
      const jsonMatch = metaRaw.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, metaRaw];
      meta = JSON.parse(jsonMatch[1]!.trim());
    } catch (e) {
      console.error("Meta parse error:", metaRaw);
      throw new Error("Failed to parse translated metadata");
    }

    console.log("Metadata translated:", meta.title);

    // 2. Translate body_rich texts in batches
    const bodyRich = post.body_rich;
    const allTexts: string[] = [];
    extractTexts(bodyRich, allTexts);

    console.log(`Found ${allTexts.length} text nodes to translate`);

    const translationMap = new Map<string, string>();
    const BATCH_SIZE = 30;

    for (let i = 0; i < allTexts.length; i += BATCH_SIZE) {
      const batch = allTexts.slice(i, i + BATCH_SIZE);
      const batchPrompt = `Translate each text from ${sourceLang} to Czech. Return a JSON array of translated strings in the same order. Keep brand names, URLs, numbers unchanged. Translate naturally.

Input array:
${JSON.stringify(batch)}`;

      const batchRaw = await callAI(
        LOVABLE_API_KEY,
        "You are a professional translator. Return ONLY a valid JSON array of translated strings.",
        batchPrompt
      );

      try {
        const jsonMatch = batchRaw.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, batchRaw];
        const translated: string[] = JSON.parse(jsonMatch[1]!.trim());
        batch.forEach((original, idx) => {
          if (translated[idx]) {
            translationMap.set(original, translated[idx]);
          }
        });
      } catch (e) {
        console.error(`Batch ${i} parse error:`, batchRaw.substring(0, 200));
      }

      console.log(`Translated batch ${i / BATCH_SIZE + 1}/${Math.ceil(allTexts.length / BATCH_SIZE)}`);
    }

    const translatedBody = replaceTexts(bodyRich, translationMap);

    // 3. Generate slug
    const csSlug = slugify(meta.title || post.title);
    const trunc = (s: string | null, max: number) => s ? s.substring(0, max) : s;

    // 4. Insert new CS post
    const newPost = {
      lang: target_lang,
      title: trunc(meta.title || post.title, 200)!,
      slug: trunc(csSlug, 250)!,
      excerpt: meta.excerpt || post.excerpt,
      body_rich: translatedBody,
      status: "published" as const,
      published_at: new Date().toISOString(),
      group_id: post.group_id,
      category_id: post.category_id,
      topic_id: post.topic_id,
      featured_image_url: post.featured_image_url,
      featured_image_alt: trunc(meta.featured_image_alt || post.featured_image_alt, 255),
      meta_title: trunc(meta.meta_title || post.meta_title, 60),
      meta_desc: trunc(meta.meta_desc || post.meta_desc, 160),
      og_image_url: post.og_image_url,
      og_title: trunc(meta.title, 100),
      og_description: trunc(meta.excerpt, 300),
      tags: meta.tags || post.tags,
      focus_keyword: trunc(meta.focus_keyword || post.focus_keyword, 100),
      related_post_ids: post.related_post_ids,
      robots_index: true,
      robots_follow: true,
      breadcrumbs_enabled: true,
      seo_score: 0,
    };

    const { data: inserted, error: insertErr } = await supabase
      .from("posts")
      .insert(newPost)
      .select("id, title, slug")
      .single();

    if (insertErr) {
      throw new Error(`Insert failed: ${insertErr.message}`);
    }

    console.log(`Created CS post: ${inserted.id} - ${inserted.slug}`);

    return new Response(
      JSON.stringify({
        success: true,
        post: inserted,
        texts_translated: translationMap.size,
        texts_total: allTexts.length,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error("translate-post error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
