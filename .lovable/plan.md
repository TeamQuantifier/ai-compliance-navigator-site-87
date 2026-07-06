## Cel
Nowa podstrona **PPWR** w sekcji „Standardy analizy produktowej" (`/frameworks/product-level`), spójna wizualnie z DPP/EPD/LCA, w 3 językach (PL, EN, CS).

## Routing i nawigacja
- Nowa trasa: `/:locale/frameworks/product-level/ppwr` w `src/App.tsx`
- Wpis w mega-menu (`src/components/Navbar.tsx`, sekcja `menu.frameworks.productLevel`) — nowy klucz `ppwr`
- Karta PPWR w hubie `ProductLevelHub.tsx` (kolor: `emerald`/`teal` — odróżnia od DPP-green, EPD-blue, LCA-amber; ikona `Package`)
- Klucze i18n dla wszystkich trzech języków (`pl`, `en`, `cs`) w `public/locales/*/translation.json`

## Struktura strony (`src/pages/frameworks/product-level/Ppwr.tsx`)

**1. Hero**
- Badge: „Rozporządzenie UE 2025/40"
- H1: „PPWR — Rozporządzenie opakowaniowe UE (2025/40)"
- Subline: weszło w życie 11.02.2025, główne obowiązki od 12.08.2026
- **Licznik dni do 12.08.2026** — komponent z `useEffect` liczący `differenceInDays`, aktualizacja co godzinę, wyświetlany jako duża liczba + etykieta „dni do obowiązku dokumentacji"
- Zdanie pozycjonujące: „Zgodność opakowań, dokumentacja techniczna i dane środowiskowe w jednej platformie"
- CTA główny: „Sprawdź gotowość swoich opakowań" → w tej iteracji linkuje do `/contact?topic=ppwr-readiness` (formularz kontaktowy z pre-wypełnionym tematem). Pełny quick-scan quiz (analog NIS2, 15-20 pytań) to osobny scope — patrz „Poza zakresem".
- CTA drugorzędny: „Umów demo" → `/contact`

**2. Czym jest PPWR** (SEO/TOFU)
- Rozporządzenie, nie dyrektywa — obowiązuje bezpośrednio bez transpozycji, zastępuje 94/62/WE
- Obejmuje cały cykl życia opakowania (6 obszarów w gridzie: projektowanie, skład, oznakowanie, wielokrotne użycie, recyklowalność, gospodarka odpadami)
- Kontekst PL: projekt UC100 dostosowujący ROP (buduje ekspertyzę rynkową)

**3. Kogo dotyczy — „to Ty"**
- Insight: „producent" = każdy wytwórca, importer, dystrybutor wprowadzający opakowanie na rynek UE
- Wyróżniona karta importera: art. 18 — importer ponosi pełną odpowiedzialność, nie może przerzucić na dostawcę spoza UE
- Brak wyłączeń dla MŚP
- Statystyka: ~113 tys. przedsiębiorców w PL zarejestrowanych jako wprowadzający

**4. Harmonogram (timeline)**
- 12.08.2026 — ocena zgodności, dokumentacja techniczna, deklaracja UE, oznakowanie, zakaz PFAS (żywność)
- 2028 — ujednolicone etykiety i piktogramy sortowania
- 2030 — recyklowalność, zawartość recyklatu, zakazy formatów jednorazowych, limit 50% pustej przestrzeni
- Callout „Ważne rozróżnienie" (analog „24h ≠ due diligence" z NIS2): sierpień 2026 = dokumentacja i projekt; cele materiałowe wchodzą etapami do 2030
- Wizualnie: pionowa oś czasu z kolorem emerald, spójna z DPP

**5. Konsekwencje braku zgodności**
- Brak dokumentacji po 12.08.2026 = istotne naruszenie, możliwe wycofanie z całego rynku UE
- Argument handlowy: kontrahenci i sieci dystrybucji będą wymagać zgodności na etapie zakupu (fear→solution arc)

