
# Plan: Aktualizacja SEO meta tagów dla stron blogowych

## Podsumowanie analizy

### Strona z listą blogów (`BlogList.tsx`)
- Obecny stan: używa `t('blog.title')` i `t('blog.subtitle')` - ogólne klucze
- Potrzeba: zaktualizować do nowych kluczy SEO z dedykowanymi tekstami

### Artykuły blogowe (`BlogPost.tsx`)  
- **Już w pełni zaimplementowane!** Komponent `SEOHead` zawiera:
  - Dynamiczny tytuł: `{title} | Quantifier.ai` (linia 101)
  - Dynamiczny opis z excerpt/meta_desc (linia 102)
  - `og:type="article"` (linia 220)
  - `og:image` z featured image (linia 222)
  - Canonical URL (linia 210)
  - Schema.org BlogPosting z author, datePublished, dateModified (linie 126-164)

---

## Zakres zmian

### 1. Aktualizacja `src/pages/blog/BlogList.tsx`

Zmiana linii 41-42 z:
```jsx
<title>{t('blog.title')} | Quantifier.ai</title>
<meta name="description" content={t('blog.subtitle')} />
```

Na:
```jsx
<title>{t('seo.blog.title')} | Quantifier.ai</title>
<meta name="description" content={t('seo.blog.description')} />
```

Analogiczna zmiana dla OG tags (linie 56-57).

### 2. Aktualizacja plików tłumaczeń

#### `public/locales/en/translation.json`
```json
"seo": {
  "blog": {
    "title": "Compliance & Security Blog | ISO 27001, SOC 2, NIS2 Guides",
    "description": "Expert guides on compliance automation. Learn about ISO 27001, SOC 2, NIS2, GDPR and how AI simplifies audit preparation."
  }
}
```

#### `public/locales/pl/translation.json`
```json
"seo": {
  "blog": {
    "title": "Blog o Compliance i Bezpieczeństwie | Przewodniki ISO 27001, SOC 2, NIS2",
    "description": "Eksperckie przewodniki po automatyzacji compliance. Dowiedz się o ISO 27001, SOC 2, NIS2, GDPR i jak AI upraszcza przygotowanie do audytu."
  }
}
```

#### `public/locales/cs/translation.json`
```json
"seo": {
  "blog": {
    "title": "Blog o Compliance a Bezpečnosti | Průvodci ISO 27001, SOC 2, NIS2",
    "description": "Expertní průvodci automatizací compliance. Zjistěte více o ISO 27001, SOC 2, NIS2, GDPR a jak AI zjednodušuje přípravu na audit."
  }
}
```

---

## Szczegóły techniczne

### Dlaczego artykuły blogowe już działają poprawnie?

Komponent `SEOHead` (używany w `BlogPost.tsx`) automatycznie:

1. **Tytuł dynamiczny**: `metaTitle || {title} | Quantifier.ai`
2. **Opis z excerpt**: `metaDesc || excerpt || description` (obcięty do długości ustalonej w CMS)
3. **OG:type**: zawsze `article` dla postów (linia 220)
4. **OG:image**: `ogImageUrl || featuredImageUrl` (linia 222)
5. **Canonical**: `https://quantifier.ai/{lang}/blog/{slug}` (linia 210)
6. **Schema.org BlogPosting**:
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "...",
  "description": "...",
  "image": "...",
  "datePublished": "...",
  "dateModified": "...",
  "author": { "@type": "Organization", "name": "Quantifier.ai" },
  "publisher": { "@type": "Organization", "name": "Quantifier.ai" }
}
```

---

## Pliki do modyfikacji

| Plik | Rodzaj zmiany |
|------|---------------|
| `src/pages/blog/BlogList.tsx` | Zmiana kluczy tłumaczeń na `seo.blog.*` |
| `public/locales/en/translation.json` | Nowe teksty SEO dla bloga |
| `public/locales/pl/translation.json` | Polskie tłumaczenia |
| `public/locales/cs/translation.json` | Czeskie tłumaczenia |

---

## Uwagi

- Artykuły blogowe (`BlogPost.tsx`) **nie wymagają zmian** - `SEOHead` już obsługuje wszystkie wymagane funkcje
- Tylko strona z listą blogów wymaga aktualizacji kluczy
- Schema.org, og:type=article, datePublished/dateModified - wszystko już działa
