
-- Tabela submissions
CREATE TABLE public.submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  email text NOT NULL,
  q1 text[] DEFAULT '{}',
  q2 text[] DEFAULT '{}',
  q3 text[] DEFAULT '{}',
  q4 text[] DEFAULT '{}',
  result_key text,
  result_text text
);

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon can insert submissions"
  ON public.submissions FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Admins can select submissions"
  ON public.submissions FOR SELECT USING (is_admin(auth.uid()));

-- Tabela result_templates
CREATE TABLE public.result_templates (
  result_key text PRIMARY KEY,
  title text NOT NULL,
  body text NOT NULL
);

ALTER TABLE public.result_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read result_templates"
  ON public.result_templates FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can manage result_templates"
  ON public.result_templates FOR ALL
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));
