
# Audyt SEO strony Quantifier.ai

## Podsumowanie

Strona ma solidne fundamenty SEO (hreflang, canonical, JSON-LD, prerendering dla botow, dynamiczny sitemap, llms.txt). Ponizej lista znalezionych problemow i rekomendacji, podzielona na kategorie wedlug priorytetu.

---

## KRYTYCZNE (wplyw na indeksowanie i pozycjonowanie)

### 1. Brak pliku `/og-image.png`

Plik `/og-image.png` jest referencjonowany w **5 plikach** (Index.tsx, PageTemplate.tsx, GrcPlatform.tsx, SEOHead.tsx, useSeoSettings.ts), ale **nie istnieje** w katalogu `public/`. Powoduje to blad 404 przy udostepnianiu linkow na social media i blad w walidatorach OG (Facebook, LinkedIn, Twitter).

**Naprawa**: Stworzyc obraz OG 1200x630px i umiescic go w `public/og-image.png`, lub zmienic referencje na istniejacy obraz (np. jeden z `lovable-uploads/`).

### 2. Obrazy w artykuach bloga bez `loading="lazy"`, `width` i `height`

Dotyczy:
- **BlogPost.tsx** (linia 123) -- obraz wyrozniajacy artykulu
- **BlogList.tsx** (linia 120) -- miniatury na liscie
- **StoryDetail.tsx** (linia 158) -- obraz wyrozniajacy case study
- **SuccessStories.tsx** (linia 69) -- miniatury na liscie
- **RichTextRenderer.tsx** (linia 70) -- wszystkie obrazy w tresci artykulu
- **EbookDownloadSection.tsx** (linia 118) -- obraz e-booka
- **BookPromoPopup.tsx** (linia 39), **BookPromoSection.tsx** (linia 58)
- **Contact.tsx** (linia 143) -- grafika z logotypami

Brak `width`/`height` powoduje CLS (Cumulative Layout Shift), co obniza Core Web Vitals. Brak `loading="lazy"` obniza wydajnosc ladowania.

**Naprawa**: Dodac atrybuty `loading="lazy"`, `width` i `height` do wszystkich `<img>` poza hero (above-the-fold).

### 3. Obrazy w `RichTextRenderer` bez `loading="lazy"` i wymiarow

Kazdy obraz wstawiony do artykulu przez CMS (tiptap) renderuje sie bez `loading="lazy"`. Przy dlugich artykulach z wieloma obrazami to znaczaco wplywa na czas ladowania.

**Naprawa**: Dodac `loading="lazy"` do renderera obrazow w `RichTextRenderer.tsx`.

---

## WAZNE (SEO on-page dla bloga)

### 4. Brak `<time>` z atrybutem `datetime` w BlogPost.tsx

W `StoryDetail.tsx` data jest poprawnie owineta w `<time dateTime="...">`, ale w `BlogPost.tsx` (linia 140-151) data jest wyswietlana jako zwykly `<span>`. Bots preferuja semantyczny element `<time>`.

**Naprawa**: Zamienic `<span>` na `<time dateTime={...}>` w BlogPost.tsx.

### 5. Linki wewnetrzne w artykulach ustawione na `target="_blank"`

W `RichTextRenderer.tsx` (linia 117-119) **wszystkie** linki renderuja sie z `target="_blank" rel="noopener noreferrer"`. Oznacza to, ze nawet linki wewnetrzne (np. do `/en/frameworks/nis-ii/`) otwieraja sie w nowej karcie, co:
- Przerywa nawigacje SPA
- Moze byc gorzej oceniane przez Google (user experience)

**Naprawa**: Sprawdzac `href` -- jesli zaczyna sie od `/` lub zawiera `quantifier.ai`, renderowac jako `<Link>` z react-router bez `target="_blank"`.

### 6. Blog: miniatury uzywaja `alt={post.title}` zamiast `featured_image_alt`

W `BlogList.tsx` (linia 122) i `SuccessStories.tsx` (linia 71) atrybut `alt` uzywa tytulu artykulu zamiast dedykowanego pola `featured_image_alt` z CMS. Wlasciwe ALT teksty sa wazne dla image search.

**Naprawa**: Uzyc `post.featured_image_alt || post.title` jako fallback.

---

## UMIARKOWANE (ulepszenia techniczne)

### 7. `index.html` zawiera statyczne OG i Twitter tagi

