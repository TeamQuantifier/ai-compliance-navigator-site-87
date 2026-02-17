
# Naprawa duplikacji hreflang w BlogPost i StoryDetail

## Problem

Strony **BlogPost.tsx** i **StoryDetail.tsx** renderuja jednoczesnie dwa komponenty Helmet:

1. **SEOHead** -- poprawne hreflang z alternates (roznymi slugami per jezyk)
2. **PageTemplate** -- BLEDNE hreflang zakladajace ten sam slug dla kazdego jezyka

Przyklad: czeski post `pro-je-continuous-compliance` generuje w DOM:
- Z SEOHead: `hreflang="en" href=".../en/blog/why-continuous-compliance/"` (poprawne)
- Z PageTemplate: `hreflang="en" href=".../en/blog/pro-je-continuous-compliance/"` (BLEDNE -- ten URL nie istnieje)

Google widzi dwa sprzeczne zestawy hreflang i moze odrzucic oba.

## Co juz dziala poprawnie

- **BlogList.tsx** -- tylko PageTemplate, brak duplikacji. Trailing slash i geo-targeting OK.
- **SuccessStories.tsx** -- tylko PageTemplate, brak duplikacji. OK.
- **Index.tsx** -- poprawne `LOCALE_HREFLANG_MAP`, trailing slash. OK.
- **PageTemplate.tsx** -- `ensureTrailingSlash`, `LOCALE_HREFLANG_MAP`, `x-default`. OK.
- **SEOHead.tsx** -- `alternates[]`, poprawny `x-default` (EN lub fallback). OK.
- **useAlternates hook** -- pobiera wszystkie wersje jezykowe przez `group_id`. OK.
- **Prerender functions** (prerender-post, prerender-story) -- poprawne hreflang z group_id, trailing slash, geo-targeting. OK.
- **Sitemap** -- poprawne hreflang z group_id. OK.
- **Bot-prerender Edge Function** -- poprawne Content-Type, X-Robots-Tag. OK.

## Rozwiazanie

Dodac prop `noSeo` do PageTemplate, ktory wylacza rendering Helmet gdy SEOHead juz go obsluguje.

### Zmiana 1: PageTemplate.tsx

Dodac opcjonalny prop `noSeo?: boolean`. Gdy `noSeo={true}`, komponent pomija caly blok `<Helmet>` i renderuje tylko wrapper `<div>` z children.

### Zmiana 2: BlogPost.tsx

Przekazac `noSeo` do PageTemplate:
```
<PageTemplate title="" description="" noSeo>
```

### Zmiana 3: StoryDetail.tsx

Analogicznie:
```
<PageTemplate title="" description="" noSeo>
```

## Wplyw

- Eliminacja zduplikowanych tagow hreflang, canonical, title i description na stronach postow i stories
- Brak wplywu na pozostale strony (BlogList, SuccessStories, Index, frameworki itp.)
- Brak wplywu na wyglad strony

3 pliki, ~10 linii zmian.

## Sekcja techniczna

```text
PageTemplate.tsx:
  - Dodac do interface: noSeo?: boolean
  - W renderze: if (noSeo) pominac <Helmet>, renderowac tylko <div>{children}</div>

BlogPost.tsx (linia 111):
  - <PageTemplate title="" description="" noSeo>

StoryDetail.tsx (linia 105):
  - <PageTemplate title="" description="" noSeo>
```
