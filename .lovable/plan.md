

## Analysis

**Current state of NIS2-KSC**: Every section uses dark backgrounds (`bg-slate-950`, `bg-slate-900`, `bg-slate-800`). All text is white/white-opacity.

**Rest of the site**: Dark hero → light body sections (`bg-white`, `bg-slate-50`) with dark text → dark CTA at the bottom. This is the standard pattern on Index, About, Frameworks, etc.

**NIS2-KSC sections to restyle**:

| Section | Current | Proposed |
|---------|---------|----------|
| Hero | `bg-slate-950` (dark) | Keep dark — matches site standard |
| Urgency | `bg-slate-800` | Light — `bg-slate-50` with dark text |
| Problem | `bg-slate-800` | Light — `bg-white` with dark text |
| Solution (AI-native platforma) | `bg-slate-900` | Light — `bg-slate-50` with dark text |
| 4 Steps | `bg-slate-950` | Light — `bg-white` with dark text |
| Auditor | `bg-slate-900` | Light — `bg-slate-50` with dark text |
| Continuous Compliance | `bg-slate-950` | Light — `bg-white` with dark text |
| Final CTA | `bg-slate-950` | Keep dark — matches CtaSection pattern |
| StickyCta (floating bar) | Dark | Keep dark — floating overlay |

## Plan

### File: `src/pages/seo-landing/Nis2Ksc.tsx`

1. **Update `Section` wrapper** — change the two variants:
   - `dark=true` → `bg-white text-foreground`
   - `dark=false` → `bg-slate-50 text-foreground`
   - (Hero and Final CTA are standalone sections, not using this wrapper)

2. **Urgency section** (line ~429) — change from `bg-slate-800 text-white` to `bg-slate-50 text-foreground`. Update all text colors:
   - Headings: `text-foreground` (dark)
   - Body text: `text-slate-600` instead of `text-white/80`
   - Red icon accents stay the same
   - Button: adjust from red/dark to match light theme

3. **Problem section** (line ~487) — change from `bg-slate-800 text-white` to `bg-white text-foreground`. Update:
   - Problem cards: `border-red-200 bg-red-50` instead of `border-red-500/20 bg-red-500/5`
   - Text: `text-slate-700` instead of `text-white/70`
   - Info box: `border-primary/20 bg-primary/5` stays, text becomes `text-slate-700`

4. **Solution section** (uses `Section dark={false}`) — will become `bg-slate-50`. Update:
   - Bullet point text: `text-slate-600` instead of `text-white/70`
   - Section header text: `text-foreground` + `text-slate-500`

5. **4 Steps section** (uses `Section` default) — becomes `bg-white`. Update:
   - Step indicators: dark-adapted colors (borders become `border-slate-200`, text `text-slate-400`)
   - Detail panel: `border-slate-200 bg-slate-50` instead of `border-white/10 bg-white/[0.03]`
   - All white text → dark equivalents

6. **Auditor section** (uses `Section dark={false}`) — becomes `bg-slate-50`. Update text colors to dark equivalents. Green accents remain.

7. **Continuous Compliance section** (uses `Section`) — becomes `bg-white`. Update cards: `border-slate-200 bg-white` with hover `border-primary/30`.

8. **FeatureCard component** (line ~104) — update for light theme:
   - Border: `border-slate-200` instead of `border-white/10`
   - Background: `bg-white` instead of `bg-white/[0.03]`
   - Text: `text-slate-600` instead of `text-white/60`

9. **FrameworkBadge** (line ~96) — update for light context in non-hero areas, or leave as-is since it's only used in hero.

10. **ImplementationSteps** — the most complex update:
    - Connector line: `bg-slate-200` instead of `bg-white/10`
    - Step circles inactive: `border-slate-300 text-slate-400`
    - Step titles: `text-foreground` / `text-slate-400`
    - Detail panel: light card styling
    - Detail tags: `border-slate-200 bg-slate-100 text-slate-600`
    - Step number watermark: `text-slate-100` instead of `text-white/5`

11. **Nis2PlatformMockups** — this component already has its own dark styling internally; it should keep its dark mockup appearance (it represents a product screenshot). No changes needed.

### Alternating pattern
Sections alternate `bg-white` and `bg-slate-50` to create visual separation, matching the rest of the site.

### No changes to
- Hero section (stays dark)
- Final CTA section (stays dark — standard pattern)
- StickyCta bar (stays dark — floating overlay)
- HeroContactForm (used in dark hero and dark final CTA)
- Nis2PlatformMockups component (product mockup keeps its own styling)

