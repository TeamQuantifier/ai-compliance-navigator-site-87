# Redesign zakładki Wiedza — Knowledge Hub

## Cel
Przebudować landing page obecnie podpinający się pod `/blog` tak, aby pełnił funkcję **Knowledge Hub**: w jednym miejscu użytkownik znajdzie blog, case studies, szkolenia, pliki do pobrania i webinary. Mniej „blogowej listy wpisów”, więcej „centrum wiedzy” dla zarządów, CISO, compliance officerów i audytorów.

## Obecny stan
- Zakładka menu **Wiedza** prowadzi do `/blog`.
- `BlogList.tsx` składa się z: hero „Blog Quantifier”, sekcji pobierania e-booka (Compliance Kalendarz 2026), siatki wpisów blogowych, sekcji historii sukcesu.
- Brak wyraźnej nawigacji między rodzajami treści: blog, case studies, szkolenia, pliki do pobrania.
- Sekcja „pliki do pobrania” jest obecnie tylko pop-up e-booka z formularzem e-mail.
- Dostępne do pobrania: `/downloads/compliance-kalendarz-2026.pdf`.

## Inspiracje z rynku (audyt konkurencji)
### Vanta /resources
- Lekki, edytorski layout: duży H1 + zdanie opisowe.
- **Featured resource** na samej górze — jeden wyróżniony materiał (webinar, raport).
- Lewy sidebar: wyszukiwarka + kolekcje frameworków (SOC 2, ISO 27001, GDPR itp.).
- Karty treści z tagami kategorii i czytelną hierarchią.

### Drata /resources
- Ciemny, premium hero z karuzelą wyróżnionych materiałów.
- Filtry: Type, Category, Topic, Frameworks, Industry + search.
- Mocne wizualnie karty z grafikami.

### Wnioski dla Quantifier
- Oddzielić **rodzaje treści** (Blog, Case Studies, Downloads, Training, Events) i dać im wizualne różne „wagi”.
- Wyeksponować **najważniejszy materiał** (np. Kalendarz 2026, raport NIS2/KSC, najnowsze case study).
- Dodać wyszukiwarkę / filtr, która pozwala szybko znaleźć treść po frameworku (NIS2, ISO 27001, ESG, DORA, PPWR).
- Case studies muszą być widoczne jako samodzielna sekcja, nie tylko dodatek pod blogiem.

## Proponowana struktura Knowledge Hub

### 1. Hero — „Centrum wiedzy Quantifier”
- H1: wartość, nie nazwa strony (np. „Wiedza, która pomaga zmniejszyć ryzyko i przyspieszyć compliance”).
- Subline: 1–2 zdania o tym, kogo to strona obsługuje (CISO, zarządy, audytorzy, managerowie).
- Krótki pasek z ikonami szybkiego dostępu do głównych sekcji: Blog, Case Studies, Szkolenia, Do pobrania, Webinary.
- Możliwość wyszukiwania (opcjonalnie w hero lub tuż pod nim).

### 2. Wyróżniony materiał (Featured card)
- Duży, dwukolumnowy tease jednego priorytetowego zasobu: np. „Compliance Kalendarz 2026 — bezpłatny PDF” lub najnowszy raport NIS2.
- Zawiera: tytuł, 2–3 bulletpointy wartości, CTA główny (pobierz / czytaj) + miniaturowy podgląd okładki.

### 3. Szybkie ścieżki tematyczne (Topic pills / Bento grid)
- Małe karty / chipy frameworków: NIS2 / KSC, ISO 27001, SOC 2, DORA, GDPR, ESG, DPP / PPWR, LCA, Whistleblowing.
- Klik prowadzi do listy wpisów/blogów filtrowanej po danej kategorii/frameworku.

### 4. Sekcja „Case Studies / Historie sukcesu”
- Poziomy pas 3–4 kart z najnowszymi / najważniejszymi historiami.
- Każda karta: logo klienta (jeśli dostępne), tytuł, branża, krótki wynik (np. „Gotowość KSC w 10 dni roboczych”).
- CTA: „Zobacz wszystkie historie sukcesu”.

### 5. Sekcja „Szkolenia”
- Dwa poziomy:
  - 1h szkolenie NIS2/KSC dla zarządów (link do `/pl/szkolenia-cyberbezpieczenstwo-dla-firm`).
  - Szkolenia dedykowane / wdrożeniowe (link do formularza kontaktowego).
