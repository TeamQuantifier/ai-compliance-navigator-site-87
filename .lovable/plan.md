

# Plan: Implementacja 7 nowych/zaktualizowanych artykułów blogowych

## Analiza stanu obecnego

### Co jest w przesłanych plikach (7 plików):

| # | Plik | Slug | Lang | Słów ~| Status w DB |
|---|---|---|---|---|---|
| 1 | 01-nis2-polska-ksc-przewodnik.md | `nis2-polska-wymagania-ksc-przewodnik` | PL | 2000+ | **NIE ISTNIEJE** (ale jest `wymagania-nis2-polska-przewodnik` — 11638 znaków) |
| 2 | 02-nis2-board-accountability.md | `nis2-board-accountability` | EN | 2000+ | Istnieje jako **szkielet** (360 znaków — 1 zdanie) |
| 3 | 03-nis2-penalties-fines.md | `nis2-penalties-fines-enforcement` | EN | 2000+ | Istnieje jako **szkielet** (366 znaków — 1 zdanie) |
| 4 | 04-compliance-automation-evaluation-guide.md | `compliance-automation-evaluation-guide` | EN | 2000+ | Istnieje jako **szkielet** (396 znaków — 1 zdanie) |
| 5 | 05-nis2-vs-iso-27001.md | `nis2-vs-iso-27001-mapping` | EN | 2000+ | Istnieje jako **szkielet** (344 znaków — 1 zdanie) |
| 6 | 06-dora-compliance-checklist.md | `dora-compliance-checklist` | EN | 2500+ | **NIE ISTNIEJE** w DB |
| 7 | LOVABLE-PROMPT.md | — | — | — | Instrukcja wdrożeniowa |
| 8 | MASTER-PLAN.md | — | — | — | Master plan SEO |

### Problemy do rozwiązania:

1. **4 szkielety** (board-accountability, penalties, compliance-automation, nis2-vs-iso-mapping) mają po 1 zdaniu — trzeba zastąpić pełną treścią z plików MD
2. **PL przewodnik KSC** — istnieje `wymagania-nis2-polska-przewodnik` (11638 znaków). Nowy plik ma inny slug (`nis2-polska-wymagania-ksc-przewodnik`) i jest obszerniejszy — **DECYZJA**: zaktualizować istniejący `wymagania-nis2-polska-przewodnik` nową treścią (zachowując slug i group_id, bo może mieć powiązania)
3. **DORA checklist** — zupełnie nowy artykuł, nie istnieje w DB
4. **`nis2-directive`** — opublikowany, ale LOVABLE-PROMPT mówi że jest pusty/zepsuty i powinien mieć redirect 301 do `nis2-directive-compliance-requirements-implementation-guide`
5. **Istniejące duplikaty** z MASTER-PLAN:
   - `nis2-vs-iso-27001-differences` (10570 znaków) vs `nis2-vs-iso-27001-mapping` (344 znaków) — oba EN, oba o NIS2 vs ISO → **kanibalizacja**
   - `nis2-compliance-checklist-2026` (5581 znaków) vs `nis2-requirements-checklist-2025` (15509 znaków) — oba EN checklisty

### Dodatkowe wymagania z LOVABLE-PROMPT:

- Zaktualizować istniejący artykuł pillar (`nis2-directive-compliance-requirements-implementation-guide`) o linki do nowych cluster pages
- Dodać FAQ schema do artykułów z sekcją FAQ
- Canonical bez trailing slash (UWAGA: to **sprzeczne** z obecną strategią canonical Z trailing slash — trzeba wybrać jedno)
- Internal links z `internal_links` frontmatter jako "Related Articles" section

---

## Plan implementacji (8 kroków)

### Krok 1: Zaktualizuj 4 szkielety pełną treścią
Zamień `body_rich` w tych 4 istniejących draftach na pełną treść TipTap JSON skonwertowaną z markdown:
- `nis2-board-accountability` ← plik 02
- `nis2-penalties-fines-enforcement` ← plik 03
- `compliance-automation-evaluation-guide` ← plik 04
- `nis2-vs-iso-27001-mapping` ← plik 05

Zaktualizuj też `meta_title`, `meta_desc`, `focus_keyword`, `tags`, `excerpt` z frontmatter.

### Krok 2: Zaktualizuj PL przewodnik KSC
Zaktualizuj istniejący `wymagania-nis2-polska-przewodnik` nową, obszerniejszą treścią z pliku 01. Zachowaj obecny slug i group_id.

### Krok 3: Utwórz nowy artykuł DORA
Utwórz nowy wpis `dora-compliance-checklist` (EN, draft) z plikiem 06. Utwórz nowy `article_group` i `group_id`.

### Krok 4: Rozwiąż duplikaty/kanibalizację
- `nis2-vs-iso-27001-differences` (10570 znaków) — **usuń** lub oznacz jako redirect do `nis2-vs-iso-27001-mapping` (który teraz będzie pełny)
- `nis2-requirements-checklist-2025` — rozważ merge z `nis2-compliance-checklist-2026` (osobna decyzja)

### Krok 5: Redirect `nis2-directive`
Dodaj 301 redirect w `netlify.toml`:
`/en/blog/nis2-directive` → `/en/blog/nis2-directive-compliance-requirements-implementation-guide/`

### Krok 6: Dodaj internal links do artykułu pillar
Zaktualizuj `body_rich` artykułu `nis2-directive-compliance-requirements-implementation-guide` — dodaj sekcję "Related Articles" z linkami do 4 nowych cluster pages.

### Krok 7: Zaktualizuj sitemap
Dodaj `dora-compliance-checklist` do sitemap (automatycznie przez edge function, bo czyta z DB).

### Krok 8: Zaktualizuj internal_links w DORA
Plik 06 linkuje do `evidence-automation-continuous-compliance` — ten slug został usunięty i skonsolidowany do `audit-evidence-collection-automation`. Trzeba poprawić ten link.

---

## Kwestia canonical slash

LOVABLE-PROMPT mówi "canonical bez trailing slash" ale cała obecna infrastruktura (sitemap, redirecty, SEOHead) używa trailing slash. **Rekomendacja**: zachować trailing slash — zmiana teraz spowodowałaby chaos w GSC.

## Kolejność pracy

Konwersja MD → TipTap JSON jest kluczowa. Napiszę skrypt konwertujący markdown na format `body_rich` (TipTap JSON) i wykonam SQL UPDATE/INSERT dla każdego artykułu.

