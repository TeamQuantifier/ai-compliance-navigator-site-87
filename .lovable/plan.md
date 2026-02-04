

# Plan: Naprawa grupowania artykułów i dodanie czeskich wersji

## Podsumowanie problemu

### Sitemap ✅ Działa poprawnie
Sitemap jest dynamiczny - edge function `sitemap/index.ts` pobiera z bazy wszystkie opublikowane posty i generuje XML w czasie rzeczywistym. Cache 1h/24h oznacza że zmiany pojawiają się automatycznie.

**Nie trzeba nic zmieniać!** Gdy dodasz/edytujesz artykuł ze statusem `published`, pojawi się w sitemap automatycznie.

### CMS - Brakujące wersje czeskie ❌
Artykuły mają **różne `group_id` dla PL i EN** zamiast jednego wspólnego. CMS ładuje wszystkie wersje językowe po `group_id`, więc gdy PL ma inny group_id niż EN, system nie łączy ich jako jeden artykuł.

| Artykuł | PL group_id | EN group_id | Połączone? |
|---------|------------|-------------|------------|
| Continuous Compliance | fedaa412... | 14a6120f... | ❌ Różne |
| EcoVadis | aa0ab5bc... | 03263f56... | ❌ Różne |
| Cyberatak ransomware | cba0c0eb... | cf105d41... | ❌ Różne |
| AI Agent | 3f82d40e... | 7441db9f... | ❌ Różne |

---

## Rozwiązanie

### Krok 1: Zgrupowanie artykułów pod jednym group_id

Dla każdej pary PL/EN artykułów:
- Wybieram jeden `group_id` jako główny (EN)
- Aktualizuję PL post aby miał ten sam `group_id`
- Tworzę pustą wersję CS z tym samym `group_id`

### Krok 2: Aktualizacja tabeli alternates

Po zgrupowaniu, tabela `alternates` musi zawierać poprawne powiązania hreflang między wszystkimi wersjami językowymi.

---

## Szczegóły techniczne

### SQL do naprawy danych

```sql
-- Artykuł 1: Continuous Compliance
-- PL: fedaa412-5ed9-469c-a75c-1b4d436d93e5 / id: 62e81936...
-- EN: 14a6120f-30ae-47bc-bfdd-8aa98020bfa4 / id: 632d8856...
-- CS: 14a6120f-30ae-47bc-bfdd-8aa98020bfa4 / id: d442b907... (już ok!)

UPDATE posts 
SET group_id = '14a6120f-30ae-47bc-bfdd-8aa98020bfa4'
WHERE id = '62e81936-3615-42cd-b003-0538da49ffa2';

-- Artykuł 2: EcoVadis
-- Użyjemy EN group_id: 03263f56-229b-4e14-b103-83accfe8bcf0
UPDATE posts 
SET group_id = '03263f56-229b-4e14-b103-83accfe8bcf0'
WHERE id = 'f78cf4bc-525b-4803-bdba-e40cef6b7468';

-- Artykuł 3: Cyberatak ransomware  
-- Użyjemy EN group_id: cf105d41-fee5-45af-8d41-c511c2c126eb
UPDATE posts 
SET group_id = 'cf105d41-fee5-45af-8d41-c511c2c126eb'
WHERE id = 'f233fe7e-b990-4b79-9a5d-60b7d9db3da7';

-- Artykuł 4: AI Agent
-- Użyjemy EN group_id: 7441db9f-b1c5-4302-a814-fc569a8a879d
UPDATE posts 
SET group_id = '7441db9f-b1c5-4302-a814-fc569a8a879d'
WHERE id = '92f3e67c-ab6b-43f2-8b35-b1f0a4c99e99';
```

### Dodanie pustych czeskich wersji

Po zgrupowaniu, użytkownik będzie mógł dodać czeskie wersje bezpośrednio w CMS:
1. Otworzyć artykuł do edycji
2. Kliknąć tab "Čeština" 
3. Skopiować treść z PL lub EN
4. Przetłumaczyć i zapisać

Alternatywnie mogę wstawić puste wersje CS od razu w SQL.

### Aktualizacja alternates

Po zapisaniu w CMS, hook `useMultiLangPost` automatycznie aktualizuje tabelę `alternates` (linie 328-377).

---

## Pliki do modyfikacji

| Zmiana | Typ |
|--------|-----|
| Aktualizacja `group_id` w tabeli `posts` | SQL (insert tool) |
| Usunięcie starych wpisów z `alternates` | SQL (insert tool) |
| Usunięcie nieużywanych `article_groups` | SQL (insert tool) |

---

## Po naprawie

1. **CMS**: Wszystkie 4 artykuły będą pokazywać 3 zakładki językowe (PL, EN, CS)
2. **Hreflang**: Zapisanie artykułu automatycznie zaktualizuje `alternates`
3. **Sitemap**: Bez zmian - już działa dynamicznie

