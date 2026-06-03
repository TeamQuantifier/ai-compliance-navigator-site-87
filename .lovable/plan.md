
## Co naprawiamy

Na screenshocie widać **sekcję promo "Rejestracja do 30.06.2026"** (to nie hero, tylko sekcja zaraz pod hero) — jej dolna część jest jasna/biaława, przez co tekst po lewej („…100%", „…dofinansowaniu", disclaimer) jest praktycznie nieczytelny. Powód: gradient `from-slate-950 via-slate-900 to-primary/30` + duża plama radialna `from primary/0.25` → dół sekcji robi się jasnoniebieski/szary.

Dodatkowo: pop-up (dialog) i sticky banner mają pokazywać się w języku zgodnym z wersją strony (PL / EN / CS).

---

## 1. Sekcja promo — przyciemnienie tła

Plik: `src/components/promo/TrainingPromo2026.tsx` → `TrainingPromoSection`.

Zmiany:
- Gradient sekcji: `bg-gradient-to-br from-slate-950 via-slate-900 to-primary/30` → **`bg-slate-950`** + subtelny gradient `from-slate-950 via-slate-900 to-slate-950` (bez jaśnienia w stronę primary).
- Radial overlay: zmniejszyć intensywność z `0.25` → `0.12` i przesunąć tak, żeby nie rozjaśniał dolnej-lewej części (gdzie jest tekst). Druga subtelna plama w prawym górnym rogu (pod kartą daty).
- Karta daty (po prawej): tło `bg-white/[0.06]` → `bg-slate-900/60` + `border-white/10`, żeby trzymała kontrast z ciemniejszym tłem.
- Tagi NIS2 / KSC / ISO 27001: lekka zmiana na bardziej czytelne (`bg-primary/15`, `text-primary-foreground` lub jaśniejszy odcień) — obecnie ledwo widoczne.
- Disclaimer: `text-white/60` → `text-white/70` dla minimalnej poprawy kontrastu (zgodne z memory dla ciemnych teł).

Efekt: cała sekcja ma jednolicie ciemne, granatowe tło, tekst i karta daty mają wyraźny kontrast.

---

## 2. Pop-up i banner — lokalizacja PL / EN / CS

Komponent już przyjmuje `locale` z `currentLocale` (`useLanguage()`) i ma `COPY` dla `pl` / `en` / `cs`, więc logika powinna działać. Co zrobię, żeby to faktycznie zadziałało na produkcji:

- **Klucze `localStorage` per locale**, żeby zamknięcie banneru/popupu po polsku nie blokowało wyświetlenia na EN/CS (i odwrotnie):
  - `promo2026.banner.dismissed` → `promo2026.banner.dismissed.${locale}`
  - `promo2026.dialog.dismissed` → `promo2026.dialog.dismissed.${locale}`
- Dodam **fallback locale**: jeśli `currentLocale` z jakiegoś powodu nie jest `pl/en/cs`, czytam locale z `window.location.pathname` (`/en/...` → `en`, `/cs/...` → `cs`, domyślnie `pl`). To zabezpiecza przed sytuacją, w której kontekst języka nie jest jeszcze zainicjalizowany przy pierwszym renderze.
- Reset triggerów (countdown 15s, scroll 50%, exit-intent) — bez zmian.

Dzięki temu na `/en/cybersecurity-training-for-companies` zobaczysz banner + dialog po angielsku, a na `/cs/skoleni-kyberneticka-bezpecnost-pro-firmy` — po czesku.

---

## Pliki

- `src/components/promo/TrainingPromo2026.tsx` — zmiany w `TrainingPromoSection` (tło, karta, tagi, disclaimer) + lokalne klucze `localStorage` + fallback locale dla `TrainingPromoBanner` i `TrainingPromoDialog`.

Bez zmian w treści, tłumaczeniach (`COPY` już ma `pl/en/cs`) ani w samym hero strony szkoleń.
