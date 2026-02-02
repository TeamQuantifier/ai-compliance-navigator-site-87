
# Plan: Zmiana copy w header na stronie NIS2

## Cel
Zmienić subtitle w sekcji hero na stronie `/frameworks/nis-ii` na nowy tekst dostarczony przez użytkownika.

---

## Lokalizacja zmian

**Klucz tłumaczenia**: `nisIIPage.hero.subtitle`

**Komponent**: `src/pages/frameworks/cybersecurity/NisII.tsx` (linia 43)
```tsx
<p className="text-xl md:text-2xl opacity-90 mb-8 text-white/80">
  {t('nisIIPage.hero.subtitle')}
</p>
```

Komponent nie wymaga zmian — wystarczy zaktualizować pliki tłumaczeń.

---

## Pliki do modyfikacji

### 1. `public/locales/pl/translation.json` (linia 2110)

**Aktualna wartość:**
```json
"subtitle": "Poruszaj się po wymogach cyberbezpieczeństwa UE z pewnością w tygodnie, nie miesiące"
```

**Nowa wartość:**
```json
"subtitle": "Zgodność z NIS2 — szybciej, taniej i bez chaosu."
```

### 2. `public/locales/en/translation.json` (linia 2286)

**Aktualna wartość:**
```json
"subtitle": "Navigate EU cybersecurity requirements with confidence in weeks, not months"
```

**Propozycja tłumaczenia:**
```json
"subtitle": "NIS2 Compliance — faster, cheaper, and without chaos."
```

### 3. `public/locales/cs/translation.json` (linia 2013)

**Aktualna wartość:**
```json
"subtitle": "Zvládněte požadavky EU kybernetické bezpečnosti s jistotou za týdny, ne měsíce"
```

**Propozycja tłumaczenia:**
```json
"subtitle": "NIS2 Compliance — rychleji, levněji a bez chaosu."
```

---

## Podsumowanie zmian

| Plik | Klucz | Nowa wartość |
|------|-------|--------------|
| `public/locales/pl/translation.json` | `nisIIPage.hero.subtitle` | Zgodność z NIS2 — szybciej, taniej i bez chaosu. |
| `public/locales/en/translation.json` | `nisIIPage.hero.subtitle` | NIS2 Compliance — faster, cheaper, and without chaos. |
| `public/locales/cs/translation.json` | `nisIIPage.hero.subtitle` | NIS2 Compliance — rychleji, levněji a bez chaosu. |

---

## Oczekiwany rezultat

Po implementacji sekcja hero na stronie NIS2 będzie wyświetlać nowy subtitle:

**PL:** "Zgodność z NIS2 — szybciej, taniej i bez chaosu."
