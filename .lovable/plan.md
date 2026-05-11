## Cel

Przebudować `/pl/product` (`src/pages/product/Features.tsx`) na nowoczesną stronę AI-Native GRC, w której **sercem narracji jest interaktywna pętla nieskończoności (∞)** symbolizująca Continuous Compliance. 5 obszarów Quantifier rozłożonych jest na dwóch pętlach ósemki — kliknięcie w dowolny węzeł rozwija szczegóły obszaru bez przeładowania strony.

## Nowa struktura strony

```text
1. HERO — „Compliance, który nigdy nie śpi" (Leon + 3 KPI)
2. INFINITY LOOP ∞ — interaktywna pętla nieskończoności (clue strony)
3. ALWAYS-ON BAR — animowane liczniki Continuous Compliance
4. 5 OBSZARÓW (rozbudowany ProductFiveAreas — sekcja-deep-dive)
5. TRADITIONAL vs QUANTIFIER — porównanie 2-kolumnowe
6. FRAMEWORK ENGINE — grid frameworków w jednym silniku
7. ROLES — Zarząd / Manager / Contributor / Auditor
8. CTA — „Zobacz Leona w akcji"
```

## Sekcja 2 — Infinity Loop (NOWY, kluczowy element)

### Koncepcja wizualna

Pozioma pętla nieskończoności (∞) narysowana w SVG, po której krąży świecąca kropka (data point) — symbol danych przepływających non-stop przez Quantifier. Na pętli umieszczone są **5 klikalnych węzłów-przycisków** (po jednym na każdy obszar), rozłożonych w punktach przecięć i ekstremach pętli.

```text
                  ┌─ (02) Integracje ─┐         ┌─ (04) Polityki ─┐
                 │                     │         │                  │
   (01) Leon ───┤        ✕ ←── (03) Project Mgmt ──→ ✕            ├─── (05) Audyt
                 │                     │         │                  │
                  └────────────────────┘         └──────────────────┘
                            ↑                              ↑
                        lewa pętla                   prawa pętla
                        (Detect/Connect)           (Decide/Act/Prove)
```

- **Lewa pętla** = „przyjmowanie świata": Integracje (02) + Leon obserwujący (01).
- **Środek (przecięcie ∞)** = Project Management (03) — orkiestracja.
- **Prawa pętla** = „odpowiedź światu": Polityki/dokumenty (04) + Audyt (05).
- **Animacja**: kropka porusza się po ścieżce SVG (`<animateMotion>` lub framer-motion `motionPath`) w nieskończonej pętli ~12s, z pulsującą poświatą.
- **Hasło nad pętlą**: „W tradycyjnym GRC compliance to projekt. W Quantifier — to stan."
- **Hasło pod pętlą**: „Dane wchodzą. Leon decyduje. Zespół działa. Audytor dostaje pakiet. Pętla zamyka się sama — i zaczyna od nowa."

### Interakcja

- Każdy z 5 węzłów to przycisk z numerem + ikoną + krótką etykietą („01 · Leon", „02 · Integracje" itd.).
- Hover → węzeł powiększa się, pokazuje tooltip z 1-zdaniowym opisem.
- Klik → pod pętlą rozwija się **panel detali** (accordion / animowany drawer wewnątrz sekcji) z:
  - pełną nazwą obszaru,
  - 2–3 zdaniowym opisem,
  - 3 bulletami z konkretami,
  - mini-mockupem (te same komponenty co w sekcji 4: `LeonMonitorMockup`, `DataIntegrationMockup`, `TaskAutomationMockup`, `PolicyBuilderMockup`, `AuditExportMockup` — reuse, nie duplikujemy),
  - linkiem „Zobacz pełny opis ↓" przewijającym do sekcji 4 (deep-dive) lub do podstrony `/product/*`.
