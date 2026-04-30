## Cel
Naprawić linkowanie i SEO klastra NIS2 (PL/EN/CS) zgodnie z kryteriami akceptacji. Wszystkie zmiany dotyczą tylko obszaru NIS2 + globalna naprawa fallbacku CS i logiki canonical/hreflang.

---

## 1. Naprawa linków na `/pl/frameworks/nis-2`

Sekcja „Materiały o zgodności z NIS2" (komponent `Nis2Ksc.tsx`, linie ~761–777) renderuje 3 karty z tłumaczeń `nis2Ksc.relatedContent.articles[]`.

Stan obecny w `public/locales/pl/translation.json`:
- `lista-kontrolna-nis2-2026` → istnieje jako **draft** (404 dla anonima)
- `wdrozenie-nis2-ksc-przewodnik` → **nie istnieje w bazie**
- `dyrektywa-nis2` → opublikowany, ale stary (do degradacji, p. sekcja 2)

**Akcja — edycja `public/locales/pl/translation.json`:**

```
articles[0].slug = "dyrektywa-nis2-wymagania-zgodnosci-przewodnik-wdrozenia"
articles[0].title = "Lista kontrolna NIS2 — Artykuł 21"
articles[0].desc = "Wymagania Artykułu 21 zmapowane na działania i dowody"

articles[1].slug = "dyrektywa-nis2-wymagania-zgodnosci-przewodnik-wdrozenia"
articles[1].title = "Wdrożenie NIS2/KSC w Polsce"
articles[1].desc = "Przewodnik po nowelizacji UKSC z terminami i krokami"

articles[2].slug = "dyrektywa-nis2-wymagania-zgodnosci-przewodnik-wdrozenia"
articles[2].title = "Dyrektywa NIS2 — Pełny przewodnik"
articles[2].desc = "Kompletne omówienie dyrektywy i obowiązków podmiotów"
```

Wszystkie trzy karty tymczasowo prowadzą do opublikowanego pillara, co spełnia wymóg „brak linków do 404/draftów". Gdy artykuły 1 i 2 zostaną opublikowane (z docelowymi slugami `lista-kontrolna-nis2` i `nis2-a-ksc-zmiany-prawo-cyberbezpieczenstwo`), wystarczy zaktualizować slugi w JSON (utworzymy też migracje slugów w bazie).

**To samo dla CS i EN** (te same tłumaczenia obecnie też wskazują na drafty/archiwa: `nis2-compliance-checklist-2026` = draft, `nis2-directive` = archived):
- EN karty 0 i 1 → `nis2-directive-compliance-requirements-implementation-guide`
- CS karty 0 i 1 → `smernice-nis2-pozadavky-na-soulad-pruvodce-implementaci`
- karta 2 EN/CS → już wskazuje na poprawny pillar

---

## 2. Degradacja starego artykułu PL `dyrektywa-nis2`

Post `id=88188e1d…`, status `published`, zawiera w `excerpt` i `meta_desc` zdezaktualizowaną informację „ustawa czeka na podpis Prezydenta".

**Akcja — migracja UPDATE na `posts`:**

1. Zaktualizować `meta_desc` (≤155 zn.):
   > „Dyrektywa NIS2 (UE 2022/2555) – kompletny przewodnik 2026. 18 sektorów, terminy 24h/72h/1 mies., obowiązki zarządu. Nowelizacja UKSC obowiązuje od 3 kwietnia 2026 r."

2. Zaktualizować `excerpt` analogicznie (usunąć „czeka na podpis Prezydenta", zastąpić: „Nowelizacja ustawy o KSC weszła w życie 3 kwietnia 2026 r., obejmuje ok. 42 000 podmiotów, 12-miesięczny termin wdrożenia, 2-letnie odroczenie kar.").

3. Ustawić `canonical_url = https://quantifier.ai/pl/blog/dyrektywa-nis2-wymagania-zgodnosci-przewodnik-wdrozenia/` oraz `robots_index = false` (consolidacja na nowy pillar — chroni przed kanibalizacją bez ryzyka utraty linków przychodzących).

4. Wstawić wpis do tabeli `redirects`:
   - `from_path = /pl/blog/dyrektywa-nis2`
   - `to_path = /pl/blog/dyrektywa-nis2-wymagania-zgodnosci-przewodnik-wdrozenia`
   - `http_code = 301`, `is_active = true`
   (Zostawiamy też canonical+noindex jako zabezpieczenie SEO; redirect 301 obsługiwany jest przez istniejący system `redirects`.)

---

## 3. Naprawa CS fallbacku `/cs/blog/nis2-directive`

Źródło problemu jest **globalne**: `src/hooks/useBlog.ts` (linie 77–99) — funkcja `usePost` przy braku posta CS automatycznie zwraca EN post pod tym samym slugiem. To powoduje że KAŻDY angielski slug otwarty pod `/cs/blog/...` renderuje EN treść z duplicate-content i błędnymi hreflangami.

**Akcja — `src/hooks/useBlog.ts`:**

Usunąć fallback CS→EN w `usePost` (linie 77–99). Gdy posta CS brak — zwracać `null` → `BlogPost.tsx` wyrenderuje stronę „nie znaleziono" / 404.

