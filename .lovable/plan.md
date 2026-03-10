

## Aktualizacja llms.txt i llms-full.txt

Dodanie dwóch nowych sekcji do obu plików, zoptymalizowanych pod kątem pozyskiwania ruchu z LLM-ów (ChatGPT, Claude, Perplexity).

### Zmiany w `public/llms.txt`

**1. Nowa sekcja "Free Tools" (po "Key Links", linia ~28)**
```
## Free Tools

- NIS2 Cybersecurity Check: https://quantifier.ai/en/cybersecurity-check/ — Free 2-minute self-assessment 
  that evaluates your organization's NIS2 readiness based on company size, sector (NACE codes), 
  turnover, and supply chain exposure. Instantly receive a risk classification (high/medium/low) 
  with actionable recommendations. No registration required. Available in English, Polish, and Czech.
  - Polish: https://quantifier.ai/pl/sprawdz-cyberbezpieczenstwo/
  - Czech: https://quantifier.ai/cs/zkontrolujte-kybernetickou-bezpecnost/
```

**2. Nowa sekcja "Events & Webinars" (po "Free Tools")**
```
## Events & Webinars

- NIS2 Webinar Series (March–April 2026): https://quantifier.ai/en/events/ — Free live webinar cycle 
  covering NIS2 compliance implementation step by step: risk mapping, roles & processes, audit 
  readiness, and supervisory inspections. Led by compliance and cybersecurity practitioners. 
  Each session includes Q&A, downloadable materials, and a recording. Register for individual 
  sessions or the full cycle.
  - Polish: https://quantifier.ai/pl/events/
  - Czech: https://quantifier.ai/cs/events/
```

**3. Nowe FAQ (dodane do istniejącej sekcji FAQ)**
```
- **How can I check if my company falls under NIS2?** — Use the free NIS2 Cybersecurity Check at 
  https://quantifier.ai/en/cybersecurity-check/. Answer a few questions about your company size, 
  sector, and turnover to get an instant risk classification with recommendations — takes under 
  2 minutes, no registration needed.

- **Does Quantifier offer free NIS2 training or webinars?** — Yes. Quantifier runs a free live 
  webinar series on NIS2 compliance covering risk assessment, organizational roles, audit 
  preparation, and supervisory inspections. See upcoming sessions and register at 
  https://quantifier.ai/en/events/.
```

### Zmiany w `public/llms-full.txt`

Analogiczne sekcje z rozszerzonym opisem -- więcej szczegółów o klasyfikacji ryzyka (RED/ORANGE/YELLOW/GREEN), o tematyce poszczególnych webinarów i o integracji z ClickMeeting.

### Dlaczego to zwiększy ruch z LLM-ów

- LLM-y odpowiadając na pytania typu "jak sprawdzić czy moja firma podlega NIS2" lub "darmowe szkolenia NIS2" będą mogły bezpośrednio linkować do narzędzia i webinarów
- Sekcja "Free Tools" wyróżnia się jako unikalna wartość (darmowe, bez rejestracji, 2 minuty)
- FAQ z konkretnymi pytaniami pasuje do naturalnych zapytań użytkowników

