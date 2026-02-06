
# Plan: Zamiana układu sekcji książki

## Cel
Zamiana kolejności elementów w sekcji promocyjnej książki:
- **Lewa strona**: Tekst (badge, tytuł, opis, przycisk)
- **Prawa strona**: Grafika książki

Dodatkowo poprawa jakości wyświetlania obrazka.

## Zmiany w pliku `src/components/BookPromoSection.tsx`

### 1. Zamiana kolejności elementów
Aktualnie w `flex-row` najpierw jest obrazek, potem tekst. Zmienię kolejność bloków w kodzie - najpierw Content, potem Book Image.

### 2. Wyrównanie tekstu
- Na desktop: tekst wyrównany do lewej (`md:text-left`)
- Na mobile: tekst wycentrowany, obrazek pod tekstem

### 3. Poprawa jakości obrazka
- Zwiększenie rozmiaru obrazka dla lepszej jakości: `w-48 md:w-64` (z obecnego `w-40 md:w-56`)
- Dodanie `object-contain` dla zachowania proporcji
- Opcjonalnie: dodanie efektu cienia dla głębi wizualnej

## Kod po zmianach

```tsx
<div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
  {/* Content - teraz pierwszy (lewa strona) */}
  <div className="text-center md:text-left flex-1">
    {/* badge, tytuł, opis, przycisk - bez zmian */}
  </div>
  
  {/* Book Image - teraz drugi (prawa strona) */}
  <div className="shrink-0 order-first md:order-last">
    <img 
      src="/lovable-uploads/book-analiza-podwojnej-istotnosci.png"
      alt="Analiza podwójnej istotności - książka"
      className="w-48 md:w-64 object-contain transform hover:scale-105 transition-transform duration-300"
    />
  </div>
</div>
```

## Szczegóły techniczne

| Element | Przed | Po |
|---------|-------|-----|
| Kolejność desktop | Obrazek → Tekst | Tekst → Obrazek |
| Kolejność mobile | Obrazek (góra) → Tekst (dół) | Tekst (góra) → Obrazek (dół) |
| Rozmiar obrazka | `w-40 md:w-56` | `w-48 md:w-64` |
| Dodatkowe klasy | - | `object-contain`, `order-first md:order-last` |

Użycie `order-first md:order-last` na obrazku sprawi, że:
- Na mobile: obrazek będzie na górze (naturalny flow dla lepszego UX mobilnego)
- Na desktop: obrazek będzie po prawej stronie (zgodnie z życzeniem)
