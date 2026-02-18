
# Dwa błędy do naprawienia w formularzu NIS2

## Błąd 1: RLS blokuje INSERT dla zalogowanych użytkowników

**Problem:** Polityka `Anon can insert submissions` jest ograniczona do roli `anon`. Gdy ktoś jest zalogowany do panelu admina i jednocześnie otworzy `/formularz`, żądanie idzie z rolą `authenticated` — i RLS go blokuje. Brakuje polityki INSERT dla `authenticated`.

Z request headers widać: `"role":"authenticated"` w JWT, a RLS policy dotyczy tylko `anon`.

**Naprawa:** Dodanie polityki INSERT dla roli `authenticated` (lub rozszerzenie istniejącej na obie role):

```sql
CREATE POLICY "Authenticated can insert submissions"
  ON public.submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
```

## Błąd 2: NACE dropdown nie zachowuje wyboru D35

**Problem:** Z request body widać `"q3":["A03"]` (Rybołówstwo), chociaż D35 był widoczny jako wybrany w UI. Drugi klik na dropdown button po wybraniu D35 resetował wartość (lub wybór nie był zarejestrowany przez `onChange` kontrolera React Hook Form).

**Przyczyna:** W `NaceSelect` komponent po kliknięciu opcji wywołuje `onChange(s.code)` i `setOpen(false)`, ale następnie browser wywołuje ponownie click na `button.w-full` (bo jest w tej samej pozycji co kliknięty li) — co ponownie otwiera dropdown. Otwierający klik na dropdown button nie resetuje wartości, ale problem może być w kolejności eventów.

**Naprawa:** W `NaceSelect` po wyborze opcji dodać `event.stopPropagation()` przy zamknięciu, lub zmienić logikę dropdown button na `onMouseDown` zamiast `onClick` z `event.preventDefault()`, żeby drugi klik nie re-toggle'ował.

## Pliki do modyfikacji

| Plik | Zmiana |
|------|--------|
| `supabase/migrations/TIMESTAMP_fix_submissions_rls.sql` | Dodanie polityki INSERT dla roli `authenticated` |
| `src/pages/formularz/FormularzPage.tsx` | Naprawa `NaceSelect` — zapobieganie re-toggle dropdown po wyborze |

## Szczegóły techniczne

### Migracja SQL

```sql
-- Dodaj politykę INSERT dla authenticated (zalogowani użytkownicy też mogą wypełniać quiz)
CREATE POLICY "Authenticated can insert submissions"
  ON public.submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
```

### Naprawa NaceSelect — button onMouseDown

Zmiana w `NaceSelect` buttona dropdown:
```tsx
// PRZED:
onClick={() => setOpen(o => !o)}

// PO: używamy onMouseDown + preventDefault żeby klik na btn podczas zamykania nie re-otwierał
onMouseDown={(e) => {
  e.preventDefault();
  setOpen(o => !o);
}}
```

Alternatywnie: po wyborze opcji, dodać `e.stopPropagation()`:
```tsx
onClick={() => { 
  onChange(s.code); 
  setOpen(false); 
  setSearch(''); 
}}
// + na dropdown container: onClick={(e) => e.stopPropagation()}
```

### Kolejność testowania po naprawie

1. Otwórz `/formularz` (bez logowania) → wypełnij D35 + 250+ + 50mln+ → wynik powinien być 🔴 RED
2. Otwórz `/formularz` (będąc zalogowanym jako admin) → wypełnij → wynik powinien być 🔴 RED (dotychczas blokowane)
3. Sprawdź `/admin/quiz-submissions` → wpis powinien pojawić się z `result_key = RED`
