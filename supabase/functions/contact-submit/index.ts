import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation schema
interface ContactInput {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  message: string;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

function sanitizeString(str: string, maxLength: number): string {
  return str.trim().slice(0, maxLength);
}

function validateContactInput(data: unknown): { valid: true; data: ContactInput } | { valid: false; error: string } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }

  const input = data as Record<string, unknown>;

  // Validate required fields
  if (typeof input.firstName !== 'string' || !input.firstName.trim()) {
    return { valid: false, error: 'First name is required' };
  }
  if (typeof input.lastName !== 'string' || !input.lastName.trim()) {
    return { valid: false, error: 'Last name is required' };
  }
  if (typeof input.email !== 'string' || !validateEmail(input.email.trim())) {
    return { valid: false, error: 'Valid email is required' };
  }
  if (typeof input.message !== 'string' || !input.message.trim()) {
    return { valid: false, error: 'Message is required' };
  }

  // Validate lengths
  if (input.firstName.length > 100) {
    return { valid: false, error: 'First name must be less than 100 characters' };
  }
  if (input.lastName.length > 100) {
    return { valid: false, error: 'Last name must be less than 100 characters' };
  }
  if (input.message.length > 5000) {
    return { valid: false, error: 'Message must be less than 5000 characters' };
  }
  if (input.company && typeof input.company === 'string' && input.company.length > 200) {
    return { valid: false, error: 'Company name must be less than 200 characters' };
  }

  return {
    valid: true,
    data: {
      firstName: sanitizeString(input.firstName as string, 100),
      lastName: sanitizeString(input.lastName as string, 100),
      email: sanitizeString(input.email as string, 255).toLowerCase(),
      company: input.company ? sanitizeString(input.company as string, 200) : undefined,
      message: sanitizeString(input.message as string, 5000),
    }
  };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Parse request body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate input
    const validation = validateContactInput(body);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { firstName, lastName, email, company, message } = validation.data;

    // Get the external API key from environment
    const externalApiKey = Deno.env.get('EXTERNAL_CONTACT_API_KEY');
    const externalApiUrl = Deno.env.get('EXTERNAL_CONTACT_API_URL') || 'https://cuzufmphilriynstexsv.supabase.co/functions/v1/contact-submit';
    
    if (!externalApiKey) {
      console.error('EXTERNAL_CONTACT_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Forward to external API
    const externalResponse = await fetch(externalApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${externalApiKey}`,
      },
      body: JSON.stringify({ firstName, lastName, email, company, message }),
    });

    const responseData = await externalResponse.json().catch(() => ({}));

    if (!externalResponse.ok) {
      console.error('External API error:', externalResponse.status, responseData);
      return new Response(
        JSON.stringify({ error: 'Failed to submit contact form' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Contact form submitted successfully' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Contact submit error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
