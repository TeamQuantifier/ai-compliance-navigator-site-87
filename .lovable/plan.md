

# Plan: Dodanie brakujacych regul rewrite i danych PageData dla podstron produktu i rol

## Zakres zmian

Obecnie w `vercel.json` brakuje regul rewrite z detekcja bota dla 12 podstron, a w `prerender-marketing` brakuje danych tresci (PageData) dla 11 stron. Dodatkowo istnieje niespojnosc w URL strony AI Compliance Officer.

---

## 1. Naprawa niespojnosci URL

Router (`App.tsx`) uzywa sciezki `/product/ai-compliance-officer`, ale `pageUrlMap` w prerender-marketing mapuje na `/product/compliance-officer`. Trzeba ujednolicic `pageUrlMap` do `product/ai-compliance-officer`.

---

## 2. Nowe reguly rewrite w vercel.json

Dodanie 12 regul rewrite z detekcja bota User-Agent:

| Sciezka URL | Parametr page |
|---|---|
| `/product` | `product-features` (ta sama strona co features) |
| `/product/overview` | `product-overview` |
| `/product/ai-compliance-officer` | `compliance-officer` |
| `/product/task-data-management` | `task-data-management` |
| `/product/documents-management` | `documents-management` |
| `/product/value-chain` | `value-chain` |
| `/product/risk-assessment` | `risk-assessment` |
| `/product/analytics-dashboards` | `analytics-dashboards` |
| `/product/api-integrations` | `api-integrations` |
| `/by-roles/managers` | `by-roles-managers` |
| `/by-roles/contributors` | `by-roles-contributors` |
| `/by-roles/auditor` | `by-roles-auditor` |

Reguly musza byc umieszczone **przed** regula catch-all `/(.*) -> /index.html` oraz przed ogolniejszymi rewritami (np. `/product/features`, `/by-roles`).

---

## 3. Nowe dane PageData w prerender-marketing

Dodanie danych tresci w trzech jezykach (EN, PL, CS) dla 11 nowych stron:

### Podstrony produktu (8 stron):
- **product-overview** - Przeglad platformy, kluczowe mozliwosci
- **compliance-officer** - AI Compliance Officer, autonomiczny agent
- **task-data-management** - Zarzadzanie zadaniami i danymi
- **analytics-dashboards** - Pulpity analityczne i raportowanie
- **documents-management** - Zarzadzanie dokumentami i polityki
- **api-integrations** - Integracje API i laczenie systemow
- **value-chain** - Lancuch wartosci i zarzadzanie dostawcami
- **risk-assessment** - Ocena ryzyka i analiza zagrozen

### Podstrony rol (3 strony):
- **by-roles-managers** - Rozwiazania dla zarzadu i leadership
- **by-roles-contributors** - Narzedzia dla zespolow operacyjnych
- **by-roles-auditor** - Funkcje dla audytorow wewnetrznych i zewnetrznych

Kazda strona bedzie zawierac:
- `title` - SEO title z nazwą strony i marką
- `description` - meta description 150-160 znakow
- `h1` - glowny naglowek strony
- `sections` - 2-3 sekcje z naglowkami H2 i punktami
- `internalLinks` - 2-4 linki do powiazanych stron

---

## 4. Poprawka pageUrlMap

Zmiana wpisu w `pageUrlMap`:

```text
Przed: 'compliance-officer': 'product/compliance-officer'
Po:    'compliance-officer': 'product/ai-compliance-officer'
```

---

## Pliki do edycji

1. **vercel.json** - dodanie 12 nowych regul rewrite
2. **supabase/functions/prerender-marketing/index.ts** - poprawka pageUrlMap + dodanie 11 nowych wpisow PageData (EN/PL/CS)

---

## Kolejnosc w vercel.json

Reguly rewrite sa ewaluowane od gory do dolu. Nowe reguly musza byc dodane **przed** istniejacymi ogolnymi rewritami `/by-roles` i `/product/features`, poniewaz bardziej specyficzne sciezki (np. `/product/overview`) musza byc dopasowane wczesniej niz ogolniejsze wzorce.

---

## Szacowany rozmiar zmian

- vercel.json: ~60 nowych linii (12 regul x ~5 linii)
- prerender-marketing: ~400 nowych linii (11 stron x ~35 linii per strona w 3 jezykach)

