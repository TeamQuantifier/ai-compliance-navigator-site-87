

## Plan: LinkedIn Insight Tag (GDPR-compliant)

LinkedIn Insight Tag is a **marketing** tracker — it must load only after `marketing` consent, following the same pattern as GTM, GA4, and Clarity.

### Changes

**1. `src/lib/script-loader.ts`**
- Add `LINKEDIN_PARTNER_ID = '9699417'` constant
- Add `lintrk` to the `Window` global interface
- Add `initLinkedIn()` function that:
  - Guards with `loadedScripts.has('linkedin')`
  - Sets `_linkedin_partner_id` and `_linkedin_data_partner_ids` on window
  - Creates and appends the `insight.min.js` script
  - Adds noscript pixel `<img>` element (same pattern as GTM noscript)
  - Marks `loadedScripts.add('linkedin')`
- In `loadConsentedScripts()`: call `initLinkedIn()` inside the `if (categories.marketing)` block alongside GTM

**2. `src/lib/consent.ts`**
- Add LinkedIn cookie `li_sugr` and `_li*` pattern cookies to `clearNonEssentialCookies()` in the marketing section

No other files need changes — the consent banner and context already handle the `marketing` category toggle and script loading lifecycle.

