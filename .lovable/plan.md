

## Rozbudowa stron produktowych i rolowych — plan krok po kroku

### Stan obecny
Wszystkie strony produktowe mają identyczną strukturę: Hero + 3 karty Key Features + 2 bloki Detailed Features + CTA. Strony ról (Managers, Contributors, Auditor) to placeholder z jednym paragrafem. To powoduje duplicate content w oczach Google.

### Podejście
Rozbudowujemy każdą stronę osobno, dodając unikalne sekcje z **mockupami UI platformy** (jak przesłany screenshot Business Continuity). Mockupy będą komponentami React imitującymi interfejs Quantifier — nie screenshotami.

### Screenshoty potrzebne od Ciebie

Potrzebuję screenshoty z platformy Quantifier dla każdej strony, żeby wiernie odwzorować UI w mockupach:

| Strona | Czego potrzebuję |
|--------|-----------------|
| **AI Compliance Officer** | Widok agenta AI w akcji — chat/rekomendacje/alerty, panel z sugestiami compliance |
| **Task & Data Management** | Widok listy zadań/kanban, hub danych, widok filtrów i statusów |
| **Documents Management** | Repozytorium dokumentów, wersjonowanie, widok lifecycle dokumentu |
| **Value Chain** | Mapa dostawców, scoring dostawców, widok due diligence |
| **Risk Assessment** | Matryca ryzyk (heatmap), widok risk register, treatment plans |
| **Analytics Dashboards** | Dashboard compliance z wykresami, KPI, widok raportów |
| **Managers view** | Widok managera — overview, delegowanie, statusy zespołu |
| **Contributors view** | Widok contributora — moje zadania, formularz, zbieranie danych |
| **Auditor view** | Widok audytora — evidence, audit trail, eksport raportu |

Screenshot Business Continuity (BIA) który przesłałeś jest świetnym przykładem — taki poziom detalu potrzebuję dla każdego modułu.

---

### Struktura każdej rozbudowanej strony

1. **Hero** z mockupem UI (zamiast generic gradient box)
2. **"How it works"** — 3-4 kroki procesu z ikonami
3. **Platform mockup section** — duży mockup React imitujący UI platformy (inspirowany przesłanym screenshotem)
4. **Key capabilities** — 4-6 kart z unikalnymi feature'ami
5. **Use cases / Framework coverage** — kiedy ta funkcja jest potrzebna (NIS2, ISO 27001, DORA, ESG)
6. **FAQ** — 4-5 pytań SEO-friendly
7. **CTA**

### Kolejność pracy

Zaczynam od **pierwszej strony** po otrzymaniu screenshotów. Proponuję kolejność:

1. `/product/ai-compliance-officer` — najważniejsza strona, USP produktu
2. `/product/task-data-management`
3. `/product/risk-assessment`
4. `/product/documents-management`
5. `/product/value-chain`
6. `/product/analytics-dashboards`
7. `/roles/managers`, `/roles/contributors`, `/roles/auditor`

### Pliki do edycji (per strona)
- `src/pages/product/[Page].tsx` — nowa struktura
- Nowy mockup component: `src/components/mockups/[Module]Mockup.tsx`
- `public/locales/{en,pl,cs}/translation.json` — nowe klucze i18n
- `src/i18n/locales/{en,pl}.json` — mirror

### Bez screenshotów mogę zrobić
- Strukturę stron, layout, sekcje
- Generic mockupy oparte na wzorcu z przesłanego screenshota BIA (sidebar + content + cards + KPI)
- Tekst i18n, FAQ, SEO meta

Prześlij screenshoty z modułów, a dopasujemy mockupy. Możemy też zacząć od AI Compliance Officer z generycznym mockupem i iterować.

