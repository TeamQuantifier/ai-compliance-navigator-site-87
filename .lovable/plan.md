
# Split Result into Two Visual Sections

## What Needs to Change

Currently the result body is stored as a single multi-section text blob and rendered as one plain `<p>` tag (line 239 of `FormularzPage.tsx`). The goal is to split it visually into two distinct sections with clear headers and formatted bullet lists.

## Data Structure (existing, no DB changes needed)

Each `body` field already contains two natural sections separated by a heading line:

| Language | Section 2 divider string |
|---|---|
| PL | `Jak Quantifier może pomóc` |
| EN | `How Quantifier can help` |
| CS | `Jak může Quantifier pomoci` |

Section 1 title headers also exist in the body:

| Language | Section 1 header |
|---|---|
| PL | `Co to oznacza` |
| EN | `What this means` |
| CS | `Co to znamená` |

## What the Rendered Output Will Look Like

```text
┌──────────────────────────────────────────────────┐
│  🔴 Badge: Wysokie ryzyko...                      │
│  H2: Wysokie ryzyko związane z łańcuchem dostaw   │
├──────────────────────────────────────────────────┤
│  [Section 1 card]                                 │
│  Header: Co to oznacza                            │
│  Paragraph text...                                │
│                                                   │
│  Rekomendacje (sub-header)                        │
│  • bullet 1                                       │
│  • bullet 2                                       │
├──────────────────────────────────────────────────┤
│  [Section 2 card - purple accent]                 │
│  Header: Jak Quantifier może pomóc                │
│  Paragraph text...                                │
│  • bullet 1                                       │
│  • bullet 2                                       │
└──────────────────────────────────────────────────┘
```

## Technical Implementation

### 1. Add a `parseResultBody()` helper in `FormularzPage.tsx`

A function that:
- Takes the raw `body` string and the `lang`
- Finds the divider line (e.g. `"Jak Quantifier może pomóc"`) and splits the text into `section1` and `section2` strings
- Returns `{ section1: string; section2: string; section2Header: string }`

Divider map per language:
```ts
const SECTION2_HEADERS = {
  pl: 'Jak Quantifier może pomóc',
  en: 'How Quantifier can help',
  cs: 'Jak může Quantifier pomoci',
};
```

### 2. Add a `BodySection` render component

A small helper component that:
- Accepts a raw text block
- Splits it into lines
- Lines starting with `•` become `<li>` items inside a styled `<ul>`
- All-caps or short lines (like `Rekomendacje`, `Doporučení`) become `<h4>` sub-headers
- Remaining lines become `<p>` paragraphs
- Empty lines are ignored (used as spacing)

### 3. Replace the single `<p>` on line 239

The current:
```tsx
<p className="text-gray-700 leading-relaxed">{result.body}</p>
```

Will be replaced with two styled section blocks:

```tsx
{/* Section 1: Co to oznacza */}
<div className="mb-6">
  <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-3">
    {SECTION1_HEADERS[lang]}
  </h3>
  <BodySection text={parsed.section1} />
</div>

{/* Section 2: Jak Quantifier może pomóc */}
<div className="mt-6 pt-6 border-t border-[#e0e2e9] bg-[#6d38a8]/5 rounded-xl p-5">
  <h3 className="text-sm font-bold uppercase tracking-wide text-[#6d38a8] mb-3">
    {parsed.section2Header}
  </h3>
  <BodySection text={parsed.section2} />
</div>
```

### Files Changed

- **`src/pages/formularz/FormularzPage.tsx`** — only file changed:
  - Add `parseResultBody()` helper function (~15 lines)
  - Add `BodySection` render component (~25 lines)
  - Add `SECTION1_HEADERS` constant for per-lang labels
  - Replace `<p>{result.body}</p>` with two-section layout (~20 lines)

No database changes, no new files, no new dependencies.
