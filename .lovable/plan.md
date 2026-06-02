
## Cel

Wyeksponować na stronie `/pl/szkolenia-cyberbezpieczenstwo-dla-firm` (oraz w wersjach EN/CS) ofertę:

- **4h szkolenie dla Twojej firmy** z nowych obowiązków: **NIS2 / KSC / ISO 27001**
- **100% finansowania** – „dowiedz się jak pozyskać za darmo"
- **Decyzja w 3 dni robocze**
- **Limit miejsc** – rejestracja do **30.06.2026**, realizacja może być później
- Mocne CTA → formularz kontaktowy/„Umów rozmowę"

Proponuję wdrożyć **trzy uzupełniające się formaty jednocześnie** (banner + sekcja + pop-up), żeby maksymalnie zwiększyć konwersję, ale każdy z nich może działać osobno. Poniżej opisuję, jak każdy z nich miałby wyglądać – wybierz, które chcesz wdrożyć (jeden, dwa albo wszystkie trzy).

---

## Wariant A – Sticky banner na górze strony (announcement bar)

Wąski, pełnej szerokości pasek tuż nad nawigacją albo zaraz pod nią, widoczny od razu po wejściu.

```text
╔══════════════════════════════════════════════════════════════════════╗
║ 🎓  Tylko do 30.06.2026 · 4h szkolenia NIS2 / KSC / ISO 27001        ║
║     dla Twojej firmy — sprawdź, jak uzyskać 100% finansowania        ║
║     · decyzja w 3 dni roboczych · [ Sprawdź ofertę → ]   ✕           ║
╚══════════════════════════════════════════════════════════════════════╝
```

- Gradient w kolorach marki (np. `from-primary to-primary/80`), tekst biały
- Countdown / data „do 30.06.2026" wyróżniona pogrubieniem
- Przycisk CTA przewija do nowej sekcji promocyjnej (kotwica `#oferta-finansowanie`)
- Krzyżyk „✕" do zamknięcia, stan zapisany w `localStorage` (raz zamknięty – nie wraca w sesji)
- Widoczny na desktop i mobile (na mobile 2 linijki + CTA pod spodem)

---

## Wariant B – Dedykowana sekcja promocyjna na stronie

