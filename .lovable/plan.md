

## Problem

When switching language on a content detail page (e.g., `/pl/success-stories/case-study-biofarm`), `changeLanguage` simply replaces the locale prefix (`/pl/` → `/en/`) but keeps the same slug. Since content has different slugs per language (linked via `group_id`), the target URL doesn't exist and shows a 404.

The `alternates` data (containing `{ lang, slug }` pairs for all language versions) is **already fetched** in both `BlogPost.tsx` and `StoryDetail.tsx` via the `useAlternates` hook — it's just not connected to the language switcher.

## Solution

Add an "alternates registry" so content pages can tell the language switcher about their translated URLs.

### 1. Extend `LanguageContext` with alternates registry

Add state + methods to `LanguageContext`:
- `setAlternates(alternates: Array<{ lang: string; slug: string }>, contentType: 'post' | 'story')` — pages call this when alternates load
- `clearAlternates()` — pages call this on unmount
- Update `changeLanguage`: before navigating, check if an alternate exists for the target locale. If so, build the correct URL (e.g., `/${newLocale}/blog/${alternateSlug}` or `/${newLocale}/success-stories/${alternateSlug}`). If not, fall back to the list page (`/${newLocale}/blog` or `/${newLocale}/success-stories`).

### 2. Register alternates in `BlogPost.tsx`

Add a `useEffect` that calls `setAlternates(alternates, 'post')` when `alternates` data loads, and `clearAlternates()` on unmount.

### 3. Register alternates in `StoryDetail.tsx`

Same pattern — call `setAlternates(alternates, 'story')` when data loads, cleanup on unmount.

### 4. Fallback behavior

When switching language on a content page that has **no translation** for the target language:
- Redirect to the list page (`/${locale}/blog` or `/${locale}/success-stories`) instead of showing a 404.

### Technical Details

**`src/contexts/LanguageContext.tsx`**:
- Add `contentAlternates` state (`Array<{ lang: string; slug: string }>` + `contentType`)
- Add `setAlternates` and `clearAlternates` to context value
- In `changeLanguage`: detect if on `/blog/` or `/success-stories/` detail route, check alternates, navigate to correct slug or fallback to list

**`src/pages/blog/BlogPost.tsx`**: Add useEffect to register/clear alternates

**`src/pages/blog/StoryDetail.tsx`**: Add useEffect to register/clear alternates

**No new dependencies or database changes needed.**

