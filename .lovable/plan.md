# Redesign strony KSC START w stylu topowej kancelarii

Zakres: wyłącznie `/pl/start-nis2-ksc/`. Obecna typografia zostaje bez zmian. Nowa paleta: granat kancelaryjny (#0f1b3d, #1e3a5f, #3b6fa0, #e8edf3). Układ hero: split screen.

## Dlaczego teraz wygląda "AI-owo"

- Wszystko jest w domyślnym slate + niebieskim akcencie, sekcje naprzemiennie białe/szare bez rytmu.
- Dużo kolorowych ikon w kółkach, zaokrąglone karty z cieniami, gradienty — typowy język landingów SaaS, nie kancelarii.
- Brak hierarchii: każda sekcja krzyczy równie mocno, nagłówki tej samej wagi.

## Kierunek wizualny

Powaga i redakcyjny spokój zamiast efektów: dużo światła, cienkie linie zamiast cieni, ostrzejsze narożniki, akcent granatowy, złamana biel jako tło treści.

- Kolor: granat #0f1b3d jako dominanta sekcji ciemnych, #1e3a5f dla powierzchni, #3b6fa0 wyłącznie jako akcent (linki, ikony, podkreślenia), #e8edf3 jako jasne tło przekładek.
- Kształt: promień 2–4 px zamiast `rounded-2xl`, brak `shadow-2xl`, obramowania 1 px w granacie 10–15%.
- Ikony: monochromatyczne, cienka kreska, bez kolorowych tłem kółek.
- Rytm: nagłówek sekcji wyrównany do lewej z krótką linią-akcentem nad nim (kicker), nie wszystko wyśrodkowane.
- Numeracja jak w dokumencie prawnym: 01 / 02 / 03 w wersalikach, ze spacjonowaniem.

## Nowa struktura strony

1. **Hero — split screen.** Lewa kolumna (60%): kicker "Pakiet startowy NIS2 / KSC", H1, jeden akapit, licznik dni jako powściągliwa pozioma listwa (nie kolorowy pill), trzy krótkie dowody (10 dni roboczych / 5 elementów / 0 zł). Prawa kolumna (40%): formularz na jasnej karcie z cienką ramką, przypięty na desktopie. Tło: granat #0f1b3d z bardzo subtelną siatką linii zamiast gradientowych plam.
2. **Pasek zaufania.** Wąski jasny pas pod hero: logotypy / "Zespół prawników i praktyków audytu" — buduje autorytet od razu.
3. **Zegar ustawowy (3 daty).** Pozioma oś czasu na białym tle, cienka linia, daty jako duże liczby, opis pod spodem. Bez kart z cieniem.
4. **Zakres pakietu (5 elementów).** Lista dwukolumnowa w stylu spisu treści: numer, tytuł, punkty. Separatory liniowe zamiast kafelków.
5. **Harmonogram 10 dni.** Tabela dzień-po-dniu (nagłówki wersaliki, wiersze rozdzielone linią) — czyta się jak plan prac kancelarii.
6. **Cena 0 zł vs 5 000 zł.** Sekcja granatowa, dwie kolumny kontrastu, bez gradientu, akcent #3b6fa0 na kwocie.
7. **Dla kogo.** Trzy profile podmiotów, tekstowo, z ikoną liniową.
8. **FAQ.** Bez zmian merytorycznych, przestylizowane akordeony (linie zamiast kart).
9. **CTA końcowe.** Granatowa sekcja, powtórzony formularz, jedno zdanie zamknięcia.

## Szczegóły techniczne

- Nowe tokeny semantyczne w `src/index.css` scope'owane do klasy strony (np. `.ksc-theme`), żeby nie ruszać globalnego motywu: `--ksc-ink`, `--ksc-surface`, `--ksc-accent`, `--ksc-paper`, plus mapowanie w `tailwind.config.ts` jako paleta `ksc`.
- Przebudowa JSX w `src/pages/services/KscStart.tsx` — sekcje jak wyżej; treść merytoryczna, daty, FAQ i CTA pozostają bez zmian.
- `KscStartForm` dostaje wariant `paper` (jasna karta, ramka 1 px, pola bez zaokrągleń, przycisk pełnej szerokości w granacie).
- Bez zmian w SEO: canonical, hreflang PL-only, schema Service + BreadcrumbList + FAQPage zostają jak są.
- Logika formularza (`contact-form`, tagowanie leada KSC START) nietknięta.
