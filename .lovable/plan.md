

# Plan: Aktualizacja sekcji "Why ISO 27001 Matters" na stronie ISO 27001

## Cel
Zmienić sekcję z 3 kart na 4 karty z nową treścią zgodną z wymaganiami użytkownika.

---

## Aktualna struktura (3 karty)

| Karta | Statystyka | Tytuł |
|-------|------------|-------|
| 1 | $4.45M | Average Breach Cost |
| 2 | 80%+ | Client Requirements |
| 3 | 6-12 mo | Typical Timeline |

---

## Nowa struktura (4 karty)

| Karta | Statystyka | Tytuł PL | Tytuł EN |
|-------|------------|----------|----------|
| 1 | 3 - 10 mln+ PLN | Kary związane z naruszeniem danych | Penalties for Data Breaches |
| 2 | - | Przestoje w działalności | Business Downtime |
| 3 | - | Utrata reputacji i klientów | Reputation & Client Loss |
| 4 | 12 mies. | Typowy harmonogram | Typical Timeline |

---

## Pliki do modyfikacji

### 1. Komponent React: `src/pages/frameworks/information-security/Iso27001.tsx`

Zmiana w sekcji "Why ISO 27001 Matters" (linie 115-175):
- Zmienić grid z `grid-cols-3` na `grid-cols-2 lg:grid-cols-4`
- Dodać czwartą kartę
- Zmienić klucze tłumaczeń do nowych nazw:
  - `breachCost` → `penalties` (kary)
  - `clientRequirement` → `downtime` (przestoje)
  - `timeline` pozostaje, ale przesunięty na 4. pozycję
  - Nowa karta: `reputation` (utrata reputacji)

**Nowy układ kart:**
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Karta 1: Kary */}
  <Card>
    <Euro icon /> 
    "3 - 10 mln+ PLN"
    "Kary związane z naruszeniem danych"
  </Card>
  
  {/* Karta 2: Przestoje */}
  <Card>
    <AlertTriangle icon />
    No stat (or icon emphasis)
    "Przestoje w działalności"
  </Card>
  
  {/* Karta 3: Reputacja */}
  <Card>
    <Users icon />
    No stat (or icon emphasis)
    "Utrata reputacji i klientów"
  </Card>
  
  {/* Karta 4: Harmonogram */}
  <Card>
    <Clock icon />
    "12 mies."
    "Typowy harmonogram"
  </Card>
</div>
```

### 2. Pliki tłumaczeń

#### `public/locales/pl/translation.json` (linie ~2771-2787)

```json
"whyMatters": {
  "title": "Dlaczego ISO 27001 ma znaczenie",
  "subtitle": "Certyfikacja bezpieczeństwa informacji nie jest już opcjonalna — to imperatyw biznesowy",
  "cards": {
    "penalties": {
      "title": "Kary związane z naruszeniem danych",
      "stat": "3 - 10 mln+ PLN",
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

#### `public/locales/en/translation.json` (linie ~2886-2905)

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

#### `public/locales/cs/translation.json`

```json
"whyMatters": {
  "title": "Proč je ISO 27001 důležité",
  "subtitle": "Certifikace informační bezpečnosti již není volitelná — je to obchodní imperativ",
  "cards": {
    "penalties": {
      "title": "Pokuty za porušení dat",
      "stat": "3 - 10 mil.+ Kč",
      "description": "Pokuty za porušení dat podle GDPR a dalších předpisů mohou být vysoké."
    },
    "downtime": {
      "title": "Výpadky provozu",
      "stat": "",
      "description": "Bezpečnostní incidenty mohou paralyzovat podnikové operace na dny nebo týdny."
    },
    "reputation": {
      "title": "Ztráta reputace a klientů",
      "stat": "",
      "description": "Porušení dat vede ke ztrátě důvěry zákazníků a obchodních partnerů."
    },
    "timeline": {
      "title": "Typický harmonogram",
      "stat": "12 měs.",
      "description": "Průměrná doba k dosažení certifikace bez automatizace — Quantifier to výrazně zkracuje."
    }
  }
}
```

---

## Wizualizacja nowego layoutu

```text
Desktop (lg:grid-cols-4):
┌─────────────┬─────────────┬─────────────┬─────────────┐
│    KARY     │  PRZESTOJE  │  REPUTACJA  │ HARMONOGRAM │
│ 3-10 mln+   │     ⚠️      │     👥      │   12 mies.  │
│    PLN      │             │             │             │
└─────────────┴─────────────┴─────────────┴─────────────┘

Tablet (sm:grid-cols-2):
┌─────────────┬─────────────┐
│    KARY     │  PRZESTOJE  │
├─────────────┼─────────────┤
│  REPUTACJA  │ HARMONOGRAM │
└─────────────┴─────────────┘

Mobile (grid-cols-1):
┌─────────────┐
│    KARY     │
├─────────────┤
│  PRZESTOJE  │
├─────────────┤
│  REPUTACJA  │
├─────────────┤
│ HARMONOGRAM │
└─────────────┘
```

---

## Podsumowanie zmian

| Plik | Zmiana |
|------|--------|
| `src/pages/frameworks/information-security/Iso27001.tsx` | Zmiana gridu na 4 kolumny, dodanie 4. karty, aktualizacja kluczy tłumaczeń |
| `public/locales/pl/translation.json` | Nowe klucze: penalties, downtime, reputation, zaktualizowany timeline |
| `public/locales/en/translation.json` | Nowe klucze: penalties, downtime, reputation, zaktualizowany timeline |
| `public/locales/cs/translation.json` | Nowe klucze: penalties, downtime, reputation, zaktualizowany timeline |
| `src/i18n/locales/pl.json` | Lustrzana kopia zmian z public/locales/pl |
| `src/i18n/locales/en.json` | Lustrzana kopia zmian z public/locales/en |

