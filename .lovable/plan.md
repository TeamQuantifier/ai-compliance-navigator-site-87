

# Use uploaded homepage screenshot as default OG image

## What changes

Copy the uploaded homepage screenshot to `public/og-homepage.png` and replace all references to `platform-screenshot.png` used as the default OG image across the codebase.

## Files to update

The image needs to be in `public/` (not `src/assets/`) because it's referenced in meta tags and edge functions via direct URL.

| File | Change |
|---|---|
| **New file**: `public/og-homepage.png` | Copy from user upload |
| `src/components/seo/SEOHead.tsx` | `DEFAULT_OG_IMAGE` -> `/og-homepage.png` |
| `src/components/PageTemplate.tsx` | Default `ogImage` prop -> `/og-homepage.png` |
| `src/hooks/useSeoSettings.ts` | `defaultOgImage` -> `/og-homepage.png` |
| `src/pages/Index.tsx` | og:image and twitter:image URLs |
| `src/pages/seo-landing/GrcPlatform.tsx` | og:image and twitter:image URLs |
| `src/pages/blog/BlogList.tsx` | Fallback image |
| `src/pages/formularz/FormularzPage.tsx` | og:image |
| `netlify/edge-functions/bot-prerender.ts` | Fallback og:image |
| `supabase/functions/prerender-marketing/index.ts` | og:image and twitter:image |
| `supabase/functions/prerender-post/index.ts` | Fallback image |

All references change from `/lovable-uploads/platform-screenshot.png` to `/og-homepage.png`.

After publishing, use LinkedIn Post Inspector and Facebook Sharing Debugger to force cache refresh.

