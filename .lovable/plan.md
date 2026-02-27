

## Plan: Update nis2-audit-ready agenda + remove incorrect "audytor" references

### 1. Replace agenda for webinar 3 (`nis2-audit-ready`)
**File:** `src/data/eventsData.ts` (lines 200-206)

Replace current 5-item agenda with:
- 0–8 min: Polityki, procedury, rejestry / Jakie dokumenty należy wdrożyć
- 8–16 min: Wymagania techniczne i kontrole / Jakie wymagania techniczne należy wdrożyć
- 16–25 min: Raportowanie incydentów do CSIRT / Jak raportować incydenty w ciągu 24/72 h
- 25–30 min: Podejście continuous compliance | Quantifier.ai / Zarządzanie dowodami zgodności w platformie
- 30+ min: Q&A / Pytania uczestników i podsumowanie

### 2. Fix "audytor" references in nis2-audit-ready
**File:** `src/data/eventsData.ts`

- Line 192 trustLine: "na audyt" → "na kontrolę" (NIS2 has kontrola, not audyt)
- Line 211 audience pain: "Ryzyko negatywnego wyniku audytu" → "Ryzyko negatywnego wyniku kontroli"
- Line 212 outcome: "Dashboard gotowości audytowej" → "Dashboard gotowości do kontroli"
- Line 232 FAQ: remove/rephrase "audytami" reference → "Czy muszę mieć wcześniejsze doświadczenie z kontrolami?" / answer adjusted
- Lines 237-238 SEO: replace "audit" → "kontrola" in metaTitle/metaDescription

### 3. Fix "audytor" references in webinar 4 (`nis2-kontrola-audyt`)
**File:** `src/data/eventsData.ts`

- Line 253 trustLine: "kontrolę i audyt NIS2" → "kontrolę NIS2"
- Line 261: "Przebieg audytu NIS2" → "Przebieg kontroli NIS2"
- Line 262: "na dzień audytu" → "na dzień kontroli"
- Line 263: "Symulacja audytu" / "audytor pyta" → "Symulacja kontroli" / "kontroler pyta"
- Line 264: "Zarządzanie audytem" → "Zarządzanie kontrolą"
- Line 271: "negatywnego audytu" → "negatywnej kontroli"
- Line 277: "audytami NIS2" / "oczekiwania audytora" → "kontrolami NIS2" / "oczekiwania kontrolującego"
- Line 283: "pytania techniczne audytora" → "pytania techniczne kontrolującego"
- Line 284: "pytań technicznych audytora" → "pytań technicznych kontrolującego"
- Lines 297-298 SEO: "audyt" → "kontrola"

### Note on terminology
NIS2 involves **kontrole** (inspections by authorities like CSIRT/NASK), not **audyty** (audits by certification bodies like in ISO 27001). All references corrected accordingly.

