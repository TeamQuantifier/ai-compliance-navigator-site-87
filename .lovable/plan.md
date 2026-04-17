

## Plan: Dodanie ikon LCA i DPP do hero homepage

### Zakres
Dodanie dwóch nowych ikon w sekcji "Wspieramy kluczowe standardy compliance" na stronie głównej (`HeroSection.tsx`), dopasowanych stylowo do istniejących ikon (alternujący schemat `compliance-950` / `innovation-950`).

### Zmiany — plik `src/components/HeroSection.tsx`

Dodaję dwa nowe `<Link>` na końcu listy (po ISO 42001):

1. **LCA** — ikona `BarChart3` (już używana na stronie LCA), tło `innovation-950`, link do `/${currentLocale}/frameworks/product-level/lca-analysis`
2. **DPP** — ikona `QrCode` (używana na stronie DPP), tło `compliance-950`, link do `/${currentLocale}/frameworks/product-level/dpp`

Aby zachować naprzemienny schemat kolorów (compliance/innovation/compliance/innovation/compliance/innovation/compliance), dwie nowe ikony rozszerzą cykl: **LCA = innovation** (8. pozycja), **DPP = compliance** (9. pozycja).

Import nowych ikon: `BarChart3, QrCode` z `lucide-react`.

### Lokalizacja
Etykiety "LCA" i "DPP" pozostają jako akronimy uniwersalne dla wszystkich języków (PL/EN/CS) — analogicznie jak "GDPR", "ISO 27001", "AI Act". Linki używają `currentLocale`, więc działają poprawnie dla `/pl`, `/en`, `/cs`. Brak potrzeby zmian w plikach tłumaczeń.

### Pliki do edycji
- `src/components/HeroSection.tsx` — import 2 ikon + dodanie 2 bloków `<Link>` po ISO 42001

