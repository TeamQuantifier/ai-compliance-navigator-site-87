

## Automatyczne tłumaczenie 3 case studies na czeski

### Stan obecny
Wszystkie 3 case studies mają wersje EN i PL, brak CS:
- **OMIDA Group** (group_id: `386cc542...`) — EN body: 5.7MB (zawiera osadzone obrazy), PL body: 14KB
- **Seris Konsalnet** (group_id: `f331e0cd...`) — EN: 11KB, PL: 13KB
- **Tatuum** (group_id: `2786cf3b...`) — EN: 10KB, PL: 12KB

### Plan

**1. Nowa Edge Function `translate-story/index.ts`**
- Przyjmuje `story_id` (źródłowe EN/PL) i `target_lang: "cs"`
- Pobiera story z bazy (metadata + body_rich)
- Wysyła tekst do Lovable AI (Gemini 2.5 Flash) w porcjach:
  - Metadata: title, summary, meta_title, meta_desc, industry, tags
  - Body_rich: rekurencyjnie tłumaczy tylko węzły tekstowe w strukturze TipTap JSON, zachowując formatowanie, linki, obrazy
- Generuje slug z czeskiego tytułu
- Wstawia nowy rekord do `stories` z `lang: 'cs'`, tym samym `group_id`, `status: 'published'`
- Współdzieli featured_image_url, og_image_url, logo_url z oryginału

**2. Źródła tłumaczenia**
- OMIDA: tłumaczenie z wersji **PL** (14KB vs 5.7MB EN z base64 obrazami)
- Seris Konsalnet i Tatuum: tłumaczenie z wersji **EN**

**3. Wywołanie**
- Jednokrotne uruchomienie funkcji dla każdego z 3 case studies
- Po wykonaniu — weryfikacja w bazie i na stronie

### Uwagi
- Istniejące wersje PL i EN nie będą modyfikowane
- Obrazy i KPI są współdzielone (bez tłumaczenia)
- Approach identyczny jak przy istniejącej czeskiej wersji Biofarm