- Tylko jeden panel otwarty naraz; ponowny klik w aktywny węzeł zamyka panel.
- Domyślnie żaden węzeł nie jest aktywny (lub opcjonalnie: pierwszy „01 · Leon" auto-expanded przy wejściu).

### Stany / accessibility

- Każdy węzeł = `<button>` z `aria-expanded`, `aria-controls`.
- Klawiatura: Tab między węzłami, Enter/Space otwiera panel.
- Mobile: pętla skaluje się; jeżeli za mała — fallback na pionową listę 5 kart z tą samą interaktywnością (rozwijanie w miejscu).
- Reduced-motion: kropka przestaje krążyć, ale pętla nadal jest klikalna.

### Dlaczego to działa

- Symbol ∞ = continuous, nigdy się nie kończy — wizualne uzasadnienie hasła „Continuous Compliance".
- Klikalne węzły zamiast statycznego diagramu = strona „żyje" i zachęca do eksploracji.
- Sekcja 4 (deep-dive) zostaje dla tych, którzy chcą przewinąć i przeczytać wszystko po kolei — pętla to **interaktywna mapa**, sekcja 4 to **długa lektura**.

## Pozostałe sekcje (skrót)

- **Hero**: dark, Leon po prawej (reuse stylu pierścieni z `Iso27001.tsx`), 3 KPI pill, 2 CTA.
- **Always-on bar**: 4 liczniki count-up + zdanie „Każda liczba aktualizuje się sama. To jest Continuous Compliance."
- **5 obszarów (deep-dive)**: zostaje obecny `ProductFiveAreas`, dodajemy `id="area-01"`...`id="area-05"` na sekcjach (do scroll-from-loop), micro-stat pill, „Continuous"-badge na mockupie, link do podstrony `/product/*` pod każdym obszarem.
- **Traditional vs Quantifier**: 2-kolumnowy split (lewa szara, prawa brand-glow).
- **Framework engine**: grid kafli (NIS2, ISO 27001, DORA, GDPR, SOC 2, ISO 27701, KSC, ESG/CSRD) z linkami.
- **Roles**: 4 karty z linkami do `/roles/*`.
- **CTA**: ciemny blok z Leonem + „Umów demo z Leonem" + drugi CTA do `/cybersecurity-check`.

## Co usuwamy

- Stary blok `<Tabs>` (AI Officer / Analytics / Task Hub / Risk) z `Features.tsx` — duplikuje treść z pętli i sekcji 4.
- Pusty `<div className="max-w-4xl mx-auto mb-12"></div>`.
- `useState`/`handleTabChange` (zbędne po usunięciu Tabs).

## Pliki

- **edit** `src/pages/product/Features.tsx` — nowa kompozycja sekcji, usunięcie Tabs, zachowanie `<Helmet>` z JSON-LD.
- **edit** `src/components/product/ProductFiveAreas.tsx` — `id` na sekcjach, micro-stat, link do podstrony.
- **new** `src/components/product/InfinityComplianceLoop.tsx` — SVG ∞ + 5 klikalnych węzłów + animowana kropka + panel detali (state lokalny `useState<activeArea>`).
- **new** `src/components/product/AlwaysOnBar.tsx` — count-up + `useInView`.
- **new** `src/components/product/TraditionalVsQuantifier.tsx`.
- **new** `src/components/product/FrameworkEngineGrid.tsx`.
- **new** `src/components/product/RolesValueCards.tsx`.
- **new** `src/components/product/ProductHeroLeon.tsx`.

## Detale techniczne

- Pętla ∞: SVG `<path d="M…"/>` (lemniskata Bernoulliego lub uproszczona ósemka), gradient stroke (brand-mint → brand-blue → brand-purple), kropka jako `<circle>` z `<animateMotion>` na tym samym path. Alternatywnie framer-motion `<motion.circle>` + `offsetPath` (czystszy reduced-motion).
- Węzły = absolutnie pozycjonowane `<button>` nad SVG (ułatwia accessibility i hover).
- Panel detali: `framer-motion` `AnimatePresence` + `motion.div` z `height: auto`.
- Tokeny tylko z `index.css` / `tailwind.config.ts` (brand-mint, brand-blue, brand-purple, slate-950).
- `<Link>` z `react-router-dom` + `currentLocale`, trailing slash.
- i18n: PL hardcoded w komponentach (jak obecny `ProductFiveAreas`). Jeśli chcesz EN/CS — osobny krok.

## Czego NIE ruszamy

- `ProductOverview.tsx` (oddzielna strona /product/overview).
- Mockupy w `ProductFiveAreas` — tylko reuse w panelu pętli.
- Routing, SEO globalne, tłumaczenia core.

## Pytanie otwarte

Czy w pętli ∞ chcesz, żeby pierwszy węzeł („01 · Leon") był **auto-otwarty** przy wejściu na stronę (od razu widać przykład interakcji), czy pętla startuje **„czysta"** (użytkownik sam klika)? Domyślnie idę z auto-otwartym „01 · Leon" — to mocniej buduje rolę Leona jako bohatera narracji.
