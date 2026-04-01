

## Update Compare Pages — Factually Defensive Competitor Comparisons

### Critical Bug Fix First
Fix runtime error: `ApiIntegrations is not defined` in App.tsx. The file was already cleaned but the preview may have a stale reference. Will verify and fix if needed.

### Current Problems Identified

**Table data is factually wrong across all 3 pages:**
- Vanta marked as `false` for NIS2, DORA, AI — Vanta publicly documents all three
- Drata marked as `false` for NIS2, DORA — Drata publicly documents both
- Sprinto marked as `false` for NIS2, DORA, TPRM, AI — Sprinto publicly documents all
- Quantifier marked `true` for EU data hosting — not publicly confirmed on quantifier.ai
- Differentiator copy claims competitors "don't cover" things they actually do

**Missing sections:** No FAQ, no "who is it for", no "when competitor is better", no disclaimer.

---

### Plan

#### 1. Update `ComparePage.tsx` component
- Change `featureKeys` array to new 10 rows matching the brief
- Update `getIcon` to handle `"unconfirmed"` status → renders gray text "Not publicly confirmed"
- Add new sections after differentiators:
  - **Who this alternative is best for** (i18n-driven)
  - **When Quantifier is the better fit** (i18n-driven)  
  - **When the competitor may be the better fit** (i18n-driven)
  - **Why EU-regulated teams may prefer Quantifier** (i18n-driven)
  - **FAQ section** using existing `FAQSection` component
  - **Disclaimer** microcopy below table + legend explanation
- Fix CTA button styling (already done previously, verify)

#### 2. Update `compare.common.features` in all 3 locale files
New feature labels (replacing old 10):
1. Multi-framework compliance
2. AI-driven / agentic compliance workflows  
3. Continuous compliance monitoring
4. Dedicated NIS2 support
5. Dedicated DORA support
6. Full ESG / CSRD reporting workflows
7. Third-party / supply chain risk management
8. Publicly documented EU data hosting
9. Automated evidence collection
10. AI-assisted risk assessment

#### 3. Update comparison values per competitor

**Vanta:** NIS2 → `true`, DORA → `true`, AI workflows → `true`, TPRM → `true`, evidence → `true`, risk → `true`, continuous → `true`, multi-framework → `true`, ESG/CSRD → `false`, EU hosting → `partial`

**Drata:** NIS2 → `true`, DORA → `true`, AI workflows → `true`, TPRM → `true`, evidence → `true`, risk → `true`, continuous → `true`, multi-framework → `true`, ESG/CSRD → `false`, EU hosting → `unconfirmed`

**Sprinto:** NIS2 → `true`, DORA → `true`, AI workflows → `true`, TPRM → `true`, evidence → `true`, risk → `true`, continuous → `true`, multi-framework → `true`, ESG/CSRD → `false`, EU hosting → `false`

**Quantifier:** All `true` except EU hosting → `unconfirmed` (not publicly confirmed on quantifier.ai)

#### 4. Rewrite differentiator copy
Remove claims that competitors "don't have" features they publicly document. Focus on:
- EU regulatory depth (NIS2 + DORA + GDPR + ESG in one environment)
- ESG/CSRD workflows (clear differentiator)
- Value chain / supplier collaboration depth
- AI agent coordination approach
- Multi-framework governance in single environment

#### 5. Add new i18n sections per competitor (EN, PL, CS)
- `bestFor` — who this alternative page is for
- `whenQuantifier` — when Quantifier is the better fit
- `whenCompetitor` — when the competitor may be the better fit  
- `whyEu` — why EU teams may prefer Quantifier
- `faq` — array of 5-6 Q&A items
- `disclaimer` — comparison disclaimer text
- `legendNote` — legend explanation text

#### 6. SEO improvements
- Improve `seo.title` and `seo.description` for each page (natural keyword usage)
- Keep existing JSON-LD SoftwareApplication schema

### Files to edit
1. `src/pages/compare/ComparePage.tsx` — new sections, updated feature keys, disclaimer, FAQ integration
2. `public/locales/en/translation.json` — full rewrite of `compare` namespace
3. `public/locales/pl/translation.json` — full rewrite of `compare` namespace  
4. `public/locales/cs/translation.json` — full rewrite of `compare` namespace
5. `src/i18n/locales/en.json` — mirror compare keys if present
6. `src/i18n/locales/pl.json` — mirror compare keys if present

### Scope estimate
~3 files of code changes + 3 large translation file updates. No database or routing changes needed.

