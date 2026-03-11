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

CREATE POLICY "Allow anonymous inserts" ON public.contact_submissions
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated inserts" ON public.contact_submissions
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Admins can read submissions" ON public.contact_submissions
  FOR SELECT TO authenticated USING (is_admin(auth.uid()));