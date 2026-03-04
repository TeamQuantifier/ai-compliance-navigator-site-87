

## Plan: Formularz zapisu na cały cykl webinarów

### Opis sekcji

Pod siatką z kartami 4 webinarów (a przed "Closing text") pojawi się wyróżniona sekcja z formularzem "Zapisz się na cały cykl". Formularz pozwala jednym kliknięciem zarejestrować się na wszystkie 4 webinary naraz.

### Wygląd sekcji

- Gradient border card (violet-to-blue, spójny z designem kart webinarów)
- Nagłówek: "Zapisz się na cały cykl" + krótki opis korzyści
- Formularz w układzie 2-kolumnowym (desktop), 1-kolumnowym (mobile)
- Pola identyczne jak w istniejącym `EventRegistrationForm`: imię, email służbowy, firma, rola, wielkość firmy, NIS2 qualifier, zgoda RODO
- Przycisk CTA: "Zapisz się na 4 webinary"
- Po sukcesie: komunikat potwierdzający + dodaj do kalendarza (opcjonalnie)

### Implementacja

**Nowy komponent: `src/components/events/CycleRegistrationForm.tsx`**
- Reużywa ten sam schemat walidacji zod co `EventRegistrationForm`
- Na submit: wstawia 4 rekordy do `event_registrations` (po jednym na każdy webinar) w jednym batchu
- Każdy rekord ma odpowiedni `event_slug` i `event_title` (pobrane z tablicy `events`)
- UTM params przechwytywane identycznie
- Stan sukcesu z linkami do kalendarza dla całego cyklu

**Modyfikacja: `src/pages/events/EventsHub.tsx`**
- Import i renderowanie `CycleRegistrationForm` między siatką eventów a closing text

**Tłumaczenia: `public/locales/[pl/en/cs]/translation.json`**
- Nowe klucze: `eventsHub.cycleFormTitle`, `cycleFormSubtitle`, `cycleFormSubmit`, `cycleFormSuccess` itd.

### Baza danych

Brak zmian w schemacie -- istniejąca tabela `event_registrations` z RLS (anon INSERT) jest wystarczająca. Formularz po prostu wstawi 4 rekordy zamiast 1.

### Pliki do zmiany/utworzenia

1. **Nowy** `src/components/events/CycleRegistrationForm.tsx` -- formularz z walidacją i batch insertem
2. **Edycja** `src/pages/events/EventsHub.tsx` -- dodanie sekcji z formularzem
3. **Edycja** `public/locales/pl/translation.json` -- polskie tłumaczenia
4. **Edycja** `public/locales/en/translation.json` -- angielskie tłumaczenia
5. **Edycja** `public/locales/cs/translation.json` -- czeskie tłumaczenia

