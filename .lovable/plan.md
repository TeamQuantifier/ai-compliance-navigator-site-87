

# Naprawa duplikatow -- brak kanonicznej strony

## Diagnoza

Strona jest hostowana na **Netlify**, ale przekierowania sa zdefiniowane w `vercel.json`, ktory Netlify **calkowicie ignoruje**. Plik `public/_redirects` zawiera jedynie:

```
/* /index.html 200
```

To znaczy, ze KAZDY URL (np. `/blog`, `/success-stories`, `/frameworks`, `/contact.html`) dostaje odpowiedz 200 z SPA. React Router nie ma tras bez prefixu locale, wiec renderuje sie strona, ale **bez poprawnego tagu canonical**. Google widzi duplikat tresci.

## Rozwiazanie

### Krok 1: Dodanie przekierowan 301 w `public/_redirects`

Przekierowania musza byc **PRZED** regula catch-all `/* /index.html 200`.

Nowa zawartosc pliku `public/_redirects`:

```
# Redirects for URLs without locale prefix
/success-stories  /en/success-stories/  301
/success-stories/  /en/success-stories/  301
/blog  /en/blog/  301
/blog/  /en/blog/  301
/frameworks  /en/frameworks/  301
/frameworks/  /en/frameworks/  301
/contact.html  /en/contact/  301
/contact  /en/contact/  301
/plans  /en/plans/  301
/plans/  /en/plans/  301
/about  /en/about/  301
/about/  /en/about/  301
/partners  /en/partners/  301
/partners/  /en/partners/  301
/legal/terms  /en/legal/terms/  301
/legal/privacy  /en/legal/privacy/  301
/legal/cookies  /en/legal/cookies/  301
/product/*  /en/product/:splat  301
/blog/*  /en/blog/:splat  301
/success-stories/*  /en/success-stories/:splat  301
/by-roles/*  /en/by-roles/:splat  301
/frameworks/*  /en/frameworks/:splat  301

# SPA fallback (must be last)
/* /index.html 200
```

### Krok 2: Walidacja -- URL `platform.quantifier.ai/login`

Ten URL jest na **innej subdomenie** (`platform.quantifier.ai`), wiec nie mozemy go kontrolowac z tej strony. W Google Search Console mozna go oznaczyc jako "not my property" lub zignorowac -- Google sam przestanie go raportowac jesli subdomena jest osobnym property.

### Co NIE wymaga zmian

- Tagi canonical na stronach z locale (`/en/blog/`, `/pl/frameworks/` itp.) -- sa poprawne w `PageTemplate` i `SEOHead`
- Plik `vercel.json` -- mozna zostawic na wypadek migracji, nie szkodzi
- Edge functions -- osobny problem, nie wplywa na canonical

## Zakres zmian

| Plik | Zmiana |
|------|--------|
| `public/_redirects` | Dodanie ~20 przekierowan 301 przed catch-all |

## Po wdrozeniu

1. Opublikuj zmiany na Netlify
2. Sprawdz w przegladarce, ze `/blog` przekierowuje 301 na `/en/blog/`
3. W Google Search Console uzyj "URL Inspection" na kazdym problematycznym URL i kliknij "Request Indexing"
4. Google powinien zaakceptowac przekierowania w ciagu 3-7 dni

