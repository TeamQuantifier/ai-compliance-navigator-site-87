## Kontekst

Wyłączyłeś w Netlify obie wtyczki (`Netlify Prerender Extension` + `Prerender.io`). Bardzo dobrze — zgodnie z naszą zasadą Core: *"Use custom Supabase Edge Functions for bot prerendering. Never use Prerender.io."*

Konsekwencja: w tej chwili **żaden bot nie dostaje prerenderowanego HTML** — Googlebot widzi pusty SPA shell z `index.html`. Nasze funkcje Supabase (`prerender-post`, `prerender-marketing`, `prerender-story`) istnieją, ale nikt do nich nie kieruje ruchu. To pilne — każdy dzień bez prerenderingu to utracone crawl budget.

## Plan naprawy (2 etapy)

### Etap 1 — Netlify Edge Function: bot-prerender

Stworzę plik `netlify/edge-functions/bot-prerender.ts` + wpis w `netlify.toml`. Funkcja działa **na edge** (przed origin), czyli przechwytuje żądanie zanim trafi do SPA.

**Logika routingu:**

1. Wykryj User-Agent bota (Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot, facebookexternalhit, LinkedInBot, Twitterbot, Slackbot, etc. — pełna lista ~30 UA).
2. Jeśli to **człowiek** → `return` (Netlify serwuje normalny SPA `index.html`).
3. Jeśli to **bot** → sproxuj do odpowiedniej funkcji Supabase wg ścieżki:
   - `/:locale/blog/:slug/` → `prerender-post?locale=&slug=`
   - `/:locale/success-stories/:slug/` → `prerender-story?locale=&slug=`
   - wszystko inne (`/`, `/:locale/`, `/:locale/frameworks/...`, `/:locale/product/...`, listingi, landings) → `prerender-marketing?path=`
4. Zwróć HTML z funkcji Supabase 1:1 (z poprawnym `Content-Type`, `Cache-Control`, `X-Robots-Tag`).
5. Fallback: jeśli funkcja Supabase zwróci 404/500 → przepuść na SPA (lepszy SPA shell niż 5xx dla Googlebota).

**Dodatkowe zabezpieczenia:**
- Skip dla zasobów statycznych (`/assets/`, `/*.js`, `/*.css`, `/*.png`, sitemap, llms.txt) — te muszą iść na origin/Supabase bez modyfikacji.
- Nagłówek `Vary: User-Agent` żeby Netlify CDN nie zacachował botowej odpowiedzi dla człowieka.
- Logowanie (console) UA + path → łatwy debug w Netlify Function logs.

### Etap 2 — Pełny audyt SEO/GEO + raport

Po deployu skrypt sprawdzi **wszystkie ścieżki z sitemapy** (40+ URL × 3 języki + artykuły blogowe + success stories) w **dwóch wariantach**:

1. **Jako przeglądarka** (`User-Agent: Mozilla/5.0...`) — sprawdź: 200 OK, brak loopów, brak 404.
2. **Jako Googlebot** (`User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)`) — sprawdź:
   - HTTP status 200
   - `<title>` obecny i niegeneryczny
   - `<meta name="description">` obecny, ≤160 znaków, brak duplikatów
   - `<link rel="canonical">` z trailing slash, self-referencing
   - `<link rel="alternate" hreflang>` — wszystkie 3 języki + x-default
   - `<script type="application/ld+json">` obecny (BlogPosting / Article / Organization / WebPage)
   - `<meta property="og:*">` komplet (title, description, image, type, url, locale)
   - `<h1>` obecny i niegeneryczny
   - body content > 500 znaków (nie pusty SPA shell)

**Output:** `/mnt/documents/seo-audit-2026-05-05.csv` + `seo-audit-summary.md` z:
- Statystyki ogólne (X/Y URL-i OK, top issues)
- Lista URL-i z problemami posortowana po severity (Critical: brak title/canonical/JSON-LD; High: hreflang asymmetry; Medium: meta length; Low: missing OG image)
- Per-URL detail z konkretnymi brakami
- Rekomendacje napraw

### Etap 3 — Naprawy znalezionych problemów

Na bazie raportu — naprawy w kolejności priorytetu. Najczęściej spodziewane:
- Niedopisane ścieżki w `prerender-marketing` (np. `/grc-platform`, `/cybersecurity-check`, `/training`).
- Brak JSON-LD na niektórych typach stron.
- Hreflang dla stron które nie mają wszystkich 3 wersji językowych.
- Duplikaty meta description (jeśli prerender doda swoje, a SPA shell też ma).

## Pliki do stworzenia/edycji

**Nowe:**
- `netlify/edge-functions/bot-prerender.ts` — bot detection + proxy do Supabase
- `/mnt/documents/seo-audit-2026-05-05.csv` — raport per-URL
- `/mnt/documents/seo-audit-summary.md` — executive summary

**Edycja:**
- `netlify.toml` — rejestracja Edge Function (`[[edge_functions]] path = "/*" function = "bot-prerender"`)

**Potencjalna edycja po audycie:**
- `supabase/functions/prerender-marketing/index.ts` — uzupełnienie brakujących ścieżek
- `supabase/functions/sitemap/index.ts` — wykluczenie URL-i z 404

## Co dalej z Twojej strony

Po implementacji **musisz kliknąć Publish** w Lovable, żeby Edge Function została wdrożona na Netlify. Edge Functions z `netlify/edge-functions/` są deployowane razem z buildem — nie ma osobnego kroku w panelu Netlify.

Po deployu natychmiast uruchomię audyt na produkcji i wrócę z raportem.
