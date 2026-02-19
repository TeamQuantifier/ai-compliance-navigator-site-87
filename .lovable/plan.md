
# Poprawka przycisku Cybersec-Check — lokalizacja URL i etykiet

## Stan obecny

### Problem 1 — Nieprawidłowy URL dla wersji CS
W `src/components/Navbar.tsx` (linia 168) czeska wersja wskazuje na `/cybersecurity-check` (angielski URL):
```ts
const CYBERSEC_HREF: Record<string, string> = {
  pl: '/sprawdz-cyberbezpieczenstwo',
  en: '/cybersecurity-check',
  cs: '/cybersecurity-check',  // BŁĄD — powinno być /zkontrolujte-kybernetickou-bezpecnost
};
```

### Problem 2 — Etykieta przycisku taka sama we wszystkich językach
We wszystkich 3 plikach tłumaczeń klucz `menu.cybersecCheck` ma wartość `"Cybersec-Check"` — bez lokalizacji. Użytkownik chce zlokalizowane etykiety.

### Problem 3 — Czech URL z diakrytykami
URL `/zkontrolujte-kybernetickou-bezpečnost` zawiera znak `č` (z diakrytykiem). W React Router i przeglądarkach to działa, ale dla bezpieczeństwa warto użyć ASCII slug: `/zkontrolujte-kybernetickou-bezpecnost`. Sprawdzę jak jest zarejestrowana trasa w `App.tsx`.

---

## Co zostanie zmienione

### Plik 1: `src/components/Navbar.tsx`

Aktualizacja mapy `CYBERSEC_HREF` z poprawnym czeskim URL-em:

```ts
const CYBERSEC_HREF: Record<string, string> = {
  pl: '/sprawdz-cyberbezpieczenstwo',
  en: '/cybersecurity-check',
  cs: '/zkontrolujte-kybernetickou-bezpecnost',
};
```

MobileMenu otrzymuje `cybersecHref` przez props (linia 231) — zmiana w Navbar automatycznie naprawi też wersję mobilną.

---

### Pliki 2–4: Translation JSON (PL, EN, CS)

Aktualizacja klucza `menu.cybersecCheck` na zlokalizowane etykiety:

**`public/locales/en/translation.json`:**
```json
"cybersecCheck": "Cybersecurity Check"
```

**`public/locales/pl/translation.json`:**
```json
"cybersecCheck": "Sprawdź Cyberbezpieczeństwo"
```

**`public/locales/cs/translation.json`:**
```json
"cybersecCheck": "Kybernetická kontrola"
```

Etykieta czeska „Kybernetická kontrola" — zwięzła (2 słowa), poprawna po czesku, czytelna. Alternatywa: „Zkontrolujte kybernetiku" (też 2 słowa).

---

## Weryfikacja trasy CS w App.tsx

Przed implementacją sprawdzę w `App.tsx` jak zarejestrowana jest trasa dla czeskiej wersji ankiety — żeby URL w `CYBERSEC_HREF` dokładnie pasował do zarejestrowanej ścieżki React Router.

---

## Podsumowanie zmian

| Plik | Co się zmienia |
|---|---|
| `src/components/Navbar.tsx` | Poprawka `CYBERSEC_HREF` — cs: `/zkontrolujte-kybernetickou-bezpecnost` |
| `public/locales/en/translation.json` | `cybersecCheck`: `"Cybersecurity Check"` |
| `public/locales/pl/translation.json` | `cybersecCheck`: `"Sprawdź Cyberbezpieczeństwo"` |
| `public/locales/cs/translation.json` | `cybersecCheck`: `"Kybernetická kontrola"` |

MobileMenu nie wymaga zmian — otrzymuje `cybersecHref` jako prop z Navbar.
SEO nie jest naruszane — `<Helmet>` w `FormularzPage` pozostaje bez zmian.
