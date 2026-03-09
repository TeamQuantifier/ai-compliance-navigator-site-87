

## Analiza audytu SEO/GEO v2 — co jest zrobione, co można zrobić w Lovable, co ręcznie

### Status poszczególnych FIX-ów z audytu

| FIX | Status | Gdzie |
|-----|--------|-------|
| **FIX 1**: Fallback meta w index.html | **ZROBIONY** | Właśnie zaktualizowaliśmy title, description, OG, robots |
| **FIX 2**: Redirect `/` → `/en` (301) | **DO ZROBIENIA** w Lovable | netlify.toml |
| **FIX 3**: Hreflang w sitemap | **ZROBIONY** w dynamic sitemap | Edge function `/functions/v1/sitemap` już ma `xhtml:link hreflang` |
| **FIX 4**: `<noscript>` fallback content | **DO ZROBIENIA** w Lovable | index.html |
| **FIX 5**: Usunięcie starych URL-ów | **RĘCZNIE** | Google Search Console |
| **FIX 6**: Request indexing | **RĘCZNIE** | Google Search Console |
| **FIX 7**: lastmod w sitemap | **ZROBIONY** w dynamic sitemap | Edge function już ma `<lastmod>` |

### Problem: statyczny sitemap.xml vs dynamiczny

Masz **dwa sitemapa**:
1. `public/sitemap.xml` — statyczny, 82 URL-e, **BEZ hreflang, BEZ lastmod** (przestarzały)
2. `/functions/v1/sitemap` — dynamiczny, **MA hreflang + lastmod + blog/stories** (poprawny)

`robots.txt` wskazuje na oba. Statyczny `sitemap.xml` w Vercel jest rewritowany do dynamicznego (linia 148 vercel.json), więc na Vercel to działa. Ale na Netlify statyczny plik jest serwowany bezpośrednio. **To jest problem** — Google może crawlować statyczny sitemap (bez hreflang) zamiast dynamicznego.

### Co musisz zrobić RĘCZNIE (Google Search Console)

1. **Usuń stary URL `/contact.html`**: GSC → Removals → wpisz `https://quantifier.ai/contact.html` → Request removal. Redirect 301 już istnieje w netlify.toml (linia 70-72), ale Google potrzebuje sygnału do re-crawlowania.

2. **Request indexing kluczowych stron** (po wdrożeniu FIX 2 i 4):
   - `/en/`, `/pl/`, `/en/frameworks/iso-27001/`, `/en/frameworks/nis-ii/`, `/en/frameworks/soc/`, `/en/frameworks/gdpr/`, `/en/frameworks/esg/`, `/en/product/`, `/en/blog/`, `/en/contact/`
   - GSC → URL Inspection → wklej URL → Request indexing
   - Limit: ~10 requestów dziennie, rozłóż na 2 dni

3. **Sprawdź pokrycie indeksacji**: GSC → Pages → sprawdź ile stron jest zaindeksowanych vs ile sitemap zgłasza. Jeśli < 10, to problem z crawlowaniem.

4. **Dodaj dynamiczny sitemap w GSC**: GSC → Sitemaps → dodaj `https://quantifier.ai/functions/v1/sitemap` (jeśli jeszcze nie jest dodany). To jest pełny sitemap z hreflang.

### Co mogę zrobić w Lovable (2 zmiany)

**1. FIX 2: Redirect `/` → `/en/` (301)**

Dodanie w `netlify.toml` (przed SPA fallback):
```toml
[[redirects]]
  from = "/"
  to = "/en/"
  status = 301
  force = true
```

Uwaga: to zastąpi obecny React client-side redirect (`RedirectToPreferredLocale`), który wykrywa język przeglądarki. Dla SEO to lepsze (czysty 301 dla botów), ale użytkownicy PL/CS zawsze trafią najpierw na `/en/` zamiast na swój język. Jeśli chcesz zachować detekcję języka, **NIE rób tego** — obecna architektura (Netlify Prerender serwuje boty pełnym HTML z canonical na `/en/`, a użytkownicy dostają React redirect) jest OK.

**Moja rekomendacja**: NIE dodawaj 301 na `/`. Prerendering już obsługuje boty poprawnie. Client-side redirect dla użytkowników jest lepszy UX. Problem z SERP-em nie wynika z braku 301, ale z tego że Google czasem cachuje stare snapshoty.

**2. FIX 4: `<noscript>` fallback content w index.html**

Dodanie `<noscript>` bloku z podstawową treścią i linkami do podstron. To daje crawlerom bez JS (i narzędziom SEO spoza listy prerenderingu) minimum kontekstu zamiast pustego `<div id="root">`.

**3. Aktualizacja statycznego `public/sitemap.xml`**

Statyczny sitemap powinien albo zostać usunięty (i polegać tylko na dynamicznym), albo zaktualizowany z hreflang i lastmod. Najprostsze rozwiązanie: zamienić go na redirect do dynamicznego w netlify.toml (co vercel.json już robi).

### Podsumowanie priorytetów

| Priorytet | Akcja | Kto |
|-----------|-------|-----|
| WYSOKI | `<noscript>` fallback w index.html | Lovable |
| WYSOKI | Request indexing w GSC po zmianach | Ty ręcznie |
| ŚREDNI | Usunięcie `/contact.html` z indeksu GSC | Ty ręcznie |
| ŚREDNI | Dodanie dynamicznego sitemap URL w GSC | Ty ręcznie |
| NISKI | Redirect `/` → `/en/` 301 | Opcjonalnie (prerendering już to obsługuje) |

Czy chcesz żebym wdrożył `<noscript>` fallback w index.html?

