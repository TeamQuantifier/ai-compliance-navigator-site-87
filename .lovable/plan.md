

## Plan: Naprawa "Brak tagów" w Tag Assistant na stronach prerenderowanych

### Diagnoza problemu

Tag Assistant skanuje strony jako **bot** (User-Agent typu bot). Trzy raportowane URL-e to strony zwracane przez **edge functions prerenderujące** dla botów:

| URL | Funkcja zwracająca HTML | Co widzi Tag Assistant |
|-----|------------------------|------------------------|
| `/en/frameworks/product-level/dpp` | `prerender-marketing` | Brak GTM, brak GA4, brak Consent Mode |
| `/pl/blog/dyrektywa-nis2` | `prerender-post` | Brak GTM, brak GA4, brak Consent Mode |
| `/pl/product` | `prerender-marketing` | Tylko GA4 (G-H6H8QRZF1R) — nieprawidłowy, bo brak GTM-5LLXS7KR |

**Dlaczego `/pl/product` pokazuje GA4 a nie GTM:** prawdopodobnie ta strona w pewnych przypadkach jest serwowana z klienta SPA, gdzie `index.html` ładuje gtag (Consent Mode), ale GTM ładuje się tylko po zgodzie marketingowej w `script-loader.ts` — a bot nie wyrazi zgody.

**Główna przyczyna:** żadna z trzech funkcji prerender (`prerender-marketing/index.ts`, `prerender-post/index.ts`, `prerender-story/index.ts`) nie wstawia w `<head>` tagów GTM ani Consent Mode v2 default. Boty dostają HTML bez jakiegokolwiek śladu po tagach.

### Rozwiązanie

Wstrzykiwać do prerenderowanego HTML **dwa elementy**, identyczne jak w `index.html`:

1. **Google Consent Mode v2 default denied** (skrypt inicjalizujący `dataLayer` + `gtag('consent', 'default', ...)`)
2. **GTM container snippet** (`GTM-5LLXS7KR`) ładujący `https://www.googletagmanager.com/gtm.js?id=GTM-5LLXS7KR`

Tag Assistant wykrywa GTM po obecności URL `googletagmanager.com/gtm.js?id=GTM-XXXXX` w HTML lub po wykonaniu JS — wstawienie samego snippetu w `<head>` wystarczy do wykrycia kontenera (w stanie `denied`, więc bez naruszenia RODO).

### Zmiany — pliki

#### 1. `supabase/functions/prerender-marketing/index.ts`
- W szablonie HTML (~linia 2900, sekcja `<head>`) — dodać blok skryptów Consent Mode + GTM **bezpośrednio po `<meta charset>`**, przed pozostałymi metatagami.
- Wynik: boty otrzymają snippet GTM w head + `<noscript>` iframe w `<body>`.

#### 2. `supabase/functions/prerender-post/index.ts`
- Analogicznie wstrzyknąć ten sam blok Consent Mode + GTM w `<head>` generowanym dla artykułów blogowych.

#### 3. `supabase/functions/prerender-story/index.ts`
- Analogicznie wstrzyknąć ten sam blok w `<head>` dla case studies.

#### 4. Refaktor — wspólny helper (opcjonalnie, dla DRY)
- Utworzyć `supabase/functions/_shared/tracking-snippets.ts` eksportujący stałe `CONSENT_MODE_DEFAULT_DENIED` i `GTM_HEAD_SNIPPET` + `GTM_NOSCRIPT_BODY`, importowany przez wszystkie trzy funkcje prerender. Zapobiega dryfowi konfiguracji w przyszłości.

### Zgodność z RODO

- Consent Mode default `denied` dla wszystkich kategorii poza `security_storage` — żadne ciasteczka analityczne/marketingowe nie zostaną zapisane bez zgody.
- GTM container ładuje się, ale wszystkie tagi w środku respektują sygnał `denied` (cookieless pings + conversion modeling).
- Identyczna logika jak już zaimplementowana w `index.html` dla SPA — rozszerzamy ją na ścieżkę bot/prerender.

### Po wdrożeniu

Tag Assistant powinien pokazać status **"Otagowana" (denied)** zamiast "Brak tagów" dla wszystkich trzech URL-i oraz wszystkich pozostałych prerenderowanych stron (frameworks, blog posts, success stories).

