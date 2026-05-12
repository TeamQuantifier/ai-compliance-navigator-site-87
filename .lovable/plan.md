# Plan: Audyt i pełna lokalizacja podstrony /partners

## 1. Audyt obecnego stanu (PL)

Strona `src/pages/Partners.tsx` ma poprawną stylistykę, ale **większość treści hero jest zaszyta w kodzie po polsku** (nie używa `t()`). Skutki:
- wersje EN i CS pokazują polski tekst w hero, w panelu „Dlaczego warto", w siatce typów partnerów, w nagłówku „Wybrani partnerzy" oraz w CTA „Porozmawiajmy o partnerstwie",
- sekcja „Wybrani partnerzy" (logo wall) jest renderowana tylko dla `pl` (`currentLocale === 'pl'`) i ma opisy hardcoded po polsku,
- istniejące klucze `partners.network`, `partners.map`, `partners.benefits` w `pl/en` to stare, nieużywane teksty (zostaną pominięte / wyczyszczone w zakresie tej strony — nie usuwam ich, bo mogą być w innych miejscach),
- klucz `seo.partners` istnieje w PL i EN, brakuje go w CS,
- brak JSON-LD `Organization` / `CollectionPage` z listą partnerów.

### Drobne korekty językowe PL (do wprowadzenia w treści hero)
- Ujednolicenie zapisu: **„NIS2"** (bez spacji) zamiast „NIS 2" — zgodnie z core memory projektu.
- „leading-edge rozwiązania AI compliance" → „nowoczesne rozwiązania AI compliance" (usunięcie anglicyzmu — dotyczy nieużywanych kluczy, pominę).
- Ujednolicenie: „śladu węglowego", „łańcucha dostaw (Scope 3)" — OK.
- „RODO" zostaje (PL); w EN → „GDPR"; w CS → „GDPR".
- „sygnaliści" (PL) → „whistleblowing" (EN) → „whistleblowing / oznamovatelé" (CS).
- Drobne: „NGO i uczelnie" — OK; „IT i cybersec" → w EN „IT & cybersec", w CS „IT a kyberbezpečnost".

## 2. Refaktor `Partners.tsx` — pełna lokalizacja

Wszystkie teksty zaszyte w JSX zamieniam na `t('partnersPage.*')` w nowej, czystej przestrzeni kluczy `partnersPage` (żeby nie kolidować ze starym `partners.*`):

```
partnersPage.hero.eyebrow            // „Sieć partnerska Quantifier"
partnersPage.hero.title              // 2-liniowy nagłówek z <br/>
partnersPage.hero.lead               // pierwszy akapit
partnersPage.hero.body               // drugi akapit z <strong>
partnersPage.hero.factsTitle         // „Dlaczego warto być w sieci"
partnersPage.hero.bullets[]          // 4 punkty
partnersPage.hero.stats.partners     // „Partnerów" / „Partners" / „Partnerů"
partnersPage.hero.stats.areas        // „Obszarów" / „Areas" / „Oblastí"
partnersPage.hero.stats.reach        // „Zasięg" / „Reach" / „Dosah"
partnersPage.hero.ctaTalk            // „Porozmawiajmy o partnerstwie"
partnersPage.areas.title             // „Z jakich obszarów są nasi partnerzy"
partnersPage.areas.items[]           // 5 obiektów {name, desc}
partnersPage.selected.title          // „Wybrani partnerzy"
partnersPage.selected.subtitle       // opis pod nagłówkiem
partnersPage.selected.list[]         // 8 obiektów {name, description}
```

Zmiany dodatkowe:
- Sekcja „Wybrani partnerzy" przestaje być warunkowana `currentLocale === 'pl'` — wyświetlamy ją we wszystkich językach z przetłumaczonymi opisami (nazwy własne partnerów zostają w oryginale; opisy lokalizujemy).
- Przycisk CTA hero używa `t('partnersPage.hero.ctaTalk')`.
- Akapit `body` renderuję przez tablicę fragmentów (4 kategorie pogrubione) lub wstawiam JSX z `<Trans i18nKey>` — wybiorę prostszą wersję: trzymam kategorie jako osobne klucze i składam zdanie w komponencie, żeby tłumacze mogli przetłumaczyć każdą kategorię niezależnie.

## 3. Tłumaczenia EN i CS

W `public/locales/{en,cs,pl}/translation.json` dodaję blok `partnersPage` (PL = obecna treść po korektach, EN i CS = wierne tłumaczenia z zachowaniem stylu).

Kluczowe odpowiedniki terminologiczne (zgodnie z memory):
- PL: „NIS2, ISO 27001, SOC 2, ESG, CSRD, DORA, RODO, sygnaliści"
- EN: „NIS2, ISO 27001, SOC 2, ESG, CSRD, DORA, GDPR, whistleblowing"
- CS: „NIS2, ISO 27001, SOC 2, ESG, CSRD, DORA, GDPR, whistleblowing"

