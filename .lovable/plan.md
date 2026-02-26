

## Plan: Localize EventsHub copy (PL/EN/CZ), update content, add FAQ section

This is a large content and localization update to the `/events` page. The page currently has all text hardcoded in Polish. The plan updates it to use the `useTranslation` hook with locale-specific content, replaces the copy with the new provided text, updates the 4 webinar descriptions in the event data, and adds a FAQ section with 10 questions at the bottom with proper FAQPage JSON-LD schema for SEO.

---

### File Changes

#### 1. Translation files (6 files)

Add an `eventsHub` key block to all 6 translation files (`public/locales/pl/translation.json`, `public/locales/en/translation.json`, `public/locales/cs/translation.json`, `src/i18n/locales/pl.json`, `src/i18n/locales/en.json`). Each block will contain:

- `pageTitle`, `pageDescription` (meta SEO)
- `breadcrumbHome`, `breadcrumbEvents`
- `cycleLabel` ("Bezpłatny cykl webinarów" / "Free webinar series" / "Bezplatný cyklus webinářů")
- `heroTitle` ("Cyberbezpieczeństwo, NIS2 i ISO 27001 zmieniają zasady gry." / EN / CS equivalents)
- `heroSubtitle` ("Czy Twoja organizacja jest gotowa...")
- `introText` (the long paragraph about NIS2 signing, board responsibility, market standards, cycle description, format)
- `bulletBoard`, `bulletOrg`, `bulletMarket` (the 3 bullet points)
- `formatDescription` (the "Format: Każde spotkanie..." paragraph)
- `webinar1` through `webinar4` titles and bullet point outcomes (to display in the grid section)
- `closingText` ("Cztery spotkania zostały zaprojektowane...")
- `faqTitle` ("FAQ — Najczęstsze pytania zarządów i managerów")
- `faq1q` through `faq10q` and `faq1a` through `faq10a` (10 FAQ items)
- `lastUpdated` label

**PL**: Direct from provided copy.
**EN**: Professional English translation of all content.
**CS**: Professional Czech translation of all content.

#### 2. `src/pages/events/EventsHub.tsx`

Major rewrite:
- Import `useTranslation` from `react-i18next` and `FAQSection` from `@/components/seo/FAQSection`
- Replace all hardcoded Polish text with `t('eventsHub.xxx')` calls
- **Hero section**: Update H1 to the new title, add subtitle as H2, keep banner image
- **Intro section**: Replace the current 2-paragraph SEO block with the new structured content:
  - Opening paragraphs about NIS2 signing
  - 3 bullet points (zarząd, organizacja, rynek)
  - Paragraph about pressure and governance
  - Cycle announcement paragraph
  - Format description
- **Webinar highlights section** (new): A compact section showing the 4 webinar dates, titles, and key questions as a visual timeline/list between intro and event grid
- **Event grid**: Keep as-is (EventCard components)
- **Closing text**: Add the "Cztery spotkania..." paragraph after the grid
- **FAQ section**: Add `FAQSection` component at the bottom with 10 localized FAQ items and proper `pageUrl` for JSON-LD schema
- **SEO meta**: Localize `title` and `description` props passed to `PageTemplate`

#### 3. `src/data/eventsData.ts`

Update the 4 event titles and subtitles to match the new copy:
- Event 1: "Nowa rzeczywistość: geopolityka, rynek i konsekwencje regulacyjne"
- Event 2: "Wdrożenie, które działa: continuous compliance"
- Event 3: "Dokumenty, dowody i wymagania rynkowe"
- Event 4: "Kontrola, raportowanie i weryfikacja"

Update outcomes for each event to match the new bullet questions provided in the copy.

---

### SEO Considerations

- **FAQPage JSON-LD**: The existing `FAQSection` component already generates the correct `FAQPage` structured data schema with `Question` and `Answer` entities. This will be indexed by Google.
- **Hreflang**: `PageTemplate` already handles hreflang tags for all 3 locales.
- **Heading hierarchy**: H1 for main title, H2 for section headings (intro, FAQ), H3 for individual webinar titles in the highlights section.
- **Canonical URL**: Handled by `PageTemplate` with trailing slash.
- **Meta title/description**: Localized per language, under 60/160 char limits.
- **`pageUrl`** for FAQ schema: Will use `https://quantifier.ai/{locale}/events/` to match the canonical URL pattern.

---

### Technical Details

The FAQ data will be constructed inline in `EventsHub.tsx` from translation keys rather than stored in `eventsData.ts`, since it's page-level (not event-level) content:

```tsx
const faqs = Array.from({ length: 10 }, (_, i) => ({
  question: t(`eventsHub.faq${i + 1}q`),
  answer: t(`eventsHub.faq${i + 1}a`),
}));
```

The webinar highlights section will render a compact list with date badges and key questions for each webinar, providing a scannable overview before the detailed event cards.

