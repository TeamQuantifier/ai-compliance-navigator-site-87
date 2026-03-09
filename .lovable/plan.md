

## Analysis: Static SEO tags in index.html

### Current Architecture

The site has **two layers of bot handling**:
1. **Netlify Prerender Extension** — serves fully rendered HTML snapshots to crawlers (Googlebot, Bingbot, etc.)
2. **Vercel rewrites** — proxies bot requests to Supabase Edge Functions that return server-rendered HTML
3. **React-helmet-async** — manages all meta tags dynamically after JS loads

### Will this help SEO?

**Short answer: Minimal benefit, with one significant risk.**

**Why it's mostly unnecessary:**
- Googlebot executes JavaScript — it sees react-helmet-async output
- Netlify Prerender Extension serves fully rendered HTML to all major crawlers — they never see raw index.html
- The static tags are only visible in the ~0.5s before JS hydrates, which crawlers with prerendering never encounter

**The canonical tag is actively harmful:**
- A static `<link rel="canonical" href="https://quantifier.ai/en/" />` in index.html means that if ANY crawler somehow bypasses prerendering and hits `/pl/` or `/cs/`, the canonical tells it "this page is actually `/en/`" — incorrectly canonicalizing Polish/Czech pages to English
- React-helmet would override it after JS loads, but there's a race condition risk
- Same problem applies to the static hreflang tags — they only reference homepage URLs, which is wrong for `/en/frameworks/iso-27001` etc.

**What IS beneficial:**
- Updated `<title>` and `<meta description>` — harmless improvement as fallback, keyword-rich
- `og:image`, `og:site_name`, `twitter:card` — good defaults for edge cases (some social media crawlers don't execute JS)
- `<meta name="robots" content="index, follow">` — already handled by PageTemplate but a safe fallback

### Recommendation

Implement a **partial version** of this prompt:
- Update static `<title>` and `<meta description>` — yes
- Add OG/Twitter fallback tags (without URL-specific ones) — yes
- Add `<meta name="robots">` — yes
- **Skip** canonical and hreflang tags — these are locale-dependent and must remain dynamic only
- **Skip** `og:url` — also locale-dependent

### Technical changes

**File: `index.html`** — update title, description, add safe static OG/Twitter fallbacks:

```html
<title>Quantifier.ai | AI Compliance Automation Platform</title>
<meta name="description" content="Automate compliance for ISO 27001, SOC 2, NIS2, GDPR & ESG with AI-native platform. Trusted by 250+ companies including BNP Paribas. Request a demo." />

<!-- Static fallback OG tags (overridden by react-helmet-async per page) -->
<meta property="og:title" content="Quantifier.ai | AI Compliance Automation" />
<meta property="og:description" content="Automate compliance for ISO 27001, SOC 2, NIS2, GDPR & ESG. Trusted by 250+ companies." />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://quantifier.ai/og-homepage.png" />
<meta property="og:site_name" content="Quantifier.ai" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="robots" content="index, follow" />
```

**NOT adding** (dangerous for multi-locale SPA):
- `<link rel="canonical">` — must stay dynamic
- `<link rel="alternate" hreflang>` — must stay dynamic
- `<meta property="og:url">` — must stay dynamic

