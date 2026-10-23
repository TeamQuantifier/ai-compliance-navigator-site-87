# Project Instructions

## Architecture rules

- Product UI mockup copy (dashboards, wizards, tables shown on marketing pages) must be locale-aware through `useMockupText` from `src/lib/mockup-text.ts`, never hardcoded in one language — the same mockup component renders on `/pl`, `/en` and `/cs` routes, so a single-language string shows the wrong language on the other two.
- Keep mockup copy in the component file rather than the translation bundles: it is sample product data, not site chrome, and it changes with the product, not with the release.
- Regulatory terminology in mockups follows the site glossary: `NIS2` stays `NIS2` on every locale, the Polish implementing act is `KSC`, and Czech framework names follow the Czech localization memory rules.
