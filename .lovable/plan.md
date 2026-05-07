## Status nowego artykułu `nis2-requirements-checklist-2026`

Sprawdziłem produkcję — wszystko OK:

- **Sitemap**: artykuł obecny w `https://quantifier.ai/sitemap.xml` (znaleziono 7 wystąpień: EN URL + alternates + hreflangi).
- **Prerender bota**: `GET /en/blog/nis2-requirements-checklist-2026/` z UA Googlebot zwraca 200 z poprawnym `<title>` i `<link rel="canonical">`. Bot-prerender działa.
- **Meta**: `meta_title` 47 znaków ✅, `meta_desc` 145 znaków ✅, `published_at = 2026-05-07` ✅.
- **GSC**: pojawi się w 1–7 dni naturalnie (sitemap odpytywana cyklicznie). Możesz przyspieszyć przez **Inspect URL → Request indexing** w Google Search Console — zalecam zrobić to ręcznie dla tego URL i jego PL/CS alternates (jeśli istnieją).

## Pozostałe rzeczy do zrobienia (po v5)

1. **Tytuły > 60 znaków** — 53 wpisy łącznie (posts + stories, wszystkie języki). Robimy batchami po 30.
2. **Title vs H1**: wyjaśnienie — `meta_title` (SEO, ≤60 zn., w `<head>`) i `title`/H1 (na stronie) to dwa różne pola w bazie. W większości postów `meta_title` jest pusty → prerender używa wtedy `title` jako `<title>`, co tworzy długie tytuły SEO. Strategia: dla każdego za długiego rekordu uzupełnimy `meta_title` (≤60 zn., focus keyword na początku) **bez zmiany on-page H1** (`title`), żeby nie naruszyć treści ani UX.
3. **Re-audyt v6** po batchu, żeby potwierdzić zniknięcie ostrzeżeń `LONG_TITLE`.

## Plan tej iteracji — Batch 1 (30 najdłuższych tytułów)

### Zakres

Top 30 rekordów po długości `title` (z `posts` + `stories`, wszystkie języki: PL/EN/CS), gdzie `meta_title IS NULL` lub > 60 znaków. Wśród nich m.in.:

- `case-study-seris-konsalnet` (PL/EN/CS, 116–118 zn.)
- `ciagla-zgodnosc-od-reakcji-do-proakcji` (PL, 112)
- `dyrektywa-nis2` (PL, 104)
- `dyrektywa-nis2-wymagania-zgodnosci-przewodnik-wdrozenia` (PL, 99)
- `smernice-nis2-pozadavky-na-soulad-pruvodce-implementaci` (CS, 96)
- `průvodce-připraveností-na-digitální-produktový-pas` (CS, 96)
- `compliance-monitoring` (PL, 96 / EN, 81)
- `ecovadis-in-practice` + warianty (95, 86)
- `ai-agents-in-quantifier` + warianty (95, 91)
- `continuous-compliance-from-reaction-to-proaction` (95)
- `nis2-directive-compliance-requirements-implementation-guide` (84)
- `cyfrowy-paszport-produktu-przewodnik-2026` (84)
- `digitla-product-assport-readiness-guide` (82)
- `dora-compliance-checklist` (69)
- `soc-2-a-complete-guide-in-2026` (69)
- + reszta do uzbierania 30

### Reguły dla nowych `meta_title`

- ≤ 60 znaków (z buforem na ` | Quantifier.ai Blog` → faktyczny limit treści ~40 zn.; **lub** zostawiamy bez sufiksu jeśli generuje duplikat brandu).
- Focus keyword na początku (NIS2, DORA, SOC 2, EcoVadis, DPP, Continuous Compliance, AI Agents).
- Język/terminologia zgodna z memory: EN = "NIS2"/"Inspector", PL = "KSC"/"UKSC", CS = lokalna terminologia.
- Bez ozdobników, bez wykrzykników, bez emoji.

### Kroki wykonawcze (po Twojej akceptacji planu — w trybie default)

1. Pobiorę dokładną listę top-30 rekordów z bazy (posts + stories) z aktualnymi `title` / `meta_title`.
2. Wygeneruję propozycje `meta_title` (≤60 zn.) w pliku `/mnt/documents/title-batch-1.md` do Twojego review **przed** wprowadzeniem zmian.
3. Po akceptacji — migracja SQL `UPDATE` dla 30 rekordów (posts + stories), tylko kolumna `meta_title`. `title`/H1 nietknięte.
4. Re-audyt v6 ograniczony do tych 30 URL-i + ogólny check `LONG_TITLE` na całej sitemapie. Raport: `/mnt/documents/seo-audit-summary-v6.md`.
5. Jeśli wynik OK → robimy Batch 2 (kolejne 23 rekordy + ewentualne pozostałe ostrzeżenia).

## Co musisz zrobić

- Zatwierdź plan → przejdę do wykonania kroku 1+2 i wrócę z propozycjami tytułów do akceptacji **przed** zapisem do bazy.
- Równolegle (opcjonalnie): w GSC zrób "Request indexing" dla `https://quantifier.ai/en/blog/nis2-requirements-checklist-2026/` — przyspieszy indeksację.
