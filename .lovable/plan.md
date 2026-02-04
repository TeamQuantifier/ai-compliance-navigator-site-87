
# Plan: Poprawa logiki walidacji "Keyword in title"

## Problem

Walidacja "Keyword in title" nie działa poprawnie dla wielowyrazowych focus keywords:

| Focus Keyword | Meta Title | Status |
|---------------|------------|--------|
| `AI agenti shoda` | `AI Agenti: jak zajišťují shodu` | MISSING |
| `AI agents compliance` | `AI Agents for Compliance` | MISSING |
| `EcoVadis ocena ESG` | `EcoVadis: Ocena ESG w praktyce` | MISSING |

Obecna logika wymaga **dokładnego dopasowania całej frazy jako ciągłego podciągu**, co nie działa gdy:
- Słowa są oddzielone znakami interpunkcyjnymi (`:`)
- Są dodatkowe słowa pomiędzy (`for`, `dla`, `jak`)
- Słowa są odmienione (shoda/shodu, zgodność/zgodności)

## Proponowane rozwiązanie

Zmiana algorytmu walidacji na sprawdzanie czy **wszystkie słowa** z focus keyword występują w tytule (niezależnie od kolejności i znaków interpunkcyjnych).

### Nowa logika

```typescript
function checkKeywordInTitle(title: string, keyword: string): boolean {
  if (!keyword) return true;
  
  const normalizedTitle = title.toLowerCase();
  const keywordWords = keyword.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  
  // Wszystkie słowa z keyword muszą występować w tytule
  return keywordWords.every(word => normalizedTitle.includes(word));
}
```

Przykłady po zmianie:
- `AI agenti shoda` vs `AI Agenti: jak zajišťují shodu` - sprawdzi czy "ai", "agenti", "shoda" występują - czeskie odmiany to nadal problem
- `AI agents compliance` vs `AI Agents for Compliance` - OK (wszystkie słowa obecne)
- `EcoVadis ocena ESG` vs `EcoVadis: Ocena ESG w praktyce` - OK

### Alternatywa: Uprościć focus keywords

Można też uprościć focus keywords, aby były dokładnym matchem:

| Obecny Focus Keyword | Nowy Focus Keyword |
|---------------------|-------------------|
| `AI agenti shoda` | `AI Agenti` |
| `kyberútok ransomware případová studie` | `Kyberútok ransomware` |
| `AI agents compliance` | `AI Agents` |
| `AI agenci zgodność` | `AI Agenci` |
| `EcoVadis ocena ESG` | `Ocena ESG` |

## Rekomendacja

**Podejście hybrydowe:**

1. **Zmiana kodu analizatora** - sprawdzanie wszystkich słów (bardziej elastyczne)
2. **Uproszczenie keywords** w bazie danych - dla przypadków z odmianami (czeskie)

## Pliki do modyfikacji

### 1. `src/lib/seo-analyzer.ts` (linia 165-167)

```typescript
// Przed
case 'keyword-in-title':
  isPassed = !keyword || seoTitle.toLowerCase().includes(keyword.toLowerCase());
  message = isPassed ? 'Keyword found in title' : 'Add focus keyword to SEO title';
  break;

// Po
case 'keyword-in-title':
  const keywordWords = keyword.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  isPassed = !keyword || keywordWords.every(word => seoTitle.toLowerCase().includes(word));
  message = isPassed ? 'Keyword found in title' : 'Add focus keyword to SEO title';
  break;
```

### 2. `src/hooks/useSeoAnalysis.ts` (funkcja checkKeywordInText + linia 193)

```typescript
// Poprawka na linii 193 - sprawdzać meta_title zamiast title
const keywordInTitle = hasKeyword && checkKeywordInText(
  data.metaTitle || data.title || '', 
  data.focusKeyword!
);

// Zmiana funkcji checkKeywordInText
function checkKeywordInText(text: string, keyword: string): boolean {
  if (!keyword) return false;
  const normalizedText = text.toLowerCase();
  const keywordWords = keyword.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  return keywordWords.every(word => normalizedText.includes(word));
}
```

### 3. Aktualizacja focus keywords w bazie (opcjonalnie)

Dla przypadków z odmianami czeskimi, gdzie nawet słowa pojedyncze nie matchują (shoda vs shodu):

```sql
-- Uproszczone keywords dla czeskich artykułów
UPDATE posts SET focus_keyword = 'AI Agenti shodu' WHERE id = 'f90578e0-...';
-- lub jeszcze prostsze
UPDATE posts SET focus_keyword = 'AI Agenti' WHERE id = 'f90578e0-...';
```

## Oczekiwany rezultat

Po wdrożeniu:
- Większość artykułów powinna mieć "Keyword in title" na zielono
- Logika będzie bardziej elastyczna i zgodna z praktykami SEO
- Przypadki z odmianami językowymi mogą wymagać dodatkowej poprawki keywords

## Uwagi techniczne

- Zmiana jest wstecznie kompatybilna - dokładne dopasowanie frazy nadal przejdzie walidację
- Sprawdzanie wszystkich słów jest standardem w narzędziach SEO (Yoast, RankMath)
- Dla języków z odmianą, pełne rozwiązanie wymagałoby stemmingu, ale to nadmiarowe

