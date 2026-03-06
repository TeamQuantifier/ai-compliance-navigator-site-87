

## Plan: Thank You page URL for LinkedIn conversion tracking

### Problem
LinkedIn Ads conversion tracking needs a unique URL to fire on — currently the quiz results are shown on the same URL (`/cybersecurity-check`) by toggling `phase` state. No URL change happens when results appear.

### Solution
Use `useNavigate` + `useSearchParams` (or hash) to update the URL to include `/thank-you` suffix when results are displayed. This way LinkedIn can track conversions on that specific URL pattern.

### Changes

**1. `src/App.tsx`** — Add new routes for the thank-you pages:
```
/:locale/cybersecurity-check/thank-you → FormularzPage
/pl/sprawdz-cyberbezpieczenstwo/dziekujemy → FormularzPage
/cs/zkontrolujte-kybernetickou-bezpecnost/dekujeme → FormularzPage
```

**2. `src/pages/formularz/FormularzPage.tsx`**:
- Import `useNavigate` and `useLocation`
- When `setPhase('result')` is called, also `navigate` to the localized thank-you path (replace, no history push back to form):
  - PL: `/pl/sprawdz-cyberbezpieczenstwo/dziekujemy`
  - EN: `/en/cybersecurity-check/thank-you`
  - CS: `/cs/zkontrolujte-kybernetickou-bezpecnost/dekujeme`
- On mount, check if URL contains the thank-you suffix — if yes but no result data, redirect back to the quiz root
- When user clicks "retry" (back to filling), navigate back to the base quiz URL

**3. `netlify.toml`** — Add SPA fallback rules for the new paths so they don't 404 on direct load (already covered by the catch-all `/*` → `/index.html` rule).

This gives LinkedIn a distinct URL (`*/thank-you` or `*/dziekujemy`) to set as a conversion page, while preserving the single-page experience.

