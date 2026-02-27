
CREATE TABLE public.event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  event_slug text NOT NULL,
  event_title text,
  first_name text NOT NULL,
  work_email text NOT NULL,
  company text NOT NULL,
  role text NOT NULL,
  company_size text NOT NULL,
  nis2_qualifier text NOT NULL,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text
);

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon can insert registrations" ON public.event_registrations
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Authenticated can insert registrations" ON public.event_registrations
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Admins can view registrations" ON public.event_registrations
  FOR SELECT TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete registrations" ON public.event_registrations
  FOR DELETE TO authenticated USING (is_admin(auth.uid()));
