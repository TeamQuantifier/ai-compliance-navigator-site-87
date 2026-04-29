## Plan: Optymalizacja SEO slugów + wytyczne graficzne (EN, drafty)

### Status w bazie (EN)

| # | Aktualny slug | Status | Grafika | Body |
|---|---|---|---|---|
| 1 | `dora-compliance-checklist` | **published** | TAK | 64k znaków (gotowy) |
| 2 | `iso-27001-vs-soc-2-comparison` | draft | brak | 16k |
| 3 | `audit-evidence-collection-automation` | draft | brak | 5k (krótki) |
| 4 | `soc-2-compliance-tools-stack-2026` | draft | brak | 16k |
| 5 | `compliance-automation-evaluation-guide` | draft | brak | 8k |
| 6 | `soc-2-for-startups-fast-track-guide` | draft | brak | 24k |
| 7 | `soc-2-audit-preparation-checklist` | draft | brak | 25k |
| bonus | `soc-2-compliance-cost-timeline` | draft | brak | 2.7k (szkic) |

DORA już jest live — zostawiamy. Reszta **pozostaje draftem**, tłumaczenia PL/CS później.

---

### Rekomendowane slugi pod SEO (EN)

Zasady: krótko (3–5 słów), główna fraza na początku, bez roku w slugu (chyba że to ranking/stack year-specific), bez stopwords, intent-match.

| # | Obecny | **Rekomendowany slug** | Uzasadnienie SEO |
|---|---|---|---|
| 2 | `iso-27001-vs-soc-2-comparison` | **`iso-27001-vs-soc-2`** | Krócej, dokładny match wysokowolumenowej frazy "iso 27001 vs soc 2"; "comparison" to filler — Google i tak rozumie intent porównawczy |
| 3 | `audit-evidence-collection-automation` | **`audit-evidence-automation`** | Krócej, zgodne z focus_keyword w bazie ("audit evidence automation"), "collection" redundantne |
| 4 | `soc-2-compliance-tools-stack-2026` | **`soc-2-compliance-tools`** | Evergreen — rok w slugu starzeje URL i blokuje aktualizacje. Rok zostaje w meta_title (gdzie pomaga w CTR) |
| 5 | `compliance-automation-evaluation-guide` | **`compliance-automation-software`** | Match z focus_keyword "compliance automation software" (komercyjny intent, wyższy volume niż "evaluation guide") |
| 6 | `soc-2-for-startups-fast-track-guide` | **`soc-2-for-startups`** | Dokładny match głównej frazy; "fast-track guide" w tytule, nie w URL |
| 7 | `soc-2-audit-preparation-checklist` | **`soc-2-audit-preparation`** | Krócej; "checklist" zostaje w title/H1 (zwiększa CTR), URL czystszy |
| bonus | `soc-2-compliance-cost-timeline` | **`soc-2-cost`** lub zostawić (treść za krótka, 2.7k — najpierw rozwinąć do ~1500 słów) |

**Uwaga:** zmiana slugu = automatycznie tworzy się 301 redirect (mechanizm `useSlugRedirect` już istnieje w projekcie) — żaden link nie zginie.

---

### Co robimy w tej iteracji

1. **Aktualizacja slugów** (6 artykułów EN) — zgodnie z tabelą powyżej. Status pozostaje `draft`.
2. **Sanity-check meta_title / meta_desc** — większość już OK (50–60 / 130–160 znaków). Drobne korekty tam, gdzie po zmianie slugu warto dopasować H1.
3. **Wytyczne graficzne** (poniżej) — tylko jako tekst, nie generujemy plików.
4. **NIE robimy:** tłumaczeń PL/CS, publikacji, generowania grafik AI.

---

### Wytyczne graficzne (featured images, 1200×630, OG-friendly)

Spójna paleta z brandem Quantifier: granat `#0F172A`, akcent `#3B82F6`, biel, akcent compliance-green `#10B981`. Sans-serif (Inter/SF Pro). Bez stockowych ludzi w garniturach.

**1. ISO 27001 vs SOC 2** (`iso-27001-vs-soc-2`)
- Split-screen 50/50: lewa strona = tarcza z napisem "ISO 27001" (granat + biały), prawa = tarcza "SOC 2" (niebieski + biały).
- W centrum pionowa linia podziału z ikoną wagi (⚖) lub strzałkami "VS".
- Subtle grid w tle (compliance/audit feel).
- W rogu: małe flagi 🇪🇺 (ISO) i 🇺🇸 (SOC 2) sygnalizujące rynek.

