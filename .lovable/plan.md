
# Problem: Wszystkie strony nieindeksowalne przez blad Content-Type

## Diagnoza

Testujac odpowiedz funkcji `prerender-marketing` dla `/cs/frameworks/gdpr/`, znalazlem **krytyczny blad** wplywajacy na **WSZYSTKIE strony** serwisu, nie tylko GDPR:

**Supabase nadpisuje naglowek `Content-Type` na `text/plain`**, mimo ze kod jawnie ustawia `text/html; charset=utf-8`.

Funkcja `bot-prerender.ts` na Netlify robi `return fetch(prerenderUrl)` -- czyli zwraca odpowiedz z Supabase bezposrednio, lacznie z blednym `Content-Type: text/plain`.

Googlebot otrzymuje wiec poprawny HTML, ale z naglowkiem mowiacym "to jest zwykly tekst". Google NIE parsuje tego jako strony HTML -- stad problem z indeksowaniem.

## Dowod

Kazde wywolanie prerender-marketing zwraca:
```
Content-Type: text/plain          <-- BUG (powinno byc text/html)
Content-Security-Policy: default-src 'none'; sandbox
```

Dotyczy to rowniez `prerender-post` i `prerender-story`.

## Rozwiazanie

Zmodyfikowac `netlify/edge-functions/bot-prerender.ts` tak, aby tworzyl nowy obiekt `Response` z prawidlowymi naglowkami zamiast zwracac surowa odpowiedz z Supabase.

### Zmiana w pliku `netlify/edge-functions/bot-prerender.ts`

Zamiast:
```typescript
return fetch(prerenderUrl, {
  headers: { 'User-Agent': ua },
});
```

Nowa logika (wspolna funkcja proxy):
```typescript
async function proxyToPrerender(url: string, ua: string): Promise<Response> {
  const response = await fetch(url, {
    headers: { 'User-Agent': ua },
  });

  if (!response.ok) {
    return response;
  }

  const body = await response.text();

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'X-Robots-Tag': 'index, follow',
    },
  });
}
```

Ta zmiana:
1. Nadpisuje `Content-Type` na `text/html; charset=utf-8`
2. Usuwa restrykcyjne `Content-Security-Policy: sandbox`
3. Dodaje `X-Robots-Tag: index, follow` jako dodatkowy sygnal
4. Zachowuje `Cache-Control` dla wydajnosci

Funkcja `proxyToPrerender` bedzie uzyta we wszystkich 3 miejscach (blog posts, stories, static pages).

## Wplyw

| Element | Przed | Po |
|---------|-------|-----|
| Content-Type dla botow | `text/plain` | `text/html; charset=utf-8` |
| CSP header | `sandbox` (restrykcyjny) | Brak (bezpieczne dla prerenderowanych stron) |
| Dotknięte strony | WSZYSTKIE (~40+ stron) | WSZYSTKIE (naprawione) |

## Plik do edycji

| Plik | Zmiana |
|------|--------|
| `netlify/edge-functions/bot-prerender.ts` | Dodanie funkcji `proxyToPrerender`, zamiana 3x `return fetch(...)` na `return proxyToPrerender(...)` |

1 plik, ~15 linii nowego kodu. Naprawa dotyczy wszystkich stron serwisu.
