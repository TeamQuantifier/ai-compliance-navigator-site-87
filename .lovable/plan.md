# Podstrona dla urzędów / JST: „KSC dla samorządów”

Adres: `/pl/ksc-dla-samorzadow/` (tylko PL — grupa docelowa to polskie urzędy). Ton urzędowo-rzeczowy, bez straszenia karami (moratorium do 04.2028), zgodność z WCAG 2.1 (kontrast, focus, etykiety pól, semantyczne nagłówki, alt, nawigacja klawiaturą).

Pozycjonowanie: „SZBI, który działa po grancie: KRI i KSC w jednym systemie, od corocznego audytu do audytu 2028.” Filary: Ciągłość, Dowody, Prosty zakup.

## Sekcje (od góry)
1. **Hero** — H1 „SZBI w urzędzie po Cyberbezpiecznym Samorządzie: KRI i KSC w jednym systemie”, zdanie o korzyściach. CTA główne: „Bezpłatny przegląd: co zostało po grancie (30 min)” (przewija do formularza). CTA drugie: „Pobierz uzasadnienie wydatku do budżetu 2027”.
2. **Wybór typu urzędu** — 3 kafle: gmina do 50 etatów (podmiot ważny), urząd kluczowy (audyt do 3.04.2028), lider partnerstwa LCC. Kliknięcie podświetla pakiet i zapisuje typ w formularzu (kwalifikacja leada).
3. **Problem w trzech faktach** — trwałość CS 2 lata, coroczny audyt § 19 KRI, KSC (odpowiedzialność kierownika, incydenty 24 h, szkolenie co roku).
4. **Oś czasu** — 30.09.2026, 30.10.2026, 15.11.2026, 3.04.2027, 3.04.2028 (z oznaczeniem, które terminy już minęły).
5. **Co dostajecie** (język zapytań ofertowych) + jeden mockup „teczki dowodowej” (interaktywny komponent React, nie zrzut).
6. **Jak kupić** — 4 kroki: przegląd → zapytanie ofertowe (<130 tys. zł netto) → umowa → realizacja zdalna. Do pobrania: neutralny wzór OPZ, lista kwalifikacji wykonawcy.
7. **Pakiety z widełkami cen** — 3 pakiety odpowiadające kaflom.
8. **Zaufanie** — BNP Paribas, książka C.H. Beck, hosting w UE, umowa powierzenia, kwalifikacje audytorów, miejsce na referencję JST.
9. **Dla liderów LCC** — jedna platforma, każdy urząd własny SZBI, lider widzi stan wszystkich.
10. **FAQ** (FAQPage schema) — 5 pytań z dokumentu.
11. **Formularz** — maks. 4 pola: nazwa urzędu (z podpowiedziami listy JST), rola, e-mail, „Czy realizowaliście grant CS?”. Wysyłka istniejącą funkcją formularza kontaktowego → widoczne w panelu Leadów.

**ABM:** parametry w linku (`?urzad=Urząd Miasta Gliwice&jednostki=67`) personalizują nagłówek: „Urząd Miasta Gliwice: utrzymanie SZBI dla 67 jednostek”. Canonical zawsze bez parametrów.

**SEO:** title „SZBI dla urzędu: audyt KRI i KSC po grancie | Quantifier”, description z dokumentu, canonical z trailing slash, Breadcrumb + FAQPage JSON-LD, wpis w sitemapie i prerenderze.

**Nawigacja:** link „Dla samorządów” w menu (PL) i w stopce.

## Do potwierdzenia przez Ciebie (użyję placeholderów)
- Widełki cen pakietów.
- Pliki: uzasadnienie wydatku 2027, wzór OPZ, lista kwalifikacji — na start wygeneruję treść/PDF-y szkicowe lub przyciski „wyślemy e-mailem” po zapisie.
- Referencje JST (jeśli są).

## Szczegóły techniczne
- Nowy plik `src/pages/services/KscSamorzady.tsx` (wzorzec jak `KscStart.tsx`), trasa w `App.tsx`, redirect bez slasha w `netlify.toml`.
- Lista JST: statyczna lista podpowiedzi (`datalist`) z najczęstszych urzędów + wolny tekst.
- Formularz: `contact-form` z `source_url` i polami w `message`/metadanych; `cleanPayload`.
- `SEOHead`, `deferPrerender`, aktualizacja sitemapy w funkcji edge.
