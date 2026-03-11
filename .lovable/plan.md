

## Sekcja "Studia podyplomowe" na stronie Success Stories (tylko PL)

### Co robimy

Dodajemy nowy komponent `PostgraduatePromoSection` wyświetlany **tylko dla `currentLocale === 'pl'`**, umieszczony w `SuccessStories.tsx` tuż pod `<BookPromoSection />`.

### Layout
- Grafika z lewej strony (uploaded image), tekst z prawej
- Styl analogiczny do BookPromoSection (gradient bg, rounded, shadow)
- Na mobile: grafika na górze, tekst pod spodem

### Treść (propozycja)

- **Badge**: `Studia podyplomowe`
- **Headline**: `Nasi eksperci na Uniwersytecie Ekonomicznym we Wrocławiu`
- **Opis**: `Zespół Quantifier.ai współtworzy kierunek „GRC z wykorzystaniem AI: Governance, Risk & Compliance w nowoczesnych organizacjach" na studiach podyplomowych Uniwersytetu Ekonomicznego we Wrocławiu. Łączymy praktykę biznesową z najnowszą wiedzą akademicką.`
- **CTA button**: `Dowiedz się więcej` → link do strony rekrutacji (placeholder URL, do uzupełnienia)

### Zmiany w plikach

1. **Skopiować grafikę** z `user-uploads://` do `public/lovable-uploads/studia-podyplomowe-wroclaw.jpg`
2. **Nowy komponent** `src/components/PostgraduatePromoSection.tsx` — analogiczny do BookPromoSection, grafika po lewej
3. **`src/pages/SuccessStories.tsx`** — dodać `{currentLocale === 'pl' && <PostgraduatePromoSection />}` pod BookPromoSection

