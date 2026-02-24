

# Events Pages - /events hub + /events/nis2-w-polsce detail

## Overview

Two new SEO-first pages for lead generation around NIS2/KSC webinars. Polish-language content with full JSON-LD structured data (Event, BreadcrumbList, FAQPage), registration form with UTM capture, and sticky form on desktop.

## Architecture

```text
src/
  data/
    eventsData.ts           -- Event data structure + all content
  pages/
    events/
      EventsHub.tsx         -- /events listing page
      EventDetail.tsx       -- /events/:slug detail page
  components/
    events/
      EventCard.tsx         -- Reusable card for hub listing
      EventRegistrationForm.tsx  -- Sticky form with UTM + webhook
      EventHero.tsx         -- Hero section for detail page
      EventAgenda.tsx       -- Timeline agenda
      EventAudienceCards.tsx -- Who should attend cards
      EventSpeakerCard.tsx  -- Speaker bio card
      EventBonusMaterials.tsx -- Sprint Kit section
      EventBottomCTA.tsx    -- Bottom urgency CTA band
```

## File Details

### 1. `src/data/eventsData.ts`

Single source of truth. Each event object contains:
- slug, title, subtitle, date, duration, location, tags
- Outcomes array, agenda timeline array, audience cards array
- Speaker(s) data, bonus materials list
- FAQ array (question/answer pairs)
- SEO fields: metaTitle, metaDescription, ogImage

Easy to add future events by pushing to the array.

### 2. `src/pages/events/EventsHub.tsx`

- Uses `PageTemplate` with title "Webinary i wydarzenia" and proper meta description
- Breadcrumb: Home > Events
- H1: "Webinary i wydarzenia"
- Short intro paragraph
- Featured event card (maps over events array, currently one)
- SEO content section at bottom: H2 "Webinary o NIS2/KSC i cyberbezpieczenstwie" + ~150 words targeting keywords
- "Last updated" timestamp at bottom
- JSON-LD: BreadcrumbList (via PageTemplate)

### 3. `src/pages/events/EventDetail.tsx`

- Uses `PageTemplate` with `noSeo` for custom Helmet
- Custom Helmet with Event schema JSON-LD, BreadcrumbList, FAQPage schema
- Two-column layout on desktop: content (left, ~60%) + sticky registration form (right, ~40%)
- On mobile: form after hero, then content, form repeated at bottom
- Sections in order: Hero, Outcomes, Agenda, Who Should Attend, Speaker(s), Bonus Materials, FAQ (using existing FAQSection component adapted inline), Bottom CTA band
- Internal links: back to /events hub, cross-links to /frameworks/nis-ii
- "Last updated" timestamp

### 4. `src/components/events/EventRegistrationForm.tsx`

- Fields: firstName, workEmail (validated: no gmail/yahoo/hotmail), company, role (dropdown), companySize (dropdown), NIS2 qualifier (radio: Yes/No/Not sure), GDPR consent checkbox
- Hidden fields: UTM params extracted from `window.location.search`
- On submit: POST to `https://example.com/webhook` (placeholder)
- Success state: confirmation + "Add to calendar" buttons (Google Calendar URL, .ics download for Outlook/iCal) + CTA "Umow 20-min NIS2 Gap Call"
- Loading + error states
- `data-cta`, `data-form-submit`, `data-event-name` attributes for tracking
- Zod schema validation
- Desktop: `sticky top-24` positioning

### 5. Route Registration in `src/App.tsx`

Add inside `MainRoutes`:
```
<Route path="/:locale/events" element={<EventsHub />} />
<Route path="/:locale/events/:slug" element={<EventDetail />} />
```

### 6. `src/components/PageTemplate.tsx`

Add to `SEGMENT_NAME_MAP`:
- `'events': 'Events'`

Add to `SEGMENT_PARENT_MAP`:
- `'nis2-w-polsce': { segment: 'events', name: 'Events' }`

This ensures correct breadcrumb hierarchy: Home > Events > NIS2 w Polsce.

### 7. Sitemap

The edge function `supabase/functions/sitemap/index.ts` generates sitemap dynamically. The new static routes `/events` and `/events/nis2-w-polsce` need to be added to its static pages array.

## SEO Checklist

- One H1 per page
- Unique title + meta description per page
- Canonical URLs with trailing slash (via PageTemplate)
- hreflang tags (via PageTemplate)
- Open Graph + Twitter cards (via PageTemplate)
- JSON-LD: Event schema, BreadcrumbList, FAQPage
- Clean URL slugs: `/events/nis2-w-polsce`
- Internal links: hub <-> detail, cross-links to `/frameworks/nis-ii`
- All content indexable (no tabs hiding content)
- "Last updated" visible timestamp
- `robots: index, follow` (default via PageTemplate)
- Images with lazy loading, width/height attributes

## Technical Notes

- Form submission uses `fetch()` POST to placeholder webhook URL -- easy to swap later
- UTM extraction via `URLSearchParams` on mount
- Calendar links: Google Calendar uses URL format, iCal generates `.ics` blob download
- Work email validation rejects common free providers (gmail, yahoo, hotmail, outlook personal)
- Sticky form uses `position: sticky; top: 6rem` with `self-start` on desktop
- Mobile: form rendered twice (after hero + before bottom CTA) using same component instance