Dodatkowo w `BlogPost.tsx` po `error || !post` wyrenderować `<meta name="robots" content="noindex">` (już jest komponent „not found" — należy upewnić się że ma noindex).

**To rozwiązuje sprawę `/cs/blog/nis2-directive`** bez potrzeby ręcznych redirectów — strona zwróci 404 z noindex zamiast EN treści.

Opcjonalnie: dodać redirect w bazie z `/cs/blog/nis2-directive` → `/en/blog/nis2-directive-compliance-requirements-implementation-guide` (302) dla lepszego UX. **Pominąć fallback `usePosts` (listing) — listing CS świadomie pokazuje EN treści jako zaślepkę, to inny case.** Można rozważyć w osobnym ticketcie.

---

## 4. Logika hreflang i canonical dla bloga

Audyt `src/components/seo/SEOHead.tsx`:
- ✅ Self-canonical: linia 101 — generuje canonical na własny URL artykułu (chyba że `canonical_url` z DB nadpisze — co właśnie wykorzystamy w sekcji 2).
- ✅ Hreflang dodawany tylko z `alternates` (przekazywanych z `useAlternates`, który filtruje po `status='published'`).
- ✅ x-default = EN alternate jeśli istnieje, inaczej self.
- ✅ Self-hreflang dodawany (linia 224).

**Wymagane korekty:**

a) `useAlternates` (`src/hooks/useBlog.ts`, linia 264) filtruje przez `status='published'` — OK. Ale dodatkowo trzeba filtrować po `robots_index = true`, żeby canonicalized stary `dyrektywa-nis2` (po sekcji 2 będzie miał noindex) nie pojawiał się w hreflangach nowego pillara. Dodać `.eq('robots_index', true)`.

b) `BlogPost.tsx` — przy renderowaniu `<SEOHead>` przekazywać `canonical_url` z DB (już to robi przez prop `customCanonicalUrl`?). Zweryfikować i upewnić się, że jeżeli post ma niestandardowy `canonical_url`, to NIE są wstrzykiwane hreflangi (bo strona już deklaruje konsolidację gdzie indziej). Jeśli `canonical_url` jest ustawione i wskazuje na inny URL — pominąć blok hreflangów w `SEOHead`.

c) Czyszczenie tabeli `alternates`: usunąć rekordy łączące stary `dyrektywa-nis2` (`88188e1d…`) z EN `nis2-directive` (`2e298e95…`). Stary EN jest archived, stary PL idzie do noindex — nie powinny mieć alternates.

```sql
DELETE FROM alternates 
WHERE primary_id IN ('88188e1d-...','2e298e95-...') 
   OR alternate_id IN ('88188e1d-...','2e298e95-...');
```

---

## 5. Sitemap i linkowanie wewnętrzne

`supabase/functions/sitemap/index.ts` (linia 188) już filtruje `.eq('status', 'published')`. Trzeba dodać:

a) `.eq('robots_index', true)` — żeby stary `dyrektywa-nis2` (po sekcji 2 noindex) zniknął z sitemapy.

b) Sitemap dla postów (linia 261, `generateDynamicHreflangLinks`) — funkcja dodaje x-default na bazie EN slugu z `allVersions.find(v => v.lang === 'en')`. Jeżeli EN nie istnieje — robi fallback na current. To jest OK. Ale jeśli post ma ustawiony `canonical_url` na inny URL, sitemap powinien pominąć cały wpis. Dodać filtr `.is('canonical_url', null)` w pobieraniu postów do sitemapy (lub: zwracać tylko self-canonical).

c) Po deployu edge function — wymusić regenerację (trigger już istnieje, ale można od ręki uderzyć w endpoint).

**Linkowanie wewnętrzne:** sekcje „Related Articles" w innych artykułach klastra NIS2 nie są w zakresie tego ticketu (są generowane z body_rich) — warto zaadresować w osobnym przeglądzie po opublikowaniu draftów.

---

## Pliki do zmiany

```text
public/locales/pl/translation.json     - linki w nis2Ksc.relatedContent
public/locales/en/translation.json     - linki w nis2Ksc.relatedContent
public/locales/cs/translation.json     - linki w nis2Ksc.relatedContent
src/hooks/useBlog.ts                   - usunąć fallback CS→EN w usePost,
                                         dodać robots_index filter w useAlternates
src/components/seo/SEOHead.tsx         - pominąć hreflangi gdy custom canonical
src/pages/blog/BlogPost.tsx            - noindex na 404
supabase/functions/sitemap/index.ts    - filtr robots_index + canonical_url IS NULL
```

## Migracje DB (insert tool)

```text
1. UPDATE posts SET meta_desc=…, excerpt=…, canonical_url=…, robots_index=false 
   WHERE id='88188e1d-cf79-44c7-a795-608093f4da86';

2. INSERT INTO redirects (from_path, to_path, http_code, is_active) VALUES (…);

3. DELETE FROM alternates WHERE primary_id IN (…) OR alternate_id IN (…);
```

## Acceptance check

- `/pl/frameworks/nis-2` „Materiały" → 3 linki, wszystkie do opublikowanego pillara.
- `/pl/blog/dyrektywa-nis2` → 301 → nowy pillar; treść zawiera datę 3 kwietnia 2026 r.
- `/cs/blog/nis2-directive` → 404 (lub redirect do EN), noindex, brak EN treści pod CS URL.
- Hreflang generowany tylko dla published + indeksowalnych wersji; każda strona ma self-canonical (chyba że celowo skonsolidowana).
- Sitemap nie zawiera `dyrektywa-nis2` (noindex) ani draftów.

## Pytanie do decyzji

W kroku 1 chcesz, żeby karty 1 i 2 (Lista kontrolna, NIS2/KSC) **tymczasowo wskazywały na pillar** (sugerowane), czy **całkowicie zniknęły** z UI do czasu opublikowania właściwych draftów? Sugeruję pillar — utrzymuje wartość UX i SEO sekcji.
