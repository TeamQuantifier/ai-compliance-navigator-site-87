
# Plan naprawy SEO — quantifier.ai

## Diagnoza (potwierdzona testami)

| Test | Wynik |
|---|---|
| `/en/frameworks/dora` | HTTP 200, etag X |
| `/en/frameworks/dora/` | HTTP 200, **ten sam etag X** |
| `/en/frameworks` vs `/en/frameworks/` | oba 200, ten sam content |
| `/cs/partneri`, `/pl/partnerzy`, `/en/partners/gs1-polska`, `/en/frameworks/product-level/dpp` | wszystkie 200 |
| `llms.txt` | 200, ale ma DWA bloki `>` po H1 (drugi to link do `llms-full.txt`) |
| `SoftwareApplication` JSON-LD bez `aggregateRating` | w 11 plikach (Index, GrcPlatform, Nis2Ksc, ComparePage, Iso27001, Dora, Features, Hipaa, Gdpr, Soc, Ccpa) |

**Źródło problemu slash/non-slash:** SPA fallback Netlify `/*` → `/index.html` 200 serwuje aplikację dla każdej ścieżki, niezależnie od slasha. Canonical w `PageTemplate` jest zawsze ze slashem (`ensureTrailingSlash`), więc polityka = **trailing slash**, ale brakuje 301 wymuszającego non-slash → slash. To samo dotyczy edge function `bot-prerender` — zwraca treść dla obu wariantów.

**Źródło problemu hreflang:** dla stron bez prawdziwej lokalizacji (np. `dpp` istnieje tylko po EN), `PageTemplate` generuje hreflangi do `/pl/...` i `/cs/...` które technicznie zwracają 200 (SPA fallback), ale canonical na tych podstronach wskazuje inną stronę → brak self-reference reciprocity. Semrush widzi 36 konfliktów.

## Zakres zmian (priorytet)

### 1. Polityka trailing slash (jeden wariant 200, drugi 301)

**Plik:** `netlify.toml` — dodać przed SPA fallback:
- 301 dla `/:locale/*` bez końcowego slasha → wariant ze slashem (uwzględnić wyjątki: root `/pl`, `/en`, `/cs` zostają bez slasha jak dziś, asset paths z kropką pomijamy).
- Reguła musi działać dla wszystkich poziomów: `/en/frameworks` → `/en/frameworks/`, `/en/frameworks/dora` → `/en/frameworks/dora/`.

**Plik:** `netlify/edge-functions/bot-prerender.ts` — przed proxy do prerender: jeżeli ścieżka nie kończy się `/` i nie jest assetem ani language root, zwróć `301` do wariantu ze slashem. To zapobiegnie serwowaniu duplikatu botom.

**Weryfikacja:** `/en/frameworks/dora` → 301 → `/en/frameworks/dora/` → 200.

### 2. Generator hreflang — emitować TYLKO istniejące tłumaczenia

**Plik:** `src/lib/localized-routes.ts` — rozbudować `LOCALIZED_SEGMENTS` o explicit listę stron, które MAJĄ wszystkie 3 wersje, oraz nową funkcję `getAvailableLocales(path)` zwracającą tylko realnie istniejące lokalizacje danej strony (domyślnie wszystkie 3, ale dla wybranych ścieżek np. `frameworks/product-level/dpp` zawęzić do `['en']`).

**Plik:** `src/components/PageTemplate.tsx` — w sekcji `hreflangUrls`:
- użyć `getAvailableLocales(currentPath)`,
- zawsze dołożyć self-reference (już jest, ale upewnić się że jest pierwszy),
- `x-default` → EN tylko jeśli EN istnieje, inaczej `currentLocale`,
- canonical zawsze w języku bieżącej strony (już OK).

**Plik:** `src/components/seo/SEOHead.tsx` — analogicznie dla bloga/stories (już ma `alternates`, ale dorobić self-reference fallback gdy `alternates` jest puste).

### 3. JSON-LD: zamiana SoftwareApplication → @graph (Service + Org + WebSite + BreadcrumbList)

**Nowy plik:** `src/lib/seo-schema.ts` — eksportuje:
- `buildOrganizationSchema()` — `@id: https://quantifier.ai/#organization`
- `buildWebsiteSchema()` — `@id: https://quantifier.ai/#website`
- `buildServiceSchema({ name, url, areaServed, serviceType })`
- `buildGraphSchema(parts[])` — zwraca `{ "@context": ..., "@graph": [...] }`

