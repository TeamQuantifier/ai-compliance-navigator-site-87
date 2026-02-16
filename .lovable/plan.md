

# Naprawa błędów 5xx w Google Search Console

## Diagnoza

Wszystkie 3 edge functions do prerenderingu (`prerender-marketing`, `prerender-post`, `prerender-story`) zwracają **404 NOT_FOUND** -- nie sa wdrozone (deployed). Vercel poprawnie przekierowuje ruch botow do tych funkcji, ale one nie istnieja na serwerze.

Wynik: Googlebot dostaje blad zamiast poprawnego HTML --> Google raportuje "Server error (5xx)" --> strony nie sa indeksowane.

Dodatkowy problem: URL-e bez prefixu locale (np. `/plans`, `/legal/terms`) nie maja przekierowan.

## Plan naprawy (krok po kroku)

### Krok 1: Deploy edge functions
Wdrozenie wszystkich 3 edge functions:
- `prerender-marketing`
- `prerender-post`
- `prerender-story`
- `sitemap` (juz dziala, ale warto upewnic sie ze wszystkie sa zsynchronizowane)

### Krok 2: Weryfikacja po deploy
Testowe wywolania kazdej funkcji, np.:
- `prerender-marketing?locale=en&page=product-features`
- `prerender-marketing?locale=pl&page=index`
- `prerender-post?locale=en&slug=<slug-istniejacego-posta>`
- `prerender-story?locale=en&slug=<slug-istniejacego-story>`

### Krok 3: Dodanie przekierowan 301 dla URL-i bez locale
Dodanie w `vercel.json` przekierowan dla sciezek raportowanych przez Google jako bledne:

```json
{ "source": "/plans", "destination": "/en/plans", "permanent": true },
{ "source": "/legal/terms", "destination": "/en/legal/terms", "permanent": true },
{ "source": "/legal/privacy", "destination": "/en/legal/privacy", "permanent": true },
{ "source": "/legal/cookies", "destination": "/en/legal/cookies", "permanent": true }
```

Oraz ogolne reguly catch-all dla popularnych sciezek bez locale.

### Krok 4: Ponowne zgloszenie indeksacji w Google Search Console
Po wdrozeniu zmian:
1. Wejdz w Google Search Console
2. Uzyj "URL Inspection" dla kazdego problematycznego URL-a
3. Kliknij "Request Indexing"
4. Poczekaj 2-7 dni na ponowne zaindeksowanie

## Zakres zmian technicznych

| Plik | Zmiana |
|------|--------|
| Edge functions (3 szt.) | Deploy (bez zmian w kodzie) |
| `vercel.json` | Dodanie ~10 przekierowan 301 dla URL-i bez locale |

## Wazne uwagi

- Kod edge functions jest juz napisany i poprawny -- wymaga jedynie wdrozenia
- Funkcja `prerender-marketing` ma ~2700 linii -- jest duza, ale powinna sie zmiescic w limitach czasowych edge function (samo generowanie HTML bez zewnetrznych zapytan)
- Funkcje `prerender-post` i `prerender-story` odpytuja baze danych -- moga byc wolniejsze, ale to standardowe zapytania
- Po naprawie Google powinien zaczac indeksowac strony w ciagu kilku dni

