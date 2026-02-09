

# Plan: Dodanie brakujacych tlumaczen czeskich (CS) do 10 oryginalnych stron w prerender-marketing

## Zakres zmian

Dokladnie 10 stron w `prerender-marketing` posiada jedynie wersje EN i PL, bez czeskiej (CS). Gdy Googlebot odwiedza te strony z prefiksem `/cs/`, otrzymuje angielski fallback, co powoduje niespojnosc z czeskimi znacznikami hreflang i prowadzi do problemow z indeksowaniem.

## Strony wymagajace tlumaczen CS

| # | Klucz strony | Linie w pliku | Opis |
|---|---|---|---|
| 1 | `soc2-automation` | 224-316 | Automatyzacja SOC 2 - zbieranie dowodow, ciagly monitoring |
| 2 | `iso27001` | 318-402 | ISO 27001 ISMS - analiza luk, ocena ryzyka, kontrole Annex A |
| 3 | `gdpr-compliance` | 404-489 | GDPR/RODO - mapowanie danych, DSAR, oceny wplywu na prywatnosc |
| 4 | `nis2` | 491-576 | NIS2 - zarzadzanie ryzykiem cybernetycznym, raportowanie incydentow |
| 5 | `grc-platform` | 578-665 | Platforma GRC - governance, ryzyko, zgodnosc, wiele frameworkow |
| 6 | `product-features` | 667-734 | Funkcje produktu - AI officer, ryzyko, dokumenty, analityka |
| 7 | `plans` | 736-793 | Cennik - plany Starter, Professional, Enterprise |
| 8 | `about` | 795-845 | O nas - misja firmy, historia, zespol |
| 9 | `contact` | 847-889 | Kontakt - demo, informacje o cenach, partnerstwo |
| 10 | `partners` | 891-942 | Partnerzy - program partnerski, korzysc, typy wspolpracy |

## Struktura kazdego tlumaczenia CS

Kazda strona otrzyma:
- `title` - czeski tytul SEO z marka Quantifier
- `description` - czeski meta opis 150-160 znakow
- `h1` - glowny naglowek po czesku
- `subtitle` - podtytul (gdzie istnieje w wersji EN)
- `sections` - sekcje z naglowkami H2 i punktami przetlumaczonymi na czeski
- `faqs` - tlumaczenie istniejacych FAQ (dla stron ktore je posiadaja: SOC2, ISO27001, GDPR, NIS2, GRC, Plans)
- `internalLinks` - linki wewnetrzne z czeskimi etykietami

## Przykladowa tresc CS dla wybranych stron

### SOC 2
- title: "Platforma pro automatizaci SOC 2 - Dosahte shody 10x rychleji | Quantifier"
- h1: "Platforma pro automatizaci SOC 2"
- Sekcje: Problemy rucni shody, Jak Quantifier automatizuje SOC 2, Kriteria dusteryhodnosti

### ISO 27001
- title: "Software pro shodu s ISO 27001 - Vybudujte ISMS s AI | Quantifier"
- h1: "Software pro shodu s ISO 27001"
- Sekcje: Proc je certifikace dulezita, Vyzvy implementace, ISMS s AI

### GDPR
- title: "Software pro shodu s GDPR - Automatizace ochrany dat | Quantifier"
- h1: "Software pro shodu s GDPR"
- Sekcje: Prehled pozadavku GDPR, Sprava prav subjektu udaju

### NIS2
- title: "Platforma pro shodu s NIS2 - Pozadavky kyberneticke bezpecnosti EU | Quantifier"
- h1: "Platforma pro shodu s NIS2"
- Sekcje: Porozumeni smernici NIS2, Kdo musi splnovat NIS2, Hlasen incidentu

## Plik do edycji

**supabase/functions/prerender-marketing/index.ts** - dodanie bloku `cs: { ... }` do kazdej z 10 stron.

Kazdy blok CS bedzie wstawiany bezposrednio po istniejacym bloku `pl: { ... }` w danej stronie.

## Terminologia czeska

Uzyta zostanie spojna terminologia stosowana juz w istniejacych tlumaczeniach CS:
- compliance -> shoda
- framework -> standard / ramec
- risk assessment -> hodnoceni rizik
- evidence -> dukazy
- audit trail -> auditni stopa
- dashboard -> dashboard (zachowane)
- governance -> rizeni / governance
- pricing -> cenik
- contact -> kontakt

## Szacowany rozmiar zmian

Kazda strona CS wymaga okolo 15-30 linii kodu (w zaleznosci od liczby sekcji i FAQ). Laczna zmiana to okolo 200-250 nowych linii w jednym pliku.

## Wplyw na SEO

Po wdrozeniu:
- Googlebot odwiedzajacy `/cs/frameworks/soc`, `/cs/grc-platform`, `/cs/plans` itd. otrzyma pelna tresc po czesku
- Tagi hreflang beda spoisie wskazywac na czeskojezyzcna tresc
- 54 stron "wykryte, niezindeksowane" w Google Search Console powinno zaczac byc indeksowanych

