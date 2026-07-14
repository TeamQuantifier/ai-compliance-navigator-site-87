
CREATE TABLE IF NOT EXISTS public.pending_role_grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  role public.app_role NOT NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(email, role)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.pending_role_grants TO authenticated;
GRANT ALL ON public.pending_role_grants TO service_role;

ALTER TABLE public.pending_role_grants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage pending grants"
  ON public.pending_role_grants
  FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE OR REPLACE FUNCTION public.grant_role_by_email(_email text, _role public.app_role)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _normalized text := lower(trim(_email));
  _user_id uuid;
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;

  IF _normalized IS NULL OR _normalized = '' THEN
    RAISE EXCEPTION 'Email required';
  END IF;

  SELECT id INTO _user_id FROM auth.users WHERE lower(email) = _normalized LIMIT 1;

  IF _user_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
      VALUES (_user_id, _role)
      ON CONFLICT (user_id, role) DO NOTHING;
    RETURN jsonb_build_object('status', 'granted', 'user_id', _user_id);
  ELSE
    INSERT INTO public.pending_role_grants (email, role, created_by)
      VALUES (_normalized, _role, auth.uid())
      ON CONFLICT (email, role) DO NOTHING;
    RETURN jsonb_build_object('status', 'pending', 'email', _normalized);
  END IF;
END $$;

GRANT EXECUTE ON FUNCTION public.grant_role_by_email(text, public.app_role) TO authenticated;

CREATE OR REPLACE FUNCTION public.apply_pending_role_grants()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
    SELECT NEW.id, p.role
      FROM public.pending_role_grants p
      WHERE lower(p.email) = lower(NEW.email)
    ON CONFLICT (user_id, role) DO NOTHING;

  DELETE FROM public.pending_role_grants WHERE lower(email) = lower(NEW.email);
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS on_auth_user_created_apply_pending ON auth.users;
CREATE TRIGGER on_auth_user_created_apply_pending
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.apply_pending_role_grants();
