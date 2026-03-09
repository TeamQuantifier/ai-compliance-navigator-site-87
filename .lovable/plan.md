

## Plan: Aktualizacja meta tagów SEO na 7 stronach

### Analiza wpływu na SEO

Proponowane zmiany poprawią SEO w kilku wymiarach:
- **Title tagi** stają się bardziej keyword-rich i lepiej dopasowane do search intent (np. "AI Compliance Platform" zamiast generycznego "Compliance Automation Platform")
- **Descriptions** zawierają social proof ("250+ companies", "BNP Paribas") co zwiększa CTR w SERP
- **Osobne OG title/description** na homepage — OG jest bardziej brandowy, a title bardziej keyword-focused. To standard best practice.
- **Długości** mieszczą się w limitach (title <60 znaków, description <155 znaków)

### Architektura zmian

Strony framework (ISO, SOC, NIS2, GDPR, ESG) używają `PageTemplate`, który automatycznie dodaje `| Quantifier.ai` do title. Więc w translacjach title NIE powinien zawierać brandu.

Homepage (`Index.tsx`) samodzielnie buduje `fullTitle = title + " | Quantifier.ai"`. Trzeba dodać osobne klucze OG i zmienić kod aby je obsłużył.

GDPR używa innego klucza (`gdprPage.seo.*`) niż reszta framework pages (`seo.frameworks.*`).

### Zmiany w plikach

**1. `src/pages/Index.tsx`** — dodać osobne OG title/description z translacji:
- Zmienić `<meta property="og:title">` z `fullTitle` na `t('seo.index.ogTitle')` z fallbackiem
- Zmienić `<meta property="og:description">` z `description` na `t('seo.index.ogDescription')` z fallbackiem

**2. `public/locales/en/translation.json`** — zaktualizować klucze EN:
- `seo.index.title` → "AI Compliance Platform | ISO 27001, SOC 2, NIS2 | Quantifier" (pełny, bo Index.tsx append pattern trzeba zmienić)
- `seo.index.description` → nowy tekst z social proof
- Dodać `seo.index.ogTitle` i `seo.index.ogDescription`
- `seo.frameworks.informationSecurity.iso27001.title` → "ISO 27001 Compliance Automation"
- `seo.frameworks.informationSecurity.iso27001.description` → nowy tekst
- `seo.frameworks.cybersecurity.soc.title` → "SOC 2 Automation Platform | Type I & II"
- `seo.frameworks.cybersecurity.soc.description` → nowy tekst
- `seo.frameworks.cybersecurity.nisII.title` → "NIS2 Compliance Software | Directive Implementation"
- `seo.frameworks.cybersecurity.nisII.description` → nowy tekst
- `gdprPage.seo.title` → "GDPR Compliance Automation | Data Privacy | Quantifier" (uwaga: ten klucz zawiera brand bo Gdpr.tsx go wstawia do PageTemplate)
- `gdprPage.seo.description` → nowy tekst
- `seo.frameworks.esg.title` → "ESG Reporting & Compliance Platform | CSRD Ready"
- `seo.frameworks.esg.description` → nowy tekst

**3. `public/locales/pl/translation.json`** — odpowiedniki PL:
- `seo.index.title` → "Platforma Compliance AI | ISO 27001, SOC 2, NIS2 | Quantifier"
- `seo.index.description` → "Automatyzacja compliance dla ISO 27001, SOC 2, NIS2, RODO i ESG. Platforma AI-native zaufana przez 250+ firm. Umów demo."
- Dodać `seo.index.ogTitle` → "Quantifier.ai — Platforma AI do automatyzacji compliance"
- Dodać `seo.index.ogDescription` → "Zarządzaj zgodnością z wieloma standardami z jednej platformy. AI-powered tworzenie polityk, automatyzacja zadań, gotowość na audyt."
- `seo.frameworks.informationSecurity.iso27001.title/description` → polskie odpowiedniki
- `seo.frameworks.cybersecurity.soc.title/description` → polskie odpowiedniki
- `seo.frameworks.cybersecurity.nisII.title/description` → polskie odpowiedniki
- `gdprPage.seo.title/description` → polskie odpowiedniki (RODO)
- `seo.frameworks.esg.title/description` → polskie odpowiedniki

**4. Modyfikacja `Index.tsx`** — homepage title nie powinien mieć `| Quantifier.ai` append (bo nowy title już zawiera `| Quantifier`). Zmiana: użyć `title` bezpośrednio jako `<title>` bez appendu, i dodać osobne OG fields.

### Uwaga: PageTemplate i GDPR
PageTemplate dodaje `| Quantifier.ai` do wszystkich tytułów. GDPR page (`Gdpr.tsx`) przekazuje `gdprPage.seo.title` do PageTemplate, więc końcowy title to `gdprPage.seo.title + " | Quantifier.ai"`. Obecna wartość to `"GDPR Compliance Software | Automated Data Protection | Quantifier"` → z appendem daje `"... | Quantifier | Quantifier.ai"`. Trzeba usunąć `| Quantifier` z translacji żeby nie było duplikacji brandu.

Docelowo: `gdprPage.seo.title` = `"GDPR Compliance Automation | Data Privacy"` → PageTemplate doda `| Quantifier.ai` → wynik: `"GDPR Compliance Automation | Data Privacy | Quantifier.ai"`.

