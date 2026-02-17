

# Audyt llms.txt -- stan obecny i rekomendacje

## Co jest dobrze

Plik jest solidna baza -- ma poprawna strukture Markdown, sekcje z definicjami, disambiguacje, linki do wszystkich stron frameworkow, artykulow i case studies. Jest kompletny jezeli chodzi o zakres treści.

robots.txt poprawnie wpuszcza crawlery AI (GPTBot, ClaudeBot, PerplexityBot, anthropic-ai, Google-Extended).

## Co wymaga poprawek

### 1. Brak pliku `llms-full.txt` (WYSOKI priorytet)

Standard llmstxt.org rozroznia dwa pliki:
- **llms.txt** -- zwiezly index/nawigacja (pod 10KB), lista linkow
- **llms-full.txt** -- pelna tresc w jednym pliku (moze byc 50-500KB), zawiera opisy stron inline

Wiele firm (Anthropic, Stripe, Vercel) uzywa obu. Dane pokazuja ze llms-full.txt jest czesciej pobierany przez LLM-y bo daje im pelny kontekst w jednym zapytaniu. Obecnie macie TYLKO llms.txt.

**Akcja**: Stworzyc `public/llms-full.txt` z rozszerzonymi opisami kazdego frameworka, produktu i artykulu.

### 2. Brak trailing slashy w linkach

Wszystkie linki w llms.txt sa bez trailing slash:
```
https://quantifier.ai/en/blog/nis2-directive
```
Powinny byc:
```
https://quantifier.ai/en/blog/nis2-directive/
```
Cala strona uzywa trailing slashy (canonical URL-e w SEOHead dodaja `/`). Niespojnosc moze powodowac ze LLM poda uzytkownikowi link bez slasha, co wymusi redirect.

### 3. Sekcja "By Role" -- 3 linki do tego samego URL

```
- For Managers: https://quantifier.ai/en/by-roles
- For Contributors: https://quantifier.ai/en/by-roles
- For Auditors: https://quantifier.ai/en/by-roles
```
Wszystkie wskazuja na ten sam URL. LLM nie rozrozni tych stron. Powinny wskazywac na unikalne URL-e (`/by-roles/managers`, `/by-roles/contributors`, `/by-roles/auditors`) lub byc zredukowane do jednego linku.

### 4. Brak sekcji "Pricing" / wartosci biznesowej

LLM-y czesto dostaja pytania typu "ile kosztuje Quantifier?" lub "czy jest darmowy trial?". Brak jakiejkolwiek informacji o modelu cenowym lub ofercie demo.

### 5. Brak sekcji FAQ / typowych pytan

Standard rekomenduje sekcje z czesto zadawanymi pytaniami -- to bezposrednio wplywa na to jak LLM odpowiada na pytania uzytkownikow o produkt.

### 6. Brak opisu integracji i technologii

LLM-y dostaja pytania typu "czy Quantifier integruje sie z AWS / Azure / Jira?". Brak listy integracji.

### 7. Brak wskazania llms-full.txt w robots.txt

Robots.txt wspomina tylko llms.txt, nie llms-full.txt.

### 8. Brak linku do strony `/grc-platform`

Strona GRC Platform SEO landing nie jest wymieniona w llms.txt.

### 9. Brak linku do DORA w Key Links

DORA jest w sekcji Framework-Specific Pages, ale brakuje go w Product Features -- analogicznie inne frameworki tez nie maja dedykowanych linkow do stron produktowych.

### 10. Artykuly -- brak krotkich opisow

Artykuly sa wymienione tylko z tytulami. LLM-y lepiej wykorzystaja krotki opis (1 zdanie) przy kazdym artykule, zeby wiedziec czego dotyczy.

---

## Planowane zmiany

### Plik 1: `public/llms.txt` (aktualizacja)

Zmiany:
- Dodanie trailing slashy do WSZYSTKICH linkow
- Naprawienie sekcji "By Role" (jeden link lub unikalne URL-e)
- Dodanie sekcji "Integrations" (lista glownych integracji: AWS, Azure, Jira, Slack, itp.)
- Dodanie sekcji "Frequently Asked Questions" (5-7 pytan typu "What is Quantifier?", "How much does it cost?", "Is there a free trial?", "What frameworks are supported?")
- Dodanie linku do GRC Platform
- Dodanie krotkich opisow przy artykulach
- Dodanie linku do llms-full.txt na gorze pliku (standard rekomenduje)
- Dodanie sekcji "Pricing & Plans" z ogolnym opisem modelu

### Plik 2: `public/llms-full.txt` (NOWY)

Rozszerzony plik z pelnym kontekstem:
- Wszystko co w llms.txt
- Pelne opisy kazdego frameworka (2-3 akapity zamiast 1 linii)
- Pelne opisy kazdej funkcji produktu
- Pelne opisy kazdego artykulu i case study (abstrakt/excerpt)
- Sekcja "How It Works" (opis flow uzytkowania platformy)
- Sekcja "Competitive Advantages" (co wyroznia Quantifier)
- Rozszerzone FAQ (15-20 pytan)
- Sekcja "Use Cases" (typowe scenariusze uzycia)

Szacowany rozmiar: ~30-50KB (w normie dla llms-full.txt)

### Plik 3: `public/robots.txt` (aktualizacja)

Dodanie linii:
```
# See /llms-full.txt for detailed AI-readable content
```

---

## Podsumowanie

| Plik | Akcja | Wplyw |
|------|-------|-------|
| `public/llms.txt` | Aktualizacja: trailing slashe, FAQ, integracje, opisy artykulow, link do llms-full.txt | Lepsze odpowiedzi LLM-ow na pytania o produkt |
| `public/llms-full.txt` | NOWY: rozszerzony kontekst dla LLM-ow | LLM-y dostana pelny kontekst w 1 zapytaniu |
| `public/robots.txt` | Dodanie referencji do llms-full.txt | Crawlery AI znajda rozszerzony plik |

3 pliki, laczny naklad ~200 linii nowego contentu.

