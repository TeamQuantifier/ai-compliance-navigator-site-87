

# SEO Crawlability & Semantic Structure Implementation Plan

## Executive Summary

The quantifier.ai website is a React SPA (Vite + TypeScript) with an existing bot pre-rendering solution via Supabase Edge Functions. While the prerender system exists, it has gaps that prevent crawlers from seeing the full semantic structure. This plan focuses on **improving the prerender quality** and **adding semantic markup** without changing marketing copy.

---

## Current State Analysis

### What Works Well
- **Bot detection and prerendering**: `vercel.json` routes bots to Edge Functions that return static HTML
- **Technical SEO tags**: Canonical, hreflang (EN/PL/CS), OG/Twitter cards, robots.txt, sitemap.xml
- **Schema.org**: Organization, WebSite, SoftwareApplication, FAQPage schemas
- **Navigation**: Real `<a>` links with text in Navbar/Footer

### Critical Issues Identified

| Issue | Impact | Root Cause |
|-------|--------|------------|
| **Prerender HTML lacks full content** | Bots see only hardcoded subset, not actual page text | Edge Function has static content database, not rendering actual components |
| **Heading hierarchy problems** | `<h4>` and `<h5>` used instead of `<h2>`/`<h3>` | Semantic HTML patterns not followed in components |
| **Missing `loading="lazy"` on images** | Slower LCP, missed CWV optimization | Not implemented |
| **No explicit width/height on images** | CLS issues | Images use CSS classes only |
| **Footer has incorrect framework URLs** | 404s or wrong pages | Old URL structure `/frameworks/cybersecurity/soc` instead of `/frameworks/soc` |

---

## Implementation Plan

### Phase 1: Fix Heading Hierarchy (P0)

**Problem**: Components use `<h3>`, `<h4>`, `<h5>` where `<h2>` should be used for section headings.

**Changes Required**:

| Component | Current | Should Be |
|-----------|---------|-----------|
| `HeroSection.tsx` line 24 | `<h1>` | OK |
| `HeroSection.tsx` line 92 | `<h3>` (frameworks subtitle) | `<h2>` |
| `FeatureSection.tsx` line 31 | `<h2>` | OK |
| `FeatureSection.tsx` line 56 | `<h3>` | OK (sub-section) |
| `TrustReasonsSection.tsx` line 109 | `<h4>` | `<h2>` |
| `TrustReasonsSection.tsx` line 142 | `<h4>` | `<h2>` |
| `TrustReasonsSection.tsx` line 45 | `<h5>` (card titles) | `<h3>` |
| `InsidersSection.tsx` line 109 | `<h3>` | `<h2>` |
| `CtaSection.tsx` line 21 | `<h2>` | OK |
| `Index.tsx` line 201 | `<h2>` | OK |

**Files to modify**:
- `src/components/HeroSection.tsx`
- `src/components/TrustReasonsSection.tsx`
- `src/components/InsidersSection.tsx`

---

### Phase 2: Update Prerender Edge Function (P0)

**Problem**: The prerender function has a static content database that doesn't match the actual React components' text. Bots see a subset of content.

**Solution**: Enhance the prerender function to include more complete content matching the actual page sections.

**File**: `supabase/functions/prerender-marketing/index.ts`

**Changes**:
1. Update the `index` page content to include all major sections:
   - Hero (already has H1)
   - Features section content
   - Trust reasons section
   - Insiders section
   - Roles section
   - CTA section

2. Add CS locale support (currently only EN/PL)

3. Ensure FAQ section is included for homepage

