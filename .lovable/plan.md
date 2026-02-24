

# Zmiany na stronie wynikow Cybersecurity Check

## 1. Zmiana przyciskow CTA

Obecny uklad:
- Fioletowy: "Dowiedz się więcej o Quantifier" -> `/frameworks`
- Szary: "Wypełnij ponownie" (reset)

Nowy uklad:
- **Fioletowy**: "Umów demo" / "Book a demo" / "Domluvit demo" -> `/{lang}/contact`
- **Szary**: "Dowiedz się więcej o Quantifier" / "Learn more about Quantifier" / "Zjistěte více o Quantifier" -> `/{lang}/product`
- Przycisk "Wypełnij ponownie" pozostaje jako trzeci element (lub link tekstowy pod spodem)

### Zmiany w `src/config/quizConfig.ts`

Zmiana etykiet:
- `CTA_LINK_LABEL` -> zmiana na "Umów demo" / "Book a demo" / "Domluvit demo"
- Dodanie nowego eksportu `CTA_SECONDARY_LABEL` z wartosciami "Dowiedz się więcej o Quantifier" / "Learn more about Quantifier" / "Zjistěte více o Quantifier"

### Zmiany w `src/pages/formularz/FormularzPage.tsx`

- Fioletowy przycisk: link do `/{lang}/contact` z nowa etykieta
- Szary przycisk: link do `/{lang}/product` z etykieta "Dowiedz się więcej o Quantifier"
- Przycisk "Wypełnij ponownie" -> przeniesiony jako link tekstowy pod przyciskami

## 2. Screenshot platformy obok sekcji "Jak Quantifier moze pomoc"

W sekcji drugiej wyniku (bg-[#6d38a8]/5) dodanie obrazka `platform-screenshot.png` obok tekstu. Uklad zmieni sie na dwukolumnowy (tekst po lewej, screenshot po prawej) na desktopie, a na mobile screenshot bedzie pod tekstem.

Uzyty zostanie istniejacy obraz `/lovable-uploads/platform-screenshot.png` lub `/lovable-uploads/envirly-dashboard.png`.

### Zmiany w `src/pages/formularz/FormularzPage.tsx`

- W sekcji `parsed.section2` dodanie layoutu `flex` z obrazkiem po prawej stronie
- Obraz z zaokraglonymi rogami i lekkim cieniem

## Podsumowanie zmian w plikach

| Plik | Zmiana |
|---|---|
| `src/config/quizConfig.ts` | Zmiana `CTA_LINK_LABEL` na "Umów demo", dodanie `CTA_SECONDARY_LABEL` |
| `src/pages/formularz/FormularzPage.tsx` | Nowe linki CTA, dodanie screenshota platformy w sekcji 2 |