Tytuł hero — odpowiedniki:
- EN: „50+ partners helping us roll out compliance and ESG across European companies."
- CS: „50+ partnerů, se kterými zavádíme compliance a ESG v evropských firmách."

## 4. SEO i schema

### Meta (klucze `seo.partners`)
- PL: tytuł `Partnerzy Quantifier.ai | Sieć 50+ partnerów GRC i ESG` (≤60), opis `Sieć 50+ partnerów Quantifier.ai: audytorzy, kancelarie, konsulting, IT/cybersec, NGO i uczelnie. Wspólne wdrożenia NIS2, ISO 27001, ESG, CSRD, DPP.` (≤160).
- EN: `Quantifier.ai Partners | Network of 50+ GRC & ESG Experts` / `Quantifier.ai partner network: auditors, law firms, consultancies, IT & cybersecurity integrators, NGOs and universities. Joint NIS2, ISO 27001, ESG and DPP rollouts.`
- CS: `Partneři Quantifier.ai | Síť 50+ expertů GRC a ESG` / `Partnerská síť Quantifier.ai: auditoři, advokátní kanceláře, konzultanti, IT a kyberbezpečnost, NNO a univerzity. Společné projekty NIS2, ISO 27001, ESG a DPP.`

Brakujący `seo.partners` w `cs/translation.json` zostaje dodany.

### JSON-LD
Dodaję w `Partners.tsx` (przez `<Helmet>`) **dodatkowy** schemat `CollectionPage` z `mainEntity: ItemList` zawierający wybranych partnerów (8 organizacji). Każdy element to `Organization` z polami `name` i ewentualnym `url` (dla tych, które mają oficjalną stronę). To uzupełnia istniejący `BreadcrumbList` z `PageTemplate` — schematy są addytywne, zgodnie z memory.

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "<seo.partners.title>",
  "description": "<seo.partners.description>",
  "url": "https://quantifier.ai/<locale>/partners/",
  "inLanguage": "<pl-PL|en|cs-CZ>",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [ /* 8 × Organization */ ]
  }
}
```

### Hreflang i kanoniczne
`PageTemplate` już generuje:
- `<link rel="canonical">` z trailing slash dla aktualnej wersji,
- `hreflang` dla `en`, `pl-PL`, `cs-CZ` + `x-default`.

Sprawdzam, że ścieżka `/partners/` jest jednakowa we wszystkich locale (jest — używamy tej samej trasy), więc hreflang będzie symetryczny automatycznie. Dodatkowo upewniam się, że trasa `/partners` w `App.tsx` jest zarejestrowana dla wszystkich trzech języków (jest — to wspólna trasa pod prefiksem locale).

W edge function `supabase/functions/sitemap/index.ts` weryfikuję, że `/partners/` jest na liście dla każdego locale (jeśli nie — dodam wpis, żeby URL był indeksowany).

## 5. QA / akceptacja

- Wizualna weryfikacja `/pl/partners`, `/en/partners`, `/cs/partners` w preview (1191 px) — układ identyczny, tylko język się zmienia.
- Sprawdzenie w devtools: `<title>`, `<meta description>`, `<link rel="canonical">`, 4× `hreflang` (pl-PL, en, cs-CZ, x-default), 2× JSON-LD (Breadcrumb + CollectionPage).
- Brak ostrzeżeń w konsoli; brak błędów typu `t(...).map is not a function` (wszystkie tablice z `Array.isArray` guard zgodnie z core memory).

## Sekcja techniczna

**Edytowane pliki**
- `src/pages/Partners.tsx` — refaktor na `t()`, dodanie `<Helmet>` z JSON-LD `CollectionPage`, usunięcie warunku `currentLocale === 'pl'` przy logo wall.
- `public/locales/pl/translation.json` — nowy blok `partnersPage`, korekta tytułu/opisu w `seo.partners`, ujednolicenie „NIS2".
- `public/locales/en/translation.json` — nowy blok `partnersPage`, aktualizacja `seo.partners`.
- `public/locales/cs/translation.json` — nowy blok `partnersPage`, dodanie `seo.partners` (obecnie brak).
- `supabase/functions/sitemap/index.ts` — weryfikacja/uzupełnienie `/partners/` dla wszystkich locale (tylko jeśli brakuje).

**Bez zmian**
- `src/components/PageTemplate.tsx` — hreflang/canonical działają bez zmian.
- Trasy w `App.tsx` — bez zmian.
- Stare klucze `partners.network/map/benefits` — zostawiam (mogą być używane w innych miejscach; sprawdzę przed ewentualnym czyszczeniem).
