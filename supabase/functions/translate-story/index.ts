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

// Recursively translate text nodes in TipTap JSON
async function translateBody(
  node: any,
  apiKey: string
): Promise<any> {
  if (!node) return node;

  if (Array.isArray(node)) {
    // Collect all text from the array, translate in batch
    return Promise.all(node.map((n) => translateBody(n, apiKey)));
  }

  if (typeof node === "object") {
    const result: any = { ...node };

    // Translate text content
    if (node.type === "text" && typeof node.text === "string" && node.text.trim()) {
      // Don't translate if it's just a URL or number
      if (!/^https?:\/\//.test(node.text) && !/^\d+[\d.,% ]*$/.test(node.text.trim())) {
        result.text = node.text; // will be batch-translated later
      }
    }

    if (node.content && Array.isArray(node.content)) {
      result.content = await translateBody(node.content, apiKey);
    }

    return result;
  }

  return node;
}

// Extract all translatable text from body
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

// Replace texts in body with translations
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
    const { story_id, target_lang } = await req.json();
    if (!story_id || !target_lang) {
      throw new Error("story_id and target_lang are required");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch source story
    const { data: story, error: fetchErr } = await supabase
      .from("stories")
      .select("*")
      .eq("id", story_id)
      .single();

    if (fetchErr || !story) {
      throw new Error(`Story not found: ${fetchErr?.message}`);
    }

    console.log(`Translating story "${story.title}" (${story.lang} → ${target_lang})`);

    // Check if CS version already exists for this group
    if (story.group_id) {
      const { data: existing } = await supabase
        .from("stories")
        .select("id")
        .eq("group_id", story.group_id)
        .eq("lang", target_lang);
      if (existing && existing.length > 0) {
        throw new Error(`${target_lang} version already exists for group ${story.group_id}`);
      }
    }

    const sourceLang = story.lang === "pl" ? "Polish" : "English";

    // 1. Translate metadata
    const metadataPrompt = `Translate the following JSON values from ${sourceLang} to Czech. Return ONLY valid JSON with the same keys. Keep brand names (Envirly, Quantifier, company names) unchanged. Translate naturally for Czech audience.

${JSON.stringify({
  title: story.title,
  summary: story.summary,
  meta_title: story.meta_title,
  meta_desc: story.meta_desc,
  industry: story.industry,
  tags: story.tags,
  focus_keyword: story.focus_keyword,
  featured_image_alt: story.featured_image_alt,
})}`;

    const metaRaw = await callAI(
      LOVABLE_API_KEY,
      "You are a professional translator. Translate from " + sourceLang + " to Czech. Return only valid JSON.",
      metadataPrompt
    );

    let meta: any;
    try {
      // Extract JSON from potential markdown code block
      const jsonMatch = metaRaw.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, metaRaw];
      meta = JSON.parse(jsonMatch[1]!.trim());
    } catch (e) {
      console.error("Meta parse error:", metaRaw);
      throw new Error("Failed to parse translated metadata");
    }

    console.log("Metadata translated:", meta.title);

    // 2. Translate body_rich texts in batches
    const bodyRich = story.body_rich;
    const allTexts: string[] = [];
    extractTexts(bodyRich, allTexts);

    console.log(`Found ${allTexts.length} text nodes to translate`);

    const translationMap = new Map<string, string>();

    // Batch translate in chunks of 30
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
        // Skip this batch rather than failing entirely
      }

      console.log(`Translated batch ${i / BATCH_SIZE + 1}/${Math.ceil(allTexts.length / BATCH_SIZE)}`);
    }

    const translatedBody = replaceTexts(bodyRich, translationMap);

    // 3. Generate slug
    const csSlug = slugify(meta.title || story.title);

    // 4. Insert new CS story
    const newStory = {
      lang: target_lang,
      title: meta.title || story.title,
      slug: csSlug,
      summary: meta.summary || story.summary,
      client_name: story.client_name,
      industry: meta.industry || story.industry,
      country: story.country,
      body_rich: translatedBody,
      status: "published" as const,
      published_at: new Date().toISOString(),
      group_id: story.group_id,
      logo_url: story.logo_url,
      featured_image_url: story.featured_image_url,
      featured_image_alt: meta.featured_image_alt || story.featured_image_alt,
      meta_title: meta.meta_title || story.meta_title,
      meta_desc: meta.meta_desc || story.meta_desc,
      og_image_url: story.og_image_url,
      og_title: meta.title,
      og_description: meta.summary,
      tags: meta.tags || story.tags,
      focus_keyword: meta.focus_keyword || story.focus_keyword,
      results_kpis: story.results_kpis,
      robots_index: true,
      robots_follow: true,
      breadcrumbs_enabled: true,
      seo_score: 0,
      author_id: story.author_id,
    };

    const { data: inserted, error: insertErr } = await supabase
      .from("stories")
      .insert(newStory)
      .select("id, title, slug")
      .single();

    if (insertErr) {
      throw new Error(`Insert failed: ${insertErr.message}`);
    }

    console.log(`Created CS story: ${inserted.id} - ${inserted.slug}`);

    return new Response(
      JSON.stringify({
        success: true,
        story: inserted,
        texts_translated: translationMap.size,
        texts_total: allTexts.length,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error("translate-story error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
