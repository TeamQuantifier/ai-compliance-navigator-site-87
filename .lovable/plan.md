
# Plan zmian: usunięcie punktów, wysyłka emaila przez API, statystyki zbiorcze w adminie

## Co zostanie zrobione (3 niezależne zmiany)

---

## 1. Usunięcie liczby punktów z widoku wyniku

W `FormularzPage.tsx` w sekcji wynikowej (linia 195–198) jest blok:
```tsx
<div className="text-right">
  <div className="text-4xl font-black text-[#1a2e54]">{result.score}</div>
  <div className="text-xs text-gray-400 font-medium">punktów</div>
</div>
```
Ten blok zostanie **usunięty**. Interfejs `ResultData` straci pole `score`, a `onSubmit` nie będzie już przekazywać tej wartości.

---

## 2. Wysyłka emaila przez API marketing.quantifier.ai

Aktualnie po wypełnieniu formularza email jest zapisywany tylko do bazy — nie jest wysyłany żaden email do uczestnika.

Wzorując się na istniejącym `newsletterClient` (który używa `https://marketing.quantifier.ai`), po zapisaniu do bazy zostanie wywołane `newsletterClient.subscribe(...)` z dodatkowymi polami:

```typescript
await newsletterClient.subscribe(data.email.trim().toLowerCase(), 'pl', {
  source: 'nis2-quiz',
  origin: window.location.href,
  tags: ['nis2-quiz', `result-${resultKey.toLowerCase()}`],
  customer_message: resultKey, // wynik quizu jako dodatkowy kontekst
});
```

To wystarczy, żeby:
- Subskrybent trafił do bazy marketingowej z tagiem `result-RED` / `result-ORANGE` itp.
- Automacja po stronie marketing.quantifier.ai mogła wysłać odpowiedni email z wynikiem.

Błąd wysyłki emaila **nie blokuje** zapisania zgłoszenia — jest przechwytywany oddzielnie i logowany (`console.warn`), żeby nie tracić danych.

---

## 3. Statystyki zbiorcze w panelu admina (nowa sekcja w QuizSubmissions)

Dane są już w bazie (`submissions`), więc **nie potrzebujemy ani MailerLite API, ani Google Forms** — wszystko liczymy po stronie klienta ze zwróconych wierszy.

Na górze strony `/admin/quiz-submissions`, powyżej tabeli, zostanie dodany panel z 4 kartami statystyk:

```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│  🔴 RED         │  🟠 ORANGE      │  🟡 YELLOW      │  🟢 GREEN       │
│  12 zgłoszeń   │  34 zgłoszeń   │  28 zgłoszeń   │  15 zgłoszeń   │
│  13.5% całości  │  38.2% całości  │  31.5% całości  │  16.8% całości  │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

Plus jedno podsumowanie ogólne: łączna liczba, liczba z ostatnich 7 dni, i najczęstszy sektor NACE.

Statystyki obliczane są z `rows` (wszystkich rekordów, nie filtrowanych) — by zawsze pokazywały globalny obraz.

---

## Pliki do modyfikacji

| Plik | Zakres zmiany |
|------|---------------|
| `src/pages/formularz/FormularzPage.tsx` | Usuń blok punktów z widoku wyniku, usuń `score` z interfejsu `ResultData`, dodaj wywołanie `newsletterClient.subscribe(...)` po zapisaniu do bazy |
| `src/pages/admin/QuizSubmissions.tsx` | Dodaj sekcję statystyk zbiorczych (4 kolorowe karty + podsumowanie ogólne) powyżej filtrów |

---

## Decyzja: gdzie trzymać dane

Dane quizu pozostają **wyłącznie w bazie** (tabela `submissions`). To optymalne rozwiązanie bo:
- Panel admina ma już pełny podgląd z filtrowaniem i eksportem CSV
- Nie trzeba synchronizować danych z MailerLite czy Google Forms
- Statystyki są zawsze aktualne (obliczane live z bazy)
- Tagging w systemie mailingowym (`result-RED` itp.) pozwala na segmentację w MailerLite bez duplikowania bazy

---

## Przepływ po zmianach

```text
Użytkownik wypełnia formularz
        ↓
classifyNIS2() → result_key (RED/ORANGE/YELLOW/GREEN)
        ↓
INSERT → submissions (baza danych)
        ↓
newsletterClient.subscribe() → marketing.quantifier.ai
  z tagiem result-red / result-orange / result-yellow / result-green
        ↓
Wynik pokazany użytkownikowi (bez liczby punktów)
        ↓
Admin widzi w /admin/quiz-submissions:
  - statystyki zbiorcze (4 karty)
  - tabelę z wszystkimi zgłoszeniami
```
