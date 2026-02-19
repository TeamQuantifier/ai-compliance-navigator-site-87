
# Plan zmian: Rename /nis2-check → /cybersecurity-check + treść wyników + intro + Q3

## Scope zmian

Żądanie dotyczy 6 obszarów:
1. **Zmiana URL**: `/nis2-check` → `/cybersecurity-check` (EN/CS), `/sprawdz-cyberbezpieczenstwo` (PL)
2. **Nowy wstęp** na stronie (PL + EN + CS)
3. **Zmiana pytania Q3** — dodanie podpowiedzi o kodach NACE
4. **Zmiana tytułu H1** (PL) — "cybersecurity" → "cyberbezpieczeństwem"
5. **Nowe treści wyników** w bazie danych (result_templates) — 4 wyniki × 3 języki = 12 rekordów do aktualizacji
6. **Aktualizacja SEO/sitemap/prerender** dla nowych URL-i + redirect 301 ze starych

---

## Plik 1: `src/App.tsx`

Zmiana tras z `nis2-check` na nowe URL-e:

```typescript
// Nowe trasy (zamiast /:locale/nis2-check)
<Route path="/:locale/cybersecurity-check" element={<FormularzPage />} />
<Route path="/pl/sprawdz-cyberbezpieczenstwo" element={<FormularzPage />} />

// Redirecty 301 ze starych URL-i
<Route path="/:locale/nis2-check" element={<Navigate to="../cybersecurity-check" replace />} />
<Route path="/pl/nis2-check" element={<Navigate to="/pl/sprawdz-cyberbezpieczenstwo" replace />} />
<Route path="/formularz" element={<Navigate to="/pl/sprawdz-cyberbezpieczenstwo" replace />} />
<Route path="/nis2-check" element={<Navigate to="/en/cybersecurity-check" replace />} />
```

Dodatkowo zmieniamy detekcję isNis2Check dla `BookPromoPopup`:
```typescript
const isCheck = /\/(pl\/(sprawdz-cyberbezpieczenstwo)|(en|cs)\/(cybersecurity-check))/.test(window.location.pathname);
```

---

## Plik 2: `src/config/quizConfig.ts`

### 2a. Zmiana pytania Q3 — dodanie wzmianki o kodach NACE

```typescript
export const Q3_QUESTION: Record<QuizLang, string> = {
  pl: 'W jakim sektorze działa firma? (po kodach NACE, wskaż najbardziej pasujące)',
  en: 'In which sector does the company operate? (by NACE code, select the closest match)',
  cs: 'V jakém odvětví společnost působí? (dle kódů NACE, vyberte nejbližší shodu)',
};
```

### 2b. Zmiana tytułu H1 (QUIZ_TITLE dla PL)

```typescript
export const QUIZ_TITLE: Record<QuizLang, string> = {
  pl: 'Czy Twoja firma powinna pilnie zająć się cyberbezpieczeństwem?',  // zmiana: cybersecurity → cyberbezpieczeństwem
  en: 'Does your company urgently need to address cybersecurity?',
  cs: 'Potřebuje vaše společnost naléhavě řešit kybernetickou bezpečnost?',
};
```

### 2c. Nowa stała: QUIZ_INTRO (wstęp do strony)

Dodajemy nową stałą dla 3 języków:

```typescript
export const QUIZ_INTRO: Record<QuizLang, string> = {
  pl: 'W świecie napięć geopolitycznych i rosnącej liczby cyberataków cyberbezpieczeństwo stało się warunkiem przetrwania biznesu, a nie jedynie kwestią techniczną. Naruszenie bezpieczeństwa oznacza dziś realne ryzyko strat finansowych, utraty reputacji i odpowiedzialności zarządu. Kluczowe znaczenie mają Dyrektywa NIS2 oraz ISO 27001, które wyznaczają ramy zarządzania ryzykiem i ochrony informacji. To, czy regulacje dotyczą Cię bezpośrednio, zależy od wielkości firmy, sektora i relacji w łańcuchu dostaw.',
  en: 'In a world of geopolitical tensions and a growing number of cyberattacks, cybersecurity has become a condition for business survival — not merely a technical issue. A security breach today means real risk: financial losses, reputational damage, and board-level liability. The NIS2 Directive and ISO 27001 play a key role in defining risk management and information protection frameworks. Whether regulations apply to you directly depends on your company\'s size, sector, and supply chain relationships.',
  cs: 'Ve světě geopolitických napětí a rostoucího počtu kyberútoků se kybernetická bezpečnost stala podmínkou přežití podniku, nikoli jen technickou záležitostí. Narušení bezpečnosti dnes znamená reálné riziko finančních ztrát, poškození reputace a odpovědnosti představenstva. Klíčový význam mají Směrnice NIS2 a ISO 27001, které stanovují rámce řízení rizik a ochrany informací. Zda se na vás předpisy vztahují přímo, závisí na velikosti společnosti, odvětví a vztazích v dodavatelském řetězci.',
};
```

---

## Plik 3: `src/pages/formularz/FormularzPage.tsx`

### 3a. Importowanie QUIZ_INTRO

Dodać `QUIZ_INTRO` do importów z `@/config/quizConfig`.

### 3b. Wyświetlanie wstępu przed formularzem

Dodanie bloku intro **po nagłówku (tytule)**, przed wynikami i formularzem — widoczny zawsze (niezależnie od fazy):

```tsx
{/* Intro paragraph */}
<div className="mb-8 bg-white rounded-2xl border border-[#e0e2e9] p-6 text-sm text-gray-600 leading-relaxed">
  {QUIZ_INTRO[lang]}
</div>
```