- Wizualnie inna niż blog — karta z datą, czasem trwania, profilem prowadzącego, CTA.

### 6. Sekcja „Do pobrania”
- Pojedyncze karty zasobów: PDF, checklisty, kalendarze.
- Obecnie: Compliance Kalendarz 2026.
- Miejsce na przyszłe zasoby: checklisty NIS2, szablony polityk, mapy wdrożenia.
- CTA „Pobierz” może otwierać formularz e-mail (jak obecnie) lub bezpośredni download.

### 7. Najnowsze wpisy blogowe
- Siatka 3–6 najnowszych artykułów z kategoriami, czasem czytania, datą.
- Opcjonalnie filtrowanie na żywo (po kategorii / frameworku).
- CTA „Przeglądaj wszystkie wpisy”.

### 8. Webinary / Wydarzenia
- Krótki pas z najbliższym / ostatnim webinarem.
- CTA „Zapisz się” / „Zobacz nagranie”.

### 9. Sticky newsletter / CTA końcowe
- Zachęta do zapisu na newsletter (krótki formularz e-mail).
- Alternatywnie: CTA „Sprawdź gotowość firmy” lub „Umów demo”.

## UX / UI — kierunki do przegadania
- Layout: **magazine / editorial** (jak Vanta) lub **bento-grid** z ciemnym hero (jak Drata). Należy ustalić z użytkownikiem.
- Typografia: wykorzystać obecne tokeny projektowe (pamięć: SF Pro Display headings, Inter body).
- Kolory: projekt ma już ciemne, profesjonalne tła — należy zachować spójność, nie wprowadzać nowych palet bez uzgodnienia.
- Animacje: subtelne wejścia sekcji, hover na kartach (lift + shadow), proste liczniki tylko tam, gdzie mają sens (np. deadline NIS2/KSC).

## SEO & techniczne
- Strona zachowuje canonical z trailing slash (`/pl/blog/` zgodnie z pamięcią o mandatory trailing slashes).
- H1 tylko jeden, hierarchia H2/H3 zachowana.
- Linki wewnętrzne przez `<Link>` z React Router (pamięć: internal SPA links).
- Obrazy nie-hero z `loading="lazy"` i explicit width/height.
- Hreflang: PL/EN/CS wersje strony muszą być zsynchronizowane.
- Strona powinna mieć BreadcrumbsList JSON-LD i CollectionPage lub Blog JSON-LD.

## Dane potrzebne do wdrożenia
1. Tłumaczenia PL/EN/CS dla nowych kluczy: `knowledgeHub.*`, `featuredResource.*`, `downloads.*`, `trainingSection.*`, `caseStudiesSection.*`.
2. Lista zasobów do pobrania: tytuł, opis, plik, czy wymaga formularza e-mail.
3. Lista priorytetowych case studies (z `src/data/caseStudies.ts` lub CMS stories).
4. Priorytetowy materiał do sekcji Featured (domyślnie: Compliance Kalendarz 2026).
5. Wybór wariantu wizualnego (magazine vs bento / dark vs light hero).

## Etapy wdrożenia (po akceptacji planu)
1. **Konfiguracja danych** — dodać nowe klucze i18n, przygotować listę downloads i featured resource.
2. **Refaktoryzacja `BlogList.tsx`** (lub nowy `KnowledgeHub.tsx`) — podział na sekcje zgodnie z powyższą strukturą.
3. **Nowe komponenty** — FeaturedResourceCard, DownloadCard, TrainingTeaser, CaseStudyTeaser, TopicPills.
4. **Podłączenie danych** — Supabase dla blogów, statyczne dane dla case studies/downloads/szkoleń.
5. **SEO** — SEOHead, JSON-LD, hreflang, canonical.
6. **Testy** — build, typecheck, przegląd w preview, weryfikacja linków i trailing slashes.

## Decyzje do podjęcia z użytkownikiem
1. Czy zachować URL `/blog` i przebudować stronę, czy stworzyć nowy `/wiedza` i przekierować `/blog` do nowego Hubu?
2. Jaki wariant wizualny preferujesz: **magazine/editorial** (jasny, Vanta-style) czy **bento/dark hero** (Drata-style)?
3. Czy sekcja „Do pobrania” ma wymagać formularza e-mail dla każdego pliku, czy tylko dla niektórych?
4. Czy dodać pasek wyszukiwania na tej stronie, czy wystarczą filtry frameworków?
