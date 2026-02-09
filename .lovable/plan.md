
# Plan: Naprawa problemow z indeksowaniem Google Search Console

## Podsumowanie diagnozy

Po szczegolowej analizie kodu zidentyfikowalem 7 glownych problemow, ktore powoduja bledy indeksowania w Google:

---

## Problem 1: Zduplikowane meta tagi w index.html

Plik `index.html` zawiera **dwa tagi `<title>`**, **dwa `<meta name="description">`** oraz zduplikowane tagi Open Graph. Gdy Googlebot laduje strone bez wykonywania JS, widzi sprzeczne metadane. React Helmet moze nadpisywac tagi dynamicznie, ale boty czesto czytaja surowy HTML.

**Rozwiazanie:** Usunac zduplikowane/statyczne meta tagi z `index.html`, zostawiajac tylko minimalne tagi bazowe. React Helmet bedzie odpowiadal za dynamiczne ustawianie tytulu i opisu na kazdej podstronie.

---

## Problem 2: Brakujace reguly prerendering w vercel.json

Obecne reguly prerendering w `vercel.json` pokrywaja tylko czesc stron. **Brakuje regul dla:**

- Strony prawne: `/legal/terms`, `/legal/privacy`, `/legal/cookies`
- Frameworki: `/frameworks/dora`, `/frameworks/iso-9001`, `/frameworks/hipaa`, `/frameworks/ccpa`, `/frameworks/esg`, `/frameworks/environmental`, `/frameworks/governance`, `/frameworks/product-level`
- Strony produktowe: `/product`, `/product/overview`, inne podstrony produktu
- Role: `/by-roles`, `/by-roles/managers`, `/by-roles/contributors`, `/by-roles/auditor`
- Blog (lista): `/blog`
- Success Stories (lista): `/success-stories`

Gdy Googlebot trafia na te URL-e, dostaje pusty shell HTML SPA zamiast prerenderowanej tresci.

**Rozwiazanie:** Dodac reguly rewrite w `vercel.json` dla wszystkich brakujacych stron statycznych.

---

## Problem 3: Brakujaca tresc w prerender-marketing

Funkcja edge `prerender-marketing` ma dane stron tylko dla: index, soc2-automation, iso27001, gdpr-compliance, nis2, grc-platform, product-features, plans, about, contact, partners, frameworks. **Brakuje tresci dla:**

- Stron prawnych (terms, privacy, cookies)
- Podstron frameworkow (dora, iso-9001, hipaa, ccpa, esg, environmental, governance, product-level)
- Podstron produktu (overview, compliance-officer, task-data-management, etc.)
- Stron ról (by-roles, managers, contributors, auditor)
- Lista bloga i success stories

**Rozwiazanie:** Dodac dane tresci (PageData) dla wszystkich brakujacych stron we wszystkich trzech jezykach (EN, PL, CS).

---

## Problem 4: Brakujace tresci czeskie w prerender-marketing

Wieksznosc stron w prerender-marketing ma tylko wersje EN i PL. Czeski (CS) korzysta z fallbacku na angielski (`pageData[locale] || pageData['en']`), co oznacza ze Google otrzymuje tresc w jezyku angielskim, ale ze znacznikami wskazujacymi na czeski - to powoduje ze Google oznacza te strony jako "wykryte, niezindeksowane".

**Rozwiazanie:** Dodac pelne tresci czeskie (CS) dla kazdej strony w prerender-marketing.

---

## Problem 5: Niespojne tagi hreflang

Prerender-marketing uzywa prostych kodow jezykowych (`en`, `pl`, `cs`), natomiast PageTemplate i SEOHead uzywaja regionalnych kodow (`en`, `pl-PL`, `cs-CZ`). Ta niespojnosc moze powodowac ze Google nie laczy prawidlowo wersji jezykowych.

**Rozwiazanie:** Ujednolicic hreflang w prerender-marketing, prerender-post i prerender-story do uzycia regionalnych kodow: `en`, `pl-PL`, `cs-CZ`.

---

## Problem 6: Prerender-post i prerender-story nie obsluguja czeskiego

Oba edge functions obsluguja tylko alternacje EN<->PL (linia 101 w prerender-post: `const alternateLocale = locale === 'en' ? 'pl' : 'en'`). Posty czeskie nie beda mialy poprawnych tagow hreflang.

Dodatkowo brakuje `<meta name="robots" content="index, follow">` w obu funkcjach.

