## Plan: Sortowalne kolumny w tabelach panelu admina

### Cel
Umożliwić klikanie nagłówków kolumn w tabelach `/admin/*`, aby sortować dane rosnąco/malejąco (toggle), z wizualnym wskaźnikiem kierunku (strzałka ↑/↓).

### Zakres — strony do objęcia

| Strona | Plik | Sortowalne kolumny |
|---|---|---|
| Blog Posts | `src/pages/admin/PostsList.tsx` | Tytuł, Języki (liczba), Status, Publikacja |
| Success Stories | `src/pages/admin/StoriesList.tsx` | Tytuł, Klient, Branża, Języki, Status, SEO |
| Event Registrations | `src/pages/admin/EventRegistrations.tsx` | wszystkie tekstowe + data |
| Quiz Submissions | `src/pages/admin/QuizSubmissions.tsx` | wszystkie tekstowe + data + score |
| SEO Audit | `src/pages/admin/SeoAudit.tsx` | URL, Score, Status, ostatnia aktualizacja |

(Kolumny "Obrazek" i "Akcje" pozostają niesortowalne.)

### Rozwiązanie techniczne

1. **Wspólny hook** `src/hooks/useTableSort.ts`:
   - Generyczny `useTableSort<T>(data, defaultKey?, defaultDir?)`
   - Stan: `{ sortKey, sortDir: 'asc' | 'desc' }`
   - Zwraca: `sortedData`, `sortKey`, `sortDir`, `toggleSort(key)`
   - Sortowanie tolerancyjne na typy: string (localeCompare, case-insensitive), number, Date (parsowanie ISO), array (po `.length`), null/undefined zawsze na końcu.

2. **Komponent `SortableHead`** (mały helper w tym samym pliku lub w `src/components/admin/SortableHead.tsx`):
   - Renderuje `<TableHead>` z `cursor-pointer`, label + ikona `ArrowUp` / `ArrowDown` / `ArrowUpDown` (lucide-react, już używane).
   - Props: `sortKey`, `currentSort`, `currentDir`, `onSort`, `children`.

3. **Integracja w każdej liście**:
   - Zamienić surowe `<TableHead>` dla sortowalnych kolumn na `<SortableHead>`.
   - Zamiast iterować po surowym `posts`/`stories`/... iterować po `sortedData` z hooka.
   - Domyślne sortowanie zachowuje obecne (np. `created_at desc` dla postów → po dacie publikacji desc; quiz/events po dacie utworzenia desc).

### Szczegóły UX
- Kliknięcie nieaktywnej kolumny → ustawia `asc`. Kolejne kliknięcia tej samej kolumny: `asc → desc → asc`.
- Aktywna kolumna podświetla nagłówek (pogrubienie tekstu) i pokazuje kierunkową strzałkę; nieaktywne pokazują `ArrowUpDown` w `text-muted-foreground/50`.
- Sortowanie jest klient-side (dane już są w pamięci po `loadPosts()` itd.) — zero dodatkowych zapytań do bazy.

### Pliki do utworzenia/zmiany
- **nowy:** `src/hooks/useTableSort.ts` (hook + komponent `SortableHead`)
- **edycja:** `src/pages/admin/PostsList.tsx`
- **edycja:** `src/pages/admin/StoriesList.tsx`
- **edycja:** `src/pages/admin/EventRegistrations.tsx`
- **edycja:** `src/pages/admin/QuizSubmissions.tsx`
- **edycja:** `src/pages/admin/SeoAudit.tsx`

### Poza zakresem
- Filtrowanie/wyszukiwanie kolumn (osobny temat).
- Paginacja po stronie serwera.
- Zapamiętywanie wybranego sortowania w localStorage (można dodać później jeśli będzie potrzeba).
