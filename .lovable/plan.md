

# Plan: Napraw wyświetlanie strony (tłumaczenia, logo, cookie consent)

## Zidentyfikowane problemy

### 1. Tłumaczenia pokazują klucze zamiast tekstu
**Przyczyna**: Aplikacja renderuje się zanim pliki tłumaczeń zostaną załadowane. W konfiguracji i18n ustawiono `useSuspense: false`, co oznacza że komponenty renderują się natychmiast, nie czekając na załadowanie tłumaczeń.

### 2. Logo jest zamazane/dziwnie wyświetlane
**Przyczyna**: Konflikt między atrybutami `width`/`height` a klasami CSS. Obecnie logo ma `width="200" height="48"` ale CSS `h-12` może powodować problemy z proporcjami.

### 3. Cookie consent jest za skomplikowane
**Wymaganie użytkownika**: Prosty popup z jednym przyciskiem "Accept" zamiast pełnej implementacji GDPR z wieloma przyciskami.

---

## Rozwiązania

### Faza 1: Napraw ładowanie tłumaczeń (PRIORYTET KRYTYCZNY)

**Plik: `src/contexts/LanguageContext.tsx`**

Dodać mechanizm oczekiwania na załadowanie tłumaczeń przed renderowaniem treści:

```tsx
// Dodać state dla gotowości tłumaczeń
const [isReady, setIsReady] = useState(false);

// W useEffect sprawdzić czy tłumaczenia są załadowane
useEffect(() => {
  const checkReady = () => {
    if (i18n.isInitialized && i18n.hasLoadedNamespace('translation')) {
      setIsReady(true);
    }
  };
  
  checkReady();
  i18n.on('loaded', checkReady);
  
  return () => {
    i18n.off('loaded', checkReady);
  };
}, [i18n]);

// Eksportować isReady w kontekście
```

**Plik: `src/App.tsx`**

Dodać loading state który czeka na gotowość tłumaczeń:

```tsx
// Wewnątrz LanguageProvider dodać wrapper który pokazuje loading
// dopóki tłumaczenia się nie załadują

// Opcja 1: Proste rozwiązanie - pokazać pusty div podczas ładowania
{isLoading ? (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
  </div>
) : (
  // reszta aplikacji
)}
```

---

### Faza 2: Napraw wyświetlanie logo

**Plik: `src/components/Navbar.tsx`**

Zmienić atrybuty logo aby były spójne:

```tsx
{/* Full logotype on desktop - PRZED */}
<img 
  src="/logo-quantifier.png" 
  alt="Quantifier.ai"
  width="200"
  height="48"
  className="h-12 hidden sm:block" 
/>

{/* Full logotype on desktop - PO */}
<img 
  src="/logo-quantifier.png" 
  alt="Quantifier.ai"
  className="h-10 w-auto hidden sm:block" 
/>

{/* Sygnet only on mobile - PRZED */}
<img 
  src="/logo-sygnet.png" 
  alt="Quantifier.ai"
  width="48"
  height="48"
  className="h-12 w-12 sm:hidden" 
/>

{/* Sygnet only on mobile - PO */}
<img 
  src="/logo-sygnet.png" 
  alt="Quantifier.ai"
  className="h-10 w-10 sm:hidden" 
/>
```

Usunąć explicit `width`/`height` atrybuty i polegać na CSS `w-auto` dla zachowania proporcji.

---

### Faza 3: Uprość Cookie Consent do prostego "Accept"

**Plik: `src/components/cookies/CookieConsentBanner.tsx`**

Zmienić na prosty banner z jednym przyciskiem:

```tsx
export function CookieConsentBanner() {
  const { showBanner, acceptAll } = useCookieConsent();
  const { t, currentLocale } = useLanguage();

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      className="fixed bottom-0 left-0 right-0 z-[100] bg-background border-t border-border shadow-lg animate-in slide-in-from-bottom duration-300"
    >
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            {t('cookieConsent.banner.simpleDescription')}
            {' '}
            <Link
              to={`/${currentLocale}/legal/privacy`}
              className="text-primary hover:underline"
            >
              {t('footer.legal.privacy')}
            </Link>
          </p>
          <Button onClick={acceptAll} size="sm">
            {t('cookieConsent.banner.accept')}
          </Button>
        </div>
      </div>
    </div>
  );
}
```

**Usunąć plik: `src/components/cookies/CookiePreferencesModal.tsx`**
(Nie potrzebny przy uproszczonej wersji)

**Plik: `src/App.tsx`**

Usunąć import i użycie `CookiePreferencesModal`.

**Plik: `src/components/Footer.tsx`**

Usunąć przycisk "Cookie Settings" z footera.

**Pliki tłumaczeń**: Dodać nowe klucze:

```json
"cookieConsent": {
  "banner": {
    "simpleDescription": "We use cookies to enhance your browsing experience.",
    "accept": "Accept"
  }
}
```

---

## Podsumowanie zmian w plikach

| Plik | Zmiana |
|------|--------|
| `src/contexts/LanguageContext.tsx` | Dodać `isReady` state i event listener na załadowanie tłumaczeń |
| `src/App.tsx` | Dodać loading spinner gdy tłumaczenia się ładują, usunąć `CookiePreferencesModal` |
| `src/components/Navbar.tsx` | Poprawić atrybuty logo (usunąć width/height, użyć w-auto) |
| `src/components/cookies/CookieConsentBanner.tsx` | Uprościć do jednego przycisku "Accept" |
| `src/components/cookies/CookiePreferencesModal.tsx` | USUNĄĆ |
| `src/components/Footer.tsx` | Usunąć przycisk "Cookie Settings" |
| `src/contexts/CookieConsentContext.tsx` | Usunąć `showModal`, `openPreferences`, `closePreferences` |
| `public/locales/en/translation.json` | Dodać `cookieConsent.banner.simpleDescription` i `accept` |
| `public/locales/pl/translation.json` | Dodać polskie tłumaczenia |
| `public/locales/cs/translation.json` | Dodać czeskie tłumaczenia |

---

## Oczekiwany rezultat

1. **Tłumaczenia**: Strona pokaże krótki loading spinner zanim załadują się tłumaczenia, potem wyświetli poprawny tekst
2. **Logo**: Wyraźne logo bez rozmycia, zachowujące proporcje
3. **Cookie consent**: Prosty pasek na dole strony z jednym przyciskiem "Accept"

