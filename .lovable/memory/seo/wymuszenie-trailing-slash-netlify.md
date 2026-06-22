---
name: Netlify trailing slash enforcement
description: 301 redirects in netlify.toml enforce trailing slash on all paths, including language roots /en, /pl, /cs
type: feature
---
All URLs on quantifier.ai must end with a trailing slash. `netlify.toml` contains 301 redirects from non-slash to slash variants for content paths AND for the language roots `/en` → `/en/`, `/pl` → `/pl/`, `/cs` → `/cs/` (force=true, placed before the SPA fallback). This prevents duplicate URL indexing when canonical alone is insufficient.
