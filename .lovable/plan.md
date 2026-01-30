

# Plan: Naprawa sekcji "Why ISO 27001 Matters" - brakujące tłumaczenia

## Zidentyfikowany problem

Użytkownik widzi mieszankę:
- **Klucze jako tekst**: `iso27001Page.whyMatters.cards.penalties.stat` - bo nowe klucze nie istnieją w aktywnym pliku
- **Stare wartości**: `6-12 mo`, `Typical Timeline` - ze starej struktury tłumaczeń

### Przyczyna

Pliki tłumaczeń `src/i18n/locales/` NIE zostały zaktualizowane. Zawierają starą strukturę z 3 kartami (`breachCost`, `clientRequirement`, `timeline`) zamiast nowych 4 kart (`penalties`, `downtime`, `reputation`, `timeline`).

Mimo że konfiguracja i18n wskazuje na `public/locales/`, system może cache'ować lub łączyć dane z obu źródeł.

---

## Rozwiązanie

Zaktualizować pliki `src/i18n/locales/en.json` i `src/i18n/locales/pl.json` z nowymi kluczami `whyMatters.cards`.

---

## Pliki do modyfikacji

### 1. `src/i18n/locales/en.json` (linie ~2650-2666)

**Aktualna (niepoprawna) struktura:**
```json
"whyMatters": {
  "cards": {
    "breachCost": { ... },      // DO USUNIĘCIA
    "clientRequirement": { ... }, // DO USUNIĘCIA
    "timeline": { "stat": "6-12 mo", ... }  // DO AKTUALIZACJI
  }
}
```

**Nowa struktura (4 karty):**
```json
"whyMatters": {
  "title": "Why ISO 27001 Matters",
  "subtitle": "Information security certification is no longer optional—it's a business imperative",
  "cards": {
    "penalties": {
      "title": "Penalties for Data Breaches",
      "stat": "€3-10M+",
      "description": "Fines for data breaches under GDPR and other regulations can be severe."
    },
    "downtime": {
      "title": "Business Downtime",
      "stat": "",
      "description": "Security incidents can paralyze business operations for days or weeks."
    },
    "reputation": {
      "title": "Reputation & Client Loss",
      "stat": "",
      "description": "Data breaches lead to loss of trust from customers and business partners."
    },
    "timeline": {
      "title": "Typical Timeline",
      "stat": "12 mo",
      "description": "Average time to achieve certification without automation—Quantifier cuts this significantly."
    }
  }
}
```

### 2. `src/i18n/locales/pl.json` (linie ~2524-2544)

**Nowa struktura (4 karty):**
```json
"whyMatters": {
  "title": "Dlaczego ISO 27001 ma znaczenie",
  "subtitle": "Certyfikacja bezpieczeństwa informacji nie jest już opcjonalna — to imperatyw biznesowy",
  "cards": {
    "penalties": {
      "title": "Kary związane z naruszeniem danych",
      "stat": "3-10 mln+ PLN",
      "description": "Wysokość kar za naruszenie danych osobowych zgodnie z RODO i innymi regulacjami."
    },
    "downtime": {
      "title": "Przestoje w działalności",
      "stat": "",
      "description": "Incydenty bezpieczeństwa mogą sparaliżować operacje firmy na dni lub tygodnie."
    },
    "reputation": {
      "title": "Utrata reputacji i klientów",
      "stat": "",
      "description": "Naruszenia danych prowadzą do utraty zaufania klientów i partnerów biznesowych."
    },
    "timeline": {
      "title": "Typowy harmonogram",
      "stat": "12 mies.",
      "description": "Średni czas uzyskania certyfikacji bez automatyzacji — Quantifier znacząco to skraca."
    }
  }
}
```

---

## Dodatkowa propozycja: Spójne nagłówki dla kart bez statystyk

Użytkownik poprosił o nagłówki dla spójności. Dla kart bez statystyk (downtime, reputation) proponuję dodać **ikonowe akcenty** lub **krótkie podtytuły**:

| Karta | Stat | Nagłówek główny | Propozycja podtytułu |
|-------|------|-----------------|---------------------|
| Penalties | 3-10 mln+ PLN | Kary związane z naruszeniem danych | — |
| Downtime | (brak) | Przestoje w działalności | **Dni lub tygodnie** |
| Reputation | (brak) | Utrata reputacji i klientów | **Trudna do odbudowania** |
| Timeline | 12 mies. | Typowy harmonogram | — |

Alternatywnie, dla kart bez statystyk można wyświetlić ikonę w większym rozmiarze jako "statystykę wizualną".

---

## Podsumowanie zmian

| Plik | Zmiana |
|------|--------|
| `src/i18n/locales/en.json` | Zastąpić `breachCost`, `clientRequirement` na `penalties`, `downtime`, `reputation`, zaktualizować `timeline` |
| `src/i18n/locales/pl.json` | Zastąpić starą strukturę `whyMatters.cards` na nową z 4 kartami |

Po tych zmianach sekcja "Why ISO 27001 Matters" będzie wyświetlać wszystkie 4 karty z poprawnymi tłumaczeniami.

