# Trailing slash dla korzeni językowych (/en, /pl, /cs)

## Diagnoza (zweryfikowana na produkcji)

Sprawdziłem oba URL-e (curl + Googlebot UA):

| URL | Status | Content-length | ETag | Canonical | H1 |
|---|---|---|---|---|---|
| `https://quantifier.ai/en` | 200 | 6569 (SPA) / 13264 (bot) | `811712f0…` | `https://quantifier.ai/en/` | „End-to-end GRC…" |
| `https://quantifier.ai/en/` | 200 | 6569 / 13264 | `811712f0…` (identyczny) | `https://quantifier.ai/en/` | „End-to-end GRC…" |

**Treść jest identyczna** (ten sam ETag, ten sam HTML w wersji prerendered dla bota, ten sam H1, ten sam canonical). Teza z artykułu, że „wersja bez ukośnika ma rozbudowaną stronę, a wersja z ukośnikiem uproszczony dokument", jest **nieaktualna** – prawdopodobnie pochodzi z momentu sprzed wdrożenia prerendera lub z porównania cached vs miss (widać `cache-status: hit` vs `miss`).

**Realny problem, który zostaje:** oba URL-e zwracają 200 zamiast jeden 301 → drugi. Canonical jest poprawny (zawsze `/en/`), więc Google powinien skonsolidować, ale dla pewności indeksacyjnej i zgodności z naszą polityką trailing slash – warto wymusić 301.

To koliduje z obecnym memo `wymuszenie-trailing-slash-netlify`, które jawnie **wyłącza** korzenie językowe z reguły. Trzeba świadomie tę regułę zmienić.

## Plan

### 1. `netlify.toml` – dodać 3 reguły 301 przed SPA fallback

```toml
# Force trailing slash on language roots (consolidate /en vs /en/)
[[redirects]]
  from = "/en"
  to = "/en/"
  status = 301
  force = true

[[redirects]]
  from = "/pl"
  to = "/pl/"
  status = 301
  force = true

[[redirects]]
  from = "/cs"
  to = "/cs/"
  status = 301
  force = true
```

Wstawić w bloku „Redirects (301) for non-localized paths" (przed `SPA fallback — must be last`). `force = true` jest konieczne, bo bez niego Netlify nie nadpisze istniejącej ścieżki obsługiwanej przez SPA.

### 2. Aktualizacja pamięci projektu

- `mem://seo/wymuszenie-trailing-slash-netlify` – usunąć wyjątek dla `/en`, `/pl`, `/cs` (teraz też mają trailing slash).
- `mem://index.md` Core – zmienić linię „Trailing slashes are mandatory in paths, canonicals, and hreflang (except language roots /pl, /en, /cs)" na wersję bez wyjątku.

### 3. Weryfikacja po deployu

```bash
curl -sI https://quantifier.ai/en   # oczekiwane: 301 → /en/
curl -sI https://quantifier.ai/pl
curl -sI https://quantifier.ai/cs
curl -sI https://quantifier.ai/en/  # oczekiwane: 200
```

Następnie w GSC „Inspect URL" dla `/en` – powinno pokazać „Page with redirect" zamiast indeksacji.

## Czego NIE robimy (świadomie)

- Nie zmieniamy `canonical` ani `hreflang` – są już poprawne (wskazują `/en/`, `/pl/`, `/cs/`).
- Nie ruszamy prerendera ani treści strony głównej – treść jest identyczna na obu wariantach.
- Nie dodajemy reguł dla głębszych ścieżek – wymuszenie trailing slash dla nich już działa.

## Co napisać w artykule

Możesz w artykule potwierdzić, że problem **został zaadresowany na poziomie infrastruktury** poprzez 301 na korzeniach językowych i że treść była identyczna (nie było realnej duplikacji treści, tylko ryzyko podwójnej indeksacji URL-a).
