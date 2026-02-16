

# Zmiana banerów na ciemny styl Hero

## Zakres

Zamiana gradientowego banera (niebieski/fioletowy) na ciemny styl identyczny z sekcja Hero na stronie glownej -- na 3 stronach: **By Roles**, **Success Stories**, **Blog**.

## Obecny styl (do zamiany)

```
bg-gradient-to-r from-brand-blue-dark via-brand-blue to-brand-purple
```

Dekoracje: biale kola z `opacity-10`

## Nowy styl (z Hero)

```
bg-gradient-to-b from-slate-950 via-slate-950 to-compliance-950
```

Dekoracje: kolorowe kola jak w Hero (`innovation-800`, `compliance-800`, `slate-800`) z `blur-3xl` i `opacity-20-30`

Tekst: `text-white` (tytuly), `text-slate-300` (opisy) -- zgodnie ze stylem Hero

## Zmiany w plikach

| Plik | Zmiana |
|------|--------|
| `src/pages/roles/ByRoles.tsx` (linia 38) | Zamiana klasy tla i dekoracji |
| `src/pages/SuccessStories.tsx` (linia 42) | Zamiana klasy tla i dekoracji |
| `src/pages/blog/BlogList.tsx` (linia 64) | Zamiana klasy tla i dekoracji |

Kazda zmiana to podmiana ~12 linii (div z banerem + dekoracje + tekst) na nowy ciemny styl.

