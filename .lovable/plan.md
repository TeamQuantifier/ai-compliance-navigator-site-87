

## Plan: Dynamiczny llms.txt (zrealizowany)

Pliki `llms.txt` i `llms-full.txt` są teraz generowane dynamicznie przez Edge Function `llms-txt`, analogicznie do sitemap i RSS feed. Nowe artykuły i case study pojawiają się automatycznie.

### Architektura
- Edge Function `supabase/functions/llms-txt/index.ts` pobiera `posts` i `stories` z bazy
- `?full=true` → wersja llms-full.txt z rozszerzonymi opisami
- Statyczne sekcje (produkt, frameworki, FAQ) hardcoded w funkcji
- Cache: 1h client, 24h CDN
- Routing: `/llms.txt` i `/llms-full.txt` → proxy w `netlify.toml`
- Statyczne pliki `public/llms.txt` i `public/llms-full.txt` usunięte

## Plan: Quick Wins SEO + Dodatkowe SEO techniczne (zrealizowany)

- Dodano `twitter:site`, `og:url`, `llms.txt` alternate link do `index.html`
- Rozszerzono `<noscript>` o linki do kluczowych stron
- Dodano Review JSON-LD schema na homepage
- Rozbudowano llms-txt o sekcje Competitors, Team, Awards

## Plan: Nawigacja + About Us + Success Stories cleanup (zrealizowany)

### Nawigacja
- Blog, Success Stories, Events zgrupowane w mega menu "Wiedza" (EN: Resources, CS: Znalosti)
- Link "O nas" przywrócony do nawigacji głównej
- Footer podzielony na "Firma" (O nas, Partnerzy, Kontakt) i "Zasoby" (Blog, Success Stories, Events)

### About Us — hub E-E-A-T
- Kompletna przebudowa z sekcjami: Hero, Historia (timeline), Zespół (placeholdery), Liczby, Nagrody, Publikacje (BookPromo), Edukacja (PostgraduatePromo), Lokalizacje, CTA
- Schema JSON-LD: Organization z Person entities + BreadcrumbList
- Dane zespołu w tablicy w kodzie — łatwe do uzupełnienia po dostarczeniu materiałów

### Success Stories
- Usunięto BookPromoSection i PostgraduatePromoSection (przeniesione do About)
- Strona czysta: hero + grid case studies + empty state

### Pliki zmienione
- `src/components/Navbar.tsx` — nowa struktura menu
- `src/components/Footer.tsx` — reorganizacja sekcji
- `src/pages/About.tsx` — kompletna przebudowa
- `src/pages/SuccessStories.tsx` — cleanup
- `public/locales/{pl,en,cs}/translation.json` — nowe klucze
- `src/i18n/locales/{pl,en}.json` — synchronizacja kluczy
