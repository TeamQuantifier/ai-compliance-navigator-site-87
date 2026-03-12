

## Diagnosis: Why 175 Pages Are Not Indexed

### Critical Bug Found: `/about` Route Missing from Router

The page component `src/pages/About.tsx` exists (175 lines of rich content), but it is **never imported or registered** in `App.tsx`. This means:

- `/en/about/` → **404**
- `/pl/about/` → **404**  
- `/cs/about/` → **404**

I verified this by fetching the live URLs — both `/en/about/` and `/cs/about/` return a rendered 404 page to Google's crawler. **Google will not index pages that return 404.**

### Other Unindexed Pages — Likely Timing

The remaining ~172 unindexed pages are most likely a timing issue. You said the sitemap was submitted yesterday — Google typically takes **3-14 days** to process new URLs. This is normal behavior, especially for a site that just expanded from fewer pages to 225.

### Thin Content Risk

Some pages like `ValueChain`, `Managers`, `Contributors`, `Auditor` contain only a single paragraph of text. Google may eventually flag these as "Crawled — currently not indexed" due to thin content. This is not blocking now but worth noting.

---

## Plan

### 1. Fix the missing About route in App.tsx
- Import `About` from `./pages/About`
- Add route: `<Route path="/:locale/about" element={<About />} />`

This is a one-line import + one-line route addition. Fixes 3 broken pages immediately.

### 2. No other changes needed
The sitemap, hreflang, canonical URLs, prerendering — all are correctly configured. The remaining unindexed pages should be picked up by Google within the next 1-2 weeks.

### Post-fix recommendation
After deploying, use Google Search Console's "URL Inspection" tool to request re-indexing of `/en/about/`, `/pl/about/`, and `/cs/about/` to speed up recovery.