**Edycja plików:** 11 stron z `SoftwareApplication` — zastąpić blokiem `@graph` z Organization + WebSite + Service (gdy strona to framework/platform) + BreadcrumbList. Bez `aggregateRating`/`review`.
- `src/pages/Index.tsx` — Organization + WebSite (homepage)
- `src/pages/seo-landing/GrcPlatform.tsx`, `Nis2Ksc.tsx` — Service
- `src/pages/frameworks/**/*.tsx` (Iso27001, Dora, Gdpr, Soc, Hipaa, Ccpa) — Service per framework
- `src/pages/product/Features.tsx` — Service "AI-Native GRC Platform"
- `src/pages/compare/ComparePage.tsx` — Service comparison + BreadcrumbList (bez SoftwareApplication)

### 4. Duplicate content (4 strony z Semrush)

- **`/en/frameworks/product-level/dpp`** — strona istnieje tylko po EN. Po fixie #2 hreflang nie będzie wskazywał PL/CS. Sprawdzić, czy treść jest unikalna względem rodzica `/en/frameworks/product-level/`; jeśli nie — dopisać unikalny H1/meta/intro w `src/pages/frameworks/ProductLevel.tsx` / `ProductLevelHub.tsx`.
- **`/en/partners/gs1-polska`** — sprawdzić `src/pages/partners/Gs1Polska.tsx`, dodać unikalny title/meta/H1 (case study GS1 + Envirly).
- **`/pl/partnerzy`, `/cs/partneri`** — to istniejące lokalizacje `Partners.tsx`. Duplikat wynika prawdopodobnie z tej samej treści EN (placeholder). Zweryfikować w `i18n` translation.json — jeśli braki, uzupełnić unikalne tłumaczenia.

### 5. llms.txt — naprawa H1/blockquote

**Plik:** `supabase/functions/llms-txt/index.ts` — w `HEADER` jest H1 + jeden `>`, ale potem dodawana jest druga linia `> For comprehensive details, see [llms-full.txt]`. Semrush wymaga pojedynczego blockquote bezpośrednio po H1.
- Połączyć obie linie w jeden blockquote (`>` + treść + ` See also...` w tej samej linii lub jako osobny paragraf bez `>`).
- Zweryfikować odstępy: pusta linia po H1, pusta linia po blockquote, pusta linia przed każdym `##`.
- Po zmianie zdeployować edge function.

### 6. Sitemap — tylko canonical (ze slashem)

**Plik:** `supabase/functions/sitemap/index.ts` — audyt, upewnić się że każdy `<loc>` kończy się slashem (poza language rootami zgodnie z dotychczasowym standardem). Usunąć ewentualne URL-e do stron nieistniejących w danym języku (dpp PL/CS).

### 7. Internal links — sweep

`rg -n "href=\"/[a-z]{2}/[^\"]*[^/\"]\"" src/` aby znaleźć linki bez końcowego slasha; poprawić w komponentach nawigacji (`Navbar`, `MegaMenu`, `Footer`, `MobileMenu`, sekcje related).

## Kolejność wdrożenia

1. `netlify.toml` + `bot-prerender.ts` (slash policy) — natychmiastowy efekt na duplicate URL
2. `localized-routes.ts` + `PageTemplate.tsx` + `SEOHead.tsx` (hreflang reciprocity)
3. `seo-schema.ts` + zamiana 11 plików (SoftwareApplication → @graph)
4. `llms-txt` edge function (format)
5. `sitemap` edge function (audit canonical)
6. Treść unikalna na 4 stronach duplicate
7. Wewnętrzne linki — sweep i fix
8. Deploy → Rich Results Test → Semrush recrawl

## Testy akceptacyjne

- `curl -I /en/frameworks/dora` → 301; `/en/frameworks/dora/` → 200
- każda strona ma w `<head>` 3 lub mniej `<link rel="alternate" hreflang>` + `x-default`, w tym self-reference
- `Rich Results Test` dla DORA/NIS2/ISO/SOC/GDPR/Homepage → 0 błędów, brak SoftwareApplication bez rating
- `curl /llms.txt` → poprawny markdown (1× H1, 1× `>`, sekcje z pustymi liniami)
- Semrush recrawl: 0 duplicate content / 0 invalid structured data / 0 hreflang conflicts / 0 llms.txt warning

## Czego NIE robię

- Nie dodaję fałszywych `aggregateRating`/`review`.
- Nie przepisuję pojedynczych stron — fixuję generatory (PageTemplate, SEOHead, schema lib, netlify, edge function).
- Nie ruszam `src/integrations/supabase/client.ts` ani auto-gen plików.
- Nie wprowadzam SSR — istniejący `bot-prerender` + `prerender-marketing` zostają, jedynie dodaję w nich obsługę 301.
