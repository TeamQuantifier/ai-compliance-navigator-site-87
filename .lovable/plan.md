

# NIS2 Step by Step Section -- 3 wersje jezykowe

## Zakres

Dodanie sekcji "NIS2 Step by Step with Quantifier" na stronie NIS2, wzorowanej na identycznej sekcji ze strony ISO 27001. Sekcja zawiera 7 krokow w ukladzie timeline (desktop: naprzemiennie lewo/prawo, mobile: jedna kolumna).

## Zmiany w plikach

### 1. `src/pages/frameworks/cybersecurity/NisII.tsx`

Dodanie sekcji step-by-step miedzy sekcja "AI Module" (linia ~349) a sekcja "Results" (linia ~351). Struktura JSX bedzie identyczna jak w ISO 27001 (linie 376-595 w `Iso27001.tsx`):

- Tytul + lead z `t('nisIIPage.stepByStep.title')` i `t('nisIIPage.stepByStep.description')`
- 7 krokow w ukladzie timeline z naprzemiennym pozycjonowaniem (lewo/prawo)
- Kazdy krok: numer, tytul, opis, lista bulletow (4-6 pozycji)
- Kolory: brand-blue (kroki 1-2), brand-purple (kroki 3-4), brand-blue-dark (krok 5), brand-mint (krok 6), gradient (krok 7)
- Klucze translacji: `nisIIPage.stepByStep.steps.{onboarding,gapAnalysis,riskManagement,policies,securityMeasures,incidentReporting,maintenance}`

### 2. `public/locales/en/translation.json`

Dodanie klucza `nisIIPage.stepByStep` z pelna struktura EN:

```json
"stepByStep": {
  "title": "NIS2 Step by Step with Quantifier",
  "description": "Quantifier automates the full path to NIS2 compliance, from onboarding and gap analysis to continuous monitoring and regulatory reporting.",
  "steps": {
    "onboarding": {
      "number": "1",
      "title": "Organization & Scope Onboarding",
      "description": "We configure your NIS2 compliance environment in hours, not weeks. We map your entity type, critical services, systems, roles, and suppliers.",
      "items": [
        "Essential vs important entity classification",
        "Sector and critical service mapping",
        "Roles, responsibilities, and governance setup",
        "Compliance baseline"
      ]
    },
    "gapAnalysis": { ... },
    "riskManagement": { ... },
    "policies": { ... },
    "securityMeasures": { ... },
    "incidentReporting": { ... },
    "maintenance": { ... }
  }
}
```

Pelna tresc EN z promptu uzytkownika.

### 3. `public/locales/pl/translation.json`

Dodanie klucza `nisIIPage.stepByStep` z pelna struktura PL (tresc z promptu).

### 4. `public/locales/cs/translation.json`

Dodanie klucza `nisIIPage.stepByStep` z pelna struktura CS (tresc z promptu).

### 5. `src/i18n/locales/en.json` i `src/i18n/locales/pl.json`

Synchronizacja kluczy `nisIIPage.stepByStep` (dual translation files sync).

## Szczegoly techniczne

- Sekcja uzywa identycznych komponentow jak ISO 27001: `Card`, `CheckCircle`, gradient timeline line
- Klucz `incidentReporting` ma 5 bulletow (zamiast 4), analogicznie do ISO gdzie niektorek kroki maja wiecej pozycji
- Nie uzywamy slow "certification" ani "ISMS" -- cala tresc jest o NIS2 compliance
- `getArrayTranslation()` helper juz istnieje w NisII.tsx (linia 17)

