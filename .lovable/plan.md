## Cel

Zastąpić zakładkę **Categories** w `/admin` nową zakładką **Admins / Users** do zarządzania uprawnieniami (kto jest adminem, editorem, viewerem) — wraz z audytem i wzmocnieniem bezpieczeństwa CMS.

---

## Część 1 — Audyt bezpieczeństwa (stan obecny)

### Co działa dobrze
- Role w osobnej tabeli `user_roles` (nie w `profiles`) — zgodnie z best practice, brak privilege escalation.
- Funkcja `has_role()` / `is_admin()` jest `SECURITY DEFINER` z `search_path = public` — chroni przed rekursją RLS.
- `ProtectedRoute` blokuje dostęp do `/admin/*` jeśli `!user || !isAdmin` (sprawdzane po stronie klienta przez `AuthContext.checkAdminRole`).
- Wszystkie tabele CMS (posts, stories, settings, redirects, authors, categories, topics, alternates, article_groups) mają RLS z `is_admin(auth.uid())` na INSERT/UPDATE/DELETE → **nawet jeśli ktoś obejdzie UI, baza odrzuci zapis**.
- `user_roles` ma RLS — użytkownicy widzą tylko własne role, brak INSERT/UPDATE/DELETE policy → **nikt nie może sam sobie nadać admina** (nawet przez API).

### Luki do naprawienia
1. **Brak policy dla zarządzania `user_roles` przez adminów** — obecnie role można dodawać tylko ręcznie przez SQL. Trzeba to umożliwić adminom (kontrolowane).
2. **Leaked Password Protection wyłączony** (lint #17) — włączyć HIBP check.
3. **`ProtectedRoute` to tylko zabezpieczenie UX** — prawdziwe egzekwowanie jest w RLS (jest OK), ale warto też dodać rate-limit/lockout na `/admin/login` (Supabase ma to wbudowane).
4. **Brak audit log** — nie wiadomo kto i kiedy nadał/odebrał komuś rolę. Dodamy tabelę `role_audit_log`.
5. **Brak ochrony przed usunięciem ostatniego admina** — trigger zabezpieczający.
6. Lint warningi #1-6 (RLS USING true) i #9-16 (SECURITY DEFINER executable) dotyczą funkcji typu `is_admin`, `has_role`, `update_updated_at_column`, `trigger_sitemap_regen` — to oczekiwane zachowanie (funkcje muszą być wywoływalne przez RLS), ale warto przejrzeć i opcjonalnie zrewokować EXECUTE z `anon` dla `update_updated_at_column` i `trigger_sitemap_regen` (nie powinny być wołane z REST).

---

## Część 2 — Zmiany w bazie (migracja)

```sql
-- 1. Audit log
CREATE TABLE public.role_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid NOT NULL,           -- kto dokonał zmiany
  target_user_id uuid NOT NULL,     -- kogo dotyczy
  action text NOT NULL,             -- 'granted' | 'revoked'
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.role_audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read audit log" ON public.role_audit_log
  FOR SELECT USING (is_admin(auth.uid()));

-- 2. Pozwolenie adminom zarządzać user_roles (przez RLS)
CREATE POLICY "Admins can insert user_roles" ON public.user_roles
  FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Admins can delete user_roles" ON public.user_roles
  FOR DELETE USING (is_admin(auth.uid()));
CREATE POLICY "Admins can view all user_roles" ON public.user_roles
  FOR SELECT USING (is_admin(auth.uid()));

-- 3. Trigger: nie pozwól usunąć ostatniego admina + zapisuj audit
CREATE OR REPLACE FUNCTION public.protect_last_admin()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF (TG_OP = 'DELETE' AND OLD.role = 'admin') THEN
    IF (SELECT count(*) FROM public.user_roles WHERE role = 'admin') <= 1 THEN
      RAISE EXCEPTION 'Cannot remove the last admin';
    END IF;
    INSERT INTO public.role_audit_log(actor_id, target_user_id, action, role)
      VALUES (auth.uid(), OLD.user_id, 'revoked', OLD.role);
  ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO public.role_audit_log(actor_id, target_user_id, action, role)
      VALUES (auth.uid(), NEW.user_id, 'granted', NEW.role);
  END IF;
  RETURN COALESCE(NEW, OLD);
END $$;
CREATE TRIGGER user_roles_protect BEFORE INSERT OR DELETE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.protect_last_admin();

-- 4. Funkcja do listowania userów z auth.users (tylko dla adminów)
CREATE OR REPLACE FUNCTION public.list_users_with_roles()
RETURNS TABLE(user_id uuid, email text, created_at timestamptz, roles app_role[])
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;
  RETURN QUERY
    SELECT u.id, u.email::text, u.created_at,
           COALESCE(array_agg(ur.role) FILTER (WHERE ur.role IS NOT NULL), '{}')
    FROM auth.users u
    LEFT JOIN public.user_roles ur ON ur.user_id = u.id
    GROUP BY u.id ORDER BY u.created_at DESC;
END $$;
REVOKE EXECUTE ON FUNCTION public.list_users_with_roles() FROM anon;
```

Włączenie HIBP password check (`configure_auth`).

---

## Część 3 — Zmiany w UI

### A. `AdminLayout.tsx` — zamień Categories na Users
```text
{ icon: Shield, label: 'Admins & Users', path: '/admin/users' }
```

### B. Nowa strona `src/pages/admin/UsersList.tsx`
Tabela: **Email | Rola | Dodano | Akcje**
- Lista przez `supabase.rpc('list_users_with_roles')`.
- Akcja **Add admin**: dialog z polem email → wyszukuje usera w `auth.users` (przez RPC) i woła `INSERT INTO user_roles`. Jeśli user nie istnieje → komunikat "User must sign up first at /admin/login".
- Akcja **Revoke**: `DELETE FROM user_roles WHERE id = ...` (trigger nie pozwoli usunąć ostatniego admina — pokaż toast z błędem).
- Tabela poniżej: **Audit log** (ostatnie 50 zmian z `role_audit_log` z join do email).
- Walidacja Zod email; potwierdzenie przy revoke (`AlertDialog`).
- Wskaźnik "You are signed in as: …" — blokada revoke własnej roli (UX).

### C. Routing w `App.tsx`
```text
<Route path="users" element={<UsersList />} />
```
Usuń linię `categories` z menu (route może zostać jako placeholder lub też zostać usunięty).

---

## Część 4 — Komunikat dla użytkownika po implementacji

- Gdzie znaleźć panel: `/admin/users`
- Jak dodać nowego admina: poprosić osobę o sign-up na `/admin/login` → potem w panelu Add admin po emailu.
- Co jest zabezpieczone: RLS w bazie, audit log, ochrona ostatniego admina, HIBP.

---

## Pliki do utworzenia / edycji
- **migracja SQL** (nowe tabele/policies/triggery/RPC)
- `src/pages/admin/UsersList.tsx` (nowy)
- `src/components/admin/AdminLayout.tsx` (zmiana menu)
- `src/App.tsx` (nowy route)
- `configure_auth` → włączyć `password_hibp_enabled`

Czy zatwierdzasz? Po Twoim OK wdrażam migrację + UI.