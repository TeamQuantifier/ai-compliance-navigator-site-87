

# Rozbudowa llms.txt o sekcje Blog i opisy frameworkow (ESG/CSRD)

## Co zostanie zmienione

Plik `public/llms.txt` zostanie rozbudowany o:

### 1. Opisy frameworkow

Kazdy framework w sekcji "Framework-Specific Pages" otrzyma krotki opis (1-2 zdania), np.:

- **ESG**: ESG reporting and CSRD compliance including ESRS standards, double materiality analysis, carbon footprint (Scope 1-3), and sustainability reporting
- **NIS2**: Cybersecurity compliance for essential and important entities under the EU NIS2 Directive
- **DORA**: Digital operational resilience for financial institutions
- itd.

### 2. Nowa sekcja "Definitions"

Kluczowe pojecia i definicje, ktore pomoga LLM-om zrozumiec kontekst:

- CSRD (Corporate Sustainability Reporting Directive)
- ESRS (European Sustainability Reporting Standards)
- Double Materiality Analysis
- GRC (Governance, Risk, Compliance)
- Carbon Footprint Scope 1, 2, 3
- Continuous Compliance

### 3. Nowa sekcja "Blog Articles"

Lista wszystkich opublikowanych artykulow z tytulami i linkami, pogrupowana po jezyku:

**English:**
- NIS2 Directive in Practice: https://quantifier.ai/en/blog/nis2-directive
- Compliance Monitoring Guide: https://quantifier.ai/en/blog/compliance-monitoring
- Continuous Compliance: https://quantifier.ai/en/blog/continuous-compliance-from-reaction-to-proaction
- EcoVadis in Practice: https://quantifier.ai/en/blog/ecovadis-in-practice
- AI Agents in Quantifier: https://quantifier.ai/en/blog/ai-agents-in-quantifier
- Cyberattack Ransomware Case Study: https://quantifier.ai/en/blog/case-study-cyberattack-ransomware-manufacturing-company

**Polish:**
- Dyrektywa NIS2 w Praktyce: https://quantifier.ai/pl/blog/dyrektywa-nis2
- Compliance Monitoring: https://quantifier.ai/pl/blog/compliance-monitoring
- Ciagla Zgodnosc: https://quantifier.ai/pl/blog/ciagla-zgodnosc-od-reakcji-do-proakcji
- EcoVadis w Praktyce: https://quantifier.ai/pl/blog/ecovadis-w-praktyce-ocena-esg
- AI Agent w Quantifier: https://quantifier.ai/pl/blog/ai-agent-w-quantifier-jak-agenci-autonomiczni-dowodza-zgodnosci
- Cyberatak Ransomware: https://quantifier.ai/pl/blog/blog-cyberatak-ransomware-firma-produkcyjna

**Czech:**
- EcoVadis v Praxi: https://quantifier.ai/cs/blog/ecovadis-v-praxi-hodnoceni-esg
- AI Agenti v Quantifier: https://quantifier.ai/cs/blog/ai-agenti-v-quantifier
- Continuous Compliance: https://quantifier.ai/cs/blog/pro-je-continuous-compliance
- Ransomware Case Study: https://quantifier.ai/cs/blog/pripadova-studie-kyberutok-ransomware

## Szczegoly techniczne

- Edycja jednego pliku: `public/llms.txt`
- Brak zmian w kodzie, bazie danych ani funkcjach edge
- Plik jest statyczny -- przy dodawaniu nowych artykulow w przyszlosci trzeba bedzie recznie zaktualizowac ten plik (lub rozwazyc dynamiczne generowanie w przyszlosci, podobnie jak sitemap)

