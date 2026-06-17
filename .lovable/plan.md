# Audyt SEO artykułów dodawanych przez CMS

## Co działa automatycznie (potwierdzone na żywym artykule)

Przykład: `https://quantifier.ai/en/blog/nis2-spreadsheet-vs-grc-platform`

Każdy post/story dodany przez CMS dostaje z `SEOHead` + `useAlternates`:

- **`<title>`** — `meta_title` lub `{title} | Quantifier.ai`
- **`<meta name="description">`** — `meta_desc` / `excerpt`
- **`<link rel="canonical">`** — self-URL z wymuszonym trailing slash, lub `canonical_url` z bazy (jeśli ustawiony — wtedy hreflang jest celowo wyłączony, bo strona jest konsolidowana)
- **`<link rel="alternate" hreflang>`** — automatycznie z tabeli `alternates` po `group_id`:
  - self (`en`)
  - `pl-PL` (geo-targeting PL)
  - `cs-CZ` (geo-targeting CZ)
  - `x-default` → wersja EN
- **Open Graph** — `og:title/description/url/image/locale` + `og:locale:alternate` dla każdej wersji
- **Twitter Card** — `summary_large_image` z fallbackami
- **`article:published_time` / `modified_time` / `tag`**
- **JSON-LD**: `BlogPosting` (+ opcjonalny `schema_json_override` np. FAQPage) + `BreadcrumbList`
- **`<html lang>`** — dynamicznie przez `react-helmet-async`
- **Sitemap & RSS** — edge function automatycznie podbija nowe wpisy
- **301 redirect przy zmianie sluga** — `useSlugRedirect`

Czyli: **TAK, nowe artykuły są automatycznie skonfigurowane pod SEO** o ile w CMS uzupełnione są 3 wersje językowe powiązane `group_id`.

## Znaleziony bug (wymaga fixa)

Na żywej stronie hreflang dla CS ma **podwójny slash**:

```
<link rel="alternate" hreflang="cs-CZ"
      href="https://quantifier.ai/cs/blog//nis2-excel-nebo-grc-platforma/">
```

Przyczyna: czeski wpis ma slug zapisany w bazie z wiodącym `/` (`/nis2-excel-nebo-grc-platforma`), a `SEOHead` skleja URL przez `` `${BASE_URL}/${lang}/${basePath}/${alt.slug}` ``. Skutek: Google widzi 404-podobny URL i może nie powiązać wersji językowych.

## Plan naprawy

1. **`src/components/seo/SEOHead.tsx`** — znormalizować slug przed sklejeniem URL:
   - dodać helper `stripSlashes(s)` (usuwa wiodące/końcowe `/`)
   - zastosować do `slug` w `selfUrl` oraz do `alt.slug` w `alternateLinks`
   - to samo dla `basePath` jeżeli zaszłaby kiedyś podobna pomyłka

2. **Sanityzacja przy zapisie w CMS** (defensywnie, żeby nie wracało):
   - `src/pages/admin/PostEditor.tsx` i `StoryEditor.tsx` — przy zapisie `slug` zrobić `.trim().replace(/^\/+|\/+$/g, '')`
   - to samo w `alternates` (tabela trzyma `target_slug`) — jeżeli zapis idzie przez ten sam formularz, czyścić tam też

3. **Migracja czyszcząca dane historyczne** (jednorazowo):
   ```sql
   UPDATE public.posts
     SET slug = regexp_replace(slug, '^/+|/+$', '', 'g')
     WHERE slug LIKE '/%' OR slug LIKE '%/';
   UPDATE public.stories  SET slug = regexp_replace(slug, '^/+|/+$', '', 'g')
     WHERE slug LIKE '/%' OR slug LIKE '%/';
   UPDATE public.alternates SET target_slug = regexp_replace(target_slug, '^/+|/+$', '', 'g')
     WHERE target_slug LIKE '/%' OR target_slug LIKE '%/';
   ```
   (Nazwy kolumn potwierdzę przed migracją — `alternates` może mieć `slug` zamiast `target_slug`.)

4. **Weryfikacja** po wdrożeniu:
   - `curl -sL https://quantifier.ai/en/blog/nis2-spreadsheet-vs-grc-platform | grep hreflang`
     → wszystkie 3 hreflangi bez `//`
   - sprawdzić 1-2 inne artykuły z 3 wersjami, czy slugi są spójne
   - zaktualizować `mem://i18n/content-slug-switching-logic-v2` o regułę „slug bez wiodącego `/`"

## Co NIE jest zmieniane

- Logika hreflang, canonical, JSON-LD — działa poprawnie
- Routing, prerender, sitemap
- Treść artykułów
