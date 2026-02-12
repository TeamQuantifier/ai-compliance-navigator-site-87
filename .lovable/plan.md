

# Naprawa wykrywania linków wewnętrznych w SEO Audit

## Problem

Analizator SEO nie wykrywa linków wewnętrznych w treści artykułów. Przyczyna: linki w edytorze TipTap są zapisywane z adresem `http://Quantifier.ai` (z wielką literą Q), a kod sprawdza `href.includes('quantifier.ai')` -- porównanie jest case-sensitive i nie znajduje dopasowania.

Dodatkowo istnieją **dwa osobne analizatory** z różnymi błędami:

1. **`src/hooks/useSeoAnalysis.ts`** (panel boczny SEO w edytorze) -- sprawdza `quantifier.ai` ale case-sensitive, więc `Quantifier.ai` nie jest wykrywany
2. **`src/lib/seo-analyzer.ts`** (strona SEO Audit) -- sprawdza starą domenę `compliancesumo` zamiast `quantifier.ai`

## Rozwiązanie

### Plik 1: `src/hooks/useSeoAnalysis.ts` (linia 97)

Zmiana z:
```typescript
const isInternal = href.startsWith('/') || 
  href.includes('quantifier.ai') || 
  (baseUrl && href.includes(baseUrl));
```
Na:
```typescript
const hrefLower = href.toLowerCase();
const isInternal = hrefLower.startsWith('/') || 
  hrefLower.includes('quantifier.ai') || 
  (baseUrl && hrefLower.includes(baseUrl.toLowerCase()));
```

### Plik 2: `src/lib/seo-analyzer.ts` (linia 92)

Zmiana z:
```typescript
if (href.startsWith('/') || href.includes('compliancesumo')) {
```
Na:
```typescript
const hrefLower = href.toLowerCase();
if (hrefLower.startsWith('/') || hrefLower.includes('quantifier.ai')) {
```

## Zakres zmian

- 2 pliki, po 2-3 linie w każdym
- Brak zmian w bazie danych, edge functions ani UI
- Naprawa dotyczy tylko logiki porównywania URL-i

