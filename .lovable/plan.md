

## Uzupełnienie czeskich tłumaczeń w ankiecie Cybersecurity Check

### Problem 1: Sektory NACE (pytanie 3) — wyświetlają się we wszystkich 3 językach naraz

Obecnie każdy sektor ma label w formacie `"C10 — Produkcja żywności / Food production / Výroba potravin"`. Trzeba zmienić strukturę na per-language labels, żeby dla CS wyświetlał się tylko czeski tekst.

**Zmiana w `src/config/quizConfig.ts`:**
- Zmienić `NACE_SECTORS` z `{ code, label: string }` na `{ code, label: Record<QuizLang, string> }`
- Każdy z ~60 sektorów dostanie oddzielne tłumaczenie PL, EN, CS (dane już istnieją w obecnych labelach, trzeba je rozdzielić)
- Zaktualizować `NaceSelect` w `FormularzPage.tsx`, żeby używał `s.label[lang]` zamiast `s.label`

### Problem 2: Etykiety wyników (RESULT_LABELS) — tylko po polsku

`RESULT_LABELS` na linii 364-369 to `Record<ResultKey, string>` z polskimi tekstami. Trzeba zmienić na `Record<ResultKey, Record<QuizLang, string>>`:
- RED: PL "Wysokie prawdopodobieństwo NIS2" / EN "High Likelihood of NIS2 Obligation" / CS "Vysoká pravděpodobnost povinnosti NIS2"
- ORANGE, YELLOW, GREEN — analogicznie (wartości z tabeli `result_templates`)

Zaktualizować użycie w `FormularzPage.tsx`: `RESULT_LABELS[result.resultKey]` → `RESULT_LABELS[result.resultKey][lang]`

### Zakres zmian
- **`src/config/quizConfig.ts`**: Restrukturyzacja NACE_SECTORS + RESULT_LABELS
- **`src/pages/formularz/FormularzPage.tsx`**: Dostosowanie odwołań do nowych struktur (2 miejsca)
- Wersje PL i EN pozostają bez zmian treściowych

