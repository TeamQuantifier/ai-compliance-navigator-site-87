

## Plan: SEO-First Events Section Rebuild

### Current State
- Events routing already exists: `/:locale/events` (hub) and `/:locale/events/:slug` (detail) — works for EN, PL, CS automatically.
- One event exists in `eventsData.ts` (`nis2-w-polsce`). Components exist: EventCard, EventHero, EventAgenda, EventAudienceCards, EventSpeakerCard, EventBonusMaterials, EventBottomCTA, EventRegistrationForm.
- EventDetail already has Event/BreadcrumbList/FAQPage JSON-LD, registration form with UTM capture, calendar links.

### Changes Required

#### 1. `src/data/eventsData.ts` — Replace with 4 new events
- Remove existing `nis2-w-polsce` event.
- Add 4 events with exact titles, slugs, dates (year 2026), and `imageUrl` field (placeholder string per event).
- Each event gets unique SEO metadata, 5 outcomes, 6-item agenda (45 min), 3 audience cards, bonus materials, 5 FAQs, speaker placeholder.
- Add `imageUrl` field to `EventData` interface.

#### 2. `src/pages/events/EventsHub.tsx` — Grid layout + SEO content
- 2-column grid of EventCards (chronological).
- Add SEO text block (150-250 words) targeting NIS2/KSC/compliance keywords.
- Proper H1, meta tags, breadcrumbs.

#### 3. `src/components/events/EventCard.tsx` — Cover image + redesign
- Add 1:1 cover image with descriptive alt text.
- Show date/time, 2 outcomes, tags, CTA button.
- Brand color accents.

#### 4. `src/pages/events/EventDetail.tsx` — Hero split layout
- Hero: left = 1:1 cover image, right = sticky registration form (desktop).
- Remove old hero component usage, integrate image directly.
- Update breadcrumb to use event title dynamically.
- Add `prerenderReady` hook call.
- Update SEGMENT_PARENT_MAP entries for all 4 new slugs.

#### 5. `src/components/events/EventHero.tsx` — Update for image layout
- Accept `imageUrl` and render cover image with alt text.
- Remove mobile CTA (handled by form placement).

#### 6. `src/components/PageTemplate.tsx` — Add new slugs to maps
- Add all 4 event slugs to `SEGMENT_NAME_MAP` and `SEGMENT_PARENT_MAP`.

### Technical Details

**New `EventData` fields:**
```typescript
imageUrl: string;  // placeholder like '{image_url_1}'
imageAlt: string;  // descriptive SEO alt text
```

**4 Events data structure:**
1. `nis2-mapa-ryzyka` — "Nowa mapa ryzyka: NIS2 i realne obowiązki" — 10.03.2026 10:00
2. `nis2-role-i-procesy` — "System, który działa: role i procesy (NIS2/ISO)" — 24.03.2026 10:00
3. `nis2-audit-ready` — "Audit-ready: dokumenty i dowody zgodności (NIS2)" — 14.04.2026 10:00
4. `nis2-kontrola-audyt` — "Kontrola NIS2: jak przejść audyt od A do Z" — 28.04.2026 10:00

**Hub layout:** Responsive grid (1 col mobile, 2 col desktop) with EventCards. Each card: image top, content below, CTA at bottom.

**Detail layout:** `lg:flex` — left 55% (image + content sections), right 45% (sticky form). Mobile: image → form → content.

**SEO per detail page:** Unique `<title>`, `<meta description>`, canonical, OG/Twitter, Event + BreadcrumbList + FAQPage JSON-LD schemas. `og:locale` adapts to current locale.

**Files to create:** None (all components exist).

**Files to edit:**
- `src/data/eventsData.ts` — full rewrite with 4 events + new fields
- `src/pages/events/EventsHub.tsx` — grid + SEO block
- `src/components/events/EventCard.tsx` — add image, redesign
- `src/pages/events/EventDetail.tsx` — hero split with image, prerenderReady
- `src/components/events/EventHero.tsx` — image support
- `src/components/PageTemplate.tsx` — slug mappings

