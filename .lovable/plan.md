

# Naprawa obrazu OG — logo Compensa zamiast Quantifier

## Problem

Plik `154104eb-8338-4e4f-884c-2343169fc09b.png` to **logo klienta Compensa Vienna Insurance Group**, ale jest uzywany jako domyslny obraz Open Graph na calej stronie. Dlatego przy udostepnianiu linku na LinkedIn (i innych platformach) wyswietla sie logo Compensa zamiast Quantifier.

Dodatkowo w schematach JSON-LD:
- `BRAND_LOGO` wskazuje na `unicell-logo.png` (logo klienta Unicell)
- Logo organizacji w `Index.tsx` wskazuje na `b5ac5352...png` (logo klienta 4F)

## Plan naprawy

### Krok 1 — Nowy obraz OG

Uzyc `platform-screenshot.png` (screenshot platformy Quantifier) jako domyslny obraz OG. To profesjonalny obraz pokazujacy produkt, idealny do social sharing.

Alternatywnie mozna uzyc `logo-quantifier.png`, ale screenshoty platformy lepiej wypadaja jako thumbnailing na LinkedIn (wiecej szczegolow, lepsze CTR).

### Krok 2 — Zamiana we wszystkich plikach (11 plikow)

Zamienic `154104eb-8338-4e4f-884c-2343169fc09b.png` na `platform-screenshot.png` w:

| Plik | Linia | Co sie zmienia |
|---|---|---|
| `src/components/seo/SEOHead.tsx` | 55 | `DEFAULT_OG_IMAGE` |
| `src/components/seo/SEOHead.tsx` | 57 | `BRAND_LOGO` -> `logo-quantifier.png` |
| `src/components/PageTemplate.tsx` | 148 | domyslny `ogImage` |
| `src/pages/Index.tsx` | 45, 168, 179 | logo organizacji + og:image + twitter:image |
| `src/pages/seo-landing/GrcPlatform.tsx` | 110, 116 | og:image + twitter:image |
| `src/pages/blog/BlogList.tsx` | 114 | fallback image dla postow bez og_image |
| `src/pages/formularz/FormularzPage.tsx` | 323 | og:image |
| `src/hooks/useSeoSettings.ts` | 27 | `defaultOgImage` |
| `netlify/edge-functions/bot-prerender.ts` | 127 | og:image w fallback HTML |
| `supabase/functions/prerender-marketing/index.ts` | 2965, 2972 | og:image + twitter:image |
| `supabase/functions/prerender-post/index.ts` | 72 | fallback image |

### Krok 3 — Naprawa BRAND_LOGO w JSON-LD

Zmienic `BRAND_LOGO` w `SEOHead.tsx` z `unicell-logo.png` na `logo-quantifier.png`.
Zmienic logo organizacji w `Index.tsx` z `b5ac5352...png` na `logo-quantifier.png`.

### Po wdrozeniu

Po publikacji zmian nalezy:
1. Odczekac 24h na propagacje cache
2. Uzyc LinkedIn Post Inspector (https://www.linkedin.com/post-inspector/) aby wymusic odswiezenie cache
3. Uzyc Facebook Sharing Debugger (https://developers.facebook.com/tools/debug/) dla glownych URLi

