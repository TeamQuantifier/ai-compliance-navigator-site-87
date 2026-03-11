

## Zmiany w PostgraduatePromoSection

### 1. Tekst wyrównany do prawej
- Zmienić `text-center md:text-left` → `text-center md:text-right`
- Zmienić `justify-center md:justify-start` → `justify-center md:justify-end` (badge)

### 2. Większa grafika
- Zmienić `w-64 md:w-80` → `w-72 md:w-96` (z 320px na 384px desktop)

### 3. Powiększenie po double-click
- Dodać state `zoomed` + handler `onDoubleClick`
- Po double-click: renderować overlay (fixed, z-50, backdrop ciemny) z pełnowymiarową grafiką
- Klik na overlay zamyka powiększenie

### Plik
- **`src/components/PostgraduatePromoSection.tsx`** — jedyna zmiana

