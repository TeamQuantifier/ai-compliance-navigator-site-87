

# Naprawienie redirectow 301 -- usuniecie public/_redirects

## Problem

Plik `public/_redirects` zawiera regule `/* /index.html 200`, ktora przechwytuje wszystkie requesty **przed** przetworzeniem regul z `netlify.toml`. W Netlify plik `_redirects` ma wyzszy priorytet niz `netlify.toml`, wiec redirecty 301 (np. `/blog` na `/en/blog/`) nigdy nie sa wykonywane.

## Rozwiazanie

Usunac plik `public/_redirects` calkowicie.

Wszystkie potrzebne reguly sa juz poprawnie zdefiniowane w `netlify.toml`:
- Redirecty 301 dla sciezek bez locale (np. `/blog` na `/en/blog/`)
- Redirecty 301 dla starych URL-i (np. `/en/iso27001` na `/en/frameworks/iso-27001/`)
- SPA fallback `/* /index.html 200` (ostatnia regula)

## Zmiana

| Plik | Akcja |
|------|-------|
| `public/_redirects` | Usuniecie pliku |

## Weryfikacja po deploy

```bash
curl -I https://quantifier.ai/blog
# Oczekiwany wynik: HTTP/2 301, location: /en/blog/

curl -I https://quantifier.ai/sitemap.xml
# Oczekiwany wynik: HTTP/2 200, content-type: application/xml

curl -I https://quantifier.ai/robots.txt
# Oczekiwany wynik: HTTP/2 200, content-type: text/plain
```

