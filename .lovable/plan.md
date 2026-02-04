
# Plan: Naprawa wyświetlania treści w edytorze przy przełączaniu języków

## Zdiagnozowany problem

Komponent `RichTextEditor.tsx` używa flagi `isInitialized`, która jest ustawiana raz przy pierwszym załadowaniu treści. Po przełączeniu zakładki językowej:
- Parent (`PostEditor`) przekazuje nową wartość `body_rich` dla wybranego języka
- Ale edytor ignoruje zmianę, bo `isInitialized === true`
- W efekcie zawsze widać treść pierwszego załadowanego języka (polskiego)

```typescript
// Linia 75-92 - problem: content jest aktualizowany tylko raz
useEffect(() => {
  if (editor && !isInitialized) {  // ← to blokuje aktualizacje!
    // ... setContent tylko przy pierwszym ładowaniu
  }
}, [content, editor, isInitialized]);
```

## Rozwiązanie

Najczystszym rozwiązaniem jest dodanie prop `key` do komponentu `RichTextEditor` w `PostEditor.tsx`. Zmiana `key` wymusi pełne odmontowanie i ponowne zamontowanie edytora z nową treścią.

### Zmiana w PostEditor.tsx (linia 568)

**Przed:**
```tsx
<RichTextEditor
  content={currentVersion.body_rich}
  onChange={(content) => updateVersion(activeLanguage, { body_rich: content })}
  placeholder="Zacznij pisać treść artykułu..."
/>
```

**Po:**
```tsx
<RichTextEditor
  key={activeLanguage}  // ← wymusza remount przy zmianie języka
  content={currentVersion.body_rich}
  onChange={(content) => updateVersion(activeLanguage, { body_rich: content })}
  placeholder="Zacznij pisać treść artykułu..."
/>
```

## Dlaczego to działa

W React, zmiana prop `key` powoduje:
1. Całkowite odmontowanie starej instancji komponentu
2. Zamontowanie nowej instancji z aktualnym `content`
3. `isInitialized` startuje od `false` dla każdego języka

## Szczegóły techniczne

| Plik | Zmiana |
|------|--------|
| `src/pages/admin/PostEditor.tsx` | Dodanie `key={activeLanguage}` do RichTextEditor (linia 568) |

### Jedna linia kodu do zmiany:
```diff
- <RichTextEditor
+ <RichTextEditor
+   key={activeLanguage}
    content={currentVersion.body_rich}
```

## Efekt końcowy

Po naprawie:
- Zakładka **Polski** → treść polska
- Zakładka **English** → treść angielska
- Zakładka **Čeština** → treść czeska

Każde przełączenie zakładki załaduje poprawną treść z bazy danych.
