
# Navbar na /cybersecurity-check + CTA button w menu głównym

## Stan obecny

1. **FormularzPage ma własny custom header** (linie 329-334) — prosty pasek z logo bez linku, bez menu nawigacyjnego, bez przycisku Login. Strona jest odizolowana od reszty serwisu.

2. **Navbar.tsx nie zawiera linku do `/cybersecurity-check`** — użytkownik musi wpisać URL ręcznie lub kliknąć link z zewnątrz.

3. **Brak klucza `menu.cybersecCheck` w plikach translacji** (`public/locales/pl/translation.json`, `/en/...`, `/cs/...`) — trzeba go dodać.

---

## Co zostanie zmienione

### Plik 1: `src/pages/formularz/FormularzPage.tsx`

**Zastąpienie custom headera standardowym `<Navbar />`**

Obecny custom header (linie 329–334):
```tsx
<header className="bg-white border-b border-[#e0e2e9] shadow-sm">
  <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
    <img src="/logo-quantifier.png" alt="Quantifier" className="h-8 object-contain" />
  </div>
</header>
```

Zostanie zastąpiony przez `<Navbar />` (komponent już istnieje w projekcie). Navbar ma:
- link do strony głównej pod kliknięciem logo (już zaimplementowany)
- pełne menu desktop + mobile
- przycisk Login
- LanguageSwitch

Ponieważ Navbar ma `fixed top-0`, trzeba dodać `pt-16` lub `pt-20` do `<main>` żeby treść nie chowała się pod paskiem.

**Import Navbar do FormularzPage:**
```tsx
import { Navbar } from '@/components/Navbar';
```

---

### Plik 2: `src/components/Navbar.tsx`

**Dodanie fioletowego przycisku CTA "Cybersec-Check" w prawej części paska**

W sekcji `<div className="flex items-center gap-2">` (linia ~167), obok przycisku Login, dodamy nowy `<Link>` jako `<Button>` z klasami fioletowymi:

```tsx
<Link
  to={`/${currentLocale}${cybersecHref}`}
  className="hidden md:inline-flex items-center px-3 py-2 text-sm font-semibold 
             bg-[#6d38a8] text-white rounded-md hover:bg-[#5a2e8e] transition-colors"
>
  {t('menu.cybersecCheck')}
</Link>
```

Href jest lokalowy:
- PL → `/pl/sprawdz-cyberbezpieczenstwo`
- EN → `/en/cybersecurity-check`
- CS → `/cs/cybersecurity-check`

Można to obsłużyć przez mapę stałych w Navbar lub przez klucz tłumaczenia `menu.cybersecHref` albo przez prostą logikę warunkową:

```tsx
const CYBERSEC_HREF: Record<string, string> = {
  pl: '/sprawdz-cyberbezpieczenstwo',
  en: '/cybersecurity-check',
  cs: '/cybersecurity-check',
};
const cybersecHref = CYBERSEC_HREF[currentLocale] ?? '/cybersecurity-check';
```

W **MobileMenu** (linia ~122, przed blokiem Login) dodamy analogiczny link wewnątrz panelu mobilnego.

---

### Pliki 3–5: Translation JSON (PL, EN, CS)

Dodanie klucza `menu.cybersecCheck` we wszystkich 3 plikach:

**`public/locales/pl/translation.json`:**
```json
"menu": {
  ...
  "cybersecCheck": "Cybersec-Check"
}
```

**`public/locales/en/translation.json`:**
```json
"menu": {
  ...
  "cybersecCheck": "Cybersec-Check"
}
```

**`public/locales/cs/translation.json`:**
```json
"menu": {
  ...
  "cybersecCheck": "Cybersec-Check"
}
```

Nazwa „Cybersec-Check" jest taka sama we wszystkich 3 językach (brand name — nie wymaga tłumaczenia).

---

## SEO — wpływ zmian

Dodanie `<Navbar />` do `FormularzPage` nie wpłynie negatywnie na SEO:
- `<Helmet>` z `<title>`, `<meta description>`, `canonical`, `hreflang` i Open Graph pozostaje bez zmian (linie 309–327).
- Navbar renderuje się jako część DOM po stronie klienta — crawlery widzą prerendered HTML z edge function.
- Logotyp w Navbar to `<Link to="/${currentLocale}">` — poprawna wewnętrzna nawigacja.

---

## Podsumowanie zmian

| Plik | Co się zmienia |
|---|---|
| `src/pages/formularz/FormularzPage.tsx` | Zamiana custom headera na `<Navbar />`, dodanie `pt-20` do `<main>` |
| `src/components/Navbar.tsx` | Dodanie fioletowego CTA przycisku Cybersec-Check + stała `CYBERSEC_HREF` |
| `src/components/MobileMenu.tsx` | Dodanie linku Cybersec-Check w panelu mobilnym |
| `public/locales/pl/translation.json` | Nowy klucz `menu.cybersecCheck` |
| `public/locales/en/translation.json` | Nowy klucz `menu.cybersecCheck` |
| `public/locales/cs/translation.json` | Nowy klucz `menu.cybersecCheck` |

Brak zmian w: bazie danych, edge functions, `netlify.toml`, `App.tsx`, `SEOHead`.
