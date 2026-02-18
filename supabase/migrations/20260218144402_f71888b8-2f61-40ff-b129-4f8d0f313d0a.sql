CREATE POLICY "Authenticated can insert submissions"
  ON public.submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);