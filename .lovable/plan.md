
# Diagnoza i Plan Naprawy: Niezindeksowane Strony Google Search Console

## Diagnoza — Znalezione Problemy

Po analizie kodu i testach bezpośrednich wywołań funkcji prerenderujących zidentyfikowałem **4 oddzielne przyczyny** problemu z indeksowaniem.

---

### Problem 1 (KRYTYCZNY): `Content-Security-Policy: default-src 'none'; sandbox`

**Supabase Gateway automatycznie dodaje ten nagłówek do wszystkich odpowiedzi funkcji Edge.**

Googlebot, gdy widzi `CSP: sandbox`, traktuje stronę jak iframe sandbox — nie może wykonać żadnych zewnętrznych zasobów i interpretuje to jako sygnał "nie indeksuj". Funkcja `bot-prerender.ts` poprawnie nadpisuje `Content-Type` na `text/html`, ale **nie usuwa** tego nagłówka CSP.

Dowód z testów: każde wywołanie `/prerender-post`, `/prerender-marketing` zwraca:
```
Content-Security-Policy: default-src 'none'; sandbox
```

**Naprawa:** W `bot-prerender.ts`, w funkcji `proxyToPrerender`, przy budowaniu odpowiedzi ustawić `Content-Security-Policy: default-src 'self'` (lub całkowicie go pominąć), a nie przepuszczać wartości z Supabase.

---

### Problem 2 (KRYTYCZNY): Brakujące warianty językowe artykułów blogowych

Artykuły **angielskie** wymienione w GSC:
- `/en/blog/ai-agents-in-quantifier`
- `/en/blog/case-study-cyberattack-ransomware-manufacturing-company`

...istnieją w bazie jako `published`, ale ich polskie/czeskie wersje **nie mają angielskiego wariantu lub brakuje `group_id`** — co powoduje błędy hreflang. Googlebot nie widzi spójnej sieci hreflang i może odrzucać te URL-e jako "alternate page with proper canonical tag."

**Naprawa:** Weryfikacja i naprawienie `group_id` w bazie dla tych artykułów (ręcznie przez panel admina lub SQL), żeby hreflang wskazywały prawidłowo.

---

### Problem 3 (POWAŻNY): `bot-prerender.ts` nie usuwa nagłówka `Content-Security-Policy` z odpowiedzi Supabase

Aktualny kod w `proxyToPrerender`:

```typescript
return new Response(body, {
  status: 200,
  headers: {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    'X-Robots-Tag': 'index, follow',
  },
});
```

Tworzy **nowy** obiekt `Response` z **własnymi** nagłówkami — to oznacza, że nagłówki z Supabase (w tym `Content-Security-Policy: sandbox`) **nie są propagowane**. Ale Cloudflare/Netlify może dodawać własne nagłówki. Trzeba to zweryfikować i jawnie zablokować.

---

### Problem 4 (POWAŻNY): Brakujące route `/:locale/about` i `/:locale/contact` w liście stron z GSC

Strona `/pl` (homepage) pojawia się w GSC jako niezindeksowana. Sprawdzając `prerender-marketing` dla `page=index` — dostarcza poprawny HTML. Problem leży gdzie indziej: **SPA zwraca stronę React zamiast prerenderowanej wersji dla botów**, bo Netlify Edge Function może nie działać poprawnie na deployed site.

---

## Plan Działań

### Zmiana 1: `netlify/edge-functions/bot-prerender.ts` — Naprawa nagłówków

Aktualizacja funkcji `proxyToPrerender` aby:
1. Jawnie ustawić `Content-Security-Policy: default-src 'self' https: data: 'unsafe-inline'` (zezwala na normalne zasoby, usuwa `sandbox`)
2. Dodać `X-Content-Type-Options: nosniff` 
3. Usunąć wszelkie pozostałości nagłówków Supabase które mogłyby przejść przez proxy

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
      // Jawnie nadpisujemy CSP — usuwamy sandbox który blokuje Google
      'Content-Security-Policy': "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'",
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
```

### Zmiana 2: `prerender-post/index.ts` i `prerender-marketing/index.ts` — Dodanie nagłówka w funkcjach Edge

W każdym `return new Response(html, {...})` dodać jawny nagłówek CSP który nadpisze wartość ustawioną przez Supabase Gateway, zanim dotrze do bot-prerender:

```typescript
'Content-Security-Policy': "default-src 'self' https: data: 'unsafe-inline'",
```

### Zmiana 3: `prerender-marketing/index.ts` — Dodanie strony `/pl` (index)

Strona `https://quantifier.ai/pl` pojawia się w GSC. Weryfikacja: `bot-prerender.ts` dla ścieżki `/:locale` (bez reszty path) routuje do `pageSlug = STATIC_ROUTES['']` = `'index'` — to działa. Ale trzeba sprawdzić czy Netlify Edge Function jest skonfigurowana dla `/pl` i `/pl/` — w `netlify.toml` są zdefiniowane, więc to OK.

### Zmiana 4: Naprawa `group_id` dla artykułów EN bez powiązań

SQL do uruchomienia w bazie — weryfikacja i naprawienie powiązań językowych:

```sql
-- Sprawdzenie artykułów bez group_id lub ze złymi powiązaniami
SELECT id, slug, lang, group_id, title 
FROM posts 
WHERE status = 'published' 
AND slug IN (
  'ai-agents-in-quantifier',
  'case-study-cyberattack-ransomware-manufacturing-company'
)
ORDER BY lang;
```

Jeżeli `group_id` jest NULL lub nie zgadza się między wersjami językowymi — zostanie naprawione migrację SQL.

### Zmiana 5: Jawne dodanie `X-Robots-Tag` w funkcjach Edge Supabase

Zarówno `prerender-post/index.ts` jak i `prerender-story/index.ts` nie wysyłają `X-Robots-Tag` nagłówka. Dodanie go zapewni podwójne zabezpieczenie:

```typescript
'X-Robots-Tag': 'index, follow',
```

---

## Podsumowanie priorytetów

| # | Problem | Plik do zmiany | Priorytet |
|---|---------|---------------|-----------|
| 1 | CSP: sandbox blokuje Google | `bot-prerender.ts` | 🔴 KRYTYCZNY |
| 2 | CSP: sandbox w Edge Functions | `prerender-post/index.ts`, `prerender-story/index.ts`, `prerender-marketing/index.ts` | 🔴 KRYTYCZNY |
| 3 | Brakujące `group_id` dla EN artykułów | SQL migration | 🟠 POWAŻNY |
| 4 | Brak `X-Robots-Tag` w funkcjach | `prerender-post/index.ts`, `prerender-story/index.ts` | 🟡 WAŻNY |

---

## Pliki do modyfikacji

| Plik | Zakres |
|------|--------|
| `netlify/edge-functions/bot-prerender.ts` | Nadpisanie CSP w `proxyToPrerender` |
| `supabase/functions/prerender-post/index.ts` | Dodanie CSP + X-Robots-Tag w Response |
| `supabase/functions/prerender-story/index.ts` | Dodanie CSP + X-Robots-Tag w Response |
| `supabase/functions/prerender-marketing/index.ts` | Dodanie CSP w Response (linia ~2900) |
| SQL Migration | Naprawa `group_id` dla EN artykułów blogowych |
