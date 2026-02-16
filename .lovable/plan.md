

# Naprawa indeksowania -- przeniesienie prerenderingu na Netlify

## Diagnoza

Wszystkie wymienione strony sa **poprawnie skonfigurowane** pod wzgledem SEO:
- Trasy istnieja w React Router
- Tagi canonical sa ustawiane poprawnie przez `PageTemplate`
- Hreflang jest generowany dla en, pl-PL, cs-CZ

**Problem**: Strona jest hostowana na **Netlify**, ale logika prerenderingu (przekierowanie botow do edge functions) jest w `vercel.json`, ktory Netlify calkowicie ignoruje. Googlebot dostaje pusty shell HTML bez tresci i musi renderowac JavaScript sam -- co jest wolne i zawodne.

## Status poszczegolnych URL-i

| URL | Trasa | Canonical | Prerender (vercel.json) | Problem |
|-----|-------|-----------|------------------------|---------|
| `/cs/blog` | Tak | Tak | Tak | Netlify ignoruje vercel.json |
| `/cs/plans` | Tak | Tak | Tak | Netlify ignoruje vercel.json |
| `/pl` | Tak | Tak | Tak | Netlify ignoruje vercel.json |
| `/cs/frameworks/iso-27001` | Tak | Tak | Tak | Netlify ignoruje vercel.json |
| `/en/frameworks/iso-27001` | Tak | Tak | Tak | Netlify ignoruje vercel.json |
| `/pl/frameworks/iso-27001` | Tak | Tak | Tak | Netlify ignoruje vercel.json |
| `/cs/frameworks/governance` | Tak | Tak | Tak | Netlify ignoruje vercel.json |
| `/en/frameworks/governance` | Tak | Tak | Tak | Netlify ignoruje vercel.json |
| `/pl/frameworks/governance` | Tak | Tak | Tak | Netlify ignoruje vercel.json |
| `/cs/product` | Tak | Tak | Tak | Netlify ignoruje vercel.json |

## Rozwiazanie

Przeniesienie logiki wykrywania botow z `vercel.json` do Netlify Edge Functions (`netlify/edge-functions/`). Netlify Edge Functions pozwalaja na inspekcje naglowkow (user-agent) i dynamiczne przekierowanie botow do naszych istniejacych edge functions prerenderingu.

### Krok 1: Utworzenie Netlify Edge Function do wykrywania botow

Plik: `netlify/edge-functions/bot-prerender.ts`

Funkcja sprawdza `User-Agent` kazdego requestu. Jesli to bot (Googlebot, Bingbot itp.), przekierowuje request do odpowiedniej edge function prerenderingu na backencie. Jesli to zwykly uzytkownik -- przepuszcza request do SPA.

### Krok 2: Konfiguracja Netlify Edge Functions

Plik: `netlify.toml`

Mapowanie sciezek do edge function:
- `/:locale/blog` --> bot-prerender
- `/:locale/plans` --> bot-prerender
- `/:locale/frameworks/*` --> bot-prerender
- `/:locale/product/*` --> bot-prerender
- `/:locale` --> bot-prerender
- itd. dla wszystkich stron z prerenderingiem

### Krok 3: Przeniesienie przekierowan z `vercel.json` do `netlify.toml`

Redirects z `public/_redirects` zostana rowniez przeniesione do `netlify.toml` (bardziej niezawodne niz plik `_redirects`).

## Zakres zmian technicznych

| Plik | Zmiana |
|------|--------|
| `netlify/edge-functions/bot-prerender.ts` | Nowy -- logika wykrywania botow i proxy do prerender functions |
| `netlify.toml` | Nowy -- konfiguracja edge functions + redirects |
| `public/_redirects` | Bez zmian (backup, netlify.toml ma priorytet) |
| `vercel.json` | Bez zmian (zostawiamy na wypadek migracji) |

## Wazne uwagi

- Edge functions prerenderingu (`prerender-marketing`, `prerender-post`, `prerender-story`) musza byc wdrozone (deployed) na backendzie -- to osobny krok
- Netlify Edge Functions dzialaja na Deno runtime, wiec skladnia bedzie kompatybilna
- Po wdrozeniu: Googlebot dostanie pelen HTML z trescia, meta tagami i canonical -- indeksowanie powinno nastapic w 3-7 dni
- Nalezy zglosic ponowne indeksowanie w Google Search Console po publikacji

