
# Quiz NIS2: "Czy Twoja firma powinna pilnie zająć się cybersecurity?"

## Architektura — gdzie co trafia

Strona `/formularz` (bez prefixu locale — niezależna od języka, czysta, bez głównego Navbar/Footer aplikacji). Route dodany w `App.tsx` poza blokiem locale-based, jako osobna trasa z własnym layoutem.

**Schemat flow:**
1. Użytkownik wchodzi na `/formularz`
2. Wypełnia email + 4 pytania (multiselect checkboxy)
3. Klika "Sprawdź wynik"
4. Logika client-side oblicza wynik → pobiera tekst z `result_templates` → wstawia rekord do `submissions`
5. Na tej samej stronie pojawia się wynik (inline, bez przeładowania)
6. Admin loguje się do `/admin` → menu "Quiz" → tabela zgłoszeń z filtrowaniem i eksportem CSV

---

## Baza danych — 2 tabele + RLS

### Tabela `submissions`
```sql
CREATE TABLE public.submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  email text NOT NULL,
  q1 text[] DEFAULT '{}',
  q2 text[] DEFAULT '{}',
  q3 text[] DEFAULT '{}',
  q4 text[] DEFAULT '{}',
  result_key text,
  result_text text
);

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon can insert submissions"
  ON public.submissions FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Admins can select submissions"
  ON public.submissions FOR SELECT USING (is_admin(auth.uid()));
```

Uwaga: quiz ma 4 pytania (pracownicy, obrót, sektor, klienci) — brak pytania 5 z oryginalnej specyfikacji. Tabela ma q1..q4.

### Tabela `result_templates`
```sql
CREATE TABLE public.result_templates (
  result_key text PRIMARY KEY,
  title text NOT NULL,
  body text NOT NULL
);

ALTER TABLE public.result_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read result_templates"
  ON public.result_templates FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can manage result_templates"
  ON public.result_templates FOR ALL
  USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));
```

Klucze wyników (na podstawie logiki NIS2): `CRITICAL`, `HIGH`, `MEDIUM`, `LOW` — bardziej sensowne niż A/B/C/D dla tego quizu. Admin edytuje treść przez SQL lub przyszły panel.

Seed danych do `result_templates` (placeholdery do edycji):
- `CRITICAL`: "Pilne działanie wymagane", "Twoja firma spełnia kryteria dużego/średniego podmiotu objętego NIS2..."
- `HIGH`: "Wysokie prawdopodobieństwo NIS2", "..."
- `MEDIUM`: "Sprawdź łańcuch dostaw", "..."
- `LOW`: "Prawdopodobnie poza zakresem NIS2", "..."

---

## Logika punktacji

Quiz ocenia **prawdopodobieństwo objęcia NIS2** na podstawie 4 kryteriów:

**Q1 — Pracownicy:**
- `poniżej 10` → 0 pkt
- `10–49` → 1 pkt
- `50–249` → 2 pkt (średnie przedsiębiorstwo)
- `250+` → 3 pkt (duże przedsiębiorstwo)

**Q2 — Obrót:**
- `poniżej 2 mln` → 0 pkt
- `2–10 mln` → 1 pkt
- `10–50 mln` → 2 pkt
- `50 mln+` → 3 pkt

**Q3 — Sektor NACE:**
- Sektory kluczowe (energia, transport, banki, ochrona zdrowia, woda, infrastruktura cyfrowa): +3 pkt
- Sektory ważne (np. J61 Telekomunikacja, J62 IT, C21 Farmaceutyki, C24 Metale, K64 Finanse): +2 pkt
- Pozostałe sektory: +1 pkt
- Sektor `A` (rolnicto/ryby) lub `T/U` (gospodarstwa domowe): +0 pkt

**Q4 — Klienci (multiselect, każdy zaznaczony = +1):**
- Banki i instytucje finansowe → +2
- Energetyka → +2
- Duże korporacje → +1
- Administracja publiczna → +2
- Spółki notowane → +1
- Firmy IT → +1
- Firmy produkujące żywność → +1
- Branża chemiczna i farmaceutyczna → +1
- Transport → +1
- Gospodarka wodna → +2
- Małe i średnie przedsiębiorstwa → 0
- Klienci indywidualni B2C → 0

**Progi wynikowe (łączna suma):**
- ≥ 8 pkt → `CRITICAL`
- 5–7 pkt → `HIGH`
- 2–4 pkt → `MEDIUM`
- 0–1 pkt → `LOW`

