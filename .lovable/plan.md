

# Plan: Implementacja rekomendacji Blog + Success Stories + About Us + Nawigacja

Dokument opisuje 4 obszary zmian. Czesc z nich juz zostala zrealizowana (przeniesienie BookPromo/PostgraduatePromo pod grid na Success Stories). Ponizej plan pozostalych zmian.

---

## Co juz zrobione

- BookPromoSection i PostgraduatePromoSection przeniesione pod grid case studies na `/success-stories` (Quick Wins)
- llms.txt rozbudowany o sekcje Competitors, Team, Awards

## Co pozostaje do implementacji

---

### 1. Nawigacja — mega menu "Wiedza" + przywrocenie "O nas"

**Plik**: `src/components/Navbar.tsx`

Obecna nawigacja ma oddzielne linki: Blog, Success Stories, Partners, Contact. Zmiana:

- Polaczyc **Blog**, **Success Stories**, **Events** w jeden dropdown/link **"Wiedza"** (EN: "Resources", CS: "Znalosti")
- Przywrocic link **"O nas"** (EN: "About", CS: "O nas") do nawigacji glownej
- Usunac Success Stories i Blog jako oddzielne pozycje menu

Nowa struktura menu:
```text
Produkt | Role | Frameworki | Plany | Partnerzy | Wiedza | O nas | Kontakt | [Cyberbezpieczenstwo]
                                                    |
                                                    +-- Blog
                                                    +-- Success Stories  
                                                    +-- Events / Webinary
```

**Plik**: `src/components/Footer.tsx` (linia 116-151)
- Dodac link "O nas" (`/about`) w sekcji "Company"
- Rozdzielic na dwie podgrupy: "Firma" (O nas, Partnerzy, Kontakt) i "Zasoby" (Blog, Success Stories, Events)

**Pliki tlumaczen**: `public/locales/*/translation.json`
- Dodac klucze: `menu.knowledge` (Wiedza/Resources/Znalosti), `menu.about` (O nas/About/O nás)
- Dodac klucze footera: `footer.resources.title`, `footer.company.about`

---

### 2. Przebudowa strony About Us — hub E-E-A-T

**Plik**: `src/pages/About.tsx` — kompletna przebudowa

Nowa struktura sekcji (od gory):

1. **Hero** — misja firmy, gradient tlo (zachowac istniejacy styl)
2. **Historia** — timeline: Envirly → Quantifier.ai, kluczowe kamienie milowe
3. **Zespol kierowniczy** — grid 3-4 kolumny z placeholderami:
   - Zdjecie (placeholder avatar)
   - Imie i nazwisko
   - Stanowisko
   - Krotkie bio (2-3 zdania)
   - Link LinkedIn
   - Dane w tablicy w kodzie, latwe do uzupelnienia
4. **Liczby** — zachowac istniejaca sekcje (250+, 50+, 3+), dodac wiecej kontekstu
5. **Nagrody i certyfikaty** — TÜV NORD, inne
6. **Nasze publikacje** — przeniesiony `BookPromoSection`
7. **Edukacja** — przeniesiony `PostgraduatePromoSection`
8. **Lokalizacje** — mapa z Warsaw, Lublin, San Francisco
9. **CTA** — zachowac istniejacy

**Schema JSON-LD**:
- `Organization` z `member[]` zawierajacym `Person` entities (name, jobTitle, worksFor, url LinkedIn)
- `BreadcrumbList`: Home > O nas

---

### 3. Usuniecie promo sekcji z Success Stories

**Plik**: `src/pages/SuccessStories.tsx`
- Usunac `BookPromoSection` i `PostgraduatePromoSection` calkowicie (przeniesione do About)
- Usunac importy tych komponentow

Strona Success Stories zostaje czysta — tylko hero + grid case studies + empty state.

---

### 4. Filtrowanie case studies (opcjonalne, nizszy priorytet)

Dokument rekomenduje filtrowanie po frameworku i branzy na Success Stories. Wymaga to:
- Dodania komponentu filtrow nad gridem
- Filtrowania po polach `industry` i ewentualnie tagach/frameworkach z bazy
- Mozna zrealizowac pozniej, gdy bedzie wiecej case studies

---

## Podsumowanie plikow do edycji

| Plik | Zmiana |
|------|--------|
| `src/components/Navbar.tsx` | Mega menu "Wiedza", link "O nas" |
| `src/components/MobileMenu.tsx` | Dostosowanie do nowej struktury |
| `src/components/Footer.tsx` | Dodanie "O nas", reorganizacja sekcji |
| `src/pages/About.tsx` | Kompletna przebudowa z nowymi sekcjami |
| `src/pages/SuccessStories.tsx` | Usuniecie BookPromo + PostgraduatePromo |
| `public/locales/pl/translation.json` | Nowe klucze menu + about |
| `public/locales/en/translation.json` | Nowe klucze menu + about |
| `public/locales/cs/translation.json` | Nowe klucze menu + about |

Lacznie ~8 plikow. Brak zmian w bazie danych. Brak nowych tabel.

---

## Czego NIE implementujemy (wymaga decyzji/materialow)

- **Zdjecia i bio zespolu** — plan uzywa placeholderow, do uzupelnienia po dostarczeniu materialow
- **Filtrowanie case studies** — nizszy priorytet, do realizacji osobno
- **Content strategy** (25-30 artykulow, pillar/cluster content) — to strategia contentowa, nie zmiana kodu
- **Podstrony About** (osobna strona Historia, osobna Publikacje) — dokument sugeruje hub z podstronami, ale na tym etapie lepiej zrobic jedna rozbudowana strone About, a podstrony dodac gdy bedzie wiecej tresci