Mimo ze pamiec projektu stwierdza, ze `index.html` powinien byc minimalnym shellem, plik nadal zawiera hardcoded `og:title`, `og:description`, `twitter:title`, `twitter:description` (linie 29-49). To moze powodowac konflikty z dynamicznymi tagami z React Helmet na niektorych crawlerach.

**Naprawa**: Usunac statyczne tagi OG/Twitter z `index.html`, zostawiajac tylko `<title>`, `<meta name="description">`, `charset` i `viewport`.

### 8. Brak semantic `<main>` w strukturze strony

W `App.tsx` (linia 92) uzyto `<main>` dla opakowywania tras -- to dobrze. Ale `PageTemplate.tsx` uzywa zwyklego `<div className="min-h-screen">` bez semantycznych tagow. Warto dodac `<article>` lub `<section>` w odpowiednich kontekstach.

### 9. Navbar logo bez `width`/`height`

Logo w `Navbar.tsx` (linie 185-193) nie ma atrybutow `width` i `height`, co moze powodowac drobny CLS.

**Naprawa**: Dodac `width` i `height` do obu wariantow logo.

### 10. Footer logo bez `width`/`height` i `loading="lazy"`

Logo w `Footer.tsx` (linia 60) nie ma wymiarow ani lazy loading.

---

## CO JUZ DZIALA DOBRZE

- Canonical URLs z trailing slash -- poprawnie
- Hreflang z geo-targetingiem (en, pl-PL, cs-CZ) -- poprawnie
- JSON-LD schematy (Organization, WebSite, SoftwareApplication, BreadcrumbList, BlogPosting, DefinedTermSet) -- rozbudowane i poprawne
- Dynamiczny sitemap z hreflang per group_id -- poprawnie
- Bot prerendering przez Netlify Edge + Supabase -- dziala
- robots.txt z AI crawlerami -- poprawnie
- llms.txt i llms-full.txt -- obecne
- SEO Audit panel w CMS -- dziala
- Explicit meta robots (index, follow) -- poprawnie
- Automatyczne 301 redirecty przy zmianie slug -- dziala
- Breadcrumbs z prawidlowa hierarchia i mappingiem -- poprawnie

---

## Plan implementacji (kolejnosc priorytetow)

### Krok 1 -- Obraz OG (krytyczny)
Zmienic referencje `/og-image.png` na istniejacy obraz z `lovable-uploads/` (np. `154104eb-8338-4e4f-884c-2343169fc09b.png` ktory juz jest uzywany jako domyslny w SEOHead) lub utworzyc dedykowany plik.

### Krok 2 -- Lazy loading i wymiary obrazow
Dodac `loading="lazy"`, `width`, `height` do:
- `BlogPost.tsx` -- featured image
- `BlogList.tsx` -- miniatury
- `StoryDetail.tsx` -- featured image
- `SuccessStories.tsx` -- miniatury
- `RichTextRenderer.tsx` -- obrazy w tresci
- `EbookDownloadSection.tsx`
- `BookPromoPopup.tsx`, `BookPromoSection.tsx`
- `Contact.tsx` -- logos grid
- `Navbar.tsx` -- logo
- `Footer.tsx` -- logo

### Krok 3 -- Semantyka dat w BlogPost
Zamienic `<span>` na `<time dateTime="...">`.

### Krok 4 -- Inteligentne linki w RichTextRenderer
Rozpoznawac linki wewnetrzne i renderowac je jako `<Link>` bez `target="_blank"`.

### Krok 5 -- ALT texty z CMS
Uzyc `featured_image_alt` z bazy danych jako pierwszego wyboru w BlogList i SuccessStories.

### Krok 6 -- Oczyszczenie index.html
Usunac duplikowane OG/Twitter tagi z `index.html`.

---

## Wplyw na pozycjonowanie bloga

Blog i artykuly **sa juz poprawnie indeksowane** (prerendering, sitemap, hreflang, JSON-LD BlogPosting). Glowne ulepszenia to:
1. **Core Web Vitals** -- lazy loading i wymiary obrazow wplyna na LCP i CLS
2. **Image Search** -- lepsze ALT teksty i featured_image_alt
3. **Linki wewnetrzne** -- naprawienie target="_blank" poprawi crawlowalnosc i UX
4. **Social sharing** -- naprawienie brakujacego og-image.png poprawi wyglad linkow na social media