**Rozwiazanie:** Rozszerzyc logike alternate o obsluge trzech jezykow (EN, PL, CS) i dodac tag robots.

---

## Problem 7: Sitemap zawiera nieistniejaca strone /frameworks/nist

Sitemap referencuje `/frameworks/nist` (linia 42 w sitemap/index.ts), ale ta strona nie istnieje w routerze aplikacji. Google probuje ja zaindeksowac i dostaje blad.

**Rozwiazanie:** Usunac `/frameworks/nist` z sitemap lub dodac strone NIST.

---

## Dodatkowe problemy

- **Stare URLe w linkach wewnetrznych prerender-marketing**: Niektore internal links uzywaja starych sciezek jak `/frameworks/cybersecurity/soc`, `/soc2-automation`, `/iso27001` zamiast nowych `/frameworks/soc`, `/frameworks/iso-27001`.
- **URL `/contact.html`**: Prawdopodobnie stary link z zewnetrznej strony, nalezy dodac redirect 301.

---

## Kolejnosc implementacji

Ze wzgledu na rozmiar zmian, proponuje podzielenie pracy na etapy:

### Etap 1 - Szybkie naprawy (najwyzszy priorytet)
1. Oczyscic `index.html` z duplikatow meta tagow
2. Usunac `/frameworks/nist` z sitemap
3. Naprawic stare URLe w linkach wewnetrznych prerender-marketing

### Etap 2 - Rozszerzenie prerendering
4. Dodac brakujace reguly rewrite w `vercel.json` dla wszystkich stron
5. Dodac brakujaca tresc (PageData) w `prerender-marketing` dla nowych stron
6. Dodac pelne tresci czeskie (CS) do prerender-marketing

### Etap 3 - Spójnosc techniczna
7. Ujednolicic hreflang na regionalne kody we wszystkich edge functions
8. Rozszerzyc prerender-post i prerender-story o obsluge CS
9. Dodac `<meta name="robots">` do prerender-post i prerender-story

---

## Szczegoly techniczne

### Plik: index.html
Usunac linie 51-77 (zduplikowany blok z drugim `<title>`, `<meta name="description">`, `<meta name="robots">`, `<link rel="canonical">`, duplikaty OG i Schema.org). Zostawic oryginalne meta tagi z linii 18-50.

### Plik: vercel.json
Dodac reguly rewrite z detekcja bota dla ~20 dodatkowych sciezek, np.:
```text
/frameworks/dora       -> prerender-marketing?page=dora
/frameworks/iso-9001   -> prerender-marketing?page=iso-9001
/legal/terms           -> prerender-marketing?page=legal-terms
/blog                  -> prerender-marketing?page=blog
/success-stories       -> prerender-marketing?page=success-stories
/by-roles              -> prerender-marketing?page=by-roles
```

### Plik: supabase/functions/sitemap/index.ts
Usunac wpis `{ path: '/frameworks/nist', ... }` ze statycznych stron.

### Plik: supabase/functions/prerender-marketing/index.ts
- Dodac dane PageData dla ~15 nowych stron (legal, framework subpages, by-roles, blog list, success-stories list)
- Dodac pelne tresci CS dla kazdej strony
- Naprawic linki wewnetrzne do nowej struktury URL
- Uzyc regionlnych kodow hreflang (`pl-PL`, `cs-CZ`)

### Pliki: prerender-post/index.ts i prerender-story/index.ts
- Rozszerzyc logike alternate o trzy jezyki
- Wyszukiwac alternaty przez `group_id` zamiast prostego EN<->PL
- Dodac `<meta name="robots" content="index, follow">`
- Uzyc regionalnych kodow hreflang

---

## Przewidywany efekt

Po wdrozeniu tych zmian:
- Google bedzie otrzymywal pelny, poprawny HTML dla kazdej strony
- Tagi canonical beda unikalne i poprawne dla kazdego URL
- Tagi hreflang beda spojne i prawidlowo laczylywersje jezykowe
- Czeskie strony beda serwowaly tresc po czesku zamiast angielskiego fallbacku
- Nieistniejace strony zostana usuniete z sitemap
- Bledy 5xx powinny zniknac dzieki prawidlowej obsludze prerenderowania

**Uwaga**: Ze wzgledu na duza ilosc zmian (szczegolnie dodawanie tresci CS dla 15+ stron w prerender-marketing), plan moze wymagac kilku sesji implementacji. Proponuje zaczac od Etapu 1 (szybkie naprawy), a potem przejsc do Etapow 2 i 3.
