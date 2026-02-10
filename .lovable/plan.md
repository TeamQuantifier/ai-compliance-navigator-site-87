

# Naprawa duplikatow w Google Search Console

**Uwaga**: W tresci zapytania pojawia sie "quantifeir.ai" - to literowka. Prawidlowa domena to **quantifier.ai** i tak bedzie uzyta we wszystkich zmianach.

## Analiza obecnego stanu

Po przeglądzie kodu stwierdzam, ze wiekszosc mechanizmow juz istnieje, ale sa luki powodujace problem "Duplikat, uzytkownik nie oznaczyl strony kanonicznej":

| Element | Stan | Problem |
|---------|------|---------|
| Canonical tags (React) | Istnieje w PageTemplate, SEOHead, Index.tsx | Brak trailing slash - Google widzi /en/plans i /en/plans/ jako 2 strony |
| Canonical tags (prerender) | Istnieje w prerender-marketing | Brak trailing slash - niespojnosc |
| Trailing slash redirect | BRAK | Vercel serwuje zawartosc pod obiema wersjami URL |
| www -> non-www | Obslugiwane przez Vercel | OK - ale warto dodac jawny redirect |
| HTTP -> HTTPS | Obslugiwane przez Vercel | OK |
| Sitemap | Dynamiczny, bez trailing slash | Trzeba ujednolicic z trailing slash |
| Robots.txt | Ma link do sitemap | OK |
| Meta robots | Zaimplementowane | OK |
| Parametry URL | stripTrackingParams istnieje | OK |

**Glowna przyczyna problemu**: Brak wymuszenia jednego formatu URL (z lub bez trailing slash). Google indeksuje obie wersje i nie wie, ktora jest kanoniczna.

## Plan naprawy

### 1. Trailing slash - wymuszenie formatu z "/" na koncu

Dodac w `vercel.json` konfiguracje `trailingSlash: true`, ktora automatycznie:
- Przekierowuje 308 (permanent) z `/en/plans` na `/en/plans/`
- Dotyczy wszystkich URL-i

### 2. Canonical tags - dodanie trailing slash

Zaktualizowac generowanie canonical URL we wszystkich miejscach:

**Pliki do edycji:**
- `src/components/PageTemplate.tsx` - dodac trailing slash do canonicalUrl
- `src/components/seo/SEOHead.tsx` - dodac trailing slash do canonicalUrl
- `src/pages/Index.tsx` - dodac trailing slash do canonicalUrl
- `supabase/functions/prerender-marketing/index.ts` - dodac trailing slash do pageUrl
- `supabase/functions/prerender-post/index.ts` - dodac trailing slash
- `supabase/functions/prerender-story/index.ts` - dodac trailing slash

Logika: prosta funkcja `ensureTrailingSlash()` dodajaca `/` na koncu URL jesli go nie ma.

### 3. Sitemap - trailing slash w URL-ach

Zaktualizowac `supabase/functions/sitemap/index.ts`:
- Dodac trailing slash do wszystkich generowanych URL-i (`<loc>` i hreflang `href`)

### 4. Hreflang - trailing slash

Wszystkie tagi hreflang (w PageTemplate, SEOHead, prerender functions, sitemap) musza uzywac URL-i z trailing slash.

### 5. www redirect

Dodac w `vercel.json` jawny redirect 301 z `www.quantifier.ai` na `quantifier.ai`. (Vercel obsluguje to automatycznie jesli domena jest poprawnie skonfigurowana, ale warto dodac jawnie.)

## Szczegoly techniczne

### Nowa funkcja pomocnicza

```typescript
const ensureTrailingSlash = (url: string): string => {
  if (url.endsWith('/')) return url;
  return url + '/';
};
```

### vercel.json - zmiana

Dodac na poczatku pliku:
```json
"trailingSlash": true
```

### Zmiany w canonical URL (przyklad PageTemplate)

```typescript
// Przed:
const canonicalUrl = `${baseUrl}/${currentLocale}${currentPath}`;
// Po:
const canonicalUrl = ensureTrailingSlash(`${baseUrl}/${currentLocale}${currentPath}`);
```

### Zmiany w sitemap (przyklad)

```typescript
// Przed:
const fullPath = `${BASE_URL}/${locale}${page.path}`;
// Po:
const fullPath = ensureTrailingSlash(`${BASE_URL}/${locale}${page.path}`);
```

## Pliki do edycji (8 plikow)

1. `vercel.json` - dodac `trailingSlash: true`
2. `src/components/PageTemplate.tsx` - trailing slash w canonical i hreflang
3. `src/components/seo/SEOHead.tsx` - trailing slash w canonical i hreflang
4. `src/pages/Index.tsx` - trailing slash w canonical i hreflang
5. `supabase/functions/sitemap/index.ts` - trailing slash we wszystkich URL-ach
6. `supabase/functions/prerender-marketing/index.ts` - trailing slash w canonical, hreflang, og:url
7. `supabase/functions/prerender-post/index.ts` - trailing slash
8. `supabase/functions/prerender-story/index.ts` - trailing slash

## Elementy ktore juz dzialaja (bez zmian)

- HTTP -> HTTPS: Vercel wymusza automatycznie
- www -> non-www: Vercel obsluguje (jesli domena skonfigurowana poprawnie)
- Meta robots noindex: Juz zaimplementowane w PageTemplate (`noIndex` prop)
- Parametry URL: `stripTrackingParams()` juz dziala
- Robots.txt: Juz ma link do sitemap

