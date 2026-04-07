

# Plan: Przebudowa strony szkolenia Cybersecurity (NIS2 + ISO 27001)

## Co robimy

Kompletna przebudowa strony `/szkolenie-cyberbezpieczenstwo-nis2-iso27001` z placeholderów na pełną, konwertującą stronę opartą o rzeczywistą agendę 5-blokową (09:00–17:00). Gradient slate→blue, nowoczesny design, zero pustych pól.

## Struktura strony (nowa)

```text
1. HERO (gradient slate-900 → blue-900)
   - Badge: "Szkolenie 1-dniowe · 8h intensywnego programu"
   - H1: "NIS2 + ISO 27001: Szkolenie dla firm"
   - Subtitle: konkretny opis wartości
   - Stats: 5 bloków agendy | 8h | NIS2+ISO 27001+DORA | Warsztat + roadmapa
   - CTA: "Zamów szkolenie dla zespołu"

2. PROBLEM SECTION (jasne tło)
   - "Dlaczego teraz?" — 3 karty z konkretnymi danymi:
     · NIS2/KSC: 6 mies. na samoidentyfikację, 12 mies. na wdrożenie
     · Kary do 10 mln EUR / 2% obrotu
     · Odpowiedzialność osobista zarządu (art. 20 NIS2)

3. AGENDA (5 bloków — timeline/accordion)
   - Blok 1: Wprowadzenie i kontekst (09:00–10:30)
   - Blok 2: Ryzyka, incydenty i procesy (10:45–12:30)
   - Blok 3: Środki techniczno-organizacyjne (13:15–15:00)
   - Blok 4: Łańcuch dostaw, zarząd i governance (15:15–16:30)
   - Blok 5: Warsztat "Co robimy od jutra?" (16:30–17:00)
   Każdy blok z ikoną, zakresem godzinowym, listą tematów

4. CO WYNIESIESZ (benefits — 2-kolumnowy grid)
   - 8 konkretnych korzyści z checkmarkami
   - Np. "Gotowy rejestr ryzyk", "Procedura incydentów", 
     "Roadmapa 3-6-12 mies.", "Quick wins na poniedziałek"

5. DLA KOGO (audience cards — 4 kolumny)
   - Zarząd / C-level
   - CISO / Pełnomocnik ds. cyber
   - Zespoły IT / Security
   - Compliance / Risk managers
   Z opisem co konkretnie zyskuje każda grupa

6. JAK PRACUJEMY (3 kroki — format)
   - Diagnoza: quiz + mapowanie dojrzałości
   - Szkolenie: 5 bloków merytorycznych
   - Działanie: warsztat + roadmapa + quick wins

7. FAQ (rozbudowane, 7 pytań z JSON-LD)
   - Dla kogo, czas trwania, format, wymagania, 
     certyfikat, cena, customizacja

8. CTA (gradient slate→blue)
   - "Zabezpiecz firmę przed NIS2 — zacznij od szkolenia"
   - Dwa przyciski: "Zamów szkolenie" + "Pobierz agendę PDF"
```

## Pliki do zmiany

1. **`src/pages/services/TrainingCybersecurity.tsx`** — pełna przebudowa komponentu:
   - Nowe sekcje: Problem, Agenda (timeline z 5 blokami), "Jak pracujemy"
   - Usunięcie generycznych 6 modułów → zastąpienie rzeczywistą agendą
   - Nowe ikony: AlertTriangle, Scale, Link2, Zap, ClipboardCheck, Timer
   - Accordion dla bloków agendy (collapsible)

2. **`src/i18n/locales/pl.json`** — pełna wymiana sekcji `trainingCyber`:
   - Nowe klucze: `problem`, `agenda` (5 bloków z topics), `process`, rozbudowane `benefits` (8), `faq` (7 pytań)
   - Cały tekst wypełniony — zero placeholderów
   - SEO meta zaktualizowane pod kątem intencji zakupowej

3. **`src/i18n/locales/en.json`** — angielska wersja sekcji `trainingCyber`:
   - Pełne tłumaczenie wszystkich nowych kluczy
   - Dostosowanie terminologii (NIS2 EU Baseline, nie KSC)

## Kluczowe decyzje

- Agenda jako accordion (Collapsible) — pozwala na skanowanie bez przytłaczania
- Sekcja "Problem" buduje urgency przed agendą
- Sekcja "Jak pracujemy" (3 kroki) pokazuje personalizowane podejście (quiz diagnostyczny na starcie)
- Benefits skupione na deliverables (rejestr ryzyk, roadmapa, procedury) — nie na abstrakcjach
- FAQ rozbudowane o pytania o cenę i format (online/stacjonarnie)

