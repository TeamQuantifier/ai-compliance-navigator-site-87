

## Plan: Korekta dat webinarów 3 i 4

Webinary 1 i 2 mają poprawne daty (17.03 i 31.03). Trzeba poprawić webinary 3 i 4:

| Webinar | Obecna data | Poprawna data |
|---------|------------|---------------|
| 3 — nis2-audit-ready | 21 kwietnia | **14 kwietnia** |
| 4 — nis2-kontrola-audyt | 5 maja | **28 kwietnia** |

### Zmiany w 4 plikach:

**`src/data/eventsData.ts`** — zmiana `date` i `dateDisplay`:
- Webinar 3: `2026-04-21` → `2026-04-14`, dateDisplay → "14 kwietnia 2026"
- Webinar 4: `2026-05-05` → `2026-04-28`, dateDisplay → "28 kwietnia 2026"

**`public/locales/pl/translation.json`**:
- `webinar3date`: "📅 21.04 | 10:00" → "📅 14.04 | 10:00"
- `webinar4date`: "📅 05.05 | 10:00" → "📅 28.04 | 10:00"

**`public/locales/en/translation.json`**:
- `webinar3date`: "📅 21 Apr | 10:00 CET" → "📅 14 Apr | 10:00 CET"
- `webinar4date`: "📅 5 May | 10:00 CET" → "📅 28 Apr | 10:00 CET"

**`public/locales/cs/translation.json`**:
- `webinar3date`: "📅 21. 4. | 10:00" → "📅 14. 4. | 10:00"
- `webinar4date`: "📅 5. 5. | 10:00" → "📅 28. 4. | 10:00"

