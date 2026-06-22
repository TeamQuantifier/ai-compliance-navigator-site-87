# Problem

Filmik VSME nie odtwarza się na opublikowanej stronie (quantifier.ai), choć jest widoczny w preview Lovable.

## Diagnoza

Strona jest hostowana na **Netlify**, a nie na Lovable Hosting. Filmik został wgrany jako Lovable Asset (CDN) pod adresem:

```
/__l5e/assets-v1/a7c7f3e6-.../vsme-walkthrough.mp4
```

Ten endpoint (`/__l5e/`) działa wyłącznie na infrastrukturze Lovable. Na Netlify żądanie tego URL trafia w SPA fallback i zwraca `index.html` (potwierdzone: `curl` na produkcji zwraca `content-type: text/html`). Dlatego `<video>` nie ma czego odtworzyć — i przeglądarka pokazuje pusty/czarny kontener (a Ty widzisz „starszą wersję" z cache).

# Rozwiązanie

Przenieść plik filmu do katalogu `public/`, który Netlify serwuje bezpośrednio jako statyczny zasób. Rozmiar 3,3 MB jest w pełni akceptowalny.

## Kroki

1. **Pobrać** plik mp4 z Lovable CDN (przez `lovable-assets` lub bezpośrednio z URL asset) i zapisać jako `public/videos/vsme-walkthrough.mp4`.
2. **Zaktualizować `src/pages/frameworks/Esg.tsx`**:
   - Usunąć `import vsmeVideo from '@/assets/vsme-walkthrough.mp4.asset.json'`.
   - Zmienić `src={vsmeVideo.url}` na `src="/videos/vsme-walkthrough.mp4"`.
3. **Usunąć asset pointer** `src/assets/vsme-walkthrough.mp4.asset.json` (już niepotrzebny).
4. Po opublikowaniu — wymusić odświeżenie (hard refresh / cache bust), aby ominąć cache przeglądarki na starym, niedziałającym URL-u.

## Alternatywy (do rozważenia w przyszłości)

- **Supabase Storage** (publiczny bucket) — dobre dla większych plików / wielu wideo.
- **YouTube / Vimeo embed** — zero kosztów hostingu, ale inny UX (branding zewnętrzny).

Rekomendacja: opcja podstawowa (public/) — najprostsza i wystarczająca dla jednego 3 MB pliku.
