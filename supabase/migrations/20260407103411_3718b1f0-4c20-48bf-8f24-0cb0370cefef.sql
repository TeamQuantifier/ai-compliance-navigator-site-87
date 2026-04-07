CREATE OR REPLACE FUNCTION public.restore_soc2_pillar()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- This is a one-time restore function, will be dropped after use
  NULL;
END
$$;