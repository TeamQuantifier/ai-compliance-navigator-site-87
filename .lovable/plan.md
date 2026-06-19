## Cel

W zakładce **VSME** na stronie `/:locale/frameworks/esg` dodać nową sekcję z:
1. Miejscem na filmik (placeholder gotowy do podmiany, gdy prześlesz plik).
2. Statycznym tekstem narracji (treść Twojego posta o module VSME / Leon AI).

## Co zmieniam

### 1. `src/pages/frameworks/Esg.tsx` — rozbudowa `TabsContent value="vsme"`

Pod istniejącym gridem (opis + `VsmeDarkMockup`) dodaję nową sekcję w 2 kolumnach:

- **Lewa kolumna — wideo placeholder**
  - Kontener `aspect-video` z `rounded-xl`, gradient slate, ikona `Play`, podpis „Filmik wkrótce" (PL) / „Video coming soon" (EN) / „Video brzy" (CS).
  - Przygotowany pod podmianę: jeden `<video>` lub `<iframe>` (YouTube embed) — po przesłaniu pliku/URL podmienię to w jednym miejscu.

- **Prawa kolumna — narracja**
  - Nagłówek: „📄 Raportowanie VSME dla MŚP właśnie stało się dużo prostsze."
  - Akapit wstępny.
  - Pod-nagłówek „Jak to działa?" z 4 punktami (✅) jako lista.
  - Akapit „Efekt? …".
  - Akapit „Co więcej, moduł jest zintegrowany…".
  - Akapit zamykający „To kolejny krok w kierunku świata…".
  - CTA na końcu: „🚀 Wgraj dokumenty. Leon zajmie się resztą." jako wyróżniony przycisk linkujący do `envirly.pl` (PL) / `envirly.com` (EN/CS), analogicznie do istniejącej sekcji Envirly na górze strony.

Sekcja oddzielona `mt-12 pt-12 border-t border-slate-200`, tytuł sekcji: „Nowość: moduł VSME w Envirly" (PL) / „New: VSME module in Envirly" (EN) / „Novinka: modul VSME v Envirly" (CS).

### 2. Tłumaczenia (i18n)

Dodaję nowy blok `esgPage.vsme.envirly` w `src/i18n/locales/pl/*.json`, `en/*.json`, `cs/*.json` (sprawdzę najpierw strukturę plików), zawierający:
- `sectionTitle`
- `videoPlaceholder`
- `headline`
- `intro`
- `howItWorksTitle`
- `steps` (array 4 elementów)
- `effect`
- `integration`
- `closing`
- `cta`

Polska wersja używa Twojego oryginalnego tekstu 1:1. EN i CS dostaną wierne tłumaczenie utrzymujące ten sam ton i strukturę.

### 3. Zero zmian w innych miejscach

- Nie ruszam istniejących mockupów, FAQ, CTA, ani innych zakładek (CSDR/GRI/CBAM).
- Nie ruszam routingu ani SEO — strona już ma poprawny canonical + hreflang.

## Po Twojej stronie

Gdy prześlesz filmik (URL YouTube/Vimeo albo plik MP4), w jednej iteracji podmienię placeholder na właściwy `<iframe>` lub `<video controls>`.
