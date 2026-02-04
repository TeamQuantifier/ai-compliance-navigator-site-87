

# Plan: Naprawa zapisu SEO Toolkit + przycisk "Zatwierdź zmiany"

## Zidentyfikowany problem

### Przyczyna główna
Zmiany SEO (focus keyword, OG tags, etc.) są aktualizowane w stanie React, ale użytkownik musi kliknąć główny przycisk "Zapisz wszystkie wersje" aby je utrwalić w bazie. Brak wizualnej informacji o niezapisanych zmianach powoduje, że użytkownik zamyka panel SEO bez zapisania.

### Przepływ danych (obecny)
```text
Panel SEO → onUpdateSeoFields() → updateVersion() → React State
                                                        ↓
                                     (wymaga ręcznego kliknięcia)
                                                        ↓
                        "Zapisz wszystkie wersje" → saveAllVersions() → Baza danych
```

---

## Rozwiązanie

Dodać w panelu SEO:
1. **Przycisk "Zatwierdź zmiany SEO"** który zapisuje cały artykuł do bazy
2. **Wskaźnik niezapisanych zmian** (badge "Niezapisane")
3. **Automatyczne zamknięcie panelu** po zapisaniu z komunikatem sukcesu

### Przepływ danych (nowy)
```text
Panel SEO → zmiany → wskaźnik "Niezapisane"
                ↓
        [Zatwierdź zmiany SEO]
                ↓
        saveAllVersions() → Baza → Toast "Zapisano" → Zamknij panel
```

---

## Szczegóły techniczne

### 1. SeoSidePanel - dodanie przycisku zapisu

Modyfikacja: `src/components/admin/SeoSidePanel.tsx`

```typescript
interface SeoSidePanelProps {
  // ... istniejące props
  onSave?: () => Promise<void>;  // NOWE
  isSaving?: boolean;            // NOWE
  hasUnsavedChanges?: boolean;   // NOWE
}

// W SheetHeader dodać:
<div className="flex items-center gap-2">
  {hasUnsavedChanges && (
    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600">
      Niezapisane
    </Badge>
  )}
  <Button 
    size="sm" 
    onClick={onSave} 
    disabled={isSaving}
  >
    {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
    Zatwierdź zmiany
  </Button>
</div>
```

### 2. PostEditor - przekazanie funkcji zapisu

Modyfikacja: `src/pages/admin/PostEditor.tsx`

```typescript
// Dodać callback do zapisania i zamknięcia panelu
const handleSeoSave = async () => {
  await handleSave();
  setSeoOpen(false);
};

// W SeoSidePanel:
<SeoSidePanel
  // ... istniejące props
  onSave={handleSeoSave}
  isSaving={isSaving}
  hasUnsavedChanges={/* logika wykrywania zmian */}
/>
```

### 3. Wykrywanie niezapisanych zmian

Opcja 1 (prosta): Zawsze pokazuj przycisk "Zatwierdź zmiany" - użytkownik sam decyduje kiedy zapisać.

Opcja 2 (zaawansowana): Porównanie stanu z oryginalnym załadowanym z bazy.

Rekomenduję Opcję 1 dla prostoty - przycisk zawsze widoczny, zawsze aktywny.

---

## Dodatkowe uzupełnienie SEO w bazie

Automatycznie uzupełnię brakujące pola SEO dla 8 opublikowanych artykułów:

