

# GDPR/ePrivacy-Compliant Cookie Consent System Implementation Plan

## Executive Summary

This plan implements a fully GDPR/ePrivacy-compliant cookie consent system for quantifier.ai. The key requirement is **blocking all non-essential tracking scripts until explicit consent is obtained**. Currently, Google Tag Manager, Google Analytics, and Microsoft Clarity load immediately in `index.html` - this violates GDPR/ePrivacy regulations.

---

## Current State Analysis

### Problem: Scripts Load Before Consent

```html
<!-- index.html - CURRENT (NON-COMPLIANT) -->
<head>
  <!-- GTM loads immediately - VIOLATION -->
  <script>(function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-TF3F89BP');</script>
  
  <!-- GA4 loads immediately - VIOLATION -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-PN6YD4Z1D5"></script>
  
  <!-- Clarity loads immediately - VIOLATION -->
  <script type="text/javascript">(function(c,l,a,r,i,t,y){...})(window, document, "clarity", "script", "v4vvg5pveg");</script>
</head>
```

### Compliance Checklist (from user request)
| Requirement | Current | After Implementation |
|-------------|---------|---------------------|
| No GA/GTM/Clarity before consent | NO | YES |
| "Reject non-essential" on first layer | N/A | YES |
| Consent = positive action (not scroll) | N/A | YES |
| Change mind from footer in 2 clicks | N/A | YES |

---

## Architecture Overview

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                           index.html                                     │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  REMOVE: GTM, GA4, Clarity inline scripts                       │    │
│  │  KEEP: preconnect/dns-prefetch (no tracking, just performance)  │    │
│  └─────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        React App (App.tsx)                               │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  <CookieConsentProvider>                                         │    │
│  │    ├── Manages consent state                                     │    │
│  │    ├── Loads scripts ONLY after consent                          │    │
│  │    └── Provides context to components                            │    │
│  │                                                                   │    │
│  │  <CookieConsentBanner />  (first layer)                          │    │
│  │    ├── Accept All / Reject Non-Essential / Manage Preferences    │    │
│  │    └── Links to Privacy & Cookie Policy                          │    │
│  │                                                                   │    │
│  │  <CookiePreferencesModal /> (second layer)                       │    │
│  │    ├── Category toggles (Necessary locked, others default OFF)   │    │
│  │    └── Save / Accept All / Reject All buttons                    │    │
│  └─────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     Consent Manager (lib/consent.ts)                     │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  Storage: Cookie "qa_consent" (6 months, JSON)                   │    │
│  │  API:                                                            │    │
│  │    - getConsent(): ConsentState                                  │    │
│  │    - setConsent(categories): void                                │    │
│  │    - hasConsent(category): boolean                               │    │
│  │    - onConsentChange(callback): unsubscribe                      │    │
│  │    - revokeConsent(category): void (+ cookie cleanup)            │    │
│  └─────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Plan

### Phase 1: Consent Manager Utility

**File: `src/lib/consent.ts`**

Core consent management with cookie storage:

```typescript
// Consent state interface
interface ConsentCategories {
  necessary: boolean;  // Always true, cannot be changed
  analytics: boolean;  // GA4, Clarity
  marketing: boolean;  // GTM (marketing tags)
  preferences: boolean; // Future: language, theme preferences
}

interface ConsentState {
  version: string;      // "2026-01-28" - re-prompt on change
  timestamp: string;    // ISO date of consent
  categories: ConsentCategories;
}

// Constants
const CONSENT_COOKIE_NAME = 'qa_consent';
const CONSENT_VERSION = '2026-01-28';
const CONSENT_EXPIRY_DAYS = 180; // 6 months

// Core functions
export function getConsent(): ConsentState | null;
export function setConsent(categories: Partial<ConsentCategories>): void;
export function hasConsent(category: keyof ConsentCategories): boolean;
export function needsConsent(): boolean; // true if no consent or version mismatch
export function onConsentChange(callback: (state: ConsentState) => void): () => void;
export function clearNonEssentialCookies(): void; // Best-effort cleanup
```

**Cookie cleanup on revocation:**
- `_ga`, `_ga_*` (Google Analytics)
- `_clck`, `_clsk` (Microsoft Clarity)

---

### Phase 2: Script Loader

**File: `src/lib/script-loader.ts`**

Loads tracking scripts only after consent:

```typescript
// Script configurations
const ANALYTICS_SCRIPTS = [
  {
    id: 'ga4',
    src: 'https://www.googletagmanager.com/gtag/js?id=G-PN6YD4Z1D5',
    init: () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { dataLayer.push(arguments); };
      gtag('js', new Date());
      gtag('config', 'G-PN6YD4Z1D5');
    }
  },
  {
    id: 'clarity',
    init: () => {
      (function(c,l,a,r,i,t,y){...})(window, document, "clarity", "script", "v4vvg5pveg");
    }
  }
];

const MARKETING_SCRIPTS = [
  {
    id: 'gtm',
    init: () => {
      (function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-TF3F89BP');
    }
  }
];

// Load scripts based on consent
export function loadConsentedScripts(categories: ConsentCategories): void;
```

