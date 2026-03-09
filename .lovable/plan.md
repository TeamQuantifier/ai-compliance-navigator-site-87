

## Diagnoza problemu indeksowania

### Co działa poprawnie
- **Sitemap Edge Function** — zwraca prawidłowy XML z `xmlns:xhtml`, `<xhtml:link>` hreflang i `<lastmod>` dla wszystkich stron. Zweryfikowane bezpośrednio.
- **Proxy `/sitemap.xml`** — działa na produkcji, zwraca XML (nie HTML).
- **`prerenderReady`** — ustawiane w `PageTemplate` i `BlogPost` — Netlify Prerender powinien czekać.

### Znalezione problemy

**1. Brak `<html lang>` per locale**
`index.html` ma na sztywno `<html lang="en">`. Żadna strona nie ustawia `htmlAttributes` w Helmet. Gdy Netlify Prerender robi snapshot `/cs/frameworks/ccpa/`, snapshot ma `<html lang="en">`. Google widzi sprzeczność: hreflang mówi `cs-CZ`, ale HTML mówi `lang="en"`. To **sygnał** dla Google, że strona nie jest naprawdę czeska/polska → może zdecydować się nie indeksować wersji CZ/PL.

**Fix**: Dodać `<html lang={currentLocale}>` przez Helmet w `PageTemplate`.

**2. Brak trailing slash enforcement w React Router**
Sitemap podaje URL-e z trailing slash (`/en/frameworks/ccpa/`). Ale React Router obsługuje zarówno `/en/frameworks/ccpa` jak i `/en/frameworks/ccpa/` — Google może widzieć dwa różne URL-e. Canonical w Helmet ma trailing slash, ale jeśli Google crawluje wersję bez slash, to widzi redirect (albo nie) do wersji z slash.

**Fix**: Nie wymaga zmian — `canonicalUrl` w PageTemplate już wymusza trailing slash. To wystarczający sygnał.

**3. Resubmit sitemap w GSC**
Jeśli wcześniej sitemap zwracał HTML (przez Netlify Prerender), GSC mógł zablokować cały sitemap jako "nieprawidłowy format". Po fixie proxy trzeba:
- Usunąć starą mapę witryny w GSC
- Dodać ją ponownie (`https://quantifier.ai/sitemap.xml`)
- Poczekać na ponowne pobranie

### Plan zmian

**1. `src/components/PageTemplate.tsx`** — Dodać `htmlAttributes` do Helmet:
```tsx
<Helmet htmlAttributes={{ lang: currentLocale }}>
```
To sprawi, że każda strona będzie miała prawidłowy `<html lang="pl">`, `<html lang="cs">` lub `<html lang="en">` — zarówno w SPA jak i w snapshocie prerendera.

**2. `src/components/seo/SEOHead.tsx`** — Sprawdzić czy SEOHead (używany przez BlogPost) też ustawia `htmlAttributes`. Jeśli nie, dodać.

**3. Ręczne akcje (po deployu)**:
- W Google Search Console: usuń starą mapę witryny i dodaj ponownie `https://quantifier.ai/sitemap.xml`
- Kliknij "Poproś o indeksowanie" dla kilku kluczowych stron (np. `/en/frameworks/iso-27001/`, `/pl/frameworks/gdpr/`)
- Poczekaj 3-7 dni na ponowne przetworzenie

