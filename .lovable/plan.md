

## Issues and Fixes

### 1. Hero — too much empty dark space
The hero has `min-h-[90vh]` which creates excessive dark padding. Reduce to `min-h-[70vh]` and decrease vertical padding from `py-28` to `py-20`.

### 2. Urgency section — gray text on dark background
The Urgency section still uses `bg-slate-800 text-white` but the bullet text was changed to `text-slate-600` (dark gray on dark bg = unreadable). Fix: change entire section to light theme (`bg-slate-50`) with dark text throughout, matching the plan that was approved.

### 3. Mockup invisible elements in Solution section
The `Nis2PlatformMockups` component uses dark internal styling (`bg-white/[0.02]`, `text-white/40`, `border-white/10`) which was designed for dark backgrounds. Now that it sits on a light `bg-slate-50` section, elements are invisible. Fix: wrap the mockup in a dark container (`bg-slate-900 rounded-2xl`) so its internal dark-themed UI remains visible with proper contrast.

### 4. Comprehensive SEO optimization
The page currently has only a basic `<Helmet>` with title and description. It needs full SEO treatment since it will replace `/nis2`:

**File: `src/pages/seo-landing/Nis2Ksc.tsx`**
- Replace basic `<Helmet>` with comprehensive SEO: canonical URL, hreflang, robots, OG tags, Twitter cards, JSON-LD schemas (SoftwareApplication, BreadcrumbList, FAQPage)
- Add `window.prerenderReady = true` signal in useEffect

**File: `supabase/functions/sitemap/index.ts`**
- Add `/nis2-ksc` to static pages with `priority: 0.9`, `changefreq: 'weekly'`

**File: `supabase/functions/llms-txt/index.ts`**
- Add NIS2-KSC landing page reference in the static sections

**File: `src/components/PageTemplate.tsx`**
- Add `nis2-ksc` to `SEGMENT_NAME_MAP` and `SEGMENT_PARENT_MAP` for breadcrumb support

---

### Technical Details

**Hero (line 368):** Change `min-h-[90vh]` → `min-h-[70vh]`, `py-28` → `py-20`

**Urgency (lines 429-484):** Change `bg-slate-800 text-white` → `bg-slate-50 text-foreground`. All bullet text stays `text-slate-600` (now readable on light bg). Button: `bg-red-500 hover:bg-red-600 text-white`.

**Mockup wrapper (line 562-564):** Wrap `<Nis2PlatformMockups />` in `<div className="bg-slate-900 rounded-2xl">` so its dark-themed UI has proper contrast.

**SEO in Nis2Ksc.tsx — replace Helmet block with:**
- `<title>` with brand suffix
- `<meta name="description">` optimized (under 160 chars)
- `<meta name="robots" content="index, follow">`
- Canonical: `https://quantifier.ai/{locale}/nis2-ksc/`
- Hreflang for en, pl-PL, cs-CZ + x-default
- OG tags (title, description, url, type, image, locale)
- Twitter cards
- JSON-LD: `SoftwareApplication` schema
- JSON-LD: `BreadcrumbList` (Home > Frameworks > NIS2 KSC)
- `window.prerenderReady = true` in useEffect

**Sitemap:** Add `{ path: '/nis2-ksc', changefreq: 'weekly', priority: '0.9', lastmod: '2026-03-26' }`

**llms-txt:** Add NIS2-KSC landing page entry in framework/landing pages section

**PageTemplate.tsx:** Add `'nis2-ksc': 'NIS2 KSC'` to `SEGMENT_NAME_MAP`

