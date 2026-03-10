

## Dynamiczny llms.txt generowany przez Edge Function

Obecnie `llms.txt` i `llms-full.txt` to statyczne pliki w `public/`. Aby automatycznie uwzględniały nowe artykuły i case study, trzeba je zamienić na **dynamicznie generowane Edge Functions** — analogicznie do tego jak działa już sitemap i RSS feed.

### Architektura

1. **Nowa Edge Function `llms-txt/index.ts`**
   - Przyjmuje query param `?full=true` dla wersji llms-full.txt
   - Pobiera z bazy `posts` (status=published) i `stories` (status=published) — tytuły, slugi, excerpty, języki
   - Generuje sekcje "Blog Articles" i "Success Stories" dynamicznie, grupując po językach (EN, PL, CS)
   - Statyczna treść (Core Capabilities, Key Links, Free Tools, Events, FAQ, Definitions itd.) jest hardcoded w funkcji
   - Zwraca `text/plain` z pełnym Markdown

2. **Routing w `netlify.toml`** (lub `vercel.json`)
   - Redirect `/llms.txt` → Edge Function `llms-txt`
   - Redirect `/llms-full.txt` → Edge Function `llms-txt?full=true`
   - Analogicznie jak działa już `/sitemap.xml`

3. **Usunięcie statycznych plików**
   - `public/llms.txt` i `public/llms-full.txt` zostają usunięte (zastąpione przez dynamiczną funkcję)

### Jak to działa

Przy każdym request na `/llms.txt`:
- Funkcja odpytuje bazę o opublikowane posty i stories
- Generuje aktualną listę artykułów z tytułami, URLami i krótkimi opisami
- Dołącza statyczne sekcje (produkt, frameworki, FAQ)
- Zwraca gotowy Markdown

Dzięki temu **każdy nowy artykuł lub case study pojawia się automatycznie** w pliku llms.txt bez żadnej ręcznej aktualizacji.

### Szczegóły techniczne

- Edge Function będzie keszowana (Cache-Control header) np. na 1 godzinę, żeby nie obciążać bazy przy każdym crawl
- Format wyjściowy identyczny z obecnym — zachowujemy strukturę sekcji
- Wersja `full` zawiera rozszerzone opisy i excerpty artykułów

