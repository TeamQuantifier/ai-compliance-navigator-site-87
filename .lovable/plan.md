
## Co robimy

1. **Nowa podstrona** `Information Security Policy` (Polityka Bezpieczeństwa Informacji) z pełnymi treściami z dostarczonego pliku — 3 wersje językowe (PL, EN, CS).
2. **Uzupełnienie czeskich tłumaczeń** dla istniejących podstron `/legal/privacy` i `/legal/terms` — obecnie czeski plik `public/locales/cs/translation.json` ma uproszczoną, starą strukturę (np. `legal.privacy` ma tylko `intro/dataCollection/dataUse/contact/thirdParty`), podczas gdy komponenty `PrivacyPolicy.tsx` i `TermsOfService.tsx` używają pełnej struktury obecnej w EN/PL (sekcje 1–13 dla privacy, `useOfService/intellectualProperty/thirdParty/contact` dla terms). Bez tego CS pokazuje surowe klucze.
3. **Footer** — dodanie linków do Privacy / Terms / Information Security Policy w sekcji **Company** (linki na dole stopki zostawiamy bez zmian — istnieją w obu miejscach).

Nie ruszamy istniejących stron `/legal/privacy` i `/legal/terms` — tylko dopełniamy tłumaczenia czeskie.

## Pliki do zmiany

### Nowa strona
- `src/pages/legal/InformationSecurityPolicy.tsx` — analogiczna struktura do `PrivacyPolicy.tsx`, używa `useLanguage()` + `PageTemplate`, sekcje 1–8 zgodnie z dokumentem.

### Routing
- `src/App.tsx` — import + nowa trasa:
  ```
  <Route path="/:locale/legal/information-security" element={<InformationSecurityPolicy />} />
  ```

### Tłumaczenia (`public/locales/{en,pl,cs}/translation.json`)
- Dodać klucz **`legal.informationSecurity`** w EN, PL, CS z polami:
  - `title`, `metaDescription`, `lastUpdated`
  - `intro.title`, `intro.p1`, `intro.p2`
  - `commitments.title`, `commitments.intro`, `commitments.items[1..8]`, `commitments.review`
  - `scope.title`, `scope.intro`, `scope.items[1..8]`
  - `governance.title`, `governance.content`
  - `employees.title`, `employees.intro`, `employees.items[1..6]`
  - `suppliers.title`, `suppliers.intro`, `suppliers.items[1..4]`, `suppliers.consequence`
  - `incidents.title`, `incidents.content`, `incidents.contactLabel`, `incidents.handling`
  - `review.title`, `review.content`
  
  PL = treść polska z dokumentu, EN = treść angielska z dokumentu, CS = wierne tłumaczenie czeskie.

- **Uzupełnić CS** `legal.privacy` w `public/locales/cs/translation.json` o pełną strukturę z EN/PL (klucze: `lastUpdated`, `admin.{title,content,contactEmail}`, `dataProcessed.{title,intro,formData,technicalData}`, `purposes.{title,newsletter.*,contact.*,security.*}`, `recipients.*`, `googleServices.*`, `internationalTransfer.*`, `retention.*`, `rights.*`, `complaint.*`, `mandatory.*`, `automatedDecisions.*`, `cookies.*`, `changes.*`). Stare klucze (`intro`, `dataCollection`, `dataUse`, `thirdParty`) usuwamy — nie są używane przez komponent.

- **Uzupełnić CS** `legal.terms` o brakujące `lastUpdated` jeśli wymagane (komponent używa `legal.cookies.lastUpdated` — zostaje).

- Dodać klucz w sekcji `footer.legal` (PL/EN/CS):
  - `informationSecurity` = "Polityka Bezpieczeństwa Informacji" / "Information Security Policy" / "Zásady bezpečnosti informací"
  - Etykiety `privacy/terms` (które są też w `footer.legal`) wykorzystamy też w nowej sekcji Company.

### Footer
- `src/components/Footer.tsx` — w sekcji **Company** (po linku „Plans") dodać 3 nowe pozycje:
  ```
  <Link to={`/${currentLocale}/legal/privacy`}>{t('footer.legal.privacy')}</Link>
  <Link to={`/${currentLocale}/legal/terms`}>{t('footer.legal.terms')}</Link>
  <Link to={`/${currentLocale}/legal/information-security`}>{t('footer.legal.informationSecurity')}</Link>
  ```
  Bottom-row linki (Privacy/Terms/Cookies) zostawiamy bez zmian.

### Sitemap (opcjonalnie, ale spójność SEO)
- `supabase/functions/sitemap/index.ts` — jeśli zawiera listę legal pages dla wszystkich locali, dodać `/legal/information-security` × 3 locale. Sprawdzę przed edycją.

## Czego NIE robimy
- Nie zmieniamy `PrivacyPolicy.tsx` ani `TermsOfService.tsx`.
- Nie zmieniamy istniejących tras `/legal/privacy`, `/legal/terms`, `/legal/cookies`.
- Nie zmieniamy dolnego paska legal w stopce.
