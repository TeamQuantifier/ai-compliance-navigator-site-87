

# Add Privacy link to Footer Company section

## Change

Add a "Privacy Policy" link at the bottom of the Company section in the Footer, using the existing translation key `footer.legal.privacy` and linking to `/{currentLocale}/legal/privacy`.

## File changes

### `src/components/Footer.tsx`

After the Contact link (line 138-139), add a new `<li>` with a Link to `/${currentLocale}/legal/privacy` using `t('footer.legal.privacy')` as the label. The translation key already exists in all three locales (PL, EN, CS) since it's used in the bottom legal bar.

No translation file changes needed -- the key `footer.legal.privacy` is already defined in all locales.

