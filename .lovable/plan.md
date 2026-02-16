

# Audyt Schema JSON-LD -- wszystkie strony

## Podsumowanie stanu

Przeanalizowalem schematy JSON-LD na dwoch poziomach: **client-side (SPA)** i **prerender (boty)**. Ponizej pelna mapa problemow.

---

## 1. Niespojnosci miedzy SPA a prerenderem

| Element | Client-side (SPA) | Prerender (boty) | Problem |
|---------|-------------------|-------------------|---------|
| Organization (homepage) | Pelny: adresy, kontakty, foundingDate | Uproszczony: tylko name, url, logo, sameAs | Bot widzi ubozsza wersje |
| Organization.name | "Quantifier.ai" | "Quantifier" | Niespojnosc nazwy marki |
| Organization.logo | `/lovable-uploads/b5ac5352-...png` | `/og-image.png` | Rozne loga |
| WebSite schema (homepage) | Tak (z SearchAction) | Brak | Bot nie dostaje WebSite schema |
| SoftwareApplication | Pelny: featureList, provider, subCategory | Uproszczony: brak featureList, subCategory | Bot widzi ubozsza wersje |
| SoftwareApplication (framework pages) | Brak (tylko na Index + Features) | Tak (soc2, iso27001, gdpr, nis2, grc, features) | SPA nie ma tego schema na framework pages |

## 2. BreadcrumbList -- bledne nazwy

**PageTemplate.tsx** generuje nazwy z URL segmentow przez auto-capitalize:
- `iso-27001` -> "Iso 27001" (powinno: "ISO 27001")
- `nis-ii` -> "Nis Ii" (powinno: "NIS2")
- `soc` -> "Soc" (powinno: "SOC 2")
- `gdpr` -> "Gdpr" (powinno: "GDPR")
- `by-roles` -> "By Roles" (powinno: "By Role")
- `success-stories` -> "Success Stories" (OK)

**Prerender** ma tylko 2-poziomy (Home > Page) -- brak posredniego poziomu (np. Home > Frameworks > ISO 27001).

## 3. Strony bez zadnego dedykowanego schema (poza BreadcrumbList z PageTemplate)

Te strony maja TYLKO automatyczny BreadcrumbList -- zero dodatkowych schematow:

| Strona | Brakujace schematy | Rekomendacja |
|--------|-------------------|--------------|
| **About** | Organization (z pelnym opisem firmy) | Dodac |
| **Contact** | LocalBusiness / ContactPage | Dodac |
| **Plans** | Product (z ofertami/cenami) | Dodac |
| **Partners** | Brak | Niski priorytet |
| **ByRoles, Managers, Contributors, Auditor** | Brak | Niski priorytet |
| **Frameworks** (listing) | Brak | Niski priorytet |
| **Environmental, Esg, Governance, ProductLevel** | Brak FAQ/Definitions | Sredni priorytet |
| **ProductOverview, ComplianceOfficer, TaskDataManagement, DocumentsManagement, ValueChain, RiskAssessment, AnalyticsDashboards, ApiIntegrations** | Brak SoftwareApplication | Sredni -- produkt powinien miec schema |
| **Iso9001** | Brak FAQ | Niski priorytet |

## 4. GrcPlatform -- brak PageTemplate, recznie zarzadzane meta

Strona `/grc-platform` NIE uzywa PageTemplate -- ma wlasny `<Helmet>` z recznymi meta tagami. Problemy:
- Brak trailing slash w canonical (`https://www.quantifier.ai/en/grc-platform` zamiast z `/`)
- Uzywa `www.quantifier.ai` zamiast `quantifier.ai` (niespojnosc z reszta)
- Brak JSON-LD schema w client-side (FAQSection dodaje FAQPage, ale brak BreadcrumbList, SoftwareApplication)
- Brak `og:image`, `og:site_name`

## 5. WebSite schema z fikcyjnym SearchAction

Homepage ma `WebSite` schema z `SearchAction` wskazujacym na `https://quantifier.ai/search?q=...` -- ta strona **nie istnieje**. Google moze to potraktowac jako misleading structured data.

## 6. SoftwareApplication -- AggregateRating

Prerender dodaje `AggregateRating` (4.9/5, 127 reviews) do SoftwareApplication na 7 stronach. Client-side NIE ma tego ratingu nigdzie. Jesli te oceny nie sa poparte prawdziwymi recenzjami, Google moze nalozyc kare za fake reviews.

---

## Planowane zmiany (priorytetyzowane)

### Priorytet WYSOKI

#### 1. Poprawka BreadcrumbList w PageTemplate (slownik nazw)

Plik: `src/components/PageTemplate.tsx`

