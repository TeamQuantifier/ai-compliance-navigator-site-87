

## Plan: Gradient icon cards for event webinars

Replace the plain `bg-primary/5` icon area with a gradient background using brand colors (fiolet → mięta), add decorative geometric shapes (circles, dots), and style the icon in white for contrast. All done in pure Tailwind + inline SVG — no external assets needed.

### Changes

#### `src/components/events/EventCard.tsx`

Replace the icon container (lines 28–31) with a gradient card design:

- Background: `bg-gradient-to-br from-[#6d38a8] to-[#387fef]` (brand violet → blue)
- Decorative elements: 2-3 subtle CSS circles/rings using `absolute` positioned divs with `rounded-full`, `border`, `opacity-20` in mint (`#d4f1ed`)
- Icon: render in `text-white` at `h-12 w-12`, centered
- Reduce aspect ratio from `aspect-video` to `aspect-[3/2]` for a more compact card
- Add a subtle step number (01–04) in the top-left corner using a small `text-white/40 font-bold text-4xl` overlay

#### `src/data/eventsData.ts`

Add `step: number` field to `EventData` interface (1–4) and assign to each event, so cards can display the step number.

