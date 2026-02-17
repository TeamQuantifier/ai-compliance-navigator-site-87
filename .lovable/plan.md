

# Zmiana kolejnosci kategorii na stronie Frameworks

## Co sie zmieni

Zmiana kolejnosci 6 kategorii w siatce 3x2 na stronie `/frameworks`:

**Obecna kolejnosc:**
1. ESG | 2. Analizy produktowe | 3. Governance
4. Cyberbezpieczenstwo | 5. Bezpieczenstwo Informacji | 6. Ochrona Danych

**Nowa kolejnosc:**
1. Cyberbezpieczenstwo | 2. Bezpieczenstwo Informacji | 3. Governance
4. Analizy produktowe | 5. Ochrona Danych | 6. ESG

## Szczegoly techniczne

Zmiana dotyczy jednego pliku: `src/pages/frameworks/Frameworks.tsx`

Nalezy przestawic elementy tablicy `frameworksByCategory` w nastepujacej kolejnosci:
1. `cybersecurity` (obecnie pozycja 4)
2. `informationSecurity` (obecnie pozycja 5)
3. `governance` (obecnie pozycja 3)
4. `productAnalysis` (obecnie pozycja 2)
5. `dataSecurity` (obecnie pozycja 6)
6. `esg` (obecnie pozycja 1)

Brak wplywu na inne strony, SEO ani funkcjonalnosc -- zmienia sie wylacznie kolejnosc wyswietlania kart.