Logika punktacji będzie w pliku konfiguracyjnym `src/config/quizConfig.ts` — łatwa do edycji bez modyfikowania UI.

---

## Pytanie Q3: select NACE — specjalne UI

Pytanie 3 (sektor) to lista 80+ kodów NACE z opisami. **Nie checkboxy** — to select (dropdown z wyszukiwarką) lub lista z opcją wyszukiwania, bo zbyt dużo opcji.

Implementacja: komponent `<select>` z wbudowanym filtrowaniem (input + lista filtrowana) — użytkownik wpisuje nazwę lub kod NACE, lista się filtruje. Wybór jest jednokrotny (radio logic).

---

## Nowe pliki

### `src/config/quizConfig.ts`
Centralna konfiguracja pytań i logiki punktowania — edytowalna bez modyfikowania UI.

### `src/pages/formularz/FormularzPage.tsx`
Główny komponent strony `/formularz`:
- Własny prosty layout (bez Navbar/Footer serwisu)
- Logo + nagłówek
- Formularz z walidacją zod + react-hook-form
- Stany: `filling` → `submitting` → `result`
- Po submit inline wynik (bez przeładowania)

### `src/pages/admin/QuizSubmissions.tsx`
Panel admina:
- Tabela: data, email, q1, q2, q3 (sektor NACE), q4 (lista klientów), result_key
- Wyszukiwarka po emailu
- Filtr po result_key (CRITICAL/HIGH/MEDIUM/LOW)
- Sortowanie po dacie
- Eksport CSV (Blob API, client-side)

---

## Modyfikacje istniejących plików

### `src/App.tsx`
Dodanie route `/formularz` **poza** blokiem locale-based (nie `/:locale/formularz`):
```tsx
// Tuż przed catch-all "/*"
import FormularzPage from './pages/formularz/FormularzPage';
// ...
<Route path="/formularz" element={<FormularzPage />} />
```

I route admina:
```tsx
<Route path="quiz-submissions" element={<QuizSubmissions />} />
```

### `src/components/admin/AdminLayout.tsx`
Dodanie pozycji "Quiz" do menu sidebaru:
```tsx
{ icon: ClipboardList, label: 'Quiz', path: '/admin/quiz-submissions' },
```

---

## UX formularza

1. **Email** — input z walidacją (required, format email)
2. **Q1** — 4 przyciski radio (poniżej 10, 10–49, 50–249, 250+)
3. **Q2** — 4 przyciski radio (obrót)
4. **Q3** — Searchable select z kodami NACE + opisem działu
5. **Q4** — 12 checkboxów z etykietami (multiselect)
6. **Zgoda RODO** — checkbox: "Wyrażam zgodę na przetwarzanie mojego adresu email w celu otrzymania wyniku. Polityka prywatności."
7. **Przycisk** — "Sprawdź, czy dotyczy Cię NIS2"
8. **Loading state** — spinner podczas submit
9. **Wynik** — inline (scroll do górny), karta z tytułem + opisem + badge poziomu

---

## Podsumowanie ścieżek

| Strona | Ścieżka | Dostęp |
|---|---|---|
| Formularz publiczny | `/formularz` | Wszyscy |
| Panel admina — quiz | `/admin/quiz-submissions` | Tylko zalogowany admin |

## Jak edytować pytania i wyniki

- **Treści pytań i opcje** → `src/config/quizConfig.ts` — plik z tablicą pytań, można zmienić tekst, dodać opcje
- **Logika punktowania** → `src/config/quizConfig.ts` — funkcja `scoreAnswer(questionId, answer)` z mapą punktów
- **Progi wynikowe** → `src/config/quizConfig.ts` — obiekt `SCORE_THRESHOLDS`
- **Tytuł i treść wyników** → tabela `result_templates` w bazie (edytowalna przez panel admina lub SQL)

## Pliki do stworzenia/modyfikacji

| Plik | Akcja |
|---|---|
| Migracja SQL | Tworzy `submissions`, `result_templates`, RLS, seed danych |
| `src/config/quizConfig.ts` | Nowy — konfiguracja pytań i punktacji |
| `src/pages/formularz/FormularzPage.tsx` | Nowy — cały formularz + wynik inline |
| `src/pages/admin/QuizSubmissions.tsx` | Nowy — panel admina z tabelą i CSV |
| `src/App.tsx` | Modyfikacja — dodanie route `/formularz` i `/admin/quiz-submissions` |
| `src/components/admin/AdminLayout.tsx` | Modyfikacja — dodanie "Quiz" do menu sidebaru |
