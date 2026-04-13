

## Plan: Formularz RODO + Sekcja GS1 na stronie /partners

### 1. Checkbox RODO + link do polityki prywatności pod formularzem (GS1 Polska)

**Plik:** `src/pages/partners/Gs1Polska.tsx`

- Dodać wymagany checkbox RODO przed przyciskiem „Wyślij" w formularzu kontaktowym
- Treść checkboxa: zlokalizowany tekst typu *"Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z [Polityką Prywatności]"* z linkiem do `/{locale}/legal/privacy`
- Checkbox musi być `required` — formularz nie wyśle się bez zaznaczenia
- Dodać state `consent` (boolean) i walidację w `handleSubmit`
- Dodać klucze tłumaczeń `gs1.form.consent` i `gs1.form.consentLink` do plików PL, EN, CS

**Pliki tłumaczeń:** `public/locales/pl/translation.json`, `en/translation.json`, `cs/translation.json`

### 2. Rozbudowana sekcja GS1 Polska na stronie /partners

**Plik:** `src/pages/Partners.tsx`

Obecna sekcja (linie 79-97) to minimalna karta z jedną linijką tekstu. Rozbudować do pełnego „thumbnail" z:

- Logo GS1 Polska (import `gs1Logo` z `@/assets/gs1-logo.png` — już istnieje w projekcie)
- Krótki opis partnerstwa (2-3 zdania): integracja GTIN/GPC, Paszport Produktowy, zgodność z ESPR
- Brązowa kolorystyka spójna z landing page GS1 (amber/stone tones)
- Ikonki kluczowych elementów (LCA, GHG, 47000+ członków)
- Wyraźny CTA „Dowiedz się więcej →"
- Dodać klucze tłumaczeń `partners.gs1.headline`, `partners.gs1.description`, `partners.gs1.cta`

### Szczegóły techniczne

- Checkbox korzysta z istniejącego komponentu `@/components/ui/checkbox`
- Link do polityki prywatności: `/${currentLocale}/legal/privacy` (ścieżka już istnieje w routerze)
- Formularz: walidacja `consent === true` przed wywołaniem `supabase.functions.invoke('contact-form', ...)`
- Łącznie zmiany w 5 plikach: 1 komponent formularza, 1 strona partnerów, 3 pliki tłumaczeń

