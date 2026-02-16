

# Aktualizacja przestarzalych dat NIS2 (2024 -> 2026)

## Problem

Na stronie NIS2 w kilku miejscach widnieje "Oct 2024 / Compliance Deadline" oraz FAQ z wzmianka o "October 17, 2024". Mamy 2026 rok — te informacje sa nieaktualne i psuja wrazenie swiezosci strony.

## Znalezione wystapienia

| Plik | Miejsce | Obecna tresc |
|------|---------|-------------|
| `src/i18n/locales/en.json` (linia 3778) | Stats card | "Oct 2024" / "Compliance Deadline" |
| `src/i18n/locales/en.json` (linia 3819) | FAQ | "had until October 17, 2024..." |
| `src/i18n/locales/pl.json` (linia 3602) | Stats card | "Paz 2024" / "Termin zgodnosci" |
| `src/i18n/locales/pl.json` (linia 3643) | FAQ | "do 17 pazdziernika 2024..." |
| `public/locales/en/translation.json` (linia 4146) | FAQ | "had until October 17, 2024..." |
| `public/locales/pl/translation.json` (linia 3970) | FAQ | "do 17 pazdziernika 2024..." |

Wersja czeska (cs) — brak problemow.

## Planowane zmiany

### 1. Stats cards (src/i18n/locales/)

**EN**: "Oct 2024" / "Compliance Deadline" zmieni sie na:
- stat: **"2025-2026"**
- title: **"Enforcement Underway"**
- description: **"National NIS2 laws are now active across the EU — organizations must comply or face penalties."**

**PL**: "Paz 2024" / "Termin zgodnosci" zmieni sie na:
- stat: **"2025-2026"**
- title: **"Egzekwowanie trwa"**
- description: **"Krajowe przepisy NIS2 sa juz aktywne w calej UE — organizacje musza byc zgodne lub groza im kary."**

### 2. FAQ (src/i18n/locales/)

**EN**: Zmiana odpowiedzi na pytanie "What's the NIS2 compliance deadline?":
- **"The NIS2 transposition deadline passed in October 2024. As of 2026, national enforcement is fully active across EU member states — organizations in scope must be compliant now or risk fines up to EUR10M or 2% of global turnover."**

**PL**: Zmiana odpowiedzi na pytanie "Jaki jest termin zgodnosci z NIS2?":
- **"Termin transpozycji NIS2 minal w pazdzierniku 2024. W 2026 roku egzekwowanie przepisow krajowych jest w pelni aktywne — organizacje objete zakresem musza byc zgodne lub groza im kary do 10 mln EUR lub 2% globalnego obrotu."**

### 3. FAQ (public/locales/)

Te same zmiany co wyzej — oba systemy tlumaczen musza byc spojne.

## Podsumowanie

6 edycji w 4 plikach. Zadnych zmian strukturalnych — tylko aktualizacja tresci.

