UPDATE public.posts
SET
  meta_desc = 'Dyrektywa NIS2 — kompletny przewodnik 2026: 18 sektorów, terminy 24h/72h, obowiązki zarządu. Nowelizacja UKSC obowiązuje od 3 kwietnia 2026 r.',
  excerpt = 'Dyrektywa NIS2 (UE 2022/2555) obejmuje 18 sektorów i nakłada na podmioty kluczowe oraz ważne obowiązek wdrożenia systemu zarządzania ryzykiem cyber, wieloetapowego raportowania incydentów (24h/72h/1 miesiąc) oraz odpowiedzialności zarządu. Kary sięgają 10 mln EUR / 2% obrotu. Nowelizacja ustawy o KSC weszła w życie 3 kwietnia 2026 r., obejmuje ok. 42 000 podmiotów, z 12-miesięcznym terminem wdrożenia i 2-letnim odroczeniem kar.',
  canonical_url = 'https://quantifier.ai/pl/blog/dyrektywa-nis2-wymagania-zgodnosci-przewodnik-wdrozenia/',
  robots_index = false,
  updated_at = NOW()
WHERE id = '88188e1d-cf79-44c7-a795-608093f4da86';

DELETE FROM public.alternates
WHERE primary_id   IN ('88188e1d-cf79-44c7-a795-608093f4da86','2e298e95-8d80-4ac6-8a36-aa06c03fb296')
   OR alternate_id IN ('88188e1d-cf79-44c7-a795-608093f4da86','2e298e95-8d80-4ac6-8a36-aa06c03fb296');

INSERT INTO public.redirects (from_path, to_path, http_code, is_active)
VALUES ('/pl/blog/dyrektywa-nis2',
        '/pl/blog/dyrektywa-nis2-wymagania-zgodnosci-przewodnik-wdrozenia',
        301, true)
ON CONFLICT DO NOTHING;
