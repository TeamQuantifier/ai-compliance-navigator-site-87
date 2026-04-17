

## Plan: Audyt i poprawki UI/UX/SEO strony LCA Analysis

### Zakres
Strona `/pl/frameworks/product-level/lca-analysis` (+ EN/CS) oraz analogiczne podstrony `/frameworks/product-level/dpp` i `/frameworks/product-level/epd`.

### Problemy do naprawienia

**1. Hero — duplikat CTA**
- Oba przyciski w hero LCA prowadzą do `/contact`. Usuwam drugi przycisk ("Talk to expert"), zostawiam tylko "Book demo".
- Sprawdzam i naprawiam ten sam problem na DPP i EPD.

**2. Bug scrollowania na Tabs (kluczowy bug UI)**
- Komponenty `<Tabs>` w LCA, EPD i DPP używają `<Link>`/`<Button asChild>` wewnątrz `TabsTrigger` lub mają nieprawidłowe propsy powodujące re-render i scroll do góry. Po analizie kodu przyczyną jest najprawdopodobniej brak zapobiegania domyślnemu zachowaniu lub focus management Radix Tabs przewijający do aktywnego panelu.
- Fix: dodać `onClick` z `preventDefault` na `TabsTrigger` lub użyć `scroll-mt` / wyłączyć auto-focus przez `onValueChange` z zachowaniem pozycji scroll (`window.scrollY` snapshot + restore w `useLayoutEffect`).
- Najczystsze rozwiązanie: dodać `onMouseDown={(e) => e.preventDefault()}` na `TabsTrigger` aby zapobiec focus-induced scroll, oraz `tabIndex={-1}` na `TabsContent`.

**3. Sekcja "Trzy podejścia" → "3 podejścia"**
- Zmiana w tłumaczeniach `lcaPage.approaches.title` (PL/EN/CS).

**4. Lifecycle Mockup — kolejność pasków**
- W `LcaLifecycleMockup.tsx` przestawiam kolejność zakresów: "Od kołyski do bramy" → "Od bramy do bramy" → "Od bramy do grobu" → **"Od kołyski do grobu"** (najdłuższy na dole). Alternatywnie najdłuższy na górze — wybieram dół jako logiczne zakończenie.

**5. CTA "Zobacz EPD" i podobne na innych stronach**
- Audyt wszystkich finalnych CTA w `LcaAnalysis.tsx`, `Epd.tsx`, `Dpp.tsx`, `ProductLevelHub.tsx` — usunięcie duplikujących się przycisków prowadzących do tego samego URL, ujednolicenie kontrastu i hover state.

**6. Audyt SEO + sitemap + llms.txt**
- Sprawdzam czy `/frameworks/product-level/lca-analysis` jest w:
  - `supabase/functions/sitemap/index.ts` (3 lokale)
  - `supabase/functions/llms-txt/index.ts`
  - `supabase/functions/prerender-marketing/index.ts` (metadane SEO)
- Dodaję jeśli brakuje + weryfikuję canonical, hreflang, JSON-LD (TechArticle/Service schema).
- Weryfikuję meta title (≤60 znaków) i description (≤160 znaków) w PL/EN/CS.

### Pliki do edycji
- `src/pages/frameworks/LcaAnalysis.tsx` — usunięcie duplikatu CTA, fix tabs scroll, fix przycisku EPD
- `src/pages/frameworks/Epd.tsx` — analogiczne fixy tabs + CTA
- `src/pages/frameworks/Dpp.tsx` — analogiczne fixy tabs + CTA
- `src/components/mockups/LcaLifecycleMockup.tsx` — reorder pasków zakresu
- `public/locales/pl/translation.json`, `en/translation.json`, `cs/translation.json` — "3 podejścia", ewentualne braki CS
- `supabase/functions/sitemap/index.ts` — dodanie LCA jeśli brak
- `supabase/functions/llms-txt/index.ts` — dodanie LCA
- `supabase/functions/prerender-marketing/index.ts` — metadane SEO dla LCA

### Podejście techniczne do bug'a scroll na Tabs
Radix UI `Tabs` przy zmianie wartości ustawia focus na `TabsContent`, co powoduje przeglądarkową auto-scroll do tego elementu. Rozwiązanie:
```tsx
<TabsContent 
  value={String(i)} 
  tabIndex={-1}
  onFocus={(e) => e.preventDefault()}
>
```
oraz na wrapperze sekcji `style={{ scrollMarginTop: 0 }}` nie pomoże — kluczowe jest `tabIndex={-1}` na content i wyłączenie auto-focus.

