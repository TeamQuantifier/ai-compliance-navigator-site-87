

# Plan: Dodanie sekcji "Historie sukcesu" na stronie /blog

## Opis

Na stronie `/blog` dodamy dwie wyraźne sekcje z nagłówkami H2:
1. **"Blog"** — istniejący grid artykułów (bez zmian w logice)
2. **"Historie sukcesu"** — nowa sekcja pod spodem, wyświetlająca stories z hooka `useStories`

Stories będą linkować do `/success-stories/{slug}` — te same dane co na dedykowanej stronie `/success-stories`, która pozostaje bez zmian.

**SEO**: Brak duplikacji treści — to linki do tych samych podstron, nie zduplikowany content. Canonical URL pozostaje na story detail page. Struktura jest analogiczna do sekcji "Polecane artykuły" na wielu blogach.

---

## Zmiany

### 1. `src/pages/blog/BlogList.tsx`

- Import `useStories` z `@/hooks/useBlog`
- Import ikony `Trophy` z lucide-react
- Wywołać `useStories(currentLocale)` obok istniejącego `usePosts`
- Dodać nagłówek H2 **"Blog"** nad istniejącym gridem artykułów
- Pod gridem blogowym dodać nową sekcję z nagłówkiem H2 **"Historie sukcesu"** (EN: "Success Stories", CS: "Příběhy úspěchů")
- Wyświetlić stories w gridzie 3-kolumnowym (karty z obrazkiem, tytułem, datą, przycisk "Czytaj więcej")
- Linkować do `/${currentLocale}/success-stories/${story.slug}`
- Dodać przycisk "Zobacz wszystkie" linkujący do `/${currentLocale}/success-stories`

### 2. Tłumaczenia (`public/locales/*/translation.json`, `src/i18n/locales/*.json`)

- Dodać klucze: `blog.sectionTitle` ("Blog"), `blog.successStoriesSection` ("Historie sukcesu" / "Success Stories" / "Příběhy úspěchů"), `blog.viewAllStories` ("Zobacz wszystkie" / "View all" / "Zobrazit vše")

---

## Pliki do edycji

| Plik | Zmiana |
|------|--------|
| `src/pages/blog/BlogList.tsx` | Dodanie sekcji stories + nagłówek "Blog" |
| `public/locales/pl/translation.json` | Nowe klucze blog.* |
| `public/locales/en/translation.json` | Nowe klucze blog.* |
| `public/locales/cs/translation.json` | Nowe klucze blog.* |
| `src/i18n/locales/pl.json` | Nowe klucze blog.* |
| `src/i18n/locales/en.json` | Nowe klucze blog.* |

Brak zmian w bazie danych. Strona `/success-stories` pozostaje bez zmian.

