

## Plan: Przesunięcie dat webinarów o 1 tydzień

Zmiana w jednym pliku: `src/data/eventsData.ts`. Wszystkie daty są zdefiniowane tam i propagują się zarówno na hub `/events` jak i na strony szczegółowe webinarów.

### Nowe daty:
| Webinar | Stara data | Nowa data |
|---------|-----------|-----------|
| 1 — nis2-mapa-ryzyka | 2026-03-10 | **2026-03-17** |
| 2 — nis2-role-i-procesy | 2026-03-24 | **2026-03-31** |
| 3 — nis2-audit-ready | 2026-04-14 | **2026-04-21** |
| 4 — nis2-kontrola-audyt | 2026-04-28 | **2026-05-05** |

### Zmiany w `src/data/eventsData.ts`:
- Zaktualizować pole `date` (ISO string) dla każdego z 4 eventów
- Zaktualizować pole `dateDisplay` (czytelna data po polsku) dla każdego z 4 eventów
- Pola `dateDisplay` na hub `/events` są nadpisywane przez `toLocaleString()` z pola `date`, więc wystarczy zmienić `date`; `dateDisplay` aktualizujemy dla spójności

Nie trzeba zmieniać tłumaczeń — daty webinarów w plikach `translation.json` (`webinar1date`, `webinar2date` itd.) też trzeba zaktualizować.

### Zmiany w plikach tłumaczeń:
- `public/locales/pl/translation.json` — klucze `eventsHub.webinar1date` do `webinar4date`
- `public/locales/en/translation.json` — j.w.
- `public/locales/cs/translation.json` — j.w.

