Fix missing Polish translations for the "Trusted by" section on the homepage.

**Problem:** The `featuredBy` translation keys exist in `en.json` and `cs.json` but are missing from `pl.json`. Because `i18next` is configured with `fallbackLng: 'en'`, the missing Polish keys fall back to English text instead of using the component's Polish `defaultValue`.

**Fix:** Add the missing `featuredBy` object to `public/locales/pl/translation.json` with Polish translations matching the `defaultValue` already defined in `FeaturedBySection.tsx`.

**Keys to add:**
- `featuredBy.badge`: "Zaufali nam"
- `featuredBy.title`: "Wyróżnieni przez ekspertów i instytucje"
- `featuredBy.subtitle`: "Nasze technologie zdobywają uznanie ekspertów, a współpraca z czołowymi instytucjami pozwala nam współtworzyć standardy cyberbezpieczeństwa, AI i compliance."

No other files need to change.