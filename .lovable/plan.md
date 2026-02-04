

# Plan: Naprawa grupowania artykułów blogowych

## Problem zweryfikowany

Po sprawdzeniu bazy danych potwierdzam że artykuły PL i EN mają **różne `group_id`**:

| Artykuł | PL group_id | EN group_id | Status |
|---------|------------|-------------|--------|
| Continuous Compliance | fedaa412... | 14a6120f... | ❌ Niezgodne |
| EcoVadis | aa0ab5bc... | 03263f56... | ❌ Niezgodne |
| Cyberatak ransomware | cba0c0eb... | cf105d41... | ❌ Niezgodne |
| AI Agent | 3f82d40e... | 7441db9f... | ❌ Niezgodne |

**Wyjątek:** CS wersja "Continuous Compliance" ma już poprawny `group_id` (14a6120f...).

Tabela `alternates` zawiera też nieprawidłowe/testowe dane.

---

## Rozwiązanie

### Krok 1: Aktualizacja group_id dla wersji PL

```sql
-- Artykuł 1: Continuous Compliance
UPDATE posts 
SET group_id = '14a6120f-30ae-47bc-bfdd-8aa98020bfa4'
WHERE id = '62e81936-3615-42cd-b003-0538da49ffa2';

-- Artykuł 2: EcoVadis
UPDATE posts 
SET group_id = '03263f56-229b-4e14-b103-83accfe8bcf0'
WHERE id = 'f78cf4bc-525b-4803-bdba-e40cef6b7468';

-- Artykuł 3: Cyberatak ransomware
UPDATE posts 
SET group_id = 'cf105d41-fee5-45af-8d41-c511c2c126eb'
WHERE id = 'f233fe7e-b990-4b79-9a5d-60b7d9db3da7';

-- Artykuł 4: AI Agent
UPDATE posts 
SET group_id = '7441db9f-b1c5-4302-a814-fc569a8a879d'
WHERE id = '92f3e67c-ab6b-43f2-8b35-b1f0a4c99e99';
```

### Krok 2: Wyczyszczenie nieprawidłowych alternates

```sql
-- Usuń testowe/nieprawidłowe wpisy alternates
DELETE FROM alternates 
WHERE content_type = 'post';
```

### Krok 3: Dodanie poprawnych alternates

Po zgrupowaniu, przy edycji i zapisaniu artykułu w CMS, hook `useMultiLangPost` automatycznie utworzy nowe wpisy w tabeli `alternates`.

---

## Wynik

Po naprawie:
1. **CMS**: Każdy z 4 artykułów pokaże 3 zakładki językowe (PL, EN, CS)
2. **Hreflang**: Po zapisaniu artykułu w CMS, automatycznie zaktualizują się tagi hreflang
3. **Treść**: Żadna treść się nie zmieni - tylko powiązania między wersjami językowymi

---

## Szczegóły techniczne

- Aktualizacja `group_id` w tabeli `posts` (4 UPDATE)
- Wyczyszczenie tabeli `alternates` dla postów (1 DELETE)
- Automatyczna regeneracja alternates przy zapisie w CMS

