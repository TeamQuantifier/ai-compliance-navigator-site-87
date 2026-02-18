
# Dodanie strony `/nis2-check` do indeksowania SEO i sitemapy

## Zakres zmian

Strona `/:locale/nis2-check` istnieje jako działająca trasa React, ale jest **całkowicie niewidoczna dla Google** z dwóch powodów:
1. Brak jej w sitemapie (ani w statycznym `public/sitemap.xml`, ani w dynamicznej funkcji Edge `sitemap/index.ts`)
2. Brak prerenderingu dla botów — `bot-prerender.ts` nie ma jej w `STATIC_ROUTES`, więc Googlebot dostaje pustą aplikację React zamiast HTML

Wymagane zmiany w **4 plikach**:

---

## Plik 1: `netlify/edge-functions/bot-prerender.ts`

Dodanie wpisu `'nis2-check': 'nis2-check'` do słownika `STATIC_ROUTES`:

```typescript
const STATIC_ROUTES: Record<string, string> = {
  // ... istniejące wpisy ...
  'nis2-check': 'nis2-check',   // <-- NOWE
};
```

Dzięki temu Googlebot odwiedzający `/pl/nis2-check`, `/en/nis2-check`, `/cs/nis2-check` zostanie przekierowany do funkcji prerenderującej zamiast dostawać pustą stronę SPA.

---

## Plik 2: `supabase/functions/prerender-marketing/index.ts`

**Dodanie 3 elementów:**

### 2a. Wpis w `pageUrlMap`
```typescript
const pageUrlMap: Record<string, string> = {
  // ... istniejące ...
  'nis2-check': 'nis2-check',
};
```

### 2b. Treść strony w `getPageContent()` dla 3 języków

Dla każdego języka (en, pl, cs) — obiekt `PageData` z:
- `title`: meta title (~60 znaków, z focus keyword "NIS2")
- `description`: meta description (~160 znaków)
- `h1`: nagłówek strony
- `subtitle`: podtytuł
- `sections`: 2-3 sekcje SEO (co to NIS2, kogo dotyczy, jak sprawdzić)
- `faqs`: 3 pytania FAQ w JSON-LD
- `internalLinks`: linki do powiązanych stron (`/frameworks/nis-ii`, `/contact`)

Przykład dla EN:
```typescript
'nis2-check': {
  en: {
    title: 'NIS2 Compliance Checker — Does NIS2 Apply to You? | Quantifier',
    description: 'Answer 4 questions and instantly find out if the NIS2 Directive applies to your company. Free NIS2 compliance check by Quantifier.',
    h1: 'Does your company urgently need to address cybersecurity?',
    subtitle: 'Answer 4 questions and find out whether the NIS2 Directive applies to your company.',
    sections: [
      { h2: 'What is NIS2?', content: [...] },
      { h2: 'Who does NIS2 apply to?', content: [...] },
    ],
    faqs: [
      { question: 'What is the NIS2 Directive?', answer: '...' },
      { question: 'Which companies must comply with NIS2?', answer: '...' },
      { question: 'What are the penalties for non-compliance with NIS2?', answer: '...' },
    ],
    internalLinks: [
      { text: 'NIS2 Compliance Platform', href: '/en/frameworks/nis-ii' },
      { text: 'Contact us', href: '/en/contact' },
    ],
  },
  pl: { ... },
  cs: { ... },
}
```

### 2c. Hreflang — trzy wersje językowe

Funkcja generująca HTML dla tej strony musi emitować poprawne tagi `hreflang` wskazujące na wszystkie 3 wersje językowe (EN, PL-PL, CS-CZ) — tak jak pozostałe strony statyczne.

---

## Plik 3: `supabase/functions/sitemap/index.ts`

Dodanie strony do listy `staticPages`:

```typescript
const staticPages = [
  // ... istniejące wpisy ...
  { path: '/nis2-check', changefreq: 'monthly', priority: '0.8', lastmod: '2026-02-18' },
];
```

Dynamiczna sitemapa automatycznie wygeneruje wpisy dla wszystkich 3 locale (`/en/nis2-check/`, `/pl/nis2-check/`, `/cs/nis2-check/`) wraz z tagami `hreflang`.

---

## Plik 4: `public/sitemap.xml` (statyczny fallback)

Dodanie wpisów dla 3 wersji językowych do statycznego pliku sitemapy (używanego jako fallback gdy funkcja Edge nie jest dostępna):

```xml
<url>
  <loc>https://quantifier.ai/en/nis2-check</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://quantifier.ai/pl/nis2-check</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://quantifier.ai/cs/nis2-check</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

---

## Deployment

Po zapisaniu zmian funkcje Edge (`prerender-marketing`, `sitemap`) zostaną automatycznie wdrożone. Netlify Edge Function (`bot-prerender.ts`) zostanie zaktualizowana przy najbliższym deploy.

---

## Podsumowanie

| Plik | Zmiana | Efekt |
|------|--------|-------|
| `bot-prerender.ts` | +1 wpis w STATIC_ROUTES | Googlebot dostaje HTML zamiast pustego SPA |
| `prerender-marketing/index.ts` | +pageUrlMap, +pageData (3 języki), +hreflang | Prerenderowany HTML z meta tagami i FAQ JSON-LD |
| `sitemap/index.ts` | +1 wpis w staticPages | Dynamiczna sitemapa generuje 3 URL-e z hreflang |
| `public/sitemap.xml` | +3 wpisy URL | Statyczny fallback sitemapy |