**Example structure enhancement**:
```typescript
'index': {
  en: {
    title: 'Quantifier.ai - AI-Powered Compliance & Risk Management Platform',
    description: 'Automate GRC workflows with AI...',
    h1: 'End-to-end GRC. In one AI-native platform.',
    subtitle: 'Your AI Compliance Officer that manages projects, collects data and presents results...',
    sections: [
      {
        h2: 'Comprehensive AI-Powered Compliance Suite',
        content: [
          'AI Compliance Officer - AI-driven assistant that monitors systems, identifies issues, and suggests remediation.',
          'Document Management - Centralized repository with automated version control and audit trails.',
          // ... all 6 feature cards
        ]
      },
      {
        h2: 'Why Teams Trust Us with Compliance',
        content: [
          'Peace of Mind, Powered by Automation',
          'Say Goodbye to Manual Oversight',
          // ... all trust reasons
        ]
      },
      {
        h2: 'Compliance, powered by insiders',
        content: ['Join 250+ companies from startups to multinational corporations...']
      },
      {
        h2: 'Tailored for Every Role',
        content: [
          'For Leadership & Executive (CFO, COO, CISO, Head of Risk)',
          'For Operational Teams (Compliance, IT, Security, ESG)',
          'For Internal & External Auditors'
        ]
      },
      {
        h2: 'Start Your AI-Powered Compliance Journey Today',
        content: [
          'For Enterprise - Comprehensive compliance management',
          'For Mid-Market - Scalable solutions',
          'For Startups - Build compliance into your foundation'
        ]
      }
    ],
    // Add FAQ for homepage
    faqs: [
      { question: 'What is Quantifier.ai?', answer: '...' },
      { question: 'Which compliance frameworks does Quantifier support?', answer: '...' },
      { question: 'How much time can I save with Quantifier?', answer: '...' }
    ],
    internalLinks: [
      { text: 'Product Features', href: '/product/features' },
      { text: 'Pricing Plans', href: '/plans' },
      { text: 'ISO 27001 Compliance', href: '/frameworks/iso-27001' },
      { text: 'SOC 2 Automation', href: '/frameworks/soc' },
      { text: 'NIS 2 Directive', href: '/frameworks/nis-ii' },
      { text: 'GDPR Compliance', href: '/frameworks/gdpr' }
    ]
  }
}
```

---

### Phase 3: Fix Footer Internal Links (P0)

**Problem**: Footer has old URL structure that doesn't match current routing.

**File**: `src/components/Footer.tsx`

**Changes**:
| Line | Current | Should Be |
|------|---------|-----------|
| 86 | `/frameworks/cybersecurity/soc` | `/frameworks/soc` |
| 91 | `/frameworks/information-security/iso-27001` | `/frameworks/iso-27001` |
| 96 | `/frameworks/data-security` | `/frameworks/gdpr` |
| 101 | `/frameworks/cybersecurity/nis-ii` | `/frameworks/nis-ii` |

---

### Phase 4: Image Optimization (P1)

**Problem**: Images lack `loading="lazy"`, explicit dimensions, and some have generic alt text.

**Files to modify**:
- `src/components/HeroSection.tsx` (platform screenshots)
- `src/components/InsidersSection.tsx` (partner logos)
- `src/components/FeatureSection.tsx` (TÜV certificate)
- `src/components/Navbar.tsx` (logo)
- `src/components/Footer.tsx` (logo)

**Changes**:

1. **Add `loading="lazy"` to below-fold images**:
```tsx
// InsidersSection.tsx - partner logos
<img 
  src={logo.src} 
  alt={logo.alt} 
  loading="lazy"
  width="160"
  height="80"
  className="max-h-20 max-w-full mx-auto object-contain..." 
/>
```

2. **Add explicit dimensions to key images**:
```tsx
// HeroSection.tsx - hero images (above fold - no lazy)
<img 
  src="/lovable-uploads/platform-screenshot.png" 
  alt="Quantifier Platform - Multi-Framework Policy Hub"
  width="800"
  height="500"
  className="..."
/>
```

3. **Keep decorative images with empty alt**:
```tsx
// Background/decorative elements
<img src="..." alt="" role="presentation" />
```

---

### Phase 5: Add CS Locale to Prerender (P1)

**Problem**: Prerender function only validates EN/PL but site has CS locale.

**File**: `supabase/functions/prerender-marketing/index.ts`

**Changes**:
1. Line 1163: Change `['en', 'pl']` to `['en', 'pl', 'cs']`
2. Add CS translations to `getPageContent()` for all pages

