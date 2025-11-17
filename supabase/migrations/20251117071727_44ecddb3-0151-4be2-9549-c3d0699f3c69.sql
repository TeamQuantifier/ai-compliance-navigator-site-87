-- Usunąć trigger walidacji seo_score z tabeli posts
DROP TRIGGER IF EXISTS validate_posts_seo_score ON public.posts;

-- Usunąć trigger walidacji seo_score z tabeli stories
DROP TRIGGER IF EXISTS validate_stories_seo_score ON public.stories;

-- Teraz usunąć funkcję walidacji seo_score
DROP FUNCTION IF EXISTS public.validate_seo_score();

-- Usunąć kolumnę author_id z tabeli posts
ALTER TABLE public.posts 
DROP COLUMN IF EXISTS author_id;

-- Usunąć kolumnę seo_score z tabeli posts
ALTER TABLE public.posts 
DROP COLUMN IF EXISTS seo_score;