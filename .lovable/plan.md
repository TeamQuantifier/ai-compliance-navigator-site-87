

## Plan: Sekcja Use Case'ów z przełączanymi kartami na stronie DPP

### Co robimy
Dodajemy sekcję z 5 use case'ami jako przełączane karty (tabs), aby nie zajmowały dużo miejsca na stronie. Każdy use case będzie miał kolorowy nagłówek zgodny ze screenshotem, kluczowe punkty i przycisk CTA.

### Lokalizacja
Sekcja zostanie umieszczona między "Dlaczego Envirly" (advantages) a FAQ — jako przedostatnia sekcja konwersyjna.

### 5 Use Case'ów (Tabs)

| # | Tytuł taba | Kolor nagłówka | Główny przekaz |
|---|------------|----------------|----------------|
| 1 | Jeden produkt fizyczny | Zielony | "1 dzień zamiast 6 tygodni" — GS1 + ecoinvent eliminują ręczną robotę |
| 2 | Dziesiątki/setki SKU | Pomarańczowy | Skala bez liniowego wzrostu kosztów — klonowanie modeli + import Excel |
| 3 | Zmienny skład/transport | Czerwony | Monte Carlo: "691 ±8%" zamiast jednego punktu — profesjonalne i bronione |
| 4 | Usługi i SaaS | Niebieski | LCA nie tylko dla fabryk — kampanie, kod, logistyka usługowa |
| 5 | Dostawca B2B | Brązowy/Amber | Efekt wiralowy — duży klient (Raben, BNP) generuje falę zapytań do dostawców |

### Implementacja techniczna

**Plik `src/pages/frameworks/ProductLevel.tsx`:**
- Dodanie komponentu `Tabs` z shadcn/ui z 5 przyciskami
- Każdy tab zawiera: kolorowy badge, tytuł, opis problemu, listę kluczowych funkcji (z ikonami CheckCircle), przycisk "Zapytaj Claude" / CTA do kontaktu
- Responsywność: na mobile tabs zamieniają się w pionową listę przycisków

**Pliki `public/locales/pl/translation.json` i `en/translation.json`:**
- Dodanie obiektu `productLevelPage.useCases` z 5 elementami, każdy zawierający: `tabLabel`, `badge`, `title`, `description`, `features[]`, `cta`

### Struktura każdego taba (wzorowana na screenshocie)
- Kolorowy badge kategorii (np. "1 jeden produkt fizyczny")
- Tytuł i opis problemu klienta (2-3 zdania)
- Lista "Kluczowe funkcje" — 4-6 bullet pointów z CheckCircle
- Przycisk CTA "Zapytaj o wycenę" → link do /contact