Wstawiona wysoko na stronie (tuż po Hero, przed sekcją „Problem"), żeby od razu po scrollu rzucała się w oczy.

```text
┌──────────────────────────────────────────────────────────────────────┐
│  [ Oferta limitowana · do 30.06.2026 ]                               │
│                                                                      │
│   4h szkolenia dla Twojej firmy z nowych obowiązków                  │
│   cyberbezpieczeństwa: NIS2 · KSC · ISO 27001                        │
│                                                                      │
│   Pokażemy Ci, jak sfinansować je w 100% — bez ukrytych kosztów.    │
│                                                                      │
│   ✓ Szkolenie szyte na miarę Twojej firmy i branży                   │
│   ✓ Pomoc w pozyskaniu 100% dofinansowania                           │
│   ✓ Decyzja w 3 dni roboczych                                        │
│   ✓ Rejestracja do 30.06.2026 — realizacja możliwa później           │
│   ✓ Limitowana liczba miejsc                                         │
│                                                                      │
│   [ Sprawdź dostępność →  ]   [ Pobierz szczegóły oferty ]           │
└──────────────────────────────────────────────────────────────────────┘
```

- Tło: ciemny gradient (np. slate → primary), zgodne z resztą strony szkoleń (zgodnie z memory: premium slate-to-blue)
- Po lewej tekst + bullet list, po prawej karta z dużą datą **30.06.2026** i licznikiem dni / „3 dni roboczych na decyzję"
- Główne CTA → formularz kontaktowy na dole strony (kotwica do istniejącej sekcji)
- Drugorzędne CTA → opcjonalnie do PDF/strony z opisem warunków (jeśli będzie)
- Sekcja zawiera mały disclaimer małym fontem: „Liczba szkoleń ograniczona. Oferta ważna do 30.06.2026 (rejestracja). Termin realizacji ustalany indywidualnie."

---

## Wariant C – Pop-up (exit-intent + opóźniony)

Pojawia się raz na sesję: po ~15 sekundach lub przy próbie opuszczenia strony (ruch myszy w stronę zamknięcia karty na desktop).

```text
        ┌──────────────────────────────────────────────┐
        │   ✕                                          │
        │                                              │
        │   🎯  Tylko do 30.06.2026                    │
        │                                              │
        │   4h szkolenia z NIS2 / KSC / ISO 27001      │
        │   dla Twojej firmy — nawet 100% za free       │
        │                                              │
        │   • Decyzja w 3 dni roboczych                │
        │   • Limitowana liczba miejsc                 │
        │   • Realizacja możliwa po 30.06              │
        │                                              │
        │   [ email firmowy ____________________ ]     │
        │   [   Chcę poznać szczegóły  →   ]           │
        │                                              │
        │   Bez spamu. Odpowiadamy w 1 dzień roboczy.  │
        └──────────────────────────────────────────────┘
```

- Modal oparty o istniejący komponent `Dialog` (shadcn) – spójny ze stylem strony
- Pole „email" + przycisk → wysyłka przez istniejącą funkcję `contact-form` (z tagiem `source: training-promo-2026`)
- Zapamiętanie w `localStorage`, że użytkownik już widział / zamknął / wysłał → nie pokazujemy ponownie
- Trigger: pierwszy z: 15s na stronie, scroll > 50%, lub exit-intent

---

## Treść (3 języki)

Dodam klucze do `public/locales/{pl,en,cs}/translation.json` pod `training.promo2026`:

- `badge` – „Oferta limitowana · do 30.06.2026" / „Limited offer · until 30.06.2026" / „Limitovaná nabídka · do 30. 6. 2026"
- `title`, `subtitle`, `bullets[]`, `cta`, `disclaimer`
- Wszystkie warianty (banner / sekcja / pop-up) korzystają z tej samej puli tekstów

Domyślne formułowanie (PL):

> **4h szkolenie z NIS2 / KSC / ISO 27001 dla Twojej firmy.** Pokażemy Ci, jak sfinansować je w 100%. Decyzja w 3 dni roboczych. Rejestracja do 30.06.2026 – realizacja również po tej dacie. Liczba szkoleń ograniczona.

---

## Co potrzebuję od Ciebie, żeby zacząć

1. **Które formaty wdrażamy?** (zaznacz: banner / sekcja / pop-up – możesz wybrać kilka)
2. **Gdzie ma prowadzić główne CTA?** Domyślnie: przewinięcie do istniejącego formularza kontaktowego na stronie szkoleń. Alternatywy: `/pl/kontakt`, dedykowany formularz „dofinansowanie".
3. **„100% za free" – jak ma brzmieć dokładnie?** Czy mogę użyć sformułowania „do 100% dofinansowania" / „nawet 100% finansowania", czy chcesz literalnie „100% za free / za darmo"? (sugeruję pierwsze – bardziej wiarygodne i bezpieczne prawnie)
4. **Czy włączamy ofertę także na EN/CS, czy tylko PL?**

Po Twojej odpowiedzi wdrażam wybrane warianty + tłumaczenia.

---

## Szczegóły techniczne (dla porządku)

- Nowe komponenty:
  - `src/components/promo/TrainingPromoBanner.tsx` (Wariant A)
  - `src/components/promo/TrainingPromoSection.tsx` (Wariant B)
  - `src/components/promo/TrainingPromoDialog.tsx` (Wariant C)
- Montaż wszystkich w `src/pages/services/TrainingLanding.tsx` (banner na górze, sekcja po Hero, dialog na poziomie strony)
- Stan „zamknięte / wysłane" w `localStorage` pod kluczami `promo2026.banner`, `promo2026.dialog`
- Treści w `public/locales/{pl,en,cs}/translation.json` → `training.promo2026.*`
- Pop-up wysyła lead przez istniejącą edge function `contact-form` z polem `source: 'training-promo-2026'` (bez nowych migracji DB)
- Zgodność z istniejącym design systemem (semantic tokens, slate-to-blue z memory)