---

### Phase 6: Enhance Navigation for Bots (P1)

**Problem**: Prerender HTML has internal links but Navbar menu items aren't included.

**Solution**: Add a semantic nav section to prerender output with key navigation links.

**File**: `supabase/functions/prerender-marketing/index.ts`

Add to `generateHtml()` function:
```html
<nav aria-label="Main navigation">
  <ul>
    <li><a href="${baseUrl}/product/features">Product</a></li>
    <li><a href="${baseUrl}/frameworks">Frameworks</a></li>
    <li><a href="${baseUrl}/plans">Plans</a></li>
    <li><a href="${baseUrl}/partners">Partners</a></li>
    <li><a href="${baseUrl}/blog">Blog</a></li>
    <li><a href="${baseUrl}/contact">Contact</a></li>
  </ul>
</nav>
```

---

## Files to Modify Summary

| File | Changes | Priority |
|------|---------|----------|
| `src/components/HeroSection.tsx` | Change `<h3>` to `<h2>` line 92, add image dimensions | P0 |
| `src/components/TrustReasonsSection.tsx` | Change `<h4>` to `<h2>`, `<h5>` to `<h3>` | P0 |
| `src/components/InsidersSection.tsx` | Change `<h3>` to `<h2>`, add lazy loading + dimensions | P0/P1 |
| `src/components/Footer.tsx` | Fix 4 framework URLs | P0 |
| `supabase/functions/prerender-marketing/index.ts` | Enhance homepage content, add CS locale, add nav | P0/P1 |
| `src/components/FeatureSection.tsx` | Add lazy loading to TÜV certificate image | P1 |
| `src/components/Navbar.tsx` | Add width/height to logo images | P1 |

---

## Validation Checklist (Post-Deploy)

### Immediate Tests
```bash
# Fetch raw HTML as Googlebot
curl -A "Googlebot" https://quantifier.ai/en/ | grep -E "<h1>|<h2>|<h3>"

# Check for H1
curl -A "Googlebot" https://quantifier.ai/en/ | grep -c "<h1>"  # Should be 1

# Check for H2s
curl -A "Googlebot" https://quantifier.ai/en/ | grep -c "<h2>"  # Should be 5+

# Check internal links
curl -A "Googlebot" https://quantifier.ai/en/ | grep -E "href=.*/(product|frameworks|plans|contact)"
```

### Google Search Console
1. URL Inspection on `https://quantifier.ai/en/`
2. Verify "Rendered HTML" shows H1, H2s, link text
3. Check Coverage report for any new issues

### Rich Results Test
- Test homepage for Organization, WebSite schemas
- Test framework pages for FAQPage schema

### Core Web Vitals
- Run Lighthouse on homepage before/after
- Check CLS specifically for image dimension changes

---

## Technical Notes

### Why Not Full SSR/SSG?
The current stack (Vite + React) is a SPA. Migrating to Next.js or Astro would be a major refactor. The prerender-for-bots approach is a valid alternative that:
- Serves optimized static HTML to crawlers
- Maintains the React SPA experience for users
- Is already implemented and working

The focus here is **enhancing the prerender quality**, not changing the architecture.

### Heading Hierarchy Rationale
```
<h1> End-to-end GRC. In one AI-native platform. (Hero - 1 per page)
  <h2> We support key compliance standards (Hero sub-section)
  <h2> Comprehensive AI-Powered Compliance Suite (Features)
    <h3> AI Compliance Officer (Feature cards)
    <h3> Document Management
    ...
  <h2> Why Teams Trust Us with Compliance (Trust)
    <h3> Peace of Mind, Powered by Automation (Trust cards)
    ...
  <h2> AI-Powered Compliance in Action (Platform screenshots)
  <h2> Compliance, powered by insiders (Partners)
  <h2> Tailored for Every Role (Roles)
    <h3> For Leadership & Executive
    ...
  <h2> Start Your AI-Powered Compliance Journey Today (CTA)
    <h3> For Enterprise
    ...
```

