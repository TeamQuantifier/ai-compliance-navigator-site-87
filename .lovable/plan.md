

## Problem

The "Intro + Highlights" section uses a `grid-cols-3` layout where the text takes 2 columns and the card takes 1. At the current viewport (~981px), the two paragraphs of intro text are short relative to the tall highlights card, creating visual imbalance with lots of whitespace on the left.

## Proposed Solution: Center the section vertically + tighten the grid

Two changes:

1. **Add `items-center`** to the grid container so the text block and the card are vertically centered relative to each other (fixing the "floating" look from the screenshot).

2. **Change grid ratio to `md:grid-cols-5`** with text taking `md:col-span-3` and card taking `md:col-span-2`. This gives slightly more space to text and slightly less to the card, making the layout more balanced.

### File: `src/pages/About.tsx`

**Line 122** — change grid classes:
```
- <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
-   <div className="md:col-span-2 space-y-6">
+ <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16 items-center">
+   <div className="md:col-span-3 space-y-6">
```

**Line 128** — update card column span:
```
- <div>
+ <div className="md:col-span-2">
```

This keeps the two-column structure but centers both elements vertically and gives the text more breathing room.

