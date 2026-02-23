

# Usunięcie custom bot-prerender na rzecz Netlify Prerender Extension

## Problem

Custom edge function `bot-prerender.ts` przechwytuje WSZYSTKIE requesty botów (Googlebot, Bingbot itd.) i proxuje je do Supabase. Netlify Prerender Extension jest zainstalowany, ale nigdy nie dostaje ruchu — custom function dziala pierwsza i "kradnie" requesty.

Gdy Supabase zawodzi (timeout, 5xx), bot dostaje okrojony fallback HTML (~10 linii tekstu) ktory Google traktuje jako thin content i odrzuca indeksowanie.

```text
Obecny flow (zepsuty):
Googlebot --> bot-prerender.ts (edge function) --> Supabase proxy --> fallback HTML
                                                   ^^ zawodne

Docelowy flow:
Googlebot --> Netlify Prerender Extension --> Headless Chromium --> pelna strona SPA
                                              ^^ niezawodne, renderuje dokladnie to co widzi uzytkownik
```

## Zmiany

| Plik | Zmiana |
|---|---|
| `netlify/edge-functions/bot-prerender.ts` | Usunac caly plik |
| `netlify.toml` (linie 10-44) | Usunac wszystkie bloki `[[edge_functions]]` |

Redirecty 301 i SPA fallback w `netlify.toml` pozostaja bez zmian.

Supabase prerender functions (prerender-marketing, prerender-post, prerender-story) mozna zachowac — bez edge function nikt ich nie wywoluje, wiec nie koliduja. Mozna je usunac pozniej.

## Po wdrozeniu

1. Zrobic redeploy na Netlify
2. Sprawdzic w Netlify dashboard (Extensions > Prerender > logs) czy requesty botow sa teraz obslugiwane przez extension
3. W Google Search Console uzyc URL Inspection na kilku problematycznych URLach i poprosic o ponowne indeksowanie
4. Odczekac 2-3 dni na wyniki