```sql
-- 1. OG Title z meta_title/title
UPDATE posts SET og_title = COALESCE(NULLIF(meta_title, ''), title)
WHERE status = 'published' AND (og_title IS NULL OR og_title = '');

-- 2. OG Description z meta_desc/excerpt
UPDATE posts SET og_description = COALESCE(NULLIF(meta_desc, ''), LEFT(excerpt, 200))
WHERE status = 'published' AND (og_description IS NULL OR og_description = '');

-- 3. OG Image z featured_image
UPDATE posts SET og_image_url = featured_image_url
WHERE status = 'published' AND (og_image_url IS NULL OR og_image_url = '') 
  AND featured_image_url IS NOT NULL;

-- 4. Twitter Title z og_title
UPDATE posts SET twitter_title = og_title
WHERE status = 'published' AND (twitter_title IS NULL OR twitter_title = '');

-- 5. Twitter Image z og_image
UPDATE posts SET twitter_image_url = og_image_url
WHERE status = 'published' AND (twitter_image_url IS NULL OR twitter_image_url = '');

-- 6. Featured Image ALT z title
UPDATE posts SET featured_image_alt = title
WHERE status = 'published' AND (featured_image_alt IS NULL OR featured_image_alt = '') 
  AND featured_image_url IS NOT NULL;

-- 7. Focus Keywords (indywidualnie dla każdego artykułu)
UPDATE posts SET focus_keyword = 'AI agents compliance' WHERE id = '3c4a13ed-c075-48f0-ab67-1395d32734f7';
UPDATE posts SET focus_keyword = 'AI agenci zgodność' WHERE id = '92f3e67c-ab6b-43f2-8b35-b1f0a4c99e99';
UPDATE posts SET focus_keyword = 'continuous compliance' WHERE id IN ('632d8856-2db7-46ab-8f30-f6a9872fe7b8', 'd442b907-628e-4eff-abfc-596c96da9a47');
UPDATE posts SET focus_keyword = 'ransomware attack case study' WHERE id = 'bc8c2a54-fc7e-4c68-9664-fa1095d99082';
UPDATE posts SET focus_keyword = 'cyberatak ransomware' WHERE id = 'f233fe7e-b990-4b79-9a5d-60b7d9db3da7';
UPDATE posts SET focus_keyword = 'EcoVadis ESG assessment' WHERE id = '3efd756e-b8c3-401a-8590-0cb25ba045cd';
UPDATE posts SET focus_keyword = 'EcoVadis ocena ESG' WHERE id = 'f78cf4bc-525b-4803-bdba-e40cef6b7468';

-- 8. Uzupełnienie meta_desc dla artykułów z pustą/za krótką
UPDATE posts SET meta_desc = 'Continuous Compliance mění přístup organizací ke shodě. AI agenti v Quantifier.ai posilují stabilitu a snižují rizika v oblasti compliance.'
WHERE id = 'd442b907-628e-4eff-abfc-596c96da9a47' AND (meta_desc IS NULL OR LENGTH(meta_desc) < 120);

UPDATE posts SET meta_desc = 'EcoVadis ESG assessment helps suppliers prove sustainability credentials to enterprise customers. Learn how ratings impact business relationships.'
WHERE id = '3efd756e-b8c3-401a-8590-0cb25ba045cd' AND (meta_desc IS NULL OR LENGTH(meta_desc) < 120);

UPDATE posts SET meta_desc = 'Ocena EcoVadis ESG pomaga dostawcom udowodnić zrównoważony rozwój. Dowiedz się, jak wyniki wpływają na relacje biznesowe i współpracę z klientami.'
WHERE id = 'f78cf4bc-525b-4803-bdba-e40cef6b7468' AND (meta_desc IS NULL OR LENGTH(meta_desc) < 120);
```

---

## Pliki do modyfikacji

| Plik | Zmiana |
|------|--------|
| `src/components/admin/SeoSidePanel.tsx` | Dodać props: onSave, isSaving + przycisk "Zatwierdź zmiany" |
| `src/pages/admin/PostEditor.tsx` | Przekazać handleSeoSave do SeoSidePanel |
| `src/pages/admin/StoryEditor.tsx` | Analogiczna zmiana dla edytora Case Study |

Plus operacje SQL na tabeli `posts` dla uzupełnienia brakujących pól SEO.

---

## Efekt końcowy

1. Panel SEO ma przycisk "Zatwierdź zmiany SEO" w nagłówku
2. Po kliknięciu zapisuje artykuł do bazy i zamyka panel
3. Wszystkie opublikowane artykuły będą miały uzupełnione:
   - Focus keywords
   - OG tags (title, description, image)
   - Twitter tags
   - Featured image ALT
   - Meta descriptions (gdzie brakujące)

