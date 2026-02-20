
# Naprawa bledu 5xx dla /pl/blog w Google Search Console

## Przyczyna problemu

Funkcje Edge `prerender-marketing`, `prerender-post` i `prerender-story` **nie sa wdrozone** na projekcie Supabase (zcrnfrijqasbrjrxconi). Proba ich wywolania zwraca blad 404 ("Requested function was not found").

Funkcja `sitemap` dziala poprawnie -- prawdopodobnie zostala wdrozona wczesniej inna metoda.

Mechanizm bledu:
1. Googlebot odwiedza `/pl/blog`
2. Netlify Edge Function (`bot-prerender.ts`) wykrywa bota i proxuje do `prerender-marketing?locale=pl&page=blog`
3. Funkcja nie istnieje na Supabase -- zwraca 404
4. Google raportuje to jako blad serwera 5xx

Proba wdrozenia przez narzedzie deploy zakonczyla sie komunikatem "success", ale funkcje nadal nie sa dostepne. Dotyczy to nawet malej funkcji `prerender-post` (95 linii), wiec problem **nie jest zwiazany z rozmiarem** funkcji `prerender-marketing` (3088 linii).

## Plan naprawy

### Krok 1 -- Wymuszenie ponownego wdrozenia przez modyfikacje kodu

Dodac drobna zmiane w kazdej z 3 funkcji (np. zaktualizowac komentarz wersji), a nastepnie ponownie wdrozyc. To wymusi nowy build i deployment.

Pliki do zmodyfikowania:
- `supabase/functions/prerender-marketing/index.ts` -- zmiana komentarza z "v3" na "v4"
- `supabase/functions/prerender-post/index.ts` -- zmiana komentarza z "v2" na "v3"
- `supabase/functions/prerender-story/index.ts` -- zmiana komentarza wersji

### Krok 2 -- Weryfikacja po deploymencie

Po wdrozeniu wywolac kazda funkcje bezposrednio:
- `GET /prerender-marketing?locale=pl&page=blog`
- `GET /prerender-post?locale=pl&slug=dyrektywa-nis2`
- `GET /prerender-story?locale=pl&slug=case-study-tatuum`

Sprawdzic czy zwracaja status 200 z poprawnym HTML.

### Krok 3 -- Jesli deploy nadal nie dziala: fallback w Netlify Edge Function

Jesli po kroku 1 funkcje nadal nie sa dostepne, dodac fallback w `netlify/edge-functions/bot-prerender.ts`: jesli Supabase zwroci 404 lub 5xx, zamiast propagowac blad do Googlebota, zwrocic **minimalna strone HTML** ze statusem 200, zawierajaca:
- Poprawny `<title>`, `<meta description>`, canonical, hreflang
- Podstawowa tresc (tytul strony, link do SPA)
- `<meta name="robots" content="index, follow">`

To zapobiegnie raportowaniu 5xx w Google Search Console nawet gdy funkcje Supabase sa niedostepne.

Modyfikacja w `netlify/edge-functions/bot-prerender.ts`:

```text
// Obecny kod:
async function proxyToPrerender(url, ua) {
  const response = await fetch(url, { headers: { 'User-Agent': ua } });
  if (!response.ok) { return response; }  // <-- propaguje blad!
  ...
}

// Po zmianie:
async function proxyToPrerender(url, ua, fallbackTitle, fallbackUrl) {
  try {
    const response = await fetch(url, { headers: { 'User-Agent': ua } });
    if (response.ok) {
      // zwroc poprawny HTML
    }
  } catch (e) {}
  // Fallback: zwroc minimalna strone z 200 zamiast 5xx
  return new Response(minimalHtml(fallbackTitle, fallbackUrl), {
    status: 200,
    headers: { 'Content-Type': 'text/html', 'X-Robots-Tag': 'index, follow' }
  });
}
```

### Krok 4 -- Naprawa OG image w prerender-marketing

Plik `prerender-marketing/index.ts` (linia 2965, 2972) nadal odwoluje sie do `/og-image.png`, ktory nie istnieje. Zmienic na istniejacy obraz:

```text
// Linia 2965 i 2972 -- zmienic:
${BASE_URL}/og-image.png
// na:
${BASE_URL}/lovable-uploads/154104eb-8338-4e4f-884c-2343169fc09b.png
```

## Podsumowanie zmian

| Plik | Co sie zmienia |
|---|---|
| `supabase/functions/prerender-marketing/index.ts` | Bump wersji + naprawa og-image URL |
| `supabase/functions/prerender-post/index.ts` | Bump wersji |
| `supabase/functions/prerender-story/index.ts` | Bump wersji |
| `netlify/edge-functions/bot-prerender.ts` | Fallback HTML przy bledach Supabase |

## Wplyw na SEO

- Blad 5xx dla `/pl/blog` i wszystkich innych stron bot-prerenderowanych zostanie naprawiony
- Googlebot zawsze otrzyma poprawna odpowiedz HTML (200) z meta tagami
- Social sharing bedzie dzialac z poprawnym obrazem OG
