
# SEO dla /cybersecurity-check + usunięcie /nis2-check

## Stan obecny

### Problem 1 — Brak tagów SEO w `FormularzPage.tsx`
Strona `/pl/sprawdz-cyberbezpieczenstwo`, `/en/cybersecurity-check` i `/cs/cybersecurity-check` **nie mają żadnych meta tagów** (brak `<Helmet>` / `<title>` / `<meta name="description">`). Użytkownicy odwiedzający stronę bezpośrednio widzą pusty tytuł. Treść SEO istnieje tylko w prerender-bocie dla crawlerów.

### Problem 2 — Stare ścieżki /nis2-check w `App.tsx`
W `App.tsx` są 4 trasy React Router dla `/nis2-check`, które przekierowują do nowych URL-i. Są zbędne — 301-ki obsługuje już `netlify.toml` na poziomie infrastruktury. Utrzymywanie ich w SPA to techniczny dług.

### Problem 3 — newsletter tag `nis2-quiz` w `FormularzPage.tsx`
Na linii 256 w `FormularzPage.tsx` tagi newsletterowe zawierają `'nis2-quiz'` — powinny być zaktualizowane do `'cybersecurity-check'`.

---

## Co zostanie zmienione

### Plik 1: `src/pages/formularz/FormularzPage.tsx`

**Dodanie `<Helmet>` z pełnymi tagami SEO**

Zaimportujemy `Helmet` z `react-helmet-async` i dodamy blok meta przed `<div className="min-h-screen...">`:

```tsx
<Helmet>
  <title>{SEO_META_TITLE[lang]}</title>
  <meta name="description" content={SEO_META_DESC[lang]} />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={canonicalUrl} />
  
  {/* hreflang — geo-targeting */}
  <link rel="alternate" hrefLang="pl-PL" href="https://quantifier.ai/pl/sprawdz-cyberbezpieczenstwo/" />
  <link rel="alternate" hrefLang="en" href="https://quantifier.ai/en/cybersecurity-check/" />
  <link rel="alternate" hrefLang="cs-CZ" href="https://quantifier.ai/cs/cybersecurity-check/" />
  <link rel="alternate" hrefLang="x-default" href="https://quantifier.ai/en/cybersecurity-check/" />

  {/* Open Graph */}
  <meta property="og:title" content={SEO_OG_TITLE[lang]} />
  <meta property="og:description" content={SEO_META_DESC[lang]} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content="https://quantifier.ai/lovable-uploads/154104eb-8338-4e4f-884c-2343169fc09b.png" />
  <meta property="og:locale" content={ogLocale} />
  
  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={SEO_OG_TITLE[lang]} />
  <meta name="twitter:description" content={SEO_META_DESC[lang]} />
</Helmet>
```

**Dodanie stałych SEO** (nad funkcją `FormularzPage`):

```ts
const SEO_META_TITLE: Record<QuizLang, string> = {
  pl: 'Sprawdź cyberbezpieczeństwo firmy — NIS2 i ISO 27001 | Quantifier',
  en: 'Cybersecurity Check — Does Your Company Need to Act? | Quantifier',
  cs: 'Zkontrolujte kybernetickou bezpečnost firmy — NIS2 a ISO 27001 | Quantifier',
};

const SEO_META_DESC: Record<QuizLang, string> = {
  pl: 'Odpowiedz na 4 pytania i dowiedz się, czy NIS2 lub ISO 27001 dotyczy Twojej organizacji. Bezpłatny test cyberbezpieczeństwa od Quantifier.',
  en: 'Answer 4 questions and find out if the NIS2 Directive or ISO 27001 applies to your company. Free cybersecurity compliance check by Quantifier.',
  cs: 'Odpovězte na 4 otázky a zjistěte, zda se směrnice NIS2 nebo ISO 27001 vztahuje na vaši organizaci. Bezplatná kontrola od Quantifier.',
};

const SEO_OG_TITLE: Record<QuizLang, string> = {
  pl: 'Sprawdź cyberbezpieczeństwo Twojej firmy | Quantifier',
  en: 'Cybersecurity Check for Your Company | Quantifier',
  cs: 'Zkontrolujte kybernetickou bezpečnost vaší firmy | Quantifier',
};

const CANONICAL_URLS: Record<QuizLang, string> = {
  pl: 'https://quantifier.ai/pl/sprawdz-cyberbezpieczenstwo/',
  en: 'https://quantifier.ai/en/cybersecurity-check/',
  cs: 'https://quantifier.ai/cs/cybersecurity-check/',
};
```

**Aktualizacja tagu newsletterowego** (linia 256):
```ts
// PRZED:
tags: ['nis2-quiz', `result-${resultKey.toLowerCase()}`],
customer_message: resultKey,

// PO:
tags: ['cybersecurity-check', `result-${resultKey.toLowerCase()}`],
customer_message: resultKey,
```

---

### Plik 2: `src/App.tsx`

**Usunięcie 4 redundantnych tras `/nis2-check`** — są to linie 215–218:

```tsx
{/* Legacy redirects from old nis2-check URLs */}
<Route path="/pl/nis2-check" element={<Navigate to="/pl/sprawdz-cyberbezpieczenstwo" replace />} />
<Route path="/en/nis2-check" element={<Navigate to="/en/cybersecurity-check" replace />} />
<Route path="/cs/nis2-check" element={<Navigate to="/cs/cybersecurity-check" replace />} />
<Route path="/:locale/nis2-check" element={<Navigate to="/en/cybersecurity-check" replace />} />
```

Te przekierowania obsługuje już `netlify.toml` (linie 69–83) jako prawdziwe 301-ki HTTP. Redundantne trasy React Router były tylko SPA-level fallback — niepotrzebne.

---

## Pliki zmieniane

| Plik | Co się zmienia |
|---|---|
| `src/pages/formularz/FormularzPage.tsx` | Dodanie `<Helmet>` z pełnymi meta tagami, stałe SEO, poprawka tagu newsletter |
| `src/App.tsx` | Usunięcie 4 tras `/nis2-check` |

Brak zmian w: `netlify.toml`, `prerender-marketing/index.ts`, bazie danych.
