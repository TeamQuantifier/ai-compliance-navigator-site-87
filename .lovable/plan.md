

## Overview

The `/nis2-ksc` page has all content hardcoded in Polish (~800 lines). We need to:
1. Add i18n translation keys for all content (EN, PL, CS)
2. Move the route from `/nis2-ksc` to `/frameworks/nis-2` (replacing old `/frameworks/nis-ii`)
3. Set up 301 redirects for old URLs

## Scope of Work

### 1. Translation keys — `nis2Ksc` namespace

Add a new `nis2Ksc` key block to all 3 translation files (`public/locales/{en,pl,cs}/translation.json`). Covers:

- **StickyCta**: bar text, button labels
- **Hero**: badges, banner text, heading, subtext, form labels, RODO clause
- **Urgency section**: heading, 5 bullet points, CTA button
- **Problem section**: heading, subtitle, 6 problem items, callout text
- **Solution section**: label, heading, subtitle, 7 feature bullets, CTA
- **4 Steps**: label, heading, subtitle, 4 steps (title, desc, 3 details each)
- **Auditor section**: heading, subtitle, 7 checklist items, highlight callout
- **Continuous Compliance**: heading, subtitle, 6 feature items
- **Final CTA**: heading, subtitle
- **Form**: title, subtitle, phone text, placeholders, submit button, RODO text, success/error toasts

PL translations = current hardcoded text. EN and CS = new translations.

### 2. Update `Nis2Ksc.tsx`

- Replace all hardcoded Polish strings with `t('nis2Ksc.xxx')` calls
- Use `useLanguage()` hook (already imported)
- Keep layout, styling, and logic unchanged

### 3. Route migration: `/nis2-ksc` → `/frameworks/nis-2`

**`src/App.tsx`**:
- Change route `/:locale/nis2-ksc` → `/:locale/frameworks/nis-2`
- Remove old `/:locale/frameworks/nis-ii` route (currently pointing to NisII.tsx)
- Add redirect: `/:locale/nis2-ksc` → `frameworks/nis-2`
- Update existing redirect `/:locale/nis2` → `frameworks/nis-2`
- Add redirect: `/:locale/frameworks/nis-ii` → `../nis-2`

**`netlify.toml`**:
- Add 301 redirects for `/*/frameworks/nis-ii` → `/*/frameworks/nis-2`
- Add 301 redirects for `/*/nis2-ksc` → `/*/frameworks/nis-2`

### 4. Update all internal links

Files referencing `/frameworks/nis-ii` or `/nis2-ksc` (~10 files):
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/components/HeroSection.tsx`
- `src/pages/frameworks/Frameworks.tsx`
- `src/pages/events/EventDetail.tsx`
- `src/components/blog/EbookDownloadSection.tsx`
- `src/components/PageTemplate.tsx` (breadcrumb maps)

All change to `/frameworks/nis-2`.

### 5. SEO updates

**`Nis2Ksc.tsx` SEO head**: Update canonical/hreflang URLs from `/nis2-ksc` to `/frameworks/nis-2`

**`supabase/functions/sitemap/index.ts`**:
- Replace `/frameworks/nis-ii` with `/frameworks/nis-2`
- Replace `/nis2-ksc` entry with `/frameworks/nis-2` (remove duplicate)

**`supabase/functions/llms-txt/index.ts`**: Update all `/frameworks/nis-ii` and `/nis2-ksc` references to `/frameworks/nis-2`

**`supabase/functions/prerender-marketing/index.ts`**: Update route mapping `'nis2': 'frameworks/nis-2'` and all internal link references

**`src/components/PageTemplate.tsx`**: 
- Replace `'nis-ii'` with `'nis-2'` in `SEGMENT_NAME_MAP` and `SEGMENT_PARENT_MAP`
- Keep `'nis2-ksc'` entry for legacy breadcrumb support

### 6. Remove old NisII page

The `src/pages/frameworks/cybersecurity/NisII.tsx` file and its import in `App.tsx` can be removed since Nis2Ksc replaces it entirely.

---

### Technical Details

- ~150 translation keys per language (3 files × ~150 keys)
- 15+ files modified total
- The old NisII.tsx translation keys (`nisIIPage.*`) in translation.json can remain for now (no breaking change)
- Edge function redeployment needed for sitemap, llms-txt, prerender-marketing

