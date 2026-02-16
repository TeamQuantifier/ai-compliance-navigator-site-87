

# Przeniesienie danych kontaktowych pod formularz

## Co sie zmieni

W pliku `src/pages/Contact.tsx`:

1. **Wyciecie** bloku z danymi kontaktowymi (Email Us, Call Us, Visit Our Offices) z lewej kolumny (linie 142-174) oraz ikon social (linie 176-183)
2. **Wklejenie** tego bloku w prawej kolumnie, pod Card z formularzem (po linii 275)

## Efekt koncowy

- **Lewa kolumna**: heading + tekst opisowy + features list + summary + CTA (bez danych kontaktowych)
- **Prawa kolumna**: formularz kontaktowy (Card) + dane kontaktowe (Email, Phone, Address) + ikony social

## Szczegoly techniczne

Plik: `src/pages/Contact.tsx`

- Usuniecie linii 142-183 (blok `space-y-6 mb-8` z danymi kontaktowymi + `flex space-x-4` z ikonami social)
- Dodanie tych samych elementow po zamknieciu `</Card>` (linia 275), wewnatrz prawej kolumny `<div>` (linia 186)
- Drobna zmiana: `mb-8` na `mt-6` zeby odstep byl od gory (pod formularzem), nie od dolu

Zadne zmiany w plikach tlumaczen -- klucze pozostaja te same.
