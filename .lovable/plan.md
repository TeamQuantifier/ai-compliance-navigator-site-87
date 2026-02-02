

# Plan: Dodanie nowych logotypów klientów do sekcji "Compliance, powered by insiders"

## Cel
Dodać 9 nowych logotypów firm do istniejącej karuzeli na stronie głównej, zachowując spójność z obecnymi logotypami.

---

## Przesłane logotypy do dodania

| # | Nazwa pliku | Nazwa firmy |
|---|-------------|-------------|
| 1 | AdamedLogo.png | Adamed |
| 2 | BidFOodLogo.png | Bidfood Farutex |
| 3 | CloudFerroLogo.png | CloudFerro |
| 4 | GobartoLogo.png | Gobarto |
| 5 | HildingAnders_Logo.png | Hilding Anders |
| 6 | kazarLogo.png | Kazar |
| 7 | MarcCOlor_Logo.png | Marc Kolor |
| 8 | OEX_Logo.png | OEX |
| 9 | BalticLogo.png | Grupa Przemysłowa Baltic |

---

## Kroki implementacji

### Krok 1: Skopiować logotypy do folderu public

Skopiować wszystkie 9 logotypów z `user-uploads://` do folderu `public/lovable-uploads/`:

```
user-uploads://AdamedLogo.png → public/lovable-uploads/adamed-logo.png
user-uploads://BidFOodLogo.png → public/lovable-uploads/bidfood-farutex-logo.png
user-uploads://CloudFerroLogo.png → public/lovable-uploads/cloudferro-logo.png
user-uploads://GobartoLogo.png → public/lovable-uploads/gobarto-logo.png
user-uploads://HildingAnders_Logo.png → public/lovable-uploads/hilding-anders-logo.png
user-uploads://kazarLogo.png → public/lovable-uploads/kazar-logo.png
user-uploads://MarcCOlor_Logo.png → public/lovable-uploads/marc-kolor-logo.png
user-uploads://OEX_Logo.png → public/lovable-uploads/oex-logo.png
user-uploads://BalticLogo.png → public/lovable-uploads/baltic-logo.png
```

(Nazwy plików znormalizowane do małych liter i kebab-case dla spójności)

### Krok 2: Zaktualizować komponent InsidersSection.tsx

**Plik**: `src/components/InsidersSection.tsx`

Dodać 9 nowych wpisów do tablicy `logos` (linie 12-103):

```typescript
const logos = [
  // ... existing 18 logos ...
  
  // Nowe logotypy
  {
    id: 19,
    src: "/lovable-uploads/adamed-logo.png",
    alt: "Adamed"
  },
  {
    id: 20,
    src: "/lovable-uploads/bidfood-farutex-logo.png",
    alt: "Bidfood Farutex"
  },
  {
    id: 21,
    src: "/lovable-uploads/cloudferro-logo.png",
    alt: "CloudFerro"
  },
  {
    id: 22,
    src: "/lovable-uploads/gobarto-logo.png",
    alt: "Gobarto"
  },
  {
    id: 23,
    src: "/lovable-uploads/hilding-anders-logo.png",
    alt: "Hilding Anders"
  },
  {
    id: 24,
    src: "/lovable-uploads/kazar-logo.png",
    alt: "Kazar"
  },
  {
    id: 25,
    src: "/lovable-uploads/marc-kolor-logo.png",
    alt: "Marc Kolor"
  },
  {
    id: 26,
    src: "/lovable-uploads/oex-logo.png",
    alt: "OEX"
  },
  {
    id: 27,
    src: "/lovable-uploads/baltic-logo.png",
    alt: "Grupa Przemysłowa Baltic"
  }
];
```

---

## Spójność z istniejącymi logotypami

Każde logo będzie automatycznie wyświetlane w ten sam sposób jak pozostałe dzięki istniejącym klasom CSS:

```jsx
<div className="p-6 h-28 flex items-center justify-center bg-white rounded-md shadow-sm">
  <img 
    src={logo.src} 
    alt={logo.alt}
    loading="lazy"
    width="160"
    height="80"
    className="max-h-20 max-w-full mx-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300" 
  />
</div>
```

Wszystkie logotypy będą:
- Wyświetlane w białych kartach o wysokości 28 (h-28)
- Skalowane do max 20px wysokości (max-h-20)
- Wyświetlane w skali szarości z efektem kolorowania przy hover
- Zachowywały proporcje dzięki `object-contain`

---

## Podsumowanie zmian

| Plik | Zmiana |
|------|--------|
| `public/lovable-uploads/*.png` | Dodanie 9 nowych plików logotypów |
| `src/components/InsidersSection.tsx` | Dodanie 9 nowych wpisów do tablicy `logos` (id: 19-27) |

---

## Oczekiwany rezultat

Po implementacji karuzela na stronie głównej będzie zawierać **27 logotypów** (18 istniejących + 9 nowych), wszystkie wyświetlane w spójny sposób z efektem grayscale i kolorowaniem przy hover.