---

## Plik 4: `netlify.toml`

Dodanie tras Netlify Edge Function dla nowych URL-i oraz redirecty 301 ze starych:

```toml
# Edge functions dla nowych URL-i
[[edge_functions]]
  path = "/en/cybersecurity-check"
  function = "bot-prerender"

[[edge_functions]]
  path = "/cs/cybersecurity-check"
  function = "bot-prerender"

[[edge_functions]]
  path = "/pl/sprawdz-cyberbezpieczenstwo"
  function = "bot-prerender"

# Redirecty 301 ze starych URL-i (nis2-check) do nowych
[[redirects]]
  from = "/en/nis2-check"
  to = "/en/cybersecurity-check/"
  status = 301

[[redirects]]
  from = "/pl/nis2-check"
  to = "/pl/sprawdz-cyberbezpieczenstwo/"
  status = 301

[[redirects]]
  from = "/cs/nis2-check"
  to = "/cs/cybersecurity-check/"
  status = 301
```

---

## Plik 5: `netlify/edge-functions/bot-prerender.ts`

Aktualizacja `STATIC_ROUTES` — zamiana `nis2-check` na nowe slug-i:

```typescript
const STATIC_ROUTES: Record<string, string> = {
  // Stary wpis do usunięcia:
  // 'nis2-check': 'nis2-check',
  
  // Nowe wpisy:
  'cybersecurity-check': 'cybersecurity-check',           // EN + CS
  'sprawdz-cyberbezpieczenstwo': 'cybersecurity-check',   // PL → ten sam prerender
};
```

---

## Plik 6: `supabase/functions/prerender-marketing/index.ts`

Zmiana klucza `pageUrlMap` i `getPageContent()`:

- Stary klucz `'nis2-check': 'nis2-check'` → nowy `'cybersecurity-check': 'cybersecurity-check'`
- Aktualizacja tytułów meta i treści SEO dla nowego nazewnictwa (cybersecurity-check zamiast nis2-check)
- Obsługa PL slug: URL map musi mapować zarówno `cybersecurity-check` jak i `sprawdz-cyberbezpieczenstwo` do tego samego `PageData`

---

## Plik 7: `supabase/functions/sitemap/index.ts`

Zamiana wpisu:

```typescript
// Stary:
{ path: '/nis2-check', ... }

// Nowe (dwa wpisy — EN/CS i PL):
{ path: '/cybersecurity-check', changefreq: 'monthly', priority: '0.8', lastmod: '2026-02-19' },
```

Uwaga: sitemapa generuje URL-e dla wszystkich locale automatycznie, ale PL ma inny slug. Trzeba obsłużyć to osobno — dodając wyjątek dla PL lub dodając osobny wpis `/sprawdz-cyberbezpieczenstwo` tylko dla `pl`.

---

## Plik 8: `public/sitemap.xml`

Zamiana wpisów z `nis2-check` na nowe URL-e:

```xml
<url>
  <loc>https://quantifier.ai/en/cybersecurity-check</loc>
  ...
</url>
<url>
  <loc>https://quantifier.ai/cs/cybersecurity-check</loc>
  ...
</url>
<url>
  <loc>https://quantifier.ai/pl/sprawdz-cyberbezpieczenstwo</loc>
  ...
</url>
```

---

## Baza danych: Aktualizacja result_templates

Aktualizujemy **wszystkie 12 rekordów** (4 result_key × 3 lang) nowymi treściami podanymi przez użytkownika.

Tylko PL ma nowe treści (dostarczone przez użytkownika). EN i CS mają stare treści które zostaną zachowane jako baza, ale zaktualizujemy je proporcjonalnie (tłumaczenie idiomu biznesowego z PL).

### Struktura nowych treści PL (podana przez użytkownika):

**RED — Wysokie prawdopodobieństwo NIS2:**
- title: `Wysokie prawdopodobieństwo NIS2`
- body: Rozbudowana treść z sekcjami "Co to oznacza", "Rekomendacje", "Jak Quantifier może pomóc"

**ORANGE — Prawdopodobny obowiązek NIS2:**
- title: `Prawdopodobny obowiązek NIS2`
- body: Jak wyżej dla ORANGE

**YELLOW — Wysokie ryzyko łańcucha dostaw:**
- title: `Wysokie ryzyko związane z łańcuchem dostaw`
- body: Jak wyżej dla YELLOW

**GREEN — Niskie ryzyko:**
- title: `Niskie ryzyko regulacyjne (na dziś)`
- body: Jak wyżej dla GREEN

Treści EN i CS zostaną zaktualizowane jako wierne tłumaczenia nowych treści PL zachowując ten sam format i strukturę.

Aktualizacja wykona się przez SQL UPDATE na tabeli `result_templates`.

---

## Podsumowanie plików

| Plik | Zmiana |
|------|--------|
| `src/App.tsx` | Nowe trasy + redirecty |
| `src/config/quizConfig.ts` | QUIZ_TITLE (PL), Q3_QUESTION, nowy QUIZ_INTRO |
| `src/pages/formularz/FormularzPage.tsx` | Import QUIZ_INTRO + wyświetlenie intro |
| `netlify.toml` | Edge functions + redirecty 301 |
| `netlify/edge-functions/bot-prerender.ts` | STATIC_ROUTES update |
| `supabase/functions/prerender-marketing/index.ts` | pageUrlMap + SEO content |
| `supabase/functions/sitemap/index.ts` | staticPages update |
| `public/sitemap.xml` | URL update |
| **SQL (result_templates)** | 12 rekordów × treść |

