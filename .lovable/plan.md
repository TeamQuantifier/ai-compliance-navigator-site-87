
# Dynamiczna lista artykulow w prerenderze /blog i /success-stories

## Problem

Strony `/blog` i `/success-stories` w prerenderze pokazuja tylko ogolne bullet-pointy ("Expert insights on compliance automation" itp.) -- zero linkow do konkretnych artykulow. Boty widza pusta liste, co oznacza brak dystrybucji link equity i wolniejsze crawlowanie postow.

## Rozwiazanie

Zmodyfikowac `supabase/functions/prerender-marketing/index.ts` aby dla stron `blog` i `success-stories` pobierac z bazy opublikowane artykuly i renderowac je jako liste HTML z linkami. Projekt juz korzysta z Supabase (funkcje `prerender-post`, `prerender-story` robia dokladnie to samo -- lacza sie z baza po dane).

## Zmiany w pliku `supabase/functions/prerender-marketing/index.ts`

### 1. Dodanie importu Supabase (poczatek pliku, linia ~2)

```typescript
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
```

### 2. Dodanie funkcji pobierajacych dane (przed `generateSchemas`)

```typescript
async function fetchPublishedPosts(locale: string) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data } = await supabase
    .from('posts')
    .select('title, slug, excerpt, published_at, category:categories(name)')
    .eq('status', 'published')
    .eq('lang', locale)
    .order('published_at', { ascending: false })
    .limit(50);
  return data || [];
}

async function fetchPublishedStories(locale: string) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data } = await supabase
    .from('stories')
    .select('title, slug, summary, client_name, industry, published_at')
    .eq('status', 'published')
    .eq('lang', locale)
    .order('published_at', { ascending: false })
    .limit(50);
  return data || [];
}
```

### 3. Modyfikacja `generateHtml` -- dodanie dynamicznej listy

Funkcja `generateHtml` staje sie `async`. Dla stron `blog` i `success-stories` po statycznych sekcjach dodany zostanie dynamiczny HTML:

**Blog** -- lista artykulow jako `<article>` z `<a href>`:
```html
<section>
  <h2>All Articles</h2>
  <ul class="article-list">
    <li><article>
      <h3><a href="/en/blog/nis2-directive/">NIS2 Directive...</a></h3>
      <time datetime="2026-02-11">February 11, 2026</time>
      <p>Expert guide on NIS2...</p>
    </article></li>
    ...
  </ul>
</section>
```

**Success Stories** -- lista case studies z `<a href>`:
```html
<section>
  <h2>All Case Studies</h2>
  <ul class="article-list">
    <li><article>
      <h3><a href="/en/success-stories/adamed/">Adamed - Pharmaceutical</a></h3>
      <p>How Adamed streamlined compliance...</p>
    </article></li>
    ...
  </ul>
</section>
```

### 4. Dodanie `CollectionPage` schema w `generateSchemas`

Dla stron `blog` i `success-stories` dodany zostanie schema `CollectionPage` z lista artykulow jako `hasPart`, co wzmacnia structured data dla Google.

### 5. Zmiana handlera `serve` na async

Handler juz jest async, ale wywolanie `generateHtml` musi uzyc `await`:
```typescript
const html = await generateHtml(locale, page, pageData);
```

## Wplyw

| Metryka | Przed | Po |
|---------|-------|-----|
| Linki do artykulow w HTML /blog | 0 | ~16 |
| Linki do stories w HTML /success-stories | 0 | ~10 |
| CollectionPage schema | Brak | Tak |
| Link equity z listy do postow | Zero | Pelna |

## Podsumowanie

1 plik: `supabase/functions/prerender-marketing/index.ts`. Dodanie ~60 linii kodu (import, 2 funkcje fetch, renderowanie listy, schema). Wykorzystuje istniejaca infrastrukture Supabase -- te same zmienne srodowiskowe co `prerender-post`.
