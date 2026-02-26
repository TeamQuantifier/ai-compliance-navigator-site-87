

## Plan: Remove duplication, replace images with icons, remove last modified

### Problem
The page has two sections showing the same 4 webinars (highlights timeline + event cards grid) — duplication. Event cards show photo images that should be replaced with themed icons. "Last updated" line at the bottom should be removed.

### Changes

#### 1. `src/pages/events/EventsHub.tsx`
- **Remove** the entire "Webinar highlights — timeline" section (lines 126–147)
- **Remove** the "Last updated" paragraph (lines 168–171)
- Keep: hero, intro, event grid, closing text, FAQ

#### 2. `src/data/eventsData.ts`
- Add an `icon` field to each event: `'Globe'`, `'Settings'`, `'FileCheck'`, `'ShieldCheck'` (Lucide icon names matching each webinar topic)
- Add `icon` to the `EventData` interface

#### 3. `src/components/events/EventCard.tsx`
- Replace the `<img>` block with a styled icon container:
  - If `event.icon` exists, render a centered Lucide icon (using dynamic lookup from `lucide-react`) inside a colored background div instead of the photo
  - Fallback to photo if no icon is set
- Icon container: `aspect-video` with `bg-primary/5` background, large centered icon in `text-primary`

#### 4. Icon mapping per webinar
| Webinar | Icon |
|---------|------|
| Nowa rzeczywistość (geopolityka, ryzyka) | `Globe` |
| Wdrożenie (continuous compliance) | `Settings` |
| Dokumenty, dowody | `FileCheck` |
| Kontrola, raportowanie | `ShieldCheck` |

