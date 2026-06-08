-- Restrict settings SELECT to admins to prevent any future exposure of sensitive config
DROP POLICY IF EXISTS "Public can view settings" ON public.settings;
CREATE POLICY "Admins can view settings"
  ON public.settings FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- Revoke EXECUTE on admin-only SECURITY DEFINER functions from public/anon/authenticated
REVOKE EXECUTE ON FUNCTION public.list_users_with_roles() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.list_role_audit_log() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.protect_and_audit_user_roles() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.trigger_sitemap_regen() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.list_users_with_roles() TO authenticated;
GRANT EXECUTE ON FUNCTION public.list_role_audit_log() TO authenticated;