

## Analysis: Replace Book Popup with Postgraduate Studies Section

### Current State

**BookPromoPopup** (`src/components/BookPromoPopup.tsx`):
- Shows popup after 2s delay (sessionStorage key: `book_promo_shown`)
- Contains book image + title + description + CTA button
- Links to success-stories page
- Uses Dialog component from shadcn

**PostgraduatePromoSection** (`src/components/PostgraduatePromoSection.tsx`):
- Static section (not a popup)
- Already has PL/EN/CS translations with localized images
- Desktop: Image left (600px), text right (right-aligned)
- Has double-click zoom feature
- Links to university recruitment URL

### What Needs to Change

Replace the entire BookPromoPopup content with the postgraduate studies promotion:
1. Keep the popup mechanics (2s delay, sessionStorage, Dialog)
2. Replace book content with postgraduate section layout
3. Keep the localized content system (PL/EN/CS)
4. Remove the book-specific elements
5. Keep the zoom feature for the image

### Technical Approach

1. **Rename/Replace Component**: Convert `BookPromoPopup.tsx` to show postgraduate content instead of book
2. **Update Layout**: Adapt the postgraduate section layout to work inside a Dialog (similar structure: image left, text right)
3. **Keep Localization**: Use the same CONTENT mapping from PostgraduatePromoSection
4. **Update sessionStorage Key**: Change from `book_promo_shown` to `postgraduate_promo_shown` (new popup = reset for all users)
5. **Remove BookPromoSection from SuccessStories page** (optional - or keep both)

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/BookPromoPopup.tsx` | Complete rewrite - replace book content with postgraduate content |
| `src/pages/SuccessStories.tsx` | Remove `<BookPromoSection />` import and usage (since popup replaces it) |

