declare const process: { env: Record<string, string | undefined> };
import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_case_studies",
  title: "List case studies",
  description: "List published Quantifier.ai customer case studies (success stories).",
  inputSchema: {
    locale: z.enum(["en", "pl", "cs"]).optional().describe("Language filter."),
    limit: z.number().int().min(1).max(50).optional().describe("Maximum stories to return (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ locale, limit }) => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    let query = supabase
      .from("stories")
      .select("id, title, slug, excerpt, locale, published_at, created_at")
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(limit ?? 20);
    if (locale) query = query.eq("locale", locale);
    const { data, error } = await query;
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { stories: data ?? [] },
    };
  },
});
