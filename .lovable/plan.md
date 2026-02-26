

## Plan: 3-Row Infinite Scrolling Logo Marquee

Replace the single Embla carousel with 3 CSS-animated marquee rows, each scrolling in alternating directions (right, left, right). This removes the dependency on Embla/Autoplay for this section and uses pure CSS animations for smoother, continuous movement.

### Approach

**Split logos into 3 groups** (9 logos each):
- Row 1 (scroll right): logos 1-9 (UDS, NBS, Pracodawcy RP, Wosana, Zymetria, Real Management, NOMAX, RBE, Dr Irena Eris)
- Row 2 (scroll left): logos 10-18 (MAMNT, BCC, LOCO Trans-Seed, Bank Polski, 4F, Compensa, BNP Paribas, Cash Director, Unicell)
- Row 3 (scroll right): logos 19-27 (Adamed, Bidfood Farutex, CloudFerro, Gobarto, Hilding Anders, Kazar, Marc Kolor, OEX, Baltic)

**CSS keyframes** added to `index.css`:
- `scroll-left`: `translateX(0)` to `translateX(-50%)`
- `scroll-right`: `translateX(-50%)` to `translateX(0)`

Each row duplicates its logos (renders them twice) to create seamless infinite loop. The animation runs continuously at ~30s duration.

**Layout**: 3 rows stacked vertically with `gap-4`, each row is a horizontal flex with `overflow-hidden`, logos inside animate via `animation: scroll-left/right 30s linear infinite`.

### File Changes

**`src/components/InsidersSection.tsx`** — Replace single `<Carousel>` block with 3 marquee `<div>` rows. Remove Embla imports. Keep all logo data, header, and CTA unchanged.

**`src/index.css`** — Add two keyframes (`scroll-left`, `scroll-right`) for the marquee animation.

### Technical Details

Each row structure:
```
<div class="overflow-hidden">
  <div class="flex animate-scroll-right" style="width: fit-content">
    {rowLogos.map(logo)} {/* original */}
    {rowLogos.map(logo)} {/* duplicate for seamless loop */}
  </div>
</div>
```

Row directions: Row 1 right, Row 2 left, Row 3 right. Pause on hover via `hover:animation-play-state: paused` utility.