---

### Phase 3: Cookie Consent Context

**File: `src/contexts/CookieConsentContext.tsx`**

React context for consent state:

```typescript
interface CookieConsentContextType {
  consent: ConsentState | null;
  showBanner: boolean;
  showModal: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (categories: Partial<ConsentCategories>) => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

export const CookieConsentProvider: React.FC<{children: ReactNode}>;
export const useCookieConsent: () => CookieConsentContextType;
```

---

### Phase 4: Cookie Consent Banner (First Layer)

**File: `src/components/cookies/CookieConsentBanner.tsx`**

UI requirements:
- Fixed position at bottom of viewport
- Same visual weight for all buttons (no dark patterns)
- Links to Privacy Policy and Cookie Policy
- Respects current locale

```text
┌─────────────────────────────────────────────────────────────────────────┐
│  🍪 We value your privacy                                               │
│                                                                          │
│  We use cookies to enhance your browsing experience, provide essential  │
│  functionality, and analyze site traffic. You can customize your        │
│  preferences or accept/reject non-essential cookies.                    │
│                                                                          │
│  [Privacy Policy] [Cookie Policy]                                       │
│                                                                          │
│  ┌──────────────┐  ┌─────────────────────┐  ┌───────────────────────┐   │
│  │  Accept All  │  │ Reject Non-Essential│  │ Manage Preferences    │   │
│  └──────────────┘  └─────────────────────┘  └───────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

**Accessibility:**
- `role="dialog"` with `aria-labelledby`
- Focus trap when banner is visible
- Keyboard navigation (Tab, Enter, Escape)

---

### Phase 5: Cookie Preferences Modal (Second Layer)

**File: `src/components/cookies/CookiePreferencesModal.tsx`**

Uses existing `Dialog` component from shadcn/ui:

```text
┌─────────────────────────────────────────────────────────────────────────┐
│  Cookie Preferences                                            [X]      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  Necessary Cookies                                    [■■■■■■]  │    │
│  │  Required for the website to function properly.      (locked)   │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  Analytics Cookies                                    [      ]  │    │
│  │  Help us understand how visitors interact with our    (off)     │    │
│  │  website. Includes Google Analytics and Clarity.                │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  Marketing Cookies                                    [      ]  │    │
│  │  Used to deliver personalized ads and measure        (off)      │    │
│  │  advertising campaign performance.                              │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  Preference Cookies                                   [      ]  │    │
│  │  Remember your settings like language and region.    (off)      │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌─────────────────────┐  ┌───────────────────────┐   │
│  │ Save Choices │  │ Reject Non-Essential│  │      Accept All       │   │
│  └──────────────┘  └─────────────────────┘  └───────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

**Accessibility:**
- Focus trap using Radix Dialog
- ESC closes modal
- All toggles keyboard accessible
- `aria-describedby` for each category

---

### Phase 6: Update index.html

**File: `index.html`**

Remove all tracking scripts, keep only performance hints:

```html
<head>
  <!-- REMOVED: GTM, GA4, Clarity scripts -->
  
  <!-- KEEP: DNS Prefetch & Preconnect (no tracking, just performance) -->
  <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>
  <link rel="preconnect" href="https://www.google-analytics.com" crossorigin>
  <link rel="dns-prefetch" href="https://zcrnfrijqasbrjrxconi.supabase.co">
  <link rel="dns-prefetch" href="https://www.clarity.ms">
  
  <!-- ... rest of head ... -->
</head>

<body>
  <!-- REMOVED: GTM noscript iframe -->
  <div id="root"></div>
  <!-- ... -->
</body>
```

---

### Phase 7: Update App.tsx

Wrap app with consent provider:

```tsx
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";
import { CookieConsentBanner } from "@/components/cookies/CookieConsentBanner";
import { CookiePreferencesModal } from "@/components/cookies/CookiePreferencesModal";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <LanguageProvider>
              <CookieConsentProvider>  {/* NEW */}
                <Toaster />
                <Sonner />
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-grow pt-16">
                    <Routes>...</Routes>
                  </main>
                  <Footer />
                </div>
                <CookieConsentBanner />  {/* NEW */}
                <CookiePreferencesModal />  {/* NEW */}
              </CookieConsentProvider>
            </LanguageProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);
```

---

### Phase 8: Update Footer.tsx

Add "Cookie Settings" link:

