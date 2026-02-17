
# Audyt SEO i plan napraw -- strony /cs/ i /pl/

## Znalezione problemy

### PROBLEM 1: Brak trailing slash w canonical i hreflang (KRYTYCZNY)

Wiele stron ustawia URL-e **bez trailing slash**, co powoduje niezgodnosc z sitemap (ktory ma trailing slash). Google traktuje to jako konflikt i moze odmowic indeksowania.

**Dotkniete pliki:**

| Plik | Problem |
|------|---------|
| `src/pages/blog/BlogList.tsx` (linia 26) | `canonicalUrl` bez trailing slash |
| `src/pages/blog/BlogList.tsx` (linie 50-53) | hreflang bez trailing slash |
| `src/pages/SuccessStories.tsx` (linia 17) | `canonicalUrl` bez trailing slash |
| `src/pages/SuccessStories.tsx` (linie 31-34) | hreflang bez trailing slash |
| `src/pages/Index.tsx` (linia 159) | hreflang uzywa `hrefLang={locale}` zamiast geo-targetingu (`pl-PL`, `cs-CZ`) |

Przyklad bledu w BlogList:
```
// TERAZ (bledne):
<link rel="alternate" hrefLang="en" href="https://quantifier.ai/en/blog" />

// POWINNO BYC:
<link rel="alternate" hrefLang="en" href="https://quantifier.ai/en/blog/" />
```

### PROBLEM 2: Brak geo-targetingu w hreflang (Index.tsx)

Strona glowna (`Index.tsx`, linia 159) uzywa prostych kodow jezykowych (`en`, `pl`, `cs`) zamiast regionowych (`en`, `pl-PL`, `cs-CZ`). To jest niespojne z sitemap i z PageTemplate, ktore uzywaja `LOCALE_HREFLANG_MAP`.

### PROBLEM 3: Podwojne tagi Helmet (BlogList, SuccessStories, BlogPost)

Strony `BlogList.tsx`, `SuccessStories.tsx` i `BlogPost.tsx` uzywaja **jednoczesnie** wlasnego `<Helmet>` ORAZ `<PageTemplate>` (ktory ma swoj wlasny `<Helmet>`). To powoduje **duplikacje tagow meta** -- dwa `<title>`, dwa `<meta description>`, dwa zestawy hreflang. React Helmet laczy je, ale ostatni wygrywa, co moze prowadzic do niespodziewanych wynikow.

Przyklad w BlogList.tsx:
- Linia 41: `<Helmet>` z wlasnym title, description, canonical, hreflang
- Linia 63: `<PageTemplate title={...} description={...}>` -- ktory ROWNIEZ renderuje Helmet z title, canonical, hreflang

### PROBLEM 4: index.html zawiera statyczny title i meta description

Plik `index.html` (linie 18-24) ma hardkodowany `<title>` i `<meta description>` w jezyku angielskim. Dla SPA to jest OK jako fallback, ale moze powodowac konflikty z React Helmet na stronach /pl/ i /cs/, zwlaszcza jesli Helmet nie zdazy zaladowac przed crawlerem.

Ten problem jest juz czesciowo rozwiazany przez prerendering (boty dostaja HTML z Edge Functions), ale warto wiedziec ze istnieje.

### PROBLEM 5: SEOHead -- defaultLangUrl uzywa biezacego slug zamiast angielskiego

W `SEOHead.tsx` (linia 105):
```typescript
const defaultLangUrl = ensureTrailingSlash(`${BASE_URL}/en/${basePath}/${slug}`);
```
Dla czeskiego posta o slug `pro-je-continuous-compliance`, x-default bedzie wskazywac na `/en/blog/pro-je-continuous-compliance/` -- ktory nie istnieje. Powinien wskazywac na angielski slug (z alternatePost) lub nie byc renderowany jesli nie ma angielskiej wersji.

### PROBLEM 6: SEOHead -- hreflang tylko dla 1 alternatywnej wersji

`SEOHead.tsx` renderuje hreflang tylko dla biezacej wersji + 1 alternatywnej (z `alternatePost`). Jesli post istnieje w 3 jezykach (EN, PL, CS), hreflang bedzie niepelny -- np. czeski post zobaczy tylko EN jako alternatywe, ale nie PL. Google wymaga symetrycznych hreflang.

### PROBLEM 7: StoryDetail -- brak alternatePost

W `StoryDetail.tsx` (linia 101): `alternatePost={null}` jest hardkodowane. Stories nigdy nie maja hreflang w kliencie (SPA), wiec dla uzytkownikow bez prerenderingu (np. social media crawlery ktore nie sa na liscie botow) brakuje informacji o wersjach jezykowych.

---

## Plan napraw

