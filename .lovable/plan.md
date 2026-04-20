

## Plan: Aktualizacja llms.txt o nowe strony

### Zakres
Dodanie brakujących stron do `supabase/functions/llms-txt/index.ts`:
- `/en/frameworks/product-level/lca-analysis` (LCA)
- `/en/frameworks/product-level/epd` (EPD)
- `/en/frameworks/product-level/dpp` (DPP - Digital Product Passport)
- `/en/partners/gs1-polska` (Partner GS1 Polska)

### Obecny stan
W pliku llms.txt brakuje powyższych ścieżek. Są one jedynie wspomniane pobieżnie w sekcji Environmental (linie 325-328), ale nie mają dedykowanych opisów w `FRAMEWORKS_SHORT`/`FRAMEWORKS_FULL`.

### Zmiany — plik `supabase/functions/llms-txt/index.ts`

1. **FRAMEWORKS_SHORT** (linia 195): Dodanie trzech nowych wpisów pod "Product Level":
   - LCA: `${BASE_URL}/en/frameworks/product-level/lca-analysis/` — Analiza cyklu życia (Life Cycle Assessment) zgodnie z ISO 14040/14044 i PEF, 16+ kategorii wpływu środowiskowego
   - EPD: `${BASE_URL}/en/frameworks/product-level/epd/` — Environmental Product Declaration zgodnie z ISO 14025 i EN 15804, weryfikowane deklaracje środowiskowe produktu
   - DPP: `${BASE_URL}/en/frameworks/product-level/` — Cyfrowy Paszport Produktu (Digital Product Passport), zbieranie i raportowanie danych zrównoważoności na poziomie produktu

2. **FRAMEWORKS_FULL** (linia 211): Dodanie pełnych sekcji opisujących:
   - **LCA** — metodologia ISO 14040/14044, PEF (Product Environmental Footprint), 16 kategorii wpływu (GWP, ecotoxicity, water use, etc.), zakresy analizy (cradle-to-gate, cradle-to-grave, gate-to-gate)
   - **EPD** — ISO 14025, EN 15804, trzecia strona weryfikująca, B2B przetargi, integracja z GS1
   - **DPP** — wymagania CSRD/ESG, Ecodesign for Sustainable Products Regulation (ESPR), łączenie danych z weryfikacją przez kod QR, redukcja due diligence o 60%

3. **PARTNERS_SHORT i PARTNERS_FULL**: Utworzenie nowej sekcji dla partnerów lub dodanie do istniejącej struktury:
   - **GS1 Polska** — `${BASE_URL}/en/partners/gs1-polska/` — Partner strategiczny, integracja z infrastrukturą kodów kreskowych i standardami GS1, 40 000+ firm w Polsce

### Pliki do edycji
- `supabase/functions/llms-txt/index.ts` — dodanie wpisów w sekcjach FRAMEWORKS_SHORT, FRAMEWORKS_FULL, oraz nowej sekcji PARTNERS (lub rozszerzenie istniejącej)

