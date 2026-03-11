import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { firstName, lastName, email, company, message, language, sourceUrl } = await req.json()

    if (!firstName || !lastName || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Save to database
    const { error: dbError } = await supabase.from('contact_submissions').insert({
      first_name: firstName,
      last_name: lastName,
      email,
      company: company || null,
      message,
      language: language || 'en',
      source_url: sourceUrl || null,
    })

    if (dbError) {
      console.error('DB insert error:', dbError)
      return new Response(JSON.stringify({ error: 'Failed to save submission' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Sync with marketing API (handles email notifications to contact@quantifier.ai)
    try {
      const browserLang = language || 'en';
      const marketingPayload: Record<string, any> = {
        email,
        language: browserLang,
        first_name: firstName,
        last_name: lastName,
        customer_message: message,
        tags: ['contact_form'],
      };
      if (company) marketingPayload.company = company;
      if (sourceUrl) {
        marketingPayload.origin = sourceUrl;
        marketingPayload.source = sourceUrl;
      }

      // Remove null/undefined/empty values
      const cleanPayload = Object.fromEntries(
        Object.entries(marketingPayload).filter(([_, v]) => v !== undefined && v !== null && v !== '')
      );

      const marketingRes = await fetch('https://marketing.quantifier.ai/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanPayload),
      });

      if (!marketingRes.ok) {
        console.error('Marketing API error:', marketingRes.status, await marketingRes.text());
      } else {
        console.log('Marketing API sync OK');
      }
    } catch (marketingErr) {
      console.error('Marketing API sync failed:', marketingErr);
      // Don't fail the whole request if marketing sync fails
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
