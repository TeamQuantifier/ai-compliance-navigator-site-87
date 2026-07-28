## Cel

Kompletna przebudowa strony `/pl/szkolenia-cyberbezpieczenstwo-dla-firm` (`src/pages/services/TrainingLanding.tsx`) na spójny landing pod 60-minutowe szkolenie KSC/NIS2 z jedną ścieżką konwersji.

## Nowa struktura sekcji (w kolejności)

1. **Hero + CTA + pasek zaufania**
2. **Problem** — 3 karty (podleganie / odpowiedzialność / dowody)
3. **Efekty szkolenia** — 7 punktów „co wychodzi z sali po 60 minutach"
4. **Dla kogo** — 4 grupy odbiorców
5. **Prowadzący** — Quantifier.ai + audytorzy + blok „Zaufali nam" (logotypy z `FeaturedBySection`)
6. **FAQ** — 8 pytań (nowa treść dostarczona przez użytkownika)
7. **Końcowe CTA** — formularz `TrainingPromoFormInline` + link do 15-min rozmowy

## Zmiany plikowe

### `src/pages/services/TrainingLanding.tsx`
Przepisanie komponentu od zera zgodnie ze strukturą powyżej:
- Hero: eyebrow „Szkolenie dla firm · 60 minut · online lub stacjonarnie · Cyberbezpieczeństwo", H1, lead o podpisie ustawy 19.02.2026 i terminie 3.10.2026, główne CTA scrollujące do `#contact`, pasek zaufania (4 elementy).
- Sekcja problem: `H2` + 3 karty w gridzie.
- Efekty: lista 7 punktów z ikonami `CheckCircle`.
- Dla kogo: 4 karty (Zarządy, Compliance, CISO/IT, Zakupy).
- Prowadzący: krótki opis Quantifier.ai + audytorzy (bez Klaudii), poniżej reużyty `FeaturedBySection` lub inline'owy blok logotypów pobranych z `FeaturedBySection.tsx` (`ministerstwo-cyfryzacji`, `ncc-pl`, `ai-chamber`, `klaster-gospodarki-cyrkularnej`, `top-ai-driven-companies`).
- FAQ: `Accordion` z 8 pytaniami (nowa treść).
- Końcowe CTA (`#contact`): nagłówek „Do 3 października zostało mniej, niż się wydaje", `TrainingPromoFormInline`, poniżej link „Umów 15-minutową rozmowę wstępną" → `/pl/contact`.

### `public/locales/pl/translation.json`
Wymiana zawartości gałęzi `training.hero`, `training.problem`, `training.effects`, `training.audience`, `training.hosts`, `training.faq`, `training.finalCta` na nową treść PL dostarczoną przez użytkownika (dokładnie 1:1, bez parafrazy).

### `public/locales/en/translation.json`
Synchronizacja tych samych kluczy z tłumaczeniem angielskim (żeby nie zostały puste — użyjemy wiernego tłumaczenia PL→EN zachowując daty i terminy).

## Uwagi

- Zachowujemy istniejący `TrainingPromoFormInline` jako mechanizm zapisu — jedno kotwiczne `#contact`.
- Usuwamy z pliku wszystkie pozostałości sekcji, które nie występują w nowej strukturze (np. „Dlaczego firmy nie są gotowe", stare bloki „proof", stary hero z formularzem obok).
- Sekcja „Prowadzący" nie wymienia z imienia Klaudii ani innych trenerów — tylko „audytorzy Quantifier.ai" + logotypy „Zaufali nam".
- SEO/meta (title, description) aktualizujemy pod nową narrację KSC/3.10.2026.

## Poza zakresem

- Zmiany w `TrainingPromoFormInline` (formularz zostaje bez modyfikacji).
- Zmiany w globalnych banerach promo (`TrainingPromo2026.tsx`).
- Wersja CS (nie istnieje dla tej podstrony).
