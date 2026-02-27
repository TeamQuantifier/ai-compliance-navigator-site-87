

## Plan: Update event dates styling + fix agendas for webinar 1 & 2

### 1. Make date more prominent on event detail pages
**File:** `src/components/events/EventHero.tsx`
- Increase the date font size from `text-sm` to `text-base md:text-lg`
- Make it `font-semibold` and `text-foreground` instead of `text-muted-foreground`
- Add a subtle background pill/badge style to make it stand out

### 2. Update agenda for webinar 1 (`nis2-mapa-ryzyka`)
**File:** `src/data/eventsData.ts` (lines 77-83)
Replace current agenda with:
- 0–5 min: Kontekst: cyberbezpieczeństwo, NIS2, ISO 27001 / Kogo dotyczy, co się zmieniło, dlaczego teraz
- 5–12 min: Nowe obowiązki zarządu / Odpowiedzialność zarządu w kontekście nowej unijnej dyrektywy NIS2
- 12–20 min: Główne wymagania regulacyjne / Raportowanie incydentów 24h/72h, rejestr ryzyk, szkolenia dla pracowników
- 20–25 min: Wymagania wobec łańcucha dostaw / Audyt dostawców, nowe klauzule w umowach
- 25–30 min: Podejście continuous compliance / Ciągłe monitorowanie ryzyk i zdarzeń w przedsiębiorstwie
- 30+ min: Q&A / Pytania uczestników i podsumowanie

### 3. Update agenda for webinar 2 (`nis2-role-i-procesy`)
**File:** `src/data/eventsData.ts` (lines 138-144)
Replace current agenda with:
- 0–8 min: Kluczowe procesy i obowiązki / Czym trzeba się zająć, wdrażając NIS2
- 8–16 min: Kluczowe role w cyberbezpieczeństwie, NIS2, ISO 27001 / Zarząd, CISO, IT, compliance, HR, dostawcy
- 16–25 min: Matryca odpowiedzialności RACI / Jak zoperacjonalizować wdrożenie NIS2, ISO 27001 w spółce
- 25–30 min: Podejście continuous compliance | Quantifier.ai / Nowoczesne wdrożenie regulacji i ciągłe monitorowanie ryzyk
- 30+ min: Q&A / Pytania uczestników i podsumowanie

