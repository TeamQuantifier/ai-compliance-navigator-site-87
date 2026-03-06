

## Plan: Bezpośrednia integracja z ClickMeeting API — rejestracja jednym formularzem

### Problem
Obecnie użytkownik musi wypełnić nasz formularz, a potem osobno rejestrować się przez embed ClickMeeting. To podwójna praca i słabe UX.

### Rozwiązanie
Użyć **ClickMeeting REST API** do automatycznej rejestracji uczestnika w momencie wysłania naszego formularza. Jedno kliknięcie = zapis do naszej bazy (Supabase) + rejestracja w ClickMeeting. Embed ClickMeeting zostaje usunięty.

ClickMeeting API endpoint:
```
POST https://api.clickmeeting.com/v1/conferences/<room_id>/registration
X-Api-Key: CLICKMEETING_API_KEY
Body: { "registration": { "1": "Jan", "2": "-", "3": "jan@firma.com" } }
```

### Co potrzebuję od Ciebie

1. **Klucz API ClickMeeting** — znajdziesz go w panelu ClickMeeting: Ustawienia konta → Integracje → API. Poproszę Cię o podanie go jako secret.

2. **Room ID** każdego webinaru — embed ID (np. `1726065199726774`) to nie to samo co `room_id` potrzebny do API. Room ID to liczba widoczna w panelu ClickMeeting (szczegóły eventu) lub można go pobrać z API `GET /v1/conferences/active`. Mogę zbudować edge function do pobrania listy konferencji, albo podasz mi room_id ręcznie.

### Zmiany techniczne

**1. Edge function `supabase/functions/clickmeeting-register/index.ts`**
- Przyjmuje: `{ firstName, email, roomId }`
- Wysyła POST do ClickMeeting API z kluczem API (secret)
- Zwraca URL do webinaru (ClickMeeting zwraca `url` w odpowiedzi)
- CORS headers dla frontend

**2. `src/data/eventsData.ts`**
- Zamiana `clickMeetingEmbedId` na `clickMeetingRoomId` (number/string)
- Mapowanie 4 webinarów na ich room_id

**3. `src/components/events/EventRegistrationForm.tsx`**
- Po udanym insercie do Supabase, wywołanie edge function `clickmeeting-register`
- Jeśli ClickMeeting zwróci URL — pokazanie go na ekranie sukcesu jako "Dołącz do webinaru"
- Usunięcie embeda ClickMeeting z ekranu sukcesu

**4. `src/components/events/ClickMeetingEmbed.tsx`**
- Komponent do usunięcia (nie będzie już potrzebny)

**5. Ekran sukcesu**
- "Gotowe! Zostałeś zarejestrowany na webinar."
- Link/przycisk "Dołącz do webinaru na ClickMeeting" (URL z API response)
- Info: "Webinar odbędzie się na platformie ClickMeeting. Link do pokoju został wysłany na Twój e-mail."
- Kalendarz (Google/Outlook) — jak teraz

### Kolejność implementacji
1. Dodanie secretu `CLICKMEETING_API_KEY`
2. Edge function do rejestracji
3. Pobranie room_id (przez edge function lub ręcznie)
4. Aktualizacja formularza i danych eventów
5. Usunięcie embeda

### Pytanie do Ciebie
Czy masz dostęp do panelu ClickMeeting, żeby:
- Skopiować **API Key** (Ustawienia → API)?
- Podać **room_id** 4 webinarów (albo pozwolić mi je pobrać automatycznie przez API)?

