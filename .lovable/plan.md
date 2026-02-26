

## Plan: Language-specific hero banner on Events page

### Changes

1. **Copy 3 uploaded images** to `public/lovable-uploads/`:
   - `NIS2_webinar_cyberbezpieczenstwo_PL.jpg` -> `public/lovable-uploads/webinar-cycle-banner-pl.jpg`
   - `NIS2_-_Cybersecurity_Webinars_EN.jpg.jpg` -> `public/lovable-uploads/webinar-cycle-banner-en.jpg`
   - `NIS2_-_Cybersecurity_Webinars_CZ.jpg` -> `public/lovable-uploads/webinar-cycle-banner-cs.jpg`

2. **Update `EventsHub.tsx`** (lines 25-29): Replace the static `src` with a locale-based lookup using `currentLocale`:
   ```tsx
   const bannerMap = { pl: '/lovable-uploads/webinar-cycle-banner-pl.jpg', en: '/lovable-uploads/webinar-cycle-banner-en.jpg', cs: '/lovable-uploads/webinar-cycle-banner-cs.jpg' };
   ```
   Then use `bannerMap[currentLocale]` as the `src`. Also update the `alt` text per locale for SEO.