```tsx
// In the legal links section (around line 196-206)
<div className="flex flex-wrap gap-4 text-sm">
  <Link to={`/${currentLocale}/legal/privacy`} className="...">
    {t('footer.legal.privacy')}
  </Link>
  <Link to={`/${currentLocale}/legal/terms`} className="...">
    {t('footer.legal.terms')}
  </Link>
  <Link to={`/${currentLocale}/legal/cookies`} className="...">
    {t('footer.legal.cookies')}
  </Link>
  {/* NEW: Cookie Settings button */}
  <button 
    onClick={() => openCookiePreferences()}
    className="text-muted-foreground hover:text-primary transition-colors"
  >
    {t('footer.legal.cookieSettings')}
  </button>
</div>
```

---

### Phase 9: Add Translations

**Files: `public/locales/{en,pl,cs}/translation.json`**

Add new translation keys under `cookieConsent`:

```json
{
  "cookieConsent": {
    "banner": {
      "title": "We value your privacy",
      "description": "We use cookies to enhance your browsing experience, provide essential functionality, and analyze site traffic. You can customize your preferences or accept/reject non-essential cookies.",
      "acceptAll": "Accept All",
      "rejectNonEssential": "Reject Non-Essential",
      "managePreferences": "Manage Preferences"
    },
    "modal": {
      "title": "Cookie Preferences",
      "description": "Manage your cookie preferences. You can enable or disable different types of cookies below.",
      "saveChoices": "Save Choices",
      "acceptAll": "Accept All",
      "rejectAll": "Reject Non-Essential"
    },
    "categories": {
      "necessary": {
        "title": "Necessary Cookies",
        "description": "Required for the website to function properly. Cannot be disabled."
      },
      "analytics": {
        "title": "Analytics Cookies",
        "description": "Help us understand how visitors interact with our website. Includes Google Analytics and Microsoft Clarity."
      },
      "marketing": {
        "title": "Marketing Cookies",
        "description": "Used to deliver personalized advertisements and measure advertising campaign performance."
      },
      "preferences": {
        "title": "Preference Cookies",
        "description": "Remember your settings like language and region preferences."
      }
    }
  },
  "footer": {
    "legal": {
      "cookieSettings": "Cookie Settings"
    }
  }
}
```

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/lib/consent.ts` | CREATE | Consent manager utility |
| `src/lib/script-loader.ts` | CREATE | Script loading logic |
| `src/contexts/CookieConsentContext.tsx` | CREATE | React context for consent |
| `src/components/cookies/CookieConsentBanner.tsx` | CREATE | First layer banner |
| `src/components/cookies/CookiePreferencesModal.tsx` | CREATE | Second layer modal |
| `index.html` | MODIFY | Remove tracking scripts |
| `src/App.tsx` | MODIFY | Add consent provider |
| `src/components/Footer.tsx` | MODIFY | Add cookie settings link |
| `public/locales/en/translation.json` | MODIFY | Add EN translations |
| `public/locales/pl/translation.json` | MODIFY | Add PL translations |
| `public/locales/cs/translation.json` | MODIFY | Add CS translations |

---

## Technical Details

### Cookie Storage Format

```json
{
  "version": "2026-01-28",
  "timestamp": "2026-01-28T14:30:00.000Z",
  "categories": {
    "necessary": true,
    "analytics": false,
    "marketing": false,
    "preferences": false
  }
}
```

### Cookie Attributes
- Name: `qa_consent`
- Path: `/`
- SameSite: `Lax`
- Secure: `true` (in production)
- Max-Age: `15552000` (180 days = 6 months)

### Script Loading Order
1. User clicks "Accept All" or enables specific categories
2. Consent is saved to cookie
3. `onConsentChange` callback fires
4. `loadConsentedScripts()` checks each category
5. Scripts are dynamically injected into `<head>`

### Consent Revocation Flow
1. User opens preferences modal
2. Disables a category (e.g., analytics)
3. Clicks "Save Choices"
4. `setConsent()` updates cookie
5. `clearNonEssentialCookies()` removes known tracking cookies
6. Scripts already loaded cannot be "unloaded", but no new data is sent

---

## Validation Checklist

After implementation, verify:

| Test | Expected Result |
|------|-----------------|
| Fresh visit (no consent) | Banner shows, no GA/GTM/Clarity in Network tab |
| Click "Accept All" | Banner hides, GA/GTM/Clarity load, consent cookie set |
| Click "Reject Non-Essential" | Banner hides, only necessary cookie set, no tracking |
| Open preferences from footer | Modal opens in 1 click |
| Change consent in modal | Cookie updated, tracking cookies cleared if revoked |
| Reload page after consent | Banner stays hidden, scripts load per consent |
| Change `CONSENT_VERSION` | Banner re-appears on next visit |

---

## Edge Cases Handled

1. **Bot/Crawler visits**: Banner shows but crawlers typically don't interact; no tracking loads
2. **JavaScript disabled**: No tracking loads (compliant by default)
3. **Cookie blocked by browser**: Consent state persists in memory for session; re-prompts next visit
4. **Version change**: If `CONSENT_VERSION` changes, `needsConsent()` returns true, banner re-appears

