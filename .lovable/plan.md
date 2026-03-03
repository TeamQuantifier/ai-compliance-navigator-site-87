

## Plan: Aktualizacja banerów webinarowych na stronie /events

Trzy nowe grafiki zastąpią istniejące banery w `public/lovable-uploads/`:

| Plik źródłowy | Docelowy plik |
|---|---|
| `WEBINARY_PL.jpg` | `public/lovable-uploads/webinar-cycle-banner-pl.jpg` |
| `WEBINARS_EN.jpg` | `public/lovable-uploads/webinar-cycle-banner-en.jpg` |
| `WEBINARU_CZ.jpg` | `public/lovable-uploads/webinar-cycle-banner-cs.jpg` |

Kod w `EventsHub.tsx` już odwołuje się do tych ścieżek w `bannerMap`, więc wystarczy podmienić pliki -- zero zmian w kodzie.

**Uwaga:** Na grafice CS widnieje data "Od 10. 3. 2026" (stara data), podczas gdy aktualne daty to od 17 marca. Jeśli to celowe -- zostawiam. Jeśli nie -- daj znać, a wskażę co poprawić.

