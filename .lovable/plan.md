

## Analiza popupu — lepsza widoczność grafiki horyzontalnej

### Obecny stan BookPromoPopup
- **Szerokość**: `max-w-2xl` (~672px) — za wąskie na grafikę 16:9
- **Układ**: 50/50 (obraz po lewej, tekst po prawej)
- **Tytuł**: `text-xl md:text-2xl` — zbyt duży, zabiera przestrzeń

### Zmiany do wprowadzenia
1. **Szerokość**: `max-w-4xl` (~896px) — znacznie szerszy popup
2. **Proporcje**: 60/40 lub 55/45 na korzyść grafiki
3. **Tytuł**: `text-lg md:text-xl` — mniejsza czcionka
4. **Opis**: `text-sm` — kompaktowy, więcej miejsca dla obrazu
5. **Grafika**: większa wysokość/powierzchnia wyświetlania

### Plik do modyfikacji
| Plik | Zmiany |
|------|--------|
| `src/components/BookPromoPopup.tsx` | Szerokość, proporcje, rozmiary czcionek |

