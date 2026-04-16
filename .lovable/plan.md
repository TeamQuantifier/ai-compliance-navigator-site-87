

## Plan: Rebrand GS1 Polska page to match brand colors

### Problem
The GS1 Polska page (`/partners/gs1-polska`) uses a custom brown/amber palette that clashes with the rest of the site. The hero and card sections need to match the brand's slate-950 + compliance blue + innovation purple palette used on pages like NIS2, homepage, etc.

### Changes

**File: `src/pages/partners/Gs1Polska.tsx`**

1. **Replace the `brown` palette object** with brand-consistent tokens:
   - Hero: `bg-slate-950` (same as homepage/NIS2)
   - Hero badge: `bg-white/5 text-white/70 border border-white/15` 
   - Cards: `bg-slate-50` borders with `border-slate-200`
   - Accent color: `text-primary` / `text-compliance-600` (blue)
   - Quote section: `bg-slate-950` gradient
   - Business section: `bg-gradient-to-r from-slate-900 to-slate-800`
   - Form section: `bg-gradient-to-br from-slate-50 to-blue-50`
   - Step circles: `bg-primary text-white`
   - Buttons: `bg-primary hover:bg-primary/90 text-white`
   - Card backgrounds: `bg-slate-50`, `bg-blue-50/50`

2. **Update inline accent classes** throughout the file:
   - `text-amber-400` → `text-primary` or `text-compliance-400`
   - `bg-amber-100` → `bg-blue-100`, `text-amber-800` → `text-primary`
   - `border-amber-*` → `border-slate-200` or `border-primary/20`
   - `decoration-amber-*` → `decoration-primary/60`
   - Checkbox: `border-primary` with `data-[state=checked]:bg-primary`
   - Consent link: `text-primary` instead of `text-amber-700`

3. **Partnership cards** (the ones shown in screenshot): Change from amber/stone backgrounds to light slate/blue backgrounds matching brand palette, with blue icons instead of amber.

### Scope
- Single file edit: `src/pages/partners/Gs1Polska.tsx`
- No translation changes needed
- Works for all locales (`/pl`, `/en`, `/cs`)