**2. Audit Evidence Automation** (`audit-evidence-automation`)
- Po lewej: stos chaotycznie ułożonych dokumentów / ikony folderów + symbol ⚠.
- Strzałka pośrodku → koło zębate / automation icon.
- Po prawej: czysty dashboard-mockup z zielonymi checkmarkami w tabeli (3–4 wiersze).
- Komunikat wizualny: chaos → automatyzacja → kontrola.

**3. SOC 2 Compliance Tools** (`soc-2-compliance-tools`)
- Izometryczny "stack" warstw (4–5 nakładających się prostokątów) z etykietami: GRC / IAM / SIEM / Vuln Scan / Training.
- Każda warstwa w innym odcieniu niebieskiego (gradient od jasnego do granatowego).
- W tle subtelna siatka serwerowa lub linie połączeń między warstwami.

**4. Compliance Automation Software** (`compliance-automation-software`)
- Lupa (🔍) na pierwszym planie, w środku lupy widać wycinek dashboardu z kolumnami "Coverage / Evidence / AI / EU / Price" i checkboxami.
- Tło: ghost'owe logo platform compliance (rozmyte, nieczytelne — żeby nie wyglądało reklamowo).
- Akcent: zielony pasek "8 criteria" w dolnym pasku.

**5. SOC 2 for Startups** (`soc-2-for-startups`)
- Rakieta startująca (🚀, ale stylizowana wektorowo, nie emoji) z tarczą SOC 2 jako "ładunkiem".
- Ślad rakiety jako timeline 3 etapów: "Month 1 → Month 3 → Month 6" (oznaczenia tekstowe).
- Tło: gradient noc → świt (granat → niebieski) sugerujący "fast track".

**6. SOC 2 Audit Preparation** (`soc-2-audit-preparation`)
- Pozioma oś czasu / kalendarz z 4–5 milestone'ami: Scope → Gap Analysis → Remediation → Evidence → Audit.
- Każdy milestone jako okrąg z ikoną; checkmarki na pierwszych 3.
- Po prawej stronie sylwetka audytora z teczką (płaska ilustracja, nie zdjęcie).

**Bonus — SOC 2 Cost & Timeline** (jeśli rozwijamy):
- Wykres słupkowy 2D: oś X = "Type 1 / Type 2 / Year 2", oś Y = $. Plus mała ikona zegara obok każdego słupka pokazująca timeline.

---

### Sekcja techniczna

**Operacja:** UPDATE na 6 wierszach `posts` w schemacie public (kolumna `slug`).

```sql
UPDATE posts SET slug = 'iso-27001-vs-soc-2'           WHERE slug = 'iso-27001-vs-soc-2-comparison'    AND lang='en';
UPDATE posts SET slug = 'audit-evidence-automation'    WHERE slug = 'audit-evidence-collection-automation' AND lang='en';
UPDATE posts SET slug = 'soc-2-compliance-tools'       WHERE slug = 'soc-2-compliance-tools-stack-2026'  AND lang='en';
UPDATE posts SET slug = 'compliance-automation-software' WHERE slug = 'compliance-automation-evaluation-guide' AND lang='en';
UPDATE posts SET slug = 'soc-2-for-startups'           WHERE slug = 'soc-2-for-startups-fast-track-guide' AND lang='en';
UPDATE posts SET slug = 'soc-2-audit-preparation'      WHERE slug = 'soc-2-audit-preparation-checklist'  AND lang='en';
```

- Status pozostaje `draft` — brak ekspozycji publicznej, więc redirect-y nie są krytyczne, ale `useSlugRedirect` i tak załatwia sprawę po publikacji.
- Brak zmian w `body_rich`, `meta_title`, `meta_desc`, `featured_image_url` — wszystko zostaje.
- Brak migracji schematu, tylko data migration via migration tool.

**Po Twojej akceptacji:** wykonam UPDATE-y i wrócę z potwierdzeniem. Grafiki wgrasz sam przez panel `/admin/posts/edit` (pole "Główny obrazek"). Tłumaczenia PL/CS — w osobnej iteracji.
