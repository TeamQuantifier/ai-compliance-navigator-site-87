## Diagnoza

Przetestowałem produkcję (`curl -I`) na 12 kluczowych podstronach. **Wszystkie zwracają 301 → ten sam URL z trailing slash**, czyli pętlę nieskończoną:

```
/en/blog/            => 301 -> https://quantifier.ai/en/blog/
/en/partners/        => 301 -> https://quantifier.ai/en/partners/
/en/product/         => 301 -> https://quantifier.ai/en/product/
/en/frameworks/      => 301 -> https://quantifier.ai/en/frameworks/
/en/about/           => 301 -> https://quantifier.ai/en/about/
/en/contact/         => 301 -> https://quantifier.ai/en/contact/
/en/plans/           => 301 -> https://quantifier.ai/en/plans/
/en/success-stories/ => 301 -> https://quantifier.ai/en/success-stories/
/en/by-roles/        => 301 -> https://quantifier.ai/en/by-roles/
/en/compare/         => 301 -> https://quantifier.ai/en/compare/
```

To samo dla `/pl/...` i `/cs/...`. Stąd "ERR_TOO_MANY_REDIRECTS" w przeglądarce — czyszczenie cookies nie pomoże, bo problem jest po stronie serwera (Netlify).

### Przyczyna

W `netlify.toml` w sekcji *Trailing-slash enforcement* mamy reguły:

```toml
[[redirects]]
  from = "/:locale/blog"
  to   = "/:locale/blog/"
  status = 301
```

Netlify przy dopasowywaniu `from` **ignoruje końcowy slash** — czyli `/:locale/blog` dopasowuje się też do `/en/blog/`, a target `/en/blog/` ponownie match → 301 → 301 → ... loop. Dotyczy to wszystkich 12 reguł trailing-slash + także reguły `from = "/"` → `/en/` (też loopuje, bo `/` matchuje wszystko jako prefix dla SPA fallback `/*`, ale ta akurat ma `force = true` i konkretny path, więc OK — problem tylko z `/:locale/...`).

Te reguły dodano, by domknąć "alternate page" w GSC. Niestety w obecnej formie zabijają cały serwis.

## Plan naprawy

### 1. `netlify.toml` — usunięcie self-loop redirectów

Usunąć cały blok *Trailing-slash enforcement* (12 reguł `/:locale/blog`, `/:locale/partners`, `/:locale/product`, `/:locale/frameworks`, `/:locale/success-stories`, `/:locale/by-roles`, `/:locale/contact`, `/:locale/plans`, `/:locale/about`, `/:locale/compare`, `/:locale/frameworks/governance`, `/:locale/frameworks/environmental`).

Zamiast tego oprzeć trailing slash o:
- React Router (linki wewnętrzne już mają `/`),
- `<link rel="canonical">` z `/` (już zaimplementowane w `SEOHead`),
- naturalną obsługę Netlify Pretty URLs (serwuje ten sam content pod `/en/blog` i `/en/blog/`, ale canonical wskazuje wersję ze slashem — Google to honoruje).

Zachować bez zmian:
- redirecty bez prefixu locale (`/blog` → `/en/blog/`, `/contact` → `/en/contact/`, itd.) — one **nie loopują**, bo target ma prefix `/en/`.
- redirecty starych ścieżek (`/en/nis2` → `/en/frameworks/nis-2/`, `/:locale/nis2-ksc` → `/:locale/frameworks/nis-2/`, blog article redirects, framework legacy paths). One celują w inne URL-e, więc bezpieczne.
- proxy `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`.
- root `/` → `/en/` z `force = true`.
- SPA fallback `/* → /index.html 200`.

### 2. Weryfikacja po deployu

Po wgraniu uruchomię ten sam test:

```
for p in /en/blog/ /en/blog /pl/blog/ /en/partners/ /en/product/ /en/frameworks/ \
         /en/about/ /en/contact/ /en/plans/ /en/success-stories/ /en/by-roles/ \
         /en/compare/ /pl/frameworks/nis-2/ /cs/frameworks/nis-2/; do
  curl -so /dev/null -w "$p => %{http_code}\n" "https://quantifier.ai$p"
done
```

Oczekiwane: 200 (lub 301 do innej ścieżki w przypadku legacy redirectów). Brak self-loopów.

### 3. Dodatkowy audyt

Przy okazji sprawdzę:
- czy `/sitemap.xml` zwraca poprawny XML (200) i nie zawiera już zindeksowanych draftów,
- czy `/en/blog/nis2-directive` 301-uje na pillar (regula już jest, ale była zasłonięta loopem),
- `/pl/sprawdz-cyberbezpieczenstwo/` i `/cs/cybersecurity-check/` (lokalne CTA NIS2 check).

## Pliki do edycji

- `netlify.toml` — usunięcie 12 reguł trailing-slash enforcement.

## Uwaga dot. SEO

Trailing slash dla canonical/hreflang nadal jest egzekwowany w kodzie React (`SEOHead`, `useAlternates`, sitemap edge function). Zniknięcie 301 z Netlify oznacza tylko, że `/en/blog` i `/en/blog/` zwracają ten sam HTML — z canonical wskazującym na `/en/blog/`. Dla Google to standardowo akceptowane (canonical wygrywa).
