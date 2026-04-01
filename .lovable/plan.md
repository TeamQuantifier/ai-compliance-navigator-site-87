

## Refaktoryzacja EN wersji /frameworks/nis-2 na EU Baseline

### Zakres
Polska wersja strony pozostaje bez zmian. Wersja EN zostanie przeredagowana, aby jasno komunikować, że jest to strona EU-wide baseline (nie specyficzna dla jednego kraju). Wersja CS zostanie zaktualizowana analogicznie do EN (EU baseline + wzmianka o czeskiej implementacji).

### Zmiany w tłumaczeniach EN (`public/locales/en/translation.json` + `src/i18n/locales/en.json`)

Kluczowe zmiany w `nis2Ksc`:

1. **Hero**:
   - `bannerText`: "NIS2 directive is now in force across the EU" → ok, zostaje
   - `heading1`: "Your organisation must comply with NIS2." → **"EU organisations must comply with NIS2."**
   - `subtext1`: dodanie "across the EU" i usunięcie sugestii jednego kraju
   - `subtext2`: dodanie "Each EU member state implements NIS2 into national law — Quantifier supports compliance across jurisdictions."

2. **Urgency**: dodanie punktu "Each member state sets its own scope, deadlines and enforcement" 

3. **Problem**: bez zmian (uniwersalny)

4. **Solution heading**: "AI-native operational platform for NIS2" → **"AI-native NIS2 compliance platform for EU organisations"**

5. **Steps**: bez zmian (uniwersalne)

6. **Auditor heading**: "When the auditor walks in" → **"When the inspector arrives"** (NIS2 = kontrole, nie audyty — zgodnie z terminologią projektu)

7. **SEO meta**:
   - `titleEn`: "NIS2 Compliance Software for EU Organisations | Quantifier.ai"
   - `descEn`: "AI-native GRC platform for NIS2 compliance across the EU. Gap analysis, risk management, incident workflows and continuous compliance in one system."
   - FAQ: dodanie pytania "Does NIS2 apply the same way in every EU country?" z odpowiedzią wyjaśniającą transpozycję

8. **Final CTA**: bez zmian

### Zmiany w tłumaczeniach CS (`public/locales/cs/translation.json`)

Analogicznie do EN ale z czeskim kontekstem:
- Hero heading: "Vaše organizace musí splnit NIS2." → **"Organizace v EU musí splnit NIS2."**
- Solution heading: dodanie "pro organizace v EU"
- Auditor: "auditor" → "inspektor" (kontrole, nie audyty)
- SEO title: "NIS2 Compliance Software pro organizace v EU | Quantifier.ai"

### Pliki do edycji
1. `public/locales/en/translation.json` — sekcja `nis2Ksc` (~30 zmian tekstowych)
2. `src/i18n/locales/en.json` — mirror tych samych kluczy `nis2Ksc`
3. `public/locales/cs/translation.json` — sekcja `nis2Ksc` (~15 zmian tekstowych)

### Bez zmian
- `public/locales/pl/translation.json` — PL zostaje jak jest
- `src/pages/seo-landing/Nis2Ksc.tsx` — komponent bez zmian (używa kluczy i18n)
- Routing, sitemap, llms-txt — bez zmian

