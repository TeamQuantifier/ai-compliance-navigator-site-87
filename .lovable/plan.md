
# Plan: Ulepszenie geo-targetingu SEO + Naprawa Case Study

## Część 1: Naprawa grupowania Case Study (priorytet)

Synchronizacja `group_id` dla 3 par artykułów:

| Case Study | Wersja PL | → Przypisanie do EN group_id |
|------------|-----------|------------------------------|
| OMIDA Group | `240f83b9...` | `386cc542-bf1f-47e4-a9dc-734920a83354` |
| System DOT | `b74d21b8...` | `bbf31e49-3a01-4dcc-9958-0029dc08e087` |
| Raben Group | `59471d65...` | `0b4dd7dc-32ab-4faf-9794-db7387d127b6` |

Plus wyczyszczenie tabeli alternates dla stories i naprawa StoryEditor.tsx (key prop).

---

## Część 2: Ulepszenie hreflang dla geo-targetingu

### Obecny stan (tylko język):
```html
<link rel="alternate" hreflang="en" href="..." />
<link rel="alternate" hreflang="pl" href="..." />
<link rel="alternate" hreflang="cs" href="..." />
```

### Po zmianie (język + region):
```html
<link rel="alternate" hreflang="en" href="..." />
<link rel="alternate" hreflang="pl-PL" href="..." />
<link rel="alternate" hreflang="cs-CZ" href="..." />
<link rel="alternate" hreflang="x-default" href="..." />
```

**Korzyści:**
- EN pozostaje globalny (dla wszystkich anglojęzycznych rynków)
- PL-PL = priorytet w wynikach Google dla użytkowników w Polsce
- CS-CZ = priorytet w wynikach Google dla użytkowników w Czechach

---

## Szczegóły techniczne

### Zmiany w bazie danych:
```sql
-- Synchronizacja group_id dla Case Studies
UPDATE stories SET group_id = '386cc542-bf1f-47e4-a9dc-734920a83354' 
  WHERE id = '240f83b9-e92d-4d77-b2d8-401709553855';
UPDATE stories SET group_id = 'bbf31e49-3a01-4dcc-9958-0029dc08e087' 
  WHERE id = 'b74d21b8-9683-4672-9645-65ee164c3856';
UPDATE stories SET group_id = '0b4dd7dc-32ab-4faf-9794-db7387d127b6' 
  WHERE id = '59471d65-03f7-41b0-8ada-95476dd99afb';

-- Reset alternates dla stories
DELETE FROM alternates WHERE content_type = 'story';
```

### Zmiany w kodzie:

**1. Konfiguracja i18n (`src/i18n/config.ts`):**
```typescript
// Mapowanie język → region dla hreflang
export const LOCALE_HREFLANG_MAP: Record<Locale, string> = {
  en: 'en',        // globalny angielski
  pl: 'pl-PL',     // Polska
  cs: 'cs-CZ',     // Czechy
};
```

**2. SEOHead.tsx (linie 117-120, 211-215):**
```typescript
// Zmiana z:
const ogLocale = lang === 'pl' ? 'pl_PL' : lang === 'cs' ? 'cs_CZ' : 'en_US';

// Użycie LOCALE_HREFLANG_MAP dla hreflang tags:
<link rel="alternate" hrefLang={LOCALE_HREFLANG_MAP[lang]} href={canonicalUrl} />
```

**3. PageTemplate.tsx (linie 104-107):**
```typescript
// Zmiana generowania hreflang z użyciem regionów:
{hreflangUrls.map(({ locale, url }) => (
  <link key={locale} rel="alternate" hrefLang={LOCALE_HREFLANG_MAP[locale]} href={url} />
))}
```

**4. Sitemap Edge Function (`supabase/functions/sitemap/index.ts`):**
```typescript
// Aktualizacja mapowania:
const localeHreflang: Record<string, string> = {
  en: 'en',
  pl: 'pl-PL', 
  cs: 'cs-CZ',
};

// Użycie w generateHreflangLinks
```

**5. StoryEditor.tsx (linia 475):**
```diff
<RichTextEditor
+ key={activeLanguage}
  content={currentVersion.body_rich}
```

---

## Wpływ na SEO

| Element | Przed | Po |
|---------|-------|-----|
| PL w Google.pl | Średni priorytet | Wysoki priorytet |
| CS w Google.cz | Średni priorytet | Wysoki priorytet |
| EN globalnie | Bez zmian | Bez zmian |
| Sitemap | Bez regionów | Z regionami |
| OG locale | Już poprawne | Bez zmian |

---

## Pliki do modyfikacji

1. `src/i18n/config.ts` - dodanie LOCALE_HREFLANG_MAP
2. `src/components/seo/SEOHead.tsx` - użycie mapowania dla hreflang
3. `src/components/PageTemplate.tsx` - użycie mapowania dla hreflang
4. `supabase/functions/sitemap/index.ts` - aktualizacja hreflang w sitemap
5. `src/pages/admin/StoryEditor.tsx` - dodanie key={activeLanguage}

Plus 3 UPDATE + 1 DELETE w bazie danych.
