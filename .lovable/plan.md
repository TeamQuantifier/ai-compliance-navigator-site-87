

## Plan: Add uploaded image to the right side of the intro section on EventsHub

### File: `src/pages/events/EventsHub.tsx` (lines 109-124)

Change the intro content section from a single-column `prose` block to a two-column grid layout:
- Left column: existing text content (introP1, bullets, introP2, introP3, formatDescription)
- Right column: the uploaded EU/NIS2 image

### File operation:
1. Copy uploaded image to `public/lovable-uploads/NIS2_Webinars_compliance_Quantifier.jpg`
2. Update lines 109-124 in `EventsHub.tsx` to wrap content in a `grid md:grid-cols-2 gap-8 items-start` container, placing text on the left and the image (rounded, with subtle shadow) on the right

