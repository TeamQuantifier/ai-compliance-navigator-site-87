

## Plan: Tłumaczenie artykułu "Compliance Monitoring" na czeski

### Stan obecny

- Artykuł istnieje w **EN** (id: `8af44ddd...`) i **PL** (id: `8f76ab23...`), group_id: `2a5feb69-17e5-415a-b154-6012db594ac4`
- Brak wersji CS
- **Ankieta /cybersecurity-check jest już w pełni przetłumaczona na czeski** — quiz config, result templates, wszystkie pytania, opcje i komunikaty mają wersje CS. Nie wymaga żadnych zmian.

### Co zrobimy

**Wywołanie istniejącej Edge Function `translate-story`** z parametrami dostosowanymi do tabeli `posts` (nie `stories`).

Ponieważ `translate-story` działa na tabeli `stories`, a artykuł blogowy jest w tabeli `posts`, musimy:

1. **Utworzyć nową Edge Function `translate-post`** — analogiczną do `translate-story`, ale operującą na tabeli `posts` zamiast `stories`. Różnice:
   - Pobiera z `posts` zamiast `stories`
   - Tłumaczy pola `excerpt` (zamiast `summary`), `category_id`, `topic_id` (kopiuje bez zmian)
   - Wstawia do `posts` z `lang: 'cs'`

2. **Wywołać funkcję** z EN source (id: `8af44ddd...`, 11KB body) → CS

3. **Nie zmieniamy** wersji PL ani EN

### Szczegóły techniczne

- Source: wersja EN (mniejsza niż PL, bez osadzonych obrazów)
- Tłumaczenie: metadata (title, excerpt, meta_title, meta_desc, tags, focus_keyword) + body_rich text nodes
- Model: Gemini 2.5 Flash via Lovable AI Gateway
- Slug: generowany automatycznie z czeskiego tytułu
- Współdzielone: featured_image_url, og_image_url, category_id, topic_id, related_post_ids

