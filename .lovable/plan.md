

## Plan: Wymiana logo GS1 i dodanie logo Envirly na thumbnailowej karcie /partners

### Zmiany

**1. Skopiować nowe logo do projektu**
- `user-uploads://gs1-logo.png` → `src/assets/gs1-logo-new.png`
- `user-uploads://logo_envirly_by_quantifier_1_6.png` → `src/assets/envirly-logo.png`

**2. Zaktualizować sekcję GS1 w `src/pages/Partners.tsx` (linie 84-89)**

Obecna lewa kolumna ma ciemne brązowe tło z jednym logo GS1 i tekstem "× Envirly by Quantifier.ai".

Zmiana:
- Tło lewej kolumny z ciemnego gradientu (`from-amber-900 via-stone-800 to-stone-900`) na jasne/białe (`bg-white`)
- Usunąć stary import `gs1Logo`, dodać import nowego logo GS1 i logo Envirly
- Wyświetlić oba loga obok siebie z separatorem "×" pomiędzy nimi
- Loga na jasnym tle będą czytelne (oba są bez tła — ciemne na przezroczystym)

### Szczegóły techniczne

- 2 nowe assety w `src/assets/`
- 1 plik komponentu: `src/pages/Partners.tsx` — zmiana importów i sekcji logo (linie 2, 86-89)
- Nie zmienia nic na podstronie `/partners/gs1-polska` — tylko thumbnail na `/partners`