### Zmiana 1: BlogList.tsx -- usunac podwojny Helmet, naprawic trailing slash i hreflang

- Usunac wlasny blok `<Helmet>` (linie 40-61)
- Wszystkie meta tagi sa juz obslugiwane przez `<PageTemplate>`
- PageTemplate automatycznie dodaje trailing slash i poprawne hreflang z geo-targetingiem

### Zmiana 2: SuccessStories.tsx -- usunac podwojny Helmet, naprawic trailing slash i hreflang

- Usunac wlasny blok `<Helmet>` (linie 21-42)
- Analogicznie jak BlogList -- PageTemplate obsluzy wszystko

### Zmiana 3: Index.tsx -- naprawic hreflang na geo-targeting

- Linia 159: zamienic `hrefLang={locale}` na `hrefLang={LOCALE_HREFLANG_MAP[locale as Locale]}`
- Importowac `LOCALE_HREFLANG_MAP` i `Locale` (juz importowane -- `SUPPORTED_LOCALES` jest, ale trzeba dodac `LOCALE_HREFLANG_MAP` i `Locale`)

### Zmiana 4: SEOHead.tsx -- naprawic x-default i rozszerzyc hreflang

- Naprawic `defaultLangUrl` (linia 105): jesli istnieje alternatePost w jezyku EN, uzyc jego slug. W przeciwnym razie NIE renderowac x-default (lub uzyc biezacego URL jako x-default)
- Problem z 1 alternatywa vs 3 jezyki: to wymaga zmiany interfejsu -- SEOHead powinien przyjmowac tablice `alternates` zamiast pojedynczego `alternatePost`. Zmiana w BlogPost i StoryDetail tez bedzie potrzebna.

### Zmiana 5: SEOHead.tsx -- przyjmowac tablice alternates zamiast pojedynczego alternatePost

- Zmienic prop `alternatePost` na `alternates?: Array<{ lang: string; slug: string }>` 
- Renderowac hreflang dla kazdej alternatywnej wersji
- x-default wskazuje na wersje EN (jesli istnieje) lub biezacy URL

### Zmiana 6: BlogPost.tsx -- przekazac pelna tablice alternates

- Hook `useAlternatePost` zwraca tylko 1 alternatywe. Trzeba go rozszerzyc lub stworzyc nowy hook `useAlternates` ktory pobiera WSZYSTKIE wersje jezykowe z bazy (przez group_id)
- Przekazac tablice do SEOHead

### Zmiana 7: StoryDetail.tsx -- dodac obsluge alternates

- Analogicznie do BlogPost -- pobrac alternatywne wersje stories i przekazac do SEOHead

---

## Podsumowanie zmian

| Plik | Zmiana | Wplyw |
|------|--------|-------|
| `src/pages/blog/BlogList.tsx` | Usunac duplikat Helmet | Eliminacja podwojnych meta tagow, poprawne trailing slash |
| `src/pages/SuccessStories.tsx` | Usunac duplikat Helmet | j.w. |
| `src/pages/Index.tsx` | Naprawic hreflang geo-targeting | Spojnosc z sitemap (pl-PL, cs-CZ) |
| `src/components/seo/SEOHead.tsx` | Zmienic alternatePost na alternates[], naprawic x-default | Pelne symetryczne hreflang dla 3 jezykow |
| `src/pages/blog/BlogPost.tsx` | Przekazac tablice alternates | Poprawne hreflang dla postow |
| `src/pages/blog/StoryDetail.tsx` | Dodac pobieranie i przekazywanie alternates | Poprawne hreflang dla stories |
| `src/hooks/useBlog.ts` | Dodac hook useAlternates (pobiera wszystkie wersje jezykowe) | Dane dla hreflang |

7 plikow, ~80 linii zmian. Wszystkie zmiany dotycza wylacznie SEO i nie wplywaja na wyglad strony.

### Sekcja techniczna -- hook useAlternates

```typescript
// Nowy hook w useBlog.ts
export const useAlternates = (groupId: string | null | undefined, currentLang: string) => {
  return useQuery({
    queryKey: ['alternates', groupId],
    queryFn: async () => {
      if (!groupId) return [];
      // Probujemy posts, potem stories
      const { data: posts } = await supabase
        .from('posts')
        .select('lang, slug')
        .eq('group_id', groupId)
        .eq('status', 'published')
        .neq('lang', currentLang);
      if (posts && posts.length > 0) return posts;
      
      const { data: stories } = await supabase
        .from('stories')
        .select('lang, slug')
        .eq('group_id', groupId)
        .eq('status', 'published')
        .neq('lang', currentLang);
      return stories || [];
    },
    enabled: !!groupId,
  });
};
```
