# Landing page: Checklista NIS2/KSC (lead magnet)

Krótki, jednocelowy landing page do pobrania bezpłatnej checklisty NIS2/KSC 2.0 (arkusz roboczy) plus strona podziękowania z dalszą ścieżką.

## Adresy

- PL: `/pl/checklista-nis2-ksc-wdrozenie-audyt/`
- Podziękowanie: `/pl/checklista-nis2-ksc-wdrozenie-audyt/dziekujemy/`
- Wersja PL jako główna (fraza polska). EN/CS na razie bez tłumaczenia — hreflang tylko `pl` + self-canonical, żeby nie generować konfliktów.

## Struktura strony (krótka, 5 sekcji)

```text
1. HERO (split: treść + formularz w karcie, sticky na desktopie)
   H1: Checklista NIS2/KSC — wdrożenie i audyt krok po kroku
   Lead: Pobierz bezpłatną checklistę NIS2/KSC 2.0 w arkuszu roboczym —
         z harmonogramem, właścicielami zadań i listą dowodów do audytu.
   Pasek zaufania: prawnicy i praktycy audytu · metodyka zgodna z ustawą
         o KSC · gotowe dowody dla organu
   Formularz: imię, e-mail służbowy, firma + zgoda → CTA „Pobierz checklistę”

2. CO ZAWIERA ARKUSZ (4 karty)
   harmonogram do pierwszego audytu · podział odpowiedzialności (RACI)
   lista wymaganych działań · lista dowodów do audytu

3. PODGLĄD ARKUSZA
   makieta zakładek arkusza (Harmonogram / Właściciele / Dowody) —
   komponent React w stylu istniejących mockupów, bez zrzutów ekranu

4. DLA KOGO / JAK UŻYWAĆ (3 punkty + krótkie FAQ 4 pytania)
   FAQ z JSON-LD FAQPage

5. CTA końcowe
   „Pobierz checklistę” + link „Sprawdź w quizie, czy podlegasz KSC”
```

Styl: paleta i typografia jak `/pl/start-nis2-ksc/` (navy/ink, editorial, bez gradientowego „AI look”), krótkie myślniki, formalne „Państwo”.

## Strona podziękowania

Cztery wyraźne kroki, jeden pod drugim, numerowane:

1. Pobierz pliki — bezpośredni przycisk do pliku (XLSX + PDF).
2. Sprawdź w quizie, czy organizacja podlega KSC → `/pl/sprawdz-cyberbezpieczenstwo/`
3. Zobacz platformę NIS2/KSC → `/pl/frameworks/nis2-ksc/`
4. Umów konsultację dotyczącą kwalifikacji lub wdrożenia → `/pl/contact/`

Pod spodem informacja o sekwencji e-mail (dzień 0 / 2 / 5 / 8) — tylko dla osób, które zaznaczyły zgodę marketingową; sekwencja jest realizowana po stronie MailerLite na podstawie tagu, nie w kodzie strony.

## Techniczne

- Nowy plik `src/pages/services/Nis2ChecklistLanding.tsx` + `src/pages/services/Nis2ChecklistThankYou.tsx`, trasy w `src/App.tsx`.
- Formularz: nowy komponent `ChecklistDownloadForm` na wzorze `EbookDownloadSection` — `newsletterClient.subscribe` z `source: 'checklist_nis2_ksc'`, tagi `['checklist','nis2_ksc']`, zapis `source_url` (spójnie z panelem Leady), a następnie `navigate` na stronę podziękowania.
- Pliki do pobrania w `public/downloads/`: `checklista-nis2-ksc-2026.xlsx` (arkusz roboczy: Harmonogram, Właściciele, Dowody, Legenda) — wygeneruję go skryptem, oraz jednostronicowa instrukcja PDF. Jeśli wolą Państwo dostarczyć własny arkusz, podstawię plik zamiast generowanego.
- SEO: `PageTemplate` z meta title „Checklista NIS2/KSC: wdrożenie i audyt krok po kroku”, meta description zgodnie z briefem, canonical z trailing slash, JSON-LD `FAQPage` + `BreadcrumbList`. Strona podziękowania: `noIndex`.
- Wpisy w sitemapie (edge function `sitemap`) oraz link z Centrum wiedzy (sekcja „Do pobrania” — zastąpi obecny placeholder checklisty) i z `/pl/start-nis2-ksc/`.
- Prerender: strona statyczna, więc `prerenderReady` przez `PageTemplate`.

## Pytania

- Czy mają Państwo gotowy arkusz checklisty do podstawienia, czy generuję zawartość (harmonogram 10 dni, właściciele, dowody) po swojej stronie?
- Czy landing ma powstać także w EN/CS, czy na razie tylko PL?
