
# Plan: Popup reklamowy ksiazki + sekcja na stronie Success Stories

## Podsumowanie

Stworzenie dwoch elementow:
1. **Popup reklamowy** - wyswietlany raz na sesje dla kazdego odwiedzajacego
2. **Sekcja promocyjna** - statyczna sekcja pod hero na stronie `/success-stories`

Oba elementy beda uzywac tego samego zdjecia ksiazki i podobnego copy.

---

## Architektura rozwiazania

```text
+------------------+     +------------------------+
|   App.tsx        |     |  SuccessStories.tsx    |
+------------------+     +------------------------+
        |                          |
        v                          v
+------------------+     +------------------------+
| BookPromoPopup   |     | BookPromoSection       |
| (global, raz/    |     | (pod hero section)     |
|  sesja)          |     |                        |
+------------------+     +------------------------+
        |                          |
        +----------+---------------+
                   |
                   v
        +---------------------+
        | Zdjecie ksiazki     |
        | (public/lovable-    |
        |  uploads/)          |
        +---------------------+
```

---

## Elementy do stworzenia

### 1. Skopiowanie obrazka ksiazki

Obraz z `user-uploads://KsiazkaAnalizaPOdwojnejIstotnosci.png` zostanie skopiowany do `public/lovable-uploads/book-analiza-podwojnej-istotnosci.png`

### 2. Komponent `BookPromoPopup.tsx`

Nowy komponent w `src/components/BookPromoPopup.tsx`:

- Uzywa Radix Dialog z istniejacego UI
- Sprawdza `sessionStorage` pod kluczem `book_promo_shown`
- Wyswietla sie automatycznie po zaladowaniu strony (z malym opoznieniem 2s dla UX)
- Zawiera:
  - Zdjecie ksiazki (po lewej/gora na mobile)
  - Naglowek: "Zobacz nasza publikacje"
  - Opis z copy podanego przez uzytkownika
  - Przycisk "Zobacz ksiazke" linkujacy do `/success-stories`
- Po zamknieciu zapisuje flage w sessionStorage

Logika sesji:
```typescript
const STORAGE_KEY = 'book_promo_shown';

// Przy renderowaniu
const hasBeenShown = sessionStorage.getItem(STORAGE_KEY) === 'true';

// Po zamknieciu
sessionStorage.setItem(STORAGE_KEY, 'true');
```

### 3. Sekcja `BookPromoSection` na stronie Success Stories

Nowy komponent w `src/components/BookPromoSection.tsx` lub bezposrednio w `SuccessStories.tsx`:

- Umieszczony bezposrednio pod hero section
- Layout: zdjecie ksiazki + tekst obok (responsive)
- To samo copy co w popup
- Bez przycisku (lub z innym CTA, np. link do zakupu/wiecej info)

### 4. Integracja w `App.tsx`

Dodanie `<BookPromoPopup />` obok `<CookieConsentBanner />` - renderowany globalnie.

### 5. Tlumaczenia

Dodanie kluczy do plikow `public/locales/{en,pl,cs}/translation.json`:

```json
"bookPromo": {
  "title": "Zobacz nasza publikacje",
  "description": "Ksiazka pokazuje praktyczne podejscie do analizy krok po kroku, wzbogacone o case study oparte na setkach projektow ESG zrealizowanych przez zespol Envirly by Quantifier.",
  "cta": "Zobacz ksiazke",
  "sectionTitle": "Nasza najnowsza publikacja"
}
```

---

## Szczegoly techniczne

### Struktura komponentu BookPromoPopup

```typescript
// src/components/BookPromoPopup.tsx
import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { X } from 'lucide-react';

const STORAGE_KEY = 'book_promo_shown';
const POPUP_DELAY_MS = 2000;

export function BookPromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLocale, t } = useLanguage();

  useEffect(() => {
    // Sprawdz czy juz pokazano w tej sesji
    const hasBeenShown = sessionStorage.getItem(STORAGE_KEY) === 'true';
    if (hasBeenShown) return;

    // Pokaz po opoznieniu
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, POPUP_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem(STORAGE_KEY, 'true');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl">
        {/* Layout: image + text */}
        {/* Button linking to success-stories */}
      </DialogContent>
    </Dialog>
  );
}
```

### Struktura sekcji BookPromoSection

```typescript
// src/components/BookPromoSection.tsx
import { useLanguage } from '@/contexts/LanguageContext';
import { Book } from 'lucide-react';

export function BookPromoSection() {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-slate-50 to-compliance-50 rounded-xl p-8 mb-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img 
          src="/lovable-uploads/book-analiza-podwojnej-istotnosci.png"
          alt="Analiza podwojnej istotnosci - ksiazka"
          className="w-48 md:w-64 shadow-xl rounded"
        />
        <div>
          <h3 className="text-2xl font-bold mb-4">{t('bookPromo.sectionTitle')}</h3>
          <p className="text-slate-600">{t('bookPromo.description')}</p>
        </div>
      </div>
    </div>
  );
}
```

---

## Lista plikow do modyfikacji/stworzenia

| Plik | Akcja |
|------|-------|
| `public/lovable-uploads/book-analiza-podwojnej-istotnosci.png` | Skopiowac obraz |
| `src/components/BookPromoPopup.tsx` | Nowy plik |
| `src/components/BookPromoSection.tsx` | Nowy plik |
| `src/App.tsx` | Dodac import i render `<BookPromoPopup />` |
| `src/pages/SuccessStories.tsx` | Dodac `<BookPromoSection />` pod hero |
| `public/locales/pl/translation.json` | Dodac klucze `bookPromo.*` |
| `public/locales/en/translation.json` | Dodac klucze `bookPromo.*` (EN) |
| `public/locales/cs/translation.json` | Dodac klucze `bookPromo.*` (CS) |

---

## Zachowanie UX

1. Uzytkownik wchodzi na strone
2. Po 2 sekundach pojawia sie popup z ksiazka
3. Uzytkownik moze:
   - Kliknac "Zobacz ksiazke" - przekierowanie na `/success-stories`, popup sie zamyka
   - Kliknac X lub tlo - popup sie zamyka
4. Popup nie pojawia sie ponownie w tej sesji przegladarki
5. Na stronie `/success-stories` widoczna jest stala sekcja z ksiazka pod hero

---

## Tlumaczenia

**Polski (domyslny):**
```json
"bookPromo": {
  "title": "Zobacz nasza publikacje",
  "description": "Ksiazka pokazuje praktyczne podejscie do analizy krok po kroku, wzbogacone o case study oparte na setkach projektow ESG zrealizowanych przez zespol Envirly by Quantifier.",
  "cta": "Zobacz ksiazke",
  "sectionTitle": "Nasza najnowsza publikacja"
}
```

**Angielski:**
```json
"bookPromo": {
  "title": "Check out our publication",
  "description": "This book presents a practical step-by-step approach to analysis, enriched with case studies based on hundreds of ESG projects completed by the Envirly by Quantifier team.",
  "cta": "See the book",
  "sectionTitle": "Our latest publication"
}
```

**Czeski:**
```json
"bookPromo": {
  "title": "Podivejte se na nasi publikaci",
  "description": "Kniha ukazuje prakticky pristup k analyze krok za krokem, obohaceny o pripadove studie zalozene na stovkach ESG projektu realizovanych tymem Envirly by Quantifier.",
  "cta": "Zobrazit knihu",
  "sectionTitle": "Nase nejnovejsi publikace"
}
```
