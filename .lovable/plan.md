

## Analysis: Why pages are discovered but not indexed

### Root cause

I fetched one of your pages (`/cs/frameworks/iso-27001/`) and received **an empty SPA shell** — just `<div id="root"></div>` with no rendered content. This means Google's crawler is likely seeing the same thing: an empty page with no meaningful HTML to index.

Your site relies on the **Netlify Prerender Extension** to serve rendered HTML to bots. If this extension is not active or misconfigured in your Netlify dashboard, Google sees only the blank shell from `index.html` (which has a generic hardcoded title "Quantifier.ai | AI-Native Compliance Platform for Organizations" — the same for every page).

### What you need to check (outside this codebase)

1. **Netlify Dashboard → Prerender Extension**: Verify it is installed and enabled. It must be set to **"Wait for `window.prerenderReady`"** — your code already sets this flag via the `usePrerenderReady` hook and `PageTemplate`.

2. **Test with Google's URL Inspection tool**: In GSC, use "URL Inspection" → "Test Live URL" on any of these pages. Check the rendered HTML — if Google sees content (headings, text, meta tags), the problem is just crawl budget/timing and manual indexing requests will work. If it sees an empty page, prerendering is broken.

3. **Verify bot User-Agent rendering**: Use `curl` with Googlebot UA to test:
   ```
   curl -A "Googlebot" https://quantifier.ai/cs/frameworks/iso-27001/
   ```
   If you get the empty shell, prerendering is not intercepting bot requests.

### What's fine in the codebase

- All pages have correct routes in `App.tsx`
- All pages are in the dynamic sitemap
- `robots.txt` allows all paths
- `PageTemplate` sets proper canonical, hreflang, meta robots (`index, follow`), and JSON-LD
- `window.prerenderReady` signal is implemented correctly
- The prerender Edge Function (`prerender-marketing`) has content for all these pages in all 3 languages

### Recommendation

**No code changes needed.** The issue is almost certainly that the Netlify Prerender Extension is either not installed or not configured to wait for `window.prerenderReady`. Once prerendering works:

- Google will see full HTML with proper `<title>`, `<meta description>`, structured data
- Pages should get indexed naturally within days
- You can then use GSC "Request Indexing" to speed up the process

If prerendering is already enabled and you confirm Google sees rendered content via "Test Live URL," then yes — simply requesting indexing manually for each URL should be sufficient. Google sometimes delays indexing low-authority or thin-content pages, and manual requests help.

