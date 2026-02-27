

## Plan: Internationalize all event detail pages (EN, PL, CS)

### Problem
All webinar detail page content is hardcoded in Polish in `eventsData.ts`. When visiting `/en/events/nis2-mapa-ryzyka`, everything displays in Polish because no translation mechanism is used.

### Scope
**6 files to edit, 3 translation files to extend with ~400 new keys each.**

---

### Architecture Decision

Use translation keys per webinar in the existing `public/locales/{lang}/translation.json` files under a new `eventDetail` namespace. Components will receive the current `t()` function and resolve content at render time.

Key structure:
```
eventDetail.outcomesTitle / agendaTitle / audienceTitle / faqTitle / ...
eventDetail.crossLinkNis2 / crossLinkFrameworks / ...
eventDetail.form.title / form.email / form.company / ...
eventDetail.bottomCta.title / subtitle / button

eventDetail.nis2MapaRyzyka.title / subtitle / trustLine / ...
eventDetail.nis2MapaRyzyka.outcome1 / outcome2 / ...
eventDetail.nis2MapaRyzyka.agenda1Title / agenda1Desc / ...
eventDetail.nis2MapaRyzyka.audience1Role / audience1Pain1 / ...
eventDetail.nis2MapaRyzyka.faq1q / faq1a / ...
eventDetail.nis2MapaRyzyka.seoTitle / seoDesc

(same for nis2RoleIProcesy, nis2AuditReady, nis2KontrolaAudyt)
```

---

### Step 1: Add translation keys to all 3 locale files

**Files:** `public/locales/pl/translation.json`, `public/locales/en/translation.json`, `public/locales/cs/translation.json`

Add `eventDetail` object with:
- **Shared UI strings** (~25 keys): section headings, form labels, validation messages, button text, breadcrumb labels
- **Per-webinar content** (~45 keys × 4 webinars = ~180 keys): title, subtitle, trustLine, dateDisplay, duration, location, heroCtaLabel, heroSecondaryText, outcomes, agenda items (time+title+desc), audience cards (role+pains+outcomes), FAQs (question+answer), SEO (metaTitle+metaDescription)

PL file: use existing Polish content from `eventsData.ts`
EN file: full English translations
CS file: full Czech translations

### Step 2: Create locale-aware event resolver

**New file:** `src/hooks/useLocalizedEvent.ts`

A hook that takes the event slug and returns the event data with all string fields resolved via `t()`:
```typescript
const useLocalizedEvent = (slug: string) => {
  const { t } = useTranslation();
  const baseEvent = getEventBySlug(slug);
  if (!baseEvent) return null;
  
  const key = slugToKey(slug); // 'nis2-mapa-ryzyka' → 'nis2MapaRyzyka'
  return {
    ...baseEvent,
    title: t(`eventDetail.${key}.title`),
    subtitle: t(`eventDetail.${key}.subtitle`),
    // ... all fields resolved via t()
  };
};
```

### Step 3: Update EventDetail.tsx

- Use `useLocalizedEvent(slug)` instead of `getEventBySlug(slug)`
- Replace all hardcoded Polish UI strings with `t()` calls:
  - "Co zyskasz?" → `t('eventDetail.outcomesTitle')`
  - "Najczęściej zadawane pytania" → `t('eventDetail.faqTitle')`
  - "Dowiedz się więcej o..." → `t('eventDetail.crossLinkText')`
  - Breadcrumb "Home" / "Events" → `t('eventDetail.breadcrumbHome')` / `t('eventDetail.breadcrumbEvents')`

### Step 4: Update EventAgenda.tsx

- Replace "Agenda" heading with `t('eventDetail.agendaTitle')`
- Agenda item content already comes from the localized event data

### Step 5: Update EventAudienceCards.tsx

- Replace "Dla kogo jest ten webinar?" → `t('eventDetail.audienceTitle')`
- Replace "Wyzwania" → `t('eventDetail.challengesLabel')`
- Replace "Efekty" → `t('eventDetail.outcomesLabel')`

### Step 6: Update EventBottomCTA.tsx

- Replace "Nie przegap — zarezerwuj miejsce" → `t('eventDetail.bottomCta.title')`
- Replace "Bonusy dostępne..." → `t('eventDetail.bottomCta.subtitle')`
- Replace "Zarezerwuj miejsce" button → `t('eventDetail.bottomCta.button')`

### Step 7: Update EventRegistrationForm.tsx

- Replace all Polish labels: "Zarezerwuj miejsce", "Imię", "Służbowy e-mail", "Firma", "Stanowisko", "Wielkość firmy", "Czy Twoja organizacja może podlegać NIS2?", radio options, consent text, success/error messages
- Update validation error messages via `t()` in the zod schema (or use `t()` at display time)

### Step 8: Fix webinar4 title in EN translation

- Change `"webinar4title": "Audit, reporting and verification"` → `"Inspection, reporting and verification"` (NIS2 has inspections, not audits)

---

### Summary of files changed

| File | Change |
|------|--------|
| `public/locales/pl/translation.json` | +~200 keys (eventDetail namespace) |
| `public/locales/en/translation.json` | +~200 keys (eventDetail namespace) |
| `public/locales/cs/translation.json` | +~200 keys (eventDetail namespace) |
| `src/hooks/useLocalizedEvent.ts` | NEW — locale-aware event data resolver |
| `src/pages/events/EventDetail.tsx` | Use `useLocalizedEvent`, replace hardcoded Polish |
| `src/components/events/EventAgenda.tsx` | Replace Polish heading with `t()` |
| `src/components/events/EventAudienceCards.tsx` | Replace Polish headings with `t()` |
| `src/components/events/EventBottomCTA.tsx` | Replace Polish text with `t()` |
| `src/components/events/EventRegistrationForm.tsx` | Replace all Polish labels with `t()` |
| `src/components/events/EventHero.tsx` | No change needed (already uses event data props) |

