import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
  
  const body = await req.json();
  
  const { error } = await supabase
    .from("posts")
    .update({ body_rich: body.body_rich, updated_at: new Date().toISOString() })
    .eq("slug", body.slug)
    .eq("lang", body.lang);
  
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: corsHeaders });
  }
  
  return new Response(JSON.stringify({ ok: true }), { headers: corsHeaders });
});
