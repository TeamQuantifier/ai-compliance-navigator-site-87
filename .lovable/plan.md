## Cel

Zbudować dedykowany landing page pod darmowe szkolenie NIS2 / KSC 2.0 z jasną ścieżką konwersji: info o szkoleniu → ból (dlaczego teraz) → CTA do formularza. Zmienić deadline z 30.06.2026 na 14.07.2026 we wszystkich miejscach promocji.

## Lokalizacja

- Nowa strona: `src/pages/services/Nis2TrainingLanding.tsx` (PL-only na start, ścieżka `/pl/darmowe-szkolenie-nis2`)
- Route dodany w `src/App.tsx`
- Komponent formularza: reużycie `src/components/promo/TrainingPromoForm.tsx` (kotwica `#promo-form`)
- Aktualizacja deadline w `src/components/promo/TrainingPromoteSection/Banner/Dialog` (`TrainingPromo2026.tsx`) — wszystkie 3 lokalne kopie (PL/EN/CS): `30.06.2026` → `14.07.2026`, `30.06` → `14.07`

## Struktura strony (single-column, ścieżka konwersji)

1. **Hero**
   - Badge: „Darmowe szkolenie · zapisy do 14.07.2026"
   - H1: „Darmowe szkolenie NIS2 / KSC 2.0 dla firm"
   - Podtytuł: 4h praktyki, eksperci i prawnicy wdrażający NIS2, gotowy plan działania
   - 3 trust pille: „4h", „Stacjonarnie lub online", „Q&A z ekspertami"
   - Primary CTA: „Zapisz się na szkolenie" → `#promo-form`
   - Secondary CTA: „Zobacz program"
   - Wizualnie spójny z `TrainingPromoSection` (slate→blue, premium)

2. **Ból / dlaczego teraz (urgency)**
   - 3–4 karty z konkretnymi datami i kwotami:
     - „KSC 2.0 już obowiązuje (3.04.2026)"
     - „Samoidentyfikacja do 3.10.2026 — zostało < 4 miesiące"
     - „Kary do 10 mln EUR / 2% obrotu + 2-letni zakaz dla zarządu"
     - „~10 000 firm w 18 sektorach + cały ich łańcuch dostaw"
   - Krótki akapit: większość firm nie wie nawet, czy ich dotyczy

3. **Co dostaniesz — program 4h** (główna sekcja)
   - 5 bloków agendy (45/60/60/45/30 min) z ikonami i krótkimi opisami zgodnie z briefem:
     1. Czy to dotyczy Twojej firmy? (45 min)
     2. Cztery obszary obowiązków NIS2 (60 min)
     3. Rejestry i dokumentacja — co sprawdzi audytor (60 min)
     4. Jak się przygotować bez chaosu (45 min)
     5. Q&A (30 min)
   - Pasek: „Forma: stacjonarnie lub online"

4. **Dlaczego to szkolenie / dlaczego Quantifier**
   - 3 punkty: eksperci + prawnicy wdrażający NIS2 / praktyka, nie teoria / wychodzisz z planem działania
   - Krótki blok o Quantifier.ai: polska platforma GRC, fundament Envirly (300+ projektów, TÜV NORD), 250+ organizacji, 2000+ użytkowników, BNP Paribas jako referencja

5. **Mid-page CTA**
   - Wąski pasek przypominający deadline 14.07.2026 + przycisk „Zapisz się"

6. **Kalendarz NIS2 / KSC 2.0** (rozszerzenie bólu, edukacja)
   - Timeline z 4 datami: 3.04.2026 → 3.10.2026 → 3.04.2027 → 3.04.2028
   - Krótkie opisy pod każdą datą
   - Box „Obowiązki w 4 obszarach": zarządzanie ryzykiem / incydenty (24h/72h/1m) / łańcuch dostaw / odpowiedzialność zarządu
   - Box „Kary": kluczowe vs ważne

7. **FAQ (akordeon, 5–6 pytań)**
   - Czy moja firma podlega NIS2?
   - Czy łańcuch dostaw też?
   - Ile kosztuje szkolenie? (0 zł)
   - Stacjonarnie czy online?
   - Kto prowadzi?
   - Co dalej po szkoleniu?

8. **Końcowy CTA + formularz**
   - Sekcja `#promo-form` z `TrainingPromoForm`
   - Nad formularzem krótka obietnica: „Zostaw kontakt — odzywamy się w 1 dzień roboczy"
   - Pod formularzem disclaimer (liczba miejsc ograniczona, deadline 14.07.2026)

## Detale techniczne

- Komponent `Nis2TrainingLanding.tsx` zbudowany jako full-width (bez `PageTemplate`), spójnie ze standardem landing pages
- Navbar + Footer z istniejących komponentów
- SEO: `<SEOHead>` z tytułem „Darmowe szkolenie NIS2 / KSC 2.0 dla firm — Quantifier", meta description, canonical `/pl/darmowe-szkolenie-nis2/` (trailing slash), JSON-LD `Event` + `Course`
- Trailing slash zgodnie z core rule
- Dodać wpis do `LOCALIZED_SEGMENTS` w `src/lib/localized-routes.ts` (na razie tylko `pl`; `en`/`cs` mogą wskazywać na istniejącą `/training` lub być pominięte z `LOCALE_AVAILABILITY`)
- Wszystkie kolory przez semantic tokens (`bg-primary`, `text-white`, gradients z `index.css`), spójnie z `TrainingPromo2026.tsx`
- Sekcje na ciemnym tle: `text-white` (h2), `text-white/80` (opisy)
- Wszystkie wewnętrzne linki przez React Router `<Link>`
- Aktualizacja `TrainingPromo2026.tsx`: deadline `30.06.2026` → `14.07.2026` we wszystkich 3 językach + link z bannera/dialogu kieruje do `/pl/darmowe-szkolenie-nis2/#promo-form` (PL) — w EN/CS zostaje obecna kotwica do `#promo-form`
- Dodać link do nowego landingu z istniejącej sekcji `TrainingPromoSection` (przycisk „Sprawdź dostępność" → nowy landing zamiast `#promo-form`) — tylko dla PL

## Poza zakresem

- Wersje EN i CS tego landinga (zrobimy w kolejnym kroku, jeśli potrzeba)
- Zmiany w `TrainingPromoForm` (używamy as-is)
- Integracje CRM / Edge Functions (formularz już je obsługuje)
