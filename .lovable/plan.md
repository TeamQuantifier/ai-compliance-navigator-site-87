

## Analiza raportu SEO/GEO vs. rzeczywisty stan strony

### Kluczowe odkrycie: raport jest w dużej mierze nieaktualny

Raport ocenia stronę na 31/100, ale **większość krytycznych problemów została już rozwiązana** w kodzie. Audytor prawdopodobnie analizował surowy HTML source (bez prerenderingu), co dało fałszywie niskie wyniki.

**Już zaimplementowane (raport się myli):**
- robots.txt z regułami dla AI crawlerów (GPTBot, ClaudeBot, PerplexityBot)
- Dynamiczny sitemap (edge function) + statyczny sitemap.xml
- llms.txt + llms-full.txt (standard llmstxt.org)
- Schema.org: Organization, WebSite, SoftwareApplication, BreadcrumbList, DefinedTermSet, FAQPage
- hreflang (en, pl-PL, cs-CZ + x-default)
- Canonical tags z trailing slash
- OG + Twitter Card meta tags
- Prerendering: Netlify Prerender Extension + 3 custom Edge Functions (marketing, blog, stories)
- 301 redirecty z Envirly

### Co NAPRAWDĘ trzeba jeszcze zrobić (6 zmian w kodzie)

**1. Dodać `alternateName: "Envirly"` do Organization schema (Index.tsx)**
Raport słusznie wskazuje na problem dual-brand. AI modele mogą traktować Envirly i Quantifier jako osobne byty. Dodanie `alternateName` + `sameAs` do Crunchbase/Envirly rozwiąże entity disambiguation.

**2. Dodać LocalBusiness schema dla Google Moja Firma**
Skoro założyłeś wizytówkę Google — potrzebny schema LocalBusiness z adresami (Warszawa, Lublin, SF) zsynchronizowany z danymi w GBP. To wzmocni local SEO i knowledge panel.

**3. Dodać security headers w netlify.toml**
Brak HSTS, CSP, X-Frame-Options. Dla platformy compliance to szczególnie ważne — Google i użytkownicy oceniają security headers. Prosty wpis w netlify.toml.

**4. Utworzyć RSS feed dla bloga (edge function)**
Brak RSS = AI aggregatory i czytniki nie śledzą nowych treści. Edge function `rss-feed` generujący Atom/RSS z opublikowanych postów.

**5. Poprawić statyczny sitemap.xml — dodać trailing slashes**
Statyczny sitemap.xml w `public/` nie ma trailing slashes (np. `/en/product` zamiast `/en/product/`), co powoduje rozbieżność z canonical URLs i dynamicznym sitemap.

**6. Dodać `sameAs` links do Organization schema**
Brakuje linków do Crunchbase, Envirly.pl, LinkedIn co-founderów. To kluczowe dla entity recognition przez AI.

### Czego NIE da się zrobić w kodzie (akcje zewnętrzne)
- Rejestracja na G2/Capterra/Gartner — wymaga ręcznych zgłoszeń
- Wpis w Wikidata — ręczne tworzenie
- Budowa backlinków (PR, guest posts) — poza scope
- Konfiguracja Netlify Prerender w dashboardzie — ręczna zmiana ustawienia "Wait for window.prerenderReady"
- Aktualizacja Crunchbase z nowym brandem — ręczna

### Podsumowanie priorytetów
| Zmiana | Wpływ | Nakład |
|--------|-------|--------|
| alternateName + sameAs w Organization | Wysoki (entity) | Niski |
| LocalBusiness schema | Wysoki (GBP sync) | Niski |
| Security headers (netlify.toml) | Średni (trust) | Niski |
| RSS feed (edge function) | Średni (AI discovery) | Średni |
| Trailing slashes w statycznym sitemap | Niski (spójność) | Niski |

