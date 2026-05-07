
-- 1. Audit log table
CREATE TABLE public.role_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid,
  target_user_id uuid NOT NULL,
  action text NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.role_audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read audit log" ON public.role_audit_log
  FOR SELECT USING (public.is_admin(auth.uid()));

-- 2. Admin policies on user_roles
CREATE POLICY "Admins can view all user_roles" ON public.user_roles
  FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can insert user_roles" ON public.user_roles
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete user_roles" ON public.user_roles
  FOR DELETE USING (public.is_admin(auth.uid()));

-- 3. Trigger: protect last admin + audit log
CREATE OR REPLACE FUNCTION public.protect_and_audit_user_roles()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF (TG_OP = 'DELETE') THEN
    IF OLD.role = 'admin' AND (SELECT count(*) FROM public.user_roles WHERE role = 'admin') <= 1 THEN
      RAISE EXCEPTION 'Cannot remove the last admin';
    END IF;
    INSERT INTO public.role_audit_log(actor_id, target_user_id, action, role)
      VALUES (auth.uid(), OLD.user_id, 'revoked', OLD.role);
    RETURN OLD;
  ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO public.role_audit_log(actor_id, target_user_id, action, role)
      VALUES (auth.uid(), NEW.user_id, 'granted', NEW.role);
    RETURN NEW;
  END IF;
  RETURN NULL;
END $$;

CREATE TRIGGER user_roles_protect_audit
  AFTER INSERT OR DELETE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.protect_and_audit_user_roles();

-- 4. RPC: list users with roles (admins only)
CREATE OR REPLACE FUNCTION public.list_users_with_roles()
RETURNS TABLE(user_id uuid, email text, created_at timestamptz, last_sign_in_at timestamptz, roles app_role[])
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;
  RETURN QUERY
    SELECT u.id, u.email::text, u.created_at, u.last_sign_in_at,
           COALESCE(array_agg(ur.role) FILTER (WHERE ur.role IS NOT NULL), '{}'::app_role[])
    FROM auth.users u
    LEFT JOIN public.user_roles ur ON ur.user_id = u.id
    GROUP BY u.id, u.email, u.created_at, u.last_sign_in_at
    ORDER BY u.created_at DESC;
END $$;
REVOKE EXECUTE ON FUNCTION public.list_users_with_roles() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.list_users_with_roles() TO authenticated;

-- 5. RPC: audit log with email lookup
CREATE OR REPLACE FUNCTION public.list_role_audit_log()
RETURNS TABLE(id uuid, actor_email text, target_email text, action text, role app_role, created_at timestamptz)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;
  RETURN QUERY
    SELECT l.id, a.email::text, t.email::text, l.action, l.role, l.created_at
    FROM public.role_audit_log l
    LEFT JOIN auth.users a ON a.id = l.actor_id
    LEFT JOIN auth.users t ON t.id = l.target_user_id
    ORDER BY l.created_at DESC
    LIMIT 100;
END $$;
REVOKE EXECUTE ON FUNCTION public.list_role_audit_log() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.list_role_audit_log() TO authenticated;
