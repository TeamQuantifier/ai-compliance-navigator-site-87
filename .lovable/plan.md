

# Naprawa bledu 5xx dla /en/legal/privacy w Google Search Console

## Przyczyna problemu

Funkcja backend `prerender-marketing` **nie jest wdrozona** (deployed). Kiedy Googlebot odwiedza `/en/legal/privacy`, Vercel przekierowuje zapytanie do tej funkcji, ale ona nie istnieje na serwerze -- stad blad 5xx.

Pozostale funkcje (`prerender-post`, `prerender-story`, `sitemap`) dzialaja poprawnie.

## Problem dotyczy WSZYSTKICH stron marketingowych

Ten blad dotyczy nie tylko `/legal/privacy`, ale **kazdej strony** obslugiwanej przez `prerender-marketing`, w tym:
- Strona glowna (`/en/`, `/pl/`, `/cs/`)
- Wszystkie strony frameworkow (`/frameworks/*`)
- Wszystkie strony produktowe (`/product/*`)
- Strony prawne (`/legal/*`)
- About, Contact, Plans, Partners, Blog listing, Success Stories, By-roles

## Plan naprawy

### Krok 1: Wdrozenie funkcji prerender-marketing

Wdrozyc (deploy) funkcje `prerender-marketing` na serwer. Kod juz istnieje i jest kompletny -- wystarczy go wdrozyc.

### Krok 2: Weryfikacja

Po wdrozeniu przetestowac funkcje, wywolujac ja z parametrami:
- `?locale=en&page=legal-privacy`
- `?locale=pl&page=index`
- `?locale=en&page=plans`

Upewnic sie, ze zwraca poprawny HTML z kodem 200.

## Szczegoly techniczne

Jedyna wymagana akcja to deploy edge function `prerender-marketing`. Nie sa potrzebne zadne zmiany w kodzie -- funkcja ma juz pelna obsluge stron prawnych (legal-privacy, legal-terms, legal-cookies) we wszystkich trzech jezykach (en, pl, cs).

Po wdrozeniu Google powinien moc poprawnie zaindeksowac strone przy nastepnym skanowaniu.

