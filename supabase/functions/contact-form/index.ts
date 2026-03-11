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

    // Send notification email to contact@quantifier.ai
    // Using fetch to Supabase's built-in email or a simple SMTP approach
    // For now, we'll use the Resend-compatible approach via edge function
    // Since no email domain is set up, we'll just store in DB for now
    // and log the submission details
    console.log('New contact form submission:', {
      from: `${firstName} ${lastName} <${email}>`,
      company,
      message: message.substring(0, 100) + '...',
    })

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
