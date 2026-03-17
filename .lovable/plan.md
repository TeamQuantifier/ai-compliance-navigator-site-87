

# Plan: Quick Wins SEO + Dodatkowe SEO techniczne

## Faza 1 — Quick Wins

### 1.1 `index.html` — brakujace tagi
- Dodac `<link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable metadata">`
- Dodac `<meta property="og:url" content="https://quantifier.ai/" />`
- Dodac `<meta name="twitter:site" content="@quantaborator" />` (lub faktyczny handle — do potwierdzenia)

### 1.2 `twitter:site` w komponentach SEO
- **`src/components/PageTemplate.tsx`** — dodac `<meta name="twitter:site" content="@quantaborator" />` w sekcji Twitter Cards
- **`src/components/seo/SEOHead.tsx`** — dodac ten sam tag w sekcji Twitter Cards

### 1.3 `src/pages/SuccessStories.tsx` — priorytet case studies
- Przeniesc `<BookPromoSection />` i `<PostgraduatePromoSection />` POD grid case studies (po sekcji stories grid), a nie nad nim

### 1.4 `supabase/functions/llms-txt/index.ts` — nowe sekcje statyczne
Dodac 3 nowe sekcje w obu wersjach (short i full):
- **Competitors & Differentiators** — krotkie porownanie z Vanta, Drata, Secureframe, Sprinto (wielojezycznosc, EU-focus, NIS2/DORA/ESG)
- **Team & Expertise** — placeholdery na kluczowe osoby (do uzupelnienia pozniej)
- **Awards & Certifications** — TÜV NORD, wspolpraca akademicka

### 1.5 Event schema — juz istnieje
EventDetail.tsx ma juz pelny schema `Event` JSON-LD (linia 57-71). Brak akcji.

---

## Faza 3 — Dodatkowe SEO techniczne

### 3.1 `index.html` — duplikat meta description
Statyczny `<meta name="description">` jest nadpisywany przez react-helmet-async na kazdej podstronie. Zostawic go (jest potrzebny jako fallback dla social crawlerow ktore nie wykonuja JS), ale zmienic tresc na bardziej generyczna i krotsza, zeby nie konkurowala z per-page descriptions.

### 3.2 Review schema na homepage
- **`src/pages/Index.tsx`** — dodac `Review` JSON-LD schema z cytatem klienta (np. BNP Paribas lub inny). InsidersSection nie zawiera cytatow tekstowych (tylko loga), wiec schema bedzie oparta na danych z istniejacych success stories lub testimoniali z tresci strony.

### 3.3 `index.html` noscript — dodac linki do artykulow
Rozszerzyc blok `<noscript>` o sekcje z najwazniejszymi artykulami blogowymi (statyczne linki, 5-10 artykulow).

---

## Pliki do edycji (lacznie 5-6)

| Plik | Zakres zmian |
|------|-------------|
| `index.html` | +3 tagi head, zmiana meta desc, rozszerzenie noscript |
| `src/components/PageTemplate.tsx` | +1 tag twitter:site |
| `src/components/seo/SEOHead.tsx` | +1 tag twitter:site |
| `src/pages/SuccessStories.tsx` | Przeniesienie 2 komponentow pod grid |
| `src/pages/Index.tsx` | +Review JSON-LD schema |
| `supabase/functions/llms-txt/index.ts` | +3 nowe sekcje statyczne |

## Pytanie do potwierdzenia
- Jaki jest faktyczny handle Twittera/X? Uzyje `@quantifier_ai` jako domyslny, do zmiany pozniej.

