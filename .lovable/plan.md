# Plan: GTM na /pl/frameworks/soc i /pl/success-stories/case-study-grupa-raben + audyt SEO

## 1. Diagnoza GTM

GTM (`GTM-5LLXS7KR`) ładuje się dynamicznie w `src/lib/script-loader.ts` **wyłącznie po akceptacji cookies marketingowych** (RODO, banner cookies). Dotyczy wszystkich podstron jednakowo — kod nie ma żadnej logiki, która wyłączałaby GTM dla `/pl/frameworks/soc` ani `/pl/success-stories/case-study-grupa-raben`.

Możliwe realne przyczyny "brak tagów" zgłaszane przez Tag Assistant:

- **A.** Tag Assistant otwiera stronę w izolowanym kontekście (`tagassistant.google.com` w iframe) — banner cookies pojawia się od nowa, a bez kliknięcia "Akceptuj wszystkie" GTM się nie inicjalizuje. To zachowanie globalne, nie problem 2 stron.
- **B.** Runtime error w komponencie strony przerywa hydratację Reacta zanim `script-loader` zdąży zareagować na consent. Sprawdzę console + hydration na obu trasach.
- **C.** Edge function `prerender-marketing` serwuje botom HTML bez GTM (to akurat OK dla Googlebota — GTM dla SEO nie jest potrzebny), ale jeśli Tag Assistant trafia na wersję bot — wytłumaczę.

## 2. Co zrobię

1. **Otworzę obie strony w sandboxie** (`browser--navigate_to_sandbox`), zaakceptuję cookies marketingowe, sprawdzę:
   - czy `window.google_tag_manager['GTM-5LLXS7KR']` istnieje,
   - czy `dataLayer` ma `gtm.js` event,
   - request do `googletagmanager.com/gtm.js?id=GTM-5LLXS7KR`,
   - console errors / runtime errors blokujące init.
2. Jeśli GTM nie startuje na konkretnej trasie pomimo zgody → znajdę i naprawię błąd w komponencie (`Soc.tsx` lub `DetailedCaseStudy.tsx` / hooku `useMultiLangStory`).
3. Jeśli GTM startuje normalnie → opiszę dlaczego Tag Assistant pokazuje "brak tagów" (najczęściej: brak akceptacji cookies w iframe Tag Assistant) i podam sposób testu, który zadziała (extension Tag Assistant Legacy po ręcznym akceptowaniu cookies na żywej stronie, albo GTM Preview Mode z `?gtm_debug=...`).

## 3. Audyt SEO

1. **`seo_chat--list_findings`** — odczytam aktualne failing/ignored findings z ostatniego skanu.
2. **`seo_chat--trigger_scan`** — uruchomię świeży skan (wymaga akceptacji użytkownika).
3. Po skanie naprawię wszystkie failing findings w jednym podejściu (typowo: meta title/description, canonical, hreflang, JSON-LD, sitemap). Każdy fix → `seo_chat--update_findings`.

## 4. Interpretacja Semrush (screenshot)

Krótka analiza tego co widać (PL):

- **Słowa kluczowe** rosną od marca 2026: TOP3 (pomarańczowy) wystartowały z 0 → ~5 w maju 2026, TOP4–10 z ~5 → ~14, TOP11–20 z ~10 → ~21. Wszystkie pasma w trendzie wzrostowym = sygnał, że Google odzyskuje zaufanie i zaczyna wynagradzać świeże publikacje / fixy techniczne.
- **Ruch organiczny** (górny wykres) — wzrost z 0 do ~21 wizyt/dz w maju 2026. Niski wolumen bezwzględny, ale **kierunek właściwy**.
- **Przegląd od AI** (różowa) wciąż 0 — nie pojawia się jeszcze w AI Overviews. Tu pomoże dalsza ekspansja klastrów filarowych i JSON-LD (FAQPage, HowTo, DefinedTermSet).

Crawlowanie i ruch robotów — sprawdzę realnie:
- czy `quantifier.ai/sitemap.xml` (edge function) zwraca poprawny XML ze wszystkimi 40+ ścieżkami × 3 języki,
- czy `robots.txt` nie blokuje krytycznych ścieżek,
- czy `prerender-marketing` poprawnie serwuje treść dla Googlebota dla `/pl/frameworks/soc` i `/pl/success-stories/...` (jeśli bot dostaje pustą stronę, indeksacja stoi),
- czy hreflang / canonical są symetryczne.

## 5. Deliverable

- Werdykt + ewentualny fix dla GTM na obu stronach.
- Lista naprawionych failing SEO findings.
- Sekcja "Crawlowanie i ruch robotów" — co aktualnie działa, gdzie są wąskie gardła, 3–5 konkretnych rekomendacji co zrobić, żeby przyspieszyć trend ze screenshotu.

Bez zmian w logice biznesowej — tylko diagnostyka + fixy SEO/tracking.
