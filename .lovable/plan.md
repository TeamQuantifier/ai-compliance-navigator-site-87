

# Plan: Przebudowa strony About Us

## Zmiany w `src/pages/About.tsx`

### 1. Usunac cala sekcje Timeline/History (linie 168-190)
Usunac `milestones` array i caly blok renderowania timeline.

### 2. Zmienic subtitle
Nowa tresc: "Quantifier.ai zostal oficjalnie zalozony w 2025 roku. Rozwijamy platforme AI do zarzadzania wieloma standardami compliance."

### 3. Zmienic nazwe sekcji highlights
"Nasza historia w liczbach" → "O nas w skrocie" (PL), "About Us at a Glance" (EN), "O nas v kostce" (CS)

### 4. Zespol — usunac slowo "kierowniczy", zamienic dane
Naglowek: "Zespol" (nie "Zespol kierowniczy"). Nowe osoby:
- **Mateusz Masiak** — CEO, Co-founder, "Prezes i wspolzalozyciel Quantifier.ai", linkedin: mmasiak
- **Weronika Czaplewska** — VP, Co-founder, "Wspolzalozycielka Quantifier.ai", linkedin: weronika-czaplewska
- **Paulina Klimiuk** — Head of Customer Success, linkedin: paulina-klimiuk
- **Enrika Gawlowska-Nabozny** — Project Manager, linkedin: enrikagn

### 5. Sekcja "Nasz wplyw" — nowe liczby
- "250+" → "Ponad 250 klientow" (label: "Klientow obsluzone")
- "30+" → "Ponad 30 aktywnych firm na platformie Quantifier.ai" (label: "Aktywnych firm")
- Usunac trzecia kolumne (50+ partnerow) lub zamienic na cos sensownego

### 6. Lokalizacje — "Nasze biuro", tylko Warszawa
Naglowek: "Nasze biuro" (nie "Nasze biura"). Dane kontaktowe:
- Europa: (+48) 698 759 206
- Warszawa: Rondo Daszynskiego 1
- Lublin: Glowackiego 3/5/1

Usunac San Francisco.

### 7. Dodac zdjecie zespolu na dole
Skopiowac `user-uploads://quantifier_team.jpeg` do `public/images/quantifier-team.jpg`. Wyswietlic pod sekcja CTA (lub przed CTA) z podpisem "Konferencje".

### 8. Zaktualizowac schema Organization
- `foundingDate`: 2025
- Usunac San Francisco z adresow
- Zamienic `member[]` na nowe osoby

---

## Pliki do edycji

| Plik | Zmiana |
|------|--------|
| `src/pages/About.tsx` | Kompletna przebudowa (timeline, team, stats, locations, zdjecie) |
| `src/i18n/locales/pl.json` | Nowe tlumaczenia about.* |
| `src/i18n/locales/en.json` | Nowe tlumaczenia about.* |
| `public/locales/pl/translation.json` | Nowe tlumaczenia about.* |
| `public/locales/en/translation.json` | Nowe tlumaczenia about.* |
| `public/locales/cs/translation.json` | Nowe tlumaczenia about.* |
| `public/images/quantifier-team.jpg` | Skopiowane zdjecie zespolu |

