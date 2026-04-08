

# Plan: Aktualizacja strony szkoleniowej — nawigacja, eksperci, formularz kontaktowy

## 1. Navbar — zamiana "Plans" na "Szkolenia"

**Navbar.tsx**: Zastąpić element `{ title: t('menu.plans'), href: '/plans' }` nowym elementem:
- PL: "Szkolenia" → `/szkolenia-cyberbezpieczenstwo-dla-firm`
- EN: "Training" → `/cybersecurity-training-for-companies`
- CS: "Školení" → odpowiedni slug

Dodać klucze `menu.training` do plików tłumaczeń (PL, EN, CS).

## 2. Footer — dodać link do Plans

**Footer.tsx**: Dodać link "Plany / Plans / Plány" do sekcji "Company" (lub Solutions), wskazujący na `/{locale}/plans`.

## 3. Eksperci — zaktualizować dane (4 osoby)

**TrainingLanding.tsx**: Zmienić sekcję ekspertów z 3 placeholderów na 4 realne osoby:

1. **Klaudia Sałdan** — Prawniczka | Ekspertka ds. ESG & Compliance
   - Skopiować załączone zdjęcie do `public/images/team/Klaudia.jpg`
2. **Enrika Gawłowska-Nabożny** — Prawniczka, ekspertka ds. sprawozdawczości zrównoważonego rozwoju, Taksonomii UE, gospodarki o obiegu zamkniętym i praw człowieka
   - Avatar z `/images/team/Enrika.jpg` (istniejący, z About)
3. **Weronika Czaplewska** — VP & Co-founder
   - Avatar z `/images/team/Weronika.jpg`
4. **Mateusz Masiak** — CEO & Co-founder
   - Avatar z `/images/team/Mateusz.jpg`

Zmienić grid na `md:grid-cols-2 lg:grid-cols-4`, zastąpić inicjały avatarami (tag `<img>`), zaktualizować klucze i18n `training.experts.people.*` dla PL, EN, CS.

## 4. Formularz kontaktowy — integracja z Edge Function `contact-form`

**TrainingLanding.tsx**: Zastąpić obecny dummy formularz prawdziwą integracją z `supabase.functions.invoke('contact-form')` — ten sam endpoint co `/Contact`. Pola: imię, email, firma, wiadomość. Dodać walidację, loading state i toast notifications.

Przyciski "Umów rozmowę" w hero i sticky bar prowadzą do `#contact` (anchor scroll) — to działa poprawnie, bo formularz jest na dole strony.

## 5. Tłumaczenia — aktualizacja EN i CS

Zaktualizować pliki:
- `public/locales/en/translation.json` — klucze `training.experts.people.*` z EN bios
- `public/locales/cs/translation.json` — klucze `training.*` z czeskimi tłumaczeniami
- `src/i18n/locales/pl.json` i `en.json` — klucze `menu.training`
- Dodać route CS w `App.tsx` jeśli brakuje

## 6. Trasa czeska

Dodać w `App.tsx` route: `/cs/skoleni-kyberneticka-bezpecnost-pro-firmy` → `TrainingLanding`.

## Pliki do zmiany

| Plik | Zmiana |
|------|--------|
| `src/components/Navbar.tsx` | Plans → Training |
| `src/components/Footer.tsx` | Dodać link Plans |
| `src/pages/services/TrainingLanding.tsx` | Eksperci (4 osoby, zdjęcia), formularz z API |
| `public/locales/pl/translation.json` | Nowe klucze ekspertów, menu.training |
| `public/locales/en/translation.json` | j.w. w EN |
| `public/locales/cs/translation.json` | j.w. w CS |
| `src/i18n/locales/pl.json` | menu.training |
| `src/i18n/locales/en.json` | menu.training |
| `src/App.tsx` | Route CS |
| `public/images/team/Klaudia.jpg` | Nowe zdjęcie (copy z upload) |

