


## Plan: Dynamiczny llms.txt (zrealizowany)

Pliki `llms.txt` i `llms-full.txt` są teraz generowane dynamicznie przez Edge Function `llms-txt`, analogicznie do sitemap i RSS feed. Nowe artykuły i case study pojawiają się automatycznie.

### Architektura
- Edge Function `supabase/functions/llms-txt/index.ts` pobiera `posts` i `stories` z bazy
- `?full=true` → wersja llms-full.txt z rozszerzonymi opisami
- Statyczne sekcje (produkt, frameworki, FAQ) hardcoded w funkcji
- Cache: 1h client, 24h CDN
- Routing: `/llms.txt` i `/llms-full.txt` → proxy w `netlify.toml`
- Statyczne pliki `public/llms.txt` i `public/llms-full.txt` usunięte