**6. Jak pomaga platforma** — **pozycjonowanie przez LCA + moduł danych** (bezpieczna narracja bez obietnic funkcjonalności, których nie ma; zgodnie z Twoim zastrzeżeniem)
- Dane opakowaniowe na poziomie SKU (masa, materiał, recyklat) — mapowanie na istniejący moduł danych
- LCA opakowań — modelowanie scenariuszy (zmiana materiału/formatu), 16 kategorii PEF, Ecoinvent (istniejąca zdolność)
- Workflow zbierania dowodów od dostawców + audit trail (mapowanie na Value Chain / Documents Management)
- Cross-linki: DPP/ESPR, CSRD (ESRS E5), CBAM — wewnętrzne linkowanie SEO
- Wsparcie ekspertów i współpracujących prawników (brand voice: „platforma" + „ekspert")
- **Framing:** „platforma wspiera przygotowanie do PPWR poprzez…" zamiast „zgodna z PPWR out-of-the-box"

**7. FAQ** (z schema JSON-LD przez istniejący `FAQSection`)
- Od kiedy obowiązuje PPWR?
- Czy dotyczy MŚP?
- Czy importer odpowiada za opakowania spoza UE?
- PPWR a UC100/ROP w Polsce?
- Co grozi za brak deklaracji zgodności?
- Czym PPWR różni się od dyrektywy 94/62?

**8. CTA końcowe**
- Nagłówek + „Umów demo" (spójny z DPP) + link tekstowy „Pobierz checklistę gotowości PPWR" → w tej iteracji linkuje do `/contact?topic=ppwr-checklist` (checklist jako PDF/lead magnet = osobny scope)

## Kolorystyka i wizualia
- Paleta: **emerald / teal** (odróżnia od DPP-green, EPD-blue, LCA-amber, ale zostaje w rodzinie „sustainability")
- Ikony `lucide-react`: `Package`, `Recycle`, `Factory`, `AlertTriangle`, `CalendarClock`, `FileCheck`
- Reużycie wzorców z `ProductLevel.tsx` (Card, badges, timeline)

## SEO
- `title`: „PPWR 2025/40 — Rozporządzenie opakowaniowe UE | Quantifier.ai"
- `description` <160 znaków, keyword „PPWR", „rozporządzenie opakowaniowe", „2025/40"
- H1 zgodnie z hero, jeden na stronę
- Canonical z trailing slash (zgodnie z memory)
- Hreflang PL/EN/CS przez `SEOHead` w `PageTemplate`
- FAQ JSON-LD przez `FAQSection`
- Wpis w `supabase/functions/sitemap` (dodać ścieżkę do listy)

## Pliki do zmiany
```
Nowe:
  src/pages/frameworks/product-level/Ppwr.tsx
Edycja:
  src/App.tsx                                  (route)
  src/components/Navbar.tsx                    (mega-menu)
  src/pages/frameworks/ProductLevelHub.tsx     (4. karta w hubie + grid md:grid-cols-2 lg:grid-cols-4)
  public/locales/pl/translation.json           (menu + ppwrPage)
  public/locales/en/translation.json           (menu + ppwrPage — pełne tłumaczenie)
  public/locales/cs/translation.json           (menu + ppwrPage — pełne tłumaczenie)
  supabase/functions/sitemap/index.ts          (dodać ppwr do 3 lokalizacji)
```

## Poza zakresem (do osobnych zleceń, jeżeli zdecydujesz)
1. **Quick-scan PPWR (15-20 pytań, analog NIS2 quiz)** — wymaga: config pytań, komponent quizu, scoring, integracja lead capture, tabela `ppwr_quiz_submissions` + RLS, panel admin. Realistycznie: osobne zlecenie o rozmiarze porównywalnym z całą stroną.
2. **PDF checklisty gotowości PPWR** — treść merytoryczna + layout PDF + hosting.

## Wymagane potwierdzenie
Pozycjonowanie sekcji 6 jest ostrożne (LCA + dane + workflow, bez obietnicy „modułu PPWR"). Jeżeli platforma ma dedykowaną ewidencję opakowań / generator deklaracji zgodności — powiedz, dopiszę to konkretnie. Domyślnie idę bezpieczną narracją, którą sam zasugerowałeś.
