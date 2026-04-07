

# Analiza błędu GSC: "Alternatywna strona zawierająca prawidłowy tag strony kanonicznej"

## Diagnoza

Ten komunikat GSC **NIE jest błędem** — to status informacyjny. Oznacza, że Google znalazł stronę, rozpoznał jej tag canonical wskazujący na inny URL i poprawnie wybrał wersję kanoniczną do indeksowania. Strony z tym statusem **nie powinny** być indeksowane osobno — to oczekiwane zachowanie.

### Przyczyna dla każdego URL:

| URL z GSC (nieindeksowany) | Canonical wskazuje na | Powód |
|---|---|---|
| `/en/blog` (bez slash) | `/en/blog/` (z slash) | Trailing slash — poprawne |
| `/en/partners` | `/en/partners/` | Trailing slash — poprawne |
| `/cs/frameworks/governance` | `/cs/frameworks/governance/` | Trailing slash — poprawne |
| `/en/product` | `/en/product/` | Trailing slash — poprawne |
| `/pl` | `/pl/` | Trailing slash — poprawne |
| `/en` | `/en/` | Trailing slash — poprawne |
| `/en/frameworks/environmental` | `/en/frameworks/environmental/` | Trailing slash — poprawne |
| `/en/frameworks/nis-ii` | `/en/frameworks/nis-2/` | 301 redirect + canonical — poprawne |
| `/blog` (bez locale) | `/en/blog/` | 301 redirect — poprawne |
| `/by-roles` (bez locale) | `/en/by-roles/` | 301 redirect — poprawne |

### Wnioski

1. **Trailing slash** — 7 z 10 URL-i to wersje bez trailing slash. Canonical wskazuje na wersję z `/` — Google respektuje to poprawnie.
2. **Stare URL-e** — `/en/frameworks/nis-ii` jest przekierowany 301 na `/nis-2/` — poprawne.
3. **Brak locale** — `/blog` i `/by-roles` przekierowują 301 na `/en/blog/` i `/en/by-roles/` — poprawne.

## Co zrobić?

**Nic nie trzeba naprawiać.** To prawidłowe zachowanie SEO:
- Google widzi duplikat (np. `/en/blog` bez slash)
- Znajduje canonical wskazujący na `/en/blog/`
- Indeksuje tylko wersję kanoniczną
- Raportuje duplikat jako "Alternatywna strona z prawidłowym canonical"

### Jedyna opcjonalna optymalizacja

Aby zmniejszyć liczbę tych raportów w GSC (czysto kosmetycznie), można dodać wymuszony redirect 301 z wersji bez trailing slash na wersję z trailing slash w `netlify.toml`. Np.:

```text
/en/blog → 301 → /en/blog/
/en/partners → 301 → /en/partners/
/pl → 301 → /pl/
```

To sprawi, że Google przestanie crawlować wersje bez slash i raporty znikną z GSC. Ale **nie wpływa to na indeksację** — wersje kanoniczne już są poprawnie indeksowane.

### Weryfikacja

Sprawdź w GSC zakładkę "Strony" → filtr "Prawidłowe" — Twoje strony kanoniczne (z trailing slash) powinny tam być jako zaindeksowane.