Dodanie mapowania segmentow URL na poprawne nazwy:
```
'iso-27001' -> 'ISO 27001'
'nis-ii' -> 'NIS2'
'soc' -> 'SOC 2'
'gdpr' -> 'GDPR'
'dora' -> 'DORA'
'hipaa' -> 'HIPAA'
'ccpa' -> 'CCPA'
'iso-9001' -> 'ISO 9001'
'esg' -> 'ESG'
'grc-platform' -> 'GRC Platform'
'by-roles' -> 'By Role'
'ai-compliance-officer' -> 'AI Compliance Officer'
```

#### 2. Poprawka BreadcrumbList w prerenderze (3 poziomy dla podstron)

Plik: `supabase/functions/prerender-marketing/index.ts`

Dodanie posredniego poziomu breadcrumbs dla stron frameworkow:
```
Home > Frameworks > ISO 27001
Home > Product > Features
Home > By Role > Managers
```

#### 3. Naprawienie GrcPlatform -- canonical i domena

Plik: `src/pages/seo-landing/GrcPlatform.tsx`

- Zmiana `www.quantifier.ai` na `quantifier.ai`
- Dodanie trailing slash
- Dodanie brakujacych og:image, og:site_name
- Opcjonalnie: migracja na PageTemplate

#### 4. Usuniecie/poprawka WebSite SearchAction

Plik: `src/pages/Index.tsx`

Usuniecie `potentialAction.SearchAction` z WebSite schema (strona /search nie istnieje) lub zamiana na prawidlowy URL.

### Priorytet SREDNI

#### 5. Ujednolicenie Organization schema miedzy SPA a prerenderem

Plik: `supabase/functions/prerender-marketing/index.ts`

Dodanie do Organization w prerenderze: adresow, contactPoint, foundingDate -- identycznie jak w Index.tsx. Ujednolicenie nazwy na "Quantifier.ai".

#### 6. Dodanie WebSite schema do prerenderingu homepage

Plik: `supabase/functions/prerender-marketing/index.ts`

#### 7. Dodanie SoftwareApplication do framework pages w SPA

Pliki: `Iso27001.tsx`, `Soc.tsx`, `Gdpr.tsx`, `NisII.tsx`, `Dora.tsx`, `Hipaa.tsx`, `Ccpa.tsx`

Dodanie `<Helmet>` z SoftwareApplication JSON-LD (identyczny jak w prerenderze), aby zapewnic spojnosc.

#### 8. Dodanie DefinitionsBlock do stron ktore go nie maja

Pliki: `Iso27001.tsx`, `Soc.tsx`, `Gdpr.tsx`, `Dora.tsx`, `Hipaa.tsx`, `Ccpa.tsx` + odpowiednie pliki tlumaczen

NIS2 juz ma DefinitionsBlock -- pozostale frameworki powinny tez.

### Priorytet NISKI

#### 9. Weryfikacja AggregateRating

Jesli oceny 4.9/127 nie sa oparte na prawdziwych recenzjach (np. G2, Capterra), nalezy je usunac lub podlinkowac zrodlo.

#### 10. Dodanie ContactPage schema do strony Contact

Plik: `src/pages/Contact.tsx`

---

## Podsumowanie plikow do edycji

| Plik | Zmiany |
|------|--------|
| `src/components/PageTemplate.tsx` | Slownik nazw breadcrumb |
| `supabase/functions/prerender-marketing/index.ts` | 3-poziomowe breadcrumbs, Organization, WebSite schema |
| `src/pages/seo-landing/GrcPlatform.tsx` | Canonical, domena, brakujace meta |
| `src/pages/Index.tsx` | Usuniecie SearchAction |
| `src/pages/frameworks/information-security/Iso27001.tsx` | SoftwareApplication + DefinitionsBlock |
| `src/pages/frameworks/cybersecurity/Soc.tsx` | SoftwareApplication + DefinitionsBlock |
| `src/pages/frameworks/data-security/Gdpr.tsx` | SoftwareApplication + DefinitionsBlock |
| `src/pages/frameworks/information-security/Dora.tsx` | SoftwareApplication + DefinitionsBlock |
| `src/pages/frameworks/data-security/Hipaa.tsx` | SoftwareApplication + DefinitionsBlock |
| `src/pages/frameworks/data-security/Ccpa.tsx` | SoftwareApplication + DefinitionsBlock |
| `src/i18n/locales/en.json` | Definicje dla 6 frameworkow |
| `src/i18n/locales/pl.json` | Definicje dla 6 frameworkow |

~14 plikow, wiekszosc to powtarzalne dodanie SoftwareApplication schema i DefinitionsBlock.

