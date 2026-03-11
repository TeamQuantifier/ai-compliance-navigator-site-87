

## Problem

The external marketing API (`marketing.quantifier.ai/subscribe`) returns a backend Python/Pydantic error: `"Float types are not supported. Use Decimal types instead."` This is a **server-side bug** that cannot be fixed from the frontend — no amount of payload cleaning will resolve it since the error originates in the backend's data processing.

## Solution

Create a backend function that handles contact form submissions directly — bypassing the broken external API. It will:
1. Save the submission to a database table
2. Send an email notification to `contact@quantifier.ai` using the built-in email capabilities

### Changes

**1. Database migration** — Create `contact_submissions` table:
```sql
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  company text,
  message text NOT NULL,
  language text DEFAULT 'en',
  source_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anonymous users (public form)
CREATE POLICY "Allow anonymous inserts" ON public.contact_submissions
  FOR INSERT TO anon WITH CHECK (true);

-- Allow authenticated users to read all
CREATE POLICY "Allow authenticated reads" ON public.contact_submissions
  FOR SELECT TO authenticated USING (true);
```

**2. New edge function `contact-form`** — Receives form data, saves to DB, and sends notification email to `contact@quantifier.ai` using a Lovable AI model to format a clean notification email body. Uses the Supabase service role to insert into the table and the built-in SMTP to send mail.

**3. Update `src/pages/Contact.tsx`** — Replace `newsletterClient.submitContact()` call with a `supabase.functions.invoke('contact-form', ...)` call.

**4. Keep newsletter signup unchanged** — The newsletter subscription on the contact page (`newsletterClient.subscribe`) stays as-is since that may still work (different code path on the backend).

This approach completely decouples the contact form from the unreliable external API, gives you a database record of all submissions, and ensures emails reach `contact@quantifier.ai`.

