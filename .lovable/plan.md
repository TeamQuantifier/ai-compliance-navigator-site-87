Plan budowy panelu podsumowania leadów

Cel: Nowa zakładka w panelu admina (`/admin/leads`), która zbiera i grupuje leady ze wszystkich formularzy na stronie, z widocznym linkiem do podstrony, z której lead został zapisany.

Wybory użytkownika (potwierdzone):
- Grupowanie po źródle (nie jedna wspólna tabela).
- Tylko podstawowe dane + link do podstrony.
- Nowa zakładka w menu bocznym admina.

Źródła leadów obecnie w bazie:
1. `contact_submissions` — formularz kontaktowy i wszystkie formularze wysyłane przez edge function `contact-form` (m.in. landingi szkoleniowe, partnerzy).
2. `event_registrations` — zapisy na webinary i szkolenia.
3. `submissions` — quiz / sprawdzian cyberbezpieczeństwa NIS2.

Aktualne wolumeny (na dzień dzisiejszy):
- contact_submissions: 75 leadów
- event_registrations: 318 leadów
- submissions: 178 leadów

Szczegółowy plan implementacji

1. Nowa pozycja w menu admina
Plik: `src/components/admin/AdminLayout.tsx`
- Dodanie ikony `Users` (lub `BarChart`) i etykiety „Leads” w `menuItems`.
- Ścieżka: `/admin/leads`.

2. Nowa trasa w routerze
Plik: `src/App.tsx`
- Dodanie importu `Leads`.
- Dodanie `<Route path="leads" element={<Leads />} />` w sekcji `/admin`.

3. Główny komponent panelu leadów
Plik: `src/pages/admin/Leads.tsx` (nowy)

Widok składa się z:

a) Nagłówek z liczbą leadów
- Tytuł „Leads — podsumowanie zgłoszeń".
- Pod spodem: liczba leadów w wybranym okresie / ogółem.

b) Kafelki KPI na górze (4 karty)
- Wszystkich leadów (suma z 3 tabel).
- Nowi dziś.
- Nowi w tym tygodniu.
- Największe źródło (np. webinar, contact, quiz).

c) Sekcje grupowane po źródle

Każda sekcja to karta z tabelą lub listą. Kolumny podstawowe: data, email, imię, firma, link do podstrony.

i) Sekcja „Contact page"
- Źródło: `contact_submissions` gdzie `source_url` zawiera `/contact`.
- Kolumny: Data, Imię, Email, Firma, Link.
- Link: wartość `source_url` (otwierany w nowej karcie).

ii) Sekcja „Training landing pages"
- Źródło: `contact_submissions` gdzie `source_url` zawiera `/darmowe-szkolenie-nis2`, `/szkolenia-cyberbezpieczenstwo-dla-firm`, `/cybersecurity-training-for-companies` itp.
- Dodatkowo: `event_registrations` dla eventów związanych ze szkoleniami (opcjonalnie, w osobnym wierszu „Szkolenia / webinary").
- Kolumny: Data, Email, Imię, Firma, Link.

iii) Sekcja „Quiz NIS2 / Cybersecurity check"
- Źródło: `submissions`.
- Kolumny: Data, Email, Wynik, Sektor, Link.
- Link: przekierowanie do strony quizu. Dla nowych zapisów — dodanie `source_url` w tabeli (patrz punkt 4). Dla historycznych — link do polskiej wersji quizu `/pl/sprawdz-cyberbezpieczenstwo`.

iv) Sekcja „Webinary / Events"
- Źródło: `event_registrations`.
- Kolumny: Data, Event, Imię, Email, Firma, Link.
- Link: `/pl/events/:event_slug` (lub inny locale, jeśli dostępny).

d) Wspólne funkcje dla wszystkich sekcji
- Wyszukiwarka po emailu / firmie / imieniu (globalna, filtruje wszystkie sekcje).
- Sortowanie po dacie (domyślnie najnowsze na górze).
- Eksport CSV (globalny lub per sekcja) — przycisk „Eksportuj CSV".
- Paginacja lub „Pokaż więcej" jeśli lista > 50 pozycji.

4. Ulepszenie zapisu źródła dla quizu
Plik źródłowy: formularz quizu (`src/pages/formularz/FormularzPage.tsx` lub podobny)
- Dodać `source_url` do insertu w tabelę `submissions` (z `window.location.href`), aby przyszłe quiz-leady miały dokładny link.
- Opcjonalnie dodać `language`/`locale` do tabeli, jeśli brak.
- Wymaga migracji dodającej kolumnę `source_url` do `public.submissions` (z RLS / GRANT).

5. Ulepszenie linków dla event_registrations
Pliki: formularze eventów (`src/components/events/EventRegistrationForm.tsx`, `CycleRegistrationForm.tsx`)
- Dodać `source_url` do insertu w `event_registrations`, aby link w panelu leadów wskazywał dokładną stronę, z której zapisano się na webinar/szkolenie.
- Alternatywnie: wykorzystać `event_slug` i zbudować link `/events/:event_slug`.

6. Style i spójność
- Użyć istniejących komponentów: `Card`, `Table`, `Badge`, `Button`, `Input`, `Select`.
- Spójne z obecnym adminem (ciemne / jasne motywy, odstępy, typografia).
- Linki jako `ExternalLink` (lub `<a>`) z otwieraniem w nowej karcie, z ikonką.

7. Testy / weryfikacja
- Sprawdzenie, że zakładka pojawia się w menu bocznym.
- Weryfikacja, że dane ładują się poprawnie i liczby się zgadzają.
- Sprawdzenie linków do podstron (czy nie prowadzą do błędnych adresów).
- Weryfikacja eksportu CSV.

Kolejność prac:
1. Migracja: dodać `source_url` do `submissions` (opcjonalnie do `event_registrations`).
2. Zaktualizować formularze quizu/eventów, żeby zapisywały `source_url`.
3. Stworzyć komponent `Leads.tsx` z sekcjami i KPI.
4. Dodać trasę i pozycję w menu.
5. Przetestować build i poprawność danych.

Oczekiwany efekt końcowy:
Admin ma jedną zakładkę „Leads", w której na pierwszy rzut oka widać, ile leadów przyszło z każdej części strony, i może kliknąć link do podstrony, by zobaczyć kontekst formularza.