const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('CLICKMEETING_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { firstName, email, roomId } = await req.json();

    if (!firstName || !email || !roomId) {
      return new Response(JSON.stringify({ error: 'Missing required fields: firstName, email, roomId' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ClickMeeting registration API
    // Uses form-urlencoded format as required by ClickMeeting API
    // Fields: registration[1] = first name, registration[2] = last name, registration[3] = email
    const formBody = new URLSearchParams();
    formBody.append('registration[1]', firstName.trim());
    formBody.append('registration[2]', '-');
    formBody.append('registration[3]', email.trim());

    const cmResponse = await fetch(
      `https://api.clickmeeting.com/v1/conferences/${roomId}/registration`,
      {
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      }
    );

    const cmText = await cmResponse.text();
    let cmData;
    try {
      cmData = JSON.parse(cmText);
    } catch {
      cmData = { raw: cmText };
    }

    if (!cmResponse.ok) {
      console.error('ClickMeeting API error:', cmResponse.status, cmData);
      return new Response(JSON.stringify({ 
        error: 'ClickMeeting registration failed',
        status: cmResponse.status,
        details: cmData,
      }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Return the meeting URL from the response
    return new Response(JSON.stringify({ 
      success: true,
      url: cmData?.url || cmData?.room_url || null,
      data: cmData,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
