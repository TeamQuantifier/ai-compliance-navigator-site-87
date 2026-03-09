

## Analiza 6 punktów z audytu

### Punkt 1: Redirect `/` → `/en/` (301)

**Status: Brakuje.** W `netlify.toml` nie ma reguły dla `/`. Catch-all `/* → /index.html 200` na linii 274 łapie `/` i serwuje SPA (status 200). Google widzi `/` i `/en/` jako dwie strony z tym samym contentem.

**Fix**: Dodać redirect z `force = true` PRZED catch-all:
```toml
[[redirects]]
  from = "/"
  to = "/en/"
  status = 301
  force = true
```

**Wpływ na UX**: Użytkownicy PL/CS wchodzący na `quantifier.ai` trafią na `/en/` zamiast na wykryty język. Ale `RedirectToPreferredLocale` i tak nie działał na poziomie serwera — dopiero po załadowaniu JS. Dla SEO to kluczowe.

### Punkt 2-4: Canonical, hreflang, og:url w raw HTML

**Status: Celowo pominięte** w poprzednim planie, bo są locale-dependent.

**Problem jest realny ale nierozwiązywalny w statycznym HTML** dla multi-locale SPA:
- Dodanie `<link rel="canonical" href="/en/">` do index.html oznacza, że crawler bez JS na `/pl/frameworks/gdpr/` zobaczy canonical wskazujący na `/en/` — to jest **gorsze** niż brak canonical
- To samo z hreflang i og:url — statyczne wartości będą **błędne** dla 99% stron

**Dlaczego to nie jest faktyczny problem**:
- Googlebot wykonuje JS → widzi react-helmet-async
- Netlify Prerender serwuje pełny HTML botom → mają canonical, hreflang, og:url
- Raw HTML bez tych tagów widzą tylko narzędzia audytowe (Screaming Frog w trybie "no JS render")

**Rekomendacja**: NIE dodawać. Audytor sprawdza raw HTML, ale realni crawlerzy nigdy go nie widzą. Dodanie spowodowałoby realne błędy indeksowania.

### Punkt 5-6: Sitemap bez hreflang/lastmod + zepsuty URL w robots.txt

**Status sitemap proxy**: Reguła w `netlify.toml` (linia 70-74) istnieje:
```toml
from = "/sitemap.xml"
to = "https://zcrnfrijqasbrjrxconi.supabase.co/functions/v1/sitemap"
status = 200
force = true
```

**Prawdopodobna przyczyna problemu**: Netlify Prerender Extension przechwytuje request do `/sitemap.xml` PRZED proxy redirect i zwraca prerenderowany SPA HTML. `force = true` powinno to nadpisywać, ale Prerender Extension działa na poziomie Edge (przed redirectami).

**robots.txt**: Aktualnie zawiera tylko `Sitemap: https://quantifier.ai/sitemap.xml` (poprawione wcześniej). Jeśli audytor widzi drugi URL `/functions/v1/sitemap`, to może sprawdzać starą wersję.

**Fix**: Jedyne co mogę zrobić to upewnić się, że proxy redirect jest poprawny. Jeśli Prerender Extension nadal przechwytuje — to wymaga konfiguracji w Netlify Dashboard (dodanie `/sitemap.xml` do listy wykluczeń z prerendering).

### Plan zmian

**1. `netlify.toml`** — dodać redirect `/` → `/en/` (301) przed catch-all

**2. Ręczna akcja** — w Netlify Dashboard sprawdź czy Prerender Extension nie przechwytuje `/sitemap.xml`. Jeśli tak, dodaj wyjątek.

**3. NIE dodawać** canonical/hreflang/og:url do statycznego index.html — to spowodowałoby realne problemy z indeksowaniem.

